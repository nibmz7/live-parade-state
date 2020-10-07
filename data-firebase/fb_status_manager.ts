import StatusManager from '../data/status_manager';
import { UserStoreState } from '../data/states/user_state';
import { ACTION_TYPE, DataResults } from '../data/data_manager';
import User from '../model/user';
import Department from '../model/department';
import Status from '../model/status';
import Rank from '../model/rank';

type FirestoreSnapshot = firebase.firestore.QuerySnapshot;
type FirestoreDocument = firebase.firestore.QueryDocumentSnapshot;
const FirestoreDocChanges = {
  added: ACTION_TYPE.ADDED,
  modified: ACTION_TYPE.MODIFIED,
  removed: ACTION_TYPE.REMOVED
};

export default class FBStatusManager extends StatusManager {
  private db!: firebase.firestore.Firestore;
  private repositoryUnsubscribe?: any;

  protected requestModifyUser(state: UserStoreState): void {
    const MakeStatus = (status: Status) => ({
      code: status.code,
      remarks: status.remarks,
      updatedby: this.authUser.uid,
      timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
    });
    const userToUpdate = new User(state.action.payload as User);
    const morning = userToUpdate.morning;
    const afternoon = userToUpdate.afternoon;
    const userRef = this.db.doc(
      `branches/${this.branch.id}/repository/${userToUpdate.uid}`
    );
    if (morning && !afternoon) {
      userRef.update({ 'data.status.am': {...MakeStatus(morning)} });
    }
    if (afternoon && !morning) {
      userRef.update({ 'data.status.pm': {...MakeStatus(afternoon)} });
    }
    if (morning && afternoon) {
      userRef.update({
        'data.status': {
          am: MakeStatus(morning),
          pm: MakeStatus(afternoon)
        }
      });
    }
  }

  unsubscribe() {
    super.unsubscribe();
    this.repositoryUnsubscribe?.();
  }

  private getUser(doc: FirestoreDocument): User | undefined {
    const data = doc.data().data;
    const morning = data.status.am;
    const afternoon = data.status.pm;
    if (!morning.timestamp || !afternoon.timestamp) return undefined;
    return new User({
      ...data,
      uid: doc.id,
      rank: new Rank(data.rank),
      morning: new Status({ ...morning, date: morning.timestamp.toDate() }),
      afternoon: new Status({ ...afternoon, date: afternoon.timestamp.toDate() })
    });
  }

  private getDepartment(doc: FirestoreDocument): Department {
    return { id: doc.id, name: doc.data().name };
  }

  protected connectDB(): Promise<DataResults> {
    this.db = window.firebase.firestore();
    this.db.enablePersistence({ synchronizeTabs: true });
    let initialLoad = true;
    const branchid = this.branch.id;
    const repository = this.db.collection(`branches/${branchid}/repository`);
    return new Promise<DataResults>((resolve) => {
      const onSnapshotListener = (snapshot: FirestoreSnapshot) => {
        if (initialLoad) {
          initialLoad = false;
          const users: User[] = [];
          const departments: Department[] = [];
          let userDepartment!: Department;
          for (let change of snapshot.docChanges()) {
            const type = change.doc.data().type;
            if (type === 'user') {
              const user = this.getUser(change.doc);
              if (!user) return;
              users.push(user!);
            } else {
              const department = this.getDepartment(change.doc);
              if (department.id === this.authUser.departmentid) {
                userDepartment = department;
              } else departments.push(department);
            }
          }
          departments.unshift(userDepartment);
          resolve({ departments, users });
        } else {
          for (let change of snapshot.docChanges()) {
            const dataType = change.doc.data().type;
            const changeType = FirestoreDocChanges[change.type];
            if (dataType === 'user') {
              const user = this.getUser(change.doc);
              if (!user) return;
              this.userOnChange(user, changeType);
            } else {
              const department = this.getDepartment(change.doc);
              this.departmentOnChange(department, changeType);
            }
          }
        }
      };
      this.repositoryUnsubscribe = repository.onSnapshot(onSnapshotListener);
    });
  }
}

import StatusManager from '../data/status_manager';
import { UserStoreState } from '../data/states/user_state';
import { ACTION_TYPE, DataResults } from '../data/data_manager';
import User from '../model/user';
import ACTION_USER from '../data/actions/user_action';
import { ApplicationStore } from '../data/store';
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
    setTimeout(() => {
      const userToUpdate = new User(state.action.payload as User);
      const userData = ApplicationStore.users.usersById[userToUpdate.uid];
      const morning = new Status(userToUpdate.morning || userData.morning!);
      const afternoon = new Status(
        userToUpdate.afternoon || userData.afternoon!
      );
      const newUser = new User({ ...userData, morning, afternoon });
      const action = ACTION_USER.requestSuccessful(state.action);
      this.userOnChange(newUser, ACTION_TYPE.MODIFIED);
      ApplicationStore.dispatch(action);
    }, 2000);
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
      afternoon: new Status({ ...morning, date: afternoon.timestamp.toDate() })
    });
  }

  private getDepartment(doc: FirestoreDocument): Department {
    return { id: doc.id, name: doc.data().name };
  }

  protected connectDB(): Promise<DataResults> {
    this.db = window.firebase.firestore();
    let initialLoad = true;
    const branchid = this.branch.id;
    const repository = this.db.collection(`branches/${branchid}/repository`);
    return new Promise<DataResults>((resolve) => {
      const onSnapshotListener = (snapshot: FirestoreSnapshot) => {
        if (initialLoad) {
          const users: User[] = [];
          const departments: Department[] = [];
          let userDepartment!: Department;
          for (let change of snapshot.docChanges()) {
            const type = change.doc.data().type;
            if (type === 'user') {
              const user = this.getUser(change.doc);
              if(!user) return;
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
              if(!user) return;
              this.userOnChange(user!, changeType);
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

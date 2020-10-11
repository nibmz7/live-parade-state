import { ACTION_TYPE, DataResults } from '../data/data_manager';
import Department from '../model/department';
import Rank from '../model/rank';
import Status from '../model/status';
import User from '../model/user';

type FirestoreSnapshot = firebase.firestore.QuerySnapshot;

type FirestoreDocument = firebase.firestore.QueryDocumentSnapshot;
const FirestoreDocChanges = {
  added: ACTION_TYPE.ADDED,
  modified: ACTION_TYPE.MODIFIED,
  removed: ACTION_TYPE.REMOVED
};

function getUser(doc: FirestoreDocument, branchid): User | undefined {
  const data = doc.data().data;
  const morning = data.status.am;
  const afternoon = data.status.pm;
  if (!morning.timestamp || !afternoon.timestamp) return undefined;
  return new User({
    ...data,
    uid: doc.id,
    branchid: branchid,
    rank: new Rank(data.rank),
    morning: new Status({ ...morning, date: morning.timestamp.toDate() }),
    afternoon: new Status({ ...afternoon, date: afternoon.timestamp.toDate() })
  });
}

function getDepartment(doc: FirestoreDocument): Department {
  return { id: doc.id, name: doc.data().name };
}

export default function FirestoreDBListener(context) {
  context.db = window.firebase.firestore();
  context.db.enablePersistence({ synchronizeTabs: true });
  let initialLoad = true;
  const branchid = context.branch.id;
  const repository = context.db.collection(`branches/${branchid}/repository`);
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
            const user = getUser(change.doc, branchid);
            if (!user) return;
            users.push(user!);
          } else {
            const department = getDepartment(change.doc);
            if (department.id === context.authUser.departmentid) {
              userDepartment = department;
            } else departments.push(department);
          }
        }
        if (userDepartment) departments.unshift(userDepartment);
        resolve({ departments, users });
      } else {
        for (let change of snapshot.docChanges()) {
          const dataType = change.doc.data().type;
          const changeType = FirestoreDocChanges[change.type];
          if (dataType === 'user') {
            const user = getUser(change.doc, branchid);
            if (!user) return;
            context.userOnChange(user, changeType);
          } else {
            const department = getDepartment(change.doc);
            context.departmentOnChange(department, changeType);
          }
        }
      }
    };
    context.repositoryUnsubscribe = repository.onSnapshot(onSnapshotListener);
  });
}

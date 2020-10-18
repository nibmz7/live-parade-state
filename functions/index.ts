import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();
// const FieldValue = admin.firestore.FieldValue;
const regionalFunction = functions.region('asia-northeast1');
type FunctionContext = functions.https.CallableContext;

const checkIsAdmin = async (context: FunctionContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called ' + 'while authenticated.'
    );
  }
  const admins = ['admin@sbw.plc', 'admin@test.com'];
  const adminEmail = context.auth.token.email!;
  if (!admins.includes(adminEmail)) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'You must be an admin to call this function'
    );
  }
  return true;
};

export const deleteDepartment = regionalFunction.https.onCall(
  async (data, context) => {
    const isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
      const adminid = context.auth!.uid;
      const departmentid = data.departmentid;
      const users = await db
        .collection(`branches/${adminid}/repository`)
        .where('type', '==', 'user')
        .get();
      if (!users.empty) {
        for (const user of users.docChanges()) {
          const userDepId = user.doc.data().data.departmentid;
          if (userDepId === departmentid) {
            await admin.auth().deleteUser(user.doc.id);
            await user.doc.ref.delete();
          }
        }
      }
      await db.doc(`branches/${adminid}/repository/${departmentid}`).delete();
    }
  }
);

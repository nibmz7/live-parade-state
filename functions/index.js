const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

let FieldValue = require('firebase-admin').firestore.FieldValue;

const checkIsAdmin = async context => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const admins = ["admin@sbw.plc", "admin@test.com"];
    const adminEmail = context.auth.token.email;
    if (!admins.includes(adminEmail)) {
        throw new functions.https.HttpsError('failed-precondition', 'You must be an admin to call this function');
    }
    return true;
}

exports.deleteDepartment = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const adminid = context.auth.uid;
        let users = await db.collection(`branches/${adminid}/repository`)
            .where("departmentid", "==", data.departmentid).get();
        if (!users.empty) {
            for (let user of users.docChanges()) {
                await admin.auth().deleteUser(user.doc.id);
                await user.doc.ref.delete();
            }
        }
        await db.doc(`branches/${adminid}/repository/${data.departmentid}`).delete();
        return { success: true };
    }
});

exports.deleteUser = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const adminid = context.auth.uid;
        await db.doc(`branches/${adminid}/repository/${data.uid}`).delete();
        await admin.auth().deleteUser(data.uid);
        return { success: true };
    }
});

exports.updateUser = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        let { uid, name, rank, regular, emailPrefix } = data;
        const adminEmail = context.auth.token.email;
        const adminid = context.auth.uid;
        const domain = adminEmail.split('@')[1];
        const email = `${emailPrefix}@${domain}`;
        await db.doc(`branches/${adminid}/repository/${uid}`).update({
            "data.name": name,
            "data.rank": rank,
            "data.regular": regular,
            "data.email": email
        });
        await admin.auth().updateUser(data.uid, { email });
        let updatedUser = await db.doc(`branches/${adminid}/repository/${data.uid}`).get();
        console.log(updatedUser.data());
        return { success: true };
    }
});

exports.updatePassword = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const uid = data.uid;
        const password = data.password;
        await admin.auth().updateUser(uid, { password });
        return { success: true };
    }
});

exports.createUser = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        let { name, rank, regular, departmentid, emailPrefix, password } = data;
        const adminid = context.auth.uid;
        const adminEmail = context.auth.token.email;
        const domain = adminEmail.split('@')[1];
        const email = `${emailPrefix}@${domain}`;
        const repoRef = db.collection(`branches/${adminid}/repository`);
        const userRecord = await admin.auth().createUser({
            email,
            password
        });
        const newUid = userRecord.uid;
        await admin.auth().setCustomUserClaims(newUid, { branchid: adminid, departmentid });
        await repoRef.doc(newUid).set({
            type: 'user', departmentid, data: {
            branchid: adminid,
            departmentid,
            name,
            rank,
            regular,
            email,
            status: {
                am: {
                    code: 0,
                    remarks: "",
                    updatedby: 'admin',
                    timestamp: FieldValue.serverTimestamp()
                },
                pm: {
                    code: 0,
                    remarks: "",
                    updatedby: 'admin',
                    timestamp: FieldValue.serverTimestamp()
                }
            }
        }});
        return { success: true }
    }
});

// exports.migrateData = functions.region('asia-northeast1').https.onCall(async (data, context) => {
//     let isAdmin = await checkIsAdmin(context);
//     if (isAdmin) {
//         const adminid = context.auth.uid;
//         const departmentsRef = await db.collection(`branches/${adminid}/departments`).get();
//         let data = [];
//         for (let department of departmentsRef.docs) {
//             data.push({
//                 uid: department.id,
//                 data: {
//                     type: 'department',
//                     data: department.data()
//                 }
//             });
//         }
//         const usersRef = await db.collectionGroup('users').where('branchid', '==', adminid).get();
//         for (let user of usersRef.docs) {
//             let departmentid = user.data().departmentid;
//             data.push({
//                 uid: user.id,
//                 data: {
//                     type: 'user',
//                     departmentid,
//                     data: user.data()
//                 }
//             });
//         }
//         for (let item of data) {
//             await db.doc(`branches/${adminid}/repository/${item.uid}`).set(item.data);
//         }
//         let repoRef = await db.collection(`branches/${adminid}/repository`).get();
//         repoRef.forEach(doc => console.log(doc.data()));
//     }
// });


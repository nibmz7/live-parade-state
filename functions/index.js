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
    const adminid = context.auth.uid;
    const adminEmail = context.auth.token.email;
    if (adminEmail.split('@')[0] != 'admin') {
        throw new functions.https.HttpsError('failed-precondition', 'You must be an admin to call this function');
    }
    let branchDoc = await db.doc(`branches/${adminid}`).get();
    return branchDoc.exists;
}

exports.deleteDepartment = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const adminid = context.auth.uid;
        let users = await db.collection(`branches/${adminid}/departments/${data.departmentid}/users`).get();
        if(!users.empty) {
            for(let user of users) {
                await admin.auth().deleteUser(user.id);
                await user.delete();
            }
        }
        await db.doc(`branches/${adminid}/departments/${data.departmentid}`).delete();
        return { success: true };
    }
});

exports.deleteUser = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const adminid = context.auth.uid;
        await admin.auth().deleteUser(data.uid);
        await doc(`branches/${adminid}/departments/${data.departmentid}/users/${data.uid}`).delete();
        return { success: true };
    }
});

exports.updateUser = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const adminEmail = context.auth.token.email;
        const adminid = context.auth.uid;
        const domain = adminEmail.split('@')[1];
        const email = `${data.emailPrefix}@${domain}`;
        admin.auth().updateUser(data.uid, { email });
        await db.doc(`branches/${adminid}/departments/${data.departmentid}/users/${uid}`).update({
            name: data.name,
            rank: data.rank,
            email
        });
        return { success: true };
    }
});

exports.updatePassword = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    let isAdmin = await cehckIsAdmin(context);
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
        const adminid = context.auth.uid;
        const adminEmail = context.auth.token.email;
        const domain = adminEmail.split('@')[1];
        const email = `${data.emailPrefix}@${domain}`;
        const usersRef = db.collection(`branches/${adminid}/departments/${data.departmentid}/users`);
        const userRecord = await admin.auth().createUser({
            email,
            password: data.password
        });
        const newUid = userRecord.uid;
        admin.auth().setCustomUserClaims(newUid, { branchid: adminid });
        await usersRef.doc(newUid).set({
            branchid: adminid,
            departmentid: data.departmentid,
            name: data.name,
            rank: data.rank,
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
        });
        return { success: true }
    }
});


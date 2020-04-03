//TODO: remove duplicate codes
const functions = require('firebase-functions');
const admin = require('firebase-admin');
serviceAccount = require(process.env.PATH_TO_SAKFILE);
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);
const db = admin.firestore();

exports.deleteUser = functions.region('asia-northeast1').https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const adminid = context.auth.uid;
    const adminEmail = context.auth.token.email;
    if (adminEmail.split('@')[0] != 'admin') {
        throw new functions.https.HttpsError('failed-precondition', 'You must be an admin to call this function');
    }
    const branchRef = db.collection('branches').doc(adminid);
    branchRef.get().then(doc => {
        const uid = data.uid;
        const departmentid = data.departmentid;
        if (doc.exists) {
            admin.auth().deleteUser(uid)
            .then(() => {
                branchRef.collection('departments').doc(departmentid).collection('users').doc(uid).delete();
                return {success: true};
            })
            .catch(error => {
                throw new functions.https.HttpsError('Error deleting user', error.message);
            });
        } else {
            throw new functions.https.HttpsError('Admin does not exist', 'You got some explaining to do!');
        }
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.updateUser = functions.region('asia-northeast1').https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const adminid = context.auth.uid;
    const adminEmail = context.auth.token.email;
    const domain = adminEmail.split('@')[1];
    if (adminEmail.split('@')[0] != 'admin') {
        throw new functions.https.HttpsError('failed-precondition', 'You must be an admin to call this function');
    }
    const branchRef = db.collection('branches').doc(adminid);
    branchRef.get().then(doc => {
        const uid = data.uid;
        const departmentid = data.departmentid;
        const name = data.name;
        const rank = data.rank;
        const emailPrefix = data.emailPrefix;
        if (doc.exists) {
            admin.auth().updateUser(uid, {email:  `${emailPrefix}@${domain}`});
            branchRef.collection('departments').doc(departmentid)
            .collection('users').doc(uid).update({
                name: name,
                rank: rank
            });
        } else {
            throw new functions.https.HttpsError('Admin does not exist', 'You got some explaining to do!');
        }
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.updatePassword = functions.region('asia-northeast1').https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const adminid = context.auth.uid;
    const adminEmail = context.auth.token.email;
    const domain = adminEmail.split('@')[1];
    if (adminEmail.split('@')[0] != 'admin') {
        throw new functions.https.HttpsError('failed-precondition', 'You must be an admin to call this function');
    }
    const branchRef = db.collection('branches').doc(adminid);
    branchRef.get().then(doc => {
        const uid = data.uid;
        const password = data.password;
        if (doc.exists) {
            admin.auth().updateUser(uid, {password:  password});
        } else {
            throw new functions.https.HttpsError('Admin does not exist', 'You got some explaining to do!');
        }
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});

exports.createUser = functions.region('asia-northeast1').https.onCall( async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const adminid = context.auth.uid;
    const adminEmail = context.auth.token.email;
    const domain = adminEmail.split('@')[1];
    if (adminEmail.split('@')[0] != 'admin') {
        throw new functions.https.HttpsError('failed-precondition', 'You must be an admin to call this function');
    }
    await db.collection('branches').add({name: "john doe"});
    return {success: true};
    const departmentRef = db.doc(`branches/${adminid}/departments/${data.departmentid}`);
    departmentRef.get().then(doc => {
        if (doc.exists) {
            const emailPrefix =  data.emailPrefix;
            const password = data.password;
            const name = data.name;
            const rank = data.rank;
            const departmentid = data.departmentid;
            admin.auth().createUser({
                email: `${emailPrefix}@${domain}`,
                password: password
            })
            .then( userRecord => {
                const newUid = userRecord.uid;
                admin.auth().setCustomUserClaims(newUid, {branchid: adminid});
                departmentRef.collection('users').doc(newUid).set({
                    branchid: adminid,
                    departmentid: departmentid,
                    name: name,
                    rank: rank,
                    status: {
                        am: {
                            code: 0,
                            remarks: "",
                            updatedby: adminEmail,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        },
                        pm: {
                            code: 0,
                            remarks: "",
                            updatedby: adminEmail,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        }
                    }
                }).then(() => {
                    return {success: true};
                })
                .catch(error => {
                    throw new functions.https.HttpsError('User created with error', error.message, error);
                });
            })
            .catch(error => {
                throw new functions.https.HttpsError('Error creating new user', error.message, error);
            });
        } else {
            throw new functions.https.HttpsError('Admin does not exist', 'You got some explaining to do!');
        }
    }).catch(error => {
        throw new functions.https.HttpsError('unknown', error.message, error);
    });
});


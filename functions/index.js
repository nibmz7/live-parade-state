"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updatePassword = exports.updateUser = exports.createUser = exports.deleteDepartment = void 0;
const admin = __importStar(require("firebase-admin"));
const functions = __importStar(require("firebase-functions"));
admin.initializeApp();
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const regionalFunction = functions.region('asia-northeast1');
const StatusDefault = () => ({
    code: 0,
    remarks: '',
    updatedby: 'admin',
    timestamp: FieldValue.serverTimestamp()
});
const checkIsAdmin = async (context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.');
    }
    const admins = ['admin@sbw.plc', 'admin@test.com'];
    const adminEmail = context.auth.token.email;
    if (!admins.includes(adminEmail)) {
        throw new functions.https.HttpsError('failed-precondition', 'You must be an admin to call this function');
    }
    return true;
};
exports.deleteDepartment = regionalFunction.https.onCall(async (data, context) => {
    const isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const adminid = context.auth.uid;
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
});
exports.createUser = regionalFunction.https.onCall(async (data, context) => {
    let isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const { name, rank, regular, departmentid, emailPrefix, password } = data;
        const branchid = context.auth.uid;
        const adminEmail = context.auth.token.email;
        const domain = adminEmail.split('@')[1];
        const email = `${emailPrefix}@${domain}`;
        const repoRef = db.collection(`branches/${branchid}/repository`);
        const user = await admin.auth().createUser({
            email,
            password
        });
        await admin
            .auth()
            .setCustomUserClaims(user.uid, { branchid, departmentid });
        await repoRef.doc(user.uid).set({
            type: 'user',
            data: {
                branchid,
                departmentid,
                name,
                rank,
                regular,
                email,
                status: {
                    am: StatusDefault(),
                    pm: StatusDefault()
                }
            }
        });
    }
});
exports.updateUser = regionalFunction.https.onCall(async (data, context) => {
    const isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        let { uid, name, rank, regular, emailPrefix, departmentid } = data;
        const branchid = context.auth.uid;
        const adminEmail = context.auth.token.email;
        const domain = adminEmail.split('@')[1];
        const email = `${emailPrefix}@${domain}`;
        await admin.auth().updateUser(uid, { email });
        await admin.auth().setCustomUserClaims(uid, { branchid, departmentid });
        await db.doc(`branches/${branchid}/repository/${uid}`).update({
            'data.name': name,
            'data.rank': rank,
            'data.regular': regular,
            'data.email': email,
            'data.departmentid': departmentid
        });
    }
});
exports.updatePassword = regionalFunction.https.onCall(async (data, context) => {
    const isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const uid = data.uid;
        const password = data.password;
        await admin.auth().updateUser(uid, { password });
    }
});
exports.deleteUser = regionalFunction.https.onCall(async (data, context) => {
    const isAdmin = await checkIsAdmin(context);
    if (isAdmin) {
        const adminid = context.auth.uid;
        await admin.auth().deleteUser(data.uid);
        await db.doc(`branches/${adminid}/repository/${data.uid}`).delete();
    }
});
//# sourceMappingURL=index.js.map
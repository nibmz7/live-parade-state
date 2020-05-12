import UI from '../ui/index.js';
import BaseController from './BaseController.js';
import STATUS from '../model/Status.js';

export default class UserController extends BaseController {

    constructor() {
        super();
        UI.userScreen();
        this.viewName = 'user';
        this.users = {};
    }

    createMainView() {
        return document.createElement('user-view');
    }

    updateUserStatus(isMorning, code, remarks, uid) {
        const status = {
            code,
            remarks,
            updatedby: this.userid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        this.branchRepository.updateUserStatus(isMorning, status, uid, this.branchid, this.users[uid].departmentid);
    }

    async activate(user) {
        super.activate();
        this.users = {};
        this.userid = user.uid;
        this.branchid = user.branchid;
        this.departmentid = user.departmentid;
        this.branchRepository.subscribe(user.branchid);
    }

    onUserEvent(type, user) {
        if (type == 'added') {
            if (this.userid === user.uid) {
                this.mainView.setWelcomeText(user.fullname);
                if (user.regular) {
                    for (const uid in this.mainView.views.departments) {
                        this.mainView.views.departments[uid].isEditable = true;
                    }
                }
            }
            this.mainView.views.summary.addUser(user);
        }
        if (type == 'modified') this.mainView.views.summary.changeUser(user);
        if (type == 'removed') this.mainView.views.summary.removeUser(user);
    }

    subscribeDepartmentEvent(data) {
        let type = data.type;
        if (type == 'found') {
            let userDepartment;
            let departments = data.departments
                .filter(department => {
                    let isDiffDepartment = department.uid != this.departmentid;
                    if (!isDiffDepartment) userDepartment = department;
                    return isDiffDepartment;
                });
            departments.unshift(userDepartment);
            for (let department of departments) {
                this.mainView.addDepartment(department);
            }
            this.mainView.views.departments[this.departmentid].isEditable = true;
        }
        else super.subscribeDepartmentEvent(data);
    }

    getSummaryData() {
        this.resortUsers();
        this.summaryData = { am: [], pm: [] };
        const insertUserByStatus = (prefix, user) => {
            let userStatusCode = user.status[prefix].code;
            let category = STATUS[userStatusCode].category;
            this.summaryData[prefix][category].push(user);
        }
        for (let user of this.usersSorted) {
            insertUserByStatus('am', user);
            insertUserByStatus('pm', user);
        }
    }
}

UserController.instance = null;
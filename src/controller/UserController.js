import BaseController from './BaseController.js';
import STATUS from '../model/Status.js';
import UserView from '../ui/user-view/UserView.js';
import User from '../model/User.js';

export default class UserController extends BaseController {

    constructor() {
        super();
        this.viewName = 'user';
    }

    createMainView() {
        return new UserView();
    }

    updateUserStatus(morningOnlyUpdate, code, remarks, uid) {
        let status = User.createStatus(code, remarks, this.userid);
        this.branchRepository.updateUserStatus(morningOnlyUpdate, status, uid, this.branchid);
    }

    activate(user) {
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
        else if (type == 'modified') this.mainView.views.summary.changeUser(user);
        else if (type == 'removed') this.mainView.views.summary.removeUser(user);
    }

    subscribeDepartmentEvent(data) {
        let type = data.type;
        if (type == 'found') {
            let userDepartment;
            let departments = data.departments
                .filter(department => {
                    let isUserDepartment = department.uid === this.departmentid;
                    if (isUserDepartment) userDepartment = department;
                    return !isUserDepartment;
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
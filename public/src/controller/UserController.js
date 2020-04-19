import UI from '../ui/index.js';
import BaseController from './BaseController.js';
import STATUS from '../data/Status.js';

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
                updatedby: this.authUser.uid, 
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        this.usersRepository.updateUserStatus(isMorning, status, uid, this.branchid, this.departmentid);
    }

    async activate(user) {
        super.activate(user);
        this.users = {};
        this.authUser = user;
        let idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        this.branchid = idTokenResult.claims.branchid;
        this.departmentid = idTokenResult.claims.departmentid;
        this.usersRepository.getDepartments(this.branchid);
    }

    userEventFound(type, user) {
        if(type == 'added') {
            if(this.authUser.uid == user.uid) {
                this.mainView.welcomeText = user.fullname;
            }
            this.mainView.summaryView.addUser(user, 'am');
            this.mainView.summaryView.addUser(user, 'pm');
        }
        if(type == 'modified') {
            const checkIfStatusChanged = timeOfDay => {
                let status = user.status[timeOfDay];
                let prevStatus = this.users[user.uid].status[timeOfDay];
                if(prevStatus.code != status.code) {
                    this.mainView.summaryView.removeUser(this.users[user.uid], timeOfDay);
                    this.mainView.summaryView.addUser(user, timeOfDay);
                } else {
                    let prevRemarksLength = prevStatus.remarks.length;
                    let remarksLength = status.remarks.length;
                    let remarksChanged = 0;
                    if(prevRemarksLength == 0 && remarksLength > 0) remarksChanged = 1;
                    if(prevRemarksLength > 0 && remarksLength == 0) remarksChanged = -1;
                    this.mainView.summaryView.changeUser(user, timeOfDay, remarksChanged);
                }
            }
            checkIfStatusChanged('am');
            checkIfStatusChanged('pm');
        }
        if(type == 'removed') {
            this.mainView.summaryView.removeUser(user, 'am');
            this.mainView.summaryView.removeUser(user, 'pm');
        }
    }
    
    onDepartmentEvent(data) {
        let type = data.type;
        if (type == 'found') {
            let userDepartment;
            let departments = data.departments
            .filter(department => {
                let isDiffDepartment = department.uid != this.departmentid;
                if(!isDiffDepartment) userDepartment = department;
                return isDiffDepartment;
            });
            departments.unshift(userDepartment);
            for (let department of departments) {
                this.mainView.addDepartment(department);
            }
            this.mainView.departmentViews[this.departmentid].isEditable = true;
            this.usersRepository.subscribeUsers(this.branchid);
        }
    }

    getSummaryData() {
        this.resortUsers();
        this.summaryData = {am: [], pm: []};
        const insertUserByStatus = (prefix, user) => {
            let userStatusCode = user.status[prefix].code;
            let category = STATUS[userStatusCode].category;
            this.summaryData[prefix][category].push(user);
        }
        for(let user of this.usersSorted) {
            insertUserByStatus('am', user);
            insertUserByStatus('pm', user);
        }
    }
}

UserController.instance = null;
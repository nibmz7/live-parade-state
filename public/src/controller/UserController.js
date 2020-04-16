import UI from '../ui/index.js';
import BaseController from './BaseController.js';

export default class UserController extends BaseController {

    constructor() {
        super();
        UI.userScreen();
        this.viewName = 'user';
    }

    createMainView() {
        return document.createElement('user-view');
    }

    async activate(user) {
        super.activate(user);
        this.authUser = user;
        let idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        this.branchid = idTokenResult.claims.branchid;
        this.departmentid = idTokenResult.claims.departmentid;
        this.usersRepository.getDepartments(this.branchid);
    }

    onUserEvent(data) {
        super.onUserEvent(data);
        if(data.type == 'found') {
            let user = this.usersSorted.find(obj => obj.uid == this.authUser.uid);
            this.user = user;
            this.mainView.showWelcomeText(user.fullname);
        } else {

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
}

UserController.instance = null;
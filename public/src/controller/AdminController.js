import AdminManager from '../data/AdminManager.js';
import Auth from '../data/Auth.js';
import UserRepository from '../data/UsersRepository.js';

export default class AdminController {

    constructor() {
        this.adminView = document.createElement('admin-view');
        this.adminView.setController(this);
        Auth.getInstance().on('signed-in', this.signedIn.bind(this));
    }

    signedIn(user) {
        let email = user.email;
        if (email.split('@')[0] == 'admin') {
            this.adminManager = new AdminManager();
            this.usersRepository = new UserRepository();
            this.usersRepository.on('user-added', this.onUserAdded.bind(this));
            this.usersRepository.on('user-removed', this.onUserAdded.bind(this));
            this.usersRepository.on('user-changed', this.onUserAdded.bind(this));
            this.usersRepository.on('department-added', this.onDepartmentAdded.bind(this));
            this.usersRepository.on('department-modified', this.onDepartmentChanged.bind(this));
            this.usersRepository.on('department-removed', this.onDepartmentRemoved.bind(this));
            let viewSwitcher = document.querySelector('view-switcher');
            viewSwitcher.showView('admin', this.adminView);
            this.hasDepartmentsLoaded = false;
            this.usersRepository.subscribeDepartments(this.adminManager.adminid);
        }
    }

    onDepartmentRemoved(uid, name) {

    }

    onDepartmentChanged(uid, name) {

    }

    onDepartmentAdded(uid, name) {
        this.adminView.addDepartment(uid, name);
        if (!this.hasDepartmentsLoaded) {
            this.hasDepartmentsLoaded = true;
            this.usersRepository.subscribeUsers(this.adminManager.adminid);
        }
    }

    onUserAdded(e) {

    }

    onUserRemoved(e) {

    }

    onUserChanged(e) {

    }

    createDepartment(name) {
        this.adminManager.createDepartment(name);
    }

    editDepartment(uid, name) {
        this.adminManager.changeDepartmentName(uid, name);
    }

    createUser(e) {
        this.adminManager.createUser(user);
    }

}
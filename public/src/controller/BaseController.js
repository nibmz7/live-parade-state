import AdminManager from '../data/AdminManager.js';
import UserRepository from '../data/UsersRepository.js';
import UI from '../ui/index.js';
import User from "../data/User.js";
import Utils from '../util/Utils.js';

export default class BaseController {

    constructor() {
        this.viewSwitcher = document.querySelector('view-switcher');
        this.usersRepository = new UserRepository();
    }

    static getInstance() {
        if (!this.instance) this.instance = new this();
        return this.instance;
    }

    showWelcomeText(text) {
        Utils.addWelcomeText(text);
    }

    activate(user) {
        this.usersSorted = [];
        this.mainView = this.createMainView();
        this.viewSwitcher.showView(this.viewName, this.mainView);
        this.usersRepository.on('user-event', this.onUserEvent);
        this.usersRepository.on('department-event', this.onDepartmentEvent);
    }

    deactivate() {
        this.mainView = null;
        this.usersRepository.stop('user-event', this.onUserEvent);
        this.usersRepository.stop('department-event', this.onDepartmentEvent);
        this.usersRepository.unsubscribeUsers();
    }

    resortUsers() {
        this.usersSorted.sort(User.compare);
    }

    onUserEvent = data => {
        let type = data.type;
        let user = data.user;
        if (type == 'found') {
            this.usersSorted = data.users;
            this.resortUsers();
            for (let user of this.usersSorted) {
                let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
                departmentCard.addUser(user);
            }
            return;
        }
        if(type == 'empty') return;
        console.log(data);
        let departmentCard = this.mainView.getDepartmentCard(user.departmentid);

        if (type == 'added') {
            departmentCard.addUser(user);
        }
        if (type == 'modified') {
            departmentCard.changeUser(user);
        }
        if (type == 'removed') {
            departmentCard.removeUser(user.uid);
        }
    }

    onDepartmentEvent = data => {
        let type = data.type;
        let department = data.department;
        if (type == 'found') {
            for (let department of data.departments) {
                this.mainView.addDepartment(department);
            }
            this.usersRepository.subscribeUsers(this.branchid);
        }
        if (type == 'added') {
            this.mainView.addDepartment(department);
        }
        if (type == 'modified') {
            this.mainView.modifyDepartment(department);
        }
        if (type == 'removed') {
            this.mainView.removeDepartment(department.uid);
        }
        if (type == 'empty') {
            this.mainView.showEmpty();
        }
    }

    updatePassword(uid, password) {
        this.adminManager.updatePassword(uid, password);
    }

    getDomain() {
        return this.adminManager.email.split('@')[1];
    }

    deleteDepartment(departmentId) {
        this.adminManager.deleteDepartment(departmentId);
    }

    createDepartment(name) {
        this.adminManager.createDepartment(name);
    }

    editDepartment(uid, name) {
        this.adminManager.changeDepartmentName(uid, name);
    }

    createUser(user) {
        this.adminManager.createUser(user);
    }

    updateUser(user) {
        this.adminManager.updateUser(user);
    }

    deleteUser(depId, uid) {
        this.adminManager.deleteUser(depId, uid);
    }

}
import UserRepository from '../data/UsersRepository.js';
import User from "../data/User.js";

export default class BaseController {

    constructor() {
        this.viewSwitcher = document.querySelector('view-switcher');
        this.usersRepository = new UserRepository();
        this.usersSorted = [];
    }

    static getInstance() {
        if (!this.instance) this.instance = new this();
        return this.instance;
    }

    activate(user) {
        this.usersSorted = [];
        this.mainView = this.createMainView();
        this.mainView.setController(this);
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

}
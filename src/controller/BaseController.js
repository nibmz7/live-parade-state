import User from "../model/User.js";

export default class BaseController {

    constructor() {
        this.usersRepository = ApplicationContext.getUsersRepository();
        this.viewSwitcher = document.querySelector('view-switcher');
        this.onUserEvent = this.onUserEvent.bind(this);
        this.onDepartmentEvent = this.onDepartmentEvent.bind(this);
        this.users = {};
    }

    static getInstance() {
        if (!this.instance) this.instance = new this();
        return this.instance;
    }

    activate() {
        this.users = {};
        this.mainView = this.createMainView();
        this.mainView.setController(this);
        this.usersRepository.on('user-event', this.onUserEvent);
        this.usersRepository.on('department-event', this.onDepartmentEvent);
    }

    deactivate() {
        this.viewSwitcher.removeView(this.mainView);
        this.mainView = null;
        this.usersRepository.stop('user-event', this.onUserEvent);
        this.usersRepository.stop('department-event', this.onDepartmentEvent);
        this.usersRepository.unsubscribeUsers();
    }

    getUser(uid) {
        return this.users[uid];
    }

    userEventFound(type, user) {};

    onUserEvent(data) {
        let type = data.type;
        let user = data.user;
        if (type == 'found') {
            data.users.sort(User.compare);
            for (let user of data.users) {
                let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
                departmentCard.addUser(user);
                this.userEventFound('added', user);
                this.users[user.uid] = user;
            }
            this.viewSwitcher.addView(this.mainView);
            return;
        }

        if(type == 'empty') return;

        let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
        if (type == 'added') {
            departmentCard.addUser(user);
            this.userEventFound('added', user);
            this.users[user.uid] = user;
        }
        if (type == 'modified') {
            departmentCard.changeUser(user);
            this.userEventFound('modified', user);
            this.users[user.uid] = user;
        }
        if (type == 'removed') {
            departmentCard.removeUser(user.uid);
            this.userEventFound('removed', user);
            delete this.users[user.uid];
        }
    }

    onDepartmentEvent(data) {
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
import User from "../model/User.js";
import Singleton from "../util/Singleton.js";

export default class BaseController extends Singleton {

    constructor() {
        super();
        this.branchRepository = ApplicationContext.getBranchRepository();
        this.viewSwitcher = document.querySelector('view-switcher');
        this.onUserEvent = this.onUserEvent.bind(this);
        this.onDepartmentEvent = this.onDepartmentEvent.bind(this);
        this.users = {};
    }

    activate() {
        this.mainView = this.createMainView();
        this.mainView.setController(this);
        this.branchRepository.on('user-event', this.onUserEvent);
        this.branchRepository.on('department-event', this.onDepartmentEvent);
    }

    deactivate() {
        this.users = {};
        this.viewSwitcher.removeView(this.mainView);
        this.mainView = null;
        this.branchRepository.stop('user-event', this.subscribeUserEvent);
        this.branchRepository.stop('department-event', this.subscribeDepartmentEvent);
        this.branchRepository.unsubscribe();
    }

    getUser(uid) {
        return this.users[uid];
    }

    onUserEvent(type, user) { 

    };

    subscribeUserEvent(data) {
        let type = data.type;
        let user = data.user;
        if (type == 'found') {
            data.users.sort(User.compare);
            for (let user of data.users) {
                let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
                departmentCard.addUser(user, false);
                this.onUserEvent('added', user);
                this.users[user.uid] = user;
            }
            this.viewSwitcher.addView(this.mainView);
            return;
        }
        let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
        if (type == 'added') {
            departmentCard.addUser(user);
            this.onUserEvent(type, user);
            this.users[user.uid] = user;
        }
        if (type == 'modified') {
            departmentCard.changeUser(user);
            this.onUserEvent(type, user);
            this.users[user.uid] = user;
        }
        if (type == 'removed') {
            departmentCard.removeUser(user);
            this.onUserEvent(type, user);
            delete this.users[user.uid];
        }
    }

    subscribeDepartmentEvent(data) {
        let type = data.type;
        let department = data.department;
        if (type == 'found') {
            for (let department of data.departments) {
                this.mainView.addDepartment(department);
            }
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
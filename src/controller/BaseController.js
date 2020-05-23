import User from "../model/User.js";
import Singleton from "../util/Singleton.js";

export default class BaseController extends Singleton {

    constructor() {
        super();
        this.viewSwitcher = document.querySelector('view-switcher');
        this.branchRepository = ApplicationContext.getBranchRepository();
        this.subscribeUserEvent = this.subscribeUserEvent.bind(this);
        this.subscribeDepartmentEvent = this.subscribeDepartmentEvent.bind(this);
        this.users = {};
    }

    activate() {
        this.mainView = this.createMainView();
        this.mainView.setController(this);
        this.branchRepository.on('user-event', this.subscribeUserEvent);
        this.branchRepository.on('department-event', this.subscribeDepartmentEvent);
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

    onViewReady() {
        this.viewSwitcher.addView(this.mainView);
    }

    subscribeUserEvent(data) {
        let type = data.type;
        let user = data.user;
        if (type === 'found') {
            data.users.sort(User.compare);
            for (let user of data.users) {
                let data = {type: 'added', found: true, user};
                this.subscribeUserEvent(data);
            }
            this.onViewReady();
            return;
        }
        let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
        if (type === 'added') {
            departmentCard.addUser(user, !!!data.found);
            this.users[user.uid] = user;
        }
        else if (type === 'modified') {
            departmentCard.changeUser(user);
            this.users[user.uid] = user;
        }
        else if (type === 'removed') {
            departmentCard.removeUser(user);
            delete this.users[user.uid];
        }
    }

    subscribeDepartmentEvent(data) {
        let type = data.type;
        let department = data.department;
        if (type === 'found') {
            for (let department of data.departments) {
                this.mainView.addDepartment(department);
            }
        }
        else if (type === 'added') {
            this.mainView.addDepartment(department);
        }
        else if (type === 'modified') {
            this.mainView.modifyDepartment(department);
        }
        else if (type === 'removed') {
            this.mainView.removeDepartment(department.uid);
        }
        else if (type === 'empty') {
            this.mainView.showEmpty();
        }
    }

}
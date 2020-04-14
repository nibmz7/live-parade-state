import UserRepository from '../data/UsersRepository.js';
import UI from '../ui/index.js';
import User from "../data/User.js";

export default class UserController {

    constructor() {
        this.isLoaded = false;
        this.usersSorted = [];
    }

    static getInstance() {
        if (!UserController.instance) UserController.instance = new UserController();
        return UserController.instance;
    }

    async activate(user) {
        let idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        this.branchid = idTokenResult.claims.branchid;
        this.user = user;
        if (!this.userView) this.init();
        this.viewSwitcher.showView('user', this.userView);
        this.usersRepository.on('user-event', this.onUserEvent);
        this.usersRepository.on('departments-found', this.onDepartmentsFound);
        this.usersRepository.getDepartments(branchid);
    }

    deactivate() {
        this.usersRepository.stop('user-event', this.onUserEvent);
        this.usersRepository.stop('departments-found', this.onDepartmentEvent);
        this.usersRepository.unsubscribeUsers();
    }

    init() {
        UI.userScreen();
        this.viewSwitcher = document.querySelector('view-switcher');
        this.userView = document.createElement('user-view');
        this.userView.setController(this);
        this.usersRepository = new UserRepository();
    }

    onUserEvent = data => {
        let type = data.type;
        let user = data.user;
        if (type == 'loaded') {
            this.isLoaded = true;
            this.usersSorted.sort(User.compare);
            for (let user of this.usersSorted) {
                let departmentCard = this.userView.getDepartmentCard(user.departmentid);
                departmentCard.addUser(user);
            }
            return;
        }
        let departmentCard = this.userView.getDepartmentCard(user.departmentid);
        if (type == 'added') {
            if (this.isLoaded) departmentCard.addUser(user);
            else {
                this.usersSorted.push(user);
            }
        }
        if (type == 'modified') {
            departmentCard.changeUser(user);
        }
        if (type == 'removed') {
            departmentCard.removeUser(user.uid);
        }
    }

    onDepartmentsFound = departments => {
        for (let department of departments) {
            this.userView.addDepartment(department);
        }
        this.usersRepository.subscribeUsers(this.branchid);
    }

}

UserController.instance = null;
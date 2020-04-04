import AdminManager from '../data/AdminManager.js';
import Auth from '../data/Auth.js';
import UserRepository from '../data/UsersRepository.js';

export default class AdminController {

    constructor() {
        this.adminView = document.createElement('admin-view');
        this.appRouter = document.querySelector('app-router');
        this.adminView.on('create-department', this.createDepartment.bind(this));
        this.adminView.on('create-user', this.createUser.bind(this));
        Auth.getInstance().on('signed-in', this.signedIn.bind(this));
    }

    signedIn(user) {
        let email = user.email;
        if(email.split('@')[0] == 'admin') {
            this.adminManager = new AdminManager();
            this.usersRepository = new UserRepository();
            this.usersRepository.on('user-added', this.onUserAdded.bind(this));
            this.usersRepository.on('user-removed', this.onUserAdded.bind(this));
            this.usersRepository.on('user-changed', this.onUserAdded.bind(this));
            this.appRouter.addView('admin', this.adminView);
        }
    }

    onUserAdded(e) {

    }

    onUserRemoved(e) {

    }

    onUserChanged(e) {

    }

    createDepartment(e) {
        let name = e.detail;
        this.adminManager.createDepartment(name);
    }

    createUser(e) {
        let user = e.detail;
        this.adminManager.createUser(user);
    }

}
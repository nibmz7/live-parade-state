import AdminManager from '../data/AdminManager.js';
import Auth from '../data/Auth.js';

export default class AdminController {

    constructor(adminView) {
        this.adminView = adminView;
        this.appRouter = document.querySelector('app-router');
        this.adminView.bindCreateDepartment(this.createDepartment.bind(this));
        this.adminView.bindCreateUser(this.createUser.bind(this));
        Auth.getInstance().on('signed-in', this.signedIn.bind(this));
    }

    createDepartment(name) {
        this.adminManager.createDepartment(name);
    }

    createUser(emailPrefix, password, name, rank, departmentid) {
        this.adminManager.createUser(emailPrefix, password, name, rank, departmentid);
    }

    signedIn(user) {
        let email = user.email;
        if(email.split('@')[0] == 'admin') {
            this.adminManager = new AdminManager();
            this.appRouter.addView('admin', this.adminView);
        }
    }


}
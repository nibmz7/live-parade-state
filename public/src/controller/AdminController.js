import AdminManager from '../data/AdminManager.js';
import Auth from '../data/Auth.js';

export default class AdminController {

    constructor(adminView) {
        this.adminView = adminView;
        this.appRouter = document.querySelector('app-router');
        this.adminView.bindCreateDepartment(this.createDepartment.bind(this));
        Auth.getInstance().on('signed-in', this.signedIn.bind(this));
    }

    createDepartment(name) {
        this.adminManager.createDepartment(name);
    }

    signedIn(user) {
        let email = user.email;
        if(email.split('@')[0] == 'admin') {
            this.adminManager = new AdminManager();
            this.appRouter.addView('admin', this.adminView);
        }
    }


}
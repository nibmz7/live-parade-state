import UI from '../ui/index.js';
import BaseController from './BaseController.js';

export default class UserController extends BaseController {

    constructor() {
        super();
        UI.userScreen();
        this.viewName = 'user';
    }

    createMainView() {
        return document.createElement('user-view');
    }

    async activate(user) {
        super.activate(user);
        this.authUser = user;
        let idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        this.branchid = idTokenResult.claims.branchid;
        this.usersRepository.getDepartments(branchid);
    }

    onUserEvent = data => {
        super.onUserEvent(data);
        if(data.type == 'found') {
            let user = this.usersSorted.find(obj => obj.uid == this.authUser.uid);
            this.mainView.showWelcomeText(user.fullname);
        } else {

        }
    }
}

UserController.instance = null;
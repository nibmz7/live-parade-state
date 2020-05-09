import UI from '../ui/index.js';
import BaseController from './BaseController.js';

export const STATE = {
  creating: 'creating',
  updating: 'updating',
  removing: 'removing',
  completed: 'completed'
}

export default class AdminController extends BaseController {

  constructor() {
    super();
    UI.adminScreen();
    this.adminManager = ApplicationContext.getAdminManager();
    this.viewName = 'admin';
    this.pendingState = {};
  }

  createMainView() {
    return document.createElement('admin-view');
  }

  async activate(user) {
    super.activate();
    await this.adminManager.init(user.uid, user.email);
    this.mainView.setWelcomeText('admin user');
    this.branchid = user.uid;
    this.branchRepository.subscribe(user.uid);
  }

  updatePassword(uid, password) {
    this.adminManager.updatePassword(uid, password);
  }

  getDomain() {
    return this.adminManager.domain;
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

  performUserRequest(user, state) {
    let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
    user.state = state;
    user.fullname = user.rank + ' ' + user.name;
    user.email = `${user.emailPrefix}@${this.getDomain()}`;
    this.pendingState[user.email] = true;
    try {
      if(state === STATE.creating) {
        user.uid = user.email;
        departmentCard.addUser(user, false);
        this.adminManager.createUser(user);
      }
      if(state === STATE.updating) {
        departmentCard.changeUser(user, false);
        this.adminManager.updateUser(user);
      }
      if(state === STATE.removing) {
        departmentCard.changeUser(user, false);
        this.adminManager.deleteUser(user.departmentid, user.uid);
      }
    } catch (error) {
      console.log(error);
      let user = this.users[user.uid];
      user.state = STATE.completed;
      departmentCard.changeUser(user, false);
    }
  }

  createUser(user) {
    this.performUserRequest(user, STATE.creating);
  }

  updateUser(user) {
    this.performUserRequest(user, STATE.updating);
  }

  deleteUser(user) {
    this.performUserRequest(user, STATE.removing);
  }

  onUserEvent(data) {
    let type = data.type;
    let user = data.user;
    if (type !== 'found' && this.pendingState[user.email]) {
      let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
      if (type == 'added') {
        data.type = 'modified';
        departmentCard.updatePendingUserId(user);
      }
      user.state = STATE.completed;
      delete this.pendingState[user.email];
      this.users[user.uid] = user;
    }
    super.onUserEvent(data);
  }

}

AdminController.instance = null;
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

  createUser(user) {
    this.pendingState[user.email] = true;
    this.adminManager.createUser(user);
  }

  updateUser(user) {
    this.pendingState[user.email] = true;
    let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
    user.state = STATE.updating;
    user.fullname = user.rank + ' ' + user.name;
    user.email = `${user.emailPrefix}${this.getDomain()}`;
    departmentCard.changeUser(user);
    this.adminManager.updateUser(user).catch(error => {
      console.log(error);
    });
  }

  deleteUser(user) {
    this.pendingState[user.email] = true;
    let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
    user.state = STATE.removing;
    departmentCard.changeUser(user);
    this.adminManager.deleteUser(user.departmentid, user.uid).catch(error => {
      console.log(error);
    });
  }

  userEventFound(type, user) {
    if (!this.pendingState[user.email]) return;

    let departmentCard = this.mainView.getDepartmentCard(user.departmentid);
    if (type == 'added') {
      departmentCard.updatePendingUserId(user);
      user.state = STATE.completed;
      delete this.pendingState[user.email];
    }
    if (type == 'modified') {
      user.state = STATE.completed;
    }

  }

}

AdminController.instance = null;
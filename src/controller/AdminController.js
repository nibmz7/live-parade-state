import UI from '../ui/index.js';
import BaseController from './BaseController.js';

export default class AdminController extends BaseController {

  constructor() {
    super();
    UI.adminScreen();
    this.adminManager = ApplicationContext.getAdminManager();
    this.viewName = 'admin';
  }

  createMainView() {
    return document.createElement('admin-view');
  }

  activate(user) {
    super.activate();
    this.mainView.setWelcomeText('admin user');
    this.branchid = user.uid;
    this.branchRepository.subscribe(user.uid);
    this.adminManager.setAdminInfo(user.uid, user.email);
  }

  updatePassword(uid, password) {
    this.adminManager.updatePassword(uid, password);
  }

  getDomain() {
    return this.adminManager.email.split('@')[1];
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
    this.adminManager.createUser(user);
  }

  updateUser(user) {
    this.adminManager.updateUser(user);
  }

  deleteUser(depId, uid) {
    this.adminManager.deleteUser(depId, uid);
  }

}

AdminController.instance = null;
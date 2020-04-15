import AdminManager from '../data/AdminManager.js';
import UserRepository from '../data/UsersRepository.js';
import UI from '../ui/index.js';
import User from "../data/User.js";
import Utils from '../util/Utils.js';

export default class AdminController {

  constructor() {
    UI.adminScreen();
    this.viewSwitcher = document.querySelector('view-switcher');
    this.adminManager = new AdminManager();
    this.usersRepository = new UserRepository();
  }

  static getInstance() {
    if (!AdminController.instance) AdminController.instance = new AdminController();
    return AdminController.instance;
  }

  activate(user) {
    Utils.addWelcomeText('admin user');
    this.isLoaded = false;
    this.usersSorted = [];
    this.adminView = document.createElement('admin-view');
    this.adminManager.setAdminInfo(user.uid, user.email);
    this.viewSwitcher.showView('admin', this.adminView);
    this.usersRepository.subscribeDepartments(this.adminManager.adminid);
    this.usersRepository.on('user-event', this.onUserEvent);
    this.usersRepository.on('department-event', this.onDepartmentEvent);
  }

  deactivate() {
    this.usersRepository.stop('user-event', this.onUserEvent);
    this.usersRepository.stop('department-event', this.onDepartmentEvent);
    this.usersRepository.unsubscribeDepartments();
    this.usersRepository.unsubscribeUsers();
    this.adminView = null;
  }

  onUserEvent = data => {
    let type = data.type;
    let user = data.user;
    if (type == 'loaded') {
      this.isLoaded = true;
      this.usersSorted.sort(User.compare);
      for (let user of this.usersSorted) {
        let departmentCard = this.adminView.getDepartmentCard(user.departmentid);
        departmentCard.addUser(user);
      }
      return;
    }
    let departmentCard = this.adminView.getDepartmentCard(user.departmentid);
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

  onDepartmentEvent = data => {
    let type = data.type;
    let department = data.department;
    if (type == 'added') {
      this.adminView.addDepartment(department);
    }
    if (type == 'modified') {
      this.adminView.modifyDepartment(department);
    }
    if (type == 'removed') {
      this.adminView.removeDepartment(department.uid);
    }
    if (type == 'loaded') {
      this.usersRepository.subscribeUsers(this.adminManager.adminid);
    }
    if (type == 'empty') {
      this.adminView.showEmpty();
    }
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
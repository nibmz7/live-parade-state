import AdminManager from '../data/AdminManager.js';
import UserRepository from '../data/UsersRepository.js';
import UI from '../ui/index.js';
export default class AdminController {

    constructor() {
        
    }
    
    static getInstance() {
      if (!AdminController.instance) AdminController.instance = new AdminController();
      return AdminController.instance;
    }
    
    activate(user) {
      if(!this.adminView) this.init();
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
    }
    
    init() {
      UI.adminScreen();
      this.viewSwitcher = document.querySelector('view-switcher');
      this.adminView = document.createElement('admin-view');
      this.adminView.setController(this);
      this.adminManager = new AdminManager();
      this.usersRepository = new UserRepository();
    }
    
    onUserEvent = data => {
      let type = data.type;
      let user = data.user;
      let departmentCard = this.adminView.getDepartmentCard(user.departmentid);
      if(type == 'added') {
        departmentCard.addUser(user);
      }
      if(type == 'modified') {
        departmentCard.changeUser(user);
      }
      if(type == 'removed') {
        departmentCard.removeUser(user.uid);
      }
    }
    
    onDepartmentEvent = data => {
      let type = data.type;
      let department = data.department;
      if(type == 'added') {
        this.adminView.addDepartment(department.uid, department.name);
      }
      if(type == 'modified') {
        this.adminView.modifyDepartment(data.uid, data.name);
      }
      if(type == 'removed') {
        this.adminView.removeDepartment(data.uid);
      }
      if(type == 'loaded') {
        this.usersRepository.subscribeUsers(this.adminManager.adminid);
      }
      if(type == 'empty') {
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
import AdminManager from '../data/AdminManager.js';
import UserRepository from '../data/UsersRepository.js';
import UI from '../ui/index.js';
export default class AdminController {

    constructor() {
        this.hasDepartmentsLoaded = false;
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
    }
    
    deactivate() {
      this.usersRepository.unsubscribeDepartments();
    }
    
    init() {
      UI.adminScreen();
      this.viewSwitcher = document.querySelector('view-switcher');
      this.adminView = document.createElement('admin-view');
      this.adminView.setController(this);
      this.adminManager = new AdminManager();
      this.usersRepository = new UserRepository();
      this.usersRepository.on('user-added', this.onUserAdded.bind(this));
      this.usersRepository.on('user-removed', this.onUserRemoved.bind(this));
      this.usersRepository.on('user-modified', this.onUserChanged.bind(this));
      this.usersRepository.on('department-added', this.onDepartmentAdded.bind(this));
      this.usersRepository.on('department-modified', this.onDepartmentChanged.bind(this));
      this.usersRepository.on('department-removed', this.onDepartmentRemoved.bind(this));
    }

    updatePassword(uid, password) {
        this.adminManager.updatePassword(uid, password);
    }

    getDomain() {
        return this.adminManager.email.split('@')[1];
    }

    onDepartmentRemoved(data) {
        this.adminView.removeDepartment(data.uid);
    }

    onDepartmentChanged(data) {
        this.adminView.modifyDepartment(data.uid, data.name);
    }

    onDepartmentAdded(data) {
        this.adminView.addDepartment(data.uid, data.name);
        if (!this.hasDepartmentsLoaded) {
            this.hasDepartmentsLoaded = true;
            this.usersRepository.subscribeUsers(this.adminManager.adminid);
        }
    }

    onUserAdded(user) {
        let departmentCard = this.adminView.getDepartmentCard(user.departmentid);
        departmentCard.addUser(user);
    }

    onUserRemoved(user) {
        let departmentCard = this.adminView.getDepartmentCard(user.departmentid);
        departmentCard.removeUser(user.uid);
    }

    onUserChanged(user) {
        let departmentCard = this.adminView.getDepartmentCard(user.departmentid);
        departmentCard.changeUser(user);
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
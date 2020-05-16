import Auth from './data/Auth.js';
import BranchRepository from './data/BranchRepository.js';
import AdminManager from './data/AdminManager.js';
import App from '../src/app.js';

class Application extends App {
  constructor() {
    super();
  }

  getAuth() {
    return Auth.getInstance();
  }

  getBranchRepository() {
    return BranchRepository.getInstance();
  }

  getAdminManager() {
    return AdminManager.getInstance();
  }
}

window.ApplicationContext = new Application();
ApplicationContext.init();


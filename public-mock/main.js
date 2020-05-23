import FakeAuth from './data/FakeAuth.js';
import FakeBranchRepository from './data/FakeBranchRepository.js';
import App from '../src/app.js';
import FakeAdminManager from './data/FakeAdminManager.js';

window.firebase = {
  firestore: {
    FieldValue: {
      serverTimestamp: function() {
        return new Date();
      }
    }
  }
}
class Application extends App {
  constructor() {
    super();
  }

  async showUserScreen(user) {
    if(this.currentScreen) await new Promise(res => setTimeout(res, 700));
    super.showUserScreen(user);
  }

  getAuth() {
    return FakeAuth.getInstance();
  }

  getBranchRepository() {
    return FakeBranchRepository.getInstance();
  }

  getAdminManager() {
    return FakeAdminManager.getInstance();
  }
}

window.ApplicationContext = new Application();
ApplicationContext.init();


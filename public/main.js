import './init.js';
import Auth from './data/Auth.js';
import LoginScreen from '../src/ui/login-view/LoginScreen.js';

const FIRESTORE_URL = 'https://www.gstatic.com/firebasejs/7.14.2/firebase-firestore.js';

class App {
  constructor() {
    this.auth = this.getAuth();
    this.auth.on('signed-out', this.onSignedOut.bind(this));
    this.auth.on('signed-in', this.onSignedIn.bind(this)); 
    this.auth.init();
  }

  async initializeDb() {
    if(firebase.firestore() === undefined) {
      await import(FIRESTORE_URL);
      /*firebase.firestore().settings({
        host: "192.168.0.139:8080",
        ssl: false
      });*/
    }
  }

  onSignedOut() {
    hideCurrentScreen();
    this.showLogicScreen();
  }

  onSignedIn(user) {
    hideCurrentScreen();
    user.isAdmin ? this.showAdminScreen(user) : this.showUserScreen(user);
  }
  
  hideCurrentScreen() {
    if(this.currentScreen) 
      this.currentScreen.deactivate();
  }

  showLogicScreen() {
    if(!this.loginScreen) {
      this.loginScreen = LoginScreen();
    }
    this.currentScreen = this.loginScreen;
    this.loginScreen.activate();
  }

  async showAdminScreen(user) {
    if(!this.adminScreen) {
      await initializeDb();
      let {default: AdminScreen} = await import(/* webpackChunkName: "admin-screen" */'../src/ui/admin-view/AdminScreen.js');
      this.adminScreen = AdminScreen();
    }
    this.currentScreen = this.adminScreen;
    this.adminScreen.activate(user);
  }

  async showUserScreen(user) {
    if(!this.userScreen) {
      await initializeDb();
      let {default: UserScreen} = await import(/* webpackChunkName: "user-screen" */'../src/ui/user-view/UserScreen.js');
      this.userScreen = UserScreen();
    }
    this.currentScreen = this.userScreen;
    this.userScreen.activate(user);
  }

  getAuth() {
    return Auth.getInstance();
  }
  getBranchRepository() { 
    return this.currentScreen.getBranchRepository();
  }
  getAdminManager() { 
    return this.currentScreen.getAdminManager(); 
  }
}

window.ApplicationContext = new App();


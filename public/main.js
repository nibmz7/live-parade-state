import './init.js';
import Auth from './data/Auth.js';
import LoginScreen from '../src/ui/login-view/LoginScreen.js';

class App {
  constructor() {
    console.log(new Date() - window.startTime);
    this.auth = this.getAuth();
    this.auth.on('signed-out', this.onSignedOut.bind(this));
    this.auth.on('signed-in', this.onSignedIn.bind(this));  
  }

  init() {
    // firebase.firestore().settings({
    //   host: "192.168.0.139:8080",
    //   ssl: false
    // });
    this.auth.init();
  }

  swapControllers(newController, data) {
    if (this.currentController) this.currentController.deactivate();
    if (data) newController.activate(data);
    else newController.activate();
    this.currentController = newController;
  }

  onSignedOut() {
    this.showLogicScreen();
  }

  onSignedIn(user) {
    user.isAdmin ? this.showAdminScreen(user) : this.showUserScreen(user);
  }

  async showLogicScreen() {
    if(!this.loginScreen) {
      this.loginScreen = LoginScreen();
    }
    this.swapControllers(this.loginScreen.getController());
  }

  async showAdminScreen(user) {
    if(!this.adminScreen) {
      let {default: AdminScreen} = await import(/* webpackChunkName: "admin-screen" */'../src/ui/admin-view/AdminScreen.js');
      this.adminScreen = AdminScreen();
    }
    this.currentScreen = this.adminScreen;
    this.swapControllers(this.adminScreen.getController(), user);
  }

  async showUserScreen(user) {
    if(!this.userScreen) {
      let {default: UserScreen} = await import(/* webpackChunkName: "user-screen" */'../src/ui/user-view/UserScreen.js');
      this.userScreen = UserScreen();
    }
    this.currentScreen = this.userScreen;
    this.swapControllers(this.userScreen.getController(), user);
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
ApplicationContext.init();


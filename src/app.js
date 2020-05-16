import LoginScreen from '../src/ui/login-view/LoginScreen.js';
import UserScreen from '../src/ui/user-view/UserScreen.js';

class App {
  constructor() {
    this.auth = this.getAuth();
    this.auth.on('signed-out', this.onSignedOut.bind(this));
    this.auth.on('signed-in', this.onSignedIn.bind(this));
  }

  init() {
    this.auth.init();
  }

  onSignedOut() {
    this.hideCurrentScreen();
    this.showLogicScreen();
  }

  onSignedIn(user) {
    this.hideCurrentScreen();
    user.isAdmin ? this.showAdminScreen(user) : this.showUserScreen(user);
  }

  hideCurrentScreen() {
    if (this.currentScreen) this.currentScreen.deactivate();
  }

  showLogicScreen() {
    if (!this.loginScreen) {
      this.loginScreen = LoginScreen();
    }
    this.currentScreen = this.loginScreen;
    this.loginScreen.activate();
  }

  async showAdminScreen(user) {
    if (!this.adminScreen) {
      let { default: AdminScreen } = await import(/* webpackChunkName: "admin-screen" */'../src/ui/admin-view/AdminScreen.js');
      this.adminScreen = AdminScreen();
    }
    this.currentScreen = this.adminScreen;
    this.adminScreen.activate(user);
  }

  showUserScreen(user) {
    if (!this.userScreen) {
      this.userScreen = UserScreen();
    }
    this.currentScreen = this.userScreen;
    this.userScreen.activate(user);
  }

  getAuth() {}

  getBranchRepository() {}

  getAdminManager() {}
}

export default App;


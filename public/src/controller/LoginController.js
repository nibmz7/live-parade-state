import Auth from '../data/Auth.js';
import UI from '../ui/index.js';

export default class LoginController {
    
    constructor() {
        this.auth = Auth.getInstance();
    }
    
    static getInstance() {
      if (!LoginController.instance) LoginController.instance = new LoginController();
      return LoginController.instance;
    }
    
    init() {
      UI.loginScreen();
      this.loginView = document.createElement('login-view');
      this.viewSwitcher = document.querySelector('view-switcher');
      this.loginView.bindSignIn((email, password) => {
        this.auth.login(email, password);
      });
      this.auth.on('error', this.onError);
    }

    activate() {
      if(!this.loginView) this.init();
      this.loginView.reset();
      this.viewSwitcher.showView('login', this.loginView);
    }
    
    deactivate() {
      this.auth.stop('error', this.onError);
    }

    onError = message => {
      this.loginView.reset();
      this.loginView.showError(message);
    }
}
LoginController.instance = null;
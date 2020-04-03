import AppRouter from './AppRouter.js';
import WCButton from './widget/WCButton.js';
import Auth from './data/Auth.js';
import LoginView from './ui/LoginView.js';
import LoginController from './controller/LoginController.js';
import AdminView from './ui/admin/AdminView.js';
import AdminController from './controller/AdminController.js';

customElements.define('app-router', AppRouter);
customElements.define('wc-button', WCButton);
customElements.define('login-view', LoginView);
customElements.define('admin-view', AdminView);


const loginView = new LoginView();
new LoginController(loginView);

const adminView = new AdminView();
new AdminController(adminView);



Auth.getInstance().init();


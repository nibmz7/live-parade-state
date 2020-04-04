import UI from './ui/index.js';
import Auth from './data/Auth.js';
import LoginController from './controller/LoginController.js';
import AdminController from './controller/AdminController.js';

UI.init();
new LoginController();
new AdminController();

Auth.getInstance().init();


import AppRouter from './AppRouter.js';
customElements.define('app-router', AppRouter);

import WCButton from './widget/WCButton.js';
customElements.define('wc-button', WCButton);

import Auth from './data/Auth.js';
import LoginView from './ui/login/LoginView.js';
customElements.define('login-view', LoginView);
import LoginController from './controller/LoginController.js';

const appRouter = document.querySelector('app-router');
const auth = new Auth();
const loginView = new LoginView();
const loginController = new LoginController(auth, loginView);


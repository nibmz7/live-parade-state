import LoginView from './LoginView.js';
import AppRouter from './AppRouter.js';
import WCButton from './widgets/WCButton.js';
import AdminScreen from './admin/index.js';

const UI = {
    init: () => {
        customElements.define('app-router', AppRouter);
        customElements.define('wc-button', WCButton);
        customElements.define('login-view', LoginView);
        AdminScreen();
    }
}

export default UI;
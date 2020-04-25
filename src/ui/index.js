import WCButton from './widgets/WCButton.js';
import WCToast from './widgets/WCToast.js';
import SignOutDialogue from './widgets/SignOutDialogue.js';
import UserScreen from './user-view/UserScreen.js';
import AdminScreen from './admin-view/AdminScreen.js';
import LoginView from './LoginView.js';
import ViewSwitcher from './ViewSwitcher.js';

const UI = {
    init: () => {
        customElements.define('wc-button', WCButton);
        customElements.define('wc-toast', WCToast);
        customElements.define('sign-out', SignOutDialogue);
        customElements.define('view-switcher', ViewSwitcher);
    },

    adminScreen: () => {
      AdminScreen();
    },

    userScreen: () => {
      UserScreen();
    },
    
    loginScreen: () => {
      customElements.define('login-view', LoginView);
    }
}

export default UI;
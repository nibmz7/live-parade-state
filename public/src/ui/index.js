import LoginView from './LoginView.js';
import ViewSwitcher from './ViewSwitcher.js';
import WCButton from './widgets/WCButton.js';
import AdminScreen from './admin/index.js';
import WCToast from './widgets/WCToast.js';
import SignOutDialogue from './widgets/SignOutDialogue.js';

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
    
    loginScreen: () => {
      customElements.define('login-view', LoginView);
    }
}

export default UI;
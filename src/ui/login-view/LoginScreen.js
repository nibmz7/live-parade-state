import WCButton from "../widgets/WCButton.js";
import ViewSwitcher from "../ViewSwitcher.js";
import LoginView from "./LoginView.js";
import LoginController from "../../controller/LoginController.js";

const define = (localName, elementClass) => {
    customElements.get(localName) || customElements.define(localName, elementClass);
}

const LoginScreen = () => {
    define('wc-button', WCButton);
    define('view-switcher', ViewSwitcher);
    define('login-view', LoginView);
    let controller = LoginController.getInstance();
    const activate = (user) => {
      return controller.activate(user);
    }
    const deactivate = () => {
      return controller.deactivate();
    }
    return { activate, deactivate, getController };
}

export default LoginScreen;
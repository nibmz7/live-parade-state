import WCButton from "../widgets/WCButton.js";
import ViewSwitcher from "../ViewSwitcher.js";
import LoginView from "./LoginView.js";
import LoginController from "../../controller/LoginController.js";

const LoginScreen = () => {
    customElements.define('wc-button', WCButton);
    customElements.define('view-switcher', ViewSwitcher);
    customElements.define('login-view', LoginView);
    const getController = () => {
        return LoginController.getInstance();
    }
    return { getController };
}

export default LoginScreen;
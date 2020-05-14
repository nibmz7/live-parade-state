import UserView from "./UserView.js";
import UserDepartmentCard from "./department/UserDepartmentCard.js";
import EditStatus from "./department/EditStatus.js";
import StatusDetails from "./department/StatusDetails.js";
import SummaryCard from "./summary/SummaryCard.js";
import SummaryView from "./summary/SummaryView.js";
import SummaryScreen from "./summary/SummaryScreen.js";
import WCToast from "../widgets/WCToast.js";
import SignOutDialogue from "../widgets/SignOutDialogue.js";
import ViewSwitcher from "../ViewSwitcher.js";
import WCButton from "../widgets/WCButton.js";
import UserController from "../../controller/UserController.js";
import BranchRepository from "../../../public/data/BranchRepository.js";

const define = (localName, elementClass) => {
    customElements.get(localName) || customElements.define(localName, elementClass);
}

const UserScreen = () => {
    define('view-switcher', ViewSwitcher);
    define('wc-button', WCButton);
    define('wc-toast', WCToast);
    define('sign-out', SignOutDialogue);
    define('edit-status', EditStatus);
    define('status-details', StatusDetails);
    define('user-department-card', UserDepartmentCard);
    define('summary-card', SummaryCard);
    define('summary-view', SummaryView);
    define('summary-screen', SummaryScreen);
    define('user-view', UserView);
    const getController = () => {
        return UserController.getInstance();
    }
    const getBranchRepository = () => {
        return BranchRepository.getInstance();
    }
    return { getController, getBranchRepository };
}

export default UserScreen;
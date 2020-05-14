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


const UserScreen = () => {
    customElements.define('view-switcher', ViewSwitcher);
    customElements.define('wc-button', WCButton);
    customElements.define('wc-toast', WCToast);
    customElements.define('sign-out', SignOutDialogue);
    customElements.define('edit-status', EditStatus);
    customElements.define('status-details', StatusDetails);
    customElements.define('user-department-card', UserDepartmentCard);
    customElements.define('summary-card', SummaryCard);
    customElements.define('summary-view', SummaryView);
    customElements.define('summary-screen', SummaryScreen);
    customElements.define('user-view', UserView);
    const getController = () => {
        return UserController.getInstance();
    }
    const getBranchRepository = () => {
        return BranchRepository.getInstance();
    }
    return { getController, getBranchRepository };
}

export default UserScreen;
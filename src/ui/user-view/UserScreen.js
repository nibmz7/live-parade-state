import UserView from "./UserView.js";
import UserDepartmentCard from "./department/UserDepartmentCard.js";
import EditStatus from "./department/EditStatus.js";
import StatusDetails from "./department/StatusDetails.js";
import SummaryCard from "./summary/SummaryCard.js";
import SummaryView from "./summary/SummaryView.js";

const UserScreen = () => {
    customElements.define('edit-status', EditStatus);
    customElements.define('status-details', StatusDetails);
    customElements.define('user-department-card', UserDepartmentCard);
    customElements.define('summary-card', SummaryCard);
    customElements.define('summary-view', SummaryView);
    customElements.define('user-view', UserView);
}

export default UserScreen;
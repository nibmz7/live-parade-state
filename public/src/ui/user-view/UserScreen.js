import UserView from "./UserView.js";
import UserDepartmentCard from "./department/UserDepartmentCard.js";
import EditStatus from "./department/EditStatus.js";
import StatusDetails from "./department/StatusDetails.js";

const UserScreen = () => {
    customElements.define('edit-status', EditStatus);
    customElements.define('status-details', StatusDetails);
    customElements.define('user-department-card', UserDepartmentCard);
    customElements.define('user-view', UserView);
}

export default UserScreen;
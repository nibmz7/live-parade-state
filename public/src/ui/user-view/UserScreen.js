import UserView from "./UserView.js";
import UserDepartmentCard from "./department/UserDepartmentCard.js";
import EditStatus from "./department/EditStatus.js";

const UserScreen = () => {
    customElements.define('edit-status', EditStatus);
    customElements.define('user-department-card', UserDepartmentCard);
    customElements.define('user-view', UserView);
}

export default UserScreen;
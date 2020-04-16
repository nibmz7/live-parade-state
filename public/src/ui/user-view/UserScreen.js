import UserView from "./UserView.js";
import UserDepartmentCard from "./department/UserDepartmentCard.js";

const UserScreen = () => {
    customElements.define('user-department-card', UserDepartmentCard);
    customElements.define('user-view', UserView);
}

export default UserScreen;
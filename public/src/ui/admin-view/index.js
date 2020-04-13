import DepartmentCard from './DepartmentCard.js';
import AdminView from './AdminView.js';
import EditDepartment from './dialogues/EditDepartment.js';
import EditUser from './dialogues/EditUser.js';


const AdminScreen = () => {
    customElements.define('edit-department', EditDepartment);
    customElements.define('edit-user', EditUser);
    customElements.define('department-card', DepartmentCard);
    customElements.define('admin-view', AdminView);
}

export default AdminScreen;
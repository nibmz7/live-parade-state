import AdminDepartmentCard from './AdminDepartmentCard.js';
import AdminView from './AdminView.js';
import EditDepartment from './dialogues/EditDepartment.js';
import EditUser from './dialogues/EditUser.js';


const AdminScreen = () => {
    customElements.define('edit-department', EditDepartment);
    customElements.define('edit-user', EditUser);
    customElements.define('admin-department-card', AdminDepartmentCard);
    customElements.define('admin-view', AdminView);
}

export default AdminScreen;
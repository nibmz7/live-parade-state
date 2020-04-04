import DepartmentCard from './DepartmentCard.js';
import AdminView from './AdminView.js';
import EditDepartment from './dialogues/EditDepartment.js';

const AdminScreen = () => {
    customElements.define('edit-department', EditDepartment);
    customElements.define('department-card', DepartmentCard);
    customElements.define('admin-view', AdminView);
}

export default AdminScreen;
import DepartmentCard from './DepartmentCard.js';
import AdminView from './AdminView.js';

const AdminScreen = () => {
    customElements.define('department-card', DepartmentCard);
    customElements.define('admin-view', AdminView);
}

export default AdminScreen;
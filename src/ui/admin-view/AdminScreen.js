import AdminDepartmentCard from './AdminDepartmentCard.js';
import AdminView from './AdminView.js';
import EditDepartment from './dialogues/EditDepartment.js';
import EditUser from './dialogues/EditUser.js';
import WCToast from '../widgets/WCToast.js';
import SignOutDialogue from '../widgets/SignOutDialogue.js';
import ViewSwitcher from '../ViewSwitcher.js';
import WCButton from '../widgets/WCButton.js';
import AdminController from '../../controller/AdminController.js';
import BranchRepository from '../../../public/data/BranchRepository.js';
import AdminManager from '../../../public/data/AdminManager.js';


const AdminScreen = () => {
    customElements.define('view-switcher', ViewSwitcher);
    customElements.define('wc-button', WCButton);
    customElements.define('wc-toast', WCToast);
    customElements.define('sign-out', SignOutDialogue);
    customElements.define('edit-department', EditDepartment);
    customElements.define('edit-user', EditUser);
    customElements.define('admin-department-card', AdminDepartmentCard);
    customElements.define('admin-view', AdminView);
    const getController = () => {
        return AdminController.getInstance();
    }
    const getBranchRepository = () => {
        return BranchRepository.getInstance();
    }
    const getAdminManager = () => {
        return AdminManager.getInstance();
    }
    return { getController, getBranchRepository, getAdminManager };
}

export default AdminScreen;
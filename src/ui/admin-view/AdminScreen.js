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

const define = (localName, elementClass) => {
    customElements.get(localName) || customElements.define(localName, elementClass);
}

const AdminScreen = () => {
    define('view-switcher', ViewSwitcher);
    define('wc-button', WCButton);
    define('wc-toast', WCToast);
    define('sign-out', SignOutDialogue);
    define('edit-department', EditDepartment);
    define('edit-user', EditUser);
    define('admin-department-card', AdminDepartmentCard);
    define('admin-view', AdminView);
    
    let controller = AdminController.getInstance();
    const activate = (user) => {
      return controller.activate(user);
    }
    const deactivate = () => {
      return controller.deactivate();
    }
    const getBranchRepository = () => {
        return BranchRepository.getInstance();
    }
    const getAdminManager = () => {
        return AdminManager.getInstance();
    }
    return { activate, deactivate, getBranchRepository, getAdminManager };
}

export default AdminScreen;
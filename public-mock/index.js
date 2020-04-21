import UI from '../public/src/ui/index.js';
import LoginController from '../public/src/controller/LoginController.js';
import AdminController from '../public/src/controller/AdminController.js';
import UserController from '../public/src/controller/UserController.js';
import UsersRepository from './data/UsersRepository.js';
import AdminManager from './data/AdminManager.js';
import Auth from './data/Auth.js';

const App = () => {

  const getUsersRepository = () => { return UsersRepository.getInstance(); }
  const getAdminManager = () => { return AdminManager.getInstance(); }
  const getAuth = () => { return Auth.getInstance(); }
  const auth = getAuth();
  let currentController = null;

  const swapControllers = (newController, data) => {
    if (currentController) currentController.deactivate();
    if (data) newController.activate(data);
    else newController.activate();
    currentController = newController;
  }

  auth.on('signed-out', () => {
    let newController = LoginController.getInstance();
    swapControllers(newController);
  });

  auth.on('signed-in', user => {
    let isAdmin = user.email.split('@')[0] == 'admin';
    let newController = isAdmin ? AdminController.getInstance() : UserController.getInstance();
    swapControllers(newController, user);
  });

  const init = () => {
    UI.init();
    auth.init();
  }
  return {
    init,
    getAuth,
    getUsersRepository,
    getAdminManager
  }
}

window.ApplicationContext = App();
ApplicationContext.init();

//mock firebase.firestore.FieldValue.serverTimestamp()


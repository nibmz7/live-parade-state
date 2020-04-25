import LoginController from '../src/controller/LoginController.js';
import AdminController from '../src/controller/AdminController.js';
import UserController from '../src/controller/UserController.js';
import UI from '../src/ui/index.js';
import UsersRepository from './data/UsersRepository.js';
import AdminManager from './data/AdminManager.js';
import Auth from './data/Auth.js';

const App = () => {

  const getUsersRepository = () => { return UsersRepository.getInstance(); }
  const getAdminManager = () => { return AdminManager.getInstance(); }
  const getAuth = () => { return Auth.getInstance(); }
  const auth = getAuth();

  let currentController = null;

  if (location.hostname === "localhost") {
    firebase.firestore().settings({
      host: "localhost:8080",
      ssl: false
    });
  }

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


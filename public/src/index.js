import UI from './ui/index.js';
import Auth from './data/Auth.js';
import LoginController from './controller/LoginController.js';
import AdminController from './controller/AdminController.js';

const App = () => {
  
  UI.init();
    
  const auth = Auth.getInstance();
  
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
    let newController = isAdmin ? AdminController.getInstance() : false;
    swapControllers(newController, user);
  });
  auth.init();
  
}

App();


import UI from './ui/index.js';
import Auth from './data/Auth.js';
import LoginController from './controller/LoginController.js';
import AdminController from './controller/AdminController.js';

const App = () => {
  
  const firebaseConfig = {
    apiKey: "AIzaSyCHukIqjtICPyJrDKo96UFvDXy5a9A8how",
    authDomain: "live-parade-state.firebaseapp.com",
    databaseURL: "https://live-parade-state.firebaseio.com",
    projectId: "live-parade-state",
    storageBucket: "live-parade-state.appspot.com",
    messagingSenderId: "148198970958",
    appId: "1:148198970958:web:dd372f6fe731846ad6d51f"
  };
  firebase.initializeApp(firebaseConfig);
  
  UI.init();
  
  const welcomeText = document.getElementById('welcome-text');
  
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
    welcomeText.style.display = "none";
  });
  
  auth.on('signed-in', user => {
    let isAdmin = user.email.split('@')[0] == 'admin';
    let newController = isAdmin ? AdminController.getInstance() : false;
    swapControllers(newController, user);
    welcomeText.style.display = 'block';
  });
  auth.init();
  
  welcomeText.onclick = e => {
    let signOutDialogue = document.createElement('sign-out');
    document.body.appendChild(signOutDialogue);
  }
}

App();


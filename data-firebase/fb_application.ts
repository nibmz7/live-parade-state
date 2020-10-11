import Application from '../data/application';
import FBAdminManager from './fb_admin_manager';
import FBAuthManager from './fb_auth_manager';
import FBStatusManager from './fb_status_manager';

export default class FBApplication extends Application {
  getAuthManager() {
    return new FBAuthManager();
  }

  getAdminManager() {
    return new FBAdminManager();
  }

  getStatusManager() {
    return new FBStatusManager();
  }
}

window.application = new FBApplication();

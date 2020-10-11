import Application from '../data/application';
import MockAdminManager from './mock_admin_manager';
import MockAuthManager from './mock_auth_manager';
import MockStatusManager from './mock_status_manager';

export default class MockApplication extends Application {
  getAuthManager() {
    return new MockAuthManager();
  }

  getAdminManager() {
    return new MockAdminManager();
  }

  getStatusManager() {
    return new MockStatusManager();
  }
}

window.application = new MockApplication();

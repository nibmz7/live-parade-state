import AdminManager from './admin_manager';
import AuthManager from './auth_manager';
import StatusManager from './status_manager';

declare global {
  interface Window {
    offsetOn: boolean;
    application: Application;
  }
}

export default abstract class Application {
  public abstract getAuthManager(): AuthManager;
  public abstract getAdminManager(): AdminManager;
  public abstract getStatusManager(): StatusManager;
}

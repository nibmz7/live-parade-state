import { DataManager, ACTION_TYPE } from './data_manager';
import { UserStoreState, UserActionError } from './states/user_state';
import { ApplicationStore, ACTION_ROOT } from './store';
import ACTION_USER from './actions/user_action';
import { Unsubscribe } from 'redux';
import User from '../model/user';

export default abstract class StatusManager extends DataManager {
  protected authUser = ApplicationStore.auth.action.payload as User;
  private unsubscribeUser?: Unsubscribe;

  protected startRequestListening(): void {
    this.unsubscribeUser = ApplicationStore.listen(ACTION_ROOT.USERS, (state) =>
      this.userOnRequest(state)
    );
  }
  protected stopRequestListening(): void {
    this.unsubscribeUser?.();
  }

  protected abstract requestModifyUser(state: UserStoreState): void;

  userOnRequest(state: UserStoreState) {
    if (state.action.type !== ACTION_TYPE.REQUEST_MODIFY) return;
    if (!this.isDbConnected) {
      let error: UserActionError = {
        action: state.action,
        type: 'Request failed',
        message: 'Failed to connect to database'
      };
      ApplicationStore.dispatch(ACTION_USER.requestError(error));
      return;
    }
    this.requestModifyUser(state);
  }
}

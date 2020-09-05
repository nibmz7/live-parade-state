import { DataManager, ACTION_TYPE, TYPE_REQUEST } from './data_manager';
import { UserStoreState, UserActionError } from './states/user_state';
import { ApplicationStore, ACTION_ROOT, Predicate } from './store';
import ACTION_USER from './actions/user_action';

export default abstract class StatusManager extends DataManager {
  constructor() {
    super();
    const predicate: Predicate = (state: UserStoreState) =>
      state.action.type !== ACTION_TYPE.MODIFIED;
    ApplicationStore.listen(
      ACTION_ROOT.USERS,
      (state) => this.userOnRequest(state),
      predicate
    );
  }

  protected abstract requestModifyUser(state: UserStoreState): void;

  userOnRequest(state: UserStoreState) {
    if (!TYPE_REQUEST(state.action.type)) return;
    if (!this.isDbConnected) {
      let error: UserActionError = {
        action: state.action,
        type: 'Request failed',
        message: 'Failed to connect to database'
      };
      ApplicationStore.dispatch(ACTION_USER.error(error));
      return;
    }
    this.requestModifyUser(state);
  }
}

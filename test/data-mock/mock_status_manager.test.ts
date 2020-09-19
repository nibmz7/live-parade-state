import { expect } from '@open-wc/testing';
import MockStatusManager from '../../data-mock/mock_status_manager';
import { ApplicationStore, ACTION_ROOT } from '../../data/store';
import { DepartmentStoreState } from '../../data/states/department_state';
import { Unsubscribe } from 'redux';
import { ACTION_TYPE } from '../../data/data_manager';
import { MockModel } from '../../data-mock/mock_data';
import { UserStoreState } from '../../data/states/user_state';
import ACTION_USER from '../../data/actions/user_action';

describe('Mock status manager', () => {
  const mockStatusManager = new MockStatusManager();

  it('Initialization test', (done) => {
    ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      (state: DepartmentStoreState, unsubscribe: Unsubscribe) => {
        if (state.action.type === ACTION_TYPE.INITIALIZED) {
          expect(state.items).to.eql(MockModel.DepartmentArray);
          unsubscribe();
        }
      }
    );
    ApplicationStore.listen(
      ACTION_ROOT.USERS,
      (state: UserStoreState, unsubscribe: Unsubscribe) => {
        if (state.action.type === ACTION_TYPE.INITIALIZED) {
          expect(state.items).to.eql(MockModel.UsersByDepartment);
          unsubscribe();
          done();
        }
      }
    );
    mockStatusManager.subscribe();
  });

  it('Modify user', (done) => {
    let modifiedUser = MockModel.User;
    modifiedUser.name = 'Modified user';
    ApplicationStore.listen(
      ACTION_ROOT.USERS,
      (state: UserStoreState, unsubscribe: Unsubscribe) => {
        if (state.action.type === ACTION_TYPE.MODIFIED) {
          expect(state.action.payload).to.eql(modifiedUser);
          unsubscribe();
          done();
        }
      }
    );
    let action = ACTION_USER.requestModify(modifiedUser);
    ApplicationStore.dispatch(action);
  });
});

import {
  generateActionId,
  ApplicationStore,
  Action,
  ACTION_ROOT
} from '../../data/store';
import { expect } from 'chai';
import ACTION_AUTH from '../../data/actions/auth_action';
import { AuthStoreState } from '../../data/states/auth_state';
import { Unsubscribe } from 'redux';

describe('Store', () => {
  it('Generate action ids', () => {
    ApplicationStore.reset();
    let ids = [
      generateActionId(),
      generateActionId(),
      generateActionId(),
      generateActionId(),
      generateActionId()
    ];
    let expectedIds = [1000, 1001, 1002, 1003, 1004];
    expect(ids).to.eql(expectedIds);
  });

  it('Dispatch and listen', () => {
    let action = ACTION_AUTH.requestSignOut();
    ApplicationStore.listen(
      ACTION_ROOT.AUTH,
      (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
        unsubscribe();
        ApplicationStore.dispatch(action);
        let expectedResult = { action };
        expect(auth).to.eql(expectedResult);
      }
    );
  });

  it('Reset', (done) => {
    let action: Action = {
      id: 0,
      root: ACTION_ROOT.RESET,
      type: ACTION_ROOT.RESET
    };
    let expectedState = {
      auth: { action },
      department: {
        action,
        items: []
      }
    };
    ApplicationStore.listen(ACTION_ROOT.ALL, (data, unsubscribe) => {
      expect(data).to.eql(expectedState);
      unsubscribe();
      done();
    });
    ApplicationStore.reset();
  });
});

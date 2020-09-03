import MockDataManager from '../../data-mock/mock_data_manager';
import { ApplicationStore, ACTION_ROOT } from '../../data/store';
import { DepartmentStoreState } from '../../data/states/department_state';
import { ACTION_TYPE } from '../../data/data_manager';
import { MockModel } from '../../data-mock/mock_data';
import { expect } from 'chai';
import { Unsubscribe } from 'redux';
import ACTION_DEPARTMENT from '../../data/actions/department_action';

describe('Mock Data Manager', async () => {
  const mockDataManager = new MockDataManager();

  after(() => {
    ApplicationStore.reset();
  });

  it('Initialization test', (done) => {
    ApplicationStore.reset();
    let callback = (data: DepartmentStoreState, unsubscribe: Unsubscribe) => {
      if (data.action.type === ACTION_TYPE.INITIALIZED) {
        let expectedResult = MockModel.DepartmentArray;
        expect(data.items).to.eql(expectedResult);
        unsubscribe();
        done();
      }
    };
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, callback);
    mockDataManager.subscribe();
  });

  it('Request add department', (done) => {
    ApplicationStore.reset();
    let callback = (data: DepartmentStoreState, unsubscribe: Unsubscribe) => {
      if (data.action.type === ACTION_TYPE.ADDED) {
        let expectedResult = [MockModel.Department];
        expect(data.items).to.eql(expectedResult);
        unsubscribe();
        done();
      }
    };
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, callback);
    ApplicationStore.dispatch(
      ACTION_DEPARTMENT.requestAdd(MockModel.Department)
    );
  });

  it('Request modify department', (done) => {
    let modifiedDepartment = MockModel.Department;
    modifiedDepartment.name = 'Modified branch';
    let callback = (data: DepartmentStoreState, unsubscribe: Unsubscribe) => {
      if (data.action.type === ACTION_TYPE.MODIFIED) {
        let expectedResult = [modifiedDepartment];
        expect(data.items).to.eql(expectedResult);
        unsubscribe();
        done();
      }
    };
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, callback);
    ApplicationStore.dispatch(
      ACTION_DEPARTMENT.requestModify(modifiedDepartment)
    );
  });

  it('Request remove department', (done) => {
    let callback = (data: DepartmentStoreState, unsubscribe: Unsubscribe) => {
      if (data.action.type === ACTION_TYPE.REMOVED) {
        let expectedResult = [];
        expect(data.items).to.eql(expectedResult);
        unsubscribe();
        done();
      }
    };
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, callback);
    ApplicationStore.dispatch(
      ACTION_DEPARTMENT.requestRemove(MockModel.Department)
    );
  });

  it('Disconnect from DB', (done) => {
    mockDataManager.unsubscribe();
    let action = ACTION_DEPARTMENT.requestAdd(MockModel.Department);
    let callback = (data: DepartmentStoreState, unsubscribe: Unsubscribe) => {
      if (data.action.type === ACTION_TYPE.REQUEST_ERROR) {
        let expectedResult = {
          action: action,
          type: 'Request failed',
          message: 'Failed to connect to database'
        };
        expect(data.action.payload).to.eql(expectedResult);
        unsubscribe();
        done();
      }
    };
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, callback);
    ApplicationStore.dispatch(action);
  });
});

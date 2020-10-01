import { expect } from '@open-wc/testing';
import MockAdminManager from '../../data-mock/mock_admin_manager';
import { ApplicationStore, ACTION_ROOT } from '../../data/store';
import { DepartmentStoreState } from '../../data/states/department_state';
import { ACTION_TYPE } from '../../data/data_manager';
import { MockModel } from '../../data-mock/mock_data';
import { Unsubscribe } from 'redux';
import ACTION_DEPARTMENT from '../../data/actions/department_action';
import Department from '../../model/department';

describe('Mock Admin Manager', async () => {
  const mockAdminManager = new MockAdminManager();

  after(() => {
    mockAdminManager.unsubscribe();
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
    mockAdminManager.subscribe();
  });

  it('Request add department', (done) => {
    ApplicationStore.reset();
    let callback = (data: DepartmentStoreState, unsubscribe: Unsubscribe) => {
      if (data.action.type === ACTION_TYPE.ADDED) {
        expect(data.items[0].name).to.eql(MockModel.Department.name);
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
    let modifiedDepartment: Department = {
      ...ApplicationStore.departments.items[0],
      name: 'Modified branch'
    };
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
      ACTION_DEPARTMENT.requestRemove(
        ApplicationStore.departments.items[0]
      )
    );
  });
});

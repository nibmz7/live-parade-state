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
  mockDataManager.initialize();

  it('Request add data', (done) => {
    ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      (data: DepartmentStoreState, unsubscribe: Unsubscribe) => {
        if (data.action.type === ACTION_TYPE.ADDED) {
          let expectedResult = {
            [MockModel.Department.id]: MockModel.Department
          };
          expect(data.items).to.eql(expectedResult);
          unsubscribe();
          done();
        }
      }
    );
    ApplicationStore.dispatch(
      ACTION_DEPARTMENT.requestAdd(MockModel.Department)
    );
  });
});

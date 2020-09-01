// import MockDataManager from '../../data-mock/mock_data_manager';
// import { ApplicationStore, ACTION_ROOT } from '../../data/store';
// import { DepartmentStoreState } from '../../data/states/department_state';
// import { ACTION_TYPE } from '../../data/data_manager';
// import ACTION_DEPARTMENT from '../../data/actions/department_action';
// import { MockModel } from '../../data-mock/mock_data';
// import { expect } from 'chai';

// describe('Mock Data Manager', () => {
  

//   it('Request add data', async (done) => {
//     const mockDataManager = new MockDataManager();
//     ApplicationStore.listen(
//       ACTION_ROOT.DEPARTMENTS,
//       (data: DepartmentStoreState, unsubscribe) => {
//         if (data.action.type === ACTION_TYPE.ADDED) {
//           let expectedResult = {
//             [MockModel.Department.id]: MockModel.Department
//           };
//           expect(data.items).to.eql(expectedResult);
//           unsubscribe();
//           done();
//         }
//       }
//     );
//     await mockDataManager.initialize();
//     let action = ACTION_DEPARTMENT.requestAdd(MockModel.Department);
//     ApplicationStore.dispatch(action);
//   });
// });

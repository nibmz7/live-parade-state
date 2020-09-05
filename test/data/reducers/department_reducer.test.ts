import { expect } from '@open-wc/testing';
import ACTION_DEPARTMENT from '../../../data/actions/department_action';
import { MockModel } from '../../../data-mock/mock_data';
import { department } from '../../../data/reducers/department_reducer';
import { DepartmentStoreState } from '../../../data/states/department_state';

describe('Department reducer', () => {
  it('Request add', () => {
    let action = ACTION_DEPARTMENT.requestAdd(MockModel.Department);
    let reduce = department(undefined, action);
    let expectedResult: DepartmentStoreState = {
      action,
      items: []
    };
    expect(reduce).deep.equal(expectedResult);
  });

  it('Added', () => {
    let action = ACTION_DEPARTMENT.added(MockModel.Department);
    let reduce = department(undefined, action);
    let expectedResult: DepartmentStoreState = {
      action,
      items: [MockModel.Department]
    };
    expect(reduce).deep.equal(expectedResult);
  });

  it('Removed', () => {
    let action = ACTION_DEPARTMENT.removed(MockModel.Department);
    let initialState = {
      action,
      items: [MockModel.Department]
    };
    let reduce = department(initialState, action);
    let expectedResult: DepartmentStoreState = {
      action,
      items: []
    };
    expect(reduce).deep.equal(expectedResult);
  });
});

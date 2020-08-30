import ACTION_DEPARTMENT from '../../../data/actions/department_action';
import { MockModel, MockError } from '../../../data-mock/mock_data';
import {
  DepartmentAction,
  DEPARTMENT_ACTION_TYPE
} from '../../../data/states/department_state';
import { ACTION_ROOT } from '../../../data/store';
import { expect } from 'chai';

describe('Department actions', () => {
  it('Add department', () => {
    let action = ACTION_DEPARTMENT.requestAdd(MockModel.Department);
    let expectedAction: DepartmentAction = {
      id: action.id,
      root: ACTION_ROOT.DEPARTMENTS,
      type: DEPARTMENT_ACTION_TYPE.REQUEST_ADD,
      payload: MockModel.Department
    };
    expect(action).deep.equal(expectedAction);
  });
  it('Department added', () => {
    let action = ACTION_DEPARTMENT.added(MockModel.Department);
    let expectedAction: DepartmentAction = {
      id: action.id,
      root: ACTION_ROOT.DEPARTMENTS,
      type: DEPARTMENT_ACTION_TYPE.ADDED,
      payload: MockModel.Department
    };
    expect(action).deep.equal(expectedAction);
  });
  it('Department request error', () => {
    let addAction = ACTION_DEPARTMENT.requestAdd(MockModel.Department);
    let error = MockError.DepartmentRequest(addAction);
    let errorAction = ACTION_DEPARTMENT.error(error);
    let expectedAction: DepartmentAction = {
      id: errorAction.id,
      root: ACTION_ROOT.DEPARTMENTS,
      type: DEPARTMENT_ACTION_TYPE.REQUEST_ERROR,
      payload: error
    };
    expect(errorAction).deep.equal(expectedAction);
  });
});

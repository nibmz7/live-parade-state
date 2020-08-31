import {
  BranchRepository,
  DepartmentChange,
  CHANGE_TYPE
} from '../data/branch_repository';
import { MockModel } from './mock_data';

export default class MockBranchRepository extends BranchRepository {
  constructor() {
    super();
  }

  protected connectToDB(departmentChange: DepartmentChange): void {
    departmentChange(MockModel.Department, CHANGE_TYPE.ADDED);
  }
}

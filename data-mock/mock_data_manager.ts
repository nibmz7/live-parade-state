import {
  DataManager,
  DepartmentChange,
  CHANGE_TYPE
} from '../data/data_manager';
import { MockModel } from './mock_data';

export default class MockBranchRepository extends DataManager {
  constructor() {
    super();
  }

  protected connectToDB(departmentChange: DepartmentChange): void {
    departmentChange(MockModel.Department, CHANGE_TYPE.ADDED);
  }
}

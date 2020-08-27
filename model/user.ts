import Rank from './rank';
import Status from './status';
import Department from './department';
import Branch from './branch';

export interface UserProperties {
  uid: String;
  email: string;
  name: string;
  regular: boolean;
  rank: Rank;
  branch: Branch;
  department: Department;
  morningStatus: Status;
  afternoonStatus: Status;
  isUpdating: boolean;
  updatingStatus?: string;
}

export class User {
  readonly user: UserProperties;

  constructor(user: UserProperties) {
    this.user = user;
  }
}

export default User;

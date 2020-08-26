import Rank from './rank';
import Status from './status';

export interface UserProperties {
  uid: String;
  branchid: string;
  departmentid: string;
  email: string;
  name: string;
  regular: boolean;
  rank: Rank;
  morningStatus: Status;
  afternoonStatus: Status;
}

export class User {
  readonly user: UserProperties;

  constructor(user: UserProperties) {
    this.user = user;
  }
}

export default User;

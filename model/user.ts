import Rank from './rank';
import Status from './status';
import Department from './department';
import Branch from './branch';

export interface User {
  uid: String;
  email: string;
  name: string;
  regular: boolean;
  rank: Rank;
  branch: Branch;
  department: Department;
}

export interface UserByStatus extends User {
  morning: Status;
  afternoon: Status;
}

export default User;

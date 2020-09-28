import Rank from './rank';
import Status from './status';

export interface UserBaseProps {
  email: string;
  name: string;
  regular: boolean;
  rank: Rank;
  branchid: string;
  departmentid: string;
}

export class UserBase {
  readonly email: string;
  readonly name: string;
  readonly fullname: string;
  readonly regular: boolean;
  readonly rank: Rank;
  readonly branchid: string;
  readonly departmentid: string;

  constructor(props: UserBaseProps) {
    this.email = props.email.toLowerCase();
    this.name = props.name;
    this.regular = props.regular;
    this.rank = props.rank;
    this.branchid = props.branchid;
    this.departmentid = props.departmentid;
    this.fullname = `${props.rank.text} ${props.name}`;
  }
}

export interface UserProps extends UserBaseProps {
  uid: string;
  morning?: Status;
  afternoon?: Status;
}

export default class User extends UserBase {
  readonly uid: string;
  readonly morning?: Status;
  readonly afternoon?: Status;

  constructor(props: UserProps) {
    super(props);
    this.uid = props.uid;
    this.morning = props.morning;
    this.afternoon = props.afternoon;
  }

  static compare(user: User, compareTo: User) {
    let userRank = user.rank.code;
    let compareToRank = compareTo.rank.code;

    if (userRank < compareToRank) return -1;
    if (compareToRank < userRank) return 1;

    if (user.name < compareTo.name) return -1;
    if (compareTo.name < user.name) return 1;

    return 0;
  }

  static getInsertionIndex(sortedList: Array<User>, newUser: User): number {
    if (sortedList.length === 0) return 0;
    let index = sortedList.length - 1;
    while (index >= 0) {
      let currentUser = sortedList[index];
      let isHigher = User.compare(newUser, currentUser);
      if (isHigher !== -1) break;
      index--;
    }
    return ++index;
  }
}

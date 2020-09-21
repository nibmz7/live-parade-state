import Rank from './rank';
import Status from './status';

export default class User {
  uid: string;
  email: string;
  name: string;
  fullname: string;
  regular: boolean;
  rank: Rank;
  branchid: string;
  departmentid: string;
  morning?: Status;
  afternoon?: Status;

  constructor(data: {
    uid: string;
    email: string;
    name: string;
    regular: boolean;
    rank: Rank;
    branchid: string;
    departmentid: string;
    morning?: Status;
    afternoon?: Status;
  }) {
    this.uid = data.uid;
    this.email = data.email;
    this.name = data.name;
    this.regular = data.regular;
    this.rank = data.rank;
    this.branchid = data.branchid;
    this.departmentid = data.departmentid;
    this.morning = data.morning;
    this.afternoon = data.afternoon;
    this.fullname = `${data.rank.text} ${data.name}`;
  }
}

export function compare(user: User, compareTo: User) {
  let userRank = user.rank.code;
  let compareToRank = compareTo.rank.code;

  if (userRank < compareToRank) return -1;
  if (compareToRank < userRank) return 1;

  if (user.name < compareTo.name) return -1;
  if (compareTo.name < user.name) return 1;

  return 0;
}

export function getInsertionIndex(
  sortedList: Array<User>,
  newUser: User
): number {
  if (sortedList.length === 0) return 0;
  let index = sortedList.length - 1;
  while (index >= 0) {
    let currentUser = sortedList[index];
    let isHigher = compare(newUser, currentUser);
    if (isHigher !== -1) break;
    index--;
  }
  return ++index;
}

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

export function compare(a: User, b: User) {
  let aRank = a.rank.code;
  let bRank = b.rank.code;

  if (aRank < bRank) return -1;
  if (bRank < aRank) return 1;

  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;

  return 0;
}

export function getInsertionIndex(sortedList: Array<User>, newUser: User): number {
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

export default User;

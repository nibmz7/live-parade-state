import Branch from './branch';

export default class Admin {
  uid: string;
  email: String;
  branch: Branch;
  readonly isAdmin = true;

  constructor(uid: string, email: string, branchName?: string) {
    this.uid = uid;
    this.email = email;
    this.branch = { 
        id: uid,
        domain: email.split('@')[1],
        name: branchName
    };
  }
}

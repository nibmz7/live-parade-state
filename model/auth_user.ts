import Branch from './branch';

interface AuthUserProps {
  readonly uid: string;
  readonly email: string;
  readonly branchid: string;
  readonly departmentid?: string;
}

export default class AuthUser {
  readonly uid: string;
  readonly email: string;
  readonly branch: Branch;
  readonly departmentid?: string;
  readonly isAdmin: boolean;

  constructor(props: AuthUserProps) {
    this.uid = props.uid;
    this.uid = props.uid;
    this.email = props.email;
    this.branch = {
      id: props.branchid,
      domain: props.email.split('@')[1]
    };
    this.departmentid = props.departmentid;
    this.isAdmin = props.email.split('@')[0] === 'admin';
  }
}

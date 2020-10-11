import AuthManager from '../data/auth_manager';
import { SignInCredentials, AuthAction } from '../data/states/auth_state';
import AuthUser from '../model/auth_user';

const errorMessages = {
  'auth/invalid-email': 'Invalid email address!',
  'auth/user-disabled': 'The user has been disabled!',
  'auth/user-not-found': `User doesn't exist!`,
  'auth/wrong-password': 'You have entered a wrong password!'
};

export default class FBAuthManager extends AuthManager {
  private auth!: firebase.auth.Auth;

  protected async initialize() {
    this.auth = window.firebase.auth();
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, email } = user;
        let authUser: AuthUser;
        if (this.isAdmin(email)) {
          authUser = new AuthUser({ uid, email: email! });
        } else {
          const idTokenResult = await user.getIdTokenResult();
          const { branchid, departmentid } = idTokenResult.claims;
          authUser = new AuthUser({
            uid,
            email: email!,
            branchid,
            departmentid
          });
        }
        this.signIn(authUser);
      } else {
        this.signOut();
      }
    });
  }

  protected async signInWithCredentials(action: AuthAction) {
    const { email, password } = action.payload as SignInCredentials;
    this.auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const signInError = {
        action,
        type: errorCode,
        message: errorMessages[errorCode]
      };
      this.signInError(signInError);
    });
  }

  protected signOut(){
    super.signOut();
    this.auth.signOut();
  }
}

import AuthManager from '../data/auth_manager';
import { SignInCredentials, AuthAction } from '../data/states/auth_state';
import Admin from '../model/admin';
import User from '../model/user';

export default class FBAuthManager extends AuthManager {
  private auth = window.firebase.auth();

  protected async initialize() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        const {uid, email} = user;
        let authUser: Admin;
        if(this.isAdmin(email)) {
          authUser = new Admin(uid, email!);
        } else {
          authUser = new
        }
        var uid = user.uid;
      } else {
        this.signOut();
      }
    });
  }

  protected async signInWithCredentials(action: AuthAction) {
    const { email, password } = action.payload as SignInCredentials;
    this.auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    // if (credentials.email.includes('error')) {
    //   this.signInError(MockError.SignIn(action));
    //   return;
    // }
    // this.isAdmin(credentials.email)
    //   ? this.signIn(MockModel.Admin)
    //   : this.signIn(MockModel.User);
  }
}

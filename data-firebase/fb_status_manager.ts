import StatusManager from '../data/status_manager';
import { UserStoreState } from '../data/states/user_state';
import { DataResults } from '../data/data_manager';
import User from '../model/user';
import Status from '../model/status';
import FirestoreDBListener from './fb_db_listener';

export default class FBStatusManager extends StatusManager {
  private db!: firebase.firestore.Firestore;
  private repositoryUnsubscribe?: any;

  unsubscribe() {
    super.unsubscribe();
    this.repositoryUnsubscribe?.();
  }

  protected connectDB(): Promise<DataResults> {
    return FirestoreDBListener(this);
  }

  protected requestModifyUser(state: UserStoreState): void {
    const MakeStatus = (status: Status) => ({
      code: status.code,
      remarks: status.remarks,
      updatedby: this.authUser.uid,
      timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
    });
    const userToUpdate = new User(state.action.payload as User);
    const morning = userToUpdate.morning;
    const afternoon = userToUpdate.afternoon;
    const userRef = this.db.doc(
      `branches/${this.branch.id}/repository/${userToUpdate.uid}`
    );
    if (morning && !afternoon) {
      userRef.update({ 'data.status.am': { ...MakeStatus(morning) } });
    }
    if (afternoon && !morning) {
      userRef.update({ 'data.status.pm': { ...MakeStatus(afternoon) } });
    }
    if (morning && afternoon) {
      userRef.update({
        'data.status': {
          am: MakeStatus(morning),
          pm: MakeStatus(afternoon)
        }
      });
    }
  }
}

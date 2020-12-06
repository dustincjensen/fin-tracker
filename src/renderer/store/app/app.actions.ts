import { Dispatch } from 'redux';
import { database } from '../../database/database';

export class AppActions {
  public static INITIALIZE = 'INITIALIZE';
  public static INITIALIZED = 'INITIALIZED';

  public static initialize = () => ({ type: AppActions.INITIALIZE });

  public static initialized = () => ({ type: AppActions.INITIALIZED });

  public static loadApplication = () => {
    return (dispatch: Dispatch) => {
      database.initialize(dispatch);
    };
  };
}

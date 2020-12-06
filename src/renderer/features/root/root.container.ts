import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppActions } from '../../store/app/app.actions';
import { IStore } from '../../store/store.interface';
import { RootLayout } from './root.layout';
import { IRootLayoutProps } from './root.props.interface';

type StateProps = Pick<IRootLayoutProps, 'initializing'>;
type DispatchProps = Pick<IRootLayoutProps, 'loadApplication'>;

const mapStateToProps = () => {
  return (state: IStore): StateProps => ({
    initializing: state.app.initializing,
  });
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    // TODO need to solve typing for ThunkActions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadApplication: () => dispatch(AppActions.loadApplication() as any),
  };
};

export const RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootLayout);

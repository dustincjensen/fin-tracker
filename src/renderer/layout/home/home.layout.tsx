import * as React from 'react';

// REMOVE BETWEEN
import IStore from '../../store/store.interface';
import { connect } from 'react-redux';

const tmp = ({ accounts }) => {
  const items = Object.keys(accounts).map(a => {
    return (
      <div key={a}>
        Name: {accounts[a].name}, Balance: {accounts[a].startingBalance}
      </div>
    );
  })

  return <div>{items}</div>;
};

const mapStateToProps = (state: IStore) => {
  return { accounts: state.accounts };
};

const Container = connect(mapStateToProps)(tmp);
// REMOVE BETWEEN

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Container />
      </div>
    );
  }
}

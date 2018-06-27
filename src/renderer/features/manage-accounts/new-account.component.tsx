import * as React from 'react';
import { INewAccountProps, INewAccountState } from './new-account.component.interface';
import { newGuid } from '../../utils/guid.util';
import './new-account.component.scss';

// TODO do we need the account type from finance? so we know credit or debit is up/down?
export class NewAccount extends React.Component<INewAccountProps, INewAccountState> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startYear: new Date().getFullYear(),
      startMonth: new Date().getMonth(),
      startingBalance: 0,
      parseType: 'ScotiabankChequing'
    };
  }

  // TODO do this better?
  render() {
    return (
      <div className="new-account-background">
        <div className="new-account-header">New Account</div>
        <form onSubmit={this.handleSubmit} >
          <div className="form-layout">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
            <label>Starting Year</label>
            <input type="number" name="startYear" value={this.state.startYear} onChange={this.handleChange} min="2000" max="2099" />
            <label>Starting Month</label>
            <select name="startMonth" value={this.state.startMonth} onChange={this.handleChange}>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
            <label>Starting Balance</label>
            <input type="number" name="startingBalance" step="0.01" value={this.state.startingBalance} onChange={this.handleChange} min="0" />
            <label>Account Type</label>
            <select name="parseType" value={this.state.parseType} onChange={this.handleChange}>
              <option value="ScotiabankChequing">Scotiabank Chequing</option>
              <option value="ScotiabankSavings">Scotiabank Savings</option>
              <option value="ScotiabankVisa">Scotiabank Visa</option>
            </select>
          </div>
          <div className="new-account-footer">
            <button className="btn btn-primary btn-lg">Save</button>
          </div>
        </form>
      </div>
    );
  }

  handleChange = (evt) => {
    const { target } = evt;
    const { value, name } = target;
    this.setState({ [name]: value } as any);
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const newAccount = {
      ...this.state,
      id: newGuid()
    };

    this.props.saveNewAccount(newAccount);
    this.props.afterSave();
  };
}

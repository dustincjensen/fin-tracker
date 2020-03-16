import * as React from 'react';
import { INewAccountProps, INewAccountState } from './new-account.component.interface';
import { newGuid } from '../../utils/guid.util';
import {
  Button,
  majorScale,
  Pane,
  Icon,
  Heading,
  TextInputField,
  TextInput,
  SelectField,
  OptionsList,
} from 'evergreen-ui';

// TODO do we need the account type from finance? so we know credit or debit is up/down?
export class NewAccount extends React.Component<INewAccountProps, INewAccountState> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startYear: new Date().getFullYear(),
      startMonth: new Date().getMonth(),
      startingBalance: 0,
      parseType: 'ScotiabankChequing',
    };
  }

  render() {
    return (
      <Pane border padding={20} background='tint1' borderRadius={5}>
        <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
          <Icon icon='bank-account' size={25} marginRight={10} color='default' />
          <Heading size={700}>New Account</Heading>
        </Pane>

        <form onSubmit={this.handleSubmit}>
          <Pane>
            <TextInputField
              width={350}
              label='Name'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
              //isInvalid={this.state.name === ''}
              //validationMessage='Please enter a category name.'
            />
            <TextInputField
              width={350}
              label='Starting Year'
              name='startYear'
              type='number'
              value={this.state.startYear}
              onChange={this.handleChange}
              min={2000}
              max={2099}
              required
            />
            <SelectField
              width={350}
              label='Starting Month'
              name='startMonth'
              value={this.state.startMonth}
              onChange={this.handleChange}
            >
              <option value='0'>January</option>
              <option value='1'>February</option>
              <option value='2'>March</option>
              <option value='3'>April</option>
              <option value='4'>May</option>
              <option value='5'>June</option>
              <option value='6'>July</option>
              <option value='7'>August</option>
              <option value='8'>September</option>
              <option value='9'>October</option>
              <option value='10'>November</option>
              <option value='11'>December</option>
            </SelectField>
            <TextInputField
              width={350}
              label='Starting Balance'
              nmae='startingBalance'
              type='number'
              value={this.state.startingBalance}
              onChange={this.handleChange}
              min={0}
              step={0.01}
              required
            />
            <SelectField
              width={350}
              label='Account Type'
              name='parseType'
              value={this.state.parseType}
              onChange={this.handleChange}
            >
              <option value='ScotiabankChequing'>Scotiabank Chequing</option>
              <option value='ScotiabankSavings'>Scotiabank Savings</option>
              <option value='ScotiabankVisa'>Scotiabank Visa</option>
            </SelectField>
          </Pane>
          <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={10}>
            <Button appearance='primary' iconBefore='floppy-disk' height={majorScale(5)}>
              Save Account
            </Button>
          </Pane>
        </form>
      </Pane>
    );
  }

  handleChange = evt => {
    const { value, name } = evt.target;
    this.setState({ [name]: value } as any);
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const newAccount = {
      ...this.state,
      id: newGuid(),
    };

    this.props.saveNewAccount(newAccount);
    this.setState({
      name: '',
      startYear: new Date().getFullYear(),
      startMonth: new Date().getMonth(),
      startingBalance: 0,
      parseType: 'ScotiabankChequing',
    });
  };
}

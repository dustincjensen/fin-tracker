import { Pane, Card, Heading, Text, Strong, IconButton, Icon, Tooltip } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { isNullOrUndefined } from '../../utils/object.utils';
import { IAccountSummaryProps } from './account-summary.props.interface';

export const AccountSummary: React.FC<IAccountSummaryProps> = props => {
  const { accountId, iconName, balance, name, dateOfLastTransaction } = props;
  return (
    <Card
      elevation={1}
      minWidth={300}
      background='tint1'
      marginTop={20}
      marginRight={20}
      padding={10}
      paddingBottom={5}
      border
    >
      <Pane display='flex' flexDirection='column' height='100%' justifyContent='space-between'>
        <Pane borderBottom display='flex' alignItems='center' marginBottom={10} paddingBottom={5}>
          <Icon icon={iconName} marginRight={5} color='default' />
          <Heading>{name}</Heading>
        </Pane>
        {!isNullOrUndefined(balance) && (
          <Pane marginBottom={10}>
            <Pane display='flex' alignItems='center'>
              <Pane width={105}>
                <Text color='muted'>Balance:</Text>
              </Pane>
              <Icon icon='dollar' color='default' size={12} marginLeft={10} />
              <Strong>{balance}</Strong>
            </Pane>
            <Pane display='flex' alignItems='center'>
              <Pane width={105}>
                <Text color='muted'>Last Transaction:</Text>
              </Pane>
              <Strong marginLeft={12}>{dateOfLastTransaction}</Strong>
            </Pane>
          </Pane>
        )}
        {isNullOrUndefined(balance) && (
          <Pane marginBottom={10} padding={10} display='flex' justifyContent='center'>
            <Text color='muted'>
              Empty! Import records{' '}
              <Text is={Link} to={`/import/${accountId}`}>
                here
              </Text>
              .
            </Text>
          </Pane>
        )}
        <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={5}>
          <Tooltip content='Open Account' hideDelay={0}>
            <IconButton appearance='minimal' icon='eye-open' is={Link} to={`/account/${accountId}`} />
          </Tooltip>
          <Tooltip content='Import Records' hideDelay={0}>
            <IconButton appearance='minimal' icon='import' is={Link} to={`/import/${accountId}`} />
          </Tooltip>
        </Pane>
      </Pane>
    </Card>
  );
};
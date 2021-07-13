import { Pane, Card, Heading, Text, Strong, IconButton, Icon, Tooltip, EyeOpenIcon, DollarIcon } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { formatDateFull } from '../../utils/date.utils';
import { useInvestmentSummary } from './investment-summary.hook';
import { IInvestmentSummaryProps } from './investment-summary.props.interface';

export const InvestmentSummary = ({ accountId }: IInvestmentSummaryProps) => {
  const { name, icon, latestDate, balance } = useInvestmentSummary(accountId);

  return (
    <Card
      elevation={1}
      minWidth={300}
      maxWidth={300}
      background='tint1'
      marginBottom={20}
      marginRight={20}
      padding={10}
      paddingBottom={5}
      border
    >
      <Pane display='flex' flexDirection='column' height='100%' justifyContent='space-between'>
        <Pane borderBottom display='flex' alignItems='center' marginBottom={10} paddingBottom={5}>
          <Icon icon={icon} marginRight={5} color='default' />
          <Heading>{name}</Heading>
        </Pane>
        {balance && (
          <Pane data-name='account-details' marginBottom={10}>
            <Pane display='flex' alignItems='center'>
              <Pane width={105}>
                <Text color='muted'>Balance:</Text>
              </Pane>
              <DollarIcon color='default' size={12} marginLeft={10} />
              <Strong data-name='account-balance'>{balance.toFixed(2)}</Strong>
            </Pane>
            <Pane display='flex' alignItems='center'>
              <Pane width={105}>
                <Text color='muted'>Last Transaction:</Text>
              </Pane>
              <Strong data-name='latest-transaction' marginLeft={12}>{formatDateFull(latestDate)}</Strong>
            </Pane>
          </Pane>
        )}
        {!balance && (
          <Pane data-name='empty-account' marginBottom={10} padding={10} display='flex' justifyContent='center'>
            <Text color='muted'>
              Empty! Assign the account transfer category to transactions.
            </Text>
          </Pane>
        )}
        <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={5}>
          <Tooltip content='Open Investment Account' hideDelay={0}>
            <IconButton appearance='minimal' icon={EyeOpenIcon} is={Link} to={`/investment/${accountId}`} /> 
          </Tooltip>
        </Pane>
      </Pane>
    </Card>
  );
};

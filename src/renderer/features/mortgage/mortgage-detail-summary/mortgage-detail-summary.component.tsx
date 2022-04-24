import { Alert, FormField, majorScale, Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import { accountTypeLabels } from '../../../utils/account.utils';
import { IMortgageDetailSummaryProps } from './mortgage-detail-summary.props.interface';

export const MortgageDetailSummary = ({
  accountName,
  accountType,
  displayDate,
  startingBalance,
  archived,
}: IMortgageDetailSummaryProps) => {
  return (
    <>
      {archived && <Alert title='This account is archived. No changes can be made.' marginBottom={majorScale(3)} />}
      <Pane
        border
        paddingLeft={40}
        paddingRight={40}
        paddingTop={20}
        paddingBottom={20}
        background='tint1'
        borderRadius={5}
        marginBottom={majorScale(3)}
      >
        <Pane display='flex' justifyContent='space-between'>
          <Field label='Account Name' text={accountName} />
          <Field label='Account Type' text={accountTypeLabels[accountType]} />
          <Field label='Date' text={displayDate} />
          <Field label='Starting Balance' text={startingBalance} />
        </Pane>
      </Pane>
    </>
  );
};

const Field = ({ label, text }) => (
  <FormField label={label}>
    <Text>{text}</Text>
  </FormField>
);

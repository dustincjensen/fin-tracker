import { Pane, Alert, Heading, Paragraph, Strong, Button, Text, UnorderedList, ListItem } from 'evergreen-ui';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IInstructionsProps } from './instructions.props.interface';

const ACCOUNTS_HINT = 'accountsHint';
const RECORDS_HINT = 'recordsHint';
const CATEGORIES_HINT = 'categoriesHint';
const AUTO_CATEGORIES_HINT = 'autoCategoriesHint';
const SPLIT_RECORDS_HINT = 'splitRecordsHint';

export const Instructions: React.FC<IInstructionsProps> = ({
  atLeastOneAccountHasRecords,
  hasAccounts,
  hasCategories,
  hasAutoCategories,
  hasSplitRecords,
}) => {
  const [showAccountsHint, setShowAccountsHint] = React.useState<boolean>(!localStorage.getItem(ACCOUNTS_HINT));
  const [showRecordsHint, setShowRecordsHint] = React.useState<boolean>(!localStorage.getItem(RECORDS_HINT));
  const [showCategoriesHint, setShowCategoriesHint] = React.useState<boolean>(!localStorage.getItem(CATEGORIES_HINT));
  const [showAutoCategoriesHint, setShowAutoCategoriesHint] = React.useState<boolean>(
    !localStorage.getItem(AUTO_CATEGORIES_HINT)
  );
  const [showSplitRecordsHint, setShowSplitRecordsHint] = React.useState<boolean>(
    !localStorage.getItem(SPLIT_RECORDS_HINT)
  );

  const hideHint = (fn: React.Dispatch<React.SetStateAction<boolean>>, type: string) => {
    fn(false);
    localStorage.setItem(type, 'true');
  };

  if (
    !showAccountsHint &&
    !showRecordsHint &&
    !showCategoriesHint &&
    !showAutoCategoriesHint &&
    !showSplitRecordsHint
  ) {
    return null;
  }

  return (
    <Pane marginTop={20} border borderRadius={5} background='tint1'>
      <Pane paddingTop={20} paddingRight={20} paddingLeft={20} paddingBottom={10}>
        <Heading>Welcome to the Fin-Tracker Beta!</Heading>
        <Paragraph marginBottom={10}>
          The main purpose of this application is to help you categorize your spending across different financial
          accounts. That is accomplished by importing data available from your bank accounts and categorizing your
          spending. Don&apos;t worry though, you won&apos;t have to do it all by hand!
        </Paragraph>
        <Paragraph marginBottom={10}>
          To get started, you can use the messages to below to guide you through the basic use cases of the application.
          Once you are done each step, come back the <Strong>Home</Strong> page to see the next step!
        </Paragraph>

        {showAccountsHint && (
          <Alert marginBottom={10} title='Create an account' intent={hasAccounts ? 'success' : 'none'}>
            <Pane marginBottom={5}>
              <Text color='muted'>
                These should mimic the accounts that you have at various banks and that you want to keep track of. A
                chequing account or credit card perhaps. Head here to create your first account.
              </Text>
            </Pane>
            <Button is={RouterLink} to='/accounts' appearance='primary' iconBefore='bank-account'>
              Create Account
            </Button>
            <Button iconBefore='cross' marginLeft={10} onClick={() => hideHint(setShowAccountsHint, ACCOUNTS_HINT)}>
              Dismiss
            </Button>
          </Alert>
        )}

        {showRecordsHint && (
          <Alert
            marginBottom={10}
            title='Import Transactions'
            intent={atLeastOneAccountHasRecords ? 'success' : 'none'}
          >
            <Pane marginBottom={5}>
              <Text color='muted'>
                If you created an account, you might see that account now on the home page here. It shows a summary of
                your account, but you don&apos;t have any transactions yet. Let&apos;s import some. Don&apos;t forget to
                download a <Strong>.qfx, or .qif</Strong> file from your bank account or credit card.
              </Text>
            </Pane>
            <Button is={RouterLink} to='/import' appearance='primary' iconBefore='import'>
              Import Transactions
            </Button>
            <Button iconBefore='cross' marginLeft={10} onClick={() => hideHint(setShowRecordsHint, RECORDS_HINT)}>
              Dismiss
            </Button>
          </Alert>
        )}

        {showCategoriesHint && (
          <Alert marginBottom={10} title='Categorizing transactions' intent={hasCategories ? 'success' : 'none'}>
            <Pane marginBottom={5}>
              <Text color='muted'>
                Now that you have transactions in your account, you can view them by accessing your account on the left
                hand side. Next thing to do though is start categorizing them! Head here to add some categories.
              </Text>
            </Pane>
            <Button is={RouterLink} to='/categories' appearance='primary' iconBefore='group-objects'>
              Create Categories
            </Button>
            <Button iconBefore='cross' marginLeft={10} onClick={() => hideHint(setShowCategoriesHint, CATEGORIES_HINT)}>
              Dismiss
            </Button>
          </Alert>
        )}

        {showAutoCategoriesHint && (
          <Alert marginBottom={10} title='Automatically categorizing' intent={hasAutoCategories ? 'success' : 'none'}>
            <Pane marginBottom={5}>
              <Text color='muted'>
                No one wants to set a category on every single transaction they do in a month. With the automatic
                categorization feature you can setup an account to recognize certain descriptions and automatically set
                them to the correct category. Say you have the following 2 transactions:
              </Text>
              <UnorderedList>
                <ListItem>Phoebe&apos;s Pharmacy - Edmonton</ListItem>
                <ListItem>Phoebe&apos;s Pharmacy - Calgary</ListItem>
              </UnorderedList>
              <Text color='muted'>
                In the account view, select one of the transactions and click <Strong>Setup Auto Category</Strong> from
                the menu on the right side of the transaction. Change the description to match the starting phrase{' '}
                <Strong>Phoebe&apos;s Pharmacy</Strong>. Set your category and save! Once you are done you can visit the
                Auto Categories management page to see what you have setup. You may also delete it to remove the
                categorization if you think you messed up.
              </Text>
            </Pane>
            <Button is={RouterLink} to='/autoCategories' appearance='primary' iconBefore='automatic-updates'>
              View Auto Categories
            </Button>
            <Button
              iconBefore='cross'
              marginLeft={10}
              onClick={() => hideHint(setShowAutoCategoriesHint, AUTO_CATEGORIES_HINT)}
            >
              Dismiss
            </Button>
          </Alert>
        )}

        {showSplitRecordsHint && (
          <Alert marginBottom={10} title='Splitting Transactions' intent={hasSplitRecords ? 'success' : 'none'}>
            <Pane marginBottom={5}>
              <Text color='muted'>
                Sometimes a transaction might cover a few categories, so setting one category for the transaction simply
                won&apos;t work. If you need to break a transaction up use the <Strong>Split Transaction</Strong> option
                from the menu on the right side of the transaction. You can add new descriptions for each split and give
                them new totals and categories.
              </Text>
            </Pane>
            <Button iconBefore='cross' onClick={() => hideHint(setShowSplitRecordsHint, SPLIT_RECORDS_HINT)}>
              Dismiss
            </Button>
          </Alert>
        )}
      </Pane>
    </Pane>
  );
};

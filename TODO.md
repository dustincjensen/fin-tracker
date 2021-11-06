Bugs
====
  + In combined.utils, getting the investment dates, we use the last entry, even thought they are not sorted by date. This could lead to missing months.
  - Description width could be larger on bigger monitors... maybe use css breakpoints?

  - When you go between accounts that are on the same month/year it won't load the numbers on the category graph.
  + Fix minor issue where the combined accounts summary goes off the page when getting put inside the edit home page view.

Tasks
=====
Next
+ IsStacked chart bug due to useLocalStorage update.
+ Support TFSA/RRSP Manual accounts. 
- Transfer Category per account? Basic Transfer Category?
  - Improve implementation from TFSA / RRSP accounts
- Update manual transactions? (Or just delete and re-add?)
- Improve account monthly header

- Cannot remove single record when it is manual transaction.
- Change how archiving works for Investment accounts (needs to check for records in investment records).

- Home page Mortgage Summary Card
- Home page Mortgage in balance chart
- Mortgage should really have an interest rate and you should be able to see estimated balance based on principal vs interest.

- Storybook

Next 2
- Feature component tests

- Refactor selectors
- Import multiple files at once
- Add total wealth graph on home page
- Create regular backups
  - Let them access the folder where the backup/regular data is.
  - Restore a backup.
- Improve importing to flag duplicate records on the account.
- Give each imported record an import id and associate the import id to the account
  - Provide a list of import id's and file names you imported for each account.
- Delete imports in case of accident (keep history of imports to manage this).
- Improve editing of accounts that have records imported already
- Sorting order accounts by user input? (https://github.com/clauderic/react-sortable-hoc perhaps?)
- Error Boundary HOC?
  - Right now if one of the account views breaks, you can't visit another account until you
    visit another route first. Being able to wrap all components in a error boundary HOC would
    be cool!

- Donation link on Github and in app?
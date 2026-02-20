Bugs
====
  - Description width could be larger on bigger monitors... maybe use css breakpoints?
  - If you delete an account that the transfer account category is in use for an auto category then it will end up being abandoned in the auto category list.
  - When you go between accounts that are on the same month/year it won't load the numbers on the category graph.
  - Delete a category that is selected in the chart on the home screen and it will crash the home screen.
  - Hitting enter inside Split Transaction removes rows
  - Renaming account doesn't rename account transfer

Tasks
=====
- Add icon next to account if out of date by 1+ month.
- Add icon that shows uncategorized records for whole account, clickable and will show all in the account.
- Add button to confirm all imported line items. Add filter to account to hide confirmed line items.
- Mortgage
  - Amortization chart
  - Search for values that match the payment and associate them after user clicks ok.
- Consider removing background worker...
- Add tests for the whole application
- Re-test everything from scratch and import all files for all accounts and see if the totals line up.
- Get latest back-up and compare all charts, graphs etc.


- Remove all createSelector
- Refactor components
  - Selectors
  - Components
  - Containers
- Add Redux Dev Tools
- Investigate Zod for forms and fix up form creation.
------------------------------------------------------------------------------------------------------
- Focus category tag when it is rendered into DOM if there is a selected category id.

Next
- Package updates
- Create regular backups
  + Let them access the folder where the backup/regular data is.
  - Restore a backup.
- README.md

- Cannot remove single record when it is manual transaction.
- Update manual transactions? (Or just delete and re-add?)
- Improve account monthly header
- Home page Mortgage Summary Card
- Home page Mortgage in balance chart
- Feature component tests
- Import multiple files at once
- Add total wealth graph on home page
- Improve importing to flag duplicate records on the account.
- Give each imported record an import id and associate the import id to the account
  - Provide a list of import id's and file names you imported for each account.
- Delete imports in case of accident (keep history of imports to manage this).
- Improve editing of accounts that have records imported already
- Error Boundary HOC?
  - Right now if one of the account views breaks, you can't visit another account until you
    visit another route first. Being able to wrap all components in a error boundary HOC would
    be cool!

- Donation link on Github and in app?
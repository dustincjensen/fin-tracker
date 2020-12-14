Bugs
====
  - Tooltip for descriptions is a bit off center
  - Description width could be larger on bigger monitors... maybe use css breakpoints?

  - When you go between accounts that are on the same month/year it won't load the numbers on the category graph.
  - Fix minor issue where the combined accounts summary goes off the page when getting put inside the edit home page view.

Tasks
=====
Next
/ Add transactions manually.
  - fix account summary when months inbetween that have no records don't show previous month balance or end month balance. They should carry over from the last month that had records? Or should those months even be selectable in the UI?
  + delete manual transactions
  + mark transactions as manually entered (new field on IRecord for store)
  - update manual transactions? (Or just delete and re-add?)
- Allow for archiving accounts (closing accounts)
- Support TFSA/RRSP Manual accounts. (Transfer Category per account? Basic Transfer Category?)

Next 2
- Improve account monthly header
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
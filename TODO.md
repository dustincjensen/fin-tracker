Bugs
====
  - When you go between accounts that are on the same month/year it won't load the numbers on the category graph.
  - Fix minor issue where the combined accounts summary goes off the page when getting put inside the edit home page view.

Tasks
=====
- Create regular backups
  - Let them access the folder where the backup/regular data is.
  - Restore a backup.
- Improve importing to flag duplicate records on the account.
- Give each imported record an import id and associate the import id to the account
  - Provide a list of import id's and file names you imported for each account.
- Improve editing of accounts that have records imported already
- Allow for archiving accounts
- Home Page graphs covering multiple accounts
- Sorting order accounts by user input? (https://github.com/clauderic/react-sortable-hoc perhaps?)
- Error Boundary HOC?
  - Right now if one of the account views breaks, you can't visit another account until you
    visit another route first. Being able to wrap all components in a error boundary HOC would
    be cool!
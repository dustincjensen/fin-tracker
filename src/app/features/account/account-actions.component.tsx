import { majorScale, Button, Pane, AddIcon, TextInput } from 'evergreen-ui';
import React from 'react';
import { AddNewRecordDialog } from './add-new-record.dialog';
import { SelectCategory } from './select-category.component';

type AccountActionsProps = {
    /**
     * The ID of the account to action against.
     */
    accountId: string;

    /**
     * The filtered description.
     */
    filterDescription: string;

    /**
     * Function to set the filtered description.
     */
    setFilterDescription: React.Dispatch<React.SetStateAction<string>>;

    /**
     * The selected category ID.
     */
    selectedCategoryId: string;

    /**
     * Function to set the selected category ID.
     */
    setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

const AccountActionsComponent = ({
    accountId,
    filterDescription,
    setFilterDescription,
    selectedCategoryId,
    setSelectedCategoryId,
}: AccountActionsProps) => {
    const [addNewRecordIsShown, setAddNewRecordIsShown] = React.useState(false);

    const onAddNewClick = React.useCallback(() => setAddNewRecordIsShown(true), [setAddNewRecordIsShown]);
    const onAddNewRecordClose = React.useCallback(() => setAddNewRecordIsShown(false), [setAddNewRecordIsShown]);

    return (
        <Pane display='flex' justifyContent='flex-end' marginBottom={majorScale(1)}>
            <TextInput
                placeholder='Filter by Description'
                flex='1'
                height={majorScale(5)}
                marginRight='20px'
                value={filterDescription}
                onChange={e => setFilterDescription(e.target.value)}
            />

            <SelectCategory selectedCategory={selectedCategoryId} setSelectedCategory={setSelectedCategoryId} />

            <Button
                appearance='primary'
                intent='success'
                iconBefore={AddIcon}
                height={majorScale(5)}
                onClick={onAddNewClick}
                marginLeft='20px'
            >
                Add New Transaction
            </Button>

            <AddNewRecordDialog accountId={accountId} isShown={addNewRecordIsShown} onClose={onAddNewRecordClose} />
        </Pane>
    );
};

export const AccountActions = React.memo(AccountActionsComponent);

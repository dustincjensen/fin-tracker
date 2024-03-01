import { Dialog, FormField, majorScale, Alert, TextInputField, Switch } from 'evergreen-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { CategorySelect, CategorySelectProps } from '../../components/category-select/category-select.component';
import { Category } from '../../models/category.type';
import { Record } from '../../models/record.type';
import { setRecordsAutoCategory } from '../../store/record/record-slice';
import { newGuid } from '../../utils/guid.utils';
import { isNullOrWhitespace } from '../../utils/object.utils';

type CategoryRecord = CategorySelectProps['record'];

type EditAutoCategoryProps = {
    /**
     * The record to base the auto category off of.
     */
    record: Record;

    /**
     * The list of available categories to choose from.
     */
    categories: Array<Category>;

    /**
     * Action to call when the modal closes.
     */
    onClose: () => void;
};

export const EditAutoCategoryDialogComponent = ({ record, categories, onClose }: EditAutoCategoryProps) => {
    const dispatch = useDispatch();
    const [description, setDescription] = React.useState<string>('');
    const [descriptionError, setDescriptionError] = React.useState<string>('');
    const [categoryRecord, setCategoryRecord] = React.useState<CategoryRecord>({ id: undefined, category: undefined });
    const [categoryError, setCategoryError] = React.useState<string>('');
    const [overwriteExisting, setOverwriteExisting] = React.useState<boolean>(false);

    React.useEffect(() => {
        setDescription(record?.description || '');
        setDescriptionError('');
        setCategoryRecord({ id: undefined, category: undefined });
        setCategoryError('');
        setOverwriteExisting(false);
    }, [record]);

    if (!record) {
        return null;
    }

    const confirm = () => {
        let hasError = false;

        if (isNullOrWhitespace(description)) {
            hasError = true;
            setDescriptionError('Please enter a description.');
        } else {
            setDescriptionError('');
        }

        if (!categoryRecord?.category?.id) {
            hasError = true;
            setCategoryError('Please select a category.');
        } else {
            setCategoryError('');
        }

        if (hasError) {
            return;
        }

        dispatch(
            setRecordsAutoCategory({
                accountId: record.accountId,
                autoCategoryId: newGuid(),
                categoryId: categoryRecord.category.id,
                description,
                overwriteExisting,
            })
        );

        onClose();
    };

    const updateCategory = (_: string, categoryId: string) => {
        setCategoryRecord({
            id: record.id,
            category: categoryId ? categories.find(c => c.id === categoryId) : undefined,
        });
    };

    return (
        <Dialog
            isShown={true}
            onCloseComplete={onClose}
            preventBodyScrolling
            confirmLabel='Save Auto Category'
            title='New Auto Category'
            onConfirm={confirm}
            shouldCloseOnOverlayClick={false}
        >
            <Alert marginBottom={majorScale(3)} title='Matching descriptions is account specific.'>
                Please note previously auto-categorized transactions that begin with the description below will also be
                re-assigned to the new category selection.
            </Alert>
            <TextInputField
                label='Description'
                value={description}
                marginBottom={majorScale(3)}
                onChange={evt => setDescription(evt.target.value)}
                required
                validationMessage={descriptionError || undefined}
            />
            <FormField
                label='Category'
                marginBottom={majorScale(3)}
                isRequired
                validationMessage={categoryError || undefined}
            >
                <CategorySelect record={categoryRecord} categories={categories} updateCategory={updateCategory} />
            </FormField>
            <FormField
                label='Overwrite Manual Transactions?'
                description='Re-assign manually categorized transactions.'
            >
                <Switch
                    height={majorScale(3)}
                    checked={overwriteExisting}
                    onChange={evt => setOverwriteExisting(evt.target.checked)}
                />
            </FormField>
        </Dialog>
    );
};

export const EditAutoCategoryDialog = React.memo(EditAutoCategoryDialogComponent);

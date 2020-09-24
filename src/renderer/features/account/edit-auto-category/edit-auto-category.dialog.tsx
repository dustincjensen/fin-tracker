import { Dialog, FormField, majorScale, Alert, TextInputField, Switch } from 'evergreen-ui';
import * as React from 'react';
import { CategorySelect } from '../../../components/category-select/category-select.component';
import { ICategorySelectProps } from '../../../components/category-select/category-select.props.interface';
import { newGuid } from '../../../utils/guid.util';
import { isNullOrWhitespace } from '../../../utils/object.utils';
import { IEditAutoCategoryProps } from './edit-auto-category.props.interface';

type CategoryRecord = ICategorySelectProps['record'];

export const EditAutoCategoryDialog = ({
  record,
  categories,
  onClose,
  onConfirm,
  autoCategorizeRecords,
}: IEditAutoCategoryProps) => {
  const [description, setDescription] = React.useState<string>('');
  const [descriptionError, setDescriptionError] = React.useState<string>('');
  const [categoryRecord, setCategoryRecord] = React.useState<CategoryRecord>({ id: undefined, category: undefined });
  const [categoryError, setCategoryError] = React.useState<string>('');
  const [overwriteExisting, setOverwriteExisting] = React.useState<boolean>(false);

  React.useEffect(() => {
    setDescription(record?.description || '');
    setCategoryRecord({ id: undefined, category: undefined });
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

    autoCategorizeRecords(newGuid(), categoryRecord.category.id, description, overwriteExisting);

    onConfirm();
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
      <FormField label='Overwrite Manual Transactions?' description='Re-assign manually categorized transactions.'>
        <Switch
          height={majorScale(3)}
          checked={overwriteExisting}
          onChange={evt => setOverwriteExisting(evt.target.checked)}
        />
      </FormField>
    </Dialog>
  );
};

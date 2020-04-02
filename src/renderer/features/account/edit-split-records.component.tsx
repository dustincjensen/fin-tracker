import { Pane, Button, majorScale, InlineAlert, Table, TextInput, IconButton } from 'evergreen-ui';
import * as React from 'react';
import { CategorySelect } from '../../components/category-select/category-select.component';
import { round } from '../../utils/currency.util';
import { newGuid } from '../../utils/guid.util';
import { isNullOrWhitespace } from '../../utils/object.utils';
import { IEditSplitRecordsProps } from './edit-split-records.props.interface';
import { SplitRecordType } from './split-record.type';

const cellDetails = {
  flexBasis: 100,
  flexGrow: 0,
  flexShrink: 0,
};

const editableCellDetails = {
  flexBasis: 200,
  flexGrow: 0,
  flexShrink: 0,
};

const tableColumnPadding = 12;

function createSplitRecord(): SplitRecordType {
  return { id: newGuid(), description: '', categoryId: undefined, credit: 0.0, debit: 0.0, category: undefined };
}

export const EditSplitRecords: React.FC<IEditSplitRecordsProps> = props => {
  const { record, categories, updateRecordWithSplits, close } = props;
  const [splitRecords, setSplitRecords] = React.useState<SplitRecordType[]>(
    record?.splitRecords || [createSplitRecord(), createSplitRecord()]
  );
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleSubmit = evt => {
    evt.preventDefault();

    const { debit, credit } = record;

    const newErrors: string[] = [];
    if (debit && splitRecords.map(sr => sr.debit).reduce((sum, d) => round(sum + d), 0.0) !== debit) {
      newErrors.push('Debits total must match original record.');
    }
    if (debit && splitRecords.some(sr => sr.debit === 0.0)) {
      newErrors.push('All debit values must not be $0.00');
    }
    if (credit && splitRecords.map(sr => sr.credit).reduce((sum, d) => round(sum + d), 0.0) !== credit) {
      newErrors.push('Credits total must match original record.');
    }
    if (credit && splitRecords.some(sr => sr.credit === 0.0)) {
      newErrors.push('All credit values must not be $0.00');
    }
    if (splitRecords.some(sr => isNullOrWhitespace(sr.description))) {
      newErrors.push('All records need a description.');
    }
    setErrors(newErrors);

    if (newErrors.length === 0) {
      updateRecordWithSplits(record.id, splitRecords);
      close();
    }
  };

  const setSplitRecordValue = (id: string, propName: string, value: any) => {
    setSplitRecords(prev => {
      const index = prev.findIndex(r => r.id === id);
      const updatedRecord = {
        ...prev[index],
        [propName]: value,
      };
      return [...prev.slice(0, index), updatedRecord, ...prev.slice(index + 1)];
    });
  };

  const numberChange = (propName: string) => (id: string, value: string) => {
    try {
      const newValue = parseFloat(value || '0.0');
      setSplitRecordValue(id, propName, newValue);
    } catch (error) {}
  };

  const onDebitChange = numberChange('debit');

  const onCreditChange = numberChange('credit');

  const onDescriptionChange = (id: string, value: string) => setSplitRecordValue(id, 'description', value);

  const updateCategory = (splitRecordId: string, categoryId: string) => {
    setSplitRecords(prev => {
      const index = prev.findIndex(r => r.id === splitRecordId);
      const updatedRecord = {
        ...prev[index],
        categoryId: categoryId,
        category: categoryId ? categories.find(c => c.value === categoryId) : undefined,
      };

      if (!categoryId) {
        delete updatedRecord.category;
      }

      return [...prev.slice(0, index), updatedRecord, ...prev.slice(index + 1)];
    });
  };

  const addSplit = () => setSplitRecords(prev => [...prev, createSplitRecord()]);

  const removeSplit = (id: string) =>
    setSplitRecords(prev => {
      const index = prev.findIndex(r => r.id === id);
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });

  const canRemoveRow = splitRecords && splitRecords.length > 2;

  return (
    <Pane>
      <form onSubmit={handleSubmit}>
        {errors?.length > 0 && (
          <Pane marginLeft={cellDetails.flexBasis + tableColumnPadding} paddingTop={20}>
            {errors.map(e => {
              return (
                <InlineAlert key={e} intent='danger'>
                  {e}
                </InlineAlert>
              );
            })}
          </Pane>
        )}
        <Pane>
          <Table.Row height={30} alignItems='flex-end' borderBottom='none'>
            <Table.TextHeaderCell {...cellDetails}></Table.TextHeaderCell>
            <Table.TextHeaderCell>Description</Table.TextHeaderCell>
            <Table.TextHeaderCell {...editableCellDetails}>Category</Table.TextHeaderCell>
            <Table.TextHeaderCell {...cellDetails}>{record.debit && 'Debit'}</Table.TextHeaderCell>
            <Table.TextHeaderCell {...cellDetails}>{record.credit && 'Credit'}</Table.TextHeaderCell>
            <Table.TextHeaderCell {...cellDetails}></Table.TextHeaderCell>
            <Table.HeaderCell flex='none' width={54}></Table.HeaderCell>
          </Table.Row>
          {splitRecords.map(splitRecord => {
            return (
              <Table.Row key={splitRecord.id} borderBottom='none'>
                <Table.Cell {...cellDetails} justifyContent='flex-end' paddingRight={3}>
                  <IconButton
                    appearance='minimal'
                    icon='cross'
                    disabled={!canRemoveRow}
                    onClick={() => removeSplit(splitRecord.id)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <TextInput
                    flex={1}
                    minWidth={50}
                    value={splitRecord.description}
                    onChange={evt => onDescriptionChange(splitRecord.id, evt.target.value)}
                  />
                </Table.Cell>
                <Table.Cell {...editableCellDetails}>
                  <CategorySelect record={splitRecord} categories={categories} updateCategory={updateCategory} />
                </Table.Cell>
                <Table.Cell {...cellDetails}>
                  {!!record.debit && (
                    <TextInput
                      width={88}
                      type='number'
                      step={0.01}
                      min={0}
                      value={splitRecord.debit}
                      onChange={evt => onDebitChange(splitRecord.id, evt.target.value)}
                    />
                  )}
                </Table.Cell>
                <Table.Cell {...cellDetails}>
                  {!!record.credit && (
                    <TextInput
                      width={88}
                      type='number'
                      step={0.01}
                      min={0}
                      value={splitRecord.credit}
                      onChange={evt => onCreditChange(splitRecord.id, evt.target.value)}
                    />
                  )}
                </Table.Cell>
                <Table.Cell {...cellDetails}></Table.Cell>
                <Table.Cell flex='none' justifyContent='flex-end' width={54}></Table.Cell>
              </Table.Row>
            );
          })}
          <Pane marginTop={7.5} marginLeft={cellDetails.flexBasis + tableColumnPadding} marginBottom={majorScale(3)}>
            <Button type='button' iconBefore='fork' appearance='primary' onClick={addSplit}>
              Add Split
            </Button>
          </Pane>
        </Pane>
        <Pane display='flex' justifyContent='flex-end' borderTop padding={20} paddingTop={10}>
          <Button type='button' iconBefore='ban-circle' height={majorScale(5)} marginRight={10} onClick={close}>
            Cancel
          </Button>
          <Button appearance='primary' iconBefore='floppy-disk' height={majorScale(5)}>
            Save
          </Button>
        </Pane>
      </form>
    </Pane>
  );
};

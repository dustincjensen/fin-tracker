import { Table, Pane, IconButton, Tooltip } from 'evergreen-ui';
import * as React from 'react';
import { CategoryTag } from '../../../components/category-tag/category-tag.component';
import { IAutoCategory } from '../../../store/auto-category/auto-category.interface';
import { createStaticWidthCell } from '../../../utils/table.utils';
import { DeleteAutoCategoryDialog } from '../delete-auto-category/delete-auto-category.dialog';
import { IAutoCategoriesProps } from './auto-categories.props.interface';

const w100 = createStaticWidthCell(100);
const w150 = createStaticWidthCell(150);
const w200 = createStaticWidthCell(200);

export const AutoCategories = ({ autoCategories }: IAutoCategoriesProps) => {
  const [autoCategoryToDelete, setAutoCategoryToDelete] = React.useState<IAutoCategory>(null);

  return (
    <Table>
      <Table.Head paddingRight={0}>
        <Table.TextHeaderCell {...w150}>Account</Table.TextHeaderCell>
        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w200}>Category</Table.TextHeaderCell>
        <Table.TextHeaderCell {...w100}>Count</Table.TextHeaderCell>
        <Table.HeaderCell {...w100}></Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {autoCategories.map(autoCategory => {
          return (
            <Pane key={autoCategory.id}>
              <Table.Row>
                <Table.TextCell {...w150}>{autoCategory.accountName}</Table.TextCell>
                <Table.TextCell>{autoCategory.description}</Table.TextCell>
                <Table.Cell {...w200}>
                  <CategoryTag category={autoCategory.category} />
                </Table.Cell>
                <Table.TextCell {...w100}>{autoCategory.numberOfRecords}</Table.TextCell>
                <Table.Cell {...w100} justifyContent='flex-end'>
                  <Tooltip content='Delete Auto Category' hideDelay={0} position='bottom-right'>
                    <IconButton
                      icon='trash'
                      appearance='minimal'
                      intent='danger'
                      onClick={() => setAutoCategoryToDelete(autoCategory)}
                    />
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            </Pane>
          );
        })}
      </Table.Body>

      <DeleteAutoCategoryDialog autoCategory={autoCategoryToDelete} onClose={() => setAutoCategoryToDelete(null)} />
    </Table>
  );
};

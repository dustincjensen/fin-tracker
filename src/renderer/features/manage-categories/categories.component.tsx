import { Table, Text, Pane, IconButton, Tooltip, EditIcon, TrashIcon } from 'evergreen-ui';
import * as React from 'react';
import { useFilteredCategories } from '../../hooks/categories/use-filtered-categories.hook';
import { ICategory } from '../../store/category/category.interface';
import { DeleteCategoryDialog } from './delete-category.dialog';
import { EditCategory } from './edit-category.component';

type CategoriesProps = {
  /**
   * The category filter.
   */
  categoryFilter: string;
};

export const Categories = ({ categoryFilter }: CategoriesProps) => {
  const { filteredCategories: categories } = useFilteredCategories(categoryFilter);

  const [categoryToDelete, setCategoryToDelete] = React.useState<ICategory>(null);
  const [isEditing, setIsEditing] = React.useState<string>(undefined);

  React.useEffect(() => {
    // If the record we are editing is removed from the list
    // of categories we are displaying, either by deletion, or
    // by filtering, unset the editing flag.
    if (isEditing && !categories.find(c => c.id === isEditing)) {
      setIsEditing(undefined);
    }
  }, [categories, isEditing]);

  return (
    <Table>
      <Table.Head paddingRight={0}>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Color</Table.TextHeaderCell>
        <Table.HeaderCell flex='none' width={100}></Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {categories.map(category => {
          return (
            <Pane key={category.id}>
              <Table.Row>
                <Table.TextCell>{category.name}</Table.TextCell>
                <Table.Cell display='flex'>
                  {category.color && (
                    <div
                      style={{ border: '1px solid black', background: category.color, width: '40px', height: '26px' }}
                    ></div>
                  )}
                  <Text marginLeft={10}>{category.color || ''}</Text>
                </Table.Cell>
                <Table.Cell flex='none' justifyContent='flex-end' width={100}>
                  <Tooltip content='Edit Category'>
                    <IconButton
                      icon={EditIcon}
                      appearance='minimal'
                      disabled={!!isEditing && isEditing !== category.id}
                      onClick={() => setIsEditing(category.id)}
                      marginRight={5}
                    />
                  </Tooltip>
                  {!category.accountTransferId && (
                    <Tooltip content='Delete Category'>
                      <IconButton
                        icon={TrashIcon}
                        appearance='minimal'
                        intent='danger'
                        onClick={() => setCategoryToDelete(category)}
                      />
                    </Tooltip>
                  )}
                </Table.Cell>
              </Table.Row>
              {isEditing === category.id && (
                <Pane background='tint1' borderLeft borderRight borderBottom>
                  <EditCategory category={category} close={() => setIsEditing(undefined)} />
                </Pane>
              )}
            </Pane>
          );
        })}
      </Table.Body>

      <DeleteCategoryDialog category={categoryToDelete} onClose={() => setCategoryToDelete(null)} />
    </Table>
  );
};

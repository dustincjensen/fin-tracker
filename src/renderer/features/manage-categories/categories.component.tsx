import { Table, Text, Pane, IconButton, Tooltip } from 'evergreen-ui';
import * as React from 'react';
import { ICategory } from '../../store/category/category.interface';
import { ICategoriesProps } from './categories.props.interface';
import { DeleteCategoryDialog } from './delete-category.dialog';
import { EditCategoryContainer } from './edit-category.container';

export const Categories: React.FC<ICategoriesProps> = props => {
  const { categories, deleteCategory } = props;
  const [categoryToDelete, setCategoryToDelete] = React.useState<ICategory>(null);
  const [isEditing, setIsEditing] = React.useState<string>(undefined);

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
                  <Tooltip content='Edit Category' hideDelay={0}>
                    <IconButton
                      icon='edit'
                      appearance='minimal'
                      disabled={isEditing && isEditing !== category.id}
                      onClick={() => setIsEditing(category.id)}
                      marginRight={5}
                    />
                  </Tooltip>
                  <Tooltip content='Delete Category' hideDelay={0}>
                    <IconButton
                      icon='trash'
                      appearance='minimal'
                      intent='danger'
                      onClick={() => setCategoryToDelete(category)}
                    />
                  </Tooltip>

                  {/* Use this is window width is too small? */}
                  {/* <Popover position={Position.BOTTOM_RIGHT} content={({close}) => (
                      <Menu>
                        <Menu.Group>
                          <Menu.Item icon="edit" onSelect={() => {
                            setIsEditing(category.id);
                            close();
                          }}>Edit</Menu.Item>
                        </Menu.Group>
                        <Menu.Divider />
                        <Menu.Group>
                          <Menu.Item icon="trash" intent="danger" onSelect={
                            () => {setCategoryToDelete(category); close();}
                            }>
                            Delete
                          </Menu.Item>
                        </Menu.Group>
                      </Menu>
                    )}>
                      <Tooltip content="Options" hideDelay={0}>
                      <IconButton icon='more' appearance="minimal" />
                      </Tooltip>
                    </Popover> */}
                </Table.Cell>
              </Table.Row>
              {isEditing === category.id && (
                <Pane background='tint1' borderLeft borderRight borderBottom>
                  <EditCategoryContainer category={category} close={() => setIsEditing(undefined)} />
                </Pane>
              )}
            </Pane>
          );
        })}
      </Table.Body>

      <DeleteCategoryDialog
        category={categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={() => setCategoryToDelete(null)}
        deleteCategory={deleteCategory}
      />
    </Table>
  );
};

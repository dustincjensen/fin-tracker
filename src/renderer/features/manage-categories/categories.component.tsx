import { Button, Table, Text, Pane } from 'evergreen-ui';
import * as React from 'react';
import { ICategory } from '../../store/category/category.interface';
import { ICategoriesProps } from './categories.props.interface';
import { DeleteCategoryDialog } from './delete-category.dialog';

export const Categories: React.FC<ICategoriesProps> = props => {
  const { categories, deleteCategory } = props;
  const [categoryToDelete, setCategoryToDelete] = React.useState<ICategory>(null);
  //const [isEditing, setIsEditing] = React.useState<string>(undefined);

  return (
    <>
      <Table>
        <Table.Head paddingRight={0}>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Color</Table.TextHeaderCell>
          <Table.HeaderCell flex='none' width={90}></Table.HeaderCell>
        </Table.Head>
        <Table.Body>
          {categories.map(category => {
            return (
              <>
                <Table.Row key={category.id}>
                  <Table.TextCell>{category.name}</Table.TextCell>
                  <Table.Cell display='flex'>
                    {category.color && (
                      <div
                        style={{ border: '1px solid black', background: category.color, width: '40px', height: '26px' }}
                      ></div>
                    )}
                    <Text marginLeft={10}>{category.color || ''}</Text>
                  </Table.Cell>
                  <Table.Cell flex='none' width={90}>
                    <Button appearance='minimal' intent='danger' onClick={() => setCategoryToDelete(category)}>
                      Delete
                    </Button>
                    {/* <Button onClick={() => setIsEditing(category.id)}>
                  Edit
                </Button> */}
                  </Table.Cell>
                </Table.Row>
                {/* {isEditing === category.id && (
              <Pane minHeight={300} background="tint1" borderLeft borderRight borderBottom>
                Edit the data here
              </Pane>
            )} */}
              </>
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
    </>
  );
};

import * as React from 'react';
import { Table, Button } from "evergreen-ui";
import { ICategory } from "../../store/category/category.interface";
import { DeleteCategoryDialog } from './delete-category.dialog';
import { ICategoriesProps } from './categories.props.interface';

export const Categories: React.FC<ICategoriesProps> = props => {
    const { deleteCategory } = props;
    const [categoryToDelete, setCategoryToDelete] = React.useState<ICategory>(null);

    return (
        <Table>
            <Table.Head>
                <Table.TextHeaderCell>
                    Name
                </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {props.categories.map(category => {
                   return (<Table.Row key={category.id}>
                        <Table.TextCell>{category.name}</Table.TextCell>
                        <Table.Cell flex='none'>
                            <Button appearance="minimal" intent="danger" onClick={() => setCategoryToDelete(category)}>
                                Delete
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                   );
                })}
            </Table.Body>

            <DeleteCategoryDialog 
                category={categoryToDelete} 
                onClose={() => setCategoryToDelete(null)}
                onConfirm={() => setCategoryToDelete(null)}
                deleteCategory={deleteCategory} />
        </Table>
    );
};

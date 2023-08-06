import { Table, Pane, IconButton, Tooltip, ArchiveIcon, TrashIcon } from 'evergreen-ui';
import React, { useState } from 'react';
import { CategoryTag } from '../../components/category-tag/category-tag.component';
import { IAutoCategory } from '../../store/auto-category/auto-category.interface';
import { createStaticWidthCell } from '../../utils/table.utils';
import { DeleteAutoCategoryDialog } from './delete-auto-category.dialog';
import { useFilteredAutoCategories } from './use-filtered-auto-categories.hook';

const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);

type AutoCategoriesProps = {
    /**
     * The auto category filter.
     */
    autoCategoryFilter: string;

    /**
     * True if archived accounts should be shown, false otherwise.
     */
    showArchived: boolean;
};

export const AutoCategories = ({ autoCategoryFilter, showArchived }: AutoCategoriesProps) => {
    const { filteredAutoCategories: autoCategories } = useFilteredAutoCategories(autoCategoryFilter, showArchived);
    const [autoCategoryToDelete, setAutoCategoryToDelete] = useState<IAutoCategory>(null);

    return (
        <Table>
            <Table.Head paddingRight={0}>
                <Table.TextHeaderCell {...w200}>Account</Table.TextHeaderCell>
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
                                <Table.TextCell {...w200}>
                                    <Pane display='flex' alignItems='center'>
                                        {autoCategory.accountArchived && (
                                            <Tooltip content='Archived'>
                                                <ArchiveIcon marginTop={3} marginRight={10} />
                                            </Tooltip>
                                        )}
                                        {autoCategory.accountName}
                                    </Pane>
                                </Table.TextCell>
                                <Table.TextCell>{autoCategory.description}</Table.TextCell>
                                <Table.Cell {...w200}>
                                    <CategoryTag category={autoCategory.category} />
                                </Table.Cell>
                                <Table.TextCell {...w100}>{autoCategory.numberOfRecords}</Table.TextCell>
                                <Table.Cell {...w100} justifyContent='flex-end'>
                                    {!autoCategory.accountArchived && (
                                        <Tooltip content='Delete Auto Category' position='bottom-right'>
                                            <IconButton
                                                icon={TrashIcon}
                                                appearance='minimal'
                                                intent='danger'
                                                onClick={() => setAutoCategoryToDelete(autoCategory)}
                                            />
                                        </Tooltip>
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        </Pane>
                    );
                })}
            </Table.Body>

            <DeleteAutoCategoryDialog
                autoCategory={autoCategoryToDelete}
                onClose={() => setAutoCategoryToDelete(null)}
            />
        </Table>
    );
};

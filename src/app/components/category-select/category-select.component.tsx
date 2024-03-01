import { Button, SelectMenu, SelectMenuItem } from 'evergreen-ui';
import React, { useMemo } from 'react';
import { Category } from '../../models/category.type';
import { CategoryTag } from '../category-tag/category-tag.component';

export type CategorySelectProps = {
    /**
     * The record with category and id.
     */
    record: {
        id: string;
        category: Category;
    };

    /**
     * The categories to choose from.
     */
    categories: Array<Category>;

    /**
     * The function to update the record with a category id.
     */
    updateCategory: (recordId: string, categoryId: string) => void;

    /**
     * If true, the button will be disabled.
     */
    disabled?: boolean;
};

export const CategorySelect = ({ record, categories, updateCategory, disabled }: CategorySelectProps) => {
    // TODO clean up reducer?
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            if (action.type === 'SET_CATEGORY_ID') {
                return {
                    ...state,
                    categoryId: action.payload,
                };
            } else if (action.type === 'SET_MENU_OPEN') {
                return {
                    ...state,
                    menuOpen: action.payload,
                };
            }
            return state;
        },
        {
            categoryId: undefined,
            menuOpen: false,
        }
    );

    const options = useMemo(
        () => categories.map(category => ({ label: category.name, value: category.id })),
        [categories]
    );

    React.useEffect(() => {
        // Don't update the category until the category id is set
        // and the menu is closed.
        if (!state.menuOpen && state.categoryId) {
            updateCategory(record.id, state.categoryId);
        }
        // Watching all dependencies causes issues because not all updateCategory methods are useCallbacks.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.menuOpen, state.categoryId]);

    const onSelect = (item: SelectMenuItem) => dispatch({ type: 'SET_CATEGORY_ID', payload: item.value as string });
    const onSelectMenuOpened = () => dispatch({ type: 'SET_MENU_OPEN', payload: true });
    const onSelectMenuClosed = () => dispatch({ type: 'SET_MENU_OPEN', payload: false });
    const onClear = () => {
        dispatch({ type: 'SET_CATEGORY_ID', payload: undefined });
        updateCategory(record.id, undefined);
    };

    if (record?.category) {
        return <CategoryTag category={record.category} onClear={onClear} />;
    }

    return (
        <SelectMenu
            title='Category'
            options={options}
            selected={state.categoryId}
            onSelect={onSelect}
            onOpen={onSelectMenuOpened}
            onClose={onSelectMenuClosed}
            closeOnSelect
        >
            <Button type='button' disabled={disabled}>
                Select category...
            </Button>
        </SelectMenu>
    );
};

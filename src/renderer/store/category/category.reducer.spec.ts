import { CategoryActions } from './category.actions';
import { ICategory } from './category.interface';
import { CategoryReducer as reducer } from './category.reducer';
import { ICategoryStore } from './category.store.interface';

describe('reducers', () => {
  describe('Category', () => {
    const categoryId = 'categoryId';
    const otherCategoryId = 'otherCategoryId';
    const category: ICategory = {
      id: categoryId,
      name: 'Grocery',
      color: '#123456',
    };
    const otherCategory: ICategory = {
      id: otherCategoryId,
      name: 'Eating Out',
      color: '#654321',
    };

    describe('saveNewCategory', () => {
      it('should add a new category', () => {
        const initialState: ICategoryStore = {
          categories: {},
        };

        const newState = reducer(initialState, {
          type: CategoryActions.SAVE_NEW_CATEGORY,
          payload: category,
        });

        const expectedState: ICategoryStore = {
          categories: {
            [categoryId]: category,
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('updateCategory', () => {
      it('should throw an error when category does not exist', () => {
        const initialState: ICategoryStore = {
          categories: {},
        };

        expect(() => {
          reducer(initialState, {
            type: CategoryActions.UPDATE_CATEGORY,
            payload: category,
          });
        }).toThrowError('Category does not exist');
      });

      it('should update category when category exists', () => {
        const initialState: ICategoryStore = {
          categories: {
            [categoryId]: category,
            [otherCategoryId]: otherCategory,
          },
        };

        const newState = reducer(initialState, {
          type: CategoryActions.UPDATE_CATEGORY,
          payload: { ...category, color: '#ff5566' },
        });

        const expectedState: ICategoryStore = {
          categories: {
            [categoryId]: { ...category, color: '#ff5566' },
            [otherCategoryId]: otherCategory,
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('deleteCategory', () => {
      it('should delete the category when it exists', () => {
        const initialState: ICategoryStore = {
          categories: {
            [categoryId]: category,
            [otherCategoryId]: otherCategory,
          },
        };

        const newState = reducer(initialState, {
          type: CategoryActions.DELETE_CATEGORY,
          payload: category,
        });

        const expectedState: ICategoryStore = {
          categories: {
            [otherCategoryId]: otherCategory,
          },
        };
        expect(newState).toEqual(expectedState);
      });
    });

    describe('createTransferCategory', () => {
      // TODO
    });

    describe('deleteTransferCategory', () => {
      // TODO
    });
  });
});

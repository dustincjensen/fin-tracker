import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import IStore from '../store/store.interface';
import { ICategoryListProps } from '../components/categories/category-list.props';
import { DeleteCategory } from '../store/category/category.actions';
import CategoryList from '../components/categories/category-list.component';

const mapStateToProps = (state: IStore): ICategoryListProps => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ICategoryListProps => {
  return {
    delete: (id: string) => dispatch(DeleteCategory(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

import { shallow } from 'enzyme';
import { SelectMenu } from 'evergreen-ui';
import React from 'react';
import { CategoryTag } from '../category-tag/category-tag.component';
import { CategorySelect } from './category-select.component';
import { ICategorySelectProps } from './category-select.props.interface';

describe('components', () => {
    describe('CategorySelect', () => {
        let props: ICategorySelectProps;

        beforeEach(() => {
            props = {
                categories: [],
                updateCategory: jest.fn(),
                record: {
                    id: 'id',
                    category: undefined,
                },
            };
        });

        it('should render a SelectMenu when record has no category', () => {
            const record: ICategorySelectProps['record'] = {
                id: 'id',
                category: undefined,
            };
            const component = shallow(<CategorySelect {...props} record={record} />);
            expect(component.find(SelectMenu).length).toBe(1);
        });

        it('should render CategoryTag when record has a category selected', () => {
            const record: ICategorySelectProps['record'] = {
                id: 'id',
                category: {
                    id: 'categoryId',
                    color: '#333',
                    name: 'Grocery',
                },
            };
            const component = shallow(<CategorySelect {...props} record={record} />);
            expect(component.find(CategoryTag).length).toBe(1);
        });
    });
});

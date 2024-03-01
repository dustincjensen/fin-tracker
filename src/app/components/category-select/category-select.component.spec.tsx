import { render, screen } from '@testing-library/react';
import React from 'react';
import { CategorySelect, CategorySelectProps } from './category-select.component';

describe('components', () => {
    describe('CategorySelect', () => {
        let props: CategorySelectProps;

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
            const record: CategorySelectProps['record'] = {
                id: 'id',
                category: undefined,
            };
            render(<CategorySelect {...props} record={record} />);
            expect(screen.getByRole('button')).toHaveTextContent('Select category...');
        });

        it('should render CategoryTag when record has a category selected', () => {
            const record: CategorySelectProps['record'] = {
                id: 'id',
                category: {
                    id: 'categoryId',
                    color: '#333',
                    name: 'Grocery',
                },
            };
            render(<CategorySelect {...props} record={record} />);
            expect(screen.getByTestId('category-tag')).toBeInTheDocument();
        });
    });
});

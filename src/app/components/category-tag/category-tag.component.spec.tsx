import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CategoryTag, CategoryTagProps } from './category-tag.component';

describe('components', () => {
    describe('CategoryTag', () => {
        let props: CategoryTagProps;

        beforeEach(() => {
            props = {
                category: {
                    id: 'categoryId',
                    color: '#123456',
                    name: 'Grocery',
                },
                onClear: jest.fn(),
            };
        });

        it('should render background in category color when category color is provided', () => {
            const category: CategoryTagProps['category'] = {
                id: 'id',
                color: '#123456',
                name: 'Grocery',
            };

            render(<CategoryTag {...props} category={category} />);
            expect(screen.getByTestId('wrapper')).toHaveStyle(`background: ${category.color}`);
        });

        it('should render background in default color when category color is not provided', () => {
            const category: CategoryTagProps['category'] = {
                id: 'id',
                color: undefined,
                name: 'Grocery',
            };
            render(<CategoryTag {...props} category={category} />);
            expect(screen.getByTestId('wrapper')).toHaveStyle('background: #333');
        });

        it('should not render a button when onClear is not provided', () => {
            render(<CategoryTag {...props} onClear={undefined} />);
            expect(screen.queryByRole('button', { name: 'Remove Category Tag' })).not.toBeInTheDocument();
        });

        it('should render a button when onClear is provided', () => {
            const onClear = jest.fn();
            render(<CategoryTag {...props} onClear={onClear} />);
            expect(screen.queryByRole('button', { name: 'Remove Category Tag' })).toBeInTheDocument();
        });

        it('should call onClear when button is clicked', () => {
            const onClear = jest.fn();
            render(<CategoryTag {...props} onClear={onClear} />);

            // TODO investigate @testing-library/user-event
            fireEvent.click(screen.getByRole('button', { name: 'Remove Category Tag' }));

            expect(onClear).toHaveBeenCalledTimes(1);
        });
    });
});

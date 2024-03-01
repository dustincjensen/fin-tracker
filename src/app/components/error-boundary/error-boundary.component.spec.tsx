import React from 'react';
import { renderApp, screen } from '../../utils/test.utils';
import { ErrorBoundary } from './error-boundary.component';

const TestChild = () => <div data-testid='test-child'>Test Child Render</div>;

const TestChildError = () => {
    throw new Error('Error');
};

describe('components', () => {
    describe('ErrorBoundary', () => {
        it('should render children when no error has occurred', () => {
            renderApp(
                <ErrorBoundary>
                    <TestChild />
                </ErrorBoundary>
            );
            expect(screen.queryByTestId('error-boundary')).not.toBeInTheDocument();
            expect(screen.getByTestId('test-child')).toBeInTheDocument();
        });

        it('should render error when an error has occurred', () => {
            jest.spyOn(console, 'error').mockImplementation(() => {
                // Fake mock
            });

            renderApp(
                <ErrorBoundary>
                    <TestChildError />
                </ErrorBoundary>
            );
            expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
        });
    });
});

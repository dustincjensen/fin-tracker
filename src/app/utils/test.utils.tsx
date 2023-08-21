import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { rootReducer } from '../store/store';

/**
 * Returns the partial object cast into the full version.
 *
 * @param obj   A partial implementation of the interface.
 */
export function build<T>(obj: Partial<T>): T {
    return obj as T;
}

const store = createStore(rootReducer, {});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <HashRouter>{children}</HashRouter>
        </Provider>
    );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as renderApp };

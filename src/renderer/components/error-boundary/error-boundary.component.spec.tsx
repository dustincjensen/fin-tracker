import { mount } from 'enzyme';
import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from './error-boundary.component';

const TestChild = () => <div data-name='test-child'>Test Child Render</div>;

describe('components', () => {
  describe('ErrorBoundary', () => {
    it('should render children when no error has occurred', () => {
      const component = mount(
        <ErrorBoundary>
          <TestChild />
        </ErrorBoundary>
      );
      expect(component.find(TestChild).length).toBe(1);
    });

    it('should render error when an error has occurred', () => {
      const component = mount(
        <ErrorBoundary>
          <TestChild />
        </ErrorBoundary>
      );
      component.find(TestChild).simulateError(new Error('Error'));
      expect(component.find(Pane).length).toBe(1);
    });
  });
});

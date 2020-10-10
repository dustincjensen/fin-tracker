import { shallow } from 'enzyme';
import { Button } from 'evergreen-ui';
import * as React from 'react';
import { NavLink } from './nav-link.component';

describe('components', () => {
  describe('NavLink', () => {
    it('should render a Button', () => {
      const component = shallow(<NavLink to='/home' text='Home' iconBefore='home' />);
      expect(component.find(Button).length).toBe(1);
    });
  });
});

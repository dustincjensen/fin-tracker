import { shallow } from 'enzyme';
import { Button, HomeIcon } from 'evergreen-ui';
import React from 'react';
import { NavLink } from './nav-link.component';

describe('components', () => {
  describe('NavLink', () => {
    it('should render a Button', () => {
      const component = shallow(<NavLink to='/home' text='Home' iconBefore={HomeIcon} />);
      expect(component.find(Button).length).toBe(1);
    });
  });
});

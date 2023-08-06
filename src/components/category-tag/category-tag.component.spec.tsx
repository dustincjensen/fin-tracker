import { shallow } from 'enzyme';
import React from 'react';
import { CategoryTag } from './category-tag.component';
import { ICategoryTagProps } from './category-tag.props.interface';

describe('components', () => {
  describe('CategoryTag', () => {
    let props: ICategoryTagProps;

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
      const category: ICategoryTagProps['category'] = {
        id: 'id',
        color: '#123456',
        name: 'Grocery',
      };
      const component = shallow(<CategoryTag {...props} category={category} />);
      const paneBackground = component.find('[data-name="category-tag"]').props()['background'];
      expect(paneBackground).toBe(category.color);
    });

    it('should render background in default color when category color is not provided', () => {
      const category: ICategoryTagProps['category'] = {
        id: 'id',
        color: undefined,
        name: 'Grocery',
      };
      const component = shallow(<CategoryTag {...props} category={category} />);
      const paneBackground = component.find('[data-name="category-tag"]').props()['background'];
      expect(paneBackground).toBe('#333');
    });

    it('should not render a button when onClear is not provided', () => {
      const component = shallow(<CategoryTag {...props} onClear={undefined} />);
      expect(component.find('button').length).toBe(0);
    });

    it('should render a button when onClear is provided', () => {
      const onClear = jest.fn();
      const component = shallow(<CategoryTag {...props} onClear={onClear} />);
      expect(component.find('button').length).toBe(1);
    });

    it('should call onClear when button is clicked', () => {
      const onClear = jest.fn();
      const component = shallow(<CategoryTag {...props} onClear={onClear} />);
      component.find('button').simulate('click');
      expect(onClear).toHaveBeenCalled();
    });
  });
});

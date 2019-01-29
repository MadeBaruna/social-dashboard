import React from 'react';
import NotFoundPage from '../NotFoundPage';
import { shallow } from 'enzyme';

it('renders not found page', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import Header from '../Header';
import { shallow } from 'enzyme';

it('renders <Header /> components', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

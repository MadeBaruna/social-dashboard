import React from 'react';
import { shallow } from 'enzyme';

import UserCard from '../UserCard';

it('renders <UserCard /> components', () => {
  const wrapper = shallow(
    <UserCard
      id={1}
      name="Test User"
      username="test"
      email="test@example.com"
      website="example.com"
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';

import UserCardDetail from '../UserCardDetail';

it('renders <UserCardDetail /> components', () => {
  const wrapper = shallow(
    <UserCardDetail
      id={1}
      name="Test User"
      username="test"
      email="test@example.com"
      website="test"
      phone="1234567890"
      address={{ city: 'Malang' }}
      company={{ name: 'Kumparan' }}
      currentLocation="posts"
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';

import PostCard from '../PostCard';

it('renders <PostCard /> components', () => {
  const wrapper = shallow(
    <PostCard
      id={1}
      title="this is a test title"
      body={'qui consequuntur ducimus\npossimus quisquam amet similique\nsuscipit porro ipsam amet'}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

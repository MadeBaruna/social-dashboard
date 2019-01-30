import React from 'react';
import { shallow } from 'enzyme';

import CommentCardEditor from '../CommentCardEditor';

it('renders CommentCardEditor components', () => {
  const wrapper = shallow(<CommentCardEditor postId={1} />);

  expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import PostCard from '../PostCard';
import { Input, TextArea, Button } from 'semantic-ui-react';

it('render <PostCard /> components', () => {
  const wrapper = shallow(
    <PostCard
      id={1}
      title="this is a test title"
      body={
        'qui consequuntur ducimus\npossimus quisquam amet similique\nsuscipit porro ipsam amet'
      }
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('render editor when new', () => {
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <PostCard isNew />
    </MockedProvider>,
  );

  expect(wrapper.find(PostCard).get(0).props.isNew).toBe(true);
  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(TextArea)).toHaveLength(1);
});

it('Set input value when editing', () => {
  const title = 'Hello, world!';
  const body = 'Test word\nNew Line';

  const wrapper = mount(
    <Router>
      <MockedProvider mocks={[]}>
        <PostCard userId={1} id={1} title={title} body={body} />
      </MockedProvider>
    </Router>,
  );

  const card = wrapper.find(PostCard);
  card.find(Button).at(1).simulate('click');

  expect(wrapper.find(Input).props().value).toEqual(title);
  expect(wrapper.find(TextArea).props().value).toEqual(body);
});

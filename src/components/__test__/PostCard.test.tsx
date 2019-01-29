import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Input, TextArea, Button } from 'semantic-ui-react';

import PostCard from '../PostCard';
import PostCardEditor from '../PostCardEditor';
import { UpdatePost as UpdatePostMutation } from '../../graphql/mutations/UpdatePost';

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
  card
    .find(Button)
    .at(1)
    .simulate('click');

  expect(wrapper.find(Input).props().value).toEqual(title);
  expect(wrapper.find(TextArea).props().value).toEqual(body);
});

it('Close editor when cancel clicked', () => {
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
  card
    .find(Button)
    .at(1)
    .simulate('click');

  const cardEditor = wrapper.find(PostCardEditor);
  cardEditor
    .find(Button)
    .at(1)
    .simulate('click');

  expect(wrapper.find(Input)).toHaveLength(0);
  expect(wrapper.find(TextArea)).toHaveLength(0);
});

it('Close editor when save clicked', async () => {
  const id = 1;
  const userId = 1;
  const title = 'Hello, world!';
  const body = 'Test word\nNew Line';
  const mocks = [
    {
      request: {
        query: UpdatePostMutation,
        variables: {
          id,
          userId,
          title,
          body,
        },
      },
      result: {
        data: {
          updatePost: {
            id,
            userId,
            title,
            body,
          },
        },
      },
    },
  ];

  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostCard userId={userId} id={id} title={title} body={body} />
      </MockedProvider>
    </Router>,
  );

  const card = wrapper.find(PostCard);
  card
    .find(Button)
    .at(1)
    .simulate('click');

  const cardEditor = wrapper.find(PostCardEditor);
  cardEditor
    .find(Button)
    .at(0)
    .simulate('click');

  await new Promise((resolve) => setTimeout(resolve, 100));
  wrapper.update();

  expect(wrapper.find(Input)).toHaveLength(0);
  expect(wrapper.find(TextArea)).toHaveLength(0);
});

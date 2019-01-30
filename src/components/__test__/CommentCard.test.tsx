import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Input, TextArea, Button } from 'semantic-ui-react';

import CommentCard from '../CommentCard';
import CommentCardEditor from '../CommentCardEditor';
import PostCardEditor from '../PostCardEditor';

it('renders CommentCard components', () => {
  const wrapper = shallow(
    <CommentCard
      postId={1}
      id={1}
      name="name"
      email="email"
      body={
        'qui consequuntur ducimus\npossimus quisquam amet similique\nsuscipit porro ipsam amet'
      }
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders CommentCardEditor if editing', () => {
  const wrapper = shallow(
    <CommentCard
      postId={1}
      id={1}
      name="name"
      email="email"
      body={
        'qui consequuntur ducimus\npossimus quisquam amet similique\nsuscipit porro ipsam amet'
      }
    />,
  );

  wrapper
    .find(Button)
    .at(0)
    .simulate('click');
  expect(wrapper.find(CommentCardEditor)).toHaveLength(1);
});

it('Set input value when editing', () => {
  const wrapper = shallow(
    <CommentCard postId={1} id={1} name="name" email="email" body="body" />,
  );

  wrapper
    .find(Button)
    .at(0)
    .simulate('click');

  const inputs = wrapper.dive().find(Input);
  expect(inputs.at(0).props().value).toEqual('name');
  expect(inputs.at(1).props().value).toEqual('email');
  expect(
    wrapper
      .dive()
      .find(TextArea)
      .props().value,
  ).toEqual('body');
});

it('Keep value if edit is cancelled', () => {
  const wrapper = shallow(
    <CommentCard postId={1} id={1} name="name" email="email" body="body" />,
  );

  wrapper
    .find(Button)
    .at(0)
    .simulate('click');

  wrapper.update();

  wrapper
    .dive()
    .find(Button)
    .at(0)
    .simulate('click');

  expect(wrapper.state()).toEqual({
    name: 'name',
    email: 'email',
    body: 'body',
    isEditing: false,
  });
});

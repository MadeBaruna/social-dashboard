import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { createMemoryHistory } from 'history';

import PostCard from '../../components/PostCard';
import PostDetail from '../PostDetail/PostDetail';
import { DeletePost as DeletePostMutation } from '../../graphql/mutations/DeletePost';
import { GetPost as GetPostQuery } from '../../graphql/queries/GetPost';
import UserDetail from '../UserDetail/UserDetail';

it('Redirect if post deleted', async () => {
  const mocks = [
    {
      request: {
        query: DeletePostMutation,
        variables: {
          id: 1,
        },
      },
      result: {
        data: {
          deletePost: {
            id: 1,
          },
        },
      },
    },
    {
      request: {
        query: GetPostQuery,
        variables: {
          id: 1,
        },
      },
      result: {
        data: {
          post: {
            userId: 1,
            id: 1,
            title: 'test title',
            body: 'test\nbody',
            comments: [],
          },
        },
      },
    },
  ];

  const history = createMemoryHistory({
    initialEntries: ['/post/1'],
    initialIndex: 1,
  });

  history.replace = jest.fn();

  const wrapper = mount(
    <MemoryRouter initialEntries={['/post/1']} initialIndex={1}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostDetail
          match={{
            params: {
              id: '1',
            },
            isExact: true,
            path: '/post/:id',
            url: '/post/1',
          }}
          location={{
            pathname: '/post/:id',
            search: '',
            hash: '',
            state: {},
          }}
          history={history}
        />
      </MockedProvider>
    </MemoryRouter>,
  );

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const card = wrapper.find(PostCard);
  expect(card.props().onDetailPage).toBe(true);

  card
    .find(Button)
    .at(1)
    .simulate('click');

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  expect(history.replace).toBeCalled();
});

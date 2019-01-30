import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { createMemoryHistory } from 'history';

import PostCard from '../../components/PostCard';
import PostDetail from '../PostDetail';
import CommentCardEditor from '../../components/CommentCardEditor';
import CommentCard from '../../components/CommentCard';
import { DeletePost as DeletePostMutation } from '../../graphql/mutations/DeletePost';
import { GetPost as GetPostQuery } from '../../graphql/queries/GetPost';
import { CreateComment as CreateCommentMutation } from '../../graphql/mutations/CreateComment';
import { UpdateComment as UpdateCommentMutation } from '../../graphql/mutations/UpdateComment';
import { DeleteComment as DeleteCommentMutation } from '../../graphql/mutations/DeleteComment';

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

it('Create a new comment and show the new card', async () => {
  const mocks = [
    {
      request: {
        query: CreateCommentMutation,
        variables: {
          postId: 1,
          name: 'Test Name',
          email: 'email@example.com',
          body: 'comment\nbody',
        },
      },
      result: {
        data: {
          comment: {
            id: 2,
            name: 'Test Name',
            email: 'email@example.com',
            body: 'comment\nbody',
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
            comments: [
              {
                id: 1,
                postId: 1,
                name: 'Test Name 1',
                email: 'email1@example.com',
                body: 'comment1\nbody',
              },
            ],
          },
        },
      },
    },
  ];

  const history = createMemoryHistory({
    initialEntries: ['/post/1'],
    initialIndex: 1,
  });

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

  const editor = wrapper.find(CommentCardEditor);
  editor.setState({
    name: 'Test Name',
    email: 'email@example.com',
    body: 'comment\nbody',
  });

  editor
    .find(Button)
    .at(0)
    .simulate('click');
  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cardsAfterCreating = wrapper.find(CommentCard);
  expect(cardsAfterCreating).toHaveLength(2);
});

it('Update a comment', async () => {
  const mocks = [
    {
      request: {
        query: UpdateCommentMutation,
        variables: {
          id: 1,
          name: 'Test Name Update',
          email: 'email-update@example.com',
          body: 'comment\nbody update',
        },
      },
      result: {
        data: {
          updateComment: {
            id: 1,
            name: 'Test Name Update',
            email: 'email-update@example.com',
            body: 'comment\nbody update',
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
            comments: [
              {
                id: 1,
                postId: 1,
                name: 'Test Name 1',
                email: 'email1@example.com',
                body: 'comment1\nbody',
              },
              {
                id: 2,
                postId: 1,
                name: 'Test Name',
                email: 'email@example.com',
                body: 'comment\nbody',
              },
            ],
          },
        },
      },
    },
  ];

  const history = createMemoryHistory({
    initialEntries: ['/post/1'],
    initialIndex: 1,
  });

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

  const card = wrapper.find(CommentCard).at(1);
  card.find(Button).at(0).simulate('click');

  const editor = wrapper.find(CommentCardEditor).at(1);
  editor.setState({
    name: 'Test Name Update',
    email: 'email-update@example.com',
    body: 'comment\nbody update',
  });

  editor
    .find(Button)
    .at(0)
    .simulate('click');

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cardsAfterUpdating = wrapper.find(CommentCard);
  expect(cardsAfterUpdating).toHaveLength(2);
  expect(cardsAfterUpdating.at(1).state()).toEqual({
    isEditing: false,
    name: 'Test Name Update',
    email: 'email-update@example.com',
    body: 'comment\nbody update',
  });
});

it('Delete a comment', async () => {
  const mocks = [
    {
      request: {
        query: DeleteCommentMutation,
        variables: {
          id: 1,
        },
      },
      result: {
        data: {
          deleteComment: {
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
            comments: [
              {
                id: 1,
                postId: 1,
                name: 'Test Name 1',
                email: 'email1@example.com',
                body: 'comment1\nbody',
              },
              {
                id: 2,
                postId: 1,
                name: 'Test Name',
                email: 'email@example.com',
                body: 'comment\nbody',
              },
            ],
          },
        },
      },
    },
  ];

  const history = createMemoryHistory({
    initialEntries: ['/post/1'],
    initialIndex: 1,
  });

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

  const card = wrapper.find(CommentCard).at(1);
  card.find(Button).at(1).simulate('click');

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cardsAfterDeleting = wrapper.find(CommentCard);
  expect(cardsAfterDeleting).toHaveLength(1);
});

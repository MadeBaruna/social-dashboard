import React from 'react';
import { mount } from 'enzyme';
import { Button, Input, TextArea } from 'semantic-ui-react';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import PostList from '../UserDetail/PostList';
import PostCard from '../../components/PostCard';
import { GetPosts as GetPostsQuery } from '../../graphql/queries/GetPosts';
import { DeletePost as DeletePostMutation } from '../../graphql/mutations/DeletePost';
import { UpdatePost as UpdatePostMutation } from '../../graphql/mutations/UpdatePost';
import { CreatePost as CreatePostMutation } from '../../graphql/mutations/CreatePost';
import PostCardEditor from '../../components/PostCardEditor';

/* tslint:disable:max-line-length */
const mocks = [
  {
    request: {
      query: GetPostsQuery,
      variables: {
        userId: 1,
      },
    },
    result: {
      data: {
        postsByUser: [
          {
            userId: 1,
            id: 1,
            title:
              'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body:
              'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          },
          {
            userId: 1,
            id: 2,
            title: 'qui est esse',
            body:
              'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
          },
          {
            userId: 1,
            id: 3,
            title:
              'ea molestias quasi exercitationem repellat qui ipsa sit aut',
            body:
              'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
          },
          {
            userId: 1,
            id: 4,
            title: 'eum et est occaecati',
            body:
              'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
          },
          {
            userId: 1,
            id: 5,
            title: 'nesciunt quas odio',
            body:
              'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
          },
          {
            userId: 1,
            id: 6,
            title: 'dolorem eum magni eos aperiam quia',
            body:
              'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
          },
          {
            userId: 1,
            id: 7,
            title: 'magnam facilis autem',
            body:
              'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
          },
          {
            userId: 1,
            id: 8,
            title: 'dolorem dolore est ipsam',
            body:
              'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
          },
          {
            userId: 1,
            id: 9,
            title: 'nesciunt iure omnis dolorem tempora et accusantium',
            body:
              'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
          },
          {
            userId: 1,
            id: 10,
            title: 'optio molestias id quia eum',
            body:
              'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
          },
        ],
      },
    },
  },
  {
    request: {
      query: DeletePostMutation,
      variables: {
        id: 10,
      },
    },
    result: {
      data: {
        deletePost: {
          id: 10,
        },
      },
    },
  },
  {
    request: {
      query: CreatePostMutation,
      variables: {
        userId: 1,
        title: 'new title',
        body: 'new body',
      },
    },
    result: {
      data: {
        post: {
          id: 11,
          userId: 1,
          title: 'new title',
          body: 'new body',
        },
      },
    },
  },
  {
    request: {
      query: UpdatePostMutation,
      variables: {
        id: 10,
        userId: 1,
        title: 'edit title',
        body: 'edit body',
      },
    },
    result: {
      data: {
        updatePost: {
          id: 10,
          userId: 1,
          title: 'edit title',
          body: 'edit body',
        },
      },
    },
  },
];
/* tslint:enable:max-line-length */

it('Show 10 posts', async () => {
  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostList
          match={{
            params: { id: '1' },
            isExact: true,
            path: '/user/:id',
            url: '/user/1',
          }}
        />
      </MockedProvider>
    </Router>,
  );

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cards = wrapper.find(PostCard);
  expect(cards).toHaveLength(10);
});

it('Show new card', async () => {
  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostList
          match={{
            params: { id: '1' },
            isExact: true,
            path: '/user/:id',
            url: '/user/1',
          }}
        />
      </MockedProvider>
    </Router>,
  );

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cardEditor = wrapper.find(PostCardEditor).at(0);
  cardEditor.setState({ title: 'new title', body: 'new body' });
  cardEditor
    .find(Button)
    .at(0)
    .simulate('click');

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  expect(
    wrapper
      .find(PostCard)
      .at(0)
      .props(),
  ).toEqual({
    id: 11,
    userId: 1,
    isNew: false,
    title: 'new title',
    body: 'new body',
    onDetailPage: false,
  });
  const cardsAfterCreating = wrapper.find(PostCard);
  expect(cardsAfterCreating).toHaveLength(11);
});

it('Show edited post value', async () => {
  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostList
          match={{
            params: { id: '1' },
            isExact: true,
            path: '/user/:id',
            url: '/user/1',
          }}
        />
      </MockedProvider>
    </Router>,
  );

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cards = wrapper.find(PostCard);
  const card = cards.at(0);
  card
    .find(Button)
    .at(1)
    .simulate('click');
  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cardEditor = wrapper.find(PostCardEditor).at(1);
  cardEditor.setState({ title: 'edit title', body: 'edit body' });
  cardEditor
    .find(Button)
    .at(0)
    .simulate('click');

  await new Promise((resolve) => setTimeout(resolve));
  card.update();

  expect(card.state()).toEqual({
    body: 'edit body',
    isEditing: false,
    title: 'edit title',
  });

  const cardsAfterEditing = wrapper.find(PostCard);
  expect(cardsAfterEditing).toHaveLength(10);
});

it('Show 9 posts after delete', async () => {
  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostList
          match={{
            params: { id: '1' },
            isExact: true,
            path: '/user/:id',
            url: '/user/1',
          }}
        />
      </MockedProvider>
    </Router>,
  );

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cards = wrapper.find(PostCard);
  expect(cards).toHaveLength(10);

  cards
    .at(0)
    .find(Button)
    .at(2)
    .simulate('click');
  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  const cardsAfterDeleting = wrapper.find(PostCard);
  expect(cardsAfterDeleting).toHaveLength(9);
});

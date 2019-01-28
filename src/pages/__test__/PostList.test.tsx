import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import PostList from '../UserDetail/PostList';
import { GetPosts as GetPostsQuery } from '../../graphql/queries/GetPosts';
import PostCard from '../../components/PostCard';

it('Show 10 posts', async () => {
  /* tslint:disable:max-line-length */
  const mocks = [
    {
      request: {
        query: GetPostsQuery,
        variables: {
          userId: 2,
        },
      },
      result: {
        data: {
          postsByUser: [
            {
              id: 11,
              title: 'et ea vero quia laudantium autem',
              body:
                'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
            },
            {
              id: 12,
              title: 'in quibusdam tempore odit est dolorem',
              body:
                'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
            },
            {
              id: 13,
              title: 'dolorum ut in voluptas mollitia et saepe quo animi',
              body:
                'aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam',
            },
            {
              id: 14,
              title: 'voluptatem eligendi optio',
              body:
                'fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum',
            },
            {
              id: 15,
              title: 'eveniet quod temporibus',
              body:
                'reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae',
            },
            {
              id: 16,
              title:
                'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
              body:
                'suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta',
            },
            {
              id: 17,
              title: 'fugit voluptas sed molestias voluptatem provident',
              body:
                'eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo',
            },
            {
              id: 18,
              title: 'voluptate et itaque vero tempora molestiae',
              body:
                'eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam',
            },
            {
              id: 19,
              title: 'adipisci placeat illum aut reiciendis qui',
              body:
                'illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas',
            },
            {
              id: 20,
              title: 'doloribus ad provident suscipit at',
              body:
                'qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo',
            },
          ],
        },
      },
    },
  ];

  /* tslint:enable:max-line-length */

  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostList
          match={{
            params: { id: '2' },
            isExact: true,
            path: '/user/:id',
            url: '/user/2',
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

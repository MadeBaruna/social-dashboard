import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import AlbumList from '../UserDetail/AlbumList';
import { GetAlbums as GetAlbumsQuery } from '../../graphql/queries/GetAlbums';
import { Card } from 'semantic-ui-react';

it('Show 10 Album', async () => {
  const mocks = [
    {
      request: {
        query: GetAlbumsQuery,
        variables: {
          userId: 1,
        },
      },
      result: {
        data: {
          albums: [
            {
              id: 1,
              title: 'quidem molestiae enim',
              thumbnail: 'https://via.placeholder.com/150/92c952',
            },
            {
              id: 2,
              title: 'sunt qui excepturi placeat culpa',
              thumbnail: 'https://via.placeholder.com/150/8e973b',
            },
            {
              id: 3,
              title: 'omnis laborum odio',
              thumbnail: 'https://via.placeholder.com/150/e743b',
            },
            {
              id: 4,
              title: 'non esse culpa molestiae omnis sed optio',
              thumbnail: 'https://via.placeholder.com/150/1d2ad4',
            },
            {
              id: 5,
              title: 'eaque aut omnis a',
              thumbnail: 'https://via.placeholder.com/150/250289',
            },
            {
              id: 6,
              title: 'natus impedit quibusdam illo est',
              thumbnail: 'https://via.placeholder.com/150/afc5c2',
            },
            {
              id: 7,
              title: 'quibusdam autem aliquid et et quia',
              thumbnail: 'https://via.placeholder.com/150/92ce9a',
            },
            {
              id: 8,
              title: 'qui fuga est a eum',
              thumbnail: 'https://via.placeholder.com/150/9ae7cb',
            },
            {
              id: 9,
              title: 'saepe unde necessitatibus rem',
              thumbnail: 'https://via.placeholder.com/150/9f134c',
            },
            {
              id: 10,
              title: 'distinctio laborum qui',
              thumbnail: 'https://via.placeholder.com/150/5e912a',
            },
          ],
        },
      },
    },
  ];

  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <AlbumList
          match={{
            params: { id: '1' },
            isExact: true,
            path: '/user/:id/albums',
            url: '/user/1/albums',
          }}
        />
      </MockedProvider>
    </Router>,
  );

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  expect(wrapper.find(Card)).toHaveLength(10);
});

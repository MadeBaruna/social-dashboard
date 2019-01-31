import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import AlbumList from '../UserDetail/AlbumList';
import { GetAlbumDetail as GetAlbumDetailQuery } from '../../graphql/queries/GetAlbumDetail';
import AlbumDetail from '../AlbumDetail';
import PhotoCard from '../../components/PhotoCard';

const mocks = [
  {
    request: {
      query: GetAlbumDetailQuery,
      variables: {
        albumId: 1,
      },
    },
    result: {
      data: {
        album: {
          title: 'sunt qui excepturi placeat culpa',
          photos: [
            {
              id: 51,
              title: 'non sunt voluptatem placeat consequuntur rem incidunt',
              thumbnailUrl: 'https://via.placeholder.com/150/8e973b',
              url: 'https://via.placeholder.com/600/8e973b',
            },
            {
              id: 52,
              title: 'eveniet pariatur quia nobis reiciendis laboriosam ea',
              thumbnailUrl: 'https://via.placeholder.com/150/121fa4',
              url: 'https://via.placeholder.com/600/121fa4',
            },
            {
              id: 53,
              title: 'soluta et harum aliquid officiis ab omnis consequatur',
              thumbnailUrl: 'https://via.placeholder.com/150/6efc5f',
              url: 'https://via.placeholder.com/600/6efc5f',
            },
            {
              id: 54,
              title: 'ut ex quibusdam dolore mollitia',
              thumbnailUrl: 'https://via.placeholder.com/150/aa8f2e',
              url: 'https://via.placeholder.com/600/aa8f2e',
            },
            {
              id: 55,
              title: 'voluptatem consequatur totam qui aut iure est vel',
              thumbnailUrl: 'https://via.placeholder.com/150/5e04a4',
              url: 'https://via.placeholder.com/600/5e04a4',
            },
            {
              id: 56,
              title:
                'vel voluptatem esse consequuntur est officia quo aut quisquam',
              thumbnailUrl: 'https://via.placeholder.com/150/f9f067',
              url: 'https://via.placeholder.com/600/f9f067',
            },
            {
              id: 57,
              title: 'vero est optio expedita quis ut molestiae',
              thumbnailUrl: 'https://via.placeholder.com/150/95acce',
              url: 'https://via.placeholder.com/600/95acce',
            },
            {
              id: 58,
              title: 'rem pariatur facere eaque',
              thumbnailUrl: 'https://via.placeholder.com/150/cde4c1',
              url: 'https://via.placeholder.com/600/cde4c1',
            },
            {
              id: 59,
              title: 'modi totam dolor eaque et ipsum est cupiditate',
              thumbnailUrl: 'https://via.placeholder.com/150/a46a91',
              url: 'https://via.placeholder.com/600/a46a91',
            },
            {
              id: 60,
              title:
                'ea enim temporibus asperiores placeat consectetur commodi ullam',
              thumbnailUrl: 'https://via.placeholder.com/150/323599',
              url: 'https://via.placeholder.com/600/323599',
            },
          ],
        },
      },
    },
  },
];

it('Show 10 Photos', async () => {
  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <AlbumDetail
          match={{
            params: { id: '1' },
            isExact: true,
            path: '/album/:id',
            url: '/album/1',
          }}
        />
      </MockedProvider>
    </Router>,
  );

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  expect(wrapper.find(PhotoCard)).toHaveLength(10);
});

it('Show Photo Detail', async () => {
  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <AlbumDetail
          match={{
            params: { id: '1' },
            isExact: true,
            path: '/album/:id',
            url: '/album/1',
          }}
        />
      </MockedProvider>
    </Router>,
  );

  await new Promise((resolve) => setTimeout(resolve));
  wrapper.update();

  wrapper
    .find(PhotoCard)
    .at(0)
    .simulate('click');
  expect(wrapper.find(AlbumDetail).state()).toEqual({
    isModalOpen: true,
    showedImageUrl: 'https://via.placeholder.com/600/8e973b',
    showedImageTitle: 'non sunt voluptatem placeat consequuntur rem incidunt',
  });
});

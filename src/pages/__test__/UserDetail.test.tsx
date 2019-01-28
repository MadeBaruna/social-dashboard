import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { GetUserDetail as GetUserDetailQuery } from '../../graphql/queries/GetUserDetail';
import UserDetail from '../UserDetail';
import UserCardDetail from '../../components/UserCardDetail';

it('Show user detail', async () => {
  const mocks = [
    {
      request: {
        query: GetUserDetailQuery,
        variables: {
          id: 1,
        },
      },
      result: {
        data: {
          user: {
            id: 1,
            name: 'Leanne Graham',
            email: 'Sincere@april.biz',
            username: 'Bret',
            address: {
              city: 'Gwenborough',
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
              name: 'Romaguera-Crona',
            },
          },
        },
      },
    },
  ];

  const wrapper = mount(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserDetail
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

  await new Promise((resolve) => setTimeout(resolve, 1000));
  wrapper.update();

  const card = wrapper.find(UserCardDetail);
  expect(card).toHaveLength(1);
});

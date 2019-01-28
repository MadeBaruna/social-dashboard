import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import UserCard from '../components/UserCard';
import { GetUsers } from '../graphql/queries/__generated__/GetUsers';
import { GetUsers as GetUsersQuery } from '../graphql/queries/GetUsers';

class UserList extends Component {
  public render() {
    return (
      <Grid columns={2} stackable>
        <Query<GetUsers> query={GetUsersQuery}>
          {({ loading, data, error }) => {
            if (loading) {
              return <Loader active />;
            }

            if (error || !data) {
              return <p>Something wrong happened 😕</p>;
            }

            const { users } = data;
            return users.map((user) => (
              <Grid.Column key={user.id}>
                <UserCard {...user} />
              </Grid.Column>
            ));
          }}
        </Query>
      </Grid>
    );
  }
}

export default UserList;

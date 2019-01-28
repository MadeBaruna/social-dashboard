import React, { Component } from 'react';
import { Grid, Loader, Image, Card, Icon, Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { GetUserDetail } from '../graphql/queries/__generated__/GetUserDetail';
import { GetUserDetail as GetUserDetailQuery } from '../graphql/queries/GetUserDetail';
import { match } from 'react-router';
import UserCardDetail from '../components/UserCardDetail';

interface IProps {
  match: match<{ id: string }>;
}

class UserDetail extends Component<IProps> {
  public render() {
    const { id } = this.props.match.params;

    return (
      <Grid columns={2} stackable>
        <Query<GetUserDetail>
          query={GetUserDetailQuery}
          variables={{ id: Number(id) }}
        >
          {({ loading, data, error }) => {
            if (loading) {
              return <Loader active />;
            }

            if (error || !data) {
              return <p>Something wrong happened 😕 {error}</p>;
            }

            const { user } = data;
            return <UserCardDetail {...user} />;
          }}
        </Query>
      </Grid>
    );
  }
}

export default UserDetail;

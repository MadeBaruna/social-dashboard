import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { GetUserDetail } from '../../graphql/queries/__generated__/GetUserDetail';
import { GetUserDetail as GetUserDetailQuery } from '../../graphql/queries/GetUserDetail';
import { match, Switch, Route } from 'react-router';
import UserCardDetail from '../../components/UserCardDetail';
import PostList from './PostList';

interface IProps {
  match: match<{ id: string }>;
}

class UserDetail extends Component<IProps> {
  public render() {
    const { id } = this.props.match.params;

    return (
      <>
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
        <Switch>
          <Route exact path="/user/:id" component={PostList} />
          <Route exact path="/user/:id/posts" component={PostList} />
        </Switch>
      </>
    );
  }
}

export default UserDetail;

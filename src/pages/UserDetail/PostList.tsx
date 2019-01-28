import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { GetPosts } from '../../graphql/queries/__generated__/GetPosts';
import { GetPosts as GetPostsQuery } from '../../graphql/queries/GetPosts';
import { match } from 'react-router';
import PostCard from '../../components/PostCard';
import styled from 'styled-components';

interface IProps {
  match: match<{ id: string }>;
}

const Wrapper = styled.div`
  padding-bottom: 1em;
`;

class PostList extends Component<IProps> {
  public render() {
    const { id } = this.props.match.params;

    return (
      <Wrapper>
        <Query<GetPosts>
          query={GetPostsQuery}
          variables={{ userId: Number(id) }}
        >
          {({ loading, data, error }) => {
            if (loading) {
              return <Loader active />;
            }

            if (error || !data) {
              return <p>Something wrong happened 😕</p>;
            }

            const { postsByUser } = data;
            return postsByUser.map((post) => (
              <PostCard key={post.id} {...post} />
            ));
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default PostList;

import React, { Component } from 'react';
import { Loader, Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { match } from 'react-router';
import styled from 'styled-components';
import { Location, History } from 'history';

import { GetPost as GetPostQuery } from '../graphql/queries/GetPost';
import { GetPost } from '../graphql/queries/__generated__/GetPost';
import { GetPosts_postsByUser as Post } from '../graphql/queries/__generated__/GetPosts';
import PostCard from '../components/PostCard';
import CommentCard from '../components/CommentCard';
import CommentCardEditor from '../components/CommentCardEditor';

interface IProps {
  match: match<{ id: string }>;
  location: Location<{ post?: Post }>;
  history: History;
}

const Wrapper = styled.div`
  padding-bottom: 1em;
`;

class PostDetail extends Component<IProps> {
  public render() {
    const { history, location } = this.props;
    const { state: locationState } = location;
    const { id } = this.props.match.params;

    return (
      <Wrapper>
        <Query<GetPost> query={GetPostQuery} variables={{ id: Number(id) }}>
          {({ loading, data, error }) => {
            if (loading) {
              return (
                <>
                  {locationState && locationState.post && (
                    <PostCard
                      history={history}
                      onDetailPage
                      isNew={false}
                      {...locationState.post}
                    />
                  )}
                  <Loader active />
                </>
              );
            }

            if (error || !data) {
              return <p>Post not found! 😕</p>;
            }

            const { post } = data;
            const reversedComments = [...post.comments].reverse();
            return (
              <>
                <PostCard
                  history={history}
                  onDetailPage
                  isNew={false}
                  {...post}
                />
                <Header as="h3">{reversedComments.length} Comments</Header>
                <CommentCardEditor postId={Number(id)} />
                {reversedComments.map((comment) => (
                  <CommentCard key={comment.id} {...comment} postId={Number(id)} />
                ))}
              </>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default PostDetail;

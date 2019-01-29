import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { DataProxy } from 'apollo-cache';
import { Mutation, MutationFn, FetchResult } from 'react-apollo';

import PostCardEditor from './PostCardEditor';
import { DeletePost as DeletePostMutation } from '../graphql/mutations/DeletePost';
import {
  DeletePost,
  DeletePostVariables,
  DeletePost_deletePost,
} from '../graphql/mutations/__generated__/DeletePost';
import { GetPosts as GetPostsQuery } from '../graphql/queries/GetPosts';
import {
  GetPosts,
  GetPostsVariables,
  GetPosts_postsByUser,
} from '../graphql/queries/__generated__/GetPosts';

interface IProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  isNew: boolean;
}

interface IState {
  isEditing: boolean;
}

class PostCard extends Component<IProps, IState> {
  public static defaultProps = {
    userId: -1,
    id: -1,
    title: '',
    body: '',
    isNew: false,
  };

  public state = {
    isEditing: false || this.props.isNew,
  };

  public render() {
    const { id, title, body } = this.props;
    const isEditing = this.props.isNew || this.state.isEditing;

    if (isEditing) {
      return (
        <PostCardEditor {...this.props} cancelEdit={this.setEditing(false)} />
      );
    }

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>
            {body.split('\n').map((text, key) => (
              <span key={key}>
                {text}
                <br />
              </span>
            ))}
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="right">
          <Link to={`/post/${id}`}>
            <Button>Show Comments</Button>
          </Link>
          <Button icon="pencil" onClick={this.setEditing(true)} />
          <Mutation mutation={DeletePostMutation} update={this.update}>
            {(DeletePostFunction, { loading }) => (
              <Button
                loading={loading}
                icon="trash"
                onClick={this.delete(DeletePostFunction)}
              />
            )}
          </Mutation>
        </Card.Content>
      </Card>
    );
  }

  private setEditing = (isEditing: boolean) => () => {
    this.setState({ isEditing });
  }

  private delete = (
    mutation: MutationFn<DeletePost_deletePost, DeletePostVariables>,
  ) => () => {
    const { id } = this.props;

    mutation({
      variables: {
        id,
      },
    });
  }

  private update = (
    cache: DataProxy,
    result: FetchResult<any, Record<string, any>>,
  ) => {
    const { userId } = this.props;

    const data = cache.readQuery<GetPosts, GetPostsVariables>({
      query: GetPostsQuery,
      variables: { userId },
    });

    let postsByUser: GetPosts_postsByUser[] = [];
    if (data) {
      postsByUser = data.postsByUser;
      postsByUser.reverse();

      const deletePostData = result.data as DeletePost;
      postsByUser = postsByUser.filter(
        (post) => post.id !== deletePostData.deletePost.id,
      );
    }

    cache.writeQuery({
      query: GetPostsQuery,
      variables: {
        userId,
      },
      data: { postsByUser },
    });
  }
}

export default PostCard;

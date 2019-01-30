import React, { Component } from 'react';
import { DataProxy } from 'apollo-cache';
import { MutationFn, Mutation, FetchResult } from 'react-apollo';
import { Card, Button } from 'semantic-ui-react';

import CommentCardEditor from './CommentCardEditor';
import { DeleteComment as DeleteCommentMutation } from '../graphql/mutations/DeleteComment';
import {
  DeleteComment,
  DeleteCommentVariables,
} from '../graphql/mutations/__generated__/DeleteComment';
import { GetPost as GetPostQuery } from '../graphql/queries/GetPost';
import {
  GetPost,
  GetPostVariables,
} from '../graphql/queries/__generated__/GetPost';

interface IProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface IState {
  isEditing: boolean;
  name: string;
  email: string;
  body: string;
}

class CommentCard extends Component<IProps, IState> {
  public state = {
    isEditing: false,
    name: this.props.name,
    email: this.props.email,
    body: this.props.body,
  };

  public render() {
    const { name, email, body, isEditing } = this.state;

    if (isEditing) {
      return (
        <CommentCardEditor
          {...this.props}
          updateCard={this.updateCard}
          cancelEditing={this.setEditing(false)}
        />
      );
    }

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{email}</Card.Meta>
          {body.split('\n').map((text, key) => (
            <span key={key}>
              {text}
              <br />
            </span>
          ))}
        </Card.Content>
        <Card.Content extra textAlign="right">
          <Button icon="pencil" onClick={this.setEditing(true)} />
          <Mutation mutation={DeleteCommentMutation} update={this.update}>
            {(DeleteCommentFunction, { loading }) => (
              <Button
                icon="trash"
                loading={loading}
                onClick={this.delete(DeleteCommentFunction)}
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

  private updateCard = (name: string, email: string, body: string) => {
    this.setState({ name, email, body });
  }

  private delete = (
    mutation: MutationFn<DeleteComment, DeleteCommentVariables>,
  ) => async () => {
    const { id } = this.props;

    await mutation({
      variables: {
        id,
      },
    });
  }

  private update = (
    cache: DataProxy,
    { data }: FetchResult<DeleteComment, Record<string, any>>,
  ) => {
    if (!data) {
      return;
    }

    const { postId, id } = this.props;

    let postDetail;
    try {
      postDetail = cache.readQuery<GetPost, GetPostVariables>({
        query: GetPostQuery,
        variables: { id: postId },
      });
    } catch (err) {
      return;
    }

    if (!postDetail) {
      return;
    }

    const deletedCommentId = data.deleteComment.id;
    const { post } = postDetail;

    const updatedComments = post.comments.filter(
      (comment) => comment.id !== deletedCommentId,
    );

    post.comments = updatedComments;

    cache.writeQuery({
      query: GetPostQuery,
      variables: {
        id: postId,
      },
      data: { post },
    });
  }
}

export default CommentCard;

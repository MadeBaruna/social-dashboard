import React, { Component, SyntheticEvent } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  TextArea,
  InputOnChangeData,
  TextAreaProps,
} from 'semantic-ui-react';
import { DataProxy } from 'apollo-cache';
import { MutationFn, FetchResult, Mutation } from 'react-apollo';

import { GetPost as GetPostQuery } from '../graphql/queries/GetPost';
import { CreateComment as CreateCommentMutation } from '../graphql/mutations/CreateComment';
import { UpdateComment as UpdateCommentMutation } from '../graphql/mutations/UpdateComment';
import {
  CreateComment,
  CreateCommentVariables,
} from '../graphql/mutations/__generated__/CreateComment';
import {
  UpdateComment,
  UpdateCommentVariables,
} from '../graphql/mutations/__generated__/UpdateComment';
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
  cancelEditing?: () => void;
  updateCard?: (name: string, email: string, body: string) => void;
}

interface IState {
  name?: string;
  email?: string;
  body?: string;
}

class CommentCardEditor extends Component<IProps, IState> {
  public static defaultProps = {
    id: -1,
    name: '',
    email: '',
    body: '',
  };

  public state = {
    name: this.props.name,
    email: this.props.email,
    body: this.props.body,
  };

  public render() {
    const { id, cancelEditing } = this.props;
    const { name, email, body } = this.state;

    return (
      <Card fluid>
        <Card.Content>
          <Form>
            <Form.Field>
              <Input
                label="Name"
                placeholder="Your name"
                value={name}
                onChange={this.onInputChange('name')}
              />
            </Form.Field>
            <Form.Field>
              <Input
                label="Email"
                placeholder="Your email"
                value={email}
                onChange={this.onInputChange('email')}
              />
            </Form.Field>
            <Form.Field>
              <TextArea
                autoHeight
                placeholder="What do you think?"
                value={body}
                onInput={this.onTextAreaChange}
              />
            </Form.Field>
          </Form>
        </Card.Content>
        <Card.Content extra textAlign="right">
          <Mutation mutation={CreateCommentMutation} update={this.update}>
            {(CreateCommentFunction, { loading: loadingCreate }) => (
              <Mutation mutation={UpdateCommentMutation}>
                {(UpdateCommentFunction, { loading: loadingUpdate }) => (
                  <Button
                    loading={loadingCreate || loadingUpdate}
                    primary
                    onClick={this.submit(
                      CreateCommentFunction,
                      UpdateCommentFunction,
                    )}
                  >
                    {id === -1 ? 'Submit' : 'Save'} Comment
                  </Button>
                )}
              </Mutation>
            )}
          </Mutation>

          {cancelEditing && <Button onClick={cancelEditing}>Cancel</Button>}
        </Card.Content>
      </Card>
    );
  }

  private onInputChange = (field: 'name' | 'email') => (
    _: SyntheticEvent,
    data: InputOnChangeData,
  ) => {
    this.setState({ [field]: data.value });
  }

  private onTextAreaChange = (_: SyntheticEvent, data: TextAreaProps) => {
    this.setState({ body: data.value as string });
  }

  private submit = (
    createMutationFunction: MutationFn<CreateComment, CreateCommentVariables>,
    updateMutationFunction: MutationFn<UpdateComment, UpdateCommentVariables>,
  ) => async () => {
    const { postId, id, updateCard, cancelEditing } = this.props;
    const { name, email, body } = this.state;

    if (id === -1) {
      createMutationFunction({
        variables: {
          postId,
          name,
          email,
          body,
        },
      });
    } else {
      await updateMutationFunction({
        variables: {
          id,
          name,
          email,
          body,
        },
      });

      if (updateCard && cancelEditing) {
        updateCard(name, email, body);
        cancelEditing();
      }
    }
  }

  private update = (
    cache: DataProxy,
    { data }: FetchResult<CreateComment, Record<string, any>>,
  ) => {
    if (!data) {
      return;
    }

    const { postId } = this.props;
    const postDetail = cache.readQuery<GetPost, GetPostVariables>({
      query: GetPostQuery,
      variables: { id: postId },
    });

    if (!postDetail) {
      return;
    }

    const { comment } = data;
    const { post } = postDetail;

    const updatedComments = [...post.comments, comment];
    post.comments = updatedComments;

    cache.writeQuery({
      query: GetPostQuery,
      variables: {
        id: postId,
      },
      data: { post },
    });

    this.setState({ name: '', email: '', body: '' });
  }
}

export default CommentCardEditor;

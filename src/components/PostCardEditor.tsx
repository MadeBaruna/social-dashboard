import React, { Component, SyntheticEvent } from 'react';
import {
  Card,
  Button,
  Form,
  TextArea,
  Input,
  InputOnChangeData,
  Header,
  TextAreaProps,
} from 'semantic-ui-react';
import { Mutation, MutationFn, FetchResult } from 'react-apollo';
import { CreatePost as CreatePostMutation } from '../graphql/mutations/CreatePost';
import {
  CreatePostVariables,
  CreatePost,
} from '../graphql/mutations/__generated__/CreatePost';
import { UpdatePost as UpdatePostMutation } from '../graphql/mutations/UpdatePost';
import { GetPosts as GetPostsQuery } from '../graphql/queries/GetPosts';
import {
  GetPosts,
  GetPostsVariables,
} from '../graphql/queries/__generated__/GetPosts';
import { DataProxy } from 'apollo-cache';
import {
  UpdatePost,
  UpdatePostVariables,
} from '../graphql/mutations/__generated__/UpdatePost';

interface IProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  isNew: boolean;
  cancelEdit: () => void;
  updateCard: (title: string, body: string) => void;
}

interface IState {
  title: string;
  body: string;
}

class PostCardEditor extends Component<IProps, IState> {
  public state = {
    title: this.props.title,
    body: this.props.body,
  };

  public render() {
    const { title, body } = this.state;
    const { isNew, cancelEdit } = this.props;

    return (
      <Card fluid>
        {isNew && (
          <Card.Content>
            <Header as="h3">Create a new post</Header>
          </Card.Content>
        )}
        <Card.Content>
          <Form>
            <Form.Field>
              <Input
                label="Title"
                placeholder="Post Title"
                value={title}
                onChange={this.onInputChange}
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
          <Mutation mutation={CreatePostMutation} update={this.update}>
            {(CreatePostFunction, { loading: loadingCreate }) => (
              <Mutation mutation={UpdatePostMutation}>
                {(UpdatePostFunction, { loading: loadingUpdate }) => (
                  <Button
                    loading={loadingCreate || loadingUpdate}
                    onClick={this.submit(
                      CreatePostFunction,
                      UpdatePostFunction,
                    )}
                    primary
                  >
                    {isNew ? 'Submit' : 'Save'}
                  </Button>
                )}
              </Mutation>
            )}
          </Mutation>
          {!isNew && <Button onClick={cancelEdit}>Cancel</Button>}
        </Card.Content>
      </Card>
    );
  }

  private onInputChange = (_: SyntheticEvent, data: InputOnChangeData) => {
    this.setState({ title: data.value });
  }

  private onTextAreaChange = (_: SyntheticEvent, data: TextAreaProps) => {
    this.setState({ body: data.value as string });
  }

  private submit = (
    createMutationFunction: MutationFn<CreatePost, CreatePostVariables>,
    updateMutationFunction: MutationFn<UpdatePost, UpdatePostVariables>,
  ) => async () => {
    const { id, userId, isNew, updateCard, cancelEdit } = this.props;
    const { title, body } = this.state;

    if (isNew) {
      createMutationFunction({
        variables: {
          userId,
          title,
          body,
        },
      });
    } else {
      await updateMutationFunction({
        variables: {
          id,
          userId,
          title,
          body,
        },
      });

      updateCard(title, body);
      cancelEdit();
    }
  }

  private update = (
    cache: DataProxy,
    { data }: FetchResult<CreatePost, Record<string, any>>,
  ) => {
    if (!data) {
      return;
    }

    const { userId } = this.props;
    const postList = cache.readQuery<GetPosts, GetPostsVariables>({
      query: GetPostsQuery,
      variables: { userId },
    });

    if (!postList) {
      return;
    }

    const { post } = data;
    const { postsByUser } = postList;

    const newPoststByUser = [...postsByUser, post];

    cache.writeQuery({
      query: GetPostsQuery,
      variables: {
        userId,
      },
      data: { postsByUser: newPoststByUser },
    });

    this.setState({ title: '', body: '' });
  }
}

export default PostCardEditor;

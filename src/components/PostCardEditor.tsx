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
  FormProps,
} from 'semantic-ui-react';
import { Mutation, MutationFn } from 'react-apollo';
import { CreatePost as CreatePostMutation } from '../graphql/mutations/CreatePost';
import {
  CreatePost_post,
  CreatePostVariables,
} from '../graphql/mutations/__generated__/CreatePost';
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
  cancelEdit: () => void;
}

interface IState {
  title: string;
  body: string;
}

class PostCardEditor extends Component<IProps, IState> {
  public state = {
    isEditing: false,
    title: this.props.title,
    body: this.props.body,
  };

  public render() {
    const { title, body } = this.state;
    const { isNew, cancelEdit, userId } = this.props;

    return (
      <Card fluid>
        <Mutation
          mutation={CreatePostMutation}
          update={(cache, { data: { post } }) => {
            const data = cache.readQuery<GetPosts, GetPostsVariables>({
              query: GetPostsQuery,
              variables: { userId },
            });

            let postsByUser: GetPosts_postsByUser[] = [];
            if (data) {
              postsByUser = data.postsByUser;
            }

            postsByUser.push(post);

            cache.writeQuery({
              query: GetPostsQuery,
              variables: {
                userId,
              },
              data: { postsByUser },
            });

            this.setState({ title: '', body: '' });
          }}
        >
          {(CreatePost, { loading }) => (
            <>
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
                <Button
                  loading={loading}
                  onClick={this.submit(CreatePost)}
                  primary
                >
                  {isNew ? 'Submit' : 'Save'}
                </Button>
                {!isNew && <Button onClick={cancelEdit}>Cancel</Button>}
              </Card.Content>
            </>
          )}
        </Mutation>
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
    mutation: MutationFn<CreatePost_post, CreatePostVariables>,
  ) => () => {
    const { userId } = this.props;
    const { title, body } = this.state;

    mutation({
      variables: {
        userId,
        title,
        body,
      },
    });
  }
}

export default PostCardEditor;

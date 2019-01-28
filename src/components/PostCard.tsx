import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface IPostCardProps {
  id: number;
  title: string;
  body: string;
}

const PostCard = ({ id, title, body }: IPostCardProps) => (
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
      <Button icon="pencil" />
      <Button icon="trash" />
    </Card.Content>
  </Card>
);

export default PostCard;

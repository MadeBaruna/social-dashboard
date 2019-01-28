import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface IProps {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

const UserCard = ({ id, name, username, email, website }: IProps) => (
  <Link to={`/user/${id}`}>
    <Card fluid>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>@{username}</Card.Meta>
        <Card.Description>
          <Icon name="envelope" /> {email}
        </Card.Description>
        <Card.Description>
          <Icon name="globe" /> {website}
        </Card.Description>
      </Card.Content>
    </Card>
  </Link>
);

export default UserCard;

import React from 'react';
import { Card, Icon, Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;

  & > div:first-child {
    flex: 1;
  }
`;

interface IProps {
  id: number;
  name: string;
  email: string;
  username: string;
  address: {
    city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

const UserCardDetail = ({
  id,
  name,
  username,
  email,
  website,
  phone,
  address,
  company,
}: IProps) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>@{username}</Card.Meta>
      <Card.Description>
        <DetailWrapper>
          <div>
            <Icon name="envelope" /> {email}
            <br />
            <Icon name="globe" /> {website}
            <br />
            <Icon name="phone" /> {phone}
            <br />
            <Icon name="marker" /> {address.city}
            <br />
            <Icon name="building" /> {company.name}
            <br />
          </div>
          <div>
            <Image rounded src={`https://via.placeholder.com/150/${phone}`} />
          </div>
        </DetailWrapper>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Link to={`/user/${id}/albums`}>
        <Button floated="right" primary>
          <Icon name="images" />
          Albums
        </Button>
      </Link>
    </Card.Content>
  </Card>
);

export default UserCardDetail;
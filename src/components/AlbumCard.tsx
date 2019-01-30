import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ImageLoader from './ImageLoader';

interface IProps {
  id: number;
  title: string;
  thumbnail: string;
}

const AlbumCard = ({ id, title, thumbnail }: IProps) => (
  <Card as={Link} to={`/album/${id}`} fluid>
    <ImageLoader imageUrl={thumbnail} />
    <Card.Content>
      <Card.Description>{title}</Card.Description>
    </Card.Content>
  </Card>
);

export default AlbumCard;

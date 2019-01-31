import React from 'react';
import { Card } from 'semantic-ui-react';
import ImageLoader from './ImageLoader';

interface IProps {
  thumbnailUrl: string;
  openImage: () => void;
}

const PhotoCard = ({ openImage, thumbnailUrl }: IProps) => (
  <Card onClick={openImage} fluid>
    <ImageLoader imageUrl={thumbnailUrl} />
  </Card>
);

export default PhotoCard;

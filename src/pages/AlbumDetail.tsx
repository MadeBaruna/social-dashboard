import React, { Component } from 'react';
import {
  Header,
  Card,
  Loader,
  Modal,
  Image,
  Grid,
  Container,
} from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { match } from 'react-router';

import { GetAlbumDetail as GetAlbumDetailQuery } from '../graphql/queries/GetAlbumDetail';
import { GetAlbumDetail } from '../graphql/queries/__generated__/GetAlbumDetail';
import PhotoCard from '../components/PhotoCard';
import styled from 'styled-components';
import ImageLoader from '../components/ImageLoader';

interface IProps {
  match: match<{ id: string }>;
}

interface IState {
  isModalOpen: boolean;
  showedImageUrl: string;
  showedImageTitle: string;
}

const Wrapper = styled.div`
  padding: 1em 0;
`;

class AlbumDetail extends Component<IProps, IState> {
  public state = {
    isModalOpen: false,
    showedImageUrl: '',
    showedImageTitle: '',
  };

  public render() {
    const {
      params: { id },
    } = this.props.match;

    const { isModalOpen, showedImageUrl, showedImageTitle } = this.state;

    return (
      <Wrapper>
        <Query<GetAlbumDetail>
          query={GetAlbumDetailQuery}
          variables={{ albumId: Number(id) }}
        >
          {({ loading, data, error }) => {
            if (loading) {
              return <Loader active />;
            }

            if (error || !data) {
              return <p>Something wrong happened 😕</p>;
            }

            const { album } = data;
            return (
              <>
                <Header as="h2">{album.title}</Header>
                <Card.Group stackable itemsPerRow={3}>
                  {album.photos.map((photo) => (
                    <PhotoCard
                      openImage={this.showImage(photo.url, photo.title)}
                      key={photo.id}
                      {...photo}
                    />
                  ))}
                </Card.Group>
              </>
            );
          }}
        </Query>
        <Modal basic size="large" open={isModalOpen} onClose={this.handleClose}>
          <Grid centered>
            <Grid.Column textAlign="center">
              <Image wrapped src={showedImageUrl} />
              <p>{showedImageTitle}</p>
            </Grid.Column>
          </Grid>
        </Modal>
      </Wrapper>
    );
  }

  private handleClose = () => this.setState({ isModalOpen: false });

  private showImage = (
    showedImageUrl: string,
    showedImageTitle: string,
  ) => () => {
    this.setState({ isModalOpen: true, showedImageUrl, showedImageTitle });
  }
}

export default AlbumDetail;

import React, { Component } from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { match } from 'react-router';

import { GetAlbums as GetAlbumsQuery } from '../../graphql/queries/GetAlbums';
import { GetAlbums } from '../../graphql/queries/__generated__/GetAlbums';
import AlbumCard from '../../components/AlbumCard';
import styled from 'styled-components';

interface IProps {
  match: match<{ id: string }>;
}

const Wrapper = styled.div`
  padding: 1em 0;
`;

class AlbumList extends Component<IProps> {
  public render() {
    const {
      params: { id },
    } = this.props.match;

    return (
      <Wrapper>
        <Card.Group stackable itemsPerRow={3}>
          <Query<GetAlbums>
            query={GetAlbumsQuery}
            variables={{ userId: Number(id) }}
          >
            {({ loading, data, error }) => {
              if (loading) {
                return <Loader active />;
              }

              if (error || !data) {
                return <p>Something wrong happened 😕</p>;
              }

              const { albums } = data;
              return albums.map((album) => (
                <AlbumCard key={album.id} {...album} />
              ));
            }}
          </Query>
        </Card.Group>
      </Wrapper>
    );
  }
}

export default AlbumList;

import React, { Component } from 'react';
import { Placeholder } from 'semantic-ui-react';
import styled from 'styled-components';

interface IProps {
  imageUrl: string;
}

interface IState {
  loading: boolean;
}

const Image = styled.img`
  display: block;

  &.hidden {
    display: none !important;
  }
`;

class ImageLoader extends Component<IProps, IState> {
  public state = {
    loading: true,
  };

  public render() {
    const { imageUrl } = this.props;
    const { loading } = this.state;

    return (
      <>
        {loading && (
          <Placeholder fluid>
            <Placeholder.Image square />
          </Placeholder>
        )}
        <Image
          className={`ui rounded fluid image ${loading ? 'hidden' : ''}`}
          src={imageUrl}
          onLoad={this.finishLoading}
        />
      </>
    );
  }

  private finishLoading = () => {
    this.setState({ loading: false });
  }
}

export default ImageLoader;

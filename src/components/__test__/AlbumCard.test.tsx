import React from 'react';
import { shallow } from 'enzyme';
import AlbumCard from '../AlbumCard';

it('renders AlbumCard components', () => {
  const wrapper = shallow(<AlbumCard id={1} thumbnail="http://localhost/img.jpg" title="Title" />);
  expect(wrapper).toMatchSnapshot();
});

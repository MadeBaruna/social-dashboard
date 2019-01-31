import React from 'react';
import { shallow } from 'enzyme';
import PhotoCard from '../PhotoCard';

it('renders PhotoCard components', () => {
  const wrapper = shallow(
    <PhotoCard thumbnailUrl="http://localhost/img.jpg" openImage={jest.fn()} />,
  );
  expect(wrapper).toMatchSnapshot();
});

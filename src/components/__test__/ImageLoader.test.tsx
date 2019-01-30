import React from 'react';
import { mount } from 'enzyme';
import ImageLoader from '../ImageLoader';
import { Placeholder } from 'semantic-ui-react';

it('load image and hide placeholder', async () => {
  const wrapper = mount(<ImageLoader imageUrl="http://localhost/img.jpg" />);

  expect(wrapper.find(Placeholder)).toHaveLength(1);

  const image = wrapper.find('img');
  expect(image.hasClass('hidden')).toBe(true);

  image.simulate('load');
  wrapper.update();

  expect(wrapper.find(Placeholder)).toHaveLength(0);
});

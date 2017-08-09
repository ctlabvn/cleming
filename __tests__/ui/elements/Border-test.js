import 'react-native';
import React from 'react';
import Border from '../../../ui/elements/Border';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <Border color='rgba(0,0,0,0.5)' size={1} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
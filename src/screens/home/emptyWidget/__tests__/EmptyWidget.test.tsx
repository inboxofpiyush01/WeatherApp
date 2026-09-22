import React from 'react';
import {render} from '@testing-library/react-native';
import EmptyWidget from '../index';

jest.mock('../styles', () => ({
  styles: () => ({
    imgContainer: {},
    emptyImg: {},
    searchCityText: {},
  }),
}));

describe('EmptyWidget Component', () => {
  const colors = {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
  };

  test('renders with the provided text', () => {
    const bottomText = 'Search for a city';
    const {getByText} = render(
      <EmptyWidget colors={colors} bottomText={bottomText} />,
    );

    expect(getByText(bottomText)).toBeTruthy();
  });

  test('renders with empty text when no bottomText provided', () => {
    const {getByText} = render(<EmptyWidget colors={colors} />);

    expect(getByText('')).toBeTruthy();
  });
});

import React from 'react';
import {render} from '@testing-library/react-native';

import LocationDisplay from '../index';

describe('LocationDisplay Component', () => {
  // Mock colors object for testing
  const mockColors = {
    background: '#FFFFFF',
    text: '#000000',
    temperatureColor: '#3b68c7',
    cardBackground: 'rgba(240, 240, 240, 0.7)',
    statusBarColor: '#FFFFFF',
    placeholderText: '#999999',
  };

  it('renders the city name correctly', () => {
    const {getByText} = render(
      <LocationDisplay city="London" colors={mockColors} />,
    );

    expect(getByText('London')).toBeTruthy();
  });

  it('renders "Today" text', () => {
    const {getByText} = render(
      <LocationDisplay city="New York" colors={mockColors} />,
    );

    expect(getByText('Today')).toBeTruthy();
  });

  it('handles empty city name', () => {
    const {getByText} = render(<LocationDisplay city="" colors={mockColors} />);

    expect(getByText('Today')).toBeTruthy();
  });

  it('applies styles to elements', () => {
    const {getByText} = render(
      <LocationDisplay city="London" colors={mockColors} />,
    );

    const cityNameElement = getByText('London');
    const todayLabelElement = getByText('Today');

    // Simply verify that styles exist without testing specific values
    expect(cityNameElement.props.style).toBeTruthy();
    expect(todayLabelElement.props.style).toBeTruthy();
  });
});

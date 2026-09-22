import React from 'react';
import {render} from '@testing-library/react-native';

import CurrentWeather from '../index';

// Mock the WeatherIcon component properly
jest.mock('../../../../components/icon', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: any) => {
      return React.createElement(
        'View',
        {
          testID: 'weather-icon',
          'data-type': props.type, // Store the type as a data attribute
          'data-size': props.size,
        },
        null,
      );
    },
  };
});

// Mock colors object
const mockColors = {
  primary: '#ffffff',
  secondary: '#000000',
  background: '#f0f0f0',
};

describe('CurrentWeather Component', () => {
  // Rest of the test code remains the same...

  // Update how you check the icon type
  it('maps weather conditions to correct icons', () => {
    const {getByTestId} = render(
      <CurrentWeather
        temperature={25}
        condition="Sunny"
        minTemp={20}
        maxTemp={30}
        colors={mockColors}
      />,
    );

    const icon = getByTestId('weather-icon');
    expect(icon.props['data-type']).toBe('sunny');
  });

  // Update this test too
  it('maps different weather conditions to correct icons', () => {
    const testCases = [
      {condition: 'Sunny', expectedIcon: 'sunny'},
      {condition: 'Clear', expectedIcon: 'sunny'},
      // ... other test cases ...
    ];

    testCases.forEach(({condition, expectedIcon}) => {
      const {getByTestId, unmount} = render(
        <CurrentWeather
          temperature={25}
          condition={condition}
          minTemp={20}
          maxTemp={30}
          colors={mockColors}
        />,
      );

      const icon = getByTestId('weather-icon');
      expect(icon.props['data-type']).toBe(expectedIcon);

      // Clean up after each test case
      unmount();
    });
  });
});

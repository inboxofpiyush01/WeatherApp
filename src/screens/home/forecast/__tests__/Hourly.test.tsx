import React from 'react';
import {render} from '@testing-library/react-native';

import HourlyForecast from '../hourly';

// Mock the WeatherIcon component
jest.mock('../../../../components/icon', () => {
  return function MockWeatherIcon({type, size}: any) {
    const React = require('react');
    return React.createElement('View', {testID: `weather-icon-${type}`});
  };
});

describe('HourlyForecast Component', () => {
  // Mock colors object for testing
  const mockColors = {
    background: '#FFFFFF',
    text: '#000000',
    temperatureColor: '#3b68c7',
    cardBackground: 'rgba(240, 240, 240, 0.7)',
    statusBarColor: '#FFFFFF',
    placeholderText: '#999999',
  };

  // Mock hourly data for testing
  const mockHourlyData = [
    {time: 'Now', temp: 25, icon: 'sunny', wind: 15, precipitation: 0},
    {
      time: '12 PM',
      temp: 27,
      icon: 'partly-cloudy',
      wind: 12,
      precipitation: 10,
    },
    {time: '3 PM', temp: 26, icon: 'cloudy', wind: 18, precipitation: 30},
  ];

  it('renders the section title correctly', () => {
    const {getByText} = render(
      <HourlyForecast hourlyData={mockHourlyData} colors={mockColors} />,
    );

    expect(getByText('Forecast for today')).toBeTruthy();
  });

  it('renders empty state when no hourly data is provided', () => {
    const {getByText, queryAllByTestId} = render(
      <HourlyForecast hourlyData={[]} colors={mockColors} />,
    );

    // Title should still be present
    expect(getByText('Forecast for today')).toBeTruthy();

    // No weather icons should be rendered
    const icons = queryAllByTestId(/weather-icon-/);
    expect(icons.length).toBe(0);
  });

  it('renders hourly items correctly', () => {
    const {getByText} = render(
      <HourlyForecast hourlyData={mockHourlyData} colors={mockColors} />,
    );

    // Check for each time
    expect(getByText('Now')).toBeTruthy();
    expect(getByText('12 PM')).toBeTruthy();
    expect(getByText('3 PM')).toBeTruthy();

    // Check for temperatures
    expect(getByText('25°')).toBeTruthy();
    expect(getByText('27°')).toBeTruthy();
    expect(getByText('26°')).toBeTruthy();

    // Check for wind speeds
    expect(getByText('15 km/h')).toBeTruthy();
    expect(getByText('12 km/h')).toBeTruthy();
    expect(getByText('18 km/h')).toBeTruthy();

    // Check for precipitation percentages
    expect(getByText('0%')).toBeTruthy();
    expect(getByText('10%')).toBeTruthy();
    expect(getByText('30%')).toBeTruthy();
  });

  it('renders the correct number of hourly items', () => {
    const {queryAllByText} = render(
      <HourlyForecast hourlyData={mockHourlyData} colors={mockColors} />,
    );

    // Count the number of items by looking for a pattern that appears in each item
    const kmhTexts = queryAllByText(/ km\/h/);
    expect(kmhTexts.length).toBe(mockHourlyData.length);
  });

  it('applies styles to elements', () => {
    const {getByText} = render(
      <HourlyForecast hourlyData={mockHourlyData} colors={mockColors} />,
    );

    const titleElement = getByText('Forecast for today');

    // Simply verify that styles exist
    expect(titleElement.props.style).toBeTruthy();
  });

  it('handles different weather icons', () => {
    const {queryByTestId} = render(
      <HourlyForecast hourlyData={mockHourlyData} colors={mockColors} />,
    );

    // Check for each icon type
    expect(queryByTestId('weather-icon-sunny')).toBeTruthy();
    expect(queryByTestId('weather-icon-partly-cloudy')).toBeTruthy();
    expect(queryByTestId('weather-icon-cloudy')).toBeTruthy();
  });
});

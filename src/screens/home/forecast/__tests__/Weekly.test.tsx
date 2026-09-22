import React from 'react';
import {render} from '@testing-library/react-native';

import WeeklyForecast from '../weekly';

// Mock the WeatherIcon component properly
jest.mock('../../../../components/icon', () => {
  return {
    __esModule: true,
    default: function MockWeatherIcon({type, size}: any) {
      const React = require('react'); // Import React inside the mock function
      return React.createElement('View', {testID: `weather-icon-${type}`});
    },
  };
});

describe('WeeklyForecast Component', () => {
  // Mock colors object for testing
  const mockColors = {
    background: '#FFFFFF',
    text: '#000000',
    temperatureColor: '#3b68c7',
    cardBackground: 'rgba(240, 240, 240, 0.7)',
    statusBarColor: '#FFFFFF',
    placeholderText: '#999999',
  };

  // Mock daily forecast data for testing
  const mockDailyData = [
    {day: 'Today', icon: 'sunny', minTemp: 20, maxTemp: 28},
    {day: 'Mon', icon: 'partly-cloudy', minTemp: 18, maxTemp: 26},
    {day: 'Tue', icon: 'cloudy', minTemp: 17, maxTemp: 25},
    {day: 'Wed', icon: 'light-rain', minTemp: 16, maxTemp: 23},
    {day: 'Thu', icon: 'heavy-rain', minTemp: 15, maxTemp: 22},
    {day: 'Fri', icon: 'thunderstorm', minTemp: 14, maxTemp: 21},
    {day: 'Sat', icon: 'snow', minTemp: 10, maxTemp: 18},
  ];

  it('renders the section title correctly', () => {
    const {getByText} = render(
      <WeeklyForecast dailyData={mockDailyData} colors={mockColors} />,
    );

    expect(getByText('7-day forecast')).toBeTruthy();
  });

  it('renders empty state when no daily data is provided', () => {
    const {getByText, queryAllByTestId} = render(
      <WeeklyForecast dailyData={[]} colors={mockColors} />,
    );

    // Title should still be present
    expect(getByText('7-day forecast')).toBeTruthy();

    // No weather icons should be rendered
    const icons = queryAllByTestId(/weather-icon-/);
    expect(icons.length).toBe(0);
  });

  it('renders daily forecast items correctly', () => {
    const {getByText, getAllByText} = render(
      <WeeklyForecast dailyData={mockDailyData} colors={mockColors} />,
    );

    // Check for each day
    mockDailyData.forEach(day => {
      // Day names should be unique
      expect(getByText(day.day)).toBeTruthy();

      // For temperatures, which might have duplicates, check they exist
      // but don't worry about the exact count
      const minTempElements = getAllByText(`${day.minTemp}°C`);
      const maxTempElements = getAllByText(`${day.maxTemp}°C`);

      expect(minTempElements.length).toBeGreaterThan(0);
      expect(maxTempElements.length).toBeGreaterThan(0);
    });
  });

  it('renders the correct number of daily items', () => {
    const {queryAllByText} = render(
      <WeeklyForecast dailyData={mockDailyData} colors={mockColors} />,
    );

    // Count the number of items by looking for the min temperature pattern
    const minTempTexts = queryAllByText(/\d+°C/);
    expect(minTempTexts.length).toBe(mockDailyData.length * 2); // 2 temp elements per day (min & max)
  });

  it('applies styles to elements', () => {
    const {getByText} = render(
      <WeeklyForecast dailyData={mockDailyData} colors={mockColors} />,
    );

    const titleElement = getByText('7-day forecast');

    // Simply verify that styles exist
    expect(titleElement.props.style).toBeTruthy();
  });

  it('renders different weather icons for each day', () => {
    const {queryByTestId} = render(
      <WeeklyForecast dailyData={mockDailyData} colors={mockColors} />,
    );

    // Check for each icon type
    expect(queryByTestId('weather-icon-sunny')).toBeTruthy();
    expect(queryByTestId('weather-icon-partly-cloudy')).toBeTruthy();
    expect(queryByTestId('weather-icon-cloudy')).toBeTruthy();
    expect(queryByTestId('weather-icon-light-rain')).toBeTruthy();
    expect(queryByTestId('weather-icon-heavy-rain')).toBeTruthy();
    expect(queryByTestId('weather-icon-thunderstorm')).toBeTruthy();
    expect(queryByTestId('weather-icon-snow')).toBeTruthy();
  });

  it('applies special style to the last day row', () => {
    const {getAllByTestId} = render(
      <WeeklyForecast dailyData={mockDailyData} colors={mockColors} />,
    );
  });
});

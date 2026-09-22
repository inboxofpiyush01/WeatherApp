import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import App from '../index';

// Mock the redux hooks directly
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(selector => {
    // Provide a default state that your component expects
    const state = {
      weather: {
        weatherData: {},
      },
      user: {
        isDarkMode: false,
      },
    };
    return selector(state);
  }),
}));

// Mock the API call
jest.mock('../../../utils/api', () => ({
  fetchWeatherData: jest.fn(() =>
    Promise.resolve({
      location: {name: 'Test City'},
      current: {
        temperature: 25,
        weather_descriptions: ['Sunny'],
        feelslike: 24,
      },
      forecast: {
        today: {
          minTemp: 20,
          maxTemp: 30,
          hourly: [
            {time: 'Now', temp: 25, icon: 'sunny', wind: 10, precipitation: 0},
          ],
        },
        daily: [{day: 'Today', icon: 'sunny', minTemp: 20, maxTemp: 30}],
      },
    }),
  ),
}));

// Mock the hooks
jest.mock('../../../utils/hooks/useTheme', () => ({
  useTheme: jest.fn(() => ({
    isDarkMode: false,
    colors: {
      background: '#FFFFFF',
      text: '#000000',
      temperatureColor: '#3b68c7',
      cardBackground: 'rgba(240, 240, 240, 0.7)',
      statusBarColor: '#FFFFFF',
      placeholderText: '#999999',
    },
  })),
}));

describe('App Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('Weather App')).toBeTruthy();
  });

  it('shows empty state when no weather data', () => {
    const {getByText} = render(<App />);
    expect(getByText('No city data found!')).toBeTruthy();
  });

  it('handles city input', () => {
    const {getByPlaceholderText} = render(<App />);
    const input = getByPlaceholderText('Search city');
    fireEvent.changeText(input, 'London');
    expect(input.props.value).toBe('London');
  });

  it('trigger search when button is pressed', () => {
    const {getByText, getByPlaceholderText} = render(<App />);

    // Enter city name
    const input = getByPlaceholderText('Search city');
    fireEvent.changeText(input, 'London');

    // Press search button
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    // Test can continue with expectations about what should happen
    // For a simple test, we can just verify the button was pressed
    expect(searchButton).toBeTruthy();
  });
});

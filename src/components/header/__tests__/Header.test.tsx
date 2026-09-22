import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {View} from 'react-native';

import Header from '../index';

jest.mock('../styles', () => ({
  styles: () => ({
    container: {},
    title: {},
  }),
}));

describe('Header Component', () => {
  // Basic props for all tests
  const basicProps = {
    isDarkMode: false,
    title: 'Test Title',
    toggleSwitch: jest.fn(),
    colors: {
      primary: '#1e90ff',
      text: '#333333',
      background: '#ffffff',
      switchTrack: '#ffffff',
      switchThumb: '#cccccc',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct title', () => {
    const {getByText} = render(<Header {...basicProps} />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  test('renders switch with correct value', () => {
    const {getByRole} = render(<Header {...basicProps} />);
    const switchElement = getByRole('switch');
    expect(switchElement.props.value).toBe(false);
  });

  test('calls toggleSwitch when switch is toggled', () => {
    const {getByRole} = render(<Header {...basicProps} />);
    const switchElement = getByRole('switch');

    // Simulate toggle
    fireEvent(switchElement, 'valueChange', true);

    // Check if the toggle function was called
    expect(basicProps.toggleSwitch).toHaveBeenCalledTimes(1);
  });

  test('renders with dark mode enabled', () => {
    const darkModeProps = {
      ...basicProps,
      isDarkMode: true,
    };

    const {getByRole} = render(<Header {...darkModeProps} />);
    const switchElement = getByRole('switch');
    expect(switchElement.props.value).toBe(true);
  });

  test('renders LeftIcon when provided', () => {
    // Create a mock component with testID
    const LeftIcon = () => <View testID="left-icon" />;

    const propsWithIcon = {
      ...basicProps,
      LeftIcon,
    };

    const {getByTestId} = render(<Header {...propsWithIcon} />);
    expect(getByTestId('left-icon')).toBeTruthy();
  });

  test('does not render LeftIcon when not provided', () => {
    const {queryByTestId} = render(<Header {...basicProps} />);
    expect(queryByTestId('left-icon')).toBeNull();
  });

  test('applies theme styles from colors prop', () => {
    const {getByText} = render(<Header {...basicProps} />);
    const titleElement = getByText('Test Title');

    expect(titleElement.props.style).toBeDefined();
  });
});

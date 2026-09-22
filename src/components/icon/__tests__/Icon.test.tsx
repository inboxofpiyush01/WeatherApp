import React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';

import WeatherIcon from '../index';

describe('WeatherIcon Component', () => {
  it('renders the correct icon for sunny type', () => {
    const {getByText} = render(<WeatherIcon type="sunny" />);
    expect(getByText('☀️')).toBeTruthy();
  });

  it('renders the correct icon for clear type', () => {
    const {getByText} = render(<WeatherIcon type="clear" />);
    expect(getByText('☀️')).toBeTruthy();
  });

  it('renders the correct icon for partly-cloudy type', () => {
    const {getByText} = render(<WeatherIcon type="partly-cloudy" />);
    expect(getByText('🌤️')).toBeTruthy();
  });

  it('renders the correct icon for cloudy type', () => {
    const {getByText} = render(<WeatherIcon type="cloudy" />);
    expect(getByText('☁️')).toBeTruthy();
  });

  it('renders the correct icon for fog type', () => {
    const {getByText} = render(<WeatherIcon type="fog" />);
    expect(getByText('🌫️')).toBeTruthy();
  });

  it('renders the correct icon for light-rain type', () => {
    const {getByText} = render(<WeatherIcon type="light-rain" />);
    expect(getByText('🌦️')).toBeTruthy();
  });

  it('renders the correct icon for heavy-rain type', () => {
    const {getByText} = render(<WeatherIcon type="heavy-rain" />);
    expect(getByText('🌧️')).toBeTruthy();
  });

  it('renders the correct icon for snow type', () => {
    const {getByText} = render(<WeatherIcon type="snow" />);
    expect(getByText('❄️')).toBeTruthy();
  });

  it('renders the correct icon for snow-storm type', () => {
    const {getByText} = render(<WeatherIcon type="snow-storm" />);
    expect(getByText('🌨️')).toBeTruthy();
  });

  it('renders the correct icon for thunderstorm type', () => {
    const {getByText} = render(<WeatherIcon type="thunderstorm" />);
    expect(getByText('⛈️')).toBeTruthy();
  });

  it('renders default icon for unknown type', () => {
    const {getByText} = render(<WeatherIcon type="unknown-type" />);
    expect(getByText('☀️')).toBeTruthy();
  });

  it('applies the default size', () => {
    const {getByText} = render(<WeatherIcon type="sunny" />);
    const iconElement = getByText('☀️');
    expect(iconElement.props.style).toContainEqual(
      expect.objectContaining({fontSize: 24}),
    );
  });

  it('applies custom size when provided', () => {
    const customSize = 48;
    const {getByText} = render(<WeatherIcon type="sunny" size={customSize} />);
    const iconElement = getByText('☀️');
    expect(iconElement.props.style).toContainEqual(
      expect.objectContaining({fontSize: customSize}),
    );
  });

  it('renders inside a container View', () => {
    const {UNSAFE_getByType} = render(<WeatherIcon type="sunny" />);
    const containerView = UNSAFE_getByType(View);
    expect(containerView).toBeTruthy();
  });
});

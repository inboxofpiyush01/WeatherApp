import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

type WeatherIconProps = {
  type: string;
  size?: number;
};

const WeatherIcon: React.FC<WeatherIconProps> = ({type, size = 24}) => {
  // Helper function to render the weather icon based on the type
  const getWeatherIcon = (iconType: string) => {
    // Using emoji characters similar to the screenshot
    switch (iconType) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'partly-cloudy':
        return '🌤️';
      case 'cloudy':
        return '☁️';
      case 'fog':
        return '🌫️';
      case 'light-rain':
        return '🌦️';
      case 'heavy-rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'snow-storm':
        return '🌨️';
      case 'thunderstorm':
        return '⛈️';
      default:
        return '☀️';
    }
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, {fontSize: size}]}>
        {getWeatherIcon(type)}
      </Text>
    </View>
  );
};

export default WeatherIcon;

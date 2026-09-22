import React from 'react';
import {View, Text} from 'react-native';

import WeatherIcon from '../../../components/icon';

import {styles} from './styles';

type CurrentWeatherProps = {
  temperature: number;
  condition: string;
  minTemp: number;
  maxTemp: number;
  colors: Record<string, string>;
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  condition,
  minTemp,
  maxTemp,
  colors,
}) => {
  const themedStyles = styles(colors);

  // Map condition text to icon type
  const mapConditionToIcon = (conditionText: string): string => {
    const lowerCondition = conditionText.toLowerCase();

    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
      return 'sunny';
    } else if (lowerCondition.includes('partly cloudy')) {
      return 'partly-cloudy';
    } else if (
      lowerCondition.includes('cloudy') ||
      lowerCondition.includes('overcast')
    ) {
      return 'cloudy';
    } else if (
      lowerCondition.includes('mist') ||
      lowerCondition.includes('fog')
    ) {
      return 'fog';
    } else if (
      lowerCondition.includes('light rain') ||
      lowerCondition.includes('drizzle')
    ) {
      return 'light-rain';
    } else if (
      lowerCondition.includes('rain') ||
      lowerCondition.includes('shower')
    ) {
      return 'heavy-rain';
    } else if (
      lowerCondition.includes('snow') &&
      lowerCondition.includes('heavy')
    ) {
      return 'snow-storm';
    } else if (lowerCondition.includes('snow')) {
      return 'snow';
    } else if (
      lowerCondition.includes('thunder') ||
      lowerCondition.includes('storm')
    ) {
      return 'thunderstorm';
    } else {
      return 'partly-cloudy'; // Default
    }
  };

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.temperature}>{temperature}°C</Text>
      <View style={themedStyles.conditionContainer}>
        <WeatherIcon type={mapConditionToIcon(condition)} size={30} />
        <Text style={themedStyles.condition}>{condition}</Text>
      </View>
      <View style={themedStyles.separator} />
      <Text style={themedStyles.minMaxTemp}>
        {minTemp}°C/{maxTemp}°C
      </Text>
    </View>
  );
};

export default CurrentWeather;

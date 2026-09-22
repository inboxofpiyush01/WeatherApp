import React from 'react';
import {View, Text} from 'react-native';

import WeatherIcon from '../../../../components/icon';

import {DailyForecast} from '../../../../utils/types/weathers';
import {styles} from './styles';

type WeeklyForecastProps = {
  dailyData: DailyForecast[];
  colors: Record<string, string>;
};

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({dailyData, colors}) => {
  const themedStyles = styles(colors);
  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>7-day forecast</Text>
      <View style={themedStyles.forecastContainer}>
        {dailyData.map((day, index) => (
          <View
            key={index}
            style={[
              themedStyles.dayRow,
              index === dailyData.length - 1 ? themedStyles.lastDayRow : null,
            ]}>
            <Text style={themedStyles.dayText}>{day.day}</Text>
            <View style={themedStyles.iconContainer}>
              <WeatherIcon type={day.icon} size={24} />
            </View>
            <View style={themedStyles.temperatureContainer}>
              <Text style={themedStyles.minTempText}>{day.minTemp}°C</Text>
              <Text style={themedStyles.maxTempText}>{day.maxTemp}°C</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeeklyForecast;

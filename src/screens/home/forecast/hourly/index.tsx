import React from 'react';
import {View, Text, FlatList} from 'react-native';

import WeatherIcon from '../../../../components/icon';

import {HourlyForecast as HourlyForecastType} from '../../../../utils/types/weathers';
import {styles} from './styles';

type HourlyForecastProps = {
  hourlyData: HourlyForecastType[];
  colors: Record<string, string>;
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourlyData,
  colors,
}) => {
  const themedStyles = styles(colors);

  const renderItem = ({item}: {item: HourlyForecastType}) => {
    return (
      <View style={themedStyles.hourItem}>
        <Text style={themedStyles.timeText}>{item.time}</Text>
        <WeatherIcon type={item.icon} size={32} />
        <Text style={themedStyles.tempText}>{item.temp}°</Text>
        <View style={themedStyles.windContainer}>
          <Text style={themedStyles.windIcon}>💨</Text>
          <Text style={themedStyles.windText}>{item.wind} km/h</Text>
        </View>
        <View style={themedStyles.precipitationContainer}>
          <Text style={themedStyles.umbrellaIcon}>☔️</Text>
          <Text style={themedStyles.precipitationText}>
            {item.precipitation}%
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Forecast for today</Text>
      <FlatList
        contentContainerStyle={themedStyles.forecastContainer}
        data={hourlyData}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
};

export default HourlyForecast;

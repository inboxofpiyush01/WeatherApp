import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

type LocationDisplayProps = {
  city: string;
  colors: Record<string, string>;
};

const LocationDisplay: React.FC<LocationDisplayProps> = ({city, colors}) => {
  const themedStyles = styles(colors);
  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.cityName}>{city}</Text>
      <Text style={themedStyles.dayLabel}>Today</Text>
    </View>
  );
};

export default LocationDisplay;

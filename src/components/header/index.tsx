import React from 'react';
import {View, Text, Switch} from 'react-native';

import {styles} from './styles';

type THeader = {
  LeftIcon?: React.ComponentType<{}>;
  isDarkMode: boolean;
  title: string;
  toggleSwitch: () => void; //giving control outside so that there could be more we can do on toggle
  colors: Record<string, string>;
};

const Header = ({
  LeftIcon,
  isDarkMode,
  toggleSwitch,
  title,
  colors,
}: THeader) => {
  const themedStyles = styles(colors);

  return (
    <View style={themedStyles.container}>
      <View>{!!LeftIcon && <LeftIcon />}</View>
      <Text style={themedStyles.title}>{title}</Text>
      <Switch
        thumbColor={colors.switchTrack}
        ios_backgroundColor={colors.switchThumb}
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
    </View>
  );
};

export default Header;

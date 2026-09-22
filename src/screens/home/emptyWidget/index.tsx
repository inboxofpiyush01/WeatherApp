import {Image, Text, View} from 'react-native';

import {styles} from './styles';

type TEmptyWidget = {
  bottomText?: string;
  colors: Record<string, string>;
};

const EmptyWidget = ({colors, bottomText = ''}: TEmptyWidget) => {
  const themedStyles = styles(colors);

  return (
    <View style={themedStyles.imgContainer}>
      <Image
        source={require('../../../assets/home/emptyState.png')}
        style={themedStyles.emptyImg}
      />
      <Text style={themedStyles.searchCityText}>{bottomText}</Text>
    </View>
  );
};

export default EmptyWidget;

import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const createThemedStyles = <T extends NamedStyles<T>>(
  styleCreator: (colors: Record<string, string>) => T,
) => {
  return (colors: Record<string, string>): T => {
    return StyleSheet.create(styleCreator(colors));
  };
};

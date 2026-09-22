import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export type ThemeState = {
  isDarkMode: boolean;
  colors: Record<string, string>;
};

export const useTheme = (): ThemeState => {
  return useSelector((state: RootState) => state.user);
};

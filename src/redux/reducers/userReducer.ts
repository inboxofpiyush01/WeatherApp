import {LIGHT_THEME, DARK_THEME} from '../../utils/theme/color';
import TYPES from '../types';

const initialState = {
  isDarkMode: false,
  colors: {
    ...LIGHT_THEME,
  },
};

type TUserReducer = {
  isDarkMode: boolean;
  colors: Record<string, string>;
};

type TUserAction = {
  type: string;
  payload?: any;
};

const UserReducer = (
  state: TUserReducer = initialState,
  action: TUserAction,
): TUserReducer => {
  switch (action.type) {
    case TYPES.UPDATE_THEME:
      const isDarkMode = !state.isDarkMode;
      return {
        ...state,
        isDarkMode: isDarkMode,
        colors: isDarkMode ? DARK_THEME : LIGHT_THEME,
      };

    default:
      return state;
  }
};

export default UserReducer;

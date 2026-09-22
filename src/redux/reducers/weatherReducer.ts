import {WeatherData} from '../../utils/types/weathers';
import TYPES from '../types';

const initialState = {
  weatherData: {},
};

type TWeatherState = {
  weatherData: WeatherData | {};
};

type TWeatherAction = {
  type: string;
  payload?: any;
};

const WeatherReducer = (
  state: TWeatherState = initialState,
  action: TWeatherAction,
): TWeatherState => {
  switch (action.type) {
    case TYPES.SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: action.payload,
      };

    case TYPES.RESET_WEATHER_DATA:
      return {
        ...state,
        weatherData: {},
      };
    default:
      return state;
  }
};

export default WeatherReducer;

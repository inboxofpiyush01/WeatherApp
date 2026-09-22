import TYPES from '../types';

export const setWeatherData = (data: any) => {
  return {
    type: TYPES.SET_WEATHER_DATA,
    payload: data,
  };
};

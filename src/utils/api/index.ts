import axios from 'axios';
import Config from 'react-native-config';

import {
  WeatherData,
  HourlyForecast,
  DailyForecast,
} from '../../utils/types/weathers';

const API_KEY = Config.WEATHER_API_KEY; // Replace with your actual API key
const BASE_URL = 'https://api.weatherapi.com/v1';

// Function to fetch current weather data
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`,
    );

    const data = response.data;

    // Transform the WeatherAPI.com response to match our app's data structure
    const currentHour = new Date().getHours();

    // Get all hourly forecasts for the next 12 hours
    const hourlyForecasts: HourlyForecast[] = [];

    // First, add the current hour as "Now"
    const currentHourData = data.forecast.forecastday[0].hour.find(
      (h: any) => new Date(h.time).getHours() === currentHour,
    );

    if (currentHourData) {
      hourlyForecasts.push({
        time: 'Now',
        temp: currentHourData.temp_c,
        icon: mapWeatherCodeToIcon(currentHourData.condition.code),
        wind: currentHourData.wind_kph,
        precipitation: currentHourData.chance_of_rain,
      });
    }

    // Then add the next hours
    let hoursAdded = 0;
    let dayIndex = 0;
    let hourIndex = currentHour + 1;

    // Loop until we have 12 hours of forecast or run out of data
    while (hoursAdded < 11 && dayIndex < data.forecast.forecastday.length) {
      // If we've reached the end of the day, move to the next day
      if (hourIndex >= 24) {
        dayIndex++;
        hourIndex = 0;
        // If we've run out of forecast days, break
        if (dayIndex >= data.forecast.forecastday.length) break;
      }

      const hourData = data.forecast.forecastday[dayIndex].hour[hourIndex];

      hourlyForecasts.push({
        time: new Date(hourData.time).getHours() + ':00',
        temp: hourData.temp_c,
        icon: mapWeatherCodeToIcon(hourData.condition.code),
        wind: hourData.wind_kph,
        precipitation: hourData.chance_of_rain,
      });

      hourIndex++;
      hoursAdded++;
    }

    // Transform forecast data for daily view
    const dailyForecasts: DailyForecast[] = data.forecast.forecastday.map(
      (day: any, index: number) => {
        return {
          day:
            index === 0
              ? 'Today'
              : new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                }),
          icon: mapWeatherCodeToIcon(day.day.condition.code),
          minTemp: day.day.mintemp_c,
          maxTemp: day.day.maxtemp_c,
        };
      },
    );

    // Create our app's weather data structure from the API response
    const transformedData: WeatherData = {
      location: {
        name: data.location.name,
        country: data.location.country,
      },
      current: {
        temperature: data.current.temp_c,
        weather_descriptions: [data.current.condition.text],
        feelslike: data.current.feelslike_c,
      },
      forecast: {
        today: {
          minTemp: data.forecast.forecastday[0].day.mintemp_c,
          maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
          hourly: hourlyForecasts,
        },
        daily: dailyForecasts,
      },
    };

    return transformedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Helper function to map WeatherAPI condition codes to icon names in our app
const mapWeatherCodeToIcon = (conditionCode: number): string => {
  // See: https://www.weatherapi.com/docs/weather_conditions.json
  if (conditionCode === 1000) {
    // Clear or Sunny
    return 'sunny';
  } else if (conditionCode >= 1003 && conditionCode <= 1009) {
    // Cloudy conditions
    return 'partly-cloudy';
  } else if (conditionCode >= 1030 && conditionCode <= 1039) {
    // Foggy, misty
    return 'fog';
  } else if (conditionCode >= 1063 && conditionCode <= 1069) {
    // Patchy rain, light rain
    return 'light-rain';
  } else if (conditionCode >= 1180 && conditionCode <= 1195) {
    // Rain
    return 'heavy-rain';
  } else if (conditionCode >= 1210 && conditionCode <= 1225) {
    // Snow
    return 'snow';
  } else if (conditionCode >= 1237 && conditionCode <= 1264) {
    // Heavy snow, ice, sleet
    return 'snow-storm';
  } else if (conditionCode >= 1273 && conditionCode <= 1282) {
    // Thunderstorms
    return 'thunderstorm';
  } else {
    return 'partly-cloudy'; // Default icon
  }
};

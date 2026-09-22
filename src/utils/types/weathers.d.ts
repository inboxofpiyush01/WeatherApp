export type TWeatherCard = {
  cityName: string;
  temperature: number;
  weatherType: string;
};

export type TCityWeatherCard = {
  data: TWeatherCard;
  colors: Record<string, string>;
};

// types/WeatherTypes.ts
export interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    feelslike: number;
  };
  forecast: {
    today: {
      minTemp: number;
      maxTemp: number;
      hourly: HourlyForecast[];
    };
    daily: DailyForecast[];
  };
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  wind: number;
  precipitation: number;
}

export interface DailyForecast {
  day: string;
  icon: string;
  minTemp: number;
  maxTemp: number;
}

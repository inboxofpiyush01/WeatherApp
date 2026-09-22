import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash.isempty';

import Header from '../../components/header';
import LocationDisplay from './locationDisplay';
import CurrentWeather from './currentWeather';
import HourlyForecast from './forecast/hourly';
import WeeklyForecast from './forecast/weekly';
import EmptyWidget from './emptyWidget';

import {WeatherData} from '../../utils/types/weathers';
import {fetchWeatherData} from '../../utils/api';
import {styles} from './styles';
import {useTheme} from '../../utils/hooks/useTheme';
import {updateTheme} from '../../redux/actions/userActions';
import {RootState} from '../../redux/store';
import {setWeatherData} from '../../redux/actions/weatherActions';

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const {weatherData} = useSelector((state: RootState) => state.weather) as {
    weatherData: WeatherData;
  };

  const {isDarkMode, colors} = useTheme();
  const dispatch = useDispatch();
  const themedStyles = styles(colors);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchWeatherData(cityName);

      dispatch(setWeatherData(data));

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const handleDarkModeSwitch = () => {
    dispatch(updateTheme());
  };

  const handleCityNameChange = (text: string) => {
    setCityName(text);
  };

  return (
    <SafeAreaView style={themedStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={themedStyles.scrollView}
        contentContainerStyle={themedStyles.scrollViewContent}>
        <Header
          colors={colors}
          isDarkMode={isDarkMode}
          title="Weather App"
          toggleSwitch={handleDarkModeSwitch}
        />
        <View style={themedStyles.rowContainer}>
          <TextInput
            placeholder="Search city"
            style={themedStyles.textInput}
            placeholderTextColor={colors.placeholderText}
            onChangeText={handleCityNameChange}
            value={cityName}
          />
          <TouchableOpacity
            onPress={loadWeatherData}
            style={themedStyles.searchBtn}
            disabled={!cityName || loading}>
            <Text style={themedStyles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        {!loading && !error && !isEmpty(weatherData?.location) && (
          <>
            <LocationDisplay city={weatherData.location.name} colors={colors} />
            <CurrentWeather
              temperature={weatherData.current.temperature}
              condition={weatherData.current.weather_descriptions[0]}
              minTemp={weatherData.forecast.today.minTemp}
              maxTemp={weatherData.forecast.today.maxTemp}
              colors={colors}
            />
            <HourlyForecast
              hourlyData={weatherData.forecast.today.hourly}
              colors={colors}
            />
            <WeeklyForecast
              dailyData={weatherData.forecast.daily}
              colors={colors}
            />
          </>
        )}
        {isEmpty(weatherData?.location) && !error && !loading && (
          <EmptyWidget colors={colors} bottomText={'No city data found!'} />
        )}
        {error && !loading && (
          <View style={themedStyles.centered}>
            <Text style={themedStyles.errorText}>
              {error || 'Something went wrong'}
            </Text>
            <TouchableOpacity
              style={themedStyles.retryButton}
              onPress={loadWeatherData}>
              <Text style={themedStyles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
        {loading && (
          <View style={themedStyles.centered}>
            <ActivityIndicator size="large" color={colors.text} />
            <Text style={themedStyles.loadingText}>
              Loading weather data...
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

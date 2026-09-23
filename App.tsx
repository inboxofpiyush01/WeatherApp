/**
 * WeatherApp root UI
 * Open-Meteo — no API key required
 */

import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type CurrentWeather = {
  temperature: number;
  humidity: number;
  wind: number;
  weatherCode: number;
};

type DayForecast = {
  date: string;
  max: number;
  min: number;
  weatherCode: number;
};

type WeatherResult = {
  city: string;
  country: string;
  current: CurrentWeather;
  daily: DayForecast[];
};

const WEATHER_LABEL: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Icy fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Showers',
  82: 'Heavy showers',
  95: 'Thunderstorm',
  96: 'Storm with hail',
  99: 'Severe hail storm',
};

function weatherLabel(code: number): string {
  return WEATHER_LABEL[code] || 'Weather';
}

function weatherEmoji(code: number): string {
  if (code === 0 || code === 1) {
    return '☀️';
  }
  if (code === 2 || code === 3) {
    return '⛅';
  }
  if (code === 45 || code === 48) {
    return '🌫️';
  }
  if (code >= 51 && code <= 67) {
    return '🌧️';
  }
  if (code >= 71 && code <= 77) {
    return '❄️';
  }
  if (code >= 80 && code <= 82) {
    return '🌦️';
  }
  if (code >= 95) {
    return '⛈️';
  }
  return '🌤️';
}

function formatDay(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'});
}

async function fetchWeather(cityName: string): Promise<WeatherResult> {
  const query = cityName.trim();
  if (!query) {
    throw new Error('Enter a city name.');
  }

  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`,
  );
  if (!geoRes.ok) {
    throw new Error('Could not look up that city.');
  }
  const geoJson = await geoRes.json();
  const place = geoJson && Array.isArray(geoJson.results) ? geoJson.results[0] : null;
  if (!place) {
    throw new Error('City not found. Try another spelling.');
  }

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
  );
  if (!weatherRes.ok) {
    throw new Error('Weather service is unavailable.');
  }
  const weatherJson = await weatherRes.json();
  const current = weatherJson.current || {};
  const daily = weatherJson.daily || {};
  const days: DayForecast[] = (daily.time || []).slice(0, 7).map((date: string, index: number) => ({
    date,
    max: Math.round(Number(daily.temperature_2m_max[index])),
    min: Math.round(Number(daily.temperature_2m_min[index])),
    weatherCode: Number(daily.weather_code[index]),
  }));

  return {
    city: String(place.name || query),
    country: String(place.country || ''),
    current: {
      temperature: Math.round(Number(current.temperature_2m)),
      humidity: Math.round(Number(current.relative_humidity_2m)),
      wind: Math.round(Number(current.wind_speed_10m)),
      weatherCode: Number(current.weather_code),
    },
    daily: days,
  };
}

function App(): React.JSX.Element {
  const [cityName, setCityName] = useState('Mumbai');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherResult | null>(null);

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(cityName);
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1C2C" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.kicker}>WEATHER</Text>
        <Text style={styles.title}>How's the sky?</Text>

        <View style={styles.searchRow}>
          <TextInput
            value={cityName}
            onChangeText={setCityName}
            placeholder="Search city"
            placeholderTextColor="#7F93A8"
            autoCapitalize="words"
            returnKeyType="search"
            onSubmitEditing={loadWeather}
            style={styles.input}
          />
          <Pressable
            onPress={loadWeather}
            disabled={loading || !cityName.trim()}
            style={[styles.searchBtn, (!cityName.trim() || loading) && styles.searchBtnDisabled]}>
            <Text style={styles.searchText}>{loading ? '...' : 'Search'}</Text>
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#7DD3FC" />
            <Text style={styles.muted}>Fetching forecast…</Text>
          </View>
        ) : null}

        {error && !loading ? (
          <View style={styles.card}>
            <Text style={styles.error}>{error}</Text>
            <Pressable onPress={loadWeather} style={styles.retry}>
              <Text style={styles.searchText}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {weather && !loading ? (
          <>
            <View style={styles.hero}>
              <Text style={styles.emoji}>{weatherEmoji(weather.current.weatherCode)}</Text>
              <Text style={styles.temp}>{weather.current.temperature}°</Text>
              <Text style={styles.condition}>{weatherLabel(weather.current.weatherCode)}</Text>
              <Text style={styles.city}>
                {weather.city}
                {weather.country ? `, ${weather.country}` : ''}
              </Text>
            </View>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Humidity</Text>
                <Text style={styles.statValue}>{weather.current.humidity}%</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Wind</Text>
                <Text style={styles.statValue}>{weather.current.wind} km/h</Text>
              </View>
            </View>

            <Text style={styles.section}>7-day forecast</Text>
            {weather.daily.map(day => (
              <View key={day.date} style={styles.dayRow}>
                <Text style={styles.dayName}>{formatDay(day.date)}</Text>
                <Text style={styles.dayEmoji}>{weatherEmoji(day.weatherCode)}</Text>
                <Text style={styles.dayTemp}>
                  {day.max}° / {day.min}°
                </Text>
              </View>
            ))}
          </>
        ) : null}

        {!weather && !loading && !error ? (
          <View style={styles.card}>
            <Text style={styles.muted}>Search a city to load the live forecast.</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0B1C2C',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  kicker: {
    color: '#7DD3FC',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 18,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#132536',
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#1F3A52',
  },
  searchBtn: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnDisabled: {
    opacity: 0.5,
  },
  searchText: {
    color: '#082F49',
    fontWeight: '800',
  },
  center: {
    alignItems: 'center',
    paddingVertical: 28,
    gap: 10,
  },
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#132536',
    borderWidth: 1,
    borderColor: '#1F3A52',
    gap: 12,
  },
  error: {
    color: '#FCA5A5',
    fontSize: 15,
  },
  retry: {
    alignSelf: 'flex-start',
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: '#102433',
  },
  emoji: {
    fontSize: 56,
  },
  temp: {
    color: '#F8FAFC',
    fontSize: 64,
    fontWeight: '800',
    marginTop: 4,
  },
  condition: {
    color: '#BAE6FD',
    fontSize: 18,
    marginTop: 2,
  },
  city: {
    color: '#94A3B8',
    fontSize: 15,
    marginTop: 6,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  stat: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#132536',
  },
  statLabel: {
    color: '#7F93A8',
    fontSize: 12,
    fontWeight: '700',
  },
  statValue: {
    color: '#E2E8F0',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  section: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#132536',
  },
  dayName: {
    flex: 1,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  dayEmoji: {
    width: 36,
    textAlign: 'center',
    fontSize: 18,
  },
  dayTemp: {
    width: 90,
    textAlign: 'right',
    color: '#F8FAFC',
    fontWeight: '700',
  },
  muted: {
    color: '#94A3B8',
    fontSize: 15,
    textAlign: 'center',
  },
});

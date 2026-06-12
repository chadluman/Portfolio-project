import { useEffect, useState } from 'react';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const STORAGE_KEY = 'weather-dashboard-saved-cities';

function getBackgroundColor(weather) {
  if (!weather) return 'from-blue-50 to-blue-100';
  if (weather.temp >= 80) return 'from-orange-50 to-orange-100';
  if (weather.temp >= 60) return 'from-yellow-50 to-yellow-100';
  return 'from-blue-50 to-blue-200';
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedCities, setSavedCities] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCities));
  }, [savedCities]);

  async function handleSearch(city) {
    if (!API_KEY) {
      setError(
        'Missing API key. Add VITE_OPENWEATHER_API_KEY to your .env file.',
      );
      return;
    }

    setError('');
    setWeather(null);
    setLoading(true);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          setError('City not found. Check the spelling and try again.');
        } else if (response.status === 401) {
          setError(
            'Invalid API key. Check VITE_OPENWEATHER_API_KEY in your .env file.',
          );
        } else {
          setError('Unable to fetch weather data right now. Please try again.');
        }
        return;
      }

      const data = await response.json();

      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setError(
        'Something went wrong. Check your internet connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  const bgColor = getBackgroundColor(weather);
  const currentCity = weather
    ? {
        label: weather.country
          ? `${weather.city}, ${weather.country}`
          : weather.city,
        query: weather.country
          ? `${weather.city}, ${weather.country}`
          : weather.city,
      }
    : null;
  const isCurrentCitySaved =
    currentCity &&
    savedCities.some(
      (city) => city.query.toLowerCase() === currentCity.query.toLowerCase(),
    );

  function addCurrentCity() {
    if (!currentCity || isCurrentCitySaved) return;
    setSavedCities((cities) => [...cities, currentCity]);
  }

  function removeCity(cityToRemove) {
    setSavedCities((cities) =>
      cities.filter(
        (city) => city.query.toLowerCase() !== cityToRemove.query.toLowerCase(),
      ),
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgColor} flex flex-col items-center justify-start px-4 pt-16 transition-colors duration-500`}
    >
      <div className='w-full max-w-2xl text-center'>
        <h1 className='mb-2 text-4xl font-bold text-blue-900 sm:text-5xl'>
          Weather Dashboard
        </h1>
        <p className='mb-8 text-gray-600'>Search any city in the world</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <section
        className='mt-5 w-full max-w-md'
        aria-labelledby='saved-cities-title'
      >
        <div className='mb-2 flex items-center justify-between gap-4'>
          <h2
            id='saved-cities-title'
            className='text-sm font-semibold text-gray-700'
          >
            Saved cities
          </h2>
          <span className='text-xs text-gray-500'>Add after searching</span>
        </div>
        {savedCities.length ? (
          <div className='flex flex-wrap gap-2'>
            {savedCities.map((city) => (
              <div
                key={city.query}
                className='inline-flex overflow-hidden rounded-lg border border-blue-200 bg-white'
              >
                <button
                  type='button'
                  onClick={() => handleSearch(city.query)}
                  className='min-h-11 px-3 text-sm text-blue-700 hover:bg-blue-50'
                >
                  {city.label}
                </button>
                <button
                  type='button'
                  onClick={() => removeCity(city)}
                  aria-label={`Remove ${city.label} from saved cities`}
                  className='min-h-11 min-w-11 border-l border-blue-200 text-gray-500 hover:bg-red-50 hover:text-red-600'
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-left text-sm text-gray-500'>
            No saved cities yet.
          </p>
        )}
      </section>

      {loading && (
        <p className='mt-6 animate-pulse text-blue-700'>
          Loading weather data...
        </p>
      )}

      <ErrorMessage message={error} />
      <WeatherCard
        data={weather}
        onAddCity={addCurrentCity}
        isSaved={isCurrentCitySaved}
      />
    </div>
  );
}

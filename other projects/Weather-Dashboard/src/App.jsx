import { useState } from "react"
import ErrorMessage from "./components/ErrorMessage"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function getBackgroundColor(weather) {
  if (!weather) return "from-blue-50 to-blue-100"
  if (weather.temp >= 80) return "from-orange-50 to-orange-100"
  if (weather.temp >= 60) return "from-yellow-50 to-yellow-100"
  return "from-blue-50 to-blue-200"
}

export default function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSearch(city) {
    if (!API_KEY) {
      setError("Missing API key. Add VITE_OPENWEATHER_API_KEY to your .env file.")
      return
    }

    setError("")
    setWeather(null)
    setLoading(true)

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`
      const response = await fetch(url)

      if (!response.ok) {
        if (response.status === 404) {
          setError("City not found. Check the spelling and try again.")
        } else if (response.status === 401) {
          setError("Invalid API key. Check VITE_OPENWEATHER_API_KEY in your .env file.")
        } else {
          setError("Unable to fetch weather data right now. Please try again.")
        }
        return
      }

      const data = await response.json()

      setWeather({
        city: data.name,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      })
    } catch (err) {
      setError("Something went wrong. Check your internet connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const bgColor = getBackgroundColor(weather)

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgColor} flex flex-col items-center justify-start px-4 pt-16 transition-colors duration-500`}
    >
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-2 text-4xl font-bold text-blue-900 sm:text-5xl">
          Weather Dashboard
        </h1>
        <p className="mb-8 text-gray-600">Search any city in the world</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p className="mt-6 text-blue-700 animate-pulse">Loading weather data...</p>
      )}

      <ErrorMessage message={error} />
      <WeatherCard data={weather} />
    </div>
  )
}

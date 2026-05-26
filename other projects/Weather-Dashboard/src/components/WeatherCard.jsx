function WeatherCard({ data }) {
  if (!data) return null

  return (
    <div className="mt-6 w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        className="-mb-2 h-20 w-20"
      />

      <h2 className="text-3xl font-bold text-gray-800">{data.city}</h2>
      <p className="mt-1 capitalize text-gray-500">{data.description}</p>

      <p className="mb-6 mt-4 text-7xl font-light text-blue-600">
        {data.temp}&deg;F
      </p>

      <div className="flex justify-between gap-4 border-t pt-4 text-gray-600">
        <div className="text-center">
          <p className="text-sm text-gray-400">Humidity</p>
          <p className="font-semibold">{data.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Wind</p>
          <p className="font-semibold">{data.wind} mph</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Feels Like</p>
          <p className="font-semibold">{data.feelsLike}&deg;F</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

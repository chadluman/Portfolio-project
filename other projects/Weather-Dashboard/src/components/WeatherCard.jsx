function WeatherCard({ data, onAddCity, isSaved }) {
  if (!data) return null;

  return (
    <div className='mt-6 w-full max-w-md rounded-2xl bg-white p-8 shadow-lg'>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        className='-mb-2 h-20 w-20'
      />

      <div className='flex items-start justify-between gap-4'>
        <h2 className='text-3xl font-bold text-gray-800'>
          {data.city}
          {data.country ? `, ${data.country}` : ''}
        </h2>
        <button
          type='button'
          onClick={onAddCity}
          disabled={isSaved}
          className='min-h-11 shrink-0 rounded-lg border border-blue-200 px-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:cursor-default disabled:border-green-200 disabled:text-green-700'
        >
          {isSaved ? 'City saved' : 'Add city'}
        </button>
      </div>
      <p className='mt-1 text-gray-500 capitalize'>{data.description}</p>

      <p className='mt-4 mb-6 text-7xl font-light text-blue-600'>
        {data.temp}&deg;F
      </p>

      <div className='flex justify-between gap-4 border-t pt-4 text-gray-600'>
        <div className='text-center'>
          <p className='text-sm text-gray-400'>Humidity</p>
          <p className='font-semibold'>{data.humidity}%</p>
        </div>
        <div className='text-center'>
          <p className='text-sm text-gray-400'>Wind</p>
          <p className='font-semibold'>{data.wind} mph</p>
        </div>
        <div className='text-center'>
          <p className='text-sm text-gray-400'>Feels Like</p>
          <p className='font-semibold'>{data.feelsLike}&deg;F</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

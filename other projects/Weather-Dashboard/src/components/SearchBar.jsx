import { useState } from "react"

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("")

  function handleSearch() {
    if (city.trim() === "") return
    onSearch(city.trim())
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") handleSearch()
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Enter a city..."
        value={city}
        onChange={(event) => setCity(event.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar

import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const city = request.nextUrl.searchParams.get("city")?.trim();
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return NextResponse.json({ message: "City is required." }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json(
      { message: "Missing OPENWEATHER_API_KEY server environment variable." },
      { status: 500 },
    );
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", city);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "imperial");

  const response = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const fallbackMessage =
      response.status === 404
        ? "City not found. Check the spelling and try again."
        : "Unable to fetch weather data right now. Please try again.";

    return NextResponse.json(
      { message: data?.message || fallbackMessage },
      { status: response.status },
    );
  }

  return NextResponse.json({
    city: data.name,
    country: data.sys?.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: Math.round((data.visibility || 0) / 1609.344),
    wind: Math.round(data.wind.speed),
    description: data.weather[0].description,
    condition: data.weather[0].main,
    conditionCode: data.weather[0].id,
    icon: data.weather[0].icon,
    sunrise: data.sys?.sunrise,
    sunset: data.sys?.sunset,
  });
};

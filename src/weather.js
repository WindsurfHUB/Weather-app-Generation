import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.WEATHER_BASE_URL || "https://api.open-meteo.com/v1/forecast";

/**
 * Utility to map Open-Meteo weather codes to human-readable descriptions.
 * @param {number} code - The WMO weather interpretation code.
 * @returns {string} Human-readable weather description.
 */
function getWeatherDescription(code) {
  const mapping = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return mapping[code] || "Unknown weather condition";
}

/**
 * Fetches coordinates and weather data for a specified city.
 * @param {string} city - The name of the city to search.
 * @returns {Promise<Object>} Object containing temp, wind, and city name.
 * @throws {Error} If city is not found or API fails.
 */
export async function getWeather(city) {
  if (!city || typeof city !== "string") {
    throw new Error("A valid city name must be provided.");
  }

  try {
    // 1. Geocoding Bridge Protocol: Convert city to coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error(`Geocoding API failed with status ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City '${city}' not found.`);
    }

    const { latitude, longitude, name: officialName } = geoData.results[0];

    // 2. Fetch Forecast: Query weather using coordinates
    // We include 'current' variables to satisfy the TRACI requirement for humidity and wind speed.
    const weatherUrl = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error(`Weather API failed with status ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    const daily = weatherData.daily;

    // TRACI Requirement: Return specific JSON object
    return {
      city: officialName,
      temp_c: current.temperature_2m,
      description: getWeatherDescription(current.weather_code),
      humidity: current.relative_humidity_2m,
      wind_speed: current.wind_speed_10m,
      forecast: daily.time.slice(0, 5).map((time, index) => ({
        date: time,
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
      })),
    };
  } catch (error) {
    console.error(`Error in getWeather: ${error.message}`);
    throw error;
  }
}

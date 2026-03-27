import { getWeather } from "./src/weather.js";

/**
 * Main application entry point.
 * Demonstrates the Geocoding Bridge Protocol by fetching weather for a city.
 */
async function main() {
  const city = "Bangkok";
  console.log(`--- Weather App: Fetching data for ${city} ---`);

  try {
    const weatherData = await getWeather(city);
    console.log("Current Weather Data:");
    console.table(weatherData);
  } catch (error) {
    console.error(`Failed to retrieve weather for ${city}: ${error.message}`);
  }
}

main();

import { CHIANG_MAI } from "./config/constants";
import { getWeather } from "./services/weatherService";
import { showWeather } from "./ui/display";

async function main() {
  console.log("Fetching weather data for Chiang Mai...");
  try {
    const weather = await getWeather(CHIANG_MAI.lat, CHIANG_MAI.lon);
    showWeather(weather);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

main();

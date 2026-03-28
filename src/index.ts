import { CHIANG_MAI } from "./config/constants";
import { getWeather } from "./services/weatherService";
import { showWeather } from "./ui/display";

async function main() {
  console.log("Fetching weather data for Chiang Mai (1st Call)...");
  try {
    const weather1 = await getWeather(CHIANG_MAI.lat, CHIANG_MAI.lon);
    showWeather(weather1);

    console.log("\nFetching weather data for Chiang Mai (2nd Call - Should hit Cache)...");
    const weather2 = await getWeather(CHIANG_MAI.lat, CHIANG_MAI.lon);
    showWeather(weather2);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

main();

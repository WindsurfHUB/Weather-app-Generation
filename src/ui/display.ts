import { formatTemp, formatWindSpeed, celsiusToFahrenheit } from "../utils/formatter";
import { Weather } from "../models/weatherModel";

export function showWeather(weather: Weather) {
  const fahrenheit = celsiusToFahrenheit(weather.temperature);
  
  console.log("----------------------------");
  console.log("   Modern Weather Report   ");
  console.log("----------------------------");
  console.log(`Temperature: ${formatTemp(weather.temperature)} (${fahrenheit.toFixed(1)}°F)`);
  console.log("Wind Speed :", formatWindSpeed(weather.windspeed));
  console.log("Update Time:", weather.time);
  console.log("----------------------------");
}

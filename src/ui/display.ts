import { formatTemp, formatWindSpeed, celsiusToFahrenheit } from "../utils/formatter";
import { Weather } from "../models/weatherModel";

export function showWeather(weather: Weather) {
  const fahrenheit = celsiusToFahrenheit(weather.temperature);
  
  console.log("============================");
  console.log("   Modern Weather Report    ");
  console.log("============================");
  console.log(`Current Temp : ${formatTemp(weather.temperature)} (${fahrenheit.toFixed(1)}°F)`);
  console.log("Wind Speed   :", formatWindSpeed(weather.windspeed));
  console.log("Update Time  :", weather.time);
  
  if (weather.forecast) {
    console.log("----------------------------");
    console.log("   5-Day Weather Forecast   ");
    console.log("----------------------------");
    weather.forecast.forEach((day) => {
      console.log(`${day.date}: Max ${formatTemp(day.maxTemp)} / Min ${formatTemp(day.minTemp)}`);
    });
  }
  console.log("============================");
}

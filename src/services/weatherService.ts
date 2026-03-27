import { fetchWeather } from "../api/weatherApi";
import { Weather } from "../models/weatherModel";

export async function getWeather(lat: number, lon: number): Promise<Weather> {
  const data = await fetchWeather(lat, lon);

  return {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    time: data.current_weather.time,
  };
}

import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.WEATHER_BASE_URL || "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(lat: number, lon: number) {
  const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Weather API failed with status ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`Error in fetchWeather: ${error.message}`);
    throw error;
  }
}

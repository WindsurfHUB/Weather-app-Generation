import { fetchWeather } from "../api/weatherApi";
import { Weather } from "../models/weatherModel";
import { getFromCache, saveToCache } from "../utils/cache";

/**
 * ดึงข้อมูลสภาพอากาศแบบเรียลไทม์ตามพิกัดภูมิศาสตร์ (Latitude & Longitude)
 * พร้อมระบบ Caching เพื่อลดการเรียกซ้ำ (ขั้นตอนที่ 3: Combine it all!)
 *
 * @async
 * @param {number} lat - ค่าละติจูด (Latitude)
 * @param {number} lon - ค่าลองจิจูด (Longitude)
 * @returns {Promise<Weather>}
 */
export async function getWeather(lat: number, lon: number): Promise<Weather> {
  const cacheKey = `weather_${lat.toFixed(4)}_${lon.toFixed(4)}`;

  // 1. ตรวจสอบใน Cache ก่อน (Check cache first)
  const cachedData = getFromCache<Weather>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // 2. หากไม่มีใน Cache หรือข้อมูลเก่าเกินไป ให้ดึงใหม่ (Fetch fresh data)
  const data = await fetchWeather(lat, lon);

  const weather: Weather = {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    time: data.current_weather.time,
    forecast: data.daily.time.slice(0, 5).map((time: string, index: number) => ({
      date: time,
      maxTemp: data.daily.temperature_2m_max[index],
      minTemp: data.daily.temperature_2m_min[index],
    })),
  };

  // 3. บันทึกลง Cache (Save to cache)
  saveToCache(cacheKey, weather);

  return weather;
}


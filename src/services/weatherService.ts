import { fetchWeather } from "../api/weatherApi";
import { Weather } from "../models/weatherModel";

/**
 * ดึงข้อมูลสภาพอากาศแบบเรียลไทม์ตามพิกัดภูมิศาสตร์ (Latitude & Longitude)
 * 
 * ฟังก์ชันนี้ทำหน้าที่เป็น Service Layer ที่เชื่อมต่อระหว่าง API และ UI
 * โดยจะรับพิกัดตัวเลขมา แล้วส่งกลับเป็นข้อมูลพยากรณ์อากาศที่จัดรูปแบบตาม Weather Model
 *
 * @async
 * @param {number} lat - ค่าละติจูด (Latitude) ของพื้นที่ (ตัวอย่าง: 18.7883)
 * @param {number} lon - ค่าลองจิจูด (Longitude) ของพื้นที่ (ตัวอย่าง: 98.9853)
 * 
 * @returns {Promise<Weather>} สัญญา (Promise) ที่จะคืนค่า Object ของสภาพอากาศ ซึ่งประกอบด้วย:
 *  - `temperature`: อุณหภูมิปัจจุบันในหน่วยเซลเซียส
 *  - `windspeed`: ความเร็วลมในหน่วยกิโลเมตรต่อชั่วโมง
 *  - `time`: เวลาที่มีการอัปเดตข้อมูลล่าสุด (ในรูปแบบ ISO 8601)
 * 
 * @throws {Error} จะโยนข้อผิดพลาดหากการเรียกใช้ API ล้มเหลว หรือได้รับข้อมูลที่ไม่ถูกต้องจาก Server
 * 
 * @example
 * // การเรียกใช้งานสำหรับนักพัฒนามือใหม่:
 * try {
 *   const data = await getWeather(18.7883, 98.9853);
 *   console.log(`ขณะนี้อุณหภูมิคือ ${data.temperature}°C`);
 * } catch (error) {
 *   console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
 * }
 */
export async function getWeather(lat: number, lon: number): Promise<Weather> {
  const data = await fetchWeather(lat, lon);

  return {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    time: data.current_weather.time,
  };
}

/**
 * โครงสร้างข้อมูลสำหรับผลลัพธ์การแปลงอุณหภูมิ
 * (Interface for the temperature conversion result)
 */
export interface TemperatureResult {
  success: boolean;
  celsius: number | null;
  fahrenheit: number | null;
  message: string;
}

/**
 * ฟังก์ชันสำหรับแปลง Celsius เป็น Fahrenheit
 * โดยใช้ TypeScript Best Practices สำหรับนักพัฒนามือใหม่
 * 
 * @param celsius - อุณหภูมิในหน่วยเซลเซียส (รับค่าเป็น unknown เพื่อความปลอดภัย)
 * @returns TemperatureResult - อ็อบเจกต์ JSON ที่ระบุสถานะและผลลัพธ์
 */
export function convertToFahrenheit(celsius: unknown): TemperatureResult {
  const ABSOLUTE_ZERO_CELSIUS = -273.15;

  // 1. ตรวจสอบความถูกต้องของข้อมูล (Input Validation)
  // ตรวจสอบว่าค่าที่รับมาเป็นตัวเลขและไม่ใช่ NaN
  if (typeof celsius !== 'number' || Number.isNaN(celsius)) {
    return {
      success: false,
      celsius: null,
      fahrenheit: null,
      message: "ข้อมูลไม่ถูกต้อง: กรุณาระบุค่าเป็นตัวเลข (Invalid input: Please provide a number.)"
    };
  }

  // 2. รองรับกรณีขอบเขตของข้อมูล (Edge Cases)
  // อุณหภูมิต้องไม่ต่ำกว่าศูนย์สัมบูรณ์ (Absolute Zero)
  if (celsius < ABSOLUTE_ZERO_CELSIUS) {
    return {
      success: false,
      celsius: celsius,
      fahrenheit: null,
      message: `ข้อมูลผิดพลาด: อุณหภูมิต่ำกว่าจุดเยือกแข็งสัมบูรณ์ (${ABSOLUTE_ZERO_CELSIUS}°C)`
    };
  }

  // 3. คำนวณตามสูตร (F = C * 9/5 + 32)
  const convertedValue = (celsius * 9) / 5 + 32;

  // 4. ปัดเศษทศนิยม 2 ตำแหน่ง
  // ใช้ Number() ร่วมกับ .toFixed(2) เพื่อให้ได้ค่าตัวเลขที่ปัดเศษแล้ว
  const roundedFahrenheit = Number(convertedValue.toFixed(2));

  // 5. คืนค่าเป็น JSON Object ที่มีโครงสร้างชัดเจน
  return {
    success: true,
    celsius: celsius,
    fahrenheit: roundedFahrenheit,
    message: "แปลงอุณหภูมิสำเร็จ (Conversion successful)"
  };
}

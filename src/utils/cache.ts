/**
 * โครงสร้างข้อมูลสำหรับจัดเก็บใน Cache
 */
interface CacheRecord<T> {
  data: T;
  timestamp: number;
}

// ใช้ Map เป็นแหล่งจัดเก็บข้อมูลชั่วคราวใน Memory
const storage = new Map<string, CacheRecord<any>>();

/**
 * บันทึกข้อมูลลงใน Cache พร้อม Timestamp
 * (ขั้นตอนที่ 1: Save the data)
 */
export function saveToCache<T>(key: string, data: T): void {
  const record: CacheRecord<T> = {
    data,
    timestamp: Date.now(),
  };
  storage.set(key, record);
}

/**
 * ดึงข้อมูลจาก Cache หากยังไม่หมดอายุ
 * (ขั้นตอนที่ 2: Use cached data if it’s still fresh)
 * 
 * @param key - คีย์ที่ใช้ค้นหา
 * @param expiryMs - เวลาหมดอายุในหน่วย Milliseconds (ค่าเริ่มต้น 1 ชั่วโมง)
 */
export function getFromCache<T>(key: string, expiryMs: number = 3600000): T | null {
  const record = storage.get(key);
  
  if (!record) return null;

  const age = Date.now() - record.timestamp;
  if (age < expiryMs) {
    console.log(`[Cache] ใช้ข้อมูลเดิมจาก Cache (อายุ: ${Math.round(age / 1000)} วินาที)`);
    return record.data;
  }

  // หากข้อมูลเก่าเกินไป ให้ลบทิ้ง
  storage.delete(key);
  return null;
}

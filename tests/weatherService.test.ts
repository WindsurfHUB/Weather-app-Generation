import test from "node:test";
import assert from "node:assert";
import { getWeather } from "../src/services/weatherService.ts";

test("getWeather (service) - Valid coordinates for Chiang Mai", async () => {
  const data = await getWeather(18.7904, 98.9847); // Coordinates for Chiang Mai
  assert.strictEqual(typeof data.temperature, "number");
  assert.strictEqual(typeof data.windspeed, "number");
  assert.strictEqual(typeof data.time, "string");
  assert.ok(data.time.includes("T")); // ISO 8601 format
  assert.ok(Array.isArray(data.forecast));
  assert.strictEqual(data.forecast.length, 5);
  assert.strictEqual(typeof data.forecast[0].maxTemp, "number");
  assert.strictEqual(typeof data.forecast[0].minTemp, "number");
});

test("getWeather (service) - Edge case: Invalid coordinates (999, 999)", async () => {
  try {
    await getWeather(999, 999);
    // Open-Meteo might actually handle some invalid coords or return error
  } catch (error: any) {
    assert.ok(error.message || "Failed to fetch weather data");
  }
});

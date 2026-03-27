import test from "node:test";
import assert from "node:assert";
import { getWeather } from "../src/weather.js";

test("getWeather should return weather data for a valid city (Bangkok)", async () => {
  const data = await getWeather("Bangkok");
  assert.strictEqual(data.city, "Bangkok");
  assert.strictEqual(typeof data.temp_c, "number");
  assert.strictEqual(typeof data.description, "string");
  assert.strictEqual(typeof data.humidity, "number");
  assert.strictEqual(typeof data.wind_speed, "number");
});

test("getWeather should throw an error for a non-existent city", async () => {
  try {
    await getWeather("ThisCityDoesNotExist12345");
    assert.fail("Should have thrown an error");
  } catch (error) {
    assert.ok(error.message.includes("not found"));
  }
});

test("getWeather should throw an error for an empty string", async () => {
  try {
    await getWeather("");
    assert.fail("Should have thrown an error");
  } catch (error) {
    assert.strictEqual(error.message, "A valid city name must be provided.");
  }
});

import test from "node:test";
import assert from "node:assert";
import { convertToFahrenheit } from "../src/utils/tempConverter.ts";

test("convertToFahrenheit - Valid input 25.5°C", () => {
  const result = convertToFahrenheit(25.5);
  assert.strictEqual(result.success, true);
  assert.strictEqual(result.fahrenheit, 77.9);
  assert.strictEqual(result.celsius, 25.5);
});

test("convertToFahrenheit - Valid input 0°C", () => {
  const result = convertToFahrenheit(0);
  assert.strictEqual(result.success, true);
  assert.strictEqual(result.fahrenheit, 32);
});

test("convertToFahrenheit - Valid input with rounding (33.3333)", () => {
  const result = convertToFahrenheit(33.3333);
  assert.strictEqual(result.fahrenheit, 92); // (33.3333 * 9/5) + 32 = 91.99994 -> 92.00
});

test("convertToFahrenheit - Edge case: Absolute Zero", () => {
  const result = convertToFahrenheit(-273.15);
  assert.strictEqual(result.success, true);
  assert.strictEqual(result.fahrenheit, -459.67);
});

test("convertToFahrenheit - Error: Below Absolute Zero", () => {
  const result = convertToFahrenheit(-300);
  assert.strictEqual(result.success, false);
  assert.strictEqual(result.fahrenheit, null);
  assert.match(result.message, /ต่ำกว่าจุดเยือกแข็งสัมบูรณ์/);
});

test("convertToFahrenheit - Error: Invalid input (string)", () => {
  const result = convertToFahrenheit("25" as any);
  assert.strictEqual(result.success, false);
  assert.strictEqual(result.fahrenheit, null);
  assert.match(result.message, /ข้อมูลไม่ถูกต้อง/);
});

test("convertToFahrenheit - Error: NaN", () => {
  const result = convertToFahrenheit(NaN);
  assert.strictEqual(result.success, false);
  assert.strictEqual(result.fahrenheit, null);
});

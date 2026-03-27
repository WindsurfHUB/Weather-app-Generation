export function formatTemp(temp: number): string {
  return `${temp.toFixed(1)}°C`;
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function formatWindSpeed(speed: number): string {
  return `${speed} km/h`;
}

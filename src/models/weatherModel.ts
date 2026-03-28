export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
}

export interface Weather {
  temperature: number;
  windspeed: number;
  time: string;
  forecast?: DailyForecast[];
}

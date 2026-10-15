export interface WeatherSnapshot {
  temperature: number;      // °C
  humidity: number;         // %
  windSpeed: number;        // km/h
  rainfall: number;         // mm
  condition: string;        // "Cloudy", "Clear", etc.
  fetchedAt: string;        // ISO timestamp
}

export interface DailyForecast {
  date: string;             // "2026-10-15"
  tempMax: number;
  tempMin: number;
  rainfallSum: number;
  condition: string;
}
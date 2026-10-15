export interface WeatherSnapshot {
  temperature: number; // °C
  humidity: number; // %
  windSpeed: number; // km/h
  rainfall: number; // mm
  condition: string;
  fetchedAt: string; // ISO timestamp
  pressure: number; // hPa
  uvIndex: number;
  visibilityKm: number;
  soilMoisture: number; // % (surface layer)
}

export interface DailyForecast {
  date: string; // "2026-10-15"
  tempMax: number;
  tempMin: number;
  rainfallSum: number;
  condition: string;
}

export interface WeatherReport { current: WeatherSnapshot; daily: DailyForecast[] }
export interface HistoryPoint { date: string; temp: number; rain: number }
export interface GeoResult { id: number; name: string; admin1?: string; country: string; latitude: number; longitude: number }

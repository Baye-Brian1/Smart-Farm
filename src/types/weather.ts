export interface WeatherSnapshot {
  temperature: number; 
  humidity: number; 
  windSpeed: number; 
  rainfall: number;
  condition: string;
  fetchedAt: string;
  pressure: number; 
  uvIndex: number;
  visibilityKm: number;
  soilMoisture: number; 
}

export interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  rainfallSum: number;
  condition: string;
}

export interface WeatherReport {
  current: WeatherSnapshot;
  daily: DailyForecast[];
}
export interface HistoryPoint {
  date: string;
  temp: number;
  rain: number;
}
export interface GeoResult {
  id: number;
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
}

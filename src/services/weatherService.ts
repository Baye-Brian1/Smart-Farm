import type { Coordinates } from "@/types/farm";
import type {
  DailyForecast,
  GeoResult,
  HistoryPoint,
  WeatherReport,
} from "@/types/weather";

const FORECAST = "https://api.open-meteo.com/v1/forecast";
const GEO = "https://geocoding-api.open-meteo.com/v1/search";
const TTL = 10 * 60 * 1000;
const cache = new Map<string, { at: number; data: unknown }>();

async function getJson<T>(url: string, force: boolean): Promise<T> {
  const hit = cache.get(url);
  if (hit && !force && Date.now() - hit.at < TTL) return hit.data as T;
  let res: Response;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  } catch {
    throw new Error(
      "Can't reach the weather service. Check your connection and try again.",
    );
  }
  if (!res.ok)
    throw new Error(`Weather service error (${res.status}). Please try again.`);
  const data = (await res.json()) as T;
  cache.set(url, { at: Date.now(), data });
  return data;
}

function describeWeather(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}

interface RawForecast {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
    pressure_msl: number;
  };
  hourly: {
    time: string[];
    soil_moisture_0_to_1cm: (number | null)[];
    uv_index: (number | null)[];
    visibility: (number | null)[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weather_code: number[];
  };
}

export async function fetchWeather(
  c: Coordinates,
  force = false,
): Promise<WeatherReport> {
  const q = new URLSearchParams({
    latitude: String(c.latitude),
    longitude: String(c.longitude),
    current:
      "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,pressure_msl",
    hourly: "soil_moisture_0_to_1cm,uv_index,visibility",
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code",
    timezone: "auto",
  });
  const raw = await getJson<RawForecast>(`${FORECAST}?${q}`, force);
  const hi = Math.max(
    0,
    raw.hourly.time.indexOf(`${raw.current.time.slice(0, 13)}:00`),
  );
  const h = raw.hourly;
  const daily: DailyForecast[] = raw.daily.time.map((date, i) => ({
    date,
    tempMax: raw.daily.temperature_2m_max[i],
    tempMin: raw.daily.temperature_2m_min[i],
    rainfallSum: raw.daily.precipitation_sum[i] ?? 0,
    condition: describeWeather(raw.daily.weather_code[i]),
  }));
  return {
    current: {
      temperature: raw.current.temperature_2m,
      humidity: raw.current.relative_humidity_2m,
      windSpeed: raw.current.wind_speed_10m,
      rainfall: raw.current.precipitation,
      condition: describeWeather(raw.current.weather_code),
      fetchedAt: new Date().toISOString(),
      pressure: Math.round(raw.current.pressure_msl),
      uvIndex: Math.round((h.uv_index[hi] ?? 0) * 10) / 10,
      visibilityKm: Math.round((h.visibility[hi] ?? 0) / 100) / 10,
      soilMoisture: Math.round((h.soil_moisture_0_to_1cm[hi] ?? 0) * 1000) / 10,
    },
    daily,
  };
}

export async function fetchHistory(
  c: Coordinates,
  days: number,
  force = false,
): Promise<HistoryPoint[]> {
  const q = new URLSearchParams({
    latitude: String(c.latitude),
    longitude: String(c.longitude),
    daily: "temperature_2m_mean,precipitation_sum",
    past_days: String(days),
    forecast_days: "1",
    timezone: "auto",
  });
  const raw = await getJson<{
    daily: {
      time: string[];
      temperature_2m_mean: (number | null)[];
      precipitation_sum: (number | null)[];
    };
  }>(`${FORECAST}?${q}`, force);
  return raw.daily.time.map((date, i) => ({
    date,
    temp: Math.round((raw.daily.temperature_2m_mean[i] ?? 0) * 10) / 10,
    rain: raw.daily.precipitation_sum[i] ?? 0,
  }));
}

export async function searchPlaces(name: string): Promise<GeoResult[]> {
  const q = new URLSearchParams({
    name,
    count: "6",
    language: "en",
    format: "json",
  });
  const raw = await getJson<{ results?: GeoResult[] }>(`${GEO}?${q}`, false);
  return raw.results ?? [];
}

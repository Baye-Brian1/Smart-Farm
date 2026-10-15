import { useEffect, useState } from "react";
import { fetchWeather, type WeatherReport } from "@/services/weatherService";
import type { Coordinates } from "@/types/farm";

export function useWeather(c: Coordinates) {
  const [data, setData] = useState<WeatherReport | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let off = false;
    setData(null); setError("");
    fetchWeather(c).then((r) => { if (!off) setData(r); }).catch((e: Error) => { if (!off) setError(e.message); });
    return () => { off = true; };
  }, [c.latitude, c.longitude]);
  return { data, error };
}

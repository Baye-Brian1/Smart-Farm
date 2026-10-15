import { useEffect, useState } from "react";
import type { Farm } from "@/types/farm";
import type { WeatherReport } from "@/types/weather";
import { fetchWeather } from "@/services/weatherService";

export function useAsync<T>(fn: (force: boolean) => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{ data?: T; error?: string; loading: boolean }>({ loading: true });
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let off = false;
    setState((s) => ({ data: s.data, loading: true }));
    fn(tick > 0).then((data) => { if (!off) setState({ data, loading: false }); })
      .catch((e: Error) => { if (!off) setState({ loading: false, error: e.message }); });
    return () => { off = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);
  return { ...state, reload: () => setTick((t) => t + 1) };
}

export interface FarmReport { farm: Farm; report: WeatherReport | null; error: string }

export function useFarmReports(farms: Farm[]) {
  const key = farms.map((f) => `${f.id}:${f.coordinates.latitude},${f.coordinates.longitude}`).join("|");
  return useAsync<FarmReport[]>(async (force) => {
    const res = await Promise.allSettled(farms.map((f) => fetchWeather(f.coordinates, force)));
    return farms.map((farm, i) => {
      const r = res[i];
      return r.status === "fulfilled" ? { farm, report: r.value, error: "" } : { farm, report: null, error: (r.reason as Error).message };
    });
  }, [key]);
}

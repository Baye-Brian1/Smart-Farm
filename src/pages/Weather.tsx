import { useState } from "react";
import { useStore } from "@/store";
import { useAsync } from "@/hooks/useAsync";
import { fetchWeather } from "@/services/weatherService";
import type { Farm } from "@/types/farm";
import { Btn, Card, FarmSelect, Title, icon, day } from "@/components/ui";
import { CardsSkeleton, ErrorState, NoFarms } from "@/components/states";

export default function Weather() {
  const farms = useStore((s) => s.farms);
  return farms.length ? <View farms={farms} /> : <div><Title>Weather</Title><NoFarms /></div>;
}

function View({ farms }: { farms: Farm[] }) {
  const [id, setId] = useState(farms[0].id);
  const farm = farms.find((f) => f.id === id) ?? farms[0];
  const { data, loading, error, reload } = useAsync((force) => fetchWeather(farm.coordinates, force), [farm.id]);
  const c = data?.current;
  const stats = c ? [["Humidity", `${c.humidity}%`], ["Wind", `${c.windSpeed} km/h`], ["Pressure", `${c.pressure} hPa`], ["UV Index", String(c.uvIndex)], ["Visibility", `${c.visibilityKm} km`], ["Soil Moisture", `${c.soilMoisture}%`]] : [];
  return (
    <div>
      <Title action={<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center"><FarmSelect farms={farms} value={farm.id} onChange={setId} /><Btn variant="outline" loading={loading && !!data} onClick={reload} className="w-full sm:w-auto">Refresh</Btn></div>}>Weather</Title>
      {loading && !data && <CardsSkeleton n={2} h="h-40" />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {c && data && !error && (<>
        <Card className="mb-4"><div className="text-sm text-neutral-500">Current Weather · {farm.locationName}</div>
          <div className="my-2 flex items-center gap-3 text-5xl">{icon(c.condition)}<span>{c.temperature}°C</span></div><div className="mb-3">{c.condition}</div>
          <div className="grid grid-cols-3 gap-3 text-sm md:grid-cols-6">{stats.map(([l, v]) => <div key={l}>{l}<b className="block">{v}</b></div>)}</div>
          <p className="mt-3 text-xs text-neutral-400">Updated {new Date(c.fetchedAt).toLocaleTimeString()}</p></Card>
        <Card><h2 className="mb-3 font-medium">7-Day Forecast</h2>
          <div className="grid grid-cols-2 gap-3 text-center text-sm sm:grid-cols-4 lg:grid-cols-7">{data.daily.map((d) => <div key={d.date} className="rounded-lg bg-neutral-50 px-1 py-2">{day(d.date)}<div className="text-2xl">{icon(d.condition)}</div>{Math.round(d.tempMax)}° <span className="text-neutral-400">{Math.round(d.tempMin)}°</span><div className="text-xs text-blue-600">{d.rainfallSum} mm</div></div>)}</div></Card>
      </>)}
    </div>
  );
}

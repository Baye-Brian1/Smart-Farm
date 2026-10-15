import { useState } from "react";
import { useStore } from "@/store";
import { useWeather } from "@/hooks/useWeather";
import { Card, Title, icon, day } from "@/components/ui";

export default function Weather() {
  const farms = useStore((s) => s.farms);
  const [i, setI] = useState(0);
  const { data, error } = useWeather(farms[i].coordinates);
  const c = data?.current;
  return (
    <div>
      <Title action={<select value={i} onChange={(e) => setI(+e.target.value)} className="rounded-md border px-2 py-1 text-sm">{farms.map((f, k) => <option key={f.id} value={k}>{f.locationName}</option>)}</select>}>Weather</Title>
      {error && <p className="text-red-600">{error}</p>}
      {!data && !error && <p className="text-neutral-500">Loading weather…</p>}
      {c && data && (<>
        <Card className="mb-4"><div className="text-sm text-neutral-500">Current Weather</div>
          <div className="my-2 flex items-center gap-3 text-5xl">{icon(c.condition)}<span>{c.temperature}°C</span></div><div className="mb-3">{c.condition}</div>
          <div className="grid grid-cols-3 gap-3 text-sm"><div>Humidity<b className="block">{c.humidity}%</b></div><div>Wind<b className="block">{c.windSpeed} km/h</b></div><div>Rain<b className="block">{c.rainfall} mm</b></div></div></Card>
        <Card><h2 className="mb-3 font-medium">7-Day Forecast</h2>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">{data.daily.map((d) => <div key={d.date}>{day(d.date)}<div className="text-2xl">{icon(d.condition)}</div>{Math.round(d.tempMax)}° <span className="text-neutral-400">{Math.round(d.tempMin)}°</span><div className="text-xs text-blue-600">{d.rainfallSum} mm</div></div>)}</div></Card>
      </>)}
    </div>
  );
}

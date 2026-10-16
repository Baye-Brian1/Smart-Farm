import { useState, type ReactElement } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useStore } from "@/store";
import { useAsync } from "@/hooks/useAsync";
import { fetchHistory } from "@/services/weatherService";
import { dayRisk, progressOn } from "@/lib/farmLogic";
import type { Farm } from "@/types/farm";
import { Card, FarmSelect, Title } from "@/components/ui";
import { CardsSkeleton, ErrorState, NoFarms } from "@/components/states";

function Chart({ title, note, children }: { title: string; note?: string; children: ReactElement }) {
  return <Card className="min-w-0"><h2 className="font-medium">{title}</h2>{note && <p className="mb-1 text-xs text-neutral-400">{note}</p>}<div className="h-56 min-w-0"><ResponsiveContainer>{children}</ResponsiveContainer></div></Card>;
}

export default function Analytics() {
  const farms = useStore((s) => s.farms);
  return farms.length ? <View farms={farms} /> : <div><Title>Analytics</Title><NoFarms /></div>;
}

function View({ farms }: { farms: Farm[] }) {
  const [id, setId] = useState(farms[0].id);
  const [days, setDays] = useState(30);
  const farm = farms.find((f) => f.id === id) ?? farms[0];
  const { data, loading, error, reload } = useAsync((force) => fetchHistory(farm.coordinates, days, force), [farm.id, days]);
  const pts = (data ?? []).map((p) => ({ d: p.date.slice(5), rain: p.rain, temp: p.temp, crop: progressOn(farm, p.date), risk: dayRisk(p.temp, p.rain) }));
  const grid = <CartesianGrid strokeDasharray="3 3" />;
  return (
    <div>
      <Title action={<div className="flex w-full flex-wrap items-center gap-2 sm:w-auto"><FarmSelect farms={farms} value={farm.id} onChange={setId} />
        {[7, 30, 90].map((n) => <button key={n} onClick={() => setDays(n)} aria-pressed={days === n} className={`rounded-md border px-3 py-1 text-sm transition-colors ${days === n ? "border-green-800 bg-green-800 text-white" : "bg-white hover:bg-neutral-100"}`}>{n}D</button>)}</div>}>Analytics</Title>
      {loading && !data && <CardsSkeleton n={4} h="h-64" />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {data && !error && (
        <div className={`grid gap-4 md:grid-cols-2 ${loading ? "opacity-60" : ""}`}>
          <Chart title="Rainfall (mm)" note={`Last ${days} days · ${farm.locationName}`}><LineChart data={pts}>{grid}<XAxis dataKey="d" /><YAxis /><Tooltip /><Line dataKey="rain" stroke="#2563eb" dot={false} /></LineChart></Chart>
          <Chart title="Temperature (°C)" note="Daily mean"><LineChart data={pts}>{grid}<XAxis dataKey="d" /><YAxis /><Tooltip /><Line dataKey="temp" stroke="#dc2626" dot={false} /></LineChart></Chart>
          <Chart title="Crop Progress Over Time (%)" note={`${farm.crop}, from planting date`}><LineChart data={pts}>{grid}<XAxis dataKey="d" /><YAxis domain={[0, 100]} /><Tooltip /><Line dataKey="crop" stroke="#166534" dot={false} /></LineChart></Chart>
          <Chart title="Risk Level Over Time" note="Derived from daily heat and rainfall"><AreaChart data={pts}>{grid}<XAxis dataKey="d" /><YAxis domain={[0, 100]} /><Tooltip /><Area dataKey="risk" stroke="#d97706" fill="#fde68a" /></AreaChart></Chart>
        </div>
      )}
    </div>
  );
}

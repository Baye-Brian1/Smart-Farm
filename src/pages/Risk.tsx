import { useState } from "react";
import { useStore } from "@/store";
import { useAsync } from "@/hooks/useAsync";
import { fetchWeather } from "@/services/weatherService";
import { computeRisk } from "@/lib/farmLogic";
import type { Farm } from "@/types/farm";
import { Bar, Card, FarmSelect, Title, riskTone } from "@/components/ui";
import { CardsSkeleton, ErrorState, NoFarms } from "@/components/states";

const sev = { info: "bg-blue-500", warning: "bg-amber-500", danger: "bg-red-500" } as const;
const bar = (v: number) => (v >= 65 ? "bg-red-500" : v >= 35 ? "bg-amber-500" : "bg-green-600");

export default function Risk() {
  const farms = useStore((s) => s.farms);
  return farms.length ? <View farms={farms} /> : <div><Title>Risk & Alerts</Title><NoFarms /></div>;
}

function View({ farms }: { farms: Farm[] }) {
  const [id, setId] = useState(farms[0].id);
  const farm = farms.find((f) => f.id === id) ?? farms[0];
  const { data, loading, error, reload } = useAsync((force) => fetchWeather(farm.coordinates, force), [farm.id]);
  const r = data ? computeRisk(data) : null;
  return (
    <div>
      <Title action={<FarmSelect farms={farms} value={farm.id} onChange={setId} />}>Risk & Alerts</Title>
      {loading && !data && <CardsSkeleton n={2} h="h-44" />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {r && !error && (<>
        <Card className="mb-4 flex items-center justify-between"><div><div className="text-sm text-neutral-500">Overall Risk Level · based on current weather, soil and 7-day forecast</div>
          <div className={`mt-1 inline-block rounded px-2 py-0.5 text-2xl font-semibold ${riskTone[r.level]}`}>{r.level}</div></div><div className="text-3xl font-semibold">{r.score} / 100</div></Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card><h2 className="mb-3 font-medium">Risk Breakdown</h2>{r.breakdown.map((b) => <div key={b.label} className="mb-3"><div className="mb-1 flex justify-between text-sm"><span>{b.label}</span><span>{b.value}%</span></div><Bar v={b.value} color={bar(b.value)} /></div>)}</Card>
          <Card><h2 className="mb-3 font-medium">Recent Alerts</h2>
            {r.alerts.length === 0 && <p className="text-sm text-neutral-500">No active alerts. Conditions look stable.</p>}
            {r.alerts.map((a) => <div key={a.key} className="flex gap-2 border-b py-2 text-sm last:border-0"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${sev[a.severity]}`} /><div><b>{a.title}</b><div className="text-xs text-neutral-500">{a.detail}</div></div></div>)}</Card>
        </div></>)}
    </div>
  );
}

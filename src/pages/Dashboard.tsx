import { Link } from "react-router-dom";
import { useStore } from "@/store";
import { useFarmReports } from "@/hooks/useAsync";
import { computeRisk, cropProgress, levelOf, recommend } from "@/lib/farmLogic";
import { Bar, Card, RiskBadge, icon, day } from "@/components/ui";
import { CardsSkeleton, ErrorState, NoFarms } from "@/components/states";

export default function Dashboard() {
  const farms = useStore((s) => s.farms);
  const first = useStore((s) => s.session?.name.split(" ")[0] ?? "");
  const h = new Date().getHours();
  const greet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return (
    <div>
      <h1 className="text-2xl font-semibold">{greet}, {first} 👋</h1>
      <p className="mb-5 text-sm text-neutral-500">Here's what's happening with your farms today.</p>
      {farms.length === 0 ? <NoFarms /> : <Overview />}
    </div>
  );
}

function Overview() {
  const farms = useStore((s) => s.farms);
  const { data, loading, error, reload } = useFarmReports(farms);
  if (loading && !data) return <CardsSkeleton n={4} h="h-24" />;
  if (error || !data) return <ErrorState message={error ?? "No data"} onRetry={reload} />;
  const ok = data.filter((r) => r.report);
  const lead = ok[0]?.report;
  const scores = ok.map((r) => computeRisk(r.report!).score);
  const avg = (f: (r: NonNullable<typeof lead>) => number) => (ok.length ? Math.round((ok.reduce((s, r) => s + f(r.report!), 0) / ok.length) * 10) / 10 : null);
  const stats = [
    ["My Farms", String(farms.length)],
    ["Avg Temperature", avg((r) => r.current.temperature) !== null ? `${avg((r) => r.current.temperature)}°C` : "—"],
    ["Avg Soil Moisture", avg((r) => r.current.soilMoisture) !== null ? `${avg((r) => r.current.soilMoisture)}%` : "—"],
    ["Overall Risk", scores.length ? levelOf(Math.max(...scores)) : "—"],
  ];
  return (
    <div>
      <div className="mb-6 grid gap-4 md:grid-cols-4">{stats.map(([l, v]) => <Card key={l}><div className="text-2xl font-semibold">{v}</div><div className="text-xs text-neutral-500">{l}</div></Card>)}</div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-2 font-medium">My Farms</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.map(({ farm: f, report, error: err }) => {
              const p = cropProgress(f);
              return (
                <Card key={f.id}>
                  <b>{f.name}</b><p className="text-xs text-neutral-500">{f.locationName} · {f.crop}</p>
                  <div className="my-3 flex items-center justify-between text-sm"><span>{p.pct}% · {p.stage}</span>
                    {report ? <RiskBadge level={computeRisk(report).level} /> : <span className="text-xs text-red-600">Weather unavailable</span>}</div>
                  <Bar v={p.pct} />
                  {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
                  <Link to={`/app/farms/${f.id}`} className="mt-3 block rounded-md py-1 text-center text-sm text-green-800 hover:bg-green-50">View Farm</Link>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <Card><h2 className="mb-2 font-medium">Weather Forecast{ok[0] && <span className="text-xs font-normal text-neutral-500"> · {ok[0].farm.locationName}</span>}</h2>
            <div className="flex justify-between text-center text-xs">{lead?.daily.slice(0, 6).map((d) => <div key={d.date}>{day(d.date)}<div className="text-lg">{icon(d.condition)}</div>{Math.round(d.tempMax)}°</div>)}</div>
            {!lead && <p className="text-sm text-neutral-500">Forecast unavailable.</p>}</Card>
          <Card><h2 className="mb-1 font-medium">Today's Recommendation</h2>
            <p className="text-sm text-neutral-600">{lead ? recommend(lead) : "Recommendations appear once weather data loads."}</p></Card>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useStore } from "@/store";
import { useWeather } from "@/hooks/useWeather";
import { Bar, Card, RiskBadge, icon, day } from "@/components/ui";

export default function Dashboard() {
  const farms = useStore((s) => s.farms);
  const { data, error } = useWeather(farms[0].coordinates);
  const c = data?.current;
  const stats = [["My Farms", String(farms.length)], ["Temperature", c ? `${c.temperature}°C` : "…"], ["Humidity", c ? `${c.humidity}%` : "…"], ["Overall Risk", "Moderate"]];
  return (
    <div>
      <h1 className="text-2xl font-semibold">Good morning 👋</h1>
      <p className="mb-5 text-sm text-neutral-500">Here's what's happening with your farms today.</p>
      {error && <p className="mb-3 text-sm text-red-600">Weather unavailable: {error}</p>}
      <div className="mb-6 grid gap-4 md:grid-cols-4">{stats.map(([l, v]) => <Card key={l}><div className="text-2xl font-semibold">{v}</div><div className="text-xs text-neutral-500">{l}</div></Card>)}</div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-2 font-medium">My Farms</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {farms.map((f) => (
              <Card key={f.id}>
                <b>{f.name}</b><p className="text-xs text-neutral-500">{f.locationName} · {f.crop}</p>
                <div className="my-3 flex items-center justify-between text-sm"><span>{f.progress}% crop progress</span><RiskBadge level={f.risk} /></div>
                <Bar v={f.progress} /><Link to={`/app/farms/${f.id}`} className="mt-3 block text-center text-sm text-green-800">View Farm</Link>
              </Card>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Card><h2 className="mb-2 font-medium">Weather Forecast</h2>
            <div className="flex justify-between text-center text-xs">{data?.daily.slice(0, 6).map((d) => <div key={d.date}>{day(d.date)}<div className="text-lg">{icon(d.condition)}</div>{Math.round(d.tempMax)}°</div>)}</div></Card>
          <Card><h2 className="mb-1 font-medium">Today's Recommendation</h2>
            <p className="text-sm text-neutral-600">Rainfall is expected to increase over the next 48 hours. Consider postponing irrigation until tomorrow.</p></Card>
        </div>
      </div>
    </div>
  );
}

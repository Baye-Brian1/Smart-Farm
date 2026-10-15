import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "@/store";
import { useWeather } from "@/hooks/useWeather";
import { Bar, Btn, Card, Field, RiskBadge, Title } from "@/components/ui";

export function Farms() {
  const { farms, addFarm } = useStore();
  const [q, setQ] = useState(""); const [open, setOpen] = useState(false); const [n, setN] = useState("");
  const list = farms.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <Title action={<Btn onClick={() => setOpen(!open)}>+ Add Farm</Btn>}>My Farms</Title>
      {open && (
        <Card className="mb-4"><Field label="Farm name" value={n} onChange={(e) => setN(e.target.value)} />
          <Btn onClick={() => { if (!n) return; addFarm({ name: n, locationName: "Bamenda, Northwest", coordinates: { latitude: 5.9631, longitude: 10.1591 }, crop: "Maize", areaHectares: 1, plantingDate: new Date().toISOString().slice(0, 10), progress: 0, risk: "Low" }); setN(""); setOpen(false); }}>Save farm</Btn></Card>
      )}
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search farms..." className="mb-4 w-full rounded-md border px-3 py-2 text-sm" />
      <div className="space-y-3">
        {list.map((f) => (
          <Card key={f.id} className="flex items-center gap-4">
            <div className="flex-1"><b>{f.name}</b><p className="text-xs text-neutral-500">{f.locationName} · {f.crop} · {f.areaHectares} ha · Planted {f.plantingDate}</p></div>
            <div className="w-40"><div className="mb-1 text-sm">{f.progress}% crop progress</div><Bar v={f.progress} /></div>
            <RiskBadge level={f.risk} /><Link to={`/app/farms/${f.id}`} className="text-sm text-green-800">Open</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function FarmDetail() {
  const { id } = useParams();
  const exists = useStore((s) => s.farms.some((x) => x.id === id));
  if (!id || !exists) return <p>Farm not found. <Link to="/app/farms" className="text-green-800">Back to My Farms</Link></p>;
  return <Detail key={id} id={id} />;
}

function Detail({ id }: { id: string }) {
  const f = useStore((s) => s.farms.find((x) => x.id === id))!;
  const { data } = useWeather(f.coordinates);
  const rows = [["Location", f.locationName], ["Crop", f.crop], ["Farm size", `${f.areaHectares} hectares`], ["Planting date", f.plantingDate]];
  return (
    <div>
      <Title>{f.name}</Title>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><h2 className="mb-2 font-medium">Farm Information</h2>{rows.map(([k, v]) => <div key={k} className="flex justify-between py-1 text-sm"><span className="text-neutral-500">{k}</span>{v}</div>)}</Card>
        <Card><h2 className="mb-2 font-medium">Crop Progress</h2><div className="mb-2 text-3xl font-semibold text-green-800">{f.progress}%</div><Bar v={f.progress} /></Card>
        <Card><h2 className="mb-2 font-medium">Quick Stats</h2>
          <div className="space-y-1 text-sm"><div>Temperature: {data ? `${data.current.temperature}°C` : "…"}</div><div>Humidity: {data ? `${data.current.humidity}%` : "…"}</div><div>Rainfall: {data ? `${data.current.rainfall} mm` : "…"}</div><RiskBadge level={f.risk} /></div></Card>
      </div>
    </div>
  );
}

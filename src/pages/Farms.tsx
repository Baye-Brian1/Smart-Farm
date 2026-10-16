import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2 } from "lucide-react";
import { useStore } from "@/store";
import { useAsync } from "@/hooks/useAsync";
import { fetchWeather, searchPlaces } from "@/services/weatherService";
import { CROPS, computeRisk, cropProgress, today } from "@/lib/farmLogic";
import type { GeoResult } from "@/types/weather";
import { Bar, Btn, Card, Field, RiskBadge, Select, Title } from "@/components/ui";
import { CardsSkeleton, EmptyState, ErrorState, Skeleton } from "@/components/states";

function LocationPicker({ picked, onPick, error }: { picked?: GeoResult; onPick: (g: GeoResult) => void; error?: string }) {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<GeoResult[]>([]);
  const [st, setSt] = useState<"idle" | "loading" | "error" | "done">("idle");
  useEffect(() => {
    if (q.trim().length < 2) { setRes([]); setSt("idle"); return; }
    setSt("loading");
    let off = false;
    const t = setTimeout(() => {
      searchPlaces(q.trim()).then((r) => { if (!off) { setRes(r); setSt("done"); } }).catch(() => { if (!off) setSt("error"); });
    }, 400);
    return () => { off = true; clearTimeout(t); };
  }, [q]);
  return (
    <div className="mb-3 text-sm">
      <Field label="Location" placeholder="Search a town, e.g. Bamenda" value={q} onChange={(e) => setQ(e.target.value)} error={error} />
      {picked && <p className="-mt-2 mb-2 text-xs text-green-800">Selected: {picked.name}{picked.admin1 ? `, ${picked.admin1}` : ""}, {picked.country}</p>}
      {st === "loading" && <Skeleton className="h-8" />}
      {st === "error" && <p className="text-xs text-red-600">Couldn't search places. Check your connection.</p>}
      {st === "done" && res.length === 0 && <p className="text-xs text-neutral-500">No places found.</p>}
      {st === "done" && res.map((g) => (
        <button type="button" key={g.id} onClick={() => { onPick(g); setQ(""); setRes([]); setSt("idle"); }} className="block w-full rounded-md px-2 py-1.5 text-left hover:bg-green-50">
          {g.name}{g.admin1 ? `, ${g.admin1}` : ""}, {g.country}
        </button>
      ))}
    </div>
  );
}

const schema = z.object({
  name: z.string().min(2, "Enter a farm name"), crop: z.string(),
  area: z.string().refine((v) => Number(v) > 0, "Enter the area in hectares"), plantingDate: z.string().min(1, "Pick a date"),
});
type V = z.infer<typeof schema>;

function AddFarm({ onDone }: { onDone: () => void }) {
  const addFarm = useStore((s) => s.addFarm);
  const [place, setPlace] = useState<GeoResult>();
  const [placeErr, setPlaceErr] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<V>({ resolver: zodResolver(schema), defaultValues: { crop: "Maize", plantingDate: today() } });
  const submit = (v: V) => {
    if (!place) { setPlaceErr("Search and pick a location"); return; }
    addFarm({ id: crypto.randomUUID(), name: v.name, locationName: `${place.name}${place.admin1 ? `, ${place.admin1}` : ""}`, coordinates: { latitude: place.latitude, longitude: place.longitude }, crop: v.crop, areaHectares: Number(v.area), plantingDate: v.plantingDate });
    onDone();
  };
  return (
    <Card className="mb-4"><form onSubmit={handleSubmit(submit)} className="grid gap-x-4 md:grid-cols-2">
      <Field label="Farm name" error={errors.name?.message} {...register("name")} />
      <Select label="Crop" {...register("crop")}>{Object.keys(CROPS).map((c) => <option key={c}>{c}</option>)}</Select>
      <Field label="Area (hectares)" type="number" step="0.1" error={errors.area?.message} {...register("area")} />
      <Field label="Planting date" type="date" error={errors.plantingDate?.message} {...register("plantingDate")} />
      <div className="md:col-span-2"><LocationPicker picked={place} onPick={(g) => { setPlace(g); setPlaceErr(""); }} error={placeErr} />
        <div className="flex gap-2"><Btn type="submit">Save farm</Btn><Btn variant="outline" onClick={onDone}>Cancel</Btn></div></div>
    </form></Card>
  );
}

export function Farms() {
  const farms = useStore((s) => s.farms);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const list = farms.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <Title action={<Btn onClick={() => setOpen(true)}>+ Add Farm</Btn>}>My Farms</Title>
      {open && <AddFarm onDone={() => setOpen(false)} />}
      {farms.length === 0 && !open && <EmptyState title="No farms yet" hint="Add a farm with its location, crop and planting date." action={<Btn onClick={() => setOpen(true)}>Add your first farm</Btn>} />}
      {farms.length > 0 && <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search farms..." className="mb-4 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-green-700" />}
      {farms.length > 0 && list.length === 0 && <p className="text-sm text-neutral-500">No farms match "{q}".</p>}
      <div className="space-y-3">
        {list.map((f) => { const p = cropProgress(f); return (
          <Link key={f.id} to={`/app/farms/${f.id}`} className="block"><Card className="flex flex-col gap-3 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1"><b>{f.name}</b><p className="break-words text-xs text-neutral-500">{f.locationName} · {f.crop} · {f.areaHectares} ha · Planted {f.plantingDate}</p></div>
            <div className="w-full sm:w-40"><div className="mb-1 text-sm">{p.pct}% · {p.stage}</div><Bar v={p.pct} /></div>
          </Card></Link>); })}
      </div>
    </div>
  );
}

export function FarmDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const farm = useStore((s) => s.farms.find((x) => x.id === id));
  const remove = useStore((s) => s.removeFarm);
  const { data, loading, error, reload } = useAsync((force) => fetchWeather(farm!.coordinates, force), [id]);
  if (!farm) return <EmptyState title="Farm not found" hint="It may have been deleted." action={<Link to="/app/farms" className="text-green-800 underline">Back to My Farms</Link>} />;
  const p = cropProgress(farm);
  const rows = [["Location", farm.locationName], ["Crop", farm.crop], ["Farm size", `${farm.areaHectares} hectares`], ["Planting date", farm.plantingDate], ["Growth stage", p.stage], ["Days to harvest", String(p.daysLeft)]];
  return (
    <div>
      <Title action={<Btn variant="outline" onClick={() => { if (confirm(`Delete ${farm.name}? Its tasks and observations are removed too.`)) { remove(farm.id); nav("/app/farms"); } }}><Trash2 /> Delete</Btn>}>{farm.name}</Title>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><h2 className="mb-2 font-medium">Farm Information</h2>{rows.map(([k, v]) => <div key={k} className="flex flex-wrap justify-between gap-x-3 py-1 text-sm"><span className="text-neutral-500">{k}</span><span className="break-words text-right">{v}</span></div>)}</Card>
        <Card><h2 className="mb-2 font-medium">Crop Progress</h2><div className="mb-2 text-3xl font-semibold text-green-800">{p.pct}%</div><Bar v={p.pct} /></Card>
        <Card><h2 className="mb-2 font-medium">Quick Stats</h2>
          {loading && !data && <CardsSkeleton n={1} h="h-20" />}
          {error && <ErrorState message={error} onRetry={reload} />}
          {data && <div className="space-y-1 text-sm"><div>Temperature: {data.current.temperature}°C</div><div>Humidity: {data.current.humidity}%</div><div>Soil moisture: {data.current.soilMoisture}%</div><div>Rain today: {data.daily[0]?.rainfallSum ?? 0} mm</div><RiskBadge level={computeRisk(data).level} /></div>}
        </Card>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useStore, type Observation } from "@/store";
import { today } from "@/lib/farmLogic";
import { Btn, Card, Field, Select, Title } from "@/components/ui";
import { EmptyState } from "@/components/states";

const CATS = ["Pest", "Disease", "Growth", "Water Stress", "Other"];
const sevTone = { Low: "bg-green-100 text-green-800", Medium: "bg-amber-100 text-amber-800", High: "bg-red-100 text-red-800" };

export default function Observations() {
  const { observations, farms, addObservation, removeObservation } = useStore();
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(""); const [farmId, setFarmId] = useState(""); const [cat, setCat] = useState("Pest"); const [sev, setSev] = useState<Observation["severity"]>("Low"); const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const save = () => {
    if (title.trim().length < 2) { setErr("Describe what you saw"); return; }
    addObservation({ id: crypto.randomUUID(), title: title.trim(), farmId, category: cat, severity: sev, note, date: today() });
    setTitle(""); setNote(""); setErr(""); setOpen(false);
  };
  const list = observations.filter((o) => filter === "All" || o.category === filter);
  return (
    <div>
      <Title action={<Btn onClick={() => setOpen(!open)}>+ New Observation</Btn>}>Observations</Title>
      {open && (
        <Card className="mb-4 grid gap-x-4 md:grid-cols-2">
          <Field label="What did you see?" value={title} onChange={(e) => setTitle(e.target.value)} error={err} />
          <Select label="Farm" value={farmId} onChange={(e) => setFarmId(e.target.value)}><option value="">General</option>{farms.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</Select>
          <Select label="Category" value={cat} onChange={(e) => setCat(e.target.value)}>{CATS.map((c) => <option key={c}>{c}</option>)}</Select>
          <Select label="Severity" value={sev} onChange={(e) => setSev(e.target.value as Observation["severity"])}><option>Low</option><option>Medium</option><option>High</option></Select>
          <div className="md:col-span-2"><Field label="Notes (optional)" value={note} onChange={(e) => setNote(e.target.value)} /></div>
          <div className="flex gap-2 md:col-span-2"><Btn onClick={save}>Save observation</Btn><Btn variant="outline" onClick={() => setOpen(false)}>Cancel</Btn></div>
        </Card>
      )}
      <div className="mb-4 flex flex-wrap gap-2">{["All", ...CATS].map((x) => <button key={x} onClick={() => setFilter(x)} aria-pressed={filter === x} className={`rounded-full border px-3 py-1 text-sm transition-colors ${filter === x ? "border-green-800 bg-green-800 text-white" : "bg-white hover:bg-neutral-100"}`}>{x}</button>)}</div>
      {observations.length === 0 && <EmptyState title="No observations yet" hint="Record pests, disease or growth notes as you walk your fields." />}
      {observations.length > 0 && list.length === 0 && <p className="text-sm text-neutral-500">No {filter.toLowerCase()} observations.</p>}
      {list.map((o) => (
        <Card key={o.id} className="mb-2 flex items-center justify-between gap-3">
          <div><b className="text-sm">{o.title}</b><div className="text-xs text-neutral-500">{farms.find((f) => f.id === o.farmId)?.name ?? "General"} · {o.category} · {o.date}</div>{o.note && <p className="mt-1 text-xs text-neutral-600">{o.note}</p>}</div>
          <div className="flex items-center gap-2"><span className={`rounded px-2 py-0.5 text-xs ${sevTone[o.severity]}`}>{o.severity}</span>
            <button onClick={() => removeObservation(o.id)} aria-label="Delete observation" className="rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></div>
        </Card>
      ))}
    </div>
  );
}

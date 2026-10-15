import { useState } from "react";
import { useStore } from "@/store";
import { Card, Title, Btn } from "@/components/ui";

export function Tasks() {
  const { tasks, toggleTask } = useStore();
  return (
    <div>
      <Title action={<Btn>+ Add Task</Btn>}>Tasks</Title>
      {["Today", "Tomorrow", "Aug 12"].map((g) => (
        <div key={g} className="mb-4"><h2 className="mb-2 text-sm font-medium text-neutral-500">{g}</h2>
          {tasks.filter((t) => t.due === g).map((t) => (
            <Card key={t.id} className="mb-2 flex items-center gap-3">
              <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} className="accent-green-800" />
              <div className="flex-1"><div className={t.done ? "text-neutral-400 line-through" : ""}>{t.title}</div><div className="text-xs text-neutral-500">{t.farm}</div></div>
              <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs">{t.priority}</span>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

const obs = [["Leaves showing yellow spots", "My Maize Farm · Pest", "Aug 8, 2026", "Medium", "Pest"], ["Good growth observed", "Rice Field · Growth", "Aug 7, 2026", "Low", "Growth"], ["Soil looks dry", "My Maize Farm · Water Stress", "Aug 6, 2026", "High", "Water Stress"], ["Possible leaf blight", "My Maize Farm · Disease", "Aug 5, 2026", "High", "Disease"]];
export function Observations() {
  const [f, setF] = useState("All");
  return (
    <div>
      <Title action={<Btn>+ New Observation</Btn>}>Observations</Title>
      <div className="mb-4 flex gap-2">{["All", "Pest", "Disease", "Growth", "Water Stress"].map((x) => <button key={x} onClick={() => setF(x)} className={`rounded-full border px-3 py-1 text-sm ${f === x ? "bg-green-800 text-white" : "bg-white"}`}>{x}</button>)}</div>
      {obs.filter((o) => f === "All" || o[4] === f).map((o) => <Card key={o[0]} className="mb-2 flex justify-between"><div><b className="text-sm">{o[0]}</b><div className="text-xs text-neutral-500">{o[1]}</div></div><div className="text-right text-xs"><div>{o[2]}</div><div>{o[3]}</div></div></Card>)}
    </div>
  );
}

const notes = [["Heavy rainfall expected", "Tomorrow, 2:00 PM"], ["Task reminder", "Check soil moisture for My Maize Farm"], ["New observation added", "Leaf observation has been recorded"], ["Temperature alert", "High temperature expected tomorrow"], ["Weekly report ready", "Your farm report is ready to view"]];
export function Notifications() {
  return (
    <div><Title action={<button className="text-sm text-green-800">Mark all as read</button>}>Notifications</Title>
      {notes.map(([t, d]) => <Card key={t} className="mb-2"><b className="text-sm">{t}</b><div className="text-xs text-neutral-500">{d}</div></Card>)}</div>
  );
}

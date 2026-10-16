import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useStore, type Task } from "@/store";
import { today } from "@/lib/farmLogic";
import { Btn, Card, Field, Select, Title } from "@/components/ui";
import { EmptyState } from "@/components/states";

export default function Tasks() {
  const { tasks, farms, addTask, toggleTask, removeTask } = useStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(""); const [farmId, setFarmId] = useState(""); const [due, setDue] = useState(today()); const [pri, setPri] = useState<Task["priority"]>("Medium");
  const [err, setErr] = useState("");
  const t0 = today();
  const farmName = (id: string) => farms.find((f) => f.id === id)?.name ?? "General";
  const groups: [string, Task[]][] = [
    ["Overdue", tasks.filter((t) => !t.done && t.dueDate < t0)],
    ["Today", tasks.filter((t) => !t.done && t.dueDate === t0)],
    ["Upcoming", tasks.filter((t) => !t.done && t.dueDate > t0)],
    ["Completed", tasks.filter((t) => t.done)],
  ];
  const save = () => {
    if (title.trim().length < 2) { setErr("Enter a task title"); return; }
    addTask({ id: crypto.randomUUID(), title: title.trim(), farmId, priority: pri, dueDate: due, done: false });
    setTitle(""); setErr(""); setOpen(false);
  };
  return (
    <div>
      <Title action={<Btn onClick={() => setOpen(!open)}>+ Add Task</Btn>}>Tasks</Title>
      {open && (
        <Card className="mb-4 grid gap-x-4 md:grid-cols-2">
          <Field label="Task" value={title} onChange={(e) => setTitle(e.target.value)} error={err} />
          <Select label="Farm" value={farmId} onChange={(e) => setFarmId(e.target.value)}><option value="">General</option>{farms.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</Select>
          <Field label="Due date" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          <Select label="Priority" value={pri} onChange={(e) => setPri(e.target.value as Task["priority"])}><option>High</option><option>Medium</option><option>Low</option></Select>
          <div className="flex gap-2 md:col-span-2"><Btn onClick={save}>Save task</Btn><Btn variant="outline" onClick={() => setOpen(false)}>Cancel</Btn></div>
        </Card>
      )}
      {tasks.length === 0 && <EmptyState title="No tasks yet" hint="Add field jobs like irrigation, weeding or inspections." />}
      {groups.filter(([, l]) => l.length).map(([g, list]) => (
        <div key={g} className="mb-4"><h2 className={`mb-2 text-sm font-medium ${g === "Overdue" ? "text-red-600" : "text-neutral-500"}`}>{g} ({list.length})</h2>
          {list.map((t) => (
            <Card key={t.id} className="mb-2 flex flex-wrap items-center gap-3">
              <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} className="h-4 w-4 accent-green-800" aria-label={`Mark ${t.title} done`} />
              <div className="min-w-0 flex-1"><div className={`break-words ${t.done ? "text-neutral-400 line-through" : ""}`}>{t.title}</div><div className="break-words text-xs text-neutral-500">{farmName(t.farmId)} · {t.dueDate}</div></div>
              <span className={`rounded px-2 py-0.5 text-xs ${t.priority === "High" ? "bg-red-100 text-red-800" : "bg-neutral-100"}`}>{t.priority}</span>
              <button onClick={() => removeTask(t.id)} aria-label="Delete task" className="rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

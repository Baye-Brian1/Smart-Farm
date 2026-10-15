import { useStore } from "@/store";
import { useFarmReports } from "@/hooks/useAsync";
import { computeRisk, today } from "@/lib/farmLogic";
import { Btn, Card, Title } from "@/components/ui";
import { CardsSkeleton, EmptyState, ErrorState } from "@/components/states";

interface Note { id: string; title: string; detail: string; tone: string }
const tone = { info: "bg-blue-500", warning: "bg-amber-500", danger: "bg-red-500", task: "bg-green-600" };

export default function Notifications() {
  const { farms, tasks, readIds, markRead } = useStore();
  const { data, loading, error, reload } = useFarmReports(farms);
  const t0 = today();
  const notes: Note[] = [
    ...(data ?? []).flatMap(({ farm, report }) => (report ? computeRisk(report).alerts.map((a) => ({ id: `${farm.id}-${a.key}`, title: a.title, detail: `${farm.name} · ${a.detail}`, tone: tone[a.severity] })) : [])),
    ...tasks.filter((t) => !t.done && t.dueDate <= t0).map((t) => ({ id: `task-${t.id}`, title: t.dueDate < t0 ? "Task overdue" : "Task due today", detail: t.title, tone: tone.task })),
  ];
  const unread = notes.filter((n) => !readIds.includes(n.id));
  return (
    <div>
      <Title action={<Btn variant="outline" disabled={unread.length === 0} onClick={() => markRead(notes.map((n) => n.id))}>Mark all as read</Btn>}>Notifications{unread.length > 0 && <span className="ml-2 rounded-full bg-green-800 px-2 py-0.5 text-xs text-white">{unread.length}</span>}</Title>
      {farms.length > 0 && loading && !data && <CardsSkeleton n={3} h="h-14" />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {!loading && notes.length === 0 && <EmptyState title="You're all caught up" hint={farms.length ? "New weather alerts and task reminders will show up here." : "Add a farm to start receiving weather alerts."} />}
      {notes.map((n) => { const read = readIds.includes(n.id); return (
        <Card key={n.id} className={`mb-2 flex items-start gap-3 ${read ? "opacity-60" : ""}`}>
          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.tone}`} /><div><b className="text-sm">{n.title}</b><div className="text-xs text-neutral-500">{n.detail}</div></div>
        </Card>); })}
    </div>
  );
}

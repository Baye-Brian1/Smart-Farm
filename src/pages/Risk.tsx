import { Bar, Card, Title } from "@/components/ui";

const breakdown = [["Drought Risk", 62, "bg-amber-500"], ["Heavy Rain Risk", 28, "bg-red-500"], ["Heat Stress Risk", 19, "bg-green-600"], ["Pest Risk", 24, "bg-green-600"]] as const;
const alerts = ["Heavy rainfall expected · Tomorrow, 2:00 PM", "High temperature alert · Bamenda, Northwest", "Soil moisture low · My Maize Farm"];

export default function Risk() {
  return (
    <div>
      <Title>Risk & Alerts</Title>
      <Card className="mb-4 flex items-center justify-between"><div><div className="text-sm text-neutral-500">Overall Risk Level</div><div className="text-3xl font-semibold text-amber-600">Moderate</div></div><div className="text-3xl font-semibold">62 / 100</div></Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><h2 className="mb-3 font-medium">Risk Breakdown</h2>{breakdown.map(([l, v, c]) => <div key={l} className="mb-3"><div className="mb-1 flex justify-between text-sm"><span>{l}</span><span>{v}%</span></div><Bar v={v} color={c} /></div>)}</Card>
        <Card><h2 className="mb-3 font-medium">Recent Alerts</h2>{alerts.map((a) => <div key={a} className="border-b py-2 text-sm last:border-0">{a}</div>)}</Card>
      </div>
    </div>
  );
}

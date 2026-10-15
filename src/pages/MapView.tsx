import { useStore } from "@/store";
import { Card, Title } from "@/components/ui";

// Placeholder map: positions are scaled from lat/lng. Swap for react-leaflet later.
export default function MapView() {
  const farms = useStore((s) => s.farms);
  const color = { Low: "bg-green-600", Moderate: "bg-amber-500", High: "bg-red-600" } as const;
  return (
    <div>
      <Title>Map View</Title>
      <Card className="relative h-[28rem] overflow-hidden bg-gradient-to-br from-green-100 to-lime-200 p-0">
        {farms.map((f) => (
          <div key={f.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(f.coordinates.longitude - 9.9) * 150}%`, top: `${(6.2 - f.coordinates.latitude) * 100}%` }}>
            <div className={`h-4 w-4 rounded-full border-2 border-white ${color[f.risk]}`} /><div className="mt-1 whitespace-nowrap rounded bg-white px-2 py-0.5 text-xs shadow">{f.name}</div>
          </div>
        ))}
        <div className="absolute bottom-3 left-3 rounded bg-white p-2 text-xs shadow">🟢 Low · 🟠 Moderate · 🔴 High</div>
      </Card>
    </div>
  );
}

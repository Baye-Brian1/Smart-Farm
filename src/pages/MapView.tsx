import { Link } from "react-router-dom";
import { useStore } from "@/store";
import { useFarmReports } from "@/hooks/useAsync";
import { computeRisk } from "@/lib/farmLogic";
import { Card, Title } from "@/components/ui";
import { ErrorState, NoFarms, Skeleton } from "@/components/states";

// Schematic map: farms are placed from their real coordinates. Swap for react-leaflet later.
export default function MapView() {
  const farms = useStore((s) => s.farms);
  const { data, loading, error, reload } = useFarmReports(farms);
  if (farms.length === 0) return <div><Title>Map View</Title><NoFarms /></div>;
  const lats = farms.map((f) => f.coordinates.latitude), lngs = farms.map((f) => f.coordinates.longitude);
  const [minLa, maxLa, minLn, maxLn] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const pos = (v: number, lo: number, hi: number) => (hi === lo ? 50 : 12 + ((v - lo) / (hi - lo)) * 76);
  const color = { Low: "bg-green-600", Moderate: "bg-amber-500", High: "bg-red-600" } as const;
  return (
    <div>
      <Title>Map View</Title>
      {error && <div className="mb-3"><ErrorState message={error} onRetry={reload} /></div>}
      <Card className="relative h-[28rem] overflow-hidden bg-gradient-to-br from-green-100 to-lime-200 p-0">
        {loading && !data && <Skeleton className="absolute inset-0 rounded-none opacity-40" />}
        {farms.map((f) => {
          const rep = data?.find((r) => r.farm.id === f.id)?.report;
          const lvl = rep ? computeRisk(rep).level : null;
          return (
            <Link key={f.id} to={`/app/farms/${f.id}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos(f.coordinates.longitude, minLn, maxLn)}%`, top: `${pos(maxLa - f.coordinates.latitude + minLa, minLa, maxLa)}%` }}>
              <div className={`mx-auto h-4 w-4 rounded-full border-2 border-white ${lvl ? color[lvl] : "bg-neutral-400"}`} />
              <div className="mt-1 whitespace-nowrap rounded bg-white px-2 py-0.5 text-xs shadow">{f.name}{lvl && ` · ${lvl}`}</div>
            </Link>
          );
        })}
        <div className="absolute bottom-3 left-3 rounded bg-white p-2 text-xs shadow">🟢 Low · 🟠 Moderate · 🔴 High</div>
      </Card>
    </div>
  );
}

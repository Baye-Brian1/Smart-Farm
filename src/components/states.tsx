import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TriangleAlert, Sprout } from "lucide-react";
import { Btn, Card } from "@/components/ui";

export const Skeleton = ({ className = "" }: { className?: string }) => <div className={`animate-pulse rounded-md bg-neutral-200 ${className}`} />;

export const CardsSkeleton = ({ n = 3, h = "h-28" }: { n?: number; h?: string }) => (
  <div className="grid gap-4 md:grid-cols-3" aria-busy="true" aria-label="Loading">{Array.from({ length: n }, (_, i) => <Skeleton key={i} className={h} />)}</div>
);

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-2 border-red-200 py-8 text-center" >
      <TriangleAlert className="text-red-600" /><b>Something went wrong</b>
      <p className="max-w-sm text-sm text-neutral-600">{message}</p>
      {onRetry && <Btn variant="outline" onClick={onRetry}>Try again</Btn>}
    </Card>
  );
}

export function EmptyState({ title, hint, action }: { title: string; hint: string; action?: ReactNode }) {
  return (
    <Card className="flex flex-col items-center gap-2 py-10 text-center">
      <Sprout className="text-green-700" /><b>{title}</b><p className="max-w-sm text-sm text-neutral-500">{hint}</p>{action}
    </Card>
  );
}

export const NoFarms = () => (
  <EmptyState title="No farms yet" hint="Add your first farm so we can load live weather, risk and recommendations for its location."
    action={<Link to="/app/farms" className="rounded-lg bg-green-800 px-4 py-2 text-sm text-white hover:bg-green-900">Add a farm</Link>} />
);

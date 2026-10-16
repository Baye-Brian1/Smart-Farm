import type { ReactNode, ComponentProps } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card as ShCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { RiskLevel } from "@/lib/farmLogic";
import type { Farm } from "@/types/farm";

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <ShCard className={cn("gap-0 p-4", className)}>{children}</ShCard>
);
export const Title = ({ children, action }: { children: ReactNode; action?: ReactNode }) => (
  <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center"><h1 className="text-xl font-semibold">{children}</h1>{action && <div className="w-full sm:w-auto">{action}</div>}</div>
);
export const Btn = ({ children, onClick, type = "button", className = "", loading, disabled, variant = "default" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit"; className?: string; loading?: boolean; disabled?: boolean; variant?: "default" | "outline" }) => (
  <Button type={type} variant={variant} onClick={onClick} disabled={disabled || loading}
    className={cn(variant === "default" && "bg-green-800 text-white hover:bg-green-900", className)}>
    {loading && <Loader2 className="animate-spin" />}{children}
  </Button>
);
export const riskTone: Record<RiskLevel, string> = { Low: "bg-green-100 text-green-800", Moderate: "bg-amber-100 text-amber-800", High: "bg-red-100 text-red-800" };
export const RiskBadge = ({ level }: { level: RiskLevel }) => <Badge variant="secondary" className={riskTone[level]}>{level} Risk</Badge>;
export const Bar = ({ v, color = "bg-green-700" }: { v: number; color?: string }) => (
  <div className="h-2 w-full rounded bg-neutral-200">
    <motion.div className={`h-2 rounded ${color}`} initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
  </div>
);
export const Field = ({ label, error, ...p }: { label: string; error?: string } & ComponentProps<"input">) => (
  <label className="mb-3 block text-sm"><span className="mb-1 block font-medium">{label}</span>
    <Input {...p} aria-invalid={!!error} />
    {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}</label>
);
export const Select = ({ label, error, children, ...p }: { label?: string; error?: string } & ComponentProps<"select">) => (
  <label className="mb-3 block text-sm">{label && <span className="mb-1 block font-medium">{label}</span>}
    <select {...p} aria-invalid={!!error} className={cn("h-8 w-full rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50", p.className)}>{children}</select>
    {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}</label>
);
export const FarmSelect = ({ farms, value, onChange }: { farms: Farm[]; value: string; onChange: (id: string) => void }) => (
  <div className="w-full sm:w-52"><Select value={value} onChange={(e) => onChange(e.target.value)}>{farms.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</Select></div>
);
export const icon = (c: string) => /clear/i.test(c) ? "☀️" : /partly/i.test(c) ? "⛅" : /rain|drizzle|shower/i.test(c) ? "🌧️" : /thunder/i.test(c) ? "⛈️" : /fog/i.test(c) ? "🌫️" : "☁️";
export const day = (d: string) => new Date(d).toLocaleDateString("en", { weekday: "short" });

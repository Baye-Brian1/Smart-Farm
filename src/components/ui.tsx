import type { ReactNode, ComponentProps } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card as ShCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Risk } from "@/store";

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <ShCard className={cn("gap-0 p-4", className)}>{children}</ShCard>
);
export const Title = ({ children, action }: { children: ReactNode; action?: ReactNode }) => (
  <div className="mb-4 flex items-center justify-between"><h1 className="text-xl font-semibold">{children}</h1>{action}</div>
);
export const Btn = ({ children, onClick, type = "button", className = "" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit"; className?: string }) => (
  <Button type={type} onClick={onClick} className={cn("bg-green-800 text-white hover:bg-green-900", className)}>{children}</Button>
);
const tone: Record<Risk, string> = { Low: "bg-green-100 text-green-800", Moderate: "bg-amber-100 text-amber-800", High: "bg-red-100 text-red-800" };
export const RiskBadge = ({ level }: { level: Risk }) => <Badge variant="secondary" className={tone[level]}>{level} Risk</Badge>;
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
export const icon = (c: string) => /clear/i.test(c) ? "☀️" : /partly/i.test(c) ? "⛅" : /rain|drizzle|shower/i.test(c) ? "🌧️" : /thunder/i.test(c) ? "⛈️" : /fog/i.test(c) ? "🌫️" : "☁️";
export const day = (d: string) => new Date(d).toLocaleDateString("en", { weekday: "short" });

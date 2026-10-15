import { create } from "zustand";
import type { Farm } from "@/types/farm";

export type Risk = "Low" | "Moderate" | "High";
export type FarmView = Farm & { progress: number; risk: Risk };
export interface Task { id: string; title: string; farm: string; priority: "High" | "Medium"; due: string; done: boolean }

const farms: FarmView[] = [
  { id: "1", name: "My Maize Farm", locationName: "Bamenda, Northwest", coordinates: { latitude: 5.9631, longitude: 10.1591 }, crop: "Maize", areaHectares: 2.4, plantingDate: "2026-06-12", progress: 78, risk: "Moderate" },
  { id: "2", name: "Rice Field", locationName: "Mbouda, West", coordinates: { latitude: 5.6281, longitude: 10.2536 }, crop: "Rice", areaHectares: 1.6, plantingDate: "2026-05-20", progress: 54, risk: "Low" },
  { id: "3", name: "Vegetable Garden", locationName: "Bafoussam, West", coordinates: { latitude: 5.4737, longitude: 10.4179 }, crop: "Tomato", areaHectares: 0.5, plantingDate: "2026-07-01", progress: 32, risk: "Low" },
];
const tasks: Task[] = [
  { id: "t1", title: "Check soil moisture", farm: "My Maize Farm", priority: "High", due: "Today", done: false },
  { id: "t2", title: "Inspect maize leaves", farm: "My Maize Farm", priority: "Medium", due: "Today", done: false },
  { id: "t3", title: "Apply organic fertilizer", farm: "My Maize Farm", priority: "Medium", due: "Today", done: true },
  { id: "t4", title: "Irrigation", farm: "My Farm", priority: "Medium", due: "Tomorrow", done: false },
  { id: "t5", title: "Weeding", farm: "Rice Field", priority: "Medium", due: "Aug 12", done: false },
];

interface S { farms: FarmView[]; tasks: Task[]; toggleTask: (id: string) => void; addFarm: (f: Omit<FarmView, "id">) => void }
export const useStore = create<S>((set) => ({
  farms, tasks,
  toggleTask: (id) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
  addFarm: (f) => set((s) => ({ farms: [...s.farms, { ...f, id: crypto.randomUUID() }] })),
}));

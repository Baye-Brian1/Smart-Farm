import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Farm } from "@/types/farm";

export interface Profile { name: string; email: string; phone: string; location: string }
export interface Task { id: string; title: string; farmId: string; priority: "High" | "Medium" | "Low"; dueDate: string; done: boolean }
export interface Observation { id: string; title: string; farmId: string; category: string; severity: "Low" | "Medium" | "High"; note: string; date: string }

interface S {
  accounts: Record<string, { profile: Profile; hash: string }>;
  session: Profile | null;
  farms: Farm[]; tasks: Task[]; observations: Observation[]; readIds: string[];
  register: (p: Profile, hash: string) => string;
  login: (email: string, hash: string) => boolean;
  logout: () => void;
  updateProfile: (p: Profile) => void;
  addFarm: (f: Farm) => void; removeFarm: (id: string) => void;
  addTask: (t: Task) => void; toggleTask: (id: string) => void; removeTask: (id: string) => void;
  addObservation: (o: Observation) => void; removeObservation: (id: string) => void;
  markRead: (ids: string[]) => void;
}

export const useStore = create<S>()(
  persist(
    (set, get) => ({
      accounts: {}, session: null, farms: [], tasks: [], observations: [], readIds: [],
      register: (p, hash) => {
        const key = p.email.toLowerCase();
        if (get().accounts[key]) return "An account with this email already exists.";
        set((s) => ({ accounts: { ...s.accounts, [key]: { profile: p, hash } }, session: p }));
        return "";
      },
      login: (email, hash) => {
        const a = get().accounts[email.toLowerCase()];
        if (!a || a.hash !== hash) return false;
        set({ session: a.profile });
        return true;
      },
      logout: () => set({ session: null }),
      updateProfile: (p) => set((s) => ({ session: p, accounts: { ...s.accounts, [p.email.toLowerCase()]: { ...s.accounts[p.email.toLowerCase()], profile: p } } })),
      addFarm: (f) => set((s) => ({ farms: [...s.farms, f] })),
      removeFarm: (id) => set((s) => ({ farms: s.farms.filter((f) => f.id !== id), tasks: s.tasks.filter((t) => t.farmId !== id), observations: s.observations.filter((o) => o.farmId !== id) })),
      addTask: (t) => set((s) => ({ tasks: [t, ...s.tasks] })),
      toggleTask: (id) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
      removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      addObservation: (o) => set((s) => ({ observations: [o, ...s.observations] })),
      removeObservation: (id) => set((s) => ({ observations: s.observations.filter((o) => o.id !== id) })),
      markRead: (ids) => set((s) => ({ readIds: Array.from(new Set([...s.readIds, ...ids])) })),
    }),
    { name: "smartfarm" }
  )
);

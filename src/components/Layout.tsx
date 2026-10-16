import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LayoutDashboard, Sprout, CloudSun, TriangleAlert, ListChecks, Eye, MapPin, ChartLine, Bell, Settings, LogOut, Leaf, Menu, X } from "lucide-react";
import { useStore } from "@/store";

const nav = [
  ["/app", "Dashboard", LayoutDashboard], ["/app/farms", "My Farms", Sprout], ["/app/weather", "Weather", CloudSun],
  ["/app/risk", "Risk & Alerts", TriangleAlert], ["/app/tasks", "Tasks", ListChecks], ["/app/observations", "Observations", Eye],
  ["/app/map", "Maps", MapPin], ["/app/analytics", "Analytics", ChartLine], ["/app/notifications", "Notifications", Bell], ["/app/settings", "Settings", Settings],
] as const;

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useStore((s) => s.session);
  const logout = useStore((s) => s.logout);
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 md:flex">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-white px-4 md:hidden">
        <div className="flex items-center gap-2 font-bold text-green-800"><Leaf size={18} />ClimateSmart</div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="app-navigation"
          className="grid h-10 w-10 place-items-center rounded-md text-neutral-700 hover:bg-neutral-100"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      <aside className={`fixed inset-x-0 top-14 z-10 flex max-h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto border-b bg-white p-3 transition-[transform,visibility] md:visible md:sticky md:top-0 md:h-screen md:max-h-none md:w-56 md:shrink-0 md:translate-y-0 md:border-b-0 md:border-r ${open ? "visible translate-y-0" : "invisible -translate-y-full"}`}>
        <div className="mb-6 hidden items-center gap-1 px-2 text-lg font-bold text-green-800 md:flex"><Leaf size={18} />ClimateSmart</div>
        <nav id="app-navigation" aria-label="App navigation" className="flex flex-1 flex-col gap-1">
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === "/app"} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition-colors ${isActive ? "bg-green-800 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>
              <Icon size={16} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="mb-2 truncate px-3 text-xs text-neutral-500">{user?.name}<br />{user?.email}</div>
        <button onClick={() => { setOpen(false); logout(); navigate("/"); }} className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-neutral-600 hover:bg-neutral-100"><LogOut size={16} />Logout</button>
      </aside>
      <main className="min-w-0 px-4 py-5 sm:p-6">
        <motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}><Outlet /></motion.div>
      </main>
    </div>
  );
}

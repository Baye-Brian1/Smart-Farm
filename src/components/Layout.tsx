import { NavLink, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LayoutDashboard, Sprout, CloudSun, TriangleAlert, ListChecks, Eye, MapPin, ChartLine, Bell, Settings, LogOut, Leaf } from "lucide-react";
import { useStore } from "@/store";

const nav = [
  ["/app", "Dashboard", LayoutDashboard], ["/app/farms", "My Farms", Sprout], ["/app/weather", "Weather", CloudSun],
  ["/app/risk", "Risk & Alerts", TriangleAlert], ["/app/tasks", "Tasks", ListChecks], ["/app/observations", "Observations", Eye],
  ["/app/map", "Maps", MapPin], ["/app/analytics", "Analytics", ChartLine], ["/app/notifications", "Notifications", Bell], ["/app/settings", "Settings", Settings],
] as const;

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useStore((s) => s.session);
  const logout = useStore((s) => s.logout);
  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r bg-white p-3">
        <div className="mb-6 flex items-center gap-1 px-2 text-lg font-bold text-green-800"><Leaf size={18} />ClimateSmart</div>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === "/app"} className={({ isActive }) => `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${isActive ? "bg-green-800 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>
              <Icon size={16} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="mb-2 truncate px-3 text-xs text-neutral-500">{user?.name}<br />{user?.email}</div>
        <button onClick={() => { logout(); navigate("/"); }} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"><LogOut size={16} />Logout</button>
        <Link to="/" className="sr-only">Home</Link>
      </aside>
      <main className="min-w-0 flex-1 p-6">
        <motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}><Outlet /></motion.div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

const links = [["/", "Home"], ["/features", "Features"], ["/about", "About"], ["/contact", "Contact"]] as const;
const pill = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-1.5 text-sm transition-colors ${isActive ? "bg-green-100 text-green-900" : "text-stone-600 hover:text-green-900"}`;

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2 font-bold text-green-900">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-green-800 text-white"><Leaf size={18} /></span>ClimateSmart Farm
          </Link>
          <nav className="hidden items-center gap-1 md:flex">{links.map(([to, l]) => <NavLink key={to} to={to} end className={pill}>{l}</NavLink>)}</nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-50">Log in</Link>
            <Link to="/register" className="rounded-full bg-green-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-900">Get started</Link>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <div className="flex flex-col gap-1 border-t bg-white px-5 py-3 md:hidden">
            {links.map(([to, l]) => <NavLink key={to} to={to} end className={pill} onClick={() => setOpen(false)}>{l}</NavLink>)}
            <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-1.5 text-sm">Log in</Link>
            <Link to="/register" onClick={() => setOpen(false)} className="rounded-full bg-green-800 px-4 py-2 text-center text-sm text-white">Get started</Link>
          </div>
        )}
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-stone-500 md:flex-row">
          <span className="flex items-center gap-2 font-medium text-green-900"><Leaf size={16} />ClimateSmart Farm</span>
          <div className="flex gap-5">{links.map(([to, l]) => <Link key={to} to={to} className="hover:text-green-900">{l}</Link>)}<Link to="/login" className="hover:text-green-900">Log in</Link></div>
          <span>© {new Date().getFullYear()} ClimateSmart Farm</span>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

const links = ["/", "/#features", "/#how-it-works", "/#about"] as const;
const labels = ["Home", "Features", "How it works", "About"] as const;
const pill =
  "rounded-full px-3 py-2 text-sm transition-colors hover:bg-green-50 hover:text-green-900";

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const navigation = links.map((to, index) => (
    <Link
      key={to}
      to={to}
      className={pill}
      onClick={() => setOpen(false)}
    >
      {labels[index]}
    </Link>
  ));

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-green-900"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-green-800 text-white">
              <Leaf size={18} />
            </span>
            ClimateSmart Farm
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            {navigation}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-50"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-green-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-900"
            >
              Get started
            </Link>
          </div>
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-green-900 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col gap-1 border-t bg-white px-4 py-3 md:hidden">
            {navigation}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 text-sm"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="rounded-full bg-green-800 px-4 py-2 text-center text-sm text-white"
            >
              Get started
            </Link>
          </nav>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-sm text-stone-500 sm:px-5 md:flex-row md:text-left">
          <span className="flex items-center gap-2 font-medium text-green-900">
            <Leaf size={16} />
            ClimateSmart Farm
          </span>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {links.map((to, index) => (
              <Link key={to} to={to} className="hover:text-green-900">
                {labels[index]}
              </Link>
            ))}
            <Link to="/login" className="hover:text-green-900">
              Log in
            </Link>
          </div>
          <span>© {new Date().getFullYear()} ClimateSmart Farm</span>
        </div>
      </footer>
    </div>
  );
}

import { Link } from "react-router-dom";
import { CloudSun, BellRing, Sprout, Lightbulb } from "lucide-react";

const feats = [
  [CloudSun, "Real-time Weather", "Live weather and 7-day forecast for your location"],
  [BellRing, "Smart Alerts", "Get notified about risks before they impact you"],
  [Sprout, "Farm Insights", "Understand your crops and environment better"],
  [Lightbulb, "Actionable Recommendations", "Simple suggestions to help you take the right action"],
] as const;

export default function Landing() {
  return (
    <div>
      <header className="flex items-center justify-between px-8 py-4">
        <b className="text-green-800">ClimateSmart Farm</b>
        <Link to="/login" className="rounded-md bg-green-800 px-4 py-2 text-sm text-white">Get Started</Link>
      </header>
      <section className="bg-gradient-to-br from-green-50 to-green-200 px-8 py-24">
        <h1 className="max-w-xl text-5xl font-bold leading-tight">Smarter farming starts with <span className="text-green-800">better information.</span></h1>
        <p className="mt-4 max-w-md text-neutral-700">Monitor your farms, understand environmental conditions and make better decisions with climate-aware agricultural intelligence.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/register" className="rounded-md bg-green-800 px-5 py-2 text-white">Get Started</Link>
          <Link to="/app" className="rounded-md border border-green-800 bg-white px-5 py-2 text-green-800">Explore Platform</Link>
        </div>
      </section>
      <section className="grid gap-6 bg-green-900 px-8 py-8 text-white md:grid-cols-4">
        {feats.map(([Icon, t, d]) => (
          <div key={t} className="flex gap-3"><Icon className="shrink-0 text-amber-300" /><div><b className="text-sm">{t}</b><p className="text-xs text-green-100">{d}</p></div></div>
        ))}
      </section>
    </div>
  );
}

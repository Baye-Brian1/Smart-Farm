import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  BellRing,
  ChartLine,
  CloudSun,
  Droplets,
  MapPin,
  ShieldCheck,
  Sprout,
  Thermometer,
} from "lucide-react";

const Reveal = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const features = [
  [
    CloudSun,
    "Live weather",
    "Current conditions and a 7-day forecast for every farm location.",
  ],
  [
    ShieldCheck,
    "Risk scoring",
    "Drought, heavy rain, heat and disease risk, scored from real data.",
  ],
  [
    BellRing,
    "Smart alerts",
    "Be warned about storms, heat and dry soil before they hurt your crop.",
  ],
  [
    Sprout,
    "Crop tracking",
    "Follow growth stage and days to harvest from your planting date.",
  ],
  [
    ChartLine,
    "Trends",
    "See rainfall, temperature and progress over the last 7 to 90 days.",
  ],
  [
    MapPin,
    "All your farms",
    "Manage several farms and compare their conditions in one place.",
  ],
] as const;

const steps = [
  ["Add your farm", "Search your town, pick your crop and planting date."],
  [
    "We read the weather",
    "Live forecasts and soil data load for your exact location.",
  ],
  ["Act with confidence", "Get clear risk levels and a daily recommendation."],
] as const;

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-stone-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-5 sm:py-20 md:grid-cols-2 md:gap-12 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-900">
              Climate-aware farming
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Farm with the weather,{" "}
              <span className="text-green-800">not against it.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-stone-600 sm:text-lg">
              ClimateSmart Farm turns live forecasts, soil conditions and your
              crop calendar into clear risk alerts and daily advice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 font-medium text-white transition-colors hover:bg-green-900"
              >
                Get started free <ArrowRight size={16} />
              </Link>
              <Link
                to="/features"
                className="rounded-full border border-green-800 px-6 py-3 font-medium text-green-900 transition-colors hover:bg-green-50"
              >
                See features
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl border bg-white p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-500">Sample farm</div>
                  <b>Maize Field</b>
                </div>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                  Moderate risk
                </span>
              </div>
              <div className="my-4 flex items-end gap-3">
                <span className="text-5xl">⛅</span>
                <span className="text-5xl font-semibold">24°C</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  [Droplets, "Humidity", "78%"],
                  [Thermometer, "Soil", "21%"],
                  [CloudSun, "Rain", "12 mm"],
                ].map(([Icon, l, v]) => {
                  const I = Icon as typeof Droplets;
                  return (
                    <div
                      key={l as string}
                      className="rounded-xl bg-green-50 p-2"
                    >
                      <I className="mx-auto mb-1 text-green-800" size={16} />
                      {l as string}
                      <b className="block text-sm">{v as string}</b>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-xs text-stone-500">
                Crop progress · Flowering
              </div>
              <div className="mt-1 h-2 rounded bg-stone-200">
                <div className="h-2 w-3/4 rounded bg-green-700" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border bg-white px-4 py-3 text-sm shadow-lg md:block">
              <BellRing className="mr-2 inline text-amber-600" size={16} />
              Heavy rain expected tomorrow
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-5 sm:py-20"
      >
        <Reveal>
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Everything you need to decide with confidence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-stone-600">
            One dashboard for weather, risk, tasks and trends.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-100 text-green-800">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-stone-600">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-20 bg-green-900 text-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20">
          <Reveal>
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              How it works
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 font-bold text-green-900">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                  <p className="mt-1 text-green-100">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-5 sm:py-20"
      >
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-green-800 to-green-950 px-5 py-12 text-center text-white sm:px-6 sm:py-14">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to farm smarter?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-green-100">
              Create a free account and add your first farm in under a minute.
            </p>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-medium text-green-950 transition-colors hover:bg-lime-200"
            >
              Create your account <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

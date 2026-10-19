import type { ReactNode } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bell,
  CloudSun,
  Droplets,
  Leaf,
  MapPin,
  Sprout,
  CloudRain,
  CheckCircle2,
  ArrowUpRight,
  ChartLine,
  ShieldCheck,
  BellRing,
} from "lucide-react";
import hero from "@/images/A4.jfif";

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
  {
    title: "Add your farm",
    desc: "Search your town, pick your crop, and input your planting date.",
    bg: "bg-blue-50 text-blue-600",
  },
  {
    title: "Analyze the weather",
    desc: "Live forecasts and historical climate metrics load for your exact coordination.",
    bg: "bg-teal-50 text-teal-600",
  },
  {
    title: "Monitor soil data",
    desc: "Track real-time moisture conditions and evaporation levels across your plots.",
    bg: "bg-amber-50 text-amber-600",
  },
  {
    title: "Act with confidence",
    desc: "Receive calculated risk alerts and highly tailored daily field recommendations.",
    bg: "bg-emerald-50 text-emerald-600",
  },
] as const;

export default function Home() {
  return (
    <div>
      <section className="relative isolate min-h-[720px] overflow-hidden bg-green-950 sm:min-h-[760px]">
        <img
          src={hero}
          alt="Healthy green maize field in the countryside"
          className="absolute inset-0 -z-20 h-full w-full object-fill object-center"
        />

        {/* Dark gradient for readable text */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-950/95 via-green-950/80 to-green-950/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-950/50 via-transparent to-green-950/10" />

        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-4 py-10 sm:px-5 sm:py-20 md:min-h-[760px] md:grid-cols-2 md:gap-10">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-green-800/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-lime-200 shadow-sm backdrop-blur-md sm:text-sm">
              <Leaf size={16} />
              Climate-aware farming
            </div>

            {/* Main heading */}
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-[68px]">
              Make better
              <br />{" "}
              <span className="text-lime-300">farming decisions</span>{" "}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-7 text-green-50/90 sm:text-lg sm:leading-8">
              Weather insights, crop tracking and timely recommendations —
              tailored to your farm in Cameroon.
            </p>

            {/* Call-to-action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/register"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-[9px]
                 bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-950/20
                  transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-500 
                  hover:shadow-xl"
              >
                Create your farm
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/features"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[9px] border
                 border-white/45 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm 
                 transition-all duration-200 hover:border-white hover:bg-white/10 "
              >
                Explore features
              </Link>
            </div>

            {/* Value propositions */}
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-5 border-t border-white/20 pt-7 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-lime-300">
                  <CloudSun size={23} strokeWidth={1.7} />
                </div>
                <p className="text-sm leading-5 text-white/90">
                  Local weather
                  <span className="block text-white/60">Insights</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-lime-300">
                  <Sprout size={23} strokeWidth={1.7} />
                </div>
                <p className="text-sm leading-5 text-white/90">
                  Crop-stage
                  <span className="block text-white/60">Guidance</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-lime-300">
                  <Bell size={22} strokeWidth={1.7} />
                </div>
                <p className="text-sm leading-5 text-white/90">
                  Practical daily
                  <span className="block text-white/60">Advice</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[560px] md:ml-auto"
          >
            {/* Decorative glow */}
            <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-lime-300/10 blur-3xl" />

            <div className="rounded-2xl border border-white/70 bg-white p-5 shadow-2xl shadow-green-950/30 sm:rounded-3xl sm:p-7">
              {/* Farm header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Sprout size={25} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                      My Farm
                    </h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin size={14} />
                      Location
                    </p>
                  </div>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Weather watch
                </span>
              </div>

              {/* Current weather */}
              <div className="mt-7 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                  <CloudSun size={43} strokeWidth={1.3} />
                </div>

                <div>
                  <p className="text-4xl font-bold tracking-tight text-slate-900">
                    24°C
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Partly cloudy</p>
                </div>
              </div>

              {/* Weather metrics */}
              <div className="mt-6 grid grid-cols-3 divide-x divide-green-100 rounded-2xl bg-green-50/80 py-4">
                <div className="px-2 text-center sm:px-3">
                  <Droplets size={20} className="mx-auto text-green-700" />
                  <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                    Humidity
                  </p>
                  <p className="mt-1 font-bold text-slate-900">78%</p>
                </div>

                <div className="px-2 text-center sm:px-3">
                  <CloudRain size={20} className="mx-auto text-green-700" />
                  <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                    Rainfall
                  </p>
                  <p className="mt-1 font-bold text-slate-900">12 mm</p>
                </div>

                <div className="px-2 text-center sm:px-3">
                  <Sprout size={20} className="mx-auto text-green-700" />
                  <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                    Crop stage
                  </p>
                  <p className="mt-1 font-bold text-slate-900">Flowering</p>
                </div>
              </div>

              {/* Crop progress */}
              <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Crop progress
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Estimated growth progress
                    </p>
                  </div>

                  <span className="text-sm font-bold text-green-700">62%</span>
                </div>

                <div
                  className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label="Estimated crop progress"
                  aria-valuenow={62}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-green-600"
                  />
                </div>
              </div>

              {/* Recommendation */}
              <div className="mt-6 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-white">
                    <Leaf size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-700" />
                      <p className="text-sm font-bold text-green-900">
                        Today&apos;s recommendation
                      </p>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Rain may be approaching. Check field drainage and avoid
                      unnecessary irrigation when rainfall is sufficient.
                    </p>
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="mt-1 shrink-0 text-green-700"
                  />
                </div>
              </div>

              {/* Sample data disclosure */}
              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                Illustrative preview · Live data appears after farm setup
              </p>
            </div>

            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:flex sm:left-8"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Bell size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Weather awareness
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Stay informed about changing conditions
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-5 sm:py-20"
      >
        <Reveal>
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-[44px]">
            Everything you need to decide <br /> with confidence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-xl text-stone-600">
            One dashboard for weather, risk, tasks and trends.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border bg-white p-7 transition-shadow hover:shadow-md">
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

      <section id="how-it-works" className="scroll-mt-20 bg-white text-black">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20">
          <Reveal>
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              How it works
            </h2>
          </Reveal>

          <div className="relative mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-green-400 -translate-x-1/2 hidden md:block"></div>
            {steps.map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <React.Fragment>
                  {isEven && <div className="hidden md:block order-0" />}
                  <div
                    className={`w-full ${isEven ? "md:translate-y-12" : ""}`}
                  >
                    <Reveal delay={i * 0.1}>
                      <div className="min-h-140px rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex gap-4 transition-shadow hover:shadow-md">
                        <span className="flex p-4 h-10 w-10 rounded-full text-md text-white bg-green-600 justify-center items-center">
                          {i + 1}
                        </span>
                        <div>
                          <p className="mt-1 font-semibold text-gray-900">{step.title}</p>
                          <p className="mt-1 text-sm text-stone-500">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </React.Fragment>
              );
            })}
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

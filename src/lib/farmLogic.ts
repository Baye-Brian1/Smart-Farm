import type { Farm } from "@/types/farm";
import type { WeatherReport } from "@/types/weather";

export type RiskLevel = "Low" | "Moderate" | "High";
export interface Alert {
  key: string;
  title: string;
  detail: string;
  severity: "info" | "warning" | "danger";
}

// Typical days from planting to harvest
export const CROPS: Record<string, number> = {
  Maize: 120,
  Rice: 130,
  Tomato: 90,
  Cassava: 270,
  Beans: 75,
  Plantain: 300,
  Yam: 240,
  Groundnut: 110,
};
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
export const today = () => new Date().toISOString().slice(0, 10);
export const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

export function progressOn(f: Farm, date: string) {
  const total = CROPS[f.crop] ?? 120;
  return clamp(
    ((new Date(date).getTime() - new Date(f.plantingDate).getTime()) /
      864e5 /
      total) *
      100,
  );
}
export function cropProgress(f: Farm) {
  const total = CROPS[f.crop] ?? 120;
  const pct = progressOn(f, today());
  const stage =
    pct < 15
      ? "Germination"
      : pct < 45
        ? "Vegetative"
        : pct < 75
          ? "Flowering"
          : pct < 100
            ? "Ripening"
            : "Harvest ready";
  return {
    pct,
    stage,
    daysLeft: Math.max(0, Math.round(total * (1 - pct / 100))),
  };
}
export const levelOf = (score: number): RiskLevel =>
  score < 35 ? "Low" : score < 65 ? "Moderate" : "High";
export const dayRisk = (temp: number, rain: number) =>
  Math.max(clamp((temp - 28) * 10), clamp(rain * 2));

export function computeRisk(r: WeatherReport) {
  const rain7 = r.daily.reduce((s, d) => s + d.rainfallSum, 0);
  const maxRain = Math.max(...r.daily.map((d) => d.rainfallSum));
  const maxTemp = Math.max(...r.daily.map((d) => d.tempMax));
  const { soilMoisture: soil, humidity: hum, temperature } = r.current;
  const breakdown = [
    {
      label: "Drought Risk",
      value: clamp(
        0.6 * ((30 - soil) / 30) * 100 + 0.4 * ((15 - rain7) / 15) * 100,
      ),
    },
    { label: "Heavy Rain Risk", value: clamp(maxRain * 2) },
    { label: "Heat Stress Risk", value: clamp((maxTemp - 28) * 10) },
    { label: "Pest & Disease Risk", value: clamp((hum - 60) * 2.5) },
  ];
  const v = breakdown.map((b) => b.value);
  const score = Math.round(
    0.5 * Math.max(...v) + (0.5 * v.reduce((a, b) => a + b, 0)) / v.length,
  );
  const alerts: Alert[] = [];
  for (const d of r.daily) {
    if (d.rainfallSum >= 25)
      alerts.push({
        key: `rain-${d.date}`,
        title: "Heavy rainfall expected",
        detail: `${d.rainfallSum} mm forecast on ${fmtDate(d.date)}`,
        severity: d.rainfallSum >= 50 ? "danger" : "warning",
      });
    if (d.tempMax >= 34)
      alerts.push({
        key: `heat-${d.date}`,
        title: "High temperature alert",
        detail: `Up to ${d.tempMax}°C on ${fmtDate(d.date)}`,
        severity: "warning",
      });
  }
  if (soil < 15)
    alerts.push({
      key: "soil",
      title: "Soil moisture low",
      detail: `Surface soil moisture is ${soil}%`,
      severity: "warning",
    });
  if (hum >= 85 && temperature >= 18 && temperature <= 30)
    alerts.push({
      key: "humid",
      title: "Fungal disease conditions",
      detail: `Humidity at ${hum}% with mild temperatures`,
      severity: "info",
    });
  return {
    score,
    level: levelOf(score),
    breakdown,
    alerts: alerts.slice(0, 4),
  };
}

export function recommend(r: WeatherReport) {
  const rain2 = r.daily.slice(0, 2).reduce((s, d) => s + d.rainfallSum, 0);
  if (rain2 >= 10)
    return `About ${Math.round(rain2)} mm of rain is expected over the next 48 hours. Consider postponing irrigation and checking drainage.`;
  if (r.daily[0] && r.daily[0].tempMax >= 33)
    return "It will be hot today. Irrigate early morning or late evening to reduce water loss.";
  if (r.current.soilMoisture < 15)
    return "Surface soil is dry and little rain is due. Plan irrigation today.";
  return "Conditions look favourable. Continue your regular field checks.";
}

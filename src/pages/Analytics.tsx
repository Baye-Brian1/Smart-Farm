import type { ReactElement } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, Title } from "@/components/ui";

const data = Array.from({ length: 30 }, (_, i) => ({ d: i + 1, rain: Math.round(20 + 15 * Math.sin(i / 3) + (i % 5) * 4), temp: Math.round(22 + 4 * Math.sin(i / 4)), crop: Math.round(i * 2.6), risk: Math.round(40 + 25 * Math.sin(i / 5)) }));

function Chart({ title, children }: { title: string; children: ReactElement }) {
  return <Card><h2 className="mb-2 font-medium">{title}</h2><div className="h-56"><ResponsiveContainer>{children}</ResponsiveContainer></div></Card>;
}
export default function Analytics() {
  return (
    <div>
      <Title>Analytics</Title>
      <div className="grid gap-4 md:grid-cols-2">
        <Chart title="Rainfall (mm) · 30-day trend"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="d" /><YAxis /><Tooltip /><Line dataKey="rain" stroke="#2563eb" dot={false} /></LineChart></Chart>
        <Chart title="Temperature (°C) · 30-day trend"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="d" /><YAxis /><Tooltip /><Line dataKey="temp" stroke="#dc2626" dot={false} /></LineChart></Chart>
        <Chart title="Crop Progress Over Time"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="d" /><YAxis /><Tooltip /><Line dataKey="crop" stroke="#166534" dot={false} /></LineChart></Chart>
        <Chart title="Risk Level Over Time"><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="d" /><YAxis /><Tooltip /><Area dataKey="risk" stroke="#d97706" fill="#fde68a" /></AreaChart></Chart>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "@/store";
import Layout from "@/components/Layout";
import PublicLayout from "@/components/public/PublicLayout";
import Home from "@/pages/public/Home";
import { Login, Register } from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import { Farms, FarmDetail } from "@/pages/Farms";
import Weather from "@/pages/Weather";
import Risk from "@/pages/Risk";
import Tasks from "@/pages/Tasks";
import Observations from "@/pages/Observations";
import Notifications from "@/pages/Notifications";
import MapView from "@/pages/MapView";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";

function RequireAuth({ children }: { children: ReactNode }) {
  const session = useStore((s) => s.session);
  return session ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<RequireAuth><Layout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="farms" element={<Farms />} />
          <Route path="farms/:id" element={<FarmDetail />} />
          <Route path="weather" element={<Weather />} />
          <Route path="risk" element={<Risk />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="observations" element={<Observations />} />
          <Route path="map" element={<MapView />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

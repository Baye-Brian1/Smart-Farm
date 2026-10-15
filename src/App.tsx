import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import { Login, Register } from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import { Farms, FarmDetail } from "@/pages/Farms";
import Weather from "@/pages/Weather";
import Risk from "@/pages/Risk";
import { Tasks, Observations, Notifications } from "@/pages/Lists";
import MapView from "@/pages/MapView";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<Layout />}>
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
      </Routes>
    </BrowserRouter>
  );
}

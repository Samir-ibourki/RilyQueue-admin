import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
        background: "#f0f4f8",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar />
        <main style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
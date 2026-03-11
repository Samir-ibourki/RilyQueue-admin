import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useThemeStore } from "../store/useTheme";
import { ConfigProvider, theme } from "antd";

export default function Layout() {
  const { darkMode } = useThemeStore();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6', 
          borderRadius: 8,
        },
      }}
    >
      <div
        className={darkMode ? 'dark' : ''}
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "'Nunito', 'Segoe UI', sans-serif",
          overflow: "hidden",
        }}
      >
        <div className="flex w-full h-full bg-[#f0f4f8] dark:bg-slate-900 text-slate-800 dark:text-slate-100">
          <Sidebar />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-7">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
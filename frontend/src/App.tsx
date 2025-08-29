import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { ThemeToggle } from "./components/ThemeToggle";
import { FarmBackground } from "./components/FarmBackground";
import { UserInputPanel } from "./components/UserInputPanel";
import { WeatherModule } from "./components/WeatherModule";
import { IrrigationEngine } from "./components/IrrigationEngine";
import { SchedulePanel } from "./components/SchedulePanel";
import { AnalyticsSection } from "./components/AnalyticsSection";
import { AlertsTicker } from "./components/AlertsTicker";
import { GamificationPanel } from "./components/GamificationPanel";
import SettingsPanel from "./components/SettingsPanel";
import "./App.css";

export interface FarmData {
  cropType: string;
  soilType: string;
  farmArea: number;
  areaUnit: "acre" | "hectare";
  season: string;
}

function App() {
  const [farmData, setFarmData] = useState<FarmData>({
    cropType: "",
    soilType: "",
    farmArea: 5,
    areaUnit: "hectare",
    season: "",
  });

  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("light");

  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return true;
    return false;
  });

  const [showSettings, setShowSettings] = useState(false);

  const isResizing = useRef(false);

  // Sidebar resize handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 640) newWidth = 640;
    setSidebarWidth(newWidth);
  };
  const onMouseUp = () => {
    isResizing.current = false;
  };
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Sync dark mode based on theme choice or system preference
  useEffect(() => {
    if (theme === "auto") {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setDarkMode(true);
        localStorage.removeItem("theme");
      } else {
        setDarkMode(false);
        localStorage.removeItem("theme");
      }
    } else if (theme === "dark") {
      setDarkMode(true);
      localStorage.setItem("theme", "dark");
    } else {
      setDarkMode(false);
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } min-h-screen transition-colors duration-500 app-bg relative overflow-hidden`}
    >
      <FarmBackground />

      <div className="relative z-10">
        <Navbar
          language={language}
          setLanguage={setLanguage}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          onSettingsOpen={openSettings}
        />

        <div className="flex flex-col lg:flex-row min-h-screen">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ width: sidebarWidth }}
            className="lg:fixed lg:left-0 lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto sidebar-bg glass flex flex-col relative"
          >
            <UserInputPanel
              farmData={farmData}
              setFarmData={setFarmData}
              language={language}
              darkMode={darkMode}
            />
            <div
              onMouseDown={onMouseDown}
              className="absolute inset-y-0 right-0 w-2 cursor-col-resize bg-transparent z-20"
              aria-label="Resize sidebar"
              role="separator"
            />
          </motion.div>

          <main
            className="flex-1 p-4 lg:p-6 space-y-6"
            style={{ marginLeft: sidebarWidth }}
          >
            <motion.div className="alerts-row">
              <AlertsTicker language={language} darkMode={darkMode} />
            </motion.div>

            <motion.div>
              <WeatherModule language={language} darkMode={darkMode} />
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <motion.div className="xl:col-span-2">
                <IrrigationEngine
                  farmData={farmData}
                  language={language}
                  darkMode={darkMode}
                />
              </motion.div>

              <motion.div>
                <SchedulePanel language={language} darkMode={darkMode} />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <motion.div className="xl:col-span-3">
                <AnalyticsSection language={language} darkMode={darkMode} />
              </motion.div>

              <motion.div>
                <GamificationPanel language={language} darkMode={darkMode} />
              </motion.div>
            </div>
          </main>

          {showSettings && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                  aria-label="Close settings"
                  onClick={closeSettings}
                  className="absolute top-2 right-2 text-2xl font-bold text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                >
                  &times;
                </button>
                <SettingsPanel
                  language={language}
                  setLanguage={setLanguage}
                  units={units}
                  setUnits={setUnits}
                  theme={theme}
                  setTheme={setTheme}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
import React from "react";

interface SettingsPanelProps {
  language: string;
  setLanguage: (value: string) => void;
  units: string;
  setUnits: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
}

export default function SettingsPanel({
  language,
  setLanguage,
  units,
  setUnits,
  theme,
  setTheme,
}: SettingsPanelProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-emerald-500 dark:text-emerald-300 mb-4">
        Settings
      </h2>

      <label className="block mb-4">
        <span className="text-gray-800 dark:text-gray-200">Language</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full mt-1 p-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-800 dark:text-gray-200">Units</span>
        <select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className="w-full mt-1 p-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="metric">Metric (°C, mm, liters)</option>
          <option value="imperial">Imperial (°F, inches, gallons)</option>
        </select>
      </label>

      <label className="block">
        <span className="text-gray-800 dark:text-gray-200">Theme</span>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full mt-1 p-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </label>
    </div>
  );
}




// // src/components/SettingsPanel.tsx
// import { useState } from "react";

// export default function SettingsPanel() {
//   const [language, setLanguage] = useState("en");
//   const [units, setUnits] = useState("metric");
//   const [theme, setTheme] = useState("dark");

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-lg mx-auto">
//       <h2 className="text-xl font-bold text-emerald-500 dark:text-emerald-300 mb-4">⚙️ Settings</h2>

//       {/* Language */}
//       <label className="block mb-3">
//         <span className="text-gray-800 dark:text-gray-200">🌐 Language</span>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="w-full mt-1 p-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
//         >
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//         </select>
//       </label>

//       {/* Units */}
//       <label className="block mb-3">
//         <span className="text-gray-800 dark:text-gray-200">📏 Units</span>
//         <select
//           value={units}
//           onChange={(e) => setUnits(e.target.value)}
//           className="w-full mt-1 p-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
//         >
//           <option value="metric">Metric (°C, mm, liters)</option>
//           <option value="imperial">Imperial (°F, inches, gallons)</option>
//         </select>
//       </label>

//       {/* Theme */}
//       <label className="block mb-3">
//         <span className="text-gray-800 dark:text-gray-200">🎨 Theme</span>
//         <select
//           value={theme}
//           onChange={(e) => setTheme(e.target.value)}
//           className="w-full mt-1 p-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
//         >
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//           <option value="auto">Auto</option>
//         </select>
//       </label>
//     </div>
//   );
// }
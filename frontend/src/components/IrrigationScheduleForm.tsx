// src/components/IrrigationScheduleForm.tsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function IrrigationScheduleForm() {
  const [form, setForm] = useState({
    crop: "",
    soil: "",
    area: "",
    season: "",
    date: "",
    waterAmount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✅ Irrigation scheduled for ${form.crop} on ${form.date}`);
  };

  return (
    <motion.div
      className="max-w-lg mx-auto bg-green-50/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        💧 Schedule Irrigation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Crop Type */}
        <div>
          <label className="block text-sm font-medium text-green-800">Crop Type</label>
          <select
            name="crop"
            value={form.crop}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-xl bg-green-100 text-green-900 border border-green-400 focus:ring-2 focus:ring-green-600"
            required
          >
            <option value="">Select crop</option>
            <option value="wheat">🌾 Wheat</option>
            <option value="rice">🌾 Rice</option>
            <option value="maize">🌽 Maize</option>
            <option value="sugarcane">🍬 Sugarcane</option>
          </select>
        </div>

        {/* Soil Type */}
        <div>
          <label className="block text-sm font-medium text-green-800">Soil Type</label>
          <select
            name="soil"
            value={form.soil}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-xl bg-green-100 text-green-900 border border-green-400 focus:ring-2 focus:ring-green-600"
            required
          >
            <option value="">Select soil</option>
            <option value="clay">🪨 Clay</option>
            <option value="sandy">🏝️ Sandy</option>
            <option value="loamy">🌱 Loamy</option>
          </select>
        </div>

        {/* Farm Area */}
        <div>
          <label className="block text-sm font-medium text-green-800">Farm Area (hectares)</label>
          <input
            type="number"
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Enter area"
            className="w-full mt-1 p-2 rounded-xl bg-green-100 text-green-900 border border-green-400 focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Season */}
        <div>
          <label className="block text-sm font-medium text-green-800">Season</label>
          <select
            name="season"
            value={form.season}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-xl bg-green-100 text-green-900 border border-green-400 focus:ring-2 focus:ring-green-600"
            required
          >
            <option value="">Select season</option>
            <option value="kharif">☀️ Kharif</option>
            <option value="rabi">❄️ Rabi</option>
            <option value="zaid">🌤️ Zaid</option>
          </select>
        </div>

        {/* Irrigation Date */}
        <div>
          <label className="block text-sm font-medium text-green-800">Irrigation Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-xl bg-green-100 text-green-900 border border-green-400 focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Water Amount */}
        <div>
          <label className="block text-sm font-medium text-green-800">Water Amount (liters)</label>
          <input
            type="number"
            name="waterAmount"
            value={form.waterAmount}
            onChange={handleChange}
            placeholder="e.g. 2000"
            className="w-full mt-1 p-2 rounded-xl bg-green-100 text-green-900 border border-green-400 focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg"
        >
          🚰 Schedule Irrigation
        </motion.button>
      </form>
    </motion.div>
  );
}


// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function IrrigationScheduleForm() {
//   const [form, setForm] = useState({
//     crop: "",
//     soil: "",
//     area: "",
//     season: "",
//     date: "",
//     waterAmount: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     // For number inputs, prevent negative or invalid values
//     if ((name === "area" || name === "waterAmount") && Number(value) < 0) return;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`✅ Irrigation scheduled for ${form.crop} on ${form.date}`);
//     // Optionally reset the form here if desired:
//     // setForm({ crop: "", soil: "", area: "", season: "", date: "", waterAmount: "" });
//   };

//   return (
//     <motion.div
//       className="max-w-lg mx-auto bg-black/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       role="region"
//       aria-labelledby="irrigation-form-title"
//     >
//       <h2
//         id="irrigation-form-title"
//         className="text-2xl font-extrabold text-center text-emerald-300 mb-6 select-none"
//       >
//         💧 Schedule Irrigation
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//         {/* Crop Type */}
//         <div>
//           <label htmlFor="crop" className="block text-sm font-semibold text-white mb-1">
//             Crop Type
//           </label>
//           <select
//             id="crop"
//             name="crop"
//             value={form.crop}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-gray-900/75 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
//             required
//             aria-required="true"
//             aria-invalid={form.crop === "" ? "true" : "false"}
//           >
//             <option value="">Select crop</option>
//             <option value="wheat">🌾 Wheat</option>
//             <option value="rice">🌾 Rice</option>
//             <option value="maize">🌽 Maize</option>
//             <option value="sugarcane">🍬 Sugarcane</option>
//           </select>
//         </div>

//         {/* Soil Type */}
//         <div>
//           <label htmlFor="soil" className="block text-sm font-semibold text-white mb-1">
//             Soil Type
//           </label>
//           <select
//             id="soil"
//             name="soil"
//             value={form.soil}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-gray-900/75 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
//             required
//             aria-required="true"
//             aria-invalid={form.soil === "" ? "true" : "false"}
//           >
//             <option value="">Select soil</option>
//             <option value="clay">🪨 Clay</option>
//             <option value="sandy">🏝️ Sandy</option>
//             <option value="loamy">🌱 Loamy</option>
//           </select>
//         </div>

//         {/* Farm Area */}
//         <div>
//           <label htmlFor="area" className="block text-sm font-semibold text-white mb-1">
//             Farm Area (hectares)
//           </label>
//           <input
//             id="area"
//             name="area"
//             type="number"
//             min="0.1"
//             step="0.1"
//             value={form.area}
//             onChange={handleChange}
//             placeholder="Enter area"
//             className="w-full p-3 rounded-xl bg-gray-900/75 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
//             required
//             aria-required="true"
//             aria-invalid={form.area === "" || Number(form.area) <= 0 ? "true" : "false"}
//           />
//         </div>

//         {/* Season */}
//         <div>
//           <label htmlFor="season" className="block text-sm font-semibold text-white mb-1">
//             Season
//           </label>
//           <select
//             id="season"
//             name="season"
//             value={form.season}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-gray-900/75 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
//             required
//             aria-required="true"
//             aria-invalid={form.season === "" ? "true" : "false"}
//           >
//             <option value="">Select season</option>
//             <option value="kharif">☀️ Kharif</option>
//             <option value="rabi">❄️ Rabi</option>
//             <option value="zaid">🌤️ Zaid</option>
//           </select>
//         </div>

//         {/* Irrigation Date */}
//         <div>
//           <label htmlFor="date" className="block text-sm font-semibold text-white mb-1">
//             Irrigation Date
//           </label>
//           <input
//             id="date"
//             name="date"
//             type="date"
//             value={form.date}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-gray-900/75 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
//             required
//             aria-required="true"
//             aria-invalid={form.date === "" ? "true" : "false"}
//           />
//         </div>

//         {/* Water Amount */}
//         <div>
//           <label htmlFor="waterAmount" className="block text-sm font-semibold text-white mb-1">
//             Water Amount (liters)
//           </label>
//           <input
//             id="waterAmount"
//             name="waterAmount"
//             type="number"
//             min="0"
//             step="1"
//             value={form.waterAmount}
//             onChange={handleChange}
//             placeholder="e.g. 2000"
//             className="w-full p-3 rounded-xl bg-gray-900/75 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
//             required
//             aria-required="true"
//             aria-invalid={form.waterAmount === "" || Number(form.waterAmount) < 0 ? "true" : "false"}
//           />
//         </div>

//         <motion.button
//           type="submit"
//           whileTap={{ scale: 0.95 }}
//           className="w-full py-3 mt-4 font-bold text-black rounded-xl bg-gradient-to-r from-emerald-400 to-green-600 hover:from-emerald-500 hover:to-green-700 shadow-lg transition-colors"
//         >
//           🚰 Schedule Irrigation
//         </motion.button>
//       </form>
//     </motion.div>
//   );
// }



// // src/components/IrrigationScheduleForm.tsx
// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function IrrigationScheduleForm() {
//   const [form, setForm] = useState({
//     crop: "",
//     soil: "",
//     area: "",
//     season: "",
//     date: "",
//     waterAmount: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`✅ Irrigation scheduled for ${form.crop} on ${form.date}`);
//   };

//   return (
//     <motion.div
//       className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       <h2 className="text-2xl font-bold text-center text-emerald-300 mb-4">
//         💧 Schedule Irrigation
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Crop Type */}
//         <div>
//           <label className="block text-sm font-medium text-white">Crop Type</label>
//           <select
//             name="crop"
//             value={form.crop}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-400"
//             required
//           >
//             <option value="">Select crop</option>
//             <option value="wheat">🌾 Wheat</option>
//             <option value="rice">🌾 Rice</option>
//             <option value="maize">🌽 Maize</option>
//             <option value="sugarcane">🍬 Sugarcane</option>
//           </select>
//         </div>

//         {/* Soil Type */}
//         <div>
//           <label className="block text-sm font-medium text-white">Soil Type</label>
//           <select
//             name="soil"
//             value={form.soil}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-400"
//             required
//           >
//             <option value="">Select soil</option>
//             <option value="clay">🪨 Clay</option>
//             <option value="sandy">🏝️ Sandy</option>
//             <option value="loamy">🌱 Loamy</option>
//           </select>
//         </div>

//         {/* Farm Area */}
//         <div>
//           <label className="block text-sm font-medium text-white">Farm Area (hectares)</label>
//           <input
//             type="number"
//             name="area"
//             value={form.area}
//             onChange={handleChange}
//             placeholder="Enter area"
//             className="w-full mt-1 p-2 rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-400"
//             required
//           />
//         </div>

//         {/* Season */}
//         <div>
//           <label className="block text-sm font-medium text-white">Season</label>
//           <select
//             name="season"
//             value={form.season}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-400"
//             required
//           >
//             <option value="">Select season</option>
//             <option value="kharif">☀️ Kharif</option>
//             <option value="rabi">❄️ Rabi</option>
//             <option value="zaid">🌤️ Zaid</option>
//           </select>
//         </div>

//         {/* Irrigation Date */}
//         <div>
//           <label className="block text-sm font-medium text-white">Irrigation Date</label>
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-400"
//             required
//           />
//         </div>

//         {/* Water Amount */}
//         <div>
//           <label className="block text-sm font-medium text-white">Water Amount (liters)</label>
//           <input
//             type="number"
//             name="waterAmount"
//             value={form.waterAmount}
//             onChange={handleChange}
//             placeholder="e.g. 2000"
//             className="w-full mt-1 p-2 rounded-xl bg-gray-900/50 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-400"
//             required
//           />
//         </div>

//         {/* Submit */}
//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           type="submit"
//           className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl shadow-lg"
//         >
//           🚰 Schedule Irrigation
//         </motion.button>
//       </form>
//     </motion.div>
//   );
// }
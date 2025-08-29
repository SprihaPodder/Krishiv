import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wheat, Ruler } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FarmData } from '../App';

interface PredictionData {
  weekly_irrigation: { week: number; volume_l_per_ha: number }[];
  water_savings_pct: number;
  soil_moisture: string;
  drought_risk: string;
}

interface UserInputPanelProps {
  farmData: FarmData;
  setFarmData: ( FarmData) => void;
  darkMode: boolean;
  language: 'en' | 'hi';
}

export const UserInputPanel: React.FC<UserInputPanelProps> = ({
  farmData,
  setFarmData,
  darkMode,
  language
}) => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);

  const crops = [
    { id: 'wheat', name: language === 'en' ? 'Wheat' : 'गेहूं', icon: '🌾', waterNeed: 'Medium' },
    { id: 'rice', name: language === 'en' ? 'Rice' : 'चावल', icon: '🌾', waterNeed: 'High' },
    { id: 'maize', name: language === 'en' ? 'Maize' : 'मक्का', icon: '🌽', waterNeed: 'Medium' },
    { id: 'sugarcane', name: language === 'en' ? 'Sugarcane' : 'गन्ना', icon: '🎋', waterNeed: 'Very High' },
  ];

  const soilTypes = [
    { id: 'clay', name: language === 'en' ? 'Clay Soil' : 'चिकनी मिट्टी', icon: '🪨', retention: 'High' },
    { id: 'sandy', name: language === 'en' ? 'Sandy Soil' : 'रेतीली मिट्टी', icon: '🏖️', retention: 'Low' },
    { id: 'loamy', name: language === 'en' ? 'Loamy Soil' : 'दोमट मिट्टी', icon: '🌱', retention: 'Medium' },
  ];

  const seasons = [
    { id: 'kharif', name: language === 'en' ? 'Kharif (Monsoon)' : 'खरीफ (मानसून)', icon: '🌧️' },
    { id: 'rabi', name: language === 'en' ? 'Rabi (Winter)' : 'रबी (सर्दी)', icon: '❄️' },
    { id: 'zaid', name: language === 'en' ? 'Zaid (Summer)' : 'जायद (गर्मी)', icon: '☀️' },
  ];

  const irrigationLevels = [
    { id: 'low', name: language === 'en' ? 'Low' : 'कम' },
    { id: 'medium', name: language === 'en' ? 'Medium' : 'मध्यम' },
    { id: 'high', name: language === 'en' ? 'High' : 'उच्च' },
  ];

  const handleAreaChange = (value: number[]) => {
    setFarmData({ ...farmData, farmArea: value[0] });
  };

  const toggleUnit = () => {
    const newUnit = farmData.areaUnit === 'hectare' ? 'acre' : 'hectare';
    const conversionFactor = newUnit === 'acre' ? 2.47 : 0.405;
    setFarmData({
      ...farmData,
      areaUnit: newUnit,
      farmArea: Math.round(farmData.farmArea * conversionFactor * 10) / 10
    });
  };

  const generatePlan = async () => {
    setLoading(true);
    setPrediction(null);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmArea: farmData.farmArea,
          soilType: farmData.soilType,
          areaUnit: farmData.areaUnit,
          season: farmData.season,
          irrigationLevel: farmData.irrigationLevel,
        }),
      });
      const data = await response.json();
      if (response.ok) setPrediction(data);
      else setPrediction(null);
    } catch {
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className={`p-6 ${darkMode ? 'bg-slate-800/30 border-slate-700/30' : 'bg-white/30 border-white/20'} backdrop-blur-lg shadow-xl`}>
          <div className="flex items-center space-x-3 mb-6">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Wheat className={`h-6 w-6 ${darkMode ? 'text-emerald-400' : 'text-green-600'}`} />
            </motion.div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
              {language === 'en' ? 'Farm Configuration' : 'खेत की जानकारी'}
            </h2>
          </div>

          <div className="space-y-4">

            {/* Crop Type */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                {language === 'en' ? 'Crop Type' : 'फसल का प्रकार'}
              </label>
              <Select value={farmData.cropType} onValueChange={value => setFarmData({...farmData, cropType: value})}>
                <SelectTrigger className={`w-full ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200' : 'bg-white/50 border-white/30'}`}>
                  <SelectValue placeholder={language === 'en' ? 'Select your crop' : 'अपनी फसल चुनें'} />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop.id} value={crop.id}>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{crop.icon}</span>
                        <div>
                          <p className="font-medium">{crop.name}</p>
                          <p className="text-sm text-gray-600">{language === 'en' ? 'Water need:' : 'पानी की आवश्यकता:'} {crop.waterNeed}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Soil Type */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                {language === 'en' ? 'Soil Type' : 'मिट्टी का प्रकार'}
              </label>
              <Select value={farmData.soilType} onValueChange={value => setFarmData({...farmData, soilType: value})}>
                <SelectTrigger className={`w-full ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200' : 'bg-white/50 border-white/30'}`}>
                  <SelectValue placeholder={language === 'en' ? 'Select soil type' : 'मिट्टी का प्रकार चुनें'} />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map(soil => (
                    <SelectItem key={soil.id} value={soil.id}>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{soil.icon}</span>
                        <div>
                          <p className="font-medium">{soil.name}</p>
                          <p className="text-sm text-gray-600">{language === 'en' ? 'Retention:' : 'जल धारण:'} {soil.retention}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Farm Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  {language === 'en' ? 'Farm Area' : 'खेत का क्षेत्रफल'}
                </label>
                <Button variant="ghost" size="sm" onClick={() => {
                  const newUnit = farmData.areaUnit === 'hectare' ? 'acre' : 'hectare';
                  const conversionFactor = newUnit === 'acre' ? 2.47 : 0.405;
                  setFarmData({
                    ...farmData,
                    areaUnit: newUnit,
                    farmArea: Math.round(farmData.farmArea * conversionFactor * 10) / 10
                  });
                }} className={`text-xs ${darkMode ? 'text-cyan-400 hover:bg-slate-700/30' : 'text-blue-600 hover:bg-blue-50'}`}>
                  <Ruler className="h-3 w-3 mr-1" />
                  {farmData.areaUnit}
                </Button>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700/30' : 'bg-white/40'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl font-bold ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>{farmData.farmArea}</span>
                  <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{farmData.areaUnit}</span>
                </div>
                <Slider value={[farmData.farmArea]} onValueChange={value => setFarmData({ ...farmData, farmArea: value[0] })} max={farmData.areaUnit === 'hectare' ? 50 : 125} min={0.5} step={0.5} className="w-full" />
                <div className={`flex justify-between text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  <span>0.5</span>
                  <span>{farmData.areaUnit === 'hectare' ? '50' : '125'}</span>
                </div>
              </div>
            </div>

            {/* Growing Season */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                {language === 'en' ? 'Growing Season' : 'फसल का मौसम'}
              </label>
              <Select value={farmData.season} onValueChange={value => setFarmData({ ...farmData, season: value })}>
                <SelectTrigger className={`w-full ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200' : 'bg-white/50 border-white/30'}`}>
                  <SelectValue placeholder={language === 'en' ? 'Select season' : 'मौसम चुनें'} />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map(season => (
                    <SelectItem key={season.id} value={season.id}>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{season.icon}</span>
                        <span className="font-medium">{season.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Irrigation Level */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                {language === 'en' ? 'Irrigation Level' : 'सिंचाई स्तर'}
              </label>
              <Select value={farmData.irrigationLevel || ''} onValueChange={value => setFarmData({ ...farmData, irrigationLevel: value })}>
                <SelectTrigger className={`w-full ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200' : 'bg-white/50 border-white/30'}`}>
                  <SelectValue placeholder={language === 'en' ? 'Select irrigation level' : 'सिंचाई स्तर चुनें'} />
                </SelectTrigger>
                <SelectContent>
                  {irrigationLevels.map(level => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Plan Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
            <Button
              className={`w-full py-3 font-bold text-white relative overflow-hidden ${
                darkMode ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
              }`}
              disabled={
                !farmData.cropType ||
                !farmData.soilType ||
                !farmData.season ||
                !farmData.irrigationLevel ||
                loading
              }
              onClick={generatePlan}
            >
              <motion.div className="absolute inset-0 bg-white/20" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
              <span className="relative z-10">{loading ? (language === 'en' ? 'Generating...' : 'तैयार किया जा रहा है...') : (language === 'en' ? '🚀 Generate Plan' : '🚀 योजना बनाएं')}</span>
            </Button>
          </motion.div>

          {/* Prediction Result & Chart */}
          {prediction && (
            <div className={`mt-6 p-6 rounded ${darkMode ? 'bg-slate-700/30 text-slate-100' : 'bg-white/90 text-gray-900'}`}>
              <h3 className="mb-4">{language === 'en' ? 'Irrigation Volume Over Weeks' : 'साप्ताहिक सिंचाई मात्रा'}</h3>
              <div className="w-full" style={{ minWidth: 400, maxWidth: 900, margin: "0 auto" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={prediction.weekly_irrigation} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="week" label={{ value: language === 'en' ? 'Week' : 'सप्ताह', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis label={{ value: language === 'en' ? 'Volume (L/ha)' : 'मात्रा (लीटर/हेक्टेयर)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="volume_l_per_ha" name={language === 'en' ? 'Irrigation Volume' : 'सिंचाई मात्रा'} stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-3">
                <p>{language === 'en' ? 'Water Savings:' : 'पानी की बचत:'} {prediction.water_savings_pct}%</p>
                <p>{language === 'en' ? 'Soil Moisture Status:' : 'मिट्टी की नमी स्थिति:'} {prediction.soil_moisture}</p>
                <p>{language === 'en' ? 'Drought Risk Level:' : 'सूखे का जोखिम स्तर:'} {prediction.drought_risk}</p>
              </div>
            </div>
          )}
          
        </Card>
      </motion.div>
    </div>
  );
};




// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Wheat, Ruler } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Slider } from '@/components/ui/slider';
// import { Button } from '@/components/ui/button';
// import { FarmData } from '../App';

// interface UserInputPanelProps {
//   farmData: FarmData;
//   setFarmData: ( FarmData) => void;
//   darkMode: boolean;
//   language: 'en' | 'hi';
// }

// export const UserInputPanel: React.FC<UserInputPanelProps> = ({
//   farmData,
//   setFarmData,
//   darkMode,
//   language
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [prediction, setPrediction] = useState<string | null>(null);

//   const crops = [
//     { id: 'wheat', name: language === 'en' ? 'Wheat' : 'गेहूं', icon: '🌾', waterNeed: 'Medium' },
//     { id: 'rice', name: language === 'en' ? 'Rice' : 'चावल', icon: '🌾', waterNeed: 'High' },
//     { id: 'maize', name: language === 'en' ? 'Maize' : 'मक्का', icon: '🌽', waterNeed: 'Medium' },
//     { id: 'sugarcane', name: language === 'en' ? 'Sugarcane' : 'गन्ना', icon: '🎋', waterNeed: 'Very High' },
//   ];

//   const soilTypes = [
//     { id: 'clay', name: language === 'en' ? 'Clay Soil' : 'चिकनी मिट्टी', icon: '🪨', retention: 'High' },
//     { id: 'sandy', name: language === 'en' ? 'Sandy Soil' : 'रेतीली मिट्टी', icon: '🏖️', retention: 'Low' },
//     { id: 'loamy', name: language === 'en' ? 'Loamy Soil' : 'दोमट मिट्टी', icon: '🌱', retention: 'Medium' },
//   ];

//   const seasons = [
//     { id: 'kharif', name: language === 'en' ? 'Kharif (Monsoon)' : 'खरीफ (मानसून)', icon: '🌧️' },
//     { id: 'rabi', name: language === 'en' ? 'Rabi (Winter)' : 'रबी (सर्दी)', icon: '❄️' },
//     { id: 'zaid', name: language === 'en' ? 'Zaid (Summer)' : 'जायद (गर्मी)', icon: '☀️' },
//   ];

//   const irrigationLevels = [
//     { id: 'low', name: language === 'en' ? 'Low' : 'कम' },
//     { id: 'medium', name: language === 'en' ? 'Medium' : 'मध्यम' },
//     { id: 'high', name: language === 'en' ? 'High' : 'उच्च' },
//   ];

//   const irrigationMap: Record<string, string> = {
//     wheat: language === 'en' ? 'Medium irrigation' : 'मध्यम सिंचाई',
//     rice: language === 'en' ? 'High irrigation' : 'अधिक सिंचाई',
//     maize: language === 'en' ? 'Medium irrigation' : 'मध्यम सिंचाई',
//     sugarcane: language === 'en' ? 'Very high irrigation' : 'बहुत अधिक सिंचाई',
//   };

//   const handleAreaChange = (value: number[]) => {
//     setFarmData({ ...farmData, farmArea: value[0] });
//   };

//   const toggleUnit = () => {
//     const newUnit = farmData.areaUnit === 'hectare' ? 'acre' : 'hectare';
//     const conversionFactor = newUnit === 'acre' ? 2.47 : 0.405;
//     setFarmData({
//       ...farmData,
//       areaUnit: newUnit,
//       farmArea: Math.round(farmData.farmArea * conversionFactor * 10) / 10
//     });
//   };

//   const generatePlan = async () => {
//     setLoading(true);
//     setPrediction(null);
//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           farmArea: farmData.farmArea,
//           soilType: farmData.soilType,
//           areaUnit: farmData.areaUnit,
//           season: farmData.season,
//           irrigationLevel: farmData.irrigationLevel,
//         }),
//       });
//       const data = await response.json();
//       console.log('Prediction response:', data);
//       if (response.ok) setPrediction(data.prediction);
//       else setPrediction('Prediction error');
//     } catch (error) {
//       console.error(error);
//       setPrediction('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
//         <Card
//           className={`p-6 ${
//             darkMode ? 'bg-slate-800/30 border-slate-700/30' : 'bg-white/30 border-white/20'
//           } backdrop-blur-lg shadow-xl`}
//         >
//           {/* Crop Type */}
//           <div>
//             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
//               {language === 'en' ? 'Crop Type' : 'फसल का प्रकार'}
//             </label>
//             <Select value={farmData.cropType} onValueChange={(value) => setFarmData({ ...farmData, cropType: value })}>
//               <SelectTrigger className={`w-full ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200' : 'bg-white/50 border-white/30'}`}>
//                 <SelectValue placeholder={language === 'en' ? 'Select your crop' : 'अपनी फसल चुनें'} />
//               </SelectTrigger>
//               <SelectContent>
//                 {crops.map((crop) => (
//                   <SelectItem key={crop.id} value={crop.id}>
//                     <div className="flex items-center space-x-3">
//                       <span className="text-lg">{crop.icon}</span>
//                       <div>
//                         <p className="font-medium">{crop.name}</p>
//                         <p className="text-sm text-gray-600">
//                           {language === 'en' ? 'Water need:' : 'पानी की आवश्यकता:'} {crop.waterNeed}
//                         </p>
//                       </div>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Soil Type */}
//           <div>
//             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
//               {language === 'en' ? 'Soil Type' : 'मिट्टी का प्रकार'}
//             </label>
//             <Select value={farmData.soilType} onValueChange={(value) => setFarmData({ ...farmData, soilType: value })}>
//               <SelectTrigger className={`w-full ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200' : 'bg-white/50 border-white/30'}`}>
//                 <SelectValue placeholder={language === 'en' ? 'Select soil type' : 'मिट्टी का प्रकार चुनें'} />
//               </SelectTrigger>
//               <SelectContent>
//                 {soilTypes.map((soil) => (
//                   <SelectItem key={soil.id} value={soil.id}>
//                     <div className="flex items-center space-x-3">
//                       <span className="text-lg">{soil.icon}</span>
//                       <div>
//                         <p className="font-medium">{soil.name}</p>
//                         <p className="text-sm text-gray-600">
//                           {language === 'en' ? 'Retention:' : 'जल धारण:'} {soil.retention}
//                         </p>
//                       </div>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Farm Area */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
//                 {language === 'en' ? 'Farm Area' : 'खेत का क्षेत्रफल'}
//               </label>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={toggleUnit}
//                 className={`text-xs ${darkMode ? 'text-cyan-400 hover:bg-slate-700/30' : 'text-blue-600 hover:bg-blue-50'}`}
//               >
//                 <Ruler className="h-3 w-3 mr-1" />
//                 {farmData.areaUnit}
//               </Button>
//             </div>
//             <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700/30' : 'bg-white/40'}`}>
//               <div className="flex items-center justify-between mb-3">
//                 <span className={`text-2xl font-bold ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>{farmData.farmArea}</span>
//                 <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{farmData.areaUnit}</span>
//               </div>
//               <Slider
//                 value={[farmData.farmArea]}
//                 onValueChange={handleAreaChange}
//                 max={farmData.areaUnit === 'hectare' ? 50 : 125}
//                 min={0.5}
//                 step={0.5}
//                 className="w-full"
//               />
//               <div className={`flex justify-between text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
//                 <span>0.5</span>
//                 <span>{farmData.areaUnit === 'hectare' ? '50' : '125'}</span>
//               </div>
//             </div>
//           </div>

//           {/* Season */}
//           <div>
//             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
//               {language === 'en' ? 'Growing Season' : 'फसल का मौसम'}
//             </label>
//             <Select value={farmData.season} onValueChange={(value) => setFarmData({ ...farmData, season: value })}>
//               <SelectTrigger className={`w-full ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200' : 'bg-white/50 border-white/30'}`}>
//                 <SelectValue placeholder={language === 'en' ? 'Select season' : 'मौसम चुनें'} />
//               </SelectTrigger>
//               <SelectContent>
//                 {seasons.map((season) => (
//                   <SelectItem key={season.id} value={season.id}>
//                     <div className="flex items-center space-x-3">
//                       <span className="text-lg">{season.icon}</span>
//                       <span className="font-medium">{season.name}</span>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Irrigation Level */}
//           <div>
//             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
//               {language === 'en' ? 'Irrigation Level' : 'सिंचाई स्तर'}
//             </label>
//             <Select value={farmData.irrigationLevel || ''} onValueChange={(value) => setFarmData({ ...farmData, irrigationLevel: value })}>
//               <SelectTrigger className={`w-full ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200' : 'bg-white/50 border-white/30'}`}>
//                 <SelectValue placeholder={language === 'en' ? 'Select irrigation level' : 'सिंचाई स्तर चुनें'} />
//               </SelectTrigger>
//               <SelectContent>
//                 {irrigationLevels.map((level) => (
//                   <SelectItem key={level.id} value={level.id}>
//                     {level.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Generate Plan Button */}
//           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
//             <Button
//               className={`w-full py-3 font-bold text-white relative overflow-hidden ${
//                 darkMode
//                   ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600'
//                   : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
//               }`}
//               disabled={!farmData.cropType || !farmData.soilType || !farmData.season || !farmData.irrigationLevel || loading}
//               onClick={generatePlan}
//             >
//               <motion.div
//                 className="absolute inset-0 bg-white/20"
//                 initial={{ x: '-100%' }}
//                 whileHover={{ x: '100%' }}
//                 transition={{ duration: 0.6 }}
//               />
//               <span className="relative z-10">
//                 {loading
//                   ? language === 'en'
//                     ? 'Generating...'
//                     : 'तैयार किया जा रहा है...'
//                   : language === 'en'
//                   ? '🚀 Generate Plan'
//                   : '🚀 योजना बनाएं'}
//               </span>
//             </Button>
//           </motion.div>

//           {/* Prediction Result */}
//           {prediction && (
//             <div className={`mt-4 p-4 rounded ${darkMode ? 'bg-slate-700/30 text-slate-100' : 'bg-white/40 text-gray-900'}`}>
//               <strong>{language === 'en' ? 'Predicted Irrigation Plan:' : 'पूर्वानुमानित सिंचाई योजना:'}</strong>
//               <p>{prediction ? irrigationMap[prediction.trim().toLowerCase()] ?? prediction : ''}</p>
//             </div>
//           )}
//         </Card>
//       </motion.div>
//     </div>
//   );
// };


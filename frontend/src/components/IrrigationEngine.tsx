import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Calendar, AlertTriangle, CheckCircle, Zap, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import IrrigationScheduleForm from './IrrigationScheduleForm'; // Import the form
import IrrigationCompletePopup from './IrrigationCompletePopup'; // Import popup
import { FarmData } from '../App';

interface IrrigationEngineProps {
  farmData: FarmData;
  darkMode: boolean;
  language: 'en' | 'hi';
}

export const IrrigationEngine: React.FC<IrrigationEngineProps> = ({
  farmData,
  darkMode,
  language,
}) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const irrigationData = {
    nextIrrigation: 2,
    waterNeeded: 450,
    skipTomorrow: true,
    lastIrrigation: language === 'en' ? '3 days ago' : '3 दिन पहले',
    efficiency: 92,
    aiConfidence: 94,
  };

  const getWaterRequirement = () => {
    const baseWater = 400;
    const cropMultiplier = {
      wheat: 1.0,
      rice: 1.8,
      maize: 1.2,
      sugarcane: 2.2,
    }[farmData.cropType] || 1.0;

    const soilMultiplier = {
      clay: 0.8,
      sandy: 1.3,
      loamy: 1.0,
    }[farmData.soilType] || 1.0;

    return Math.round(baseWater * cropMultiplier * soilMultiplier);
  };

  const toggleScheduleForm = () => setShowScheduleForm((prev) => !prev);

  const handleMarkIrrigated = () => {
    setShowCongrats(true);
    setTimeout(() => {
      setShowCongrats(false);
    }, 4000);
  };

  if (showScheduleForm) {
    return (
      <Card
        className={`p-8 ${darkMode ? 'bg-slate-800/40' : 'bg-blue-50/80'} backdrop-blur-lg shadow-2xl relative overflow-hidden`}
      >
        <IrrigationScheduleForm />
        <Button variant="outline" className="mt-6 w-full" onClick={toggleScheduleForm}>
          {language === 'en' ? 'Cancel Schedule' : 'निर्धारण रद्द करें'}
        </Button>
      </Card>
    );
  }

  return (
    <>
      <Card
        className={`p-8 ${
          darkMode
            ? 'bg-gradient-to-br from-slate-800/40 to-blue-900/40 border-slate-700/30'
            : 'bg-gradient-to-br from-blue-50/80 to-green-50/80 border-white/30'
        } backdrop-blur-lg shadow-2xl relative overflow-hidden`}
      >
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute top-4 right-4"
        >
          <Badge
            className={`backdrop-blur-sm ${
              darkMode
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30'
                : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border-blue-500/30'
            } flex items-center space-x-1 px-2 rounded`}
          >
            <Brain className="h-3 w-3 mr-1" />
            <span>AI {irrigationData.aiConfidence}%</span>
          </Badge>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Main Recommendation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`w-20 h-20 rounded-full flex items-center justify-center relative ${
                darkMode ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gradient-to-br from-blue-500 to-green-500'
              }`}
            >
              <Droplets className="h-10 w-10 text-white" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 rounded-full ${
                  darkMode ? 'bg-cyan-400/30' : 'bg-blue-400/30'
                }`}
              />
            </motion.div>
          </motion.div>

          <h2 className={`text-2xl lg:text-3xl font-bold mb-3 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
            {language === 'en' ? 'Next Irrigation in' : 'अगली सिंचाई'}
          </h2>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <p
              className={`text-5xl lg:text-7xl font-black bg-gradient-to-r ${
                darkMode ? 'from-cyan-400 to-emerald-400' : 'from-blue-600 to-green-600'
              } bg-clip-text text-transparent`}
            >
              {irrigationData.nextIrrigation}
            </p>
            <p className={`text-xl font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              {language === 'en' ? 'Days' : 'दिन'}
            </p>
          </motion.div>

          {/* Water Required & AI tip */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`${
                darkMode ? 'bg-slate-700/40 border-slate-600/30' : 'bg-white/40 border-white/30'
              } rounded-xl p-6 border backdrop-blur-sm`}
            >
              <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                {language === 'en' ? 'Water Required' : 'पानी की आवश्यकता'}
              </h3>
              <div className="flex items-center justify-center space-x-2">
                <motion.p
                  className={`text-3xl font-bold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {farmData.cropType ? getWaterRequirement() : irrigationData.waterNeeded}
                </motion.p>
                <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {language === 'en' ? 'L/hectare' : 'ली/हेक्टेयर'}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className={`${
                darkMode
                  ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700/30'
                  : 'bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-purple-200/30'
              } rounded-xl p-6 border backdrop-blur-sm relative overflow-hidden`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap className={`h-5 w-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </motion.div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                  {language === 'en' ? 'AI Insight' : 'AI सुझाव'}
                </h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                {language === 'en'
                  ? '🧠 Optimal soil moisture detected. Current irrigation schedule is perfect for maximum yield.'
                  : '🧠 मिट्टी की नमी उत्तम है। वर्तमान सिंचाई कार्यक्रम अधिकतम उत्पादन के लिए सही है।'}
              </p>
            </motion.div>
          </div>

          {/* Special Alert */}
          {irrigationData.skipTomorrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`${
                darkMode
                  ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-l-4 border-yellow-500'
                  : 'bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500'
              } p-6 rounded-lg mb-8 backdrop-blur-sm`}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle
                    className={`h-8 w-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}
                  />
                </motion.div>
                <div className="text-left">
                  <p className={`font-bold text-lg ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    {language === 'en' ? '⏸️ Skip irrigation tomorrow' : '⏸️ कल सिंचाई न करें'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                    {language === 'en'
                      ? '🌧️ Heavy rainfall expected (15-25mm) - Save 2,500L water!'
                      : '🌧️ भारी बारिश की संभावना (15-25mm) - 2,500L पानी बचाएं!'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button onClick={toggleScheduleForm} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-xl shadow-lg">
                <motion.div className="absolute inset-0 bg-white/20" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
                <Calendar className="h-5 w-5 mr-2 relative z-10" />
                <span className="relative z-10">{language === 'en' ? 'Schedule Irrigation' : 'सिंचाई निर्धारित करें'}</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button variant="outline" className="w-full py-4 font-bold relative overflow-hidden" onClick={handleMarkIrrigated}>
                <motion.div className={`absolute inset-0 ${darkMode ? 'bg-emerald-400/10' : 'bg-green-400/10'}`} initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
                <CheckCircle className="h-5 w-5 mr-2 relative z-10" />
                <span className="relative z-10">{language === 'en' ? 'Mark as Irrigated' : 'सिंचित के रूप में चिह्नित करें'}</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Card>

      {showCongrats && (
        <IrrigationCompletePopup onClose={() => setShowCongrats(false)} />
      )}
    </>
  );
};





// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Droplets, Calendar, AlertTriangle, CheckCircle, Zap, Brain } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import IrrigationScheduleForm from './IrrigationScheduleForm'; // Import the form
// import { FarmData } from '../App';

// interface IrrigationEngineProps {
//   farmData: FarmData;
//   darkMode: boolean;
//   language: 'en' | 'hi';
// }

// export const IrrigationEngine: React.FC<IrrigationEngineProps> = ({
//   farmData,
//   darkMode,
//   language
// }) => {
//   const [showScheduleForm, setShowScheduleForm] = useState(false);

//   const irrigationData = {
//     nextIrrigation: 2,
//     waterNeeded: 450,
//     skipTomorrow: true,
//     lastIrrigation: language === 'en' ? '3 days ago' : '3 दिन पहले',
//     efficiency: 92,
//     aiConfidence: 94,
//   };

//   const getWaterRequirement = () => {
//     const baseWater = 400;
//     const cropMultiplier = {
//       wheat: 1.0,
//       rice: 1.8,
//       maize: 1.2,
//       sugarcane: 2.2
//     }[farmData.cropType] || 1.0;

//     const soilMultiplier = {
//       clay: 0.8,
//       sandy: 1.3,
//       loamy: 1.0
//     }[farmData.soilType] || 1.0;

//     return Math.round(baseWater * cropMultiplier * soilMultiplier);
//   };

//   const toggleForm = () => {
//     setShowScheduleForm(prev => !prev);
//   };

//   if (showScheduleForm) {
//     return (
//       <Card className={`p-8 ${darkMode ? 'bg-slate-800/40' : 'bg-blue-50/80'} backdrop-blur-lg shadow-2xl relative overflow-hidden`}>
//         <IrrigationScheduleForm />
//         <Button variant="outline" className="mt-6 w-full" onClick={toggleForm}>
//           {language === 'en' ? 'Cancel Schedule' : 'निर्धारण रद्द करें'}
//         </Button>
//       </Card>
//     );
//   }

//   return (
//     <Card className={`p-8 ${
//       darkMode 
//         ? 'bg-gradient-to-br from-slate-800/40 to-blue-900/40 border-slate-700/30' 
//         : 'bg-gradient-to-br from-blue-50/80 to-green-50/80 border-white/30'
//     } backdrop-blur-lg shadow-2xl relative overflow-hidden`}>

//       {/* AI Badge */}
//       <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="absolute top-4 right-4">
//         <Badge className={`${
//           darkMode 
//             ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30' 
//             : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border-blue-500/30'
//         } backdrop-blur-sm`}>
//           <Brain className="h-3 w-3 mr-1" />
//           AI {irrigationData.aiConfidence}%
//         </Badge>
//       </motion.div>

//       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center">

//         {/* Main Recommendation */}
//         <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="mb-8">
//           <div className="flex justify-center mb-6">
//             <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }} className={`w-20 h-20 rounded-full flex items-center justify-center relative ${darkMode ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gradient-to-br from-blue-500 to-green-500'}`}>
//               <Droplets className="h-10 w-10 text-white" />
//               <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className={`absolute inset-0 rounded-full ${darkMode ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}/>
//             </motion.div>
//           </div>

//           <h2 className={`text-2xl lg:text-3xl font-bold mb-3 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
//             {language === 'en' ? 'Next Irrigation in' : 'अगली सिंचाई'}
//           </h2>

//           <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="relative">
//             <p className={`text-5xl lg:text-7xl font-black bg-gradient-to-r ${darkMode ? 'from-cyan-400 to-emerald-400' : 'from-blue-600 to-green-600'} bg-clip-text text-transparent`}>
//               {irrigationData.nextIrrigation}
//             </p>
//             <p className={`text-xl font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
//               {language === 'en' ? 'Days' : 'दिन'}
//             </p>
//           </motion.div>
//         </motion.div>

//         {/* Water Required & AI tip */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className={`${darkMode ? 'bg-slate-700/40 border-slate-600/30' : 'bg-white/40 border-white/30'} rounded-xl p-6 border backdrop-blur-sm`}>
//             <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
//               {language === 'en' ? 'Water Required' : 'पानी की आवश्यकता'}
//             </h3>
//             <div className="flex items-center justify-center space-x-2">
//               <motion.p className={`text-3xl font-bold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
//                 {farmData.cropType ? getWaterRequirement() : irrigationData.waterNeeded}
//               </motion.p>
//               <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
//                 {language === 'en' ? 'L/hectare' : 'ली/हेक्टेयर'}
//               </span>
//             </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className={`${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700/30' : 'bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-purple-200/30'} rounded-xl p-6 border backdrop-blur-sm relative overflow-hidden`}>
//             <div className="flex items-center space-x-2 mb-2">
//               <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
//                 <Zap className={`h-5 w-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
//               </motion.div>
//               <h3 className={`text-sm font-bold ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
//                 {language === 'en' ? 'AI Insight' : 'AI सुझाव'}
//               </h3>
//             </div>
//             <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
//               {language === 'en' ? '🧠 Optimal soil moisture detected. Current irrigation schedule is perfect for maximum yield.' : '🧠 मिट्टी की नमी उत्तम है। वर्तमान सिंचाई कार्यक्रम अधिकतम उत्पादन के लिए सही है।'}
//             </p>
//           </motion.div>
//         </div>

//         {/* Special Alert */}
//         {irrigationData.skipTomorrow && (
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className={`${darkMode ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-l-4 border-yellow-500' : 'bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500'} p-6 rounded-lg mb-8 backdrop-blur-sm`}>
//             <div className="flex items-center space-x-4">
//               <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
//                 <AlertTriangle className={`h-8 w-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
//               </motion.div>
//               <div className="text-left">
//                 <p className={`font-bold text-lg ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
//                   {language === 'en' ? '⏸️ Skip irrigation tomorrow' : '⏸️ कल सिंचाई न करें'}
//                 </p>
//                 <p className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
//                   {language === 'en' ? '🌧️ Heavy rainfall expected (15-25mm) - Save 2,500L water!' : '🌧️ भारी बारिश की संभावना (15-25mm) - 2,500L पानी बचाएं!'}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
//             <Button onClick={() => setShowScheduleForm(true)} className={`w-full font-bold py-4 text-white relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'}`}>
//               <motion.div className="absolute inset-0 bg-white/20" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
//               <Calendar className="h-5 w-5 mr-2 relative z-10" />
//               <span className="relative z-10">{language === 'en' ? 'Schedule Irrigation' : 'सिंचाई निर्धारित करें'}</span>
//             </Button>
//           </motion.div>

//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
//             <Button variant="outline" className={`w-full font-bold py-4 relative overflow-hidden ${darkMode ? 'bg-slate-700/50 border-slate-600/30 text-slate-200 hover:bg-slate-600/70' : 'bg-white/50 border-white/30 hover:bg-white/70'}`}>
//               <motion.div className={`absolute inset-0 ${darkMode ? 'bg-emerald-400/10' : 'bg-green-400/10'}`} initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
//               <CheckCircle className="h-5 w-5 mr-2 relative z-10" />
//               <span className="relative z-10">{language === 'en' ? 'Mark as Irrigated' : 'सिंचित के रूप में चिह्नित करें'}</span>
//             </Button>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Schedule Form Modal Overlay */}
//       {showScheduleForm && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
//           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-lg w-full shadow-lg relative">
//             <button
//               onClick={() => setShowScheduleForm(false)}
//               className="absolute top-4 right-4 font-bold text-lg text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//               aria-label="Close schedule form"
//             >
//               ×
//             </button>
//             <IrrigationScheduleForm />
//           </motion.div>
//         </div>
//       )}
//     </Card>
//   );
// };





// import React from 'react';
// import { motion } from 'framer-motion';
// import { Droplets, Calendar, AlertTriangle, CheckCircle, Zap, Brain } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { FarmData } from '../App';

// interface IrrigationEngineProps {
//   farmData: FarmData;
//   darkMode: boolean;
//   language: 'en' | 'hi';
// }

// export const IrrigationEngine: React.FC<IrrigationEngineProps> = ({
//   farmData,
//   darkMode,
//   language
// }) => {
//   const irrigationData = {
//     nextIrrigation: 2,
//     waterNeeded: 450,
//     skipTomorrow: true,
//     lastIrrigation: language === 'en' ? '3 days ago' : '3 दिन पहले',
//     efficiency: 92,
//     aiConfidence: 94,
//   };

//   const getWaterRequirement = () => {
//     const baseWater = 400;
//     const cropMultiplier = {
//       wheat: 1.0,
//       rice: 1.8,
//       maize: 1.2,
//       sugarcane: 2.2
//     }[farmData.cropType] || 1.0;
    
//     const soilMultiplier = {
//       clay: 0.8,
//       sandy: 1.3,
//       loamy: 1.0
//     }[farmData.soilType] || 1.0;

//     return Math.round(baseWater * cropMultiplier * soilMultiplier);
//   };

//   return (
//     <Card className={`p-8 ${
//       darkMode 
//         ? 'bg-gradient-to-br from-slate-800/40 to-blue-900/40 border-slate-700/30' 
//         : 'bg-gradient-to-br from-blue-50/80 to-green-50/80 border-white/30'
//     } backdrop-blur-lg shadow-2xl relative overflow-hidden`}>
      
//       {/* AI Badge */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.5, type: "spring" }}
//         className="absolute top-4 right-4"
//       >
//         <Badge className={`${
//           darkMode 
//             ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30' 
//             : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border-blue-500/30'
//         } backdrop-blur-sm`}>
//           <Brain className="h-3 w-3 mr-1" />
//           AI {irrigationData.aiConfidence}%
//         </Badge>
//       </motion.div>

//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="text-center"
//       >
//         {/* Main Recommendation */}
//         <motion.div
//           animate={{ y: [0, -8, 0] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//           className="mb-8"
//         >
//           <div className="flex justify-center mb-6">
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.3, 1],
//                 rotate: [0, 15, -15, 0]
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//               className={`w-20 h-20 rounded-full flex items-center justify-center relative ${
//                 darkMode 
//                   ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
//                   : 'bg-gradient-to-br from-blue-500 to-green-500'
//               }`}
//             >
//               <Droplets className="h-10 w-10 text-white" />
              
//               {/* Glow effect */}
//               <motion.div
//                 animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className={`absolute inset-0 rounded-full ${
//                   darkMode ? 'bg-cyan-400/30' : 'bg-blue-400/30'
//                 }`}
//               />
//             </motion.div>
//           </div>
          
//           <h2 className={`text-2xl lg:text-3xl font-bold mb-3 ${
//             darkMode ? 'text-slate-100' : 'text-gray-800'
//           }`}>
//             {language === 'en' ? 'Next Irrigation in' : 'अगली सिंचाई'}
//           </h2>
          
//           <motion.div
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="relative"
//           >
//             <p className={`text-5xl lg:text-7xl font-black bg-gradient-to-r ${
//               darkMode 
//                 ? 'from-cyan-400 to-emerald-400' 
//                 : 'from-blue-600 to-green-600'
//             } bg-clip-text text-transparent`}>
//               {irrigationData.nextIrrigation}
//             </p>
//             <p className={`text-xl font-medium ${
//               darkMode ? 'text-slate-300' : 'text-gray-700'
//             }`}>
//               {language === 'en' ? 'Days' : 'दिन'}
//             </p>
//           </motion.div>
//         </motion.div>

//         {/* Water Amount & AI Tip */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Water Required */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4 }}
//             className={`${
//               darkMode 
//                 ? 'bg-slate-700/40 border-slate-600/30' 
//                 : 'bg-white/40 border-white/30'
//             } rounded-xl p-6 border backdrop-blur-sm`}
//           >
//             <h3 className={`text-lg font-bold mb-3 ${
//               darkMode ? 'text-slate-200' : 'text-gray-800'
//             }`}>
//               {language === 'en' ? 'Water Required' : 'पानी की आवश्यकता'}
//             </h3>
//             <div className="flex items-center justify-center space-x-2">
//               <motion.p 
//                 className={`text-3xl font-bold ${
//                   darkMode ? 'text-cyan-400' : 'text-blue-600'
//                 }`}
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, delay: 1 }}
//               >
//                 {farmData.cropType ? getWaterRequirement() : irrigationData.waterNeeded}
//               </motion.p>
//               <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
//                 {language === 'en' ? 'L/hectare' : 'ली/हेक्टेयर'}
//               </span>
//             </div>
//           </motion.div>

//           {/* AI Tip */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.6 }}
//             className={`${
//               darkMode 
//                 ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700/30' 
//                 : 'bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-purple-200/30'
//             } rounded-xl p-6 border backdrop-blur-sm relative overflow-hidden`}
//           >
//             <div className="flex items-center space-x-2 mb-2">
//               <motion.div
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className={`h-5 w-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
//               </motion.div>
//               <h3 className={`text-sm font-bold ${
//                 darkMode ? 'text-purple-300' : 'text-purple-800'
//               }`}>
//                 {language === 'en' ? 'AI Insight' : 'AI सुझाव'}
//               </h3>
//             </div>
//             <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
//               {language === 'en' 
//                 ? '🧠 Optimal soil moisture detected. Current irrigation schedule is perfect for maximum yield.'
//                 : '🧠 मिट्टी की नमी उत्तम है। वर्तमान सिंचाई कार्यक्रम अधिकतम उत्पादन के लिए सही है।'
//               }
//             </p>
//           </motion.div>
//         </div>

//         {/* Special Alert */}
//         {irrigationData.skipTomorrow && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//             className={`${
//               darkMode 
//                 ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-l-4 border-yellow-500' 
//                 : 'bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500'
//             } p-6 rounded-lg mb-8 backdrop-blur-sm`}
//           >
//             <div className="flex items-center space-x-4">
//               <motion.div
//                 animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <AlertTriangle className={`h-8 w-8 ${
//                   darkMode ? 'text-yellow-400' : 'text-yellow-600'
//                 }`} />
//               </motion.div>
//               <div className="text-left">
//                 <p className={`font-bold text-lg ${
//                   darkMode ? 'text-yellow-300' : 'text-yellow-800'
//                 }`}>
//                   {language === 'en' ? '⏸️ Skip irrigation tomorrow' : '⏸️ कल सिंचाई न करें'}
//                 </p>
//                 <p className={`text-sm ${
//                   darkMode ? 'text-yellow-200' : 'text-yellow-700'
//                 }`}>
//                   {language === 'en' 
//                     ? '🌧️ Heavy rainfall expected (15-25mm) - Save 2,500L water!'
//                     : '🌧️ भारी बारिश की संभावना (15-25mm) - 2,500L पानी बचाएं!'
//                   }
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <motion.div 
//             whileHover={{ scale: 1.05 }} 
//             whileTap={{ scale: 0.95 }} 
//             className="flex-1"
//           >
//             <Button className={`w-full font-bold py-4 text-white relative overflow-hidden ${
//               darkMode 
//                 ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' 
//                 : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
//             }`}>
//               <motion.div
//                 className="absolute inset-0 bg-white/20"
//                 initial={{ x: '-100%' }}
//                 whileHover={{ x: '100%' }}
//                 transition={{ duration: 0.6 }}
//               />
//               <Calendar className="h-5 w-5 mr-2 relative z-10" />
//               <span className="relative z-10">
//                 {language === 'en' ? 'Schedule Irrigation' : 'सिंचाई निर्धारित करें'}
//               </span>
//             </Button>
//           </motion.div>
          
//           <motion.div 
//             whileHover={{ scale: 1.05 }} 
//             whileTap={{ scale: 0.95 }} 
//             className="flex-1"
//           >
//             <Button 
//               variant="outline" 
//               className={`w-full font-bold py-4 relative overflow-hidden ${
//                 darkMode 
//                   ? 'bg-slate-700/50 border-slate-600/30 text-slate-200 hover:bg-slate-600/70' 
//                   : 'bg-white/50 border-white/30 hover:bg-white/70'
//               }`}
//             >
//               <motion.div
//                 className={`absolute inset-0 ${
//                   darkMode ? 'bg-emerald-400/10' : 'bg-green-400/10'
//                 }`}
//                 initial={{ x: '-100%' }}
//                 whileHover={{ x: '100%' }}
//                 transition={{ duration: 0.6 }}
//               />
//               <CheckCircle className="h-5 w-5 mr-2 relative z-10" />
//               <span className="relative z-10">
//                 {language === 'en' ? 'Mark as Irrigated' : 'सिंचित के रूप में चिह्नित करें'}
//               </span>
//             </Button>
//           </motion.div>
//         </div>
//       </motion.div>
//     </Card>
//   );
// };
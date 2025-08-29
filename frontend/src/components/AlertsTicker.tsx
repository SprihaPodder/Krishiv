import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CloudRain, Thermometer, Bug, Leaf, Lightbulb, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import IrrigationAlerts from './IrrigationAlerts';  // import full alerts component

interface AlertsTickerProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export const AlertsTicker: React.FC<AlertsTickerProps> = ({ darkMode, language }) => {
  const [showAllAlerts, setShowAllAlerts] = useState(false);

  const alerts = [
    {
      id: 1,
      icon: CloudRain,
      message: language === 'en' 
        ? '🌦 Rain coming tomorrow – hold irrigation for optimal water conservation' 
        : '🌦 कल बारिश आएगी – पानी की बचत के लिए सिंचाई रोकें',
      color: darkMode ? 'text-cyan-400' : 'text-blue-600'
    },
    {
      id: 2,
      icon: Thermometer,
      message: language === 'en' 
        ? '🌡️ Temperature rising to 35°C – increase watering frequency by 15%' 
        : '🌡️ तापमान 35°C तक बढ़ेगा – पानी देने की आवृत्ति 15% बढ़ाएं',
      color: darkMode ? 'text-orange-400' : 'text-orange-600'
    },
    {
      id: 3,
      icon: Bug,
      message: language === 'en' 
        ? '🐛 Aphid activity detected in sector B – check crop health' 
        : '🐛 सेक्टर B में माहू की गतिविधि – फसल स्वास्थ्य जांचें',
      color: darkMode ? 'text-red-400' : 'text-red-600'
    },
    {
      id: 4,
      icon: Leaf,
      message: language === 'en' 
        ? '🌱 Optimal growth conditions detected – perfect time for fertilization' 
        : '🌱 उत्तम वृद्धि स्थितियां मिलीं – उर्वरक डालने का सही समय',
      color: darkMode ? 'text-emerald-400' : 'text-green-600'
    },
    {
      id: 5,
      icon: Zap,
      message: language === 'en' 
        ? '⚡ AI model updated – 15% more accurate predictions available' 
        : '⚡ AI मॉडल अपडेट – 15% अधिक सटीक भविष्यवाणी उपलब्ध',
      color: darkMode ? 'text-purple-400' : 'text-purple-600'
    },
    {
      id: 6,
      icon: Lightbulb,
      message: language === 'en' 
        ? '💡 Pro tip: Morning irrigation (5-7 AM) reduces evaporation by 40%' 
        : '💡 सुझाव: सुबह की सिंचाई (5-7 AM) वाष्पीकरण 40% कम करती है',
      color: darkMode ? 'text-yellow-400' : 'text-yellow-600'
    },
  ];

  if (showAllAlerts) {
    return (
      <>
        <IrrigationAlerts />
        <div className="mt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllAlerts(false)}
            className={`py-1 px-4 rounded-lg text-sm font-semibold ${
              darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {language === 'en' ? 'Show Less' : 'कम दिखाएं'}
          </motion.button>
        </div>
      </>
    );
  }

  return (
    <Card
      className={`p-4 ${darkMode ? 'bg-slate-800/20 border-slate-700/20' : 'bg-white/20 border-white/20'} backdrop-blur-lg shadow-lg overflow-hidden`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <AlertCircle className={`h-5 w-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
        </motion.div>
        <h3 className={`font-bold ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
          {language === 'en' ? 'Smart Alerts & Tips' : 'स्मार्ट अलर्ट और सुझाव'}
        </h3>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
          className={`px-2 py-1 rounded-full text-xs font-bold ${darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-500/20 text-red-700'}`}>
          LIVE
        </motion.div>
      </div>

      <div className="relative h-10 overflow-hidden">
        <motion.div animate={{ x: ['100%', '-100%'] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }} className="absolute whitespace-nowrap flex items-center space-x-12">
          {alerts.concat(alerts).map((alert, idx) => (
            <motion.div key={`${alert.id}-${idx}`} className={`flex items-center space-x-3 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`} whileHover={{ scale: 1.05 }}>
              <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}>
                <alert.icon className={`h-4 w-4 ${alert.color}`} />
              </motion.div>
              <span className="text-sm font-medium">{alert.message}</span>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className={`w-1 h-1 rounded-full ${darkMode ? 'bg-slate-500' : 'bg-gray-400'}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 flex space-x-2">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowAllAlerts(true)}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30'}`}>
          {language === 'en' ? '📱 View All' : '📱 सभी देखें'}
        </motion.button>
        {/* <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${darkMode ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' : 'bg-green-500/20 text-green-700 hover:bg-green-500/30'}`}>
          {language === 'en' ? '⚙️ Settings' : '⚙️ सेटिंग्स'}
        </motion.button> */}
      </motion.div>
    </Card>
  );
};

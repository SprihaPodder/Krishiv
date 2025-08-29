import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, X, Clock, Droplets } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SchedulePanelProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export const SchedulePanel: React.FC<SchedulePanelProps> = ({ darkMode, language }) => {
  const scheduleData = [
    { 
      date: 'Mon 15', 
      status: 'completed', 
      water: 420, 
      time: '06:00',
      weather: 'sunny'
    },
    { 
      date: 'Wed 17', 
      status: 'completed', 
      water: 380, 
      time: '05:30',
      weather: 'cloudy'
    },
    { 
      date: 'Fri 19', 
      status: 'scheduled', 
      water: 450, 
      time: '06:00',
      weather: 'sunny'
    },
    { 
      date: 'Sat 20', 
      status: 'skipped', 
      water: 0, 
      time: '--',
      weather: 'rainy',
      reason: language === 'en' ? 'Rain expected' : 'बारिश की संभावना'
    },
    { 
      date: 'Mon 22', 
      status: 'pending', 
      water: 480, 
      time: '06:00',
      weather: 'sunny'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'skipped':
        return <X className="h-4 w-4 text-orange-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <Droplets className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return darkMode ? 'bg-green-900/30 border-green-700/50' : 'bg-green-50 border-green-200';
      case 'skipped':
        return darkMode ? 'bg-orange-900/30 border-orange-700/50' : 'bg-orange-50 border-orange-200';
      case 'scheduled':
        return darkMode ? 'bg-blue-900/30 border-blue-700/50' : 'bg-blue-50 border-blue-200';
      case 'pending':
        return darkMode ? 'bg-slate-800/30 border-slate-700/50' : 'bg-gray-50 border-gray-200';
      default:
        return '';
    }
  };

  return (
    <Card className={`p-6 ${
      darkMode 
        ? 'bg-slate-800/30 border-slate-700/30' 
        : 'bg-white/30 border-white/20'
    } backdrop-blur-lg shadow-xl h-fit`}>
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Calendar className={`h-6 w-6 ${darkMode ? 'text-emerald-400' : 'text-green-600'}`} />
        </motion.div>
        <h2 className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
          {language === 'en' ? 'Irrigation Schedule' : 'सिंचाई कार्यक्रम'}
        </h2>
      </div>

      <div className="space-y-3">
        {scheduleData.map((item, index) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`p-4 rounded-lg border transition-all duration-200 ${getStatusColor(item.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <div>
                  <p className={`font-medium ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                    {item.date}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {item.time} • {item.weather}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                {item.water > 0 ? (
                  <p className={`text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    {item.water}L
                  </p>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {item.reason}
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-6 p-4 rounded-lg ${
          darkMode 
            ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/30' 
            : 'bg-gradient-to-r from-emerald-50 to-green-50'
        }`}
      >
        <h3 className={`text-sm font-bold mb-2 ${
          darkMode ? 'text-emerald-300' : 'text-emerald-800'
        }`}>
          {language === 'en' ? '📊 This Week Summary' : '📊 इस सप्ताह का सारांश'}
        </h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className={`text-lg font-bold ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
              1,250L
            </p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'Water Used' : 'पानी का उपयोग'}
            </p>
          </div>
          <div>
            <p className={`text-lg font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
              850L
            </p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'Water Saved' : 'पानी की बचत'}
            </p>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};
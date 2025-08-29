import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface WeatherModuleProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export const WeatherModule: React.FC<WeatherModuleProps> = ({ darkMode, language }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock weather data - in real app, fetch from OpenWeatherMap API
  const weatherData = {
    current: {
      temp: 28,
      humidity: 65,
      windSpeed: 12,
      pressure: 1013,
      visibility: 10,
      condition: 'partly-cloudy',
      location: language === 'en' ? 'Punjab, India' : 'पंजाब, भारत'
    },
    forecast: [
      { day: language === 'en' ? 'Today' : 'आज', temp: { high: 32, low: 22 }, rain: 0, icon: 'sun' },
      { day: language === 'en' ? 'Tomorrow' : 'कल', temp: { high: 29, low: 20 }, rain: 80, icon: 'rain' },
      { day: language === 'en' ? 'Wed' : 'बुध', temp: { high: 25, low: 18 }, rain: 60, icon: 'cloud' },
      { day: language === 'en' ? 'Thu' : 'गुरु', temp: { high: 30, low: 21 }, rain: 20, icon: 'sun' },
      { day: language === 'en' ? 'Fri' : 'शुक्र', temp: { high: 33, low: 24 }, rain: 10, icon: 'sun' },
    ],
  };

  const getWeatherIcon = (condition: string, animated = false) => {
    const iconClass = `h-8 w-8 ${animated ? 'animate-pulse' : ''}`;
    switch (condition) {
      case 'sun':
        return <Sun className={`${iconClass} text-yellow-500`} />;
      case 'rain':
        return <CloudRain className={`${iconClass} text-blue-500`} />;
      case 'cloud':
        return <Cloud className={`${iconClass} text-gray-500`} />;
      default:
        return <Sun className={`${iconClass} text-yellow-500`} />;
    }
  };

  const rainDrops = Array.from({ length: 15 });

  return (
    <Card className={`p-6 ${
      darkMode 
        ? 'bg-slate-800/30 border-slate-700/30' 
        : 'bg-white/30 border-white/20'
    } backdrop-blur-lg shadow-xl`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
            {language === 'en' ? 'Weather Intelligence' : 'मौसम बुद्धिमत्ता'}
          </h2>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            {weatherData.current.location} • {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={darkMode ? 'text-yellow-400' : 'text-yellow-500'}
        >
          <Sun className="h-8 w-8" />
        </motion.div>
      </div>

      {/* Current Weather Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Temperature */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${
            darkMode 
              ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30' 
              : 'bg-gradient-to-br from-orange-100 to-red-100'
          } p-4 rounded-xl relative overflow-hidden`}
        >
          <div className="flex items-center space-x-3">
            <Thermometer className={`h-6 w-6 ${darkMode ? 'text-orange-400' : 'text-red-500'}`} />
            <div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Temperature' : 'तापमान'}
              </p>
              <p className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                {weatherData.current.temp}°C
              </p>
            </div>
          </div>
        </motion.div>

        {/* Humidity */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30' 
              : 'bg-gradient-to-br from-blue-100 to-cyan-100'
          } p-4 rounded-xl relative overflow-hidden`}
        >
          <div className="flex items-center space-x-3">
            <Droplets className={`h-6 w-6 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
            <div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Humidity' : 'नमी'}
              </p>
              <p className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                {weatherData.current.humidity}%
              </p>
            </div>
          </div>
          {/* Animated droplets */}
          {rainDrops.slice(0, 3).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-10, 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className={`absolute w-1 h-1 rounded-full ${
                darkMode ? 'bg-cyan-400' : 'bg-blue-400'
              }`}
              style={{ left: `${30 + i * 20}%`, top: '10%' }}
            />
          ))}
        </motion.div>

        {/* Wind */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${
            darkMode 
              ? 'bg-gradient-to-br from-slate-800/30 to-slate-700/30' 
              : 'bg-gradient-to-br from-gray-100 to-slate-100'
          } p-4 rounded-xl`}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Wind className={`h-6 w-6 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`} />
            </motion.div>
            <div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Wind' : 'हवा'}
              </p>
              <p className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                {weatherData.current.windSpeed} km/h
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pressure */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${
            darkMode 
              ? 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30' 
              : 'bg-gradient-to-br from-purple-100 to-indigo-100'
          } p-4 rounded-xl`}
        >
          <div className="flex items-center space-x-3">
            <Gauge className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
            <div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Pressure' : 'दबाव'}
              </p>
              <p className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                {weatherData.current.pressure}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visibility */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${
            darkMode 
              ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30' 
              : 'bg-gradient-to-br from-emerald-100 to-green-100'
          } p-4 rounded-xl`}
        >
          <div className="flex items-center space-x-3">
            <Eye className={`h-6 w-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
            <div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {language === 'en' ? 'Visibility' : 'दृश्यता'}
              </p>
              <p className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                {weatherData.current.visibility} km
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 5-Day Forecast */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {weatherData.forecast.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`${
              darkMode 
                ? 'bg-slate-700/40 border-slate-600/30' 
                : 'bg-white/40 border-white/20'
            } backdrop-blur-sm p-4 rounded-lg text-center border relative overflow-hidden`}
          >
            <p className={`text-sm font-medium mb-2 ${
              darkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {day.day}
            </p>
            
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="flex justify-center mb-3"
            >
              {getWeatherIcon(day.icon, true)}
            </motion.div>
            
            <div className="space-y-1">
              <p className={`text-lg font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                {day.temp.high}°
              </p>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {day.temp.low}°
              </p>
              <div className="flex items-center justify-center space-x-1">
                <Droplets className={`h-3 w-3 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                <p className={`text-xs ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  {day.rain}%
                </p>
              </div>
            </div>

            {/* Rain animation for rainy days */}
            {day.rain > 50 && rainDrops.slice(0, 8).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-20, 60],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className={`absolute w-0.5 h-3 rounded-full ${
                  darkMode ? 'bg-cyan-400' : 'bg-blue-400'
                }`}
                style={{ left: `${Math.random() * 80 + 10}%`, top: '0%' }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
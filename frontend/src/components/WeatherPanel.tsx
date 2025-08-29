import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Thermometer, Droplets, Wind } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const WeatherPanel: React.FC = () => {
  const weatherData = {
    current: {
      temp: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'partly-cloudy',
    },
    forecast: [
      { day: 'Today', temp: { high: 32, low: 22 }, rain: 0, icon: 'sun' },
      { day: 'Tomorrow', temp: { high: 29, low: 20 }, rain: 80, icon: 'rain' },
      { day: 'Wed', temp: { high: 25, low: 18 }, rain: 60, icon: 'cloud' },
      { day: 'Thu', temp: { high: 30, low: 21 }, rain: 20, icon: 'sun' },
    ],
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sun':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'cloud':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const rainDrops = Array.from({ length: 12 });

  return (
    <Card className="p-6 bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Weather Overview</h2>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-yellow-500"
        >
          <Sun className="h-6 w-6" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Current Temperature */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <Thermometer className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-bold text-gray-800">{weatherData.current.temp}°C</p>
            </div>
          </div>
        </motion.div>

        {/* Humidity */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-xl relative overflow-hidden"
        >
          <div className="flex items-center space-x-3">
            <Droplets className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-2xl font-bold text-gray-800">{weatherData.current.humidity}%</p>
            </div>
          </div>
          {/* Animated water droplets */}
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
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{ left: `${30 + i * 20}%`, top: '10%' }}
            />
          ))}
        </motion.div>

        {/* Wind Speed */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-gray-100 to-slate-100 p-4 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Wind className="h-8 w-8 text-gray-500" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-2xl font-bold text-gray-800">{weatherData.current.windSpeed} km/h</p>
            </div>
          </div>
        </motion.div>

        {/* Rain Forecast */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl relative overflow-hidden"
        >
          <div className="flex items-center space-x-3">
            <CloudRain className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Rain Forecast</p>
              <p className="text-2xl font-bold text-gray-800">80%</p>
            </div>
          </div>
          {/* Rain animation */}
          {rainDrops.map((_, i) => (
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
              className="absolute w-0.5 h-4 bg-blue-400 rounded-full"
              style={{ left: `${Math.random() * 80 + 10}%`, top: '0%' }}
            />
          ))}
        </motion.div>
      </div>

      {/* 4-Day Forecast */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {weatherData.forecast.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/40 backdrop-blur-sm p-4 rounded-lg text-center border border-white/20"
          >
            <p className="text-sm font-medium text-gray-700 mb-2">{day.day}</p>
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="flex justify-center mb-2"
            >
              {getWeatherIcon(day.icon)}
            </motion.div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-gray-800">{day.temp.high}°</p>
              <p className="text-sm text-gray-600">{day.temp.low}°</p>
              <p className="text-xs text-blue-600">{day.rain}% rain</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
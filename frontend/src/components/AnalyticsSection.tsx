import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CircularProgressbar 
} from 'recharts';
import { TrendingUp, Droplets, Leaf, Award, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AnalyticsSectionProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ darkMode, language }) => {
  const waterSavingsData = [
    { month: 'Jan', traditional: 5000, smart: 3200, saved: 1800 },
    { month: 'Feb', traditional: 4800, smart: 3100, saved: 1700 },
    { month: 'Mar', traditional: 6200, smart: 4000, saved: 2200 },
    { month: 'Apr', traditional: 7800, smart: 4600, saved: 3200 },
    { month: 'May', traditional: 8500, smart: 5200, saved: 3300 },
    { month: 'Jun', traditional: 7200, smart: 4800, saved: 2400 },
  ];

  const cropGrowthData = [
    { week: 'W1', growth: 15, water: 300 },
    { week: 'W2', growth: 28, water: 420 },
    { week: 'W3', growth: 45, water: 380 },
    { week: 'W4', growth: 62, water: 450 },
    { week: 'W5', growth: 78, water: 520 },
    { week: 'W6', growth: 89, water: 480 },
  ];

  const efficiencyData = [
    { name: language === 'en' ? 'Water Saved' : 'पानी की बचत', value: 35, color: '#06B6D4' },
    { name: language === 'en' ? 'Optimal Use' : 'उत्तम उपयोग', value: 45, color: '#10B981' },
    { name: language === 'en' ? 'Traditional' : 'पारंपरिक', value: 20, color: '#F59E0B' },
  ];

  const stats = [
    { 
      title: language === 'en' ? 'Water Saved' : 'पानी की बचत', 
      value: '18,500L', 
      change: '+23%', 
      icon: Droplets,
      color: darkMode ? 'text-cyan-400' : 'text-blue-600',
      bgColor: darkMode ? 'bg-cyan-900/30' : 'bg-blue-100'
    },
    { 
      title: language === 'en' ? 'Yield Boost' : 'उत्पादन वृद्धि', 
      value: '34%', 
      change: '+12%', 
      icon: TrendingUp,
      color: darkMode ? 'text-emerald-400' : 'text-green-600',
      bgColor: darkMode ? 'bg-emerald-900/30' : 'bg-green-100'
    },
    { 
      title: language === 'en' ? 'Efficiency' : 'दक्षता', 
      value: '92%', 
      change: '+8%', 
      icon: Target,
      color: darkMode ? 'text-purple-400' : 'text-purple-600',
      bgColor: darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
    },
    { 
      title: language === 'en' ? 'AI Accuracy' : 'AI सटीकता', 
      value: '96%', 
      change: '+5%', 
      icon: Zap,
      color: darkMode ? 'text-pink-400' : 'text-pink-600',
      bgColor: darkMode ? 'bg-pink-900/30' : 'bg-pink-100'
    },
  ];

  return (
    <Card className={`p-6 ${
      darkMode 
        ? 'bg-slate-800/30 border-slate-700/30' 
        : 'bg-white/30 border-white/20'
    } backdrop-blur-lg shadow-xl`}>
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <TrendingUp className={`h-6 w-6 ${darkMode ? 'text-emerald-400' : 'text-green-600'}`} />
        </motion.div>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
          {language === 'en' ? 'Smart Analytics' : 'स्मार्ट विश्लेषण'}
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`${stat.bgColor}/50 backdrop-blur-sm p-4 rounded-xl border ${
              darkMode ? 'border-slate-700/30' : 'border-white/20'
            } relative overflow-hidden`}
          >
            <motion.div
              className={`absolute top-0 right-0 w-16 h-16 rounded-full ${stat.bgColor}/20 -mr-8 -mt-8`}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="flex items-center space-x-3 mb-2 relative z-10">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <h3 className={`text-sm font-medium ${
                darkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                {stat.title}
              </h3>
            </div>
            <motion.p 
              className={`text-2xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'} relative z-10`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            >
              {stat.value}
            </motion.p>
            <p className={`text-sm font-medium relative z-10 ${
              darkMode ? 'text-emerald-400' : 'text-green-600'
            }`}>
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Savings Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`lg:col-span-2 ${
            darkMode ? 'bg-slate-700/40' : 'bg-white/40'
          } backdrop-blur-sm p-4 rounded-xl`}
        >
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
            {language === 'en' ? 'Water Usage vs Traditional' : 'पारंपरिक बनाम स्मार्ट उपयोग'}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={waterSavingsData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                fontSize={12} 
                stroke={darkMode ? '#94A3B8' : '#64748B'}
              />
              <YAxis 
                fontSize={12} 
                stroke={darkMode ? '#94A3B8' : '#64748B'}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)',
                  color: darkMode ? '#F1F5F9' : '#1E293B'
                }}
              />
              <Bar dataKey="traditional" fill="#F59E0B" radius={4} />
              <Bar dataKey="smart" fill="#10B981" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Efficiency Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`${
            darkMode ? 'bg-slate-700/40' : 'bg-white/40'
          } backdrop-blur-sm p-4 rounded-xl`}
        >
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
            {language === 'en' ? 'Water Distribution' : 'पानी का वितरण'}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={efficiencyData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                animationDuration={1500}
              >
                {efficiencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)',
                  color: darkMode ? '#F1F5F9' : '#1E293B'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Growth vs Water Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className={`mt-6 ${
          darkMode ? 'bg-slate-700/40' : 'bg-white/40'
        } backdrop-blur-sm p-4 rounded-xl`}
      >
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
          {language === 'en' ? 'Crop Growth vs Water Usage' : 'फसल वृद्धि बनाम पानी का उपयोग'}
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={cropGrowthData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="week" 
              fontSize={12} 
              stroke={darkMode ? '#94A3B8' : '#64748B'}
            />
            <YAxis 
              fontSize={12} 
              stroke={darkMode ? '#94A3B8' : '#64748B'}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                color: darkMode ? '#F1F5F9' : '#1E293B'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="growth" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="water" 
              stroke="#06B6D4" 
              strokeWidth={3}
              dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  );
};
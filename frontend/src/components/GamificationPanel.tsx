import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Target, Zap, Droplets, Leaf } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GamificationPanelProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export const GamificationPanel: React.FC<GamificationPanelProps> = ({ darkMode, language }) => {
  const badges = [
    {
      id: 'water-saver',
      name: language === 'en' ? 'Water Saver' : 'जल संरक्षक',
      icon: Droplets,
      earned: true,
      description: language === 'en' ? 'Saved 10,000L+ water' : '10,000L+ पानी बचाया',
      color: 'text-blue-500',
      bgColor: darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
    },
    {
      id: 'efficiency-master',
      name: language === 'en' ? 'Efficiency Master' : 'दक्षता गुरु',
      icon: Target,
      earned: true,
      description: language === 'en' ? '90%+ efficiency for 30 days' : '30 दिन 90%+ दक्षता',
      color: 'text-green-500',
      bgColor: darkMode ? 'bg-green-900/30' : 'bg-green-100'
    },
    {
      id: 'ai-pioneer',
      name: language === 'en' ? 'AI Pioneer' : 'AI अग्रणी',
      icon: Zap,
      earned: false,
      description: language === 'en' ? 'Use AI recommendations for 60 days' : '60 दिन AI सुझाव उपयोग',
      color: 'text-purple-500',
      bgColor: darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
    },
    {
      id: 'eco-warrior',
      name: language === 'en' ? 'Eco Warrior' : 'पर्यावरण योद्धा',
      icon: Leaf,
      earned: false,
      description: language === 'en' ? 'Reduce carbon footprint by 50%' : '50% कार्बन फुटप्रिंट कम करें',
      color: 'text-emerald-500',
      bgColor: darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'
    },
  ];

  const achievements = {
    level: 7,
    xp: 2340,
    nextLevelXp: 3000,
    streak: 15,
    totalSaved: 18500,
  };

  return (
    <Card className={`p-6 ${
      darkMode 
        ? 'bg-slate-800/30 border-slate-700/30' 
        : 'bg-white/30 border-white/20'
    } backdrop-blur-lg shadow-xl h-fit`}>
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Trophy className={`h-6 w-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
        </motion.div>
        <h2 className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
          {language === 'en' ? 'Achievements' : 'उपलब्धियां'}
        </h2>
      </div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`${
          darkMode ? 'bg-slate-700/40' : 'bg-white/40'
        } p-4 rounded-xl mb-6`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${
            darkMode ? 'text-slate-300' : 'text-gray-700'
          }`}>
            {language === 'en' ? 'Farmer Level' : 'किसान स्तर'} {achievements.level}
          </span>
          <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            {achievements.xp}/{achievements.nextLevelXp} XP
          </span>
        </div>
        <Progress 
          value={(achievements.xp / achievements.nextLevelXp) * 100} 
          className="h-2 mb-2"
        />
        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          {language === 'en' 
            ? `${achievements.nextLevelXp - achievements.xp} XP to next level`
            : `अगले स्तर के लिए ${achievements.nextLevelXp - achievements.xp} XP`
          }
        </p>
      </motion.div>

      {/* Badges */}
      <div className="space-y-3 mb-6">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              badge.earned 
                ? `${badge.bgColor}/50 ${darkMode ? 'border-slate-600/30' : 'border-white/30'}` 
                : `${darkMode ? 'bg-slate-800/30 border-slate-700/50' : 'bg-gray-50/50 border-gray-200/50'} opacity-60`
            }`}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={badge.earned ? { 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={`p-2 rounded-full ${badge.bgColor}/30`}
              >
                <badge.icon className={`h-5 w-5 ${badge.earned ? badge.color : 'text-gray-400'}`} />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className={`font-medium ${
                    badge.earned 
                      ? (darkMode ? 'text-slate-200' : 'text-gray-800')
                      : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </p>
                  {badge.earned && (
                    <Badge className={`text-xs ${
                      darkMode 
                        ? 'bg-emerald-500/20 text-emerald-300' 
                        : 'bg-emerald-500/20 text-emerald-700'
                    }`}>
                      ✓
                    </Badge>
                  )}
                </div>
                <p className={`text-xs ${
                  darkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  {badge.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`${
          darkMode 
            ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/30' 
            : 'bg-gradient-to-r from-emerald-50 to-green-50'
        } p-4 rounded-lg`}
      >
        <h3 className={`text-sm font-bold mb-3 ${
          darkMode ? 'text-emerald-300' : 'text-emerald-800'
        }`}>
          {language === 'en' ? '🏆 Your Impact' : '🏆 आपका प्रभाव'}
        </h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <motion.p 
              className={`text-xl font-bold ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {achievements.streak}
            </motion.p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'Day Streak' : 'दिन की लकीर'}
            </p>
          </div>
          <div>
            <motion.p 
              className={`text-xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              {(achievements.totalSaved / 1000).toFixed(1)}k
            </motion.p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'Liters Saved' : 'लीटर बचाया'}
            </p>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};
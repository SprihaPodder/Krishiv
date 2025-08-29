import React from 'react';
import { motion } from 'framer-motion';
import { WeatherPanel } from './WeatherPanel';
import { CropSoilInfo } from './CropSoilInfo';
import { IrrigationCard } from './IrrigationCard';
import { AnalyticsSection } from './AnalyticsSection';
import { AlertsTicker } from './AlertsTicker';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export const Dashboard: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Alerts Ticker */}
      <motion.div variants={itemVariants}>
        <AlertsTicker />
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div variants={itemVariants}>
            <WeatherPanel />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <IrrigationCard />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <AnalyticsSection />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <motion.div variants={itemVariants}>
            <CropSoilInfo />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
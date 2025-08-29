import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import IrrigationScheduleForm from './IrrigationScheduleForm'; // Import the form component

export const IrrigationCard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const irrigationData = {
    nextIrrigation: 2,
    waterNeeded: 450,
    skipTomorrow: true,
    lastIrrigation: '3 days ago',
    efficiency: 92,
  };

  // Toggle form visibility handler
  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-blue-50/80 to-green-50/80 backdrop-blur-lg border border-white/30 shadow-2xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {!showForm && (
          <>
            {/* Main Recommendation */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6"
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <Droplets className="h-8 w-8 text-white" />
                </motion.div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Next Irrigation in
              </h2>
              <motion.p
                className="text-6xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {irrigationData.nextIrrigation} Days
              </motion.p>
            </motion.div>

            {/* Water Amount */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white/40 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Water Required</h3>
              <div className="flex items-center justify-center space-x-2">
                <motion.p className="text-4xl font-bold text-blue-600" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}>
                  {irrigationData.waterNeeded}
                </motion.p>
                <span className="text-lg text-gray-600">liters/hectare</span>
              </div>
            </motion.div>

            {/* Special Alert */}
            {irrigationData.skipTomorrow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-6"
              >
                <div className="flex items-center space-x-3">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </motion.div>
                  <div className="text-left">
                    <p className="font-bold text-yellow-800">Skip irrigation tomorrow</p>
                    <p className="text-sm text-yellow-700">🌧️ Heavy rainfall expected (15-25mm)</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button onClick={toggleForm} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Irrigation
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button variant="outline" className="w-full bg-white/50 border-white/30 hover:bg-white/70 font-bold py-3">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Irrigated
                </Button>
              </motion.div>
            </div>
          </>
        )}

        {showForm && (
          <>
            <IrrigationScheduleForm />
            <div className="mt-4">
              <Button onClick={toggleForm} variant="outline" className="w-full py-2">
                Cancel Schedule
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </Card>
  );
};

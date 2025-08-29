import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wheat, Leaf, Mountain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CropSoilInfo: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSoil, setSelectedSoil] = useState('');

  const crops = [
    { id: 'wheat', name: 'Wheat', icon: '🌾', waterNeed: 'Medium' },
    { id: 'rice', name: 'Rice', icon: '🌾', waterNeed: 'High' },
    { id: 'maize', name: 'Maize', icon: '🌽', waterNeed: 'Medium' },
    { id: 'cotton', name: 'Cotton', icon: '🌸', waterNeed: 'High' },
  ];

  const soilTypes = [
    { id: 'clay', name: 'Clay Soil', retention: 'High', icon: '🪨' },
    { id: 'sandy', name: 'Sandy Soil', retention: 'Low', icon: '🏖️' },
    { id: 'loamy', name: 'Loamy Soil', retention: 'Medium', icon: '🌱' },
    { id: 'silt', name: 'Silt Soil', retention: 'Medium', icon: '🏔️' },
  ];

  return (
    <div className="space-y-6">
      {/* Crop Selection */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6 bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Wheat className="h-6 w-6 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800">Crop Selection</h3>
          </div>
          
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full bg-white/50 border-white/30">
              <SelectValue placeholder="Select your crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop.id} value={crop.id}>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{crop.icon}</span>
                    <div>
                      <p className="font-medium">{crop.name}</p>
                      <p className="text-sm text-gray-600">Water need: {crop.waterNeed}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCrop && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4 }}
              className="mt-4 p-4 bg-green-50/50 rounded-lg"
            >
              <p className="text-sm text-gray-700">
                💡 <strong>Tip:</strong> {selectedCrop === 'rice' ? 
                  'Rice requires flooding irrigation. Monitor water levels carefully.' :
                  selectedCrop === 'wheat' ?
                  'Wheat grows best with moderate, consistent watering.' :
                  selectedCrop === 'maize' ?
                  'Maize needs deep watering less frequently.' :
                  'Cotton requires careful water management during flowering.'
                }
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Soil Selection */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-6 bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mountain className="h-6 w-6 text-amber-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800">Soil Type</h3>
          </div>
          
          <Select value={selectedSoil} onValueChange={setSelectedSoil}>
            <SelectTrigger className="w-full bg-white/50 border-white/30">
              <SelectValue placeholder="Select soil type" />
            </SelectTrigger>
            <SelectContent>
              {soilTypes.map((soil) => (
                <SelectItem key={soil.id} value={soil.id}>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{soil.icon}</span>
                    <div>
                      <p className="font-medium">{soil.name}</p>
                      <p className="text-sm text-gray-600">Retention: {soil.retention}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedSoil && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4 }}
              className="mt-4 p-4 bg-amber-50/50 rounded-lg"
            >
              <p className="text-sm text-gray-700">
                🏞️ <strong>Soil Info:</strong> {selectedSoil === 'clay' ? 
                  'Clay soil retains water well but drains slowly. Water less frequently.' :
                  selectedSoil === 'sandy' ?
                  'Sandy soil drains quickly. More frequent watering needed.' :
                  selectedSoil === 'loamy' ?
                  'Loamy soil is ideal for most crops with balanced drainage.' :
                  'Silt soil has good water retention and fertility.'
                }
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="p-6 bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Field Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Soil Moisture</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  />
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Growth Stage</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-green-400 to-green-600"
                  />
                </div>
                <span className="text-sm font-medium">60%</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
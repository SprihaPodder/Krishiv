import { useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onClose: () => void;
}

export default function IrrigationCompletePopup({ onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      >
        <Confetti numberOfPieces={400} recycle={false} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-emerald-500 shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">🎉 Congratulations!</h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            You successfully irrigated your crop 💧🌱
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}




// // src/components/IrrigationCompletePopup.tsx
// import { useState } from "react";
// import Confetti from "react-confetti";
// import { motion, AnimatePresence } from "framer-motion";

// export default function IrrigationCompletePopup() {
//   const [showCongrats, setShowCongrats] = useState(false);

//   const handleIrrigation = () => {
//     setShowCongrats(true);
//     setTimeout(() => setShowCongrats(false), 4000); // Hide after 4s
//   };

//   return (
//     <div className="relative flex flex-col items-center">
//       <button
//         onClick={handleIrrigation}
//         className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105"
//       >
//         ✅ Mark as Irrigated
//       </button>

//       {/* Celebration */}
//       <AnimatePresence>
//         {showCongrats && (
//           <>
//             {/* Confetti effect */}
//             <Confetti recycle={false} numberOfPieces={400} />

//             {/* Congrats Popup */}
//             <motion.div
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0, opacity: 0 }}
//               transition={{ duration: 0.6 }}
//               className="fixed inset-0 flex items-center justify-center z-50"
//             >
//               <div className="bg-white dark:bg-gray-900 border border-emerald-500 shadow-2xl rounded-2xl p-8 text-center">
//                 <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">
//                   🎉 Congratulations!
//                 </h2>
//                 <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
//                   You successfully irrigated your crop 💧🌱
//                 </p>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
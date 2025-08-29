import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Globe, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Globe as GlobeIcon } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: 'en' | 'hi';
  setLanguage: (value: 'en' | 'hi') => void;
  onSettingsOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  language,
  setLanguage,
  onSettingsOpen,
}) => {
  const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en');

  const [dropletClicked, setDropletClicked] = React.useState(false);

  const handleDropletClick = () => {
    setDropletClicked(true);
    setTimeout(() => setDropletClicked(false), 1000);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        darkMode
          ? 'bg-slate-900/20 border-slate-700/30'
          : 'bg-white/20 border-white/20'
      } backdrop-blur-lg border-b sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3" style={{ userSelect: 'none' }}>
            <motion.button
              onClick={handleDropletClick}
              animate={
                dropletClicked
                  ? { scale: [1, 1.5, 1], rotate: [0, 180, 360] }
                  : { y: [0, 3, 0], rotate: [0, 5, -5, 0] }
              }
              transition={
                dropletClicked
                  ? { duration: 1 }
                  : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative"
              aria-label="Droplet animation"
            >
              <Droplets
                className={`h-10 w-10 ${
                  darkMode ? 'text-cyan-400' : 'text-blue-500'
                } drop-shadow-lg`}
              />
              {dropletClicked && (
                <motion.div
                  className={`absolute inset-0 rounded-full ${
                    darkMode ? 'border-cyan-400' : 'border-blue-500'
                  } border-2`}
                  animate={{ scale: [0, 3], opacity: [1, 0] }}
                  transition={{ duration: 1 }}
                />
              )}
            </motion.button>
            <div>
              <h1
                className={`text-2xl font-bold ${
                  darkMode
                    ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text'
                }`}
              >
                {language === 'en' ? 'Krishiv' : 'कृषिव'}
              </h1>
              <p className={`select-none ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'en' ? 'Har Khet Ki Smart Kahani' : 'हर खेत की स्मार्ट कहानी'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 ${
                darkMode ? 'text-gray-300 hover:bg-slate-700/30' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <GlobeIcon className="w-4 h-4" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </Button>

            {/* Theme toggle removed as per your request */}

            <Button
              variant="ghost"
              size="sm"
              aria-label="Settings"
              onClick={onSettingsOpen}
              className={`${
                darkMode ? 'text-gray-300 hover:bg-slate-700/30' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};






// import React from 'react';
// import { motion } from 'framer-motion';
// import { Droplets, Globe, Settings } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Globe as GlobeIcon } from 'lucide-react';

// interface NavbarProps {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
//   language: 'en' | 'hi';
//   setLanguage: (value: 'en' | 'hi') => void;
//   onSettingsOpen: () => void;
// }

// export const Navbar: React.FC<NavbarProps> = ({
//   darkMode,
//   toggleDarkMode,
//   language,
//   setLanguage,
//   onSettingsOpen,
// }) => {
//   const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en');
//   const [dropletClicked, setDropletClicked] = React.useState(false);

//   const handleDropletClick = () => {
//     setDropletClicked(true);
//     setTimeout(() => setDropletClicked(false), 1000);
//   };

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`${
//         darkMode ? 'bg-slate-900/20 border-slate-700/30' : 'bg-white/20 border-white/20'
//       } backdrop-blur-lg border-b sticky top-0 z-50 transition-all duration-300`}
//     >
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3" style={{ userSelect: 'none' }}>
//             <motion.button
//               onClick={handleDropletClick}
//               animate={
//                 dropletClicked
//                   ? { scale: [1, 1.5, 1], rotate: [0, 180, 360] }
//                   : { y: [0, 3, 0], rotate: [0, 5, -5, 0] }
//               }
//               transition={
//                 dropletClicked
//                   ? { duration: 1 }
//                   : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
//               }
//               className="relative"
//               aria-label="Droplet animation"
//             >
//               <Droplets
//                 className={`h-10 w-10 ${darkMode ? 'text-cyan-400' : 'text-blue-500'} drop-shadow-lg`}
//               />
//               {dropletClicked && (
//                 <motion.div
//                   className={`absolute inset-0 rounded-full ${darkMode ? 'border-cyan-400' : 'border-blue-500'} border-2`}
//                   animate={{ scale: [0, 3], opacity: [1, 0] }}
//                   transition={{ duration: 1 }}
//                 />
//               )}
//             </motion.button>
//             <div>
//               <h1
//                 className={`text-2xl font-bold ${
//                   darkMode
//                     ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text'
//                     : 'bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text'
//                 }`}
//               >
//                 {language === 'en' ? 'Krishiv' : 'कृषिव'}
//               </h1>
//               <p className={`select-none ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 {language === 'en' ? 'Har Khet Ki Smart Kahani' : 'हर खेत की स्मार्ट कहानी'}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={toggleLanguage}
//               className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:bg-slate-700/30' : 'text-gray-700 hover:bg-gray-200'}`}
//             >
//               <GlobeIcon className="w-4 h-4" />
//               <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
//             </Button>
//             {/* <Button
//               variant="ghost"
//               size="sm"
//               aria-label="Toggle dark mode"
//               onClick={toggleDarkMode}
//               className={`${darkMode ? 'text-gray-300 hover:bg-slate-700/30' : 'text-gray-700 hover:bg-gray-200'}`}
//             >
//               {darkMode ? 'Light' : 'Dark'}
//             </Button> */}
//             <Button
//               variant="ghost"
//               size="sm"
//               aria-label="Settings"
//               onClick={onSettingsOpen}
//               className={`${darkMode ? 'text-gray-300 hover:bg-slate-700/30' : 'text-gray-700 hover:bg-gray-200'}`}
//             >
//               <Settings className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };






// import React from 'react';
// import { motion } from 'framer-motion';
// import { Droplets, Globe, Settings } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import ThemeToggle from './ThemeToggle'; // Import your ThemeToggle component
// import { Globe as GlobeIcon } from 'lucide-react';

// interface NavbarProps {
//   darkMode: boolean;
//   onToggle: () => void;
//   language: 'en' | 'hi';
//   setLanguage: (value: 'en' | 'hi') => void;
// }

// export const Navbar: React.FC<NavbarProps> = ({
//   darkMode,
//   onToggle,
//   language,
//   setLanguage,
// }) => {
//   const toggleLanguage = () => {
//     setLanguage(language === 'en' ? 'hi' : 'en');
//   };

//   const [dropletClicked, setDropletClicked] = React.useState(false);

//   const handleDropletClick = () => {
//     setDropletClicked(true);
//     setTimeout(() => setDropletClicked(false), 1000);
//   };

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`${
//         darkMode
//           ? 'bg-slate-900/20 border-slate-700/30'
//           : 'bg-white/20 border-white/20'
//       } backdrop-blur-lg border-b sticky top-0 z-50 transition-all duration-300`}
//     >
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <div
//             className="flex items-center space-x-3"
//             style={{ userSelect: 'none' }}
//           >
//             <motion.button
//               onClick={handleDropletClick}
//               animate={
//                 dropletClicked
//                   ? {
//                       scale: [1, 1.5, 1],
//                       rotate: [0, 180, 360],
//                     }
//                   : {
//                       y: [0, 3, 0],
//                       rotate: [0, 5, -5, 0],
//                     }
//               }
//               transition={
//                 dropletClicked
//                   ? {
//                       duration: 1,
//                     }
//                   : {
//                       duration: 3,
//                       repeat: Infinity,
//                       ease: 'easeInOut',
//                     }
//               }
//               className="relative"
//               aria-label="Droplet animation"
//             >
//               <Droplets
//                 className={`h-10 w-10 ${
//                   darkMode ? 'text-cyan-400' : 'text-blue-500'
//                 } drop-shadow-lg`}
//               />
//               {dropletClicked && (
//                 <motion.div
//                   initial={{ scale: 0, opacity: 1 }}
//                   animate={{ scale: 3, opacity: 0 }}
//                   transition={{ duration: 1 }}
//                   className={`absolute inset-0 rounded-full ${
//                     darkMode ? 'border-cyan-400' : 'border-blue-500'
//                   } border-2`}
//                 />
//               )}
//             </motion.button>
//             <div>
//               <h1
//                 className={`text-2xl font-bold bg-gradient-to-r ${
//                   darkMode
//                     ? 'from-cyan-400 to-emerald-400'
//                     : 'from-green-600 to-blue-600'
//                 } bg-clip-text text-transparent`}
//               >
//                 {language === 'en' ? 'Krishiv' : 'कृषिव'}
//               </h1>
//               <p
//                 className={`${
//                   darkMode ? 'text-gray-300' : 'text-gray-600'
//                 } select-none`}
//               >
//                 {language === 'en' ? 'Har Khet Ki Smart Kahani' : 'हर खेत की स्मार्ट कहानी'}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={toggleLanguage}
//               className={`flex items-center space-x-2 ${
//                 darkMode
//                   ? 'hover:bg-slate-700/30 text-gray-300'
//                   : 'hover:bg-gray-200 text-gray-700'
//               }`}
//             >
//               <GlobeIcon className="w-4 h-4" />
//               <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
//             </Button>

//             {/* Theme toggle */}
//             {/* <ThemeToggle darkMode={darkMode} onToggle={onToggle} /> */}

//             <Button
//               variant="ghost"
//               size="sm"
//               aria-label="Settings"
//               className={`${
//                 darkMode
//                   ? 'hover:bg-slate-700/30 text-gray-300'
//                   : 'hover:bg-gray-200 text-gray-700'
//               }`}
//             >
//               <Settings className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };







// import React from 'react';
// import { motion } from 'framer-motion';
// import { Droplets, Globe, Settings } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import ThemeToggle from './ThemeToggle'; // Import ThemeToggle component

// interface NavbarProps {
//   darkMode: boolean;
//   onThemeToggle: () => void;
//   language: 'en' | 'hi';
//   setLanguage: (value: 'en' | 'hi') => void;
// }

// export const Navbar: React.FC<NavbarProps> = ({
//   darkMode,
//   onThemeToggle,
//   language,
//   setLanguage
// }) => {
//   const toggleLanguage = () => {
//     setLanguage(language === 'en' ? 'hi' : 'en');
//   };

//   // Droplet animation state from your original code
//   const [dropletClicked, setDropletClicked] = React.useState(false);
//   const handleDropletClick = () => {
//     setDropletClicked(true);
//     setTimeout(() => setDropletClicked(false), 1000);
//   };

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`${
//         darkMode
//           ? 'bg-slate-900/20 border-slate-700/30'
//           : 'bg-white/20 border-white/20'
//       } backdrop-blur-lg border-b sticky top-0 z-50 transition-all duration-300`}
//     >
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <motion.div
//             className="flex items-center space-x-3"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: 'spring', stiffness: 300 }}
//           >
//             <motion.button
//               onClick={handleDropletClick}
//               animate={
//                 dropletClicked
//                   ? {
//                       scale: [1, 1.5, 1],
//                       rotate: [0, 180, 360],
//                     }
//                   : {
//                       y: [0, -3, 0],
//                       rotate: [0, 5, -5, 0],
//                     }
//               }
//               transition={
//                 dropletClicked
//                   ? {
//                       duration: 1,
//                     }
//                   : {
//                       duration: 3,
//                       repeat: Infinity,
//                       ease: 'easeInOut',
//                     }
//               }
//               className="relative"
//             >
//               <Droplets
//                 className={`h-10 w-10 ${
//                   darkMode ? 'text-cyan-400' : 'text-blue-500'
//                 } drop-shadow-lg`}
//               />

//               {dropletClicked && (
//                 <motion.div
//                   initial={{ scale: 0, opacity: 1 }}
//                   animate={{ scale: 3, opacity: 0 }}
//                   transition={{ duration: 1 }}
//                   className={`absolute inset-0 rounded-full border-2 ${
//                     darkMode ? 'border-cyan-400' : 'border-blue-500'
//                   }`}
//                 />
//               )}
//             </motion.button>

//             <div>
//               <h1
//                 className={`text-2xl font-bold bg-gradient-to-r ${
//                   darkMode
//                     ? 'from-cyan-400 to-emerald-400'
//                     : 'from-green-600 to-blue-600'
//                 } bg-clip-text text-transparent`}
//               >
//                 {language === 'en' ? 'AquaFarm AI' : 'एक्वाफार्म AI'}
//               </h1>
//               <p
//                 className={`text-sm ${
//                   darkMode ? 'text-slate-300' : 'text-gray-600'
//                 }`}
//               >
//                 {language === 'en'
//                   ? 'Smart Irrigation Planner'
//                   : 'स्मार्ट सिंचाई योजनाकार'}
//               </p>
//             </div>
//           </motion.div>

//           <div className="flex items-center space-x-3">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={toggleLanguage}
//               className={`flex items-center space-x-2 ${
//                 darkMode ? 'hover:bg-slate-700/30 text-slate-300' : 'hover:bg-white/20 text-gray-700'
//               }`}
//             >
//               <Globe className="h-4 w-4" />
//               <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
//             </Button>

//             {/* Use ThemeToggle component here */}
//             <ThemeToggle darkMode={darkMode} onToggle={onThemeToggle} />

//             <Button
//               variant="ghost"
//               size="sm"
//               className={`${
//                 darkMode ? 'hover:bg-slate-700/30 text-slate-300' : 'hover:bg-white/20 text-gray-700'
//               }`}
//             >
//               <Settings className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };


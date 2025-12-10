import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import DonationModal from './components/DonationModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  // Donation Modal State
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [donationPackage, setDonationPackage] = useState<{amount: string, name: string}>({
    amount: '0đ',
    name: 'Tùy tâm'
  });

  // Success Message State
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleOpenDonation = (amount: string, name: string) => {
    setDonationPackage({ amount, name });
    setIsDonationOpen(true);
  };

  const handleDonationSuccess = (message: string) => {
    setSuccessMessage(message);
    // Auto hide after 5 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative font-sans text-gray-800 bg-orange-50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 animate-gradient-xy -z-10 fixed"></div>
      
      <DonationModal 
        isOpen={isDonationOpen} 
        onClose={() => setIsDonationOpen(false)} 
        amount={donationPackage.amount}
        packageName={donationPackage.name}
        onSuccess={handleDonationSuccess}
      />

      {/* Thank You Overlay */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white/90 backdrop-blur-xl border-2 border-orange-200 shadow-[0_20px_60px_rgba(251,146,60,0.4)] p-8 rounded-[2.5rem] text-center max-w-md w-full relative overflow-hidden pointer-events-auto">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"></div>
              <Sparkles className="absolute top-4 right-4 text-yellow-400 animate-spin-slow" size={32} />
              <Heart className="absolute bottom-4 left-4 text-pink-400 animate-bounce" size={32} />

              <div className="mb-4 flex justify-center">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-5xl shadow-inner">
                    🥰
                 </div>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Đã nhận được tấm lòng!</h3>
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 leading-relaxed">
                "{successMessage}"
              </p>
              
              <button 
                onClick={() => setSuccessMessage(null)}
                className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-transform active:scale-95 shadow-lg"
              >
                Tuyệt vời ông mặt trời
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        <LandingPage 
          onSelectPackage={handleOpenDonation} 
        />
      </div>
    </div>
  );
};

export default App;
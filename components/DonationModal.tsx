import React, { useEffect, useState } from 'react';
import { X, Copy, Check, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  packageName: string;
  onSuccess?: (message: string) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, amount, packageName, onSuccess }) => {
  const [supportCode, setSupportCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const randomCode = `NT-${Math.floor(1000 + Math.random() * 9000)}`;
      setSupportCode(randomCode);
      setCopied(false);
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    const text = `VIETCOMBANK\nANACE\nVO PHAM TRUONG AN\n${amount}\n${supportCode}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerCustomEffect = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    // Default configuration (fallback)
    let colors = ['#ff0000', '#00ff00', '#0000ff'];
    let particleCountMultiplier = 1;
    let successMsg = "Cảm ơn bạn đã donate!";

    // Logic based on package name
    if (packageName.includes("Lộc Phát")) {
       colors = ['#10b981', '#fbbf24', '#f59e0b']; // Green & Gold
       successMsg = "Tuyệt vời! +68 điểm may mắn đã được cộng vào đời bạn!";
    } else if (packageName.includes("Vui Vẻ")) {
       colors = ['#f97316', '#ef4444', '#eab308', '#3b82f6']; // Rainbow / Bright
       successMsg = "Đã nhận! Tối nay tui có trà sữa uống rồi, cảm ơn bồ tèo!";
    } else if (packageName.includes("Người Yêu")) {
       colors = ['#ec4899', '#db2777', '#be185d', '#ffffff']; // Pinks & Reds
       successMsg = "Yêu anh/em nhất trên đời! Chụt chụt 😘";
    } else if (packageName.includes("Dân Chơi")) {
       colors = ['#a855f7', '#6366f1', '#ec4899']; // Purple/Neon
       successMsg = "U là trời! Đẳng cấp dân chơi là đây. Respect 🙏";
       particleCountMultiplier = 1.5;
    } else if (packageName.includes("Shark Tank")) {
       colors = ['#fbbf24', '#d97706', '#ffffff']; // Pure Gold
       successMsg = "Shark đã chốt deal! Em hứa sẽ sinh lời (bằng cân nặng)!";
       particleCountMultiplier = 2;
    } else if (packageName.includes("Vô Cực")) {
       colors = ['#ffffff', '#000000', '#ef4444', '#3b82f6']; // Everything
       successMsg = "ĐÃ NHẬN ĐƯỢC LINH HỒN CỦA BẠN. CHỦ NHÂN!!! 🙇‍♂️";
       particleCountMultiplier = 3;
    }

    // Call the success callback immediately to show the popup in App.tsx
    if (onSuccess) onSuccess(successMsg);

    // Fire Confetti Loop
    (function frame() {
      confetti({
        particleCount: 5 * particleCountMultiplier,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 101 // Higher than modals
      });
      confetti({
        particleCount: 5 * particleCountMultiplier,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 101
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Special Burst for specific packages
    if (packageName.includes("Người Yêu")) {
        // Heart-like colors burst
         setTimeout(() => {
             confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ec4899', '#ffc0cb'],
                zIndex: 101,
                scalar: 1.2
             });
         }, 500);
    }
  };

  const handleConfirm = () => {
      // 1. Close modal immediately
      onClose();

      // 2. Trigger Visual Effects & Success Message
      triggerCustomEffect();
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-[90%] sm:w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative z-10"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 flex justify-between items-start text-white relative overflow-hidden">
             <div className="relative z-10">
                 <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Xác nhận đầu tư</p>
                 <h3 className="font-black text-xl leading-tight">Cổng Thanh Toán <br/>Niềm Tin</h3>
             </div>
             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors relative z-10">
               <X size={24} />
             </button>
             <HeartHandshake className="absolute -bottom-4 -right-4 text-white opacity-10" size={100} />
          </div>

          <div className="p-5 space-y-5">
            <div className="text-center bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <p className="text-xs text-gray-500 mb-1 font-bold uppercase">Gói đã chọn</p>
              <h4 className="text-lg font-bold text-orange-600 mb-1">{packageName}</h4>
              <p className="text-3xl font-black text-gray-900">{amount}</p>
            </div>

            {/* Bank Card Look */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 font-black text-4xl italic group-hover:scale-110 transition-transform duration-500">VCB</div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] opacity-70 uppercase tracking-wider font-bold">Ngân hàng</p>
                        <p className="font-bold">VIETCOMBANK</p>
                    </div>
                    <img src="https://img.icons8.com/fluency/48/sim-card-chip.png" className="w-8 opacity-80" alt="chip"/>
                </div>
                
                <div onClick={copyToClipboard} className="cursor-pointer active:scale-95 transition-transform">
                  <p className="text-[10px] opacity-70 uppercase tracking-wider font-bold mb-1">Số tài khoản (Chạm để copy)</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-yellow-300 drop-shadow-md">ANACE</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] opacity-70 uppercase tracking-wider font-bold">Chủ tài khoản</p>
                  <p className="font-bold uppercase tracking-wide">VÕ PHẠM TRƯỜNG AN</p>
                </div>
              </div>
            </div>

            {/* Transfer Memo */}
            <div>
              <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-bold text-gray-700">Nội dung CK (Quan trọng!!)</p>
                  <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">Không được sai</span>
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl border border-gray-200">
                <span className="font-mono font-bold text-lg text-gray-800 tracking-wide">{supportCode}</span>
                <button 
                  onClick={copyToClipboard}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-gray-800 shadow-sm hover:bg-gray-50'}`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Đã copy' : 'Copy'}
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-3 italic">
                *Lưu ý: Sau khi chuyển khoản, vui lòng hít thở sâu và chờ đợi tín hiệu từ vũ trụ (hoặc check story của tui).
              </p>
            </div>

            <button 
              onClick={handleConfirm}
              className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-xl active:scale-95"
            >
              Đã chuyển khoản (Uy tín)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DonationModal;
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full border-t border-rose-200/60 bg-gradient-to-b from-white/90 to-rose-50/90 py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
        {/* Core Prompt Requirement Statement */}
        <div className="flex items-center justify-center gap-2 text-rose-600 font-serif text-base sm:text-xl font-bold tracking-tight">
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </motion.div>
          <span>Chúc những cô gái A2 luôn được yêu thương và trân trọng!</span>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </motion.div>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed">
          Gửi trọn ngàn yêu thương, bình an và hạnh phúc rạng ngời đến tất cả những cô gái tuyệt vời của lớp A2.
        </p>

        {/* Quiet Copyright */}
        <div className="pt-4 border-t border-rose-100/70 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>Hộp Quà Yêu Thương — Chúc Những Cô Gái A2</span>
          <span className="flex items-center gap-1">
            <span>Dành riêng cho A2</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            <span>2026</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

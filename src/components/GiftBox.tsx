import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GiftBoxProps {
  isOpen: boolean;
  onOpen: () => void;
  onReset: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ isOpen, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleBoxClick = () => {
    if (isOpen) return;

    soundManager.playOpenChimes();

    // Trigger colorful celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#fbcfe8', '#ffffff', '#e11d48'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.2, y: 0.65 },
        colors: ['#fda4af', '#fef08a', '#ec4899'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.8, y: 0.65 },
        colors: ['#fda4af', '#fef08a', '#ec4899'],
      });
    }, 200);

    onOpen();
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
      {/* Golden Aura Glow behind the gift box */}
      <motion.div
        animate={{
          scale: isOpen ? [1, 1.4, 1.25] : [1, 1.08, 1],
          opacity: isOpen ? 0.9 : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: isOpen ? 1.5 : 3,
          repeat: isOpen ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-gradient-to-tr from-rose-400/40 via-amber-300/40 to-pink-300/30 blur-3xl"
      />

      {/* 3D Gift Box Stage Container */}
      <div
        className="relative cursor-pointer perspective-1000 group"
        onClick={handleBoxClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBoxClick();
          }
        }}
        aria-label={isOpen ? 'Hộp quà đã mở' : 'Nhấn để mở hộp quà 20/10'}
      >
        {/* Floating Sparkles floating around closed box */}
        {!isOpen && (
          <>
            <motion.div
              animate={{ y: [-4, 6, -4], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -left-6 text-amber-400 pointer-events-none"
            >
              <Sparkles className="w-6 h-6 drop-shadow-sm" />
            </motion.div>
            <motion.div
              animate={{ y: [6, -4, 6], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="absolute -top-4 -right-5 text-rose-400 pointer-events-none"
            >
              <Heart className="w-5 h-5 fill-rose-300 drop-shadow-sm" />
            </motion.div>
            <motion.div
              animate={{ y: [-3, 5, -3], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-2 -right-7 text-amber-300 pointer-events-none"
            >
              <Sparkles className="w-5 h-5 drop-shadow-sm" />
            </motion.div>
          </>
        )}

        {/* The Gift Box Structure */}
        <motion.div
          animate={
            isOpen
              ? { scale: 0.95, y: 15 }
              : isHovered
              ? { scale: 1.04, rotate: [0, -2, 2, -1, 0], y: -5 }
              : { rotate: [0, -1.5, 1.5, -1, 0], y: [0, -4, 0] }
          }
          transition={
            isOpen
              ? { duration: 0.6, ease: 'easeOut' }
              : isHovered
              ? { duration: 0.45, repeat: Infinity, repeatType: 'reverse' }
              : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative w-52 h-52 sm:w-64 sm:h-64 flex flex-col items-center justify-end"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Inner Light Beam bursting out when opened */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0, y: 40 }}
                animate={{ opacity: 1, scaleY: 1.5, y: -40 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-x-8 -top-24 h-48 pointer-events-none z-10 flex flex-col items-center justify-center"
              >
                <div className="w-full h-full bg-gradient-to-t from-amber-300/80 via-pink-400/40 to-transparent blur-xl rounded-full" />
                {/* Floating hearts emerging from inside */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, x: 0, opacity: 0, scale: 0.4 }}
                    animate={{
                      y: -80 - i * 20,
                      x: (i % 2 === 0 ? 1 : -1) * (20 + i * 15),
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.28,
                      ease: 'easeOut',
                    }}
                    className="absolute text-rose-500"
                  >
                    <Heart className="w-6 h-6 fill-rose-400 drop-shadow-md" />
                  </motion.div>
                ))}

                {/* Emerging letter scroll from inside box */}
                <motion.div
                  initial={{ y: 40, scale: 0.3, opacity: 0 }}
                  animate={{ y: -85, scale: 0.9, opacity: [0, 1, 1] }}
                  exit={{ y: 20, scale: 0.2, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute -top-12 z-20 px-3.5 py-1.5 bg-gradient-to-r from-amber-100 via-white to-rose-100 border border-amber-300/90 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold text-rose-800 pointer-events-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>💌 Lời chúc A2 đang hiện ra...</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GIFT LID + BIG RIBBON BOW */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? {
                    y: -110,
                    x: -25,
                    rotateX: -45,
                    rotateZ: -24,
                    scale: 0.95,
                    opacity: 0.92,
                  }
                : {
                    y: 0,
                    x: 0,
                    rotateX: 0,
                    rotateZ: 0,
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="absolute -top-3 sm:-top-4 z-20 w-[106%] h-14 sm:h-16 flex flex-col items-center"
            style={{ transformOrigin: 'top left' }}
          >
            {/* Big Golden Satin Bow On Top */}
            <div className="relative -top-7 sm:-top-9 flex items-center justify-center">
              {/* Left Bow Loop */}
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border-4 border-amber-300 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-md transform -rotate-35 origin-right transition-transform" />
              {/* Center Bow Knot with jewel shine */}
              <div className="relative -mx-2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-500 shadow-lg border border-amber-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/80 animate-ping" />
              </div>
              {/* Right Bow Loop */}
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border-4 border-amber-300 bg-gradient-to-bl from-amber-200 via-amber-400 to-amber-600 shadow-md transform rotate-35 origin-left transition-transform" />
              {/* Hanging Ribbon Tails */}
              <div className="absolute top-6 left-1 w-3 h-7 sm:w-4 sm:h-9 bg-gradient-to-b from-amber-400 to-amber-600 transform -rotate-20 rounded-b shadow-sm" />
              <div className="absolute top-6 right-1 w-3 h-7 sm:w-4 sm:h-9 bg-gradient-to-b from-amber-400 to-amber-600 transform rotate-20 rounded-b shadow-sm" />
            </div>

            {/* Lid Box Rim */}
            <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-rose-600 via-rose-500 to-rose-700 shadow-xl border-t border-rose-400/60 overflow-hidden flex items-center justify-center">
              {/* Golden Ribbon Strip on Lid Horizontal */}
              <div className="absolute inset-x-0 h-4 sm:h-5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 shadow-inner border-y border-amber-500/40" />
              {/* Golden Ribbon Strip on Lid Vertical */}
              <div className="absolute inset-y-0 w-5 sm:w-6 bg-gradient-to-b from-amber-300 via-amber-200 to-amber-500 shadow-inner border-x border-amber-500/40 z-10" />
              {/* Lid Edge Shading */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15 pointer-events-none" />
            </div>
          </motion.div>

          {/* GIFT BOX BODY */}
          <div className="relative w-full h-40 sm:h-52 rounded-2xl bg-gradient-to-b from-rose-700 via-rose-600 to-rose-800 shadow-2xl border-b-4 border-rose-900/60 overflow-hidden flex items-center justify-center">
            {/* Satin Sheen Diagonal Reflection */}
            <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent transform rotate-45 pointer-events-none" />

            {/* Vertical Golden Ribbon */}
            <div className="absolute inset-y-0 w-6 sm:w-7 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-lg border-x border-amber-600/30 flex items-center justify-center">
              <div className="w-[1px] h-full bg-amber-100/60" />
            </div>

            {/* Horizontal Golden Ribbon */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 sm:h-7 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-500 shadow-lg border-y border-amber-600/30 flex flex-col justify-center">
              <div className="h-[1px] w-full bg-amber-100/60" />
            </div>

            {/* A2 Gold Crest Badge on the box body */}
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border-2 border-amber-200/90 shadow-lg flex flex-col items-center justify-center text-rose-950 font-bold">
              <span className="text-[10px] tracking-widest uppercase opacity-85">Gửi tặng</span>
              <span className="text-base sm:text-lg leading-none font-extrabold tracking-tight">A2</span>
              <span className="text-[9px] text-rose-900 opacity-90">💖</span>
            </div>

            {/* Shadow Depth at bottom of box */}
            <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
          </div>

          {/* Box Cast Shadow on the Floor */}
          <motion.div
            animate={{
              scaleX: isOpen ? 0.9 : isHovered ? 1.08 : [0.96, 1.04, 0.96],
              opacity: isOpen ? 0.5 : [0.6, 0.8, 0.6],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-48 sm:w-60 h-5 bg-black/25 rounded-full blur-md -mt-2 pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Prominent Action Button: MỞ QUÀ NGAY 🎁 */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleBoxClick}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-xl shadow-rose-500/35 hover:shadow-rose-500/50 hover:from-rose-600 hover:to-pink-600 border border-white/30 transition-all cursor-pointer overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/25 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
            <Gift className="w-5 h-5 text-amber-200 animate-bounce" />
            <span>MỞ QUÀ NGAY 🎁</span>
          </motion.button>
          <p className="text-xs sm:text-sm text-rose-800/80 font-medium flex items-center gap-1.5">
            <span>✨ Chạm vào hộp hoặc nhấn nút để đón nhận lời chúc bất ngờ</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  RotateCcw, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Quote, 
  Bookmark,
  Volume2,
  X
} from 'lucide-react';
import { Wish } from '../data/wishes';
import { soundManager } from '../utils/audio';

interface WishCardProps {
  wish: Wish;
  totalWishes: number;
  seenCount: number;
  onNextWish: () => void;
  onResetBox: () => void;
}

export const WishCard: React.FC<WishCardProps> = ({
  wish,
  totalWishes,
  seenCount,
  onNextWish,
  onResetBox,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyWish = async () => {
    soundManager.playClick();
    const fullText = `💌 Lời chúc gửi tới: ${wish.recipient}\n\n"${wish.content}"\n\n— Chúc những cô gái A2 💖`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        showToast('Đã sao chép lời chúc vào khay nhớ tạm! 📋');
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        showToast('Đã sao chép lời chúc! 📋');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      showToast('Không thể sao chép tự động, bạn có thể bôi đen chữ để copy nhé.');
    }
  };

  const handleShareWish = async () => {
    soundManager.playClick();
    const shareData = {
      title: 'Chúc những cô gái A2 💖',
      text: `💌 Lời chúc gửi tới: ${wish.recipient}\n\n"${wish.content}"\n\n— Chúc những cô gái A2 💖`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyWish();
        }
      }
    } else {
      handleCopyWish();
    }
  };

  // Text to Speech using Web Speech API (Vietnamese voice if available)
  const handleSpeakWish = () => {
    soundManager.playClick();
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ đọc lời chúc tự động.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(wish.content);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.includes('vi') || v.lang.includes('VN'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      {/* Click outside backdrop to repack box */}
      <div 
        className="fixed inset-0"
        onClick={onResetBox}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.15, y: 300, rotateX: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.15, y: 260, rotateX: 25 }}
        transition={{ type: 'spring', damping: 22, stiffness: 190, mass: 0.85 }}
        className="relative w-full max-w-2xl mx-auto my-auto z-10"
      >
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-rose-950/90 text-white text-xs sm:text-sm font-medium rounded-full shadow-xl border border-rose-300/40 backdrop-blur-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Artisanal Letter Envelope & Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#fffafb] via-white to-[#fff5f6] p-6 sm:p-10 shadow-2xl shadow-rose-900/30 border-2 border-rose-200/90 backdrop-blur-sm">
          {/* Close button X in top-right */}
          <button
            onClick={onResetBox}
            title="Đóng nắp hộp quà"
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative Golden Corner Accents */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/80 rounded-tl pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/80 rounded-tr pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/80 rounded-bl pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/80 rounded-br pointer-events-none" />

          {/* Vintage Postmark / Wax Seal Stamp */}
          <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-6 pr-8">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Heart className="w-4 h-4 fill-rose-500" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-rose-500 font-semibold">
                  Thư gửi những cô gái A2
                </p>
                <h4 className="text-sm font-bold text-slate-800">{wish.categoryLabel}</h4>
              </div>
            </div>

          <div className="flex items-center gap-2">
            {/* Exploration counter */}
            <span className="text-xs font-mono tabular-nums text-slate-400 bg-rose-50/80 px-2.5 py-1 rounded-md border border-rose-100">
              Đã mở {seenCount}/{totalWishes}
            </span>

            {/* Read aloud button */}
            <button
              onClick={handleSpeakWish}
              title={isSpeaking ? 'Dừng đọc' : 'Đọc lời chúc'}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-white text-slate-600 hover:text-rose-600 hover:bg-rose-50 border-slate-200'
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recipient Ribbon Kicker */}
        <div className="mb-4 flex items-center gap-2 text-rose-700 font-semibold text-sm">
          <Bookmark className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>Gửi tặng: <strong className="text-rose-900 font-bold">{wish.recipient}</strong></span>
        </div>

        {/* Main Wish Content with Typewriter / Fade Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative my-4 py-2"
          >
            <Quote className="absolute -top-3 -left-2 w-8 h-8 text-rose-200/70 -scale-x-100 pointer-events-none" />
            
            <p className="text-base sm:text-xl leading-relaxed text-slate-800 font-medium pl-6 pr-2 font-sans tracking-wide">
              {wish.content}
            </p>

            {/* Poetic couplet if present */}
            {wish.poem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 mx-2 p-3 rounded-xl bg-rose-50/70 border border-rose-100/90 text-rose-800 text-center font-serif italic text-sm sm:text-base"
              >
                "{wish.poem}"
              </motion.div>
            )}

            {/* Highlight takeaway phrase */}
            <div className="mt-4 flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50/90 px-3 py-1 rounded-full border border-amber-200/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {wish.highlight}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Primary Interactive Action Toolbar */}
        <div className="mt-8 pt-5 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Next Random Wish Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNextWish}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-md shadow-rose-400/30 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 animate-spin-hover" />
            <span>NHẬN LỜI CHÚC KHÁC 💌</span>
          </motion.button>

          {/* Secondary Actions: Share & Copy & Re-pack Box */}
          <div className="w-full sm:w-auto flex items-center justify-center gap-2">
            <button
              onClick={handleShareWish}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ</span>
            </button>

            <button
              onClick={handleCopyWish}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>

            <button
              onClick={onResetBox}
              title="Đóng nắp hộp quà để mở lại"
              className="p-2.5 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);
};

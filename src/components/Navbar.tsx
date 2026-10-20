import React, { useState } from 'react';
import { Volume2, VolumeX, Music, PenLine, Gift } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenCustomModal: () => void;
  onOpenGiftBox: () => void;
  isOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCustomModal,
  onOpenGiftBox,
  isOpen,
}) => {
  const [isMusicActive, setIsMusicActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleBackgroundMusic = () => {
    soundManager.playClick();
    const newState = soundManager.toggleMusic();
    setIsMusicActive(newState);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMuted(nextMute);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-rose-100/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold font-serif tracking-tight text-rose-600 hover:text-rose-700 whitespace-nowrap shrink-0 transition-colors flex items-center gap-2"
        >
          <span>Chúc Những Cô Gái A2</span>
          <span className="text-rose-500">💖</span>
        </a>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#hop-qua"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0"
          >
            Hộp Quà A2
          </a>
          <a
            href="#kho-loi-chuc"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0"
          >
            Kho Lời Chúc A2
          </a>
          <button
            onClick={onOpenCustomModal}
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1 cursor-pointer"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Tự Viết Thiệp</span>
          </button>
        </nav>

        {/* Zone 3: Audio Controls & Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Music Toggle */}
          <button
            onClick={toggleBackgroundMusic}
            title={isMusicActive ? 'Tắt nhạc nền lãng mạn' : 'Bật nhạc nền lãng mạn'}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isMusicActive
                ? 'bg-rose-50 text-rose-600 border-rose-300 shadow-xs ring-2 ring-rose-200'
                : 'bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 border-slate-200'
            }`}
          >
            <Music className={`w-4 h-4 ${isMusicActive ? 'animate-spin-slow' : ''}`} />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh hiệu ứng'}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-400 border-slate-200'
                : 'bg-white text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 border-slate-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          {!isOpen && (
            <button
              onClick={onOpenGiftBox}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-full shadow-md shadow-rose-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>Mở Quà</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

import React, { useState, useMemo } from 'react';
import { Search, Heart, Copy, Check, Share2, Sparkles, BookOpen } from 'lucide-react';
import { WISHES, CATEGORIES, Wish } from '../data/wishes';
import { soundManager } from '../utils/audio';

interface WishesGalleryProps {
  onSelectWishForGiftBox: (wish: Wish) => void;
}

export const WishesGallery: React.FC<WishesGalleryProps> = ({ onSelectWishForGiftBox }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredWishes = useMemo(() => {
    return WISHES.filter((w) => {
      const matchCat = activeCategory === 'all' || w.category === activeCategory;
      const matchSearch =
        searchTerm.trim() === '' ||
        w.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.highlight.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (w.poem && w.poem.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [searchTerm, activeCategory]);

  const handleCopy = async (wish: Wish) => {
    soundManager.playClick();
    const text = `💌 ${wish.recipient}: "${wish.content}"\n— Chúc mừng 20/10 💖`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      setCopiedId(wish.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleShare = async (wish: Wish) => {
    soundManager.playClick();
    const text = `💌 ${wish.recipient}: "${wish.content}"\n— Chúc những cô gái A2 💖`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Chúc những cô gái A2 💖',
          text,
          url: window.location.href,
        });
      } catch {
        handleCopy(wish);
      }
    } else {
      handleCopy(wish);
    }
  };

  return (
    <section id="kho-loi-chuc" className="w-full max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Kho Lời Chúc Dành Riêng Cho A2 ({WISHES.length} lời chúc)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
          Lời Chúc Dành Cho Những Cô Gái A2
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Những lời chúc ngọt ngào, tinh nghịch và đáng yêu nhất gửi tặng đến các nàng thơ lớp A2.
        </p>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl shadow-rose-950/5 border border-rose-100 mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm lời chúc A2 (học giỏi, nụ cười, xinh đẹp, crush...)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Grid of Wish Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWishes.map((wish) => (
          <div
            key={wish.id}
            className="group relative flex flex-col justify-between rounded-2xl bg-white/95 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-rose-100/90"
          >
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                  {wish.categoryLabel}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {wish.recipient}
                </span>
              </div>

              {/* Wish text */}
              <p className="text-slate-800 text-sm leading-relaxed mb-4">
                "{wish.content}"
              </p>

              {/* Optional poem */}
              {wish.poem && (
                <div className="mb-4 p-2.5 rounded-lg bg-rose-50/50 border border-rose-100/60 text-xs italic text-rose-800 font-serif text-center">
                  "{wish.poem}"
                </div>
              )}
            </div>

            {/* Footer card actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50/80 px-2 py-0.5 rounded truncate max-w-[130px]">
                {wish.highlight}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelectWishForGiftBox(wish)}
                  title="Đưa vào hộp quà để mở"
                  className="px-2.5 py-1 rounded-md text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                >
                  Mở thẻ này 🎁
                </button>
                <button
                  onClick={() => handleCopy(wish)}
                  title="Sao chép lời chúc"
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {copiedId === wish.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => handleShare(wish)}
                  title="Chia sẻ lời chúc"
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWishes.length === 0 && (
        <div className="text-center py-16 bg-white/60 rounded-2xl border border-rose-100">
          <Heart className="w-10 h-10 text-rose-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">Không tìm thấy lời chúc phù hợp</h3>
          <p className="text-sm text-slate-500 mt-1">Hãy thử tìm với từ khóa khác hoặc chuyển danh mục nhé.</p>
        </div>
      )}
    </section>
  );
};

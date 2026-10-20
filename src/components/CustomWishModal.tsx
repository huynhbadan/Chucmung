import React, { useState } from 'react';
import { X, Sparkles, Heart, Send } from 'lucide-react';
import { Wish } from '../data/wishes';
import { soundManager } from '../utils/audio';

interface CustomWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCustomWish: (wish: Wish) => void;
}

export const CustomWishModal: React.FC<CustomWishModalProps> = ({
  isOpen,
  onClose,
  onSubmitCustomWish,
}) => {
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [highlight, setHighlight] = useState('');
  const [poem, setPoem] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !content.trim()) return;

    soundManager.playClick();
    const newWish: Wish = {
      id: `custom-${Date.now()}`,
      category: 'a2',
      categoryLabel: 'Lời chúc riêng cho A2',
      recipient: recipient.trim(),
      content: content.trim(),
      highlight: highlight.trim() || 'Dành tặng bạn gái A2',
      poem: poem.trim() || undefined,
    };

    onSubmitCustomWish(newWish);
    onClose();
  };

  const handleQuickTemplate = (tempRecipient: string, tempContent: string, tempHighlight: string) => {
    soundManager.playClick();
    setRecipient(tempRecipient);
    setContent(tempContent);
    setHighlight(tempHighlight);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-rose-500">
          <Heart className="w-5 h-5 fill-rose-500" />
          <h3 className="text-xl font-bold font-serif text-slate-900">
            Tự Viết Lời Chúc Gửi Cô Gái A2
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Tạo bức thư chúc mừng mang dấu ấn của riêng bạn và nạp trực tiếp vào hộp quà bí mật dành cho các cô gái A2!
        </p>

        {/* Quick Suggestion Chips */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-600 mb-2">Gợi ý mẫu nhanh:</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickTemplate('Những cô gái A2', 'Chúc những cô gái A2 luôn xinh tươi, rạng rỡ, học giỏi và mãi là niềm tự hào của cả lớp A2!', 'Niềm tự hào A2')}
              className="text-xs px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 font-semibold hover:bg-rose-200 border border-rose-300 transition-colors cursor-pointer"
            >
              🌸 Những cô gái A2
            </button>
            <button
              type="button"
              onClick={() => handleQuickTemplate('Bạn nữ A2', 'Chúc bạn luôn tươi cười, thi cử đạt điểm cao và ngày càng xinh đẹp!', 'Xinh tươi, học giỏi')}
              className="text-xs px-3 py-1.5 rounded-full bg-pink-100 text-pink-800 font-semibold hover:bg-pink-200 border border-pink-300 transition-colors cursor-pointer"
            >
              ✨ Bạn nữ A2
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên người nhận (ví dụ: Mẹ yêu, Cô Lan, Bé Thảo, ...) *
            </label>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Nhập tên người bạn muốn gửi tặng..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nội dung lời chúc ngọt ngào *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết những lời chân thành từ đáy tim bạn gửi tới người ấy..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Câu thơ hoặc nhắn gửi ngắn (tùy chọn)
            </label>
            <input
              type="text"
              value={poem}
              onChange={(e) => setPoem(e.target.value)}
              placeholder="Ví dụ: Nụ cười em tựa ngàn hoa khoe sắc..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cụm từ ghi nhớ (tùy chọn)
            </label>
            <input
              type="text"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              placeholder="Ví dụ: Mãi mãi yêu thương, Rực rỡ như hoa..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Nạp Vào Hộp Quà & Mở Ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

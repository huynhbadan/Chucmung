import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WISHES, Wish } from './data/wishes';
import { Navbar } from './components/Navbar';
import { GiftBox } from './components/GiftBox';
import { WishCard } from './components/WishCard';
import { WishesGallery } from './components/WishesGallery';
import { CustomWishModal } from './components/CustomWishModal';
import { Footer } from './components/Footer';
import { FallingPetals } from './components/FallingPetals';
import { soundManager } from './utils/audio';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWish, setCurrentWish] = useState<Wish>(() => {
    const randomIndex = Math.floor(Math.random() * WISHES.length);
    return WISHES[randomIndex];
  });
  const [seenWishIds, setSeenWishIds] = useState<Set<string>>(new Set());
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Non-repeating random picker from A2 wishes pool
  const pickNextWish = useCallback(() => {
    soundManager.playNextWishSound();

    const pool = WISHES;
    if (pool.length === 0) return;

    const unseen = pool.filter((w) => !seenWishIds.has(w.id));

    let chosen: Wish;
    if (unseen.length === 0) {
      const resetPool = pool.filter((w) => w.id !== currentWish.id);
      chosen = resetPool[Math.floor(Math.random() * resetPool.length)] || pool[0];
      setSeenWishIds(new Set([chosen.id]));
    } else {
      chosen = unseen[Math.floor(Math.random() * unseen.length)];
      setSeenWishIds((prev) => new Set(prev).add(chosen.id));
    }

    setCurrentWish(chosen);
  }, [seenWishIds, currentWish.id]);

  const handleOpenBox = () => {
    setIsOpen(true);
    setSeenWishIds((prev) => new Set(prev).add(currentWish.id));
  };

  const handleResetBox = () => {
    soundManager.playClick();
    setIsOpen(false);
  };

  const handleSelectWishFromGallery = (wish: Wish) => {
    setCurrentWish(wish);
    setIsOpen(true);
    setSeenWishIds((prev) => new Set(prev).add(wish.id));

    const el = document.getElementById('hop-qua');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCustomWishSubmit = (newWish: Wish) => {
    setCurrentWish(newWish);
    setIsOpen(true);
    setSeenWishIds((prev) => new Set(prev).add(newWish.id));

    const el = document.getElementById('hop-qua');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff6f7] via-[#fff1f3] to-[#ffeef1] text-slate-800 relative selection:bg-rose-200 selection:text-rose-900">
      {/* High-performance falling rose petals canvas */}
      <FallingPetals />

      {/* Top Navigation */}
      <Navbar
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onOpenGiftBox={handleOpenBox}
        isOpen={isOpen}
      />

      <main className="relative z-10 flex flex-col items-center">
        {/* HERO SECTION */}
        <section
          id="hop-qua"
          className="w-full max-w-5xl mx-auto px-4 pt-10 pb-16 flex flex-col items-center text-center scroll-mt-20"
        >
          {/* Primary Main Headline: ONLY 'Chúc những cô gái A2' */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-slate-900 max-w-4xl text-balance leading-tight mb-2"
          >
            Chúc những cô gái A2{' '}
            <span className="text-rose-500">💖</span>
          </motion.h1>

          {/* CENTRAL 3D INTERACTIVE GIFT BOX */}
          <div className="w-full mt-4">
            <GiftBox
              isOpen={isOpen}
              onOpen={handleOpenBox}
              onReset={handleResetBox}
            />
          </div>

          {/* WISH CARD (Appears when box is opened) */}
          <AnimatePresence>
            {isOpen && (
              <WishCard
                wish={currentWish}
                totalWishes={WISHES.length}
                seenCount={seenWishIds.size}
                onNextWish={pickNextWish}
                onResetBox={handleResetBox}
              />
            )}
          </AnimatePresence>
        </section>

        {/* SECTION: BROWSE ALL WISHES GALLERY FOR A2 */}
        <WishesGallery onSelectWishForGiftBox={handleSelectWishFromGallery} />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* CUSTOM WISH MODAL */}
      <CustomWishModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSubmitCustomWish={handleCustomWishSubmit}
      />
    </div>
  );
}

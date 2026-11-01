import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface Props {
  images: string[];
  name: string;
}

export default function ProductDetailGallery({ images, name }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const galleryList = images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'];

  const nextImage = () => {
    if (galleryList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % galleryList.length);
  };

  const prevImage = () => {
    if (galleryList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      nextImage(); // Swipe left -> next image
    } else if (distance < -40) {
      prevImage(); // Swipe right -> prev image
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="space-y-3">
      {/* Main Showcase Image */}
      <div
        className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 select-none group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={galleryList[currentIndex]}
          alt={`${name} - Ảnh ${currentIndex + 1}`}
          decoding="async"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Image Counter */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#451a03]/90 text-amber-200 text-[11px] font-bold shadow-xs">
          Ảnh {currentIndex + 1} / {galleryList.length}
        </div>

        {/* Next / Prev Navigation Buttons */}
        {galleryList.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#451a03]/90 hover:bg-[#5c2406] text-white flex items-center justify-center transition-transform active:scale-90 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Ảnh kế tiếp"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#451a03]/90 hover:bg-[#5c2406] text-white flex items-center justify-center transition-transform active:scale-90 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {galleryList.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
          {galleryList.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                currentIndex === idx
                  ? 'border-red-600 ring-2 ring-red-300 shadow-xs'
                  : 'border-stone-200 opacity-70 hover:opacity-100'
              }`}
              aria-label={`Chọn ảnh ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                loading="lazy"
                decoding="async"
                width={96}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

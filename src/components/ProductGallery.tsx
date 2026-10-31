import React, { useState, useRef } from 'react';
import type { Product } from '../types';
import { Eye, X, ZoomIn, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  products: Product[];
}

interface ModalProductData {
  title: string;
  wood: string;
  dim: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  currentIndex: number;
}

export default function ProductGallery({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalProduct, setModalProduct] = useState<ModalProductData | null>(null);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả mẫu' },
    { id: 'ban-tho-treo', label: 'Bàn thờ treo chung cư' },
    { id: 'ban-tho-dung', label: 'Bàn thờ đứng gia tiên' },
    { id: 'combo-phong-tho', label: 'Tranh Trúc Chỉ Sen' },
    { id: 'phu-kien', label: 'Vách CNC & Phụ kiện' },
  ];

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  const openProductModal = (product: Product) => {
    const gallery = (product.images && product.images.length > 0)
      ? product.images
      : [product.imageUrl];
    setModalProduct({
      title: product.name,
      wood: product.woodType,
      dim: product.dimensions,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      images: gallery,
      currentIndex: 0,
    });
  };

  const nextImage = () => {
    if (!modalProduct || modalProduct.images.length <= 1) return;
    setModalProduct(prev => prev ? {
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    } : null);
  };

  const prevImage = () => {
    if (!modalProduct || modalProduct.images.length <= 1) return;
    setModalProduct(prev => prev ? {
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    } : null);
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

  // Define section groups
  const sections = [
    {
      id: 'ban-tho-treo',
      title: 'BÀN THỜ TREO CHUNG CƯ',
      subtitle: 'Mẫu bán chạy nhất cho căn hộ 1PN - 3PN chuẩn Lỗ Ban 38.8cm',
      items: products.filter(p => p.category === 'ban-tho-treo'),
    },
    {
      id: 'ban-tho-dung',
      title: 'BÀN THỜ ĐỨNG GIA TIÊN & TỦ CƠM',
      subtitle: 'Chuẩn Cung Đỏ Lục Hợp - Quý Tử - Tiến Bảo cho nhà phố & căn hộ lớn',
      items: products.filter(p => p.category === 'ban-tho-dung'),
    },
    {
      id: 'phu-kien',
      title: 'TRANH TRÚC CHỈ & PHỤ KIỆN PHÒNG THỜ',
      subtitle: 'Tranh sen LED hào quang, vách CNC chữ Thọ & tấm chống ám khói trần',
      items: products.filter(p => p.category === 'combo-phong-tho' || p.category === 'phu-kien'),
    },
  ];

  // Render a single product card
  const renderProductCard = (product: Product) => {
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
      <article
        key={product.id}
        className="group bg-white border border-stone-200/90 hover:border-amber-500 rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
      >
        {/* Photo Container */}
        <div className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={() => openProductModal(product)}
          />

          {/* Top-Right Red Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-0 right-0 bg-[#d32f2f] text-white text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-bl-md shadow-xs pointer-events-none">
              -{discountPercent}%
            </div>
          )}

          {/* Top-Left Category Tag */}
          {product.badge && (
            <div className="absolute top-1.5 left-1.5 bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded pointer-events-none">
              {product.badge}
            </div>
          )}

          {/* Tap-to-zoom hover cue */}
          <button
            onClick={() => openProductModal(product)}
            aria-label="Phóng to ảnh"
            className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-black/50 text-white backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Info Container */}
        <div className="p-2 sm:p-3 flex flex-col flex-1 justify-between">
          <div>
            {/* Dimensions / Cung Lỗ Ban */}
            <p className="text-[10px] text-amber-900 font-semibold truncate mb-1">
              {product.dimensions}
            </p>

            {/* Product Title */}
            <h3 className="font-semibold text-stone-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
              <a href={`/san-pham/${product.slug}`}>
                {product.name}
              </a>
            </h3>
          </div>

          {/* Price Block: Giá cũ & Giá KM */}
          <div className="mt-2 pt-1.5 border-t border-stone-100 space-y-0.5">
            <div className="text-[11px] text-stone-500 font-normal">
              Giá cũ: <span className="line-through">{formatCurrency(product.originalPrice)}</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-[#c51c1c]">
              Giá KM: <span>{formatCurrency(product.price)}</span>
            </div>
          </div>

          {/* Action Button: Liên Hệ (Single prominent full-width CTA) */}
          <div className="mt-2.5 pt-2 border-t border-dashed border-stone-200">
            <a
              href={`https://zalo.me/0339533380?text=Ch%C3%A0o%20x%C6%B0%E1%BB%9Fng%20An%20Gia%20T%E1%BB%8Bnh,%20t%C3%B4i%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20m%E1%BA%ABu%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-gradient-to-r from-red-700 via-red-800 to-amber-900 hover:from-red-800 hover:to-amber-950 text-white text-xs sm:text-sm font-bold rounded-lg text-center transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md active:scale-98"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>Liên Hệ</span>
            </a>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="w-full">
      {/* 1. Category Quick-Scroll Chips */}
      <div className="sticky top-14 sm:top-16 lg:top-20 z-20 bg-[#FAFAF9]/95 backdrop-blur-md py-2.5 -mx-3 px-3 sm:mx-0 sm:px-0 border-b border-stone-200/80 mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#7A1212] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Multi-Section Render or Filtered Render */}
      {activeCategory === 'all' ? (
        <div className="space-y-10 sm:space-y-14">
          {sections.map((section) => (
            <section key={section.id} className="scroll-mt-24">
              {/* Chevron Ribbon Header Tag */}
              <div className="flex items-center justify-between mb-3.5 sm:mb-5 border-b-2 border-[#7A1212]">
                <div className="relative inline-flex items-center">
                  <div className="bg-[#7A1212] text-white font-black text-xs sm:text-sm md:text-base uppercase tracking-wider px-3.5 py-1.5 sm:px-5 sm:py-2 flex items-center gap-2">
                    <span>{section.title}</span>
                  </div>
                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-[#7A1212]"></div>
                </div>

                <a
                  href="/san-pham"
                  className="text-stone-700 hover:text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-1 pr-1"
                >
                  <span>Xem thêm ({section.items.length})</span>
                  <span>›</span>
                </a>
              </div>

              {/* 2-Column Product Grid on Mobile */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
                {section.items.map((product) => renderProductCard(product))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#7A1212]">
            <h2 className="text-base sm:text-xl font-black text-[#7A1212] uppercase tracking-wide">
              {categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              Hiển thị {products.filter(p => p.category === activeCategory || (activeCategory === 'phu-kien' && p.category === 'combo-phong-tho')).length} mẫu
            </span>
          </div>

          {/* 2-Column Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
            {products.filter(p => p.category === activeCategory || (activeCategory === 'phu-kien' && p.category === 'combo-phong-tho')).map((product) => renderProductCard(product))}
          </div>
        </div>
      )}

      {/* 3. Tap to Zoom Image Modal with Swipe & Multi-Image Carousel */}
      {modalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setModalProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalProduct(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors z-20"
              aria-label="Đóng phóng to"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Container with Swipe & Carousel Arrows */}
            <div
              className="relative aspect-square bg-stone-100 overflow-hidden select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={modalProduct.images[modalProduct.currentIndex]}
                alt={`${modalProduct.title} - Ảnh ${modalProduct.currentIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Image Counter Badge */}
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold">
                Ảnh {modalProduct.currentIndex + 1} / {modalProduct.images.length}
              </div>

              {/* Prev / Next Navigation Arrows */}
              {modalProduct.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90"
                    aria-label="Ảnh kế tiếp"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Thumbnail / Dot Indicators */}
                  <div className="absolute bottom-2.5 left-0 right-0 z-10 flex items-center justify-center gap-1.5">
                    {modalProduct.images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalProduct(prev => prev ? { ...prev, currentIndex: idx } : null);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          modalProduct.currentIndex === idx
                            ? 'w-6 bg-amber-400 shadow-xs'
                            : 'w-2 bg-white/70 hover:bg-white'
                        }`}
                        aria-label={`Xem ảnh ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Info and Actions */}
            <div className="p-4 sm:p-5">
              <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                {modalProduct.title}
              </h4>
              <p className="text-xs text-amber-900 font-semibold mb-2">
                {modalProduct.dim} • {modalProduct.wood}
              </p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-base sm:text-lg font-black text-[#c51c1c]">
                  {formatCurrency(modalProduct.price)}
                </span>
                {modalProduct.originalPrice && modalProduct.originalPrice > modalProduct.price && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatCurrency(modalProduct.originalPrice)}
                  </span>
                )}
              </div>

              {/* Action Buttons: Xem Chi Tiết + Liên Hệ (No Duyệt Clip Mộc) */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`/san-pham/${modalProduct.slug}`}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem Chi Tiết</span>
                </a>
                <a
                  href={`https://zalo.me/0339533380?text=Ch%C3%A0o%20x%C6%B0%E1%BB%9Fng%20An%20Gia%20T%E1%BB%8Bnh,%20t%C3%B4i%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20m%E1%BA%ABu%20${encodeURIComponent(modalProduct.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-gradient-to-r from-red-700 via-red-800 to-amber-900 hover:from-red-800 hover:to-amber-950 text-white text-xs font-bold rounded-xl text-center transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md active:scale-98"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Liên Hệ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

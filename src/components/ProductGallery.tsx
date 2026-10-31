import React, { useState } from 'react';
import type { Product } from '../types';
import { Video, Eye, X, ZoomIn, ShieldCheck, Check, Sparkles, MessageCircle } from 'lucide-react';

interface Props {
  products: Product[];
}

export default function ProductGallery({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [zoomImage, setZoomImage] = useState<{ url: string; title: string; wood: string; dim: string } | null>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả Mẫu' },
    { id: 'ban-tho-treo', label: 'Bàn Thờ Treo Chung Cư' },
    { id: 'ban-tho-dung', label: 'Bàn Thờ Đứng Gia Tiên' },
    { id: 'combo-phong-tho', label: 'Tranh Trúc Chỉ Sen LED' },
    { id: 'phu-kien', label: 'Vách CNC & Tấm Chắn Khói' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  return (
    <div className="w-full">
      {/* 1. Mobile-Optimized Horizontal Category Scroll */}
      <div className="sticky top-16 z-20 bg-[#FAFAF9]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-stone-200/80 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? products.length
              : products.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm ring-2 ring-stone-900/10'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/90'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-stone-800 text-amber-400' : 'bg-stone-100 text-stone-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Visual-First Product Showcase Grid (2 columns on mobile, 3-4 on tablet/desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredProducts.map((product) => {
          const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

          return (
            <article
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Box with Quick Tap Zoom */}
              <div className="relative aspect-square sm:aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onClick={() => setZoomImage({
                    url: product.imageUrl,
                    title: product.name,
                    wood: product.woodType,
                    dim: product.dimensions,
                  })}
                />

                {/* Floating Top Badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                  {product.badge ? (
                    <span className="px-2 py-0.5 rounded-md bg-stone-900/85 backdrop-blur-xs text-amber-300 text-[10px] font-bold tracking-tight shadow-xs">
                      {product.badge}
                    </span>
                  ) : <span />}

                  {discountPercent > 0 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-rose-700 text-white text-[10px] font-black tracking-tight shadow-xs">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Tap to Zoom indicator for mobile */}
                <button
                  onClick={() => setZoomImage({
                    url: product.imageUrl,
                    title: product.name,
                    wood: product.woodType,
                    dim: product.dimensions,
                  })}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-opacity"
                  aria-label="Phóng to ảnh"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {/* Lỗ Ban Cung Đỏ Floating Pill */}
                <div className="absolute bottom-2 left-2 pointer-events-none">
                  <span className="px-2 py-0.5 rounded-md bg-rose-50/95 border border-rose-200/80 text-rose-800 text-[10px] font-bold backdrop-blur-xs shadow-xs">
                    Cung Đỏ: {product.lobanInfo.depthCung.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Product Info: Concise, high readability */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-stone-500 font-medium mb-1 truncate">
                    {product.dimensions}
                  </div>

                  <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug mb-2">
                    <a href={`/san-pham/${product.slug}`}>
                      {product.name}
                    </a>
                  </h3>

                  {/* Wood type micro tag */}
                  <div className="inline-flex items-center gap-1 text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md mb-2 truncate max-w-full">
                    <ShieldCheck className="w-3 h-3 text-amber-700 shrink-0" />
                    <span className="truncate">{product.woodType.split(' ')[0]} {product.woodType.split(' ')[1]} lõi 100%</span>
                  </div>
                </div>

                {/* Pricing & 1-Tap Mobile Actions */}
                <div className="pt-2 border-t border-stone-100">
                  <div className="flex items-baseline justify-between gap-1 mb-2.5">
                    <span className="text-sm sm:text-base font-serif font-black text-rose-700">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <a
                      href={`https://zalo.me/0339533380?text=${encodeURIComponent(`Chào xưởng An Gia Tịnh, tôi muốn xem video mộc 15s mẫu ${product.name} (${product.dimensions})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                    >
                      <Video className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Clip Mộc 15s</span>
                    </a>

                    <a
                      href={`/san-pham/${product.slug}`}
                      className="w-full py-2 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-stone-200"
                    >
                      <Eye className="w-3.5 h-3.5 shrink-0 text-stone-600" />
                      <span>Chi Tiết</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 3. High-Res Photo Zoom Modal for Mobile Users */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              aria-label="Đóng xem ảnh"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-4/3 sm:aspect-16/10 bg-stone-900 overflow-hidden flex items-center justify-center">
              <img
                src={zoomImage.url}
                alt={zoomImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  {zoomImage.dim} • {zoomImage.wood}
                </span>
                <h4 className="font-serif font-black text-base sm:text-lg text-stone-900 mt-0.5">
                  {zoomImage.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://zalo.me/0339533380?text=${encodeURIComponent(`Tôi muốn nhận video mộc 15s cho mẫu ${zoomImage.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Nhận Clip Mộc 15s</span>
                </a>
                <a
                  href="tel:0339533380"
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl border border-stone-200"
                >
                  Gọi Xưởng
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

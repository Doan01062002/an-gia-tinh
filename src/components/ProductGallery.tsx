import React, { useState } from 'react';
import type { Product } from '../types';
import { Video, X, ZoomIn, ShieldCheck } from 'lucide-react';

interface Props {
  products: Product[];
}

export default function ProductGallery({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [zoomImage, setZoomImage] = useState<{ url: string; title: string; wood: string; dim: string } | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'ban-tho-treo', label: 'Bàn thờ treo' },
    { id: 'ban-tho-dung', label: 'Bàn thờ đứng' },
    { id: 'combo-phong-tho', label: 'Tranh Trúc Chỉ' },
    { id: 'phu-kien', label: 'Vách CNC & Phụ kiện' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  // Concise product names for mobile display to prevent multi-line wrapping
  function getShortName(p: Product): string {
    if (p.id === 'BTT-4881-SOI') return 'Ban Treo 48×81cm Gỗ Sồi';
    if (p.id === 'BTT-4889-GODO') return 'Ban Treo 48×89cm Gõ Đỏ';
    if (p.id === 'BTD-61107-GULA') return 'Ban Đứng 61×107cm Kèm Tủ';
    if (p.id === 'COM-TRUC-CHI-SEN') return 'Tranh Trúc Chỉ Sen LED';
    if (p.id === 'VACH-CNC-THO-VAN') return 'Vách Ngăn CNC Chữ Thọ';
    if (p.id === 'TAM-CHAN-KHOI-SEN') return 'Tấm Chắn Ám Khói Trần';
    return p.name;
  }

  return (
    <div className="w-full">
      {/* 1. Mobile Horizontal Category Scroll - Sleek, tight padding */}
      <div className="sticky top-14 sm:top-16 lg:top-20 z-20 bg-[#FAFAF9]/95 backdrop-blur-md py-2.5 -mx-3 px-3 sm:mx-0 sm:px-0 border-b border-stone-200/80 mb-5">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? products.length
              : products.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Visual Product Grid: 2 columns on mobile, clean spacing, no text overflow */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
        {filteredProducts.map((product) => {
          const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          const shortName = getShortName(product);

          return (
            <article
              key={product.id}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Product Photo: Large, clean touch target */}
              <div className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onClick={() => setZoomImage({
                    url: product.imageUrl,
                    title: product.name,
                    wood: product.woodType,
                    dim: product.dimensions,
                  })}
                />

                {/* Top Badges */}
                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                  {product.badge ? (
                    <span className="px-1.5 py-0.5 rounded bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[9px] font-bold tracking-tight">
                      {product.badge}
                    </span>
                  ) : <span />}

                  {discountPercent > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-700 text-white text-[9px] font-black tracking-tight">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Tap to Zoom Icon */}
                <button
                  onClick={() => setZoomImage({
                    url: product.imageUrl,
                    title: product.name,
                    wood: product.woodType,
                    dim: product.dimensions,
                  })}
                  className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-black/50 text-white backdrop-blur-xs"
                  aria-label="Phóng to ảnh"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>

                {/* Cung Đỏ Badge */}
                <div className="absolute bottom-1.5 left-1.5 pointer-events-none">
                  <span className="px-1.5 py-0.5 rounded bg-rose-50/95 border border-rose-200/90 text-rose-800 text-[9px] font-bold backdrop-blur-xs">
                    {product.lobanInfo.depthCung.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Product Info: Concise, 1-2 lines only, zero ugly wrapping */}
              <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-stone-500 font-medium truncate mb-0.5">
                    {product.dimensions.split('x')[0] ? product.dimensions : 'Chuẩn Thước Lỗ Ban'}
                  </div>

                  <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1 leading-snug mb-1">
                    <a href={`/san-pham/${product.slug}`} title={product.name}>
                      {shortName}
                    </a>
                  </h3>

                  {/* Micro wood tag */}
                  <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-stone-600 mb-2 truncate">
                    <ShieldCheck className="w-3 h-3 text-amber-700 shrink-0" />
                    <span className="truncate">100% Gỗ lõi không rác</span>
                  </div>
                </div>

                {/* Pricing & 1-Tap Action */}
                <div className="pt-2 border-t border-stone-100">
                  <div className="flex items-baseline justify-between gap-1 mb-2">
                    <span className="text-xs sm:text-base font-serif font-black text-rose-700 truncate">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-[9px] sm:text-xs text-stone-400 line-through truncate">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  </div>

                  {/* Single High-Impact Action Button */}
                  <a
                    href={`https://zalo.me/0339533380?text=${encodeURIComponent(`Chào xưởng An Gia Tịnh, tôi muốn xem video mộc 15s mẫu ${product.name} (${product.dimensions})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                  >
                    <Video className="w-3 h-3 shrink-0" />
                    <span className="truncate">Clip Mộc 15s</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 3. High-Res Photo Zoom Modal for Mobile */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-black/60 text-white"
              aria-label="Đóng xem ảnh"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-4/3 bg-stone-900 overflow-hidden flex items-center justify-center">
              <img
                src={zoomImage.url}
                alt={zoomImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3.5 bg-white">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">
                {zoomImage.dim} • {zoomImage.wood}
              </span>
              <h4 className="font-serif font-black text-sm text-stone-900 mt-0.5 truncate">
                {zoomImage.title}
              </h4>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={`https://zalo.me/0339533380?text=${encodeURIComponent(`Tôi muốn nhận video mộc 15s cho mẫu ${zoomImage.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 bg-amber-600 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 text-center"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Nhận Clip Mộc 15s</span>
                </a>
                <a
                  href="tel:0339533380"
                  className="py-2 bg-stone-100 text-stone-800 font-semibold text-xs rounded-lg text-center border border-stone-200"
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

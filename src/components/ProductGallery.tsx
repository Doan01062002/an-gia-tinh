import React, { useState } from 'react';
import type { Product } from '../types';
import { Video, Eye, X, ZoomIn, ShieldCheck, ArrowRight, Layers, Sparkles, Phone } from 'lucide-react';

interface Props {
  products: Product[];
}

export default function ProductGallery({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [zoomImage, setZoomImage] = useState<{ url: string; title: string; wood: string; dim: string; slug: string; price: number } | null>(null);

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

  // Render a single product card in exact Tâm Phát 2-column e-commerce style
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
            onClick={() => setZoomImage({
              url: product.imageUrl,
              title: product.name,
              wood: product.woodType,
              dim: product.dimensions,
              slug: product.slug,
              price: product.price,
            })}
          />

          {/* Top-Right Red Discount Badge (Exact Tâm Phát Reference) */}
          {discountPercent > 0 && (
            <div className="absolute top-0 right-0 bg-[#d32f2f] text-white text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-bl-md shadow-xs">
              -{discountPercent}%
            </div>
          )}

          {/* Top-Left Category Tag */}
          {product.badge && (
            <div className="absolute top-1.5 left-1.5 bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
              {product.badge}
            </div>
          )}

          {/* Tap-to-zoom hover cue */}
          <button
            onClick={() => setZoomImage({
              url: product.imageUrl,
              title: product.name,
              wood: product.woodType,
              dim: product.dimensions,
              slug: product.slug,
              price: product.price,
            })}
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

            {/* Product Title (2-line clamp) */}
            <h3 className="font-semibold text-stone-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
              <a href={`/san-pham/${product.slug}`}>
                {product.name}
              </a>
            </h3>
          </div>

          {/* Price Block: Giá cũ & Giá KM (Exact Tâm Phát Layout) */}
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
              {/* Chevron Ribbon Header Tag (Exact Tâm Phát Style) */}
              <div className="flex items-center justify-between mb-3.5 sm:mb-5 border-b-2 border-[#7A1212]">
                <div className="relative inline-flex items-center">
                  <div className="bg-[#7A1212] text-white font-black text-xs sm:text-sm md:text-base uppercase tracking-wider px-3.5 py-1.5 sm:px-5 sm:py-2 flex items-center gap-2">
                    <span>{section.title}</span>
                  </div>
                  {/* Chevron Right Arrow Point */}
                  <div className="w-0 h-0 border-y-[15px] sm:border-y-[19px] border-y-transparent border-l-[10px] sm:border-l-[14px] border-l-[#7A1212]" />
                </div>

                <span className="text-[11px] sm:text-xs text-stone-500 font-medium hidden sm:inline-block">
                  100% Gỗ lõi không rác • Bảo hành 10-20 năm
                </span>
              </div>

              {/* 2-Column Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
                {section.items.map((product) => renderProductCard(product))}
              </div>

              {/* 'Xem thêm sản phẩm' Button (Exact Tâm Phát Style) */}
              <div className="mt-5 sm:mt-7 text-center">
                <a
                  href={`/san-pham`}
                  className="inline-block px-6 py-2.5 border border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white rounded text-xs sm:text-sm font-bold tracking-wide transition-all shadow-2xs"
                >
                  Xem thêm sản phẩm
                </a>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filtered Chevron Ribbon Header */}
          <div className="flex items-center justify-between mb-3.5 sm:mb-5 border-b-2 border-[#7A1212]">
            <div className="relative inline-flex items-center">
              <div className="bg-[#7A1212] text-white font-black text-xs sm:text-sm md:text-base uppercase tracking-wider px-3.5 py-1.5 sm:px-5 sm:py-2">
                <span>{categories.find(c => c.id === activeCategory)?.label || 'DANH MỤC'}</span>
              </div>
              <div className="w-0 h-0 border-y-[15px] sm:border-y-[19px] border-y-transparent border-l-[10px] sm:border-l-[14px] border-l-[#7A1212]" />
            </div>
          </div>

          {/* 2-Column Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
            {products.filter(p => p.category === activeCategory || (activeCategory === 'phu-kien' && p.category === 'combo-phong-tho')).map((product) => renderProductCard(product))}
          </div>
        </div>
      )}

      {/* 3. Tap to Zoom Image Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors z-10"
              aria-label="Đóng phóng to"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-square bg-stone-100 overflow-hidden">
              <img
                src={zoomImage.url}
                alt={zoomImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-5">
              <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                {zoomImage.title}
              </h4>
              <p className="text-xs text-amber-900 font-semibold mb-2">
                {zoomImage.dim} • {zoomImage.wood}
              </p>
              <p className="text-base font-black text-[#c51c1c] mb-4">
                {formatCurrency(zoomImage.price)}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`/san-pham/${zoomImage.slug}`}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem Chi Tiết</span>
                </a>
                <a
                  href={`https://zalo.me/0339533380?text=Kinh%20chao%20xuong,%20toi%20muon%20xem%20clip%20moc%2015s%20mau%20${encodeURIComponent(zoomImage.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Duyệt Clip Mộc</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
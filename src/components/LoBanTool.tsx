import React, { useState } from 'react';
import { calculateLoBan388, POPULAR_ALTAR_SIZES } from '../data/loban';
import { Ruler, Award, AlertCircle, MessageCircle } from 'lucide-react';

export default function LoBanTool() {
  const [dimension, setDimension] = useState<number>(81);
  const result = calculateLoBan388(dimension);

  // Position within the 38.8cm cycle
  const cycleRemainder = ((dimension % 38.8) + 38.8) % 38.8;
  const cursorPercent = Math.min(Math.max((cycleRemainder / 38.8) * 100, 0), 100);

  const cungs = [
    { name: 'Đinh', good: true, short: 'Đ' },
    { name: 'Hại', good: false, short: 'H' },
    { name: 'Vượng', good: true, short: 'V' },
    { name: 'Khổ', good: false, short: 'K' },
    { name: 'Nghĩa', good: true, short: 'N' },
    { name: 'Quan', good: true, short: 'Q' },
    { name: 'Tử', good: false, short: 'T' },
    { name: 'Hưng', good: true, short: 'H' },
    { name: 'Thất', good: false, short: 'T' },
    { name: 'Tài', good: true, short: 'T' },
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
      {/* Sleek Compact Tool Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight">
            Thước Lỗ Ban 38.8cm (Âm Phần)
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
          Chu kỳ 38.8cm
        </span>
      </div>

      <div className="p-4 sm:p-8 space-y-6">
        {/* Controls: Input & Slider */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <label htmlFor="dimension-input" className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Nhập số đo cần tra cứu (cm):
              </label>
              <span className="text-[11px] text-stone-500">
                Áp dụng cho chiều rộng, chiều sâu hoặc chiều cao bàn thờ
              </span>
            </div>

            <div className="relative w-full sm:w-40">
              <input
                id="dimension-input"
                type="number"
                min="10"
                max="300"
                step="0.5"
                value={dimension}
                onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
                className="w-full text-2xl font-black text-center px-4 py-2 bg-white border-2 border-stone-300 rounded-xl text-stone-900 shadow-inner focus:outline-none focus:border-red-600"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                cm
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <input
              type="range"
              min="20"
              max="220"
              step="0.5"
              value={dimension}
              onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
              aria-label="Thanh trượt thước Lỗ Ban"
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-700"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono px-1">
              <span>20</span>
              <span>60</span>
              <span>100</span>
              <span>140</span>
              <span>180</span>
              <span>220 cm</span>
            </div>
          </div>
        </div>

        {/* Visual Dual-Band Modern Architectural Ruler (Responsive & Anti-Clash) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-white shadow-md">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5" />
              <span>10 Cung Thước Lỗ Ban</span>
            </span>
            <span className="text-[11px] font-mono text-stone-300">
              Điểm rơi: <strong className="text-amber-300">{cycleRemainder.toFixed(1)}</strong> / 38.8 cm
            </span>
          </div>

          {/* Measuring Tape Track */}
          <div className="relative h-14 sm:h-16 bg-stone-950 rounded-xl p-1 border border-stone-700 overflow-hidden select-none">
            {/* 10 Major Cung segments with Anti-Clash design */}
            <div className="absolute inset-1 grid grid-cols-10 gap-0.5 rounded-lg overflow-hidden">
              {cungs.map((c, idx) => {
                const isCurrent = result?.cung?.name === c.name;
                return (
                  <div
                    key={idx}
                    className={`min-w-0 flex flex-col items-center justify-center rounded-xs transition-all relative overflow-hidden ${
                      c.good ? 'bg-red-700 text-white' : 'bg-stone-800 text-stone-300'
                    } ${
                      isCurrent
                        ? 'ring-2 ring-amber-400 scale-[1.03] z-10 font-black shadow-md'
                        : 'opacity-75'
                    }`}
                  >
                    {/* Desktop: Full Name */}
                    <span className="hidden sm:inline text-xs font-bold leading-tight truncate px-0.5">
                      {c.name}
                    </span>
                    <span className="hidden sm:inline text-[8px] uppercase tracking-tighter opacity-90">
                      {c.good ? 'Cát' : 'Hung'}
                    </span>
                    {/* Mobile: Clean Letter + Cát/Hung mark */}
                    <span className="sm:hidden text-[10px] font-black leading-none">
                      {c.short}
                    </span>
                    <span className={`sm:hidden text-[7px] font-bold mt-0.5 ${c.good ? 'text-amber-300' : 'text-stone-400'}`}>
                      {c.good ? '●' : '○'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Precision Indicator Needle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_8px_#FBBF24] z-20 pointer-events-none -translate-x-1/2 flex flex-col items-center justify-between"
              style={{ left: `${cursorPercent}%` }}
            >
              <div className="w-2.5 h-2.5 bg-amber-400 rotate-45 -mt-1 shadow" />
              <div className="w-2.5 h-2.5 bg-amber-400 rotate-45 -mb-1 shadow" />
            </div>
          </div>

          {/* Active Cung Indicator Ribbon */}
          {result && result.cung && (
            <div className="mt-2.5 flex items-center justify-between text-[11px] pt-1.5 border-t border-stone-800">
              <span className="text-stone-400">
                Số đo: <strong className="text-white">{dimension} cm</strong>
              </span>
              <span className={`font-bold flex items-center gap-1 ${result.isGood ? 'text-amber-400' : 'text-stone-400'}`}>
                {result.isGood ? <Award className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                Cung {result.cung.name} ({result.isGood ? 'Đại Cát' : 'Cung Đen'})
              </span>
            </div>
          )}

          {/* Mobile Legend */}
          <div className="sm:hidden flex items-center justify-center gap-3 text-[10px] text-stone-400 pt-1">
            <span className="flex items-center gap-1">
              <span className="text-amber-400">●</span> Cát Tường (Đỏ)
            </span>
            <span className="flex items-center gap-1">
              <span className="text-stone-500">○</span> Hung Hiểm (Đen)
            </span>
          </div>
        </div>

        {/* Real-time Result Card */}
        {result && result.cung && result.subCung && (
          <div
            className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
              result.isGood
                ? 'bg-red-50/70 border-red-500 shadow-xs'
                : 'bg-stone-100 border-stone-400'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5 ${
                    result.isGood ? 'bg-red-700 text-white' : 'bg-stone-800 text-white'
                  }`}
                >
                  {result.isGood ? (
                    <>
                      <Award className="w-3 h-3 text-amber-300" />
                      <span>CUNG ĐỎ — ĐẠI CÁT ĐẠI LỢI</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3" />
                      <span>CUNG ĐEN — NÊN TRÁNH</span>
                    </>
                  )}
                </span>

                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-black text-stone-900">
                    {dimension} cm
                  </span>
                  <span className="text-base sm:text-xl font-bold text-stone-800">
                    Cung <span className={result.isGood ? 'text-red-700' : 'text-stone-900'}>{result.cung.name}</span> — {result.subCung.name}
                  </span>
                </div>
              </div>

              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Ý nghĩa phong thủy:
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-0.5">
                  {result.subCung.detail}
                </span>
              </div>
            </div>

            <div className="mt-3.5 text-xs sm:text-sm text-stone-800 leading-relaxed space-y-1.5">
              <p className="font-semibold text-stone-900">
                {result.advice}
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600">
                <strong>Ý nghĩa cung chính ({result.cung.name}):</strong> {result.cung.meaning}
              </p>
            </div>
          </div>
        )}

        {/* Quick select buttons */}
        <div>
          <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
            Kích thước Lỗ Ban Cát Tường thường dùng:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { size: 48, label: '48 cm (Hỷ Sự)' },
              { size: 61, label: '61 cm (Lục Hợp)' },
              { size: 67, label: '67 cm (Quý Tử)' },
              { size: 81, label: '81 cm (Đăng Khoa)' },
              { size: 89, label: '89 cm (Thêm Phúc)' },
              { size: 107, label: '107 cm (Thêm Đinh)' },
              { size: 127, label: '127 cm (Tiến Bảo)' },
              { size: 153, label: '153 cm (Lục Hợp)' },
            ].map((item) => (
              <button
                key={item.size}
                type="button"
                onClick={() => setDimension(item.size)}
                className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                  dimension === item.size
                    ? 'bg-red-700 text-white border-red-700 shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Standard Dimensions Section: Mobile Cards vs Desktop Table */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Bảng Kích Thước Bàn Thờ Chuẩn Cung Đỏ Thước Lỗ Ban 38.8cm
            </h3>
          </div>

          {/* Mobile-Friendly Cards (sm:hidden) */}
          <div className="block sm:hidden space-y-2.5">
            {POPULAR_ALTAR_SIZES.map((item, idx) => (
              <div
                key={idx}
                className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2 border-b border-stone-200 pb-1.5">
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                    {item.name}
                  </h4>
                  <span className="shrink-0 px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded-md">
                    Cung Đỏ
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-stone-500 text-[10px] block">Chiều Sâu:</span>
                    <span className="font-black text-red-700 text-sm">{item.depth} cm</span>
                    <span className="text-[10px] text-stone-600 block mt-0.5">({item.depthCung})</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-stone-500 text-[10px] block">Chiều Ngang:</span>
                    <span className="font-black text-red-700 text-sm">{item.width} cm</span>
                    <span className="text-[10px] text-stone-600 block mt-0.5">({item.widthCung})</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-700 bg-white/70 p-2 rounded-lg border border-stone-100 leading-snug">
                  <strong className="text-stone-900">Phù hợp:</strong> {item.suitableFor}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (hidden sm:block) */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                  <th className="p-3.5">Mẫu Bàn Thờ</th>
                  <th className="p-3.5">Sâu (cm)</th>
                  <th className="p-3.5">Ngang (cm)</th>
                  <th className="p-3.5">Không gian phù hợp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {POPULAR_ALTAR_SIZES.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3.5 font-bold text-stone-900">{item.name}</td>
                    <td className="p-3.5 text-red-700 font-bold">{item.depth}cm ({item.depthCung})</td>
                    <td className="p-3.5 text-red-700 font-bold">{item.width}cm ({item.widthCung})</td>
                    <td className="p-3.5 text-stone-600">{item.suitableFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Zalo Callout Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3.5">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-amber-400">
              Gia chủ chưa rõ hướng và kích thước ban thờ hợp tuổi?
            </h4>
            <p className="text-stone-300 text-xs mt-1">
              Liên hệ xưởng An Gia Tịnh để thợ cả hỗ trợ đo đạc chuẩn Lỗ Ban & gửi clip mộc 15s trước khi phun sơn.
            </p>
          </div>
          <a
            href="https://zalo.me/0339533380"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tư vấn Zalo: 0339.533.380</span>
          </a>
        </div>
      </div>
    </div>
  );
}

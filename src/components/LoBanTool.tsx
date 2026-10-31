import React, { useState } from 'react';
import { calculateLoBan388, POPULAR_ALTAR_SIZES } from '../data/loban';
import { Ruler, Award, AlertCircle, MessageCircle } from 'lucide-react';

export default function LoBanTool() {
  const [dimension, setDimension] = useState<number>(81);
  const result = calculateLoBan388(dimension);

  // Position within the 38.8cm cycle
  const cycleRemainder = ((dimension % 38.8) + 38.8) % 38.8;
  const cursorPercent = Math.min(Math.max((cycleRemainder / 38.8) * 100, 0), 100);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
      {/* Tool Header */}
      <div className="p-6 sm:p-10 border-b border-stone-200 bg-gradient-to-b from-stone-50 to-white">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 rounded-full text-xs font-bold text-amber-800 mb-3 border border-amber-200">
          <Ruler className="w-4 h-4 text-amber-600" />
          <span>Thước Lỗ Ban 38.8cm Âm Phần Chuẩn Phong Thủy</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 mb-2">
          Tra Cứu Kích Thước Bàn Thờ Chuẩn Cung Đỏ
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Kéo thanh trượt hoặc nhập số đo (cm) để kiểm tra ngay bàn thờ của bạn rơi vào <strong>Cung Đỏ Đại Cát</strong> (Đinh, Vượng, Nghĩa, Quan, Hưng, Tài) hay <strong>Cung Đen Hung Hiểm</strong> (Hại, Khổ, Tử, Thất).
        </p>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {/* Controls: Input & Slider */}
        <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <label htmlFor="dimension-input" className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Kích Thước Khảo Sát (Centimet):
              </label>
              <span className="text-[11px] text-stone-500">
                Nhập số đo chiều rộng, chiều sâu hoặc chiều cao bàn thờ
              </span>
            </div>

            <div className="relative w-full sm:w-44">
              <input
                id="dimension-input"
                type="number"
                min="10"
                max="300"
                step="0.5"
                value={dimension}
                onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
                className="w-full text-2xl font-serif font-black text-center px-4 py-2 bg-white border-2 border-stone-300 rounded-xl text-stone-900 shadow-inner focus:outline-none focus:border-amber-600"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                cm
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="20"
              max="220"
              step="0.5"
              value={dimension}
              onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
              aria-label="Thanh trượt thước Lỗ Ban"
              className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono">
              <span>20 cm</span>
              <span>60 cm</span>
              <span>100 cm</span>
              <span>140 cm</span>
              <span>180 cm</span>
              <span>220 cm</span>
            </div>
          </div>
        </div>

        {/* Visual Dual-Band Modern Architectural Ruler */}
        <div className="p-5 rounded-2xl bg-stone-900 text-white shadow-md">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Ruler className="w-4 h-4" />
              Dải Thước Đo 10 Cung Lỗ Ban (Chu kỳ 38.8 cm)
            </span>
            <span className="font-mono text-stone-400">
              Vị trí chu kỳ: {cycleRemainder.toFixed(1)} / 38.8 cm
            </span>
          </div>

          <div className="relative h-20 bg-stone-800 rounded-xl p-1 border border-stone-700 overflow-hidden select-none">
            {/* 10 Major Cung segments */}
            <div className="absolute inset-1 grid grid-cols-10 gap-1 rounded-lg overflow-hidden">
              {[
                { name: 'Đinh', good: true },
                { name: 'Hại', good: false },
                { name: 'Vượng', good: true },
                { name: 'Khổ', good: false },
                { name: 'Nghĩa', good: true },
                { name: 'Quan', good: true },
                { name: 'Tử', good: false },
                { name: 'Hưng', good: true },
                { name: 'Thất', good: false },
                { name: 'Tài', good: true },
              ].map((c, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center text-xs font-bold rounded-sm transition-all ${
                    c.good
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-stone-700 text-stone-300'
                  }`}
                >
                  <span className="leading-none">{c.name}</span>
                  <span className={`text-[8px] uppercase tracking-tighter mt-1 ${c.good ? 'text-amber-200' : 'text-stone-400'}`}>
                    {c.good ? 'Cát' : 'Hung'}
                  </span>
                </div>
              ))}
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
        </div>

        {/* Real-time Result Card */}
        {result && result.cung && result.subCung && (
          <div
            className={`p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 ${
              result.isGood
                ? 'bg-red-50/60 border-red-500 shadow-sm'
                : 'bg-stone-100 border-stone-400'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2 ${
                    result.isGood
                      ? 'bg-red-600 text-white'
                      : 'bg-stone-800 text-white'
                  }`}
                >
                  {result.isGood ? (
                    <>
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                      <span>CUNG ĐỎ — ĐẠI CÁT ĐẠI LỢI</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>CUNG ĐEN — NÊN TRÁNH</span>
                    </>
                  )}
                </span>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-serif font-black text-stone-900">
                    {dimension} cm
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-stone-800">
                    Cung <span className={result.isGood ? 'text-red-700' : 'text-stone-900'}>{result.cung.name}</span> — {result.subCung.name}
                  </span>
                </div>
              </div>

              <div className="sm:text-right bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  Ý nghĩa phong thủy:
                </span>
                <span className="text-sm font-bold text-stone-900 block mt-0.5">
                  {result.subCung.detail}
                </span>
              </div>
            </div>

            <div className="mt-6 text-sm text-stone-800 leading-relaxed space-y-2">
              <p className="font-semibold text-base">
                {result.advice}
              </p>
              <p className="text-xs sm:text-sm text-stone-600">
                <strong>Ý nghĩa cung chính ({result.cung.name}):</strong> {result.cung.meaning}
              </p>
            </div>
          </div>
        )}

        {/* Quick select buttons */}
        <div>
          <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
            Kích thước chuẩn Thước Lỗ Ban thường dùng cho bàn thờ:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                className={`px-3 py-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                  dimension === item.size
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Standard Dimensions Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200">
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

        {/* Zalo Callout Banner */}
        <div className="p-6 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-lg text-amber-400">
              Gia chủ chưa rõ hướng và kích thước ban thờ hợp tuổi?
            </h4>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">
              Liên hệ xưởng An Gia Tịnh để được thợ cả tư vấn chuẩn Lỗ Ban & gửi video 15s chọn vân mộc trực tiếp qua Zalo.
            </p>
          </div>
          <a
            href="https://zalo.me/0339533380"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tư vấn Zalo: 0339.533.380</span>
          </a>
        </div>
      </div>
    </div>
  );
}

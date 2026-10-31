import React, { useState } from 'react';
import { calculateLoBan388, POPULAR_ALTAR_SIZES } from '../data/loban';
import { Ruler, Sparkles, Award, AlertCircle, CheckCircle2, MessageCircle, ChevronRight } from 'lucide-react';

export default function LoBanTool() {
  const [dimension, setDimension] = useState<number>(81);
  const result = calculateLoBan388(dimension);

  // Calculate percentage within the current cycle of 38.8cm for the visual indicator
  const cycleRemainder = ((dimension % 38.8) + 38.8) % 38.8;
  const cursorPercent = Math.min(Math.max((cycleRemainder / 38.8) * 100, 0), 100);

  return (
    <div className="bg-[#FAF7F2] rounded-3xl shadow-2xl border-2 border-[#D8A268]/60 overflow-hidden">
      {/* Tool Header */}
      <div className="bg-[#1C100A] text-white p-6 sm:p-10 border-b-4 border-[#CFA439] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
          <svg className="w-80 h-80 text-[#CFA439]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 8 8 8 13C8 16.5 10.5 19 12 19C13.5 19 16 16.5 16 13C16 8 12 2 12 2Z"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#2C190F] rounded-full text-xs font-semibold text-[#E2BE5F] mb-4 border border-[#CFA439]/40 shadow-inner">
            <Ruler className="w-3.5 h-3.5 text-[#CFA439]" />
            <span>Thước Lỗ Ban 38.8cm Âm Phần — Chuẩn Đồ Thờ & Bàn Thờ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#FBF5DF] mb-3 leading-snug">
            Tra Cứu Kích Thước Bàn Thờ Chuẩn Cung Đỏ
          </h2>

          <p className="text-xs sm:text-sm text-[#D8C7B5] leading-relaxed">
            Nhập số đo hoặc kéo thanh trượt để kiểm tra cung phong thủy. Bàn thờ bắt buộc phải rơi vào <strong>Cung Đỏ Đại Cát</strong> (Đinh, Vượng, Nghĩa, Quan, Hưng, Tài) để chiêu tài nạp phúc, gia đạo bình an.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {/* Dimension Input Controls */}
        <div className="p-6 rounded-2xl bg-[#F4E8DC] border border-[#D8C7B5] shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
            <div>
              <label htmlFor="loban-dimension-input" className="block text-xs font-bold text-[#190F0A] uppercase tracking-wider">
                Kích Thước Cần Đo (Centimet):
              </label>
              <span className="text-[11px] text-[#73432C]">
                Số đo phủ bì chiều ngang, chiều sâu hoặc chiều cao bàn thờ
              </span>
            </div>

            {/* Direct Number Input */}
            <div className="relative w-full sm:w-48">
              <input
                id="loban-dimension-input"
                type="number"
                min="10"
                max="300"
                step="0.5"
                value={dimension}
                onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
                className="w-full text-3xl font-serif font-black text-center px-4 py-2.5 bg-white border-2 border-[#CFA439] rounded-xl text-[#190F0A] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#8F1717]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#73432C]">
                cm
              </span>
            </div>
          </div>

          {/* Slider bar */}
          <div className="space-y-2">
            <input
              type="range"
              min="20"
              max="220"
              step="0.5"
              value={dimension}
              onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
              aria-label="Thanh trượt kích thước Thước Lỗ Ban"
              className="w-full h-3 bg-[#E8D0BD] rounded-lg appearance-none cursor-pointer accent-[#8F1717]"
            />
            <div className="flex justify-between text-[11px] text-[#73432C] font-mono">
              <span>20 cm</span>
              <span>60 cm</span>
              <span>100 cm</span>
              <span>140 cm</span>
              <span>180 cm</span>
              <span>220 cm</span>
            </div>
          </div>
        </div>

        {/* Physical Authentic Wooden Ruler Visualization */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#29170E] border-2 border-[#CFA439]/50 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-xs text-[#E2BE5F]">
            <span className="font-serif font-bold flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#CFA439]" />
              Mô Phỏng Thước Gỗ Khắc Thếp Vàng (Chu kỳ 38.8cm)
            </span>
            <span className="font-mono text-[11px] text-[#D8C7B5]">
              Vị trí chu kỳ: {cycleRemainder.toFixed(1)} / 38.8 cm
            </span>
          </div>

          {/* Wooden Ruler Strip with tick marks and indicator */}
          <div className="relative h-28 sm:h-32 rounded-xl bg-wood-ruler p-1 border-2 border-[#543120] shadow-inner overflow-hidden select-none">
            {/* Centimeter graduations tick lines */}
            <div className="absolute inset-0 flex justify-between px-2 pt-1 pointer-events-none opacity-60">
              {Array.from({ length: 39 }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-[1px] bg-[#190F0A] ${idx % 5 === 0 ? 'h-4 sm:h-5' : 'h-2'}`} />
                  {idx % 5 === 0 && (
                    <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#190F0A] mt-0.5">
                      {idx}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* 10 Major Cung Bands (Alternating Red / Black Lacquer) */}
            <div className="absolute bottom-2 left-2 right-2 h-14 sm:h-16 grid grid-cols-10 gap-[2px] rounded-lg overflow-hidden border border-[#190F0A]">
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
                  className={`flex flex-col items-center justify-center text-[10px] sm:text-xs font-serif font-bold p-1 shadow-sm transition-opacity ${
                    c.good
                      ? 'bg-gradient-to-b from-[#8F1717] to-[#6E1111] text-[#FBF5DF] border-t border-[#CFA439]'
                      : 'bg-gradient-to-b from-[#2D2D2D] to-[#1A1A1A] text-[#A0A0A0]'
                  }`}
                >
                  <span className="leading-none">{c.name}</span>
                  <span className={`text-[8px] uppercase tracking-tighter mt-1 ${c.good ? 'text-[#E2BE5F]' : 'text-zinc-500'}`}>
                    {c.good ? 'Cát' : 'Hung'}
                  </span>
                </div>
              ))}
            </div>

            {/* Sliding Vernier Needle Cursor */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#F5E050] shadow-[0_0_8px_#F5E050] z-20 transition-all duration-150 pointer-events-none -translate-x-1/2 flex flex-col items-center justify-between"
              style={{ left: `${cursorPercent}%` }}
            >
              <div className="w-3.5 h-3.5 bg-[#F5E050] rotate-45 -mt-1 shadow" />
              <div className="w-3.5 h-3.5 bg-[#F5E050] rotate-45 -mb-1 shadow" />
            </div>
          </div>
        </div>

        {/* Real-time Auspicious / Inauspicious Certificate Card */}
        {result && result.cung && result.subCung && (
          <div
            className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${
              result.isGood
                ? 'bg-gradient-to-br from-[#FEF2F2] via-white to-[#FFFBEB] border-[#8F1717] shadow-xl shadow-[#8F1717]/10'
                : 'bg-zinc-100 border-zinc-400 text-zinc-900'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C7B5]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${
                      result.isGood
                        ? 'bg-[#8F1717] text-[#FBF5DF]'
                        : 'bg-zinc-800 text-white'
                    }`}
                  >
                    {result.isGood ? (
                      <>
                        <Award className="w-3.5 h-3.5 text-[#E2BE5F]" />
                        <span>CUNG ĐỎ — ĐẠI CÁT ĐẠI LỢI</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>CUNG ĐEN — NÊN TRÁNH</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-serif-luxury font-black text-[#190F0A]">
                    {dimension} cm
                  </span>
                  <span className="text-lg sm:text-2xl font-bold text-[#543120]">
                    Cung <span className={result.isGood ? 'text-[#8F1717]' : 'text-zinc-900'}>{result.cung.name}</span> — {result.subCung.name}
                  </span>
                </div>
              </div>

              {/* Meaning highlight */}
              <div className="sm:text-right bg-white/90 p-4 rounded-2xl border border-[#D8C7B5] shadow-xs">
                <span className="text-[11px] font-bold text-[#73432C] uppercase tracking-wider block">
                  Ý nghĩa cung phụ:
                </span>
                <span className="text-sm font-bold text-[#190F0A] block mt-0.5">
                  {result.subCung.detail}
                </span>
              </div>
            </div>

            <div className="mt-6 text-sm leading-relaxed text-[#301B12] space-y-2">
              <p className="font-semibold text-base">
                {result.advice}
              </p>
              <p className="text-xs sm:text-sm text-[#73432C]">
                <strong>Ý nghĩa cung chính ({result.cung.name}):</strong> {result.cung.meaning}
              </p>
            </div>
          </div>
        )}

        {/* Quick select buttons */}
        <div>
          <h3 className="text-xs font-bold text-[#190F0A] uppercase tracking-widest mb-3">
            Kích thước Lỗ Ban 38.8cm thường dùng cho bàn thờ:
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
                    ? 'bg-[#8F1717] text-[#FBF5DF] border-[#8F1717] shadow-md scale-[1.02]'
                    : 'bg-white hover:bg-[#F4E8DC] text-[#301B12] border-[#D8C7B5]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Standard Dimensions Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#D8C7B5] bg-white">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#29170E] text-[#FBF5DF] font-bold">
                <th className="p-3.5">Mẫu Bàn Thờ Chuẩn</th>
                <th className="p-3.5">Sâu (cm)</th>
                <th className="p-3.5">Ngang (cm)</th>
                <th className="p-3.5">Không gian phù hợp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D0BD]/60">
              {POPULAR_ALTAR_SIZES.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#FAF5EE] transition-colors">
                  <td className="p-3.5 font-bold text-[#190F0A]">{item.name}</td>
                  <td className="p-3.5 text-[#8F1717] font-bold">{item.depth}cm ({item.depthCung})</td>
                  <td className="p-3.5 text-[#8F1717] font-bold">{item.width}cm ({item.widthCung})</td>
                  <td className="p-3.5 text-[#543120]">{item.suitableFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Banner to Zalo */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1C100A] text-white border-2 border-[#CFA439]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-serif-luxury font-bold text-lg text-[#E2BE5F]">
              Gia chủ cần nghệ nhân xưởng đo phong thủy theo tuổi?
            </h4>
            <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-xl">
              Nghệ nhân xưởng An Gia Tịnh sẽ tính toán hướng đặt bàn thờ, chiều cao lắp đặt và quay video mộc thô 15s gửi trực tiếp qua Zalo.
            </p>
          </div>

          <a
            href="https://zalo.me/0339533380"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#CFA439] to-[#AF8729] hover:from-[#E2BE5F] hover:to-[#CFA439] text-[#190F0A] font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tư vấn Zalo Thợ Cả: 0339.533.380</span>
          </a>
        </div>
      </div>
    </div>
  );
}

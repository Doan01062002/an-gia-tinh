import React, { useState, useRef } from 'react';
import { calculateLoBan388 } from '../data/loban';
import { Ruler, Award, AlertCircle, MessageCircle } from 'lucide-react';

export default function LoBanTool() {
  const [dimension, setDimension] = useState<number>(81);
  const result = calculateLoBan388(dimension);

  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; dim: number }>({ x: 0, dim: 81 });

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

  // Update dimension based on click / pointer position
  const updateFromPointer = (clientX: number, isDirectClick = false) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const trackWidth = rect.width;
    if (trackWidth <= 0) return;

    if (isDirectClick) {
      // Direct click on the ruler inside 0..trackWidth
      const clampedX = Math.max(0, Math.min(x, trackWidth));
      const percent = clampedX / trackWidth;
      const targetRemainder = percent * 38.8;
      const currentCycleBase = Math.floor(dimension / 38.8) * 38.8;
      const newDim = Math.round((currentCycleBase + targetRemainder) * 2) / 2;
      setDimension(Math.max(10, Math.min(300, newDim)));
      dragStartRef.current = { x: clientX, dim: newDim };
    } else {
      // Continuous scrubbing / dragging from start point
      const deltaX = clientX - dragStartRef.current.x;
      const deltaDim = (deltaX / trackWidth) * 38.8;
      const newDim = Math.round((dragStartRef.current.dim + deltaDim) * 2) / 2;
      setDimension(Math.max(10, Math.min(300, newDim)));
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, dim: dimension };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
    updateFromPointer(e.clientX, true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateFromPointer(e.clientX, false);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // fallback
    }
  };

  // Jump directly to a Cung by clicking its block
  const handleCungClick = (cungIndex: number) => {
    const currentCycleBase = Math.floor(dimension / 38.8) * 38.8;
    const targetRemainder = cungIndex * 3.88 + 1.94;
    const newDim = Math.round((currentCycleBase + targetRemainder) * 2) / 2;
    setDimension(Math.max(10, Math.min(300, newDim)));
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
      {/* Sleek Compact Tool Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight">
            Thước Lỗ Ban 38.8cm (Âm Phần - Đồ Thờ)
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
          Chu kỳ 38.8cm
        </span>
      </div>

      <div className="p-4 sm:p-8 space-y-6">
        {/* UNIFIED INTERACTIVE LO BAN RULER (Box 1 + Box 2 merged into ONE - Nền Đỏ Son Gụ Sang Trọng, KHÔNG NỀN ĐEN) */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#802219] via-[#6d1b13] to-[#59140e] text-white shadow-xl border border-[#a83226] space-y-4 sm:space-y-5">
          {/* Top Bar: Live Measurement & Quick Steppers */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#8f281e]">
            <div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-300" />
                <h3 className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide uppercase">
                  Dải Thước Đo 10 Cung Lỗ Ban
                </h3>
              </div>
              <p className="text-[11px] text-amber-100/80 mt-0.5">
                Chạm hoặc kéo ngón tay trực tiếp trên thước để chỉnh số đo
              </p>
            </div>

            {/* Stepper Controls & Number Input */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#3d0f0a] p-1.5 rounded-2xl border border-[#7a2016]">
              <button
                type="button"
                onClick={() => setDimension((d) => Math.max(10, Math.round((d - 10) * 2) / 2))}
                className="px-2 py-1.5 bg-[#54160e] hover:bg-[#6e1e14] active:scale-95 text-amber-200 text-[11px] font-bold rounded-lg transition-all"
                title="Giảm 10 cm"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => setDimension((d) => Math.max(10, Math.round((d - 1) * 2) / 2))}
                className="w-8 h-8 flex items-center justify-center bg-[#54160e] hover:bg-[#6e1e14] active:scale-95 text-amber-100 text-sm font-bold rounded-lg transition-all"
                title="Giảm 1 cm"
              >
                -1
              </button>

              <div className="relative flex items-center">
                <input
                  id="dimension-input"
                  type="number"
                  min="10"
                  max="300"
                  step="0.5"
                  value={dimension}
                  onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
                  aria-label="Số đo Lỗ Ban (cm)"
                  className="w-20 sm:w-24 text-center font-black text-lg sm:text-xl text-amber-300 bg-[#2b0a07] border border-[#8f281e] rounded-lg py-1 px-1 focus:outline-none focus:border-amber-400"
                />
                <span className="text-xs font-bold text-amber-200/80 ml-1.5 mr-1">cm</span>
              </div>

              <button
                type="button"
                onClick={() => setDimension((d) => Math.min(300, Math.round((d + 1) * 2) / 2))}
                className="w-8 h-8 flex items-center justify-center bg-[#54160e] hover:bg-[#6e1e14] active:scale-95 text-amber-100 text-sm font-bold rounded-lg transition-all"
                title="Tăng 1 cm"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => setDimension((d) => Math.min(300, Math.round((d + 10) * 2) / 2))}
                className="px-2 py-1.5 bg-[#54160e] hover:bg-[#6e1e14] active:scale-95 text-amber-200 text-[11px] font-bold rounded-lg transition-all"
                title="Tăng 10 cm"
              >
                +10
              </button>
            </div>
          </div>

          {/* Measuring Tape & Interactive Track */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-amber-100/90 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                <span>Kéo vạch hoặc chạm trực tiếp cung:</span>
              </span>
              <span>
                Điểm rơi chu kỳ: <strong className="text-amber-300 font-bold">{cycleRemainder.toFixed(1)}</strong> / 38.8 cm
              </span>
            </div>

            {/* The Interactive Ruler Tape Container */}
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative h-20 sm:h-22 bg-[#2f0c08] rounded-2xl p-1.5 border-2 border-[#8f281e] select-none cursor-pointer touch-none shadow-inner"
            >
              {/* Millimeter / Centimeter Scale Bar at Top */}
              <div className="absolute top-1.5 left-1.5 right-1.5 h-3 flex justify-between items-end px-1 pointer-events-none">
                {[0, 5, 10, 15, 20, 25, 30, 35, 38.8].map((tick, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-[8px] font-mono text-amber-300/60 leading-none">
                      {tick === 38.8 ? '38.8' : tick}
                    </span>
                    <span className="w-px h-1.5 bg-[#7a2016] mt-0.5" />
                  </div>
                ))}
              </div>

              {/* 10 Major Cungs Grid */}
              <div className="absolute top-6 bottom-1.5 left-1.5 right-1.5 grid grid-cols-10 gap-0.5 rounded-xl overflow-hidden">
                {cungs.map((c, idx) => {
                  const isCurrent = result?.cung?.name === c.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCungClick(idx);
                      }}
                      className={`min-w-0 flex flex-col items-center justify-center rounded-lg transition-all relative overflow-hidden py-1 ${
                        c.good
                          ? 'bg-gradient-to-b from-red-600 to-red-800 text-white hover:from-red-500 hover:to-red-700'
                          : 'bg-gradient-to-b from-[#4a1812] to-[#36100b] text-amber-200/80 hover:from-[#5e1e17] hover:to-[#4a1812]'
                      } ${
                        isCurrent
                          ? 'ring-2 ring-amber-300 scale-[1.03] z-10 font-black shadow-lg shadow-black/40'
                          : 'opacity-85 hover:opacity-100'
                      }`}
                    >
                      {/* Desktop Full Name */}
                      <span className="hidden sm:inline text-xs font-bold leading-tight truncate px-0.5">
                        {c.name}
                      </span>
                      <span className="hidden sm:inline text-[9px] uppercase tracking-tighter opacity-90 mt-0.5">
                        {c.good ? 'Cát' : 'Hung'}
                      </span>
                      {/* Mobile Letters */}
                      <span className="sm:hidden text-[11px] font-black leading-none">
                        {c.short}
                      </span>
                      <span
                        className={`sm:hidden text-[8px] font-bold mt-0.5 ${
                          c.good ? 'text-amber-300' : 'text-stone-300'
                        }`}
                      >
                        {c.good ? '●' : '○'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sliding Precision Golden Needle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-amber-300 shadow-[0_0_12px_#FBBF24] z-20 pointer-events-none -translate-x-1/2 flex flex-col items-center justify-between"
                style={{ left: `${cursorPercent}%` }}
              >
                {/* Top Marker */}
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-amber-300 -mt-1 shadow-xs" />
                {/* Center Badge */}
                <div className="px-1 py-0.5 bg-amber-300 text-stone-950 text-[9px] font-black rounded-xs shadow whitespace-nowrap -mt-0.5">
                  {dimension}cm
                </div>
                {/* Bottom Marker */}
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[7px] border-b-amber-300 -mb-1 shadow-xs" />
              </div>
            </div>
          </div>

          {/* Active Cung Indicator Ribbon below the tape */}
          {result && result.cung && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-2 border-t border-[#8f281e] gap-2">
              <div className="flex items-center gap-2">
                <span className="text-amber-100/80">Số đo đang chọn:</span>
                <span className="text-base font-black text-amber-300">{dimension} cm</span>
              </div>
              <div
                className={`font-bold flex items-center gap-1.5 px-3 py-1 rounded-full text-xs self-start sm:self-auto ${
                  result.isGood
                    ? 'bg-[#54160e] text-amber-300 border border-[#a83226]'
                    : 'bg-[#3d0f0a] text-amber-200 border border-[#7a2016]'
                }`}
              >
                {result.isGood ? <Award className="w-4 h-4 text-amber-300" /> : <AlertCircle className="w-4 h-4 text-amber-200" />}
                <span>
                  Cung {result.cung.name} — {result.subCung?.name || ''} ({result.isGood ? 'Cung Đỏ Đại Cát' : 'Cung Đen Nên Tránh'})
                </span>
              </div>
            </div>
          )}

          {/* Mobile Legend */}
          <div className="sm:hidden flex items-center justify-center gap-4 text-[10px] text-amber-100/80 pt-1">
            <span className="flex items-center gap-1">
              <span className="text-amber-300 font-bold">●</span> Cung Đỏ (Đại Cát)
            </span>
            <span className="flex items-center gap-1">
              <span className="text-stone-300 font-bold">○</span> Cung Đen (Hung Hiểm)
            </span>
          </div>
        </div>

        {/* Real-time Result Card */}
        {result && result.cung && result.subCung && (
          <div
            className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
              result.isGood
                ? 'bg-red-50/80 border-red-500 shadow-xs'
                : 'bg-amber-50/80 border-amber-500/60 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5 ${
                    result.isGood ? 'bg-red-700 text-white' : 'bg-[#6d1b13] text-amber-200'
                  }`}
                >
                  {result.isGood ? (
                    <>
                      <Award className="w-3 h-3 text-amber-300" />
                      <span>CUNG ĐỎ — ĐẠI CÁT ĐẠI LỢI</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-amber-300" />
                      <span>CUNG ĐEN — NÊN TRÁNH</span>
                    </>
                  )}
                </span>

                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-black text-stone-900">
                    {dimension} cm
                  </span>
                  <span className="text-base sm:text-xl font-bold text-stone-800">
                    Cung <span className={result.isGood ? 'text-red-700' : 'text-[#6d1b13]'}>{result.cung.name}</span> — {result.subCung.name}
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

        {/* Zalo Callout Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#802219] via-[#6d1b13] to-[#59140e] text-white border border-[#a83226] flex flex-col sm:flex-row items-center justify-between gap-3.5 shadow-md">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-amber-300">
              Gia chủ chưa rõ hướng và kích thước ban thờ hợp tuổi?
            </h4>
            <p className="text-amber-100/80 text-xs mt-1">
              Liên hệ xưởng An Gia Tịnh để thợ cả hỗ trợ đo đạc chuẩn Lỗ Ban & tư vấn phong thủy tận tâm.
            </p>
          </div>
          <a
            href="https://zalo.me/0339533380"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tư vấn Zalo: 0339.533.380</span>
          </a>
        </div>
      </div>
    </div>
  );
}

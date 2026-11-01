import React, { useState, useRef, useEffect, useCallback } from 'react';
import { calculateLoBan388, LOBAN_CUNG_LIST } from '../data/loban';
import { Ruler, Award, AlertCircle, MessageCircle } from 'lucide-react';

export default function LoBanTool() {
  const [dimension, setDimension] = useState<number>(81);
  const result = calculateLoBan388(dimension);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging & Momentum Physics State
  const dragRef = useRef<{
    isDragging: boolean;
    startX: number;
    startDim: number;
    lastX: number;
    lastTime: number;
    velocity: number;
  }>({
    isDragging: false,
    startX: 0,
    startDim: 81,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const animFrameRef = useRef<number | null>(null);

  // Draw Continuous Tape Measure onto HTML5 Canvas
  const drawRuler = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const width = rect.width;
    const height = 80;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Responsive pixel scale: 1cm = 12px on desktop, 10px on mobile
    const pxPerCm = width < 500 ? 10 : 12;
    const cx = width / 2;

    // Clear background
    ctx.fillStyle = '#240705';
    ctx.fillRect(0, 0, width, height);

    // Visible range
    const startCm = Math.max(0, Math.floor(dimension - cx / pxPerCm) - 1);
    const endCm = Math.min(250, Math.ceil(dimension + cx / pxPerCm) + 1);

    // ==========================================
    // LAYER 1: Top Metric Scale (y: 0 -> 28)
    // ==========================================
    ctx.fillStyle = '#170403';
    ctx.fillRect(0, 0, width, 28);

    for (let cm = startCm; cm <= endCm; cm++) {
      const x = cx + (cm - dimension) * pxPerCm;

      if (cm % 10 === 0) {
        // 10cm Major Tick & Number
        ctx.fillStyle = '#fde047';
        ctx.fillRect(x - 1, 0, 2, 13);

        ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cm.toString(), x, 20);
      } else if (cm % 5 === 0) {
        // 5cm Medium Tick
        ctx.fillStyle = '#facc15';
        ctx.fillRect(x - 0.75, 0, 1.5, 10);
      } else {
        // 1cm Tick
        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(x - 0.5, 0, 1, 6);

        // 0.5cm Sub-tick
        const halfX = x + 0.5 * pxPerCm;
        ctx.fillStyle = '#a16207';
        ctx.fillRect(halfX - 0.5, 0, 1, 4);
      }
    }

    // ==========================================
    // LAYER 2: 10 Major Cungs (y: 28 -> 80, h: 52)
    // ==========================================
    const kStart = Math.floor(startCm / 38.8);
    const kEnd = Math.ceil(endCm / 38.8);

    for (let k = kStart; k <= kEnd; k++) {
      for (let i = 0; i < 10; i++) {
        const c = LOBAN_CUNG_LIST[i];
        const cungStartCm = k * 38.8 + i * 3.88;
        const cungEndCm = cungStartCm + 3.88;
        const x1 = cx + (cungStartCm - dimension) * pxPerCm;
        const x2 = cx + (cungEndCm - dimension) * pxPerCm;
        const w = x2 - x1;

        if (x2 < 0 || x1 > width) continue;

        // Background
        ctx.fillStyle = c.isGood ? '#991b1b' : '#1c1917';
        ctx.fillRect(x1, 28, w, 52);

        // Border divider
        ctx.strokeStyle = c.isGood ? '#dc2626' : '#292524';
        ctx.lineWidth = 1;
        ctx.strokeRect(x1, 28, w, 52);

        // Text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (w >= 32) {
          ctx.fillStyle = c.isGood ? '#fef08a' : '#d6d3d1';
          ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
          ctx.fillText(c.name, x1 + w / 2, 45);

          ctx.fillStyle = c.isGood ? '#fef9c3' : '#a8a29e';
          ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
          ctx.fillText(c.isGood ? 'CÁT' : 'HUNG', x1 + w / 2, 63);
        } else {
          ctx.fillStyle = c.isGood ? '#fef08a' : '#d6d3d1';
          ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
          ctx.fillText(c.name, x1 + w / 2, 53);
        }
      }
    }

    // ==========================================
    // LAYER 3: Fixed Golden Center Needle (cx)
    // ==========================================
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, height);
    ctx.stroke();

    ctx.shadowBlur = 0; // reset glow

    // Top Indicator Arrow
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(cx - 7, 0);
    ctx.lineTo(cx + 7, 0);
    ctx.lineTo(cx, 8);
    ctx.closePath();
    ctx.fill();

    // Bottom Indicator Arrow
    ctx.beginPath();
    ctx.moveTo(cx - 7, height);
    ctx.lineTo(cx + 7, height);
    ctx.lineTo(cx, height - 8);
    ctx.closePath();
    ctx.fill();

    // Center Dimension Badge
    const badgeText = `${dimension.toFixed(1)} cm`;
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    const textWidth = ctx.measureText(badgeText).width;

    ctx.fillStyle = '#1c1917';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - textWidth / 2 - 7, 39, textWidth + 14, 22, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, cx, 50);
  }, [dimension]);

  // Redraw on dimension change or window resize
  useEffect(() => {
    drawRuler();
    const handleResize = () => drawRuler();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawRuler]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startDim: dimension,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pxPerCm = canvas.clientWidth < 500 ? 10 : 12;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaDim = deltaX / pxPerCm;
    let newDim = dragRef.current.startDim - deltaDim;
    newDim = Math.max(10, Math.min(250, Math.round(newDim * 10) / 10));
    setDimension(newDim);

    const now = performance.now();
    const dt = now - dragRef.current.lastTime;
    if (dt > 12) {
      dragRef.current.velocity = (e.clientX - dragRef.current.lastX) / dt;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastTime = now;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}

    // Momentum glide on flick
    const canvas = canvasRef.current;
    const pxPerCm = canvas && canvas.clientWidth < 500 ? 10 : 12;
    const v = dragRef.current.velocity;

    if (Math.abs(v) > 0.25) {
      let speed = v * 12;
      const decelerate = () => {
        if (Math.abs(speed) < 0.08 || dragRef.current.isDragging) return;
        setDimension((d) => {
          const next = Math.max(10, Math.min(250, Math.round((d - speed / pxPerCm) * 10) / 10));
          return next;
        });
        speed *= 0.88;
        animFrameRef.current = requestAnimationFrame(decelerate);
      };
      decelerate();
    }
  };

  // Mouse wheel smoothly scrolls tape
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    const step = delta > 0 ? 0.5 : -0.5;
    setDimension((d) => Math.max(10, Math.min(250, Math.round((d + step) * 2) / 2)));
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
      {/* Tool Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight">
            Thước Lỗ Ban 38.8cm (Âm Phần — Bàn Thờ & Đồ Thờ Cúng)
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
          Chu kỳ chuẩn 38.8cm
        </span>
      </div>

      <div className="p-4 sm:p-8 space-y-6">
        {/* UNIFIED INTERACTIVE CONTINUOUS TAPE MEASURE (Hoàn toàn mới - Siêu mượt, không giật lag) */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#802219] via-[#6d1b13] to-[#59140e] text-white shadow-xl border border-[#a83226] space-y-4 sm:space-y-5">
          {/* Top Bar: Live Measurement & Quick Steppers */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#8f281e]">
            <div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-300" />
                <h3 className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide uppercase">
                  Dải Thước Cuộn Lỗ Ban Tự Nhiên
                </h3>
              </div>
              <p className="text-[11px] text-amber-100/80 mt-0.5">
                Kéo ngang ngón tay hoặc cuộn chuột để di chuyển thước mượt mà
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
                  max="250"
                  step="0.5"
                  value={dimension}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) setDimension(Math.max(10, Math.min(250, val)));
                  }}
                  aria-label="Số đo Lỗ Ban (cm)"
                  className="w-20 sm:w-24 text-center font-black text-lg sm:text-xl text-amber-300 bg-[#2b0a07] border border-[#8f281e] rounded-lg py-1 px-1 focus:outline-none focus:border-amber-400"
                />
                <span className="text-xs font-bold text-amber-200/80 ml-1.5 mr-1">cm</span>
              </div>

              <button
                type="button"
                onClick={() => setDimension((d) => Math.min(250, Math.round((d + 1) * 2) / 2))}
                className="w-8 h-8 flex items-center justify-center bg-[#54160e] hover:bg-[#6e1e14] active:scale-95 text-amber-100 text-sm font-bold rounded-lg transition-all"
                title="Tăng 1 cm"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => setDimension((d) => Math.min(250, Math.round((d + 10) * 2) / 2))}
                className="px-2 py-1.5 bg-[#54160e] hover:bg-[#6e1e14] active:scale-95 text-amber-200 text-[11px] font-bold rounded-lg transition-all"
                title="Tăng 10 cm"
              >
                +10
              </button>
            </div>
          </div>

          {/* Continuous Interactive HTML5 Canvas Tape Measure */}
          <div className="space-y-2">
            <div
              ref={containerRef}
              className="relative rounded-2xl overflow-hidden border-2 border-[#8f281e] shadow-2xl bg-[#1c0504] cursor-grab active:cursor-grabbing select-none"
            >
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onWheel={handleWheel}
                className="w-full h-[80px] block touch-none"
              />
            </div>
          </div>

          {/* Active Cung Indicator Ribbon */}
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
                {result.isGood ? (
                  <Award className="w-4 h-4 text-amber-300" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-200" />
                )}
                <span>
                  Cung {result.cung.name} — {result.subCung?.name || ''} (
                  {result.isGood ? 'Cung Đỏ Đại Cát' : 'Cung Đen Nên Tránh'})
                </span>
              </div>
            </div>
          )}
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
                    Cung{' '}
                    <span className={result.isGood ? 'text-red-700' : 'text-[#6d1b13]'}>
                      {result.cung.name}
                    </span>{' '}
                    — {result.subCung.name}
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
              <p className="font-semibold text-stone-900">{result.advice}</p>
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

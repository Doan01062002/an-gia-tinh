import React, { useState } from 'react';
import { calculateLoBan388, POPULAR_ALTAR_SIZES, LOBAN_CUNG_LIST } from '../data/loban';

export default function LoBanTool() {
  const [dimension, setDimension] = useState<number>(81);
  const result = calculateLoBan388(dimension);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-wood-100 overflow-hidden">
      {/* Header bar */}
      <div className="bg-wood-900 text-white p-6 sm:p-8 border-b-4 border-gold-400">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-wood-800 rounded-full text-xs font-medium text-gold-300 mb-3 border border-gold-500/30">
          <span>✨</span>
          <span>Thước Lỗ Ban 38.8cm Âm Phần Chuẩn Phong Thủy</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          Tra Cứu Cung Lỗ Ban Bàn Thờ & Không Gian Thờ
        </h2>
        <p className="text-wood-200 text-sm sm:text-base max-w-2xl">
          Kéo thanh trượt hoặc nhập số đo (cm) để kiểm tra ngay kích thước bàn thờ của bạn rơi vào Cung Đỏ (Đại Cát) hay Cung Đen (Hung Hiểm) theo Thước Lỗ Ban 38.8cm truyền thống.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Input & Slider Controls */}
        <div className="bg-wood-50 p-6 rounded-xl border border-wood-200/60">
          <label className="block text-sm font-semibold text-wood-900 mb-3">
            Nhập kích thước cần tra cứu (đơn vị Centimet):
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-56">
              <input
                type="number"
                min="10"
                max="300"
                step="0.5"
                value={dimension}
                onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
                className="w-full text-2xl font-bold text-center px-4 py-3 bg-white border-2 border-wood-300 rounded-lg focus:outline-none focus:border-gold-500 text-wood-900 shadow-inner"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-wood-500 font-semibold text-sm">
                cm
              </span>
            </div>

            <div className="flex-1 w-full">
              <input
                type="range"
                min="20"
                max="220"
                step="0.5"
                value={dimension}
                onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
                className="w-full h-3 bg-wood-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-xs text-wood-500 mt-2">
                <span>20 cm</span>
                <span>60 cm</span>
                <span>100 cm</span>
                <span>140 cm</span>
                <span>180 cm</span>
                <span>220 cm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Result Card */}
        {result && result.cung && result.subCung && (
          <div
            className={`p-6 sm:p-8 rounded-xl border-2 transition-all duration-300 ${
              result.isGood
                ? 'bg-red-50/70 border-red-500 shadow-lg shadow-red-100'
                : 'bg-zinc-100 border-zinc-500 text-zinc-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-wood-200">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2 ${
                    result.isGood
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-zinc-700 text-white'
                  }`}
                >
                  {result.isGood ? '🔴 CUNG ĐỎ — ĐẠI CÁT ĐẠI LỢI' : '⚫ CUNG ĐEN — HUNG HIỂM'}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-wood-950">
                    {dimension} cm
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-wood-800">
                    Cung <span className={result.isGood ? 'text-red-700' : 'text-zinc-800'}>{result.cung.name}</span> — {result.subCung.name}
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-wood-600 block">Ý nghĩa phong thủy:</span>
                <span className="text-sm font-semibold text-wood-900">{result.subCung.detail}</span>
              </div>
            </div>

            <div className="mt-6 text-sm sm:text-base leading-relaxed text-wood-800">
              <p className="font-medium">
                {result.advice}
              </p>
              <p className="text-xs sm:text-sm text-wood-600 mt-2">
                <strong>Ý nghĩa cung chính ({result.cung.name}):</strong> {result.cung.meaning}
              </p>
            </div>
          </div>
        )}

        {/* Quick select buttons */}
        <div>
          <h3 className="text-sm font-bold text-wood-900 uppercase tracking-wider mb-3">
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
                className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border text-center transition-colors ${
                  dimension === item.size
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-white hover:bg-wood-100 text-wood-800 border-wood-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Altar Size Reference Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-wood-100 text-wood-900 font-bold border-b border-wood-200">
                <th className="p-3">Mẫu Bàn Thờ</th>
                <th className="p-3">Sâu (cm)</th>
                <th className="p-3">Ngang (cm)</th>
                <th className="p-3">Không gian phù hợp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-100">
              {POPULAR_ALTAR_SIZES.map((item, idx) => (
                <tr key={idx} className="hover:bg-wood-50 transition-colors">
                  <td className="p-3 font-semibold text-wood-900">{item.name}</td>
                  <td className="p-3 text-red-700 font-bold">{item.depth}cm ({item.depthCung})</td>
                  <td className="p-3 text-red-700 font-bold">{item.width}cm ({item.widthCung})</td>
                  <td className="p-3 text-wood-600">{item.suitableFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA to Zalo Hotline */}
        <div className="bg-gradient-to-r from-wood-900 to-wood-800 text-white p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-gold-500/30">
          <div>
            <h4 className="font-serif font-bold text-lg text-gold-300">
              Bạn chưa rõ tuổi của mình hợp bàn thờ kích thước và hướng nào?
            </h4>
            <p className="text-wood-200 text-xs sm:text-sm mt-1">
              Liên hệ xưởng mộc An Gia Tịnh để được thợ cả tư vấn chuẩn Lỗ Ban & gửi video 15s chọn vân mộc trực tiếp qua Zalo.
            </p>
          </div>
          <a
            href="https://zalo.me/0339533380"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-wood-950 font-bold text-sm rounded-lg shadow-lg hover:shadow-gold-500/30 transition-all shrink-0"
          >
            <span>💬</span>
            <span>Tư vấn Zalo Xưởng: 0339533380</span>
          </a>
        </div>
      </div>
    </div>
  );
}

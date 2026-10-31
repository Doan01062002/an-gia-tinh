import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

interface CungInfo {
  name: string;
  element: string;
  group: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';
  good: {
    sinhKhi: string;
    thienY: string;
    dienNien: string;
    phucVi: string;
  };
  bad: {
    tuyetMenh: string;
    nguQuy: string;
    lucSat: string;
    hoaHai: string;
  };
}

const CUNG_DETAILS: Record<string, CungInfo> = {
  Khảm: {
    name: 'Khảm',
    element: 'Thủy',
    group: 'Đông Tứ Mệnh',
    good: { sinhKhi: 'Đông Nam', thienY: 'Đông', dienNien: 'Nam', phucVi: 'Bắc' },
    bad: { tuyetMenh: 'Tây Nam', nguQuy: 'Đông Bắc', lucSat: 'Tây Bắc', hoaHai: 'Tây' },
  },
  Ly: {
    name: 'Ly',
    element: 'Hỏa',
    group: 'Đông Tứ Mệnh',
    good: { sinhKhi: 'Đông', thienY: 'Đông Nam', dienNien: 'Bắc', phucVi: 'Nam' },
    bad: { tuyetMenh: 'Tây Bắc', nguQuy: 'Tây', lucSat: 'Tây Nam', hoaHai: 'Đông Bắc' },
  },
  Chấn: {
    name: 'Chấn',
    element: 'Mộc',
    group: 'Đông Tứ Mệnh',
    good: { sinhKhi: 'Nam', thienY: 'Bắc', dienNien: 'Đông Nam', phucVi: 'Đông' },
    bad: { tuyetMenh: 'Tây', nguQuy: 'Tây Bắc', lucSat: 'Đông Bắc', hoaHai: 'Tây Nam' },
  },
  Tốn: {
    name: 'Tốn',
    element: 'Mộc',
    group: 'Đông Tứ Mệnh',
    good: { sinhKhi: 'Bắc', thienY: 'Nam', dienNien: 'Đông', phucVi: 'Đông Nam' },
    bad: { tuyetMenh: 'Đông Bắc', nguQuy: 'Tây Nam', lucSat: 'Tây', hoaHai: 'Tây Bắc' },
  },
  Càn: {
    name: 'Càn',
    element: 'Kim',
    group: 'Tây Tứ Mệnh',
    good: { sinhKhi: 'Tây', thienY: 'Đông Bắc', dienNien: 'Tây Nam', phucVi: 'Tây Bắc' },
    bad: { tuyetMenh: 'Nam', nguQuy: 'Đông', lucSat: 'Bắc', hoaHai: 'Đông Nam' },
  },
  Khôn: {
    name: 'Khôn',
    element: 'Thổ',
    group: 'Tây Tứ Mệnh',
    good: { sinhKhi: 'Đông Bắc', thienY: 'Tây', dienNien: 'Tây Bắc', phucVi: 'Tây Nam' },
    bad: { tuyetMenh: 'Bắc', nguQuy: 'Đông Nam', lucSat: 'Nam', hoaHai: 'Đông' },
  },
  Cấn: {
    name: 'Cấn',
    element: 'Thổ',
    group: 'Tây Tứ Mệnh',
    good: { sinhKhi: 'Tây Nam', thienY: 'Tây Bắc', dienNien: 'Tây', phucVi: 'Đông Bắc' },
    bad: { tuyetMenh: 'Đông Nam', nguQuy: 'Bắc', lucSat: 'Đông', hoaHai: 'Nam' },
  },
  Đoài: {
    name: 'Đoài',
    element: 'Kim',
    group: 'Tây Tứ Mệnh',
    good: { sinhKhi: 'Tây Bắc', thienY: 'Tây Nam', dienNien: 'Đông Bắc', phucVi: 'Tây' },
    bad: { tuyetMenh: 'Đông', nguQuy: 'Nam', lucSat: 'Đông Nam', hoaHai: 'Bắc' },
  },
};

const CAN_LIST = ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'];
const CHI_LIST = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

function getCanChi(year: number): string {
  const can = CAN_LIST[year % 10];
  const chi = CHI_LIST[(year - 4) % 12];
  return `${can} ${chi}`;
}

function calculateCung(year: number, isMale: boolean): CungInfo {
  let s = year
    .toString()
    .split('')
    .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  while (s > 9) {
    s = s
      .toString()
      .split('')
      .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }

  let val = 0;
  if (year < 2000) {
    val = isMale ? 11 - s : 4 + s;
  } else {
    val = isMale ? 10 - s : 5 + s;
  }

  while (val > 9) {
    val = val
      .toString()
      .split('')
      .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  if (val <= 0) val = 9;

  const maleMap: Record<number, string> = {
    1: 'Khảm', 2: 'Khôn', 3: 'Chấn', 4: 'Tốn', 5: 'Khôn', 6: 'Càn', 7: 'Đoài', 8: 'Cấn', 9: 'Ly',
  };
  const femaleMap: Record<number, string> = {
    1: 'Khảm', 2: 'Khôn', 3: 'Chấn', 4: 'Tốn', 5: 'Cấn', 6: 'Càn', 7: 'Đoài', 8: 'Cấn', 9: 'Ly',
  };

  const cungName = isMale ? maleMap[val] : femaleMap[val];
  return CUNG_DETAILS[cungName] || CUNG_DETAILS['Khôn'];
}

export default function FengShuiDirectionTool() {
  const [birthYear, setBirthYear] = useState<number>(1989);
  const [isMale, setIsMale] = useState<boolean>(true);

  const canChi = getCanChi(birthYear);
  const cung = calculateCung(birthYear, isMale);

  const years = Array.from({ length: 55 }, (_, i) => 1955 + i);

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-stone-200 shadow-sm p-4 sm:p-8">
      {/* Tool Header */}
      <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-stone-200">
        <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 flex items-center justify-center shrink-0">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-black text-base sm:text-xl text-stone-900">
            Tra Cứu Hướng Bàn Thờ Theo Tuổi Gia Chủ
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-500">
            Ứng dụng Bát Trạch phong thủy xác định 4 hướng Đại Cát và 4 hướng Đại Kỵ
          </p>
        </div>
      </div>

      {/* Input Selection Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
        {/* Select Year */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Năm Sinh Dương Lịch (Âm Lịch):
          </label>
          <select
            value={birthYear}
            onChange={(e) => setBirthYear(parseInt(e.target.value, 10))}
            className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 font-semibold text-sm focus:outline-none focus:border-amber-600 shadow-2xs"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                Năm {y} — {getCanChi(y)}
              </option>
            ))}
          </select>
        </div>

        {/* Select Gender */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Giới Tính Của Gia Chủ:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsMale(true)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                isMale
                  ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              Nam Gia Chủ
            </button>
            <button
              type="button"
              onClick={() => setIsMale(false)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                !isMale
                  ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              Nữ Gia Chủ
            </button>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="space-y-5">
        {/* Summary Pill */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
              Gia Chủ {isMale ? 'Nam' : 'Nữ'} Sinh Năm {birthYear} ({canChi}):
            </span>
            <div className="text-base sm:text-lg font-serif font-black text-stone-900 mt-0.5">
              Cung Mệnh: <span className="text-amber-800">Cung {cung.name} (Hành {cung.element})</span> • <span className="text-stone-700">{cung.group}</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold shadow-2xs shrink-0 self-start sm:self-auto">
            {cung.group}
          </span>
        </div>

        {/* 4 Auspicious Directions vs 4 Inauspicious Directions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 4 Good Directions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-emerald-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4 Hướng Đại Cát (Nên Đặt Bàn Thờ):</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/60 shadow-2xs flex items-center justify-between">
                <div>
                  <strong className="text-emerald-800 block">1. Sinh Khí (Hướng {cung.good.sinhKhi})</strong>
                  <span className="text-stone-600 text-[11px]">Vượng tài lộc, thăng quan tiến chức, đại phúc</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Tốt nhất</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/60 shadow-2xs flex items-center justify-between">
                <div>
                  <strong className="text-emerald-800 block">2. Thiên Y (Hướng {cung.good.thienY})</strong>
                  <span className="text-stone-600 text-[11px]">Gia đạo khỏe mạnh, tiêu trừ tật bệnh, bình an</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Sức khỏe</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/60 shadow-2xs flex items-center justify-between">
                <div>
                  <strong className="text-emerald-800 block">3. Diên Niên (Hướng {cung.good.dienNien})</strong>
                  <span className="text-stone-600 text-[11px]">Gia đình thuận hòa, con cháu hiếu thảo, quý nhân</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Hòa hợp</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/60 shadow-2xs flex items-center justify-between">
                <div>
                  <strong className="text-emerald-800 block">4. Phục Vị (Hướng {cung.good.phucVi})</strong>
                  <span className="text-stone-600 text-[11px]">Củng cố tinh thần, thi cử may mắn, tâm an</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Bình an</span>
              </div>
            </div>
          </div>

          {/* 4 Bad Directions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-rose-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>4 Hướng Đại Kỵ (Tránh Đặt Bàn Thờ):</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-rose-200/60 shadow-2xs">
                <strong className="text-rose-800 block">1. Tuyệt Mệnh (Hướng {cung.bad.tuyetMenh})</strong>
                <span className="text-stone-600 text-[11px]">Đại kỵ, dễ tổn hại sức khỏe, tài lộc tiêu tán</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-rose-200/60 shadow-2xs">
                <strong className="text-rose-800 block">2. Ngũ Quỷ (Hướng {cung.bad.nguQuy})</strong>
                <span className="text-stone-600 text-[11px]">Dễ gặp thị phi trắc trở, gia đạo bất an</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-rose-200/60 shadow-2xs">
                <strong className="text-rose-800 block">3. Lục Sát (Hướng {cung.bad.lucSat})</strong>
                <span className="text-stone-600 text-[11px]">Xáo trộn tình cảm, công việc trì trệ</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-rose-200/60 shadow-2xs">
                <strong className="text-rose-800 block">4. Họa Hại (Hướng {cung.bad.hoaHai})</strong>
                <span className="text-stone-600 text-[11px]">Khó giữ của cải, hao tài tốn của</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apartment Architecture Advice */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1.5">
          <p className="font-bold text-stone-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Lưu Ý Phong Thủy Khi Bố Trí Bàn Thờ Căn Hộ Chung Cư:
          </p>
          <p className="text-stone-600 leading-relaxed font-light">
            • Nếu hướng ban công hoặc cửa chính của căn hộ phạm vào hướng xấu, gia chủ nên kết hợp <strong>Vách Ngăn CNC Chữ Thọ</strong> để chắn gió tà khí và tụ sinh khí.<br />
            • Không treo bàn thờ dựa lưng vào tường nhà vệ sinh, phòng bếp hoặc gầm dầm xà ngang bê tông.<br />
            • Kích thước bàn thờ nên chọn chuẩn Cung Đỏ Thước Lỗ Ban 38.8cm: <strong>48x81cm</strong> (Hỷ Sự - Đăng Khoa) hoặc <strong>48x89cm</strong> (Hỷ Sự - Thêm Phúc).
          </p>
        </div>

        {/* Quick Zalo Consultation Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-500 font-light text-center sm:text-left">
            Cần thợ cả xem bản vẽ mặt bằng căn hộ & tư vấn hướng chính xác?
          </span>

          <a
            href={`https://zalo.me/0339533380?text=${encodeURIComponent(`Chào xưởng An Gia Tịnh, tôi sinh năm ${birthYear} (${canChi}) muốn nhờ thợ cả tư vấn hướng đặt bàn thờ cho căn hộ của tôi`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tư Vấn Hướng Đặt Miễn Phí Qua Zalo</span>
          </a>
        </div>
      </div>
    </div>
  );
}

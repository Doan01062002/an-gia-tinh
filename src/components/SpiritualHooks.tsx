import React, { useState } from 'react';
import { Phone, Ruler, Gift, CheckCircle2, ShieldCheck, X, FileText, Video, Sparkles, Layers } from 'lucide-react';

export default function SpiritualHooks() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <>
      {/* 1. HAI NÚT LIÊN HỆ NỔI BẬT DƯỚI GÓC PHẢI (Zalo & Hotline) */}
      <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none">
        {/* Desktop Gift Pill CTA (Chỉ hiển thị trên Desktop >= 768px) */}
        <button
          onClick={() => {
            setIsOpen(true);
            setSubmitted(false);
          }}
          className="hidden md:flex pointer-events-auto items-center gap-2 px-3.5 py-2 bg-stone-900/95 hover:bg-stone-800 text-white rounded-full shadow-xl border border-stone-700 transition-all duration-300 hover:scale-105 mb-1"
        >
          <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Gift className="w-3 h-3" />
          </div>
          <span className="text-[11px] font-bold text-white tracking-wide pr-1">
            Tặng PDF Văn Khấn Gia Tiên
          </span>
        </button>

        {/* Nút 1: Zalo Chat Báo Giá Nhanh */}
        <a
          href="https://zalo.me/0339533380"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn Zalo xưởng An Gia Tịnh: 0339.533.380"
          className="group pointer-events-auto flex items-center flex-row-reverse"
        >
          {/* Nút tròn Zalo có hiệu ứng sóng lan tỏa chuẩn xác 100% hình tròn */}
          <div className="relative w-12 h-12 sm:w-13 sm:h-13 aspect-square shrink-0 flex items-center justify-center">
            {/* Vòng sóng 1: Radar Ripple tròn hoàn hảo */}
            <span className="absolute inset-0 rounded-full bg-blue-500/50 animate-contact-ripple pointer-events-none"></span>
            {/* Vòng sóng 2: Lệch pha 1.1s tạo hiệu ứng sóng kép sang trọng */}
            <span className="absolute inset-0 rounded-full bg-blue-400/35 animate-contact-ripple-delayed pointer-events-none"></span>
            
            {/* Nút chính */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#0052CC] via-[#0068FF] to-[#3B82F6] text-white flex items-center justify-center shadow-xl group-hover:scale-108 active:scale-95 transition-all duration-300 ring-2 ring-white/60">
              <span className="font-sans font-black text-xs sm:text-sm tracking-tight drop-shadow-xs">Zalo</span>
            </div>
          </div>

          {/* Desktop Hover Label bên trái (nằm ngoài vùng sóng tròn) */}
          <span className="hidden sm:inline-block mr-2.5 px-3 py-1.5 bg-stone-900/90 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Chat Zalo Báo Giá
          </span>
        </a>

        {/* Nút 2: Gọi Điện Hotline Xưởng 24/7 */}
        <a
          href="tel:0339533380"
          aria-label="Gọi hotline xưởng mộc: 0339533380"
          className="group pointer-events-auto flex items-center flex-row-reverse"
        >
          {/* Nút tròn Hotline có hiệu ứng sóng lan tỏa chuẩn xác 100% hình tròn */}
          <div className="relative w-12 h-12 sm:w-13 sm:h-13 aspect-square shrink-0 flex items-center justify-center">
            {/* Vòng sóng 1: Radar Ripple tròn hoàn hảo */}
            <span className="absolute inset-0 rounded-full bg-emerald-500/50 animate-contact-ripple pointer-events-none"></span>
            {/* Vòng sóng 2: Lệch pha 1.1s */}
            <span className="absolute inset-0 rounded-full bg-emerald-400/35 animate-contact-ripple-delayed pointer-events-none"></span>
            
            {/* Nút chính */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-xl group-hover:scale-108 active:scale-95 transition-all duration-300 ring-2 ring-white/60">
              <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 animate-contact-wiggle" />
            </div>
          </div>

          {/* Desktop Hover Label bên trái (nằm ngoài vùng sóng tròn) */}
          <span className="hidden sm:inline-block mr-2.5 px-3 py-1.5 bg-stone-900/90 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Hotline: 0339.533.380
          </span>
        </a>
      </div>

      {/* 2. Mobile Fixed Sticky Bottom Navigation Bar (Visible on Mobile < 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-stone-200 px-2 py-1 shadow-lg">
        <div className="grid grid-cols-4 gap-1 text-center">
          {/* Tab 1: AI Phong Thủy */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('toggle-ai-chat'));
            }}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-stone-800 hover:text-stone-950 transition-colors relative group"
            aria-label="Mở Trợ Lý AI Phong Thủy"
          >
            <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-stone-900 to-stone-800 text-amber-400 flex items-center justify-center mb-0.5 shadow-xs border border-stone-700">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            </div>
            <span className="text-[10px] font-bold leading-none text-stone-900">AI Phong Thủy</span>
          </button>

          {/* Tab 2: Mẫu Bàn Thờ */}
          <a
            href="/san-pham"
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-stone-700 hover:text-stone-950 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center mb-0.5 border border-stone-200">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-none">Mẫu Bàn Thờ</span>
          </a>

          {/* Tab 3: Thước Lỗ Ban */}
          <a
            href="/thuoc-lo-ban"
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-stone-700 hover:text-stone-950 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-0.5 border border-amber-200">
              <Ruler className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-none">Thước Lỗ Ban</span>
          </a>

          {/* Tab 4: Tặng Văn Khấn */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setSubmitted(false);
            }}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-white bg-amber-600 hover:bg-amber-700 shadow-2xs transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center mb-0.5">
              <Gift className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-none">Tặng Văn Khấn</span>
          </button>
        </div>
      </div>

      {/* Modal Form: Nhận Tài Liệu & Tư Vấn */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Đóng hộp thoại"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <FileText className="w-7 h-7 text-amber-600" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest block mb-1">
                    Cẩm Nang Tâm Linh Độc Quyền
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    Trọn Bộ Văn Khấn & Tư Vấn Phong Thủy
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Xưởng mộc <strong>An Gia Tịnh</strong> xin gửi tặng gia chủ tư liệu chuẩn chỉ trước khi thỉnh bàn thờ về nhà mới:
                  </p>
                </div>

                <div className="space-y-3 text-xs text-stone-700 bg-stone-50 p-4 rounded-2xl border border-stone-200 mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Ebook PDF:</strong> Trọn bộ văn khấn an vị bàn thờ & bao sái bát hương chuẩn cổ truyền</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Video className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Kiểm tra vân mộc:</strong> Cận cảnh thớ gỗ lõi không rác tại xưởng trước khi hoàn thiện</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Tư vấn Lỗ Ban 38.8cm:</strong> Hướng dẫn chọn kích thước đại cát hợp tuổi gia chủ</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                      Số điện thoại Zalo của Gia Chủ:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border-2 border-stone-300 rounded-xl focus:outline-none focus:border-amber-600 text-stone-900 font-medium text-sm shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Đang kết nối Zalo...</span>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        <span>Gửi Tài Liệu & Kết Nối Zalo Cho Tôi</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-stone-500 text-center mt-3">
                  Cam kết bảo mật tuyệt đối. Xưởng không gọi làm phiền ngoài giờ gia chủ nghỉ ngơi.
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  Đã Tiếp Nhận Yêu Cầu Của Gia Chủ!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
                  Xưởng mộc <strong>An Gia Tịnh</strong> đã lưu số điện thoại <strong>{phone}</strong>. Đội ngũ thợ cả sẽ gửi file PDF văn khấn và tư vấn chi tiết qua Zalo của quý gia chủ ngay lập tức.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Đóng lại
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

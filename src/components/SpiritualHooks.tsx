import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Ruler, Gift, CheckCircle2, ShieldCheck, X, FileText, Video, Sparkles, Layers, ChevronUp } from 'lucide-react';

export default function SpiritualHooks() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {/* Back to Top Square Button (Exact Tâm Phát Reference) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="fixed bottom-28 right-3.5 sm:bottom-20 sm:right-6 z-30 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 border border-stone-800 rounded text-stone-800 hover:bg-stone-900 hover:text-white flex items-center justify-center shadow-md transition-all active:scale-95"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* 2. Mobile Fixed Bottom Navigation Bar (Visible only on < 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/98 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 shadow-lg">
        <div className="grid grid-cols-4 gap-1 text-center">
          {/* Button 1: AI Phong Thủy (Direct trigger to open/toggle AI Chatbot) */}
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

          {/* Button 2: Mẫu Bàn Thờ */}
          <a
            href="/san-pham"
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-stone-700 hover:text-stone-950 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center mb-0.5 border border-stone-200">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-none">Mẫu Bàn Thờ</span>
          </a>

          {/* Button 3: Thước Lỗ Ban */}
          <a
            href="/thuoc-lo-ban"
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-stone-700 hover:text-stone-950 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-0.5 border border-amber-200">
              <Ruler className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold leading-none">Thước Lỗ Ban</span>
          </a>

          {/* Button 4: Nhận Ebook & Video Mộc */}
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

      {/* 3. Modal Form: Nhận Tài Liệu & Video Mộc */}
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
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Trọn Bộ Văn Khấn & Clip Mộc 15s
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
                    <span><strong>Clip mộc 15s:</strong> Cận cảnh thớ gỗ lõi không rác tại xưởng trước khi phun sơn</span>
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
                        <MessageCircle className="w-4 h-4" />
                        <span>Gửi Tài Liệu & Video Qua Zalo Cho Tôi</span>
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
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                  Đã Tiếp Nhận Yêu Cầu Của Gia Chủ!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
                  Xưởng mộc <strong>An Gia Tịnh</strong> đã lưu số điện thoại <strong>{phone}</strong>. Đội ngũ thợ cả sẽ gửi file PDF văn khấn và clip mộc 15s qua Zalo của quý gia chủ ngay lập tức.
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

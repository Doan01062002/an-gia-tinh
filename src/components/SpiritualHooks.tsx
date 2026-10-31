import React, { useState } from 'react';
import { Phone, MessageCircle, Ruler, Gift, CheckCircle2, ShieldCheck, X, FileText, Video } from 'lucide-react';

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
      {/* 1. Mobile Fixed Bottom Navigation Bar (Visible only on < 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1A0E08]/98 backdrop-blur-lg border-t border-[#3D2517] px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-4 gap-1 text-center">
          {/* Button 1: Gọi Hotline */}
          <a
            href="tel:0339533380"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#E8D0BD] hover:text-white hover:bg-[#2C190F] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-green-600/20 text-green-400 flex items-center justify-center mb-1">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold leading-none">Gọi Xưởng</span>
          </a>

          {/* Button 2: Zalo Chat */}
          <a
            href="https://zalo.me/0339533380"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#E8D0BD] hover:text-white hover:bg-[#2C190F] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mb-1">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold leading-none">Chat Zalo</span>
          </a>

          {/* Button 3: Thước Lỗ Ban */}
          <a
            href="/thuoc-lo-ban"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#E8D0BD] hover:text-white hover:bg-[#2C190F] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#CFA439]/20 text-[#E2BE5F] flex items-center justify-center mb-1">
              <Ruler className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold leading-none">Thước Lỗ Ban</span>
          </a>

          {/* Button 4: Nhận Ebook & Video Mộc */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setSubmitted(false);
            }}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#FBF5DF] bg-gradient-to-br from-[#8F1717] to-[#6E1111] border border-[#CFA439]/40 shadow-sm transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#CFA439]/20 text-[#E2BE5F] flex items-center justify-center mb-1">
              <Gift className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold leading-none text-[#FBF5DF]">Tặng Văn Khấn</span>
          </button>
        </div>
      </div>

      {/* 2. Desktop Floating CTA Group (Visible only on >= 768px) */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col items-end gap-3.5">
        {/* Gift Trigger Button */}
        <button
          onClick={() => {
            setIsOpen(true);
            setSubmitted(false);
          }}
          className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#8F1717] via-[#AA1919] to-[#8F1717] hover:from-[#AA1919] hover:to-[#7A1313] text-[#FBF5DF] rounded-full shadow-2xl border-2 border-[#CFA439] transition-all duration-300 hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-[#CFA439]/20 flex items-center justify-center text-[#FBF5DF]">
            <Gift className="w-4 h-4 text-[#FBF5DF]" />
          </div>
          <div className="text-left">
            <span className="block text-xs uppercase tracking-wider font-bold text-[#FBF5DF]">
              Tặng Bản PDF Văn Khấn & Clip Mộc 15s
            </span>
            <span className="block text-[10px] text-[#E8D0BD]/80">
              Tra cứu phong thủy Lỗ Ban miễn phí
            </span>
          </div>
        </button>

        {/* Quick Contact Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://zalo.me/0339533380"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nhắn Zalo cùng nghệ nhân xưởng An Gia Tịnh"
            className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl transition-transform hover:scale-110"
          >
            <span className="font-bold text-xs">Zalo</span>
          </a>

          <a
            href="tel:0339533380"
            aria-label="Gọi hotline xưởng mộc 0339533380"
            className="flex items-center justify-center w-12 h-12 bg-[#8F1717] hover:bg-[#AA1919] text-[#FBF5DF] rounded-full shadow-xl border border-[#CFA439]/50 transition-transform hover:scale-110"
          >
            <Phone className="w-5 h-5 text-[#FBF5DF]" />
          </a>
        </div>
      </div>

      {/* 3. Modal Form: Nhận Tài Liệu & Video Mộc */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-[#D8A268]/50 relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#73432C] hover:text-[#190F0A] p-2 rounded-full hover:bg-[#E8D0BD]/40 transition-colors"
              aria-label="Đóng hộp thoại"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#190F0A] text-[#E2BE5F] border border-[#CFA439] flex items-center justify-center mx-auto mb-3 shadow-md">
                    <FileText className="w-7 h-7 text-[#E2BE5F]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#8F1717] uppercase tracking-widest block mb-1">
                    Cẩm Nang Tâm Linh Độc Quyền
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#190F0A]">
                    Trọn Bộ Văn Khấn & Clip Mộc 15s
                  </h3>
                  <p className="text-xs text-[#543120] mt-1.5 leading-relaxed">
                    Xưởng mộc <strong>An Gia Tịnh</strong> xin gửi tặng gia chủ tư liệu chuẩn chỉ trước khi thỉnh bàn thờ về nhà mới:
                  </p>
                </div>

                <div className="space-y-3 text-xs text-[#301B12] bg-[#F1E8DC]/80 p-4 rounded-2xl border border-[#D8C7B5] mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8F1717] shrink-0 mt-0.5" />
                    <span><strong>Ebook PDF:</strong> Trọn bộ văn khấn an vị bàn thờ & bao sái bát hương chuẩn cổ truyền</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Video className="w-4 h-4 text-[#8F1717] shrink-0 mt-0.5" />
                    <span><strong>Clip mộc 15s:</strong> Cận cảnh thớ gỗ lõi không rác tại xưởng trước khi phun sơn</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#8F1717] shrink-0 mt-0.5" />
                    <span><strong>Tư vấn Lỗ Ban 38.8cm:</strong> Hướng dẫn chọn kích thước đại cát hợp tuổi gia chủ</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#190F0A] uppercase tracking-wider mb-2">
                      Số điện thoại Zalo của Gia Chủ:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border-2 border-[#D8A268] rounded-xl focus:outline-none focus:border-[#8F1717] text-[#190F0A] font-medium text-sm shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-[#8F1717] via-[#AA1919] to-[#8F1717] hover:from-[#AA1919] hover:to-[#7A1313] text-[#FBF5DF] font-bold text-sm rounded-xl shadow-lg hover:shadow-[#8F1717]/30 transition-all flex items-center justify-center gap-2"
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

                <p className="text-[11px] text-[#73432C] text-center mt-3">
                  Cam kết bảo mật tuyệt đối. Xưởng không gọi làm phiền ngoài giờ gia chủ nghỉ ngơi.
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif-luxury font-bold text-[#190F0A] mb-2">
                  Đã Tiếp Nhận Yêu Cầu Của Gia Chủ!
                </h3>
                <p className="text-xs sm:text-sm text-[#543120] mb-6 leading-relaxed">
                  Xưởng mộc <strong>An Gia Tịnh</strong> đã lưu số điện thoại <strong>{phone}</strong>. Đội ngũ thợ cả sẽ gửi file PDF văn khấn và clip mộc 15s qua Zalo của quý gia chủ ngay lập tức.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-[#190F0A] hover:bg-[#2C190F] text-[#FBF5DF] text-xs font-bold rounded-xl transition-colors"
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

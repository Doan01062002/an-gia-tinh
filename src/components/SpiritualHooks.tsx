import React, { useState } from 'react';

export default function SpiritualHooks() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số).');
      return;
    }

    setLoading(true);
    // Simulate sending to webhook or local storage
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <>
      {/* Floating CTA Group */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Gift Bubble */}
        <button
          onClick={() => {
            setIsOpen(true);
            setSubmitted(false);
          }}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-full shadow-2xl border-2 border-gold-400 transition-all duration-300 hover:scale-105 animate-bounce"
        >
          <span className="text-xl">🎁</span>
          <span className="text-xs sm:text-sm font-bold tracking-wide">
            Tặng PDF Văn Khấn & Clip Mộc 15s
          </span>
        </button>

        {/* Zalo / Call direct buttons */}
        <div className="flex items-center gap-2">
          <a
            href="https://zalo.me/0339533380"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Zalo cùng Xưởng mộc An Gia Tịnh"
            className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl transition-transform hover:scale-110"
          >
            <span className="font-bold text-xs">Zalo</span>
          </a>
          <a
            href="tel:0339533380"
            aria-label="Gọi điện thoại trực tiếp hotline xưởng mộc"
            className="flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl transition-transform hover:scale-110"
          >
            <span className="text-xl">📞</span>
          </a>
        </div>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-wood-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-wood-400 hover:text-wood-700 p-2 text-xl font-bold"
              aria-label="Đóng hộp thoại"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    📜
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-wood-950">
                    Nhận Trọn Bộ Cẩm Nang & Video Mộc
                  </h3>
                  <p className="text-xs sm:text-sm text-wood-600 mt-2">
                    Xưởng mộc <strong>An Gia Tịnh</strong> xin gửi tặng gia chủ tài liệu chuẩn tâm linh hoàn toàn miễn phí:
                  </p>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-wood-800 bg-wood-50 p-4 rounded-xl border border-wood-200/60 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span><strong>Ebook PDF:</strong> Trọn bộ văn khấn an vị bàn thờ & bao sái bát hương chuẩn cổ truyền</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span><strong>Clip mộc 15s:</strong> Cận cảnh thớ gỗ lõi không rác tại xưởng trước khi phun sơn</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span><strong>Tra cứu Thước Lỗ Ban 38.8cm:</strong> Hướng dẫn chọn kích thước hợp tuổi gia chủ</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-wood-900 uppercase tracking-wider mb-1.5">
                      Số điện thoại Zalo của Gia Chủ:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-wood-300 rounded-lg focus:outline-none focus:border-red-600 text-wood-950 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-red-700/30 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Đang kết nối Zalo...</span>
                    ) : (
                      <>
                        <span>📲</span>
                        <span>Gửi Tài Liệu Qua Zalo Cho Tôi Ngay</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-wood-400 text-center mt-3">
                  🔒 Bảo mật tuyệt đối. Xưởng cam kết không gọi làm phiền ngoài giờ nghỉ ngơi.
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-serif font-bold text-wood-950 mb-2">
                  Đã Tiếp Nhận Yêu Cầu Của Gia Chủ!
                </h3>
                <p className="text-sm text-wood-700 mb-6">
                  Xưởng mộc <strong>An Gia Tịnh</strong> đã lưu số điện thoại <strong>{phone}</strong>. Đội ngũ thợ cả sẽ gửi file PDF văn khấn và clip mộc 15s qua Zalo của quý gia chủ ngay lập tức.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-wood-900 hover:bg-wood-800 text-white text-sm font-semibold rounded-lg"
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

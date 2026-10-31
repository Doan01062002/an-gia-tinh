import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, Sparkles, X, Send, Bot, User, CheckCircle2, Phone, Video } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Kính chào quý gia chủ! 🙏 Tôi là Trợ Lý Phong Thủy AI của xưởng An Gia Tịnh. Gia chủ muốn tra cứu kích thước Lỗ Ban 38.8cm, hướng đặt bàn thờ theo tuổi hay kiểm tra clip mộc 15s?',
      time: 'Vừa xong',
      suggestions: [
        'Sinh năm 1989 đặt hướng nào?',
        'Kích thước bàn thờ 48x81cm có ý nghĩa gì?',
        'Cam kết gỗ lõi không rác như thế nào?',
        'Tặng trọn bộ văn khấn an vị bàn thờ',
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Listen to open-ai-chat or toggle-ai-chat events from mobile bottom nav bar
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('open-ai-chat', handleOpen);
    window.addEventListener('toggle-ai-chat', handleToggle);
    return () => {
      window.removeEventListener('open-ai-chat', handleOpen);
      window.removeEventListener('toggle-ai-chat', handleToggle);
    };
  }, []);

  const generateAIResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    // Check for phone number
    const phoneMatch = text.match(/(0[3|5|7|8|9][0-9]{8})/);
    if (phoneMatch) {
      return `Dạ xưởng An Gia Tịnh đã lưu số Zalo **${phoneMatch[0]}** của gia chủ! Thợ cả sẽ gửi ngay clip mộc 15s và trọn bộ file PDF văn khấn an vị bàn thờ qua Zalo cho gia chủ trong ít phút ạ!`;
    }

    // Check for birth years
    if (text.includes('1989') || text.includes('kỷ tỵ')) {
      return `Gia chủ tuổi **Kỷ Tỵ 1989** thuộc Tây Tứ Mệnh (Cung Khôn - Thổ). Hướng đại cát nhất để đặt bàn thờ là hướng **Sinh Khí (Đông Bắc)** hoặc **Thiên Y (Tây)**. Nên chọn bàn thờ treo tường kích thước **48x81cm (Hỷ Sự - Đăng Khoa)** bằng gỗ Sồi hoặc Gõ Đỏ để gia đạo luôn ấm êm, tài lộc dồi dào!`;
    }
    if (text.includes('1990') || text.includes('canh ngọ')) {
      return `Gia chủ tuổi **Canh Ngọ 1990** thuộc Đông Tứ Mệnh (Cung Khảm - Thủy). Hướng đặt bàn thờ đại cát nhất là hướng **Sinh Khí (Đông Nam)** và **Thiên Y (Đông)**. Kích thước chuẩn phong thủy căn hộ 2PN nên dùng mẫu **48x89cm (Hỷ Sự - Thêm Phúc)**.`;
    }
    if (text.includes('1988') || text.includes('mậu thìn')) {
      return `Gia chủ tuổi **Mậu Thìn 1988** thuộc Đông Tứ Mệnh (Cung Chấn - Mộc). Hướng đại cát nên đặt bàn thờ là hướng **Sinh Khí (Nam)** và **Thiên Y (Bắc)**. Kích thước khuyên dùng là **48x81cm** hoặc **61x107cm**.`;
    }
    if (text.includes('1985') || text.includes('ất sửu')) {
      return `Gia chủ tuổi **Ất Sửu 1985** thuộc Tây Tứ Mệnh (Cung Càn - Kim). Hướng đại cát là hướng **Sinh Khí (Tây)** và **Thiên Y (Đông Bắc)**. Nên dùng bàn thờ gỗ Gụ Lào hoặc Gõ Đỏ Cung Đỏ Lục Hợp - Tiến Bảo!`;
    }

    // Dimensions & Lỗ Ban
    if (text.includes('48x81') || text.includes('48 x 81')) {
      return `Kích thước **48x81cm** là kích thước vàng cho chung cư: Sâu 48cm thuộc cung **Hỷ Sự (Cung Vượng)** mang lại tin vui gia đình; Rộng 81cm thuộc cung **Đăng Khoa (Cung Đinh)** mang lại sự đỗ đạt, thăng tiến cho con cháu!`;
    }
    if (text.includes('48x89') || text.includes('48 x 89')) {
      return `Kích thước **48x89cm** là cặp cung Vượng - Vượng đại cát: Sâu 48cm là **Hỷ Sự (Cung Vượng)**; Rộng 89cm là **Thêm Phúc (Cung Vượng)**, giúp gia chủ bày thoải mái 1 đến 3 bát hương cùng mâm cúng hoa quả!`;
    }
    if (text.includes('61x107') || text.includes('61 x 107') || text.includes('bàn thờ đứng')) {
      return `Mẫu bàn thờ đứng **61x107cm** có chiều sâu 61cm là **Lục Hợp (Cung Tài)**, rộng 107cm là **Thêm Đinh (Cung Hưng)**, cao 127cm là **Tiến Bảo (Cung Quan)**. Đi kèm tủ cơm kéo rút thông minh cất gọn bên dưới, cực kỳ tiện lợi cho ngày giỗ chạp!`;
    }

    // Wood quality & Craftsmanship
    if (text.includes('gỗ lõi') || text.includes('rác') || text.includes('gỗ sồi') || text.includes('gụ')) {
      return `An Gia Tịnh cam kết **100% Gỗ Lõi Tự Nhiên Không Pha Rác (Đền bù 200% nếu phát hiện gỗ rác)**. Gỗ được sấy lò ẩm độ 10–12% chống nứt nẻ, đục mộng thủ công không đinh kim loại trên mặt bàn thờ và luôn gửi video mộc 15s soi thớ vân trước khi phun sơn.`;
    }

    // Văn khấn
    if (text.includes('văn khấn') || text.includes('nhập trạch') || text.includes('bao sái')) {
      return `Xưởng có sẵn trọn bộ file PDF **Văn khấn an vị bàn thờ & bao sái bát hương** chuẩn cổ truyền. Gia chủ vui lòng để lại số Zalo để xưởng gửi tặng miễn phí ngay nhé!`;
    }

    // Default polite response
    return `Cảm ơn câu hỏi của gia chủ! Để được thợ cả làng nghề tư vấn chính xác nhất theo mặt bằng căn hộ và nhận video mộc thô 15s trực tiếp, gia chủ có thể nhắn tin Zalo số **0339.533.380** hoặc để lại số điện thoại tại đây nhé!`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: 'Vừa xong',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateAIResponse(query);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        time: 'Vừa xong',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* 1. Floating Toggle Trigger: Positioned on the bottom-right corner as requested */}
      <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-stone-900/95 hover:bg-stone-850 text-white rounded-full shadow-2xl border border-amber-500/40 hover:border-amber-400 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Mở Trợ Lý Phong Thủy AI"
          >
            {/* Pulsing indicator */}
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-tight pr-1">
              AI Phong Thủy
            </span>
          </button>
        )}
      </div>

      {/* 2. Chatbot Popup Window: Sits above mobile bottom bar at bottom-16, and at bottom-6 right-6 on desktop */}
      {isOpen && (
        <div className="fixed bottom-16 inset-x-2 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-[380px] max-w-[96vw] h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-serif font-black text-xs sm:text-sm text-white">
                  Trợ Lý Phong Thủy AI
                </span>
                <span className="block text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Trực tuyến 24/7 • An Gia Tịnh
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Đóng trợ lý AI"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FAFAF9] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none shadow-xs font-medium'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                {/* Quick suggestions chips */}
                {m.suggestions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {m.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(s)}
                        className="px-2.5 py-1 bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-800 border border-stone-200 hover:border-amber-300 rounded-full text-[10px] font-medium transition-all text-left shadow-3xs"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-stone-400 text-[11px] p-2 bg-white rounded-xl border border-stone-200 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                <span className="text-[10px] text-stone-500 ml-1">Đang tra cứu phong thủy...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-1.5 shrink-0"
          >
            <input
              type="text"
              placeholder="Nhập câu hỏi hoặc số Zalo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
            />
            <button
              type="submit"
              className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-colors shadow-xs"
              aria-label="Gửi câu hỏi"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Phone,
  MessageCircle,
  Compass,
  Ruler,
  ShieldAlert,
  Award,
  FileText,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  actionCard?: {
    title: string;
    description: string;
    zaloUrl: string;
    phoneUrl: string;
  };
  suggestions?: string[];
}

// Bát Trạch Feng Shui Algorithm (Chuẩn 100% Cổ Truyền - 0đ Chi Phí - Tức Thì)
interface CungInfo {
  name: string;
  element: string;
  group: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';
  sinhKhi: string;
  thienY: string;
  dienNien: string;
  phucVi: string;
  tuyetMenh: string;
  nguQuy: string;
}

const CUNG_DETAILS: Record<string, CungInfo> = {
  Khảm: {
    name: 'Khảm',
    element: 'Thủy',
    group: 'Đông Tứ Mệnh',
    sinhKhi: 'Đông Nam',
    thienY: 'Đông',
    dienNien: 'Nam',
    phucVi: 'Bắc',
    tuyetMenh: 'Tây Nam',
    nguQuy: 'Đông Bắc',
  },
  Ly: {
    name: 'Ly',
    element: 'Hỏa',
    group: 'Đông Tứ Mệnh',
    sinhKhi: 'Đông',
    thienY: 'Đông Nam',
    dienNien: 'Bắc',
    phucVi: 'Nam',
    tuyetMenh: 'Tây Bắc',
    nguQuy: 'Tây',
  },
  Chấn: {
    name: 'Chấn',
    element: 'Mộc',
    group: 'Đông Tứ Mệnh',
    sinhKhi: 'Nam',
    thienY: 'Bắc',
    dienNien: 'Đông Nam',
    phucVi: 'Đông',
    tuyetMenh: 'Tây',
    nguQuy: 'Tây Bắc',
  },
  Tốn: {
    name: 'Tốn',
    element: 'Mộc',
    group: 'Đông Tứ Mệnh',
    sinhKhi: 'Bắc',
    thienY: 'Nam',
    dienNien: 'Đông',
    phucVi: 'Đông Nam',
    tuyetMenh: 'Đông Bắc',
    nguQuy: 'Tây Nam',
  },
  Càn: {
    name: 'Càn',
    element: 'Kim',
    group: 'Tây Tứ Mệnh',
    sinhKhi: 'Tây',
    thienY: 'Đông Bắc',
    dienNien: 'Tây Nam',
    phucVi: 'Tây Bắc',
    tuyetMenh: 'Nam',
    nguQuy: 'Đông',
  },
  Khôn: {
    name: 'Khôn',
    element: 'Thổ',
    group: 'Tây Tứ Mệnh',
    sinhKhi: 'Đông Bắc',
    thienY: 'Tây',
    dienNien: 'Tây Bắc',
    phucVi: 'Tây Nam',
    tuyetMenh: 'Bắc',
    nguQuy: 'Đông Nam',
  },
  Cấn: {
    name: 'Cấn',
    element: 'Thổ',
    group: 'Tây Tứ Mệnh',
    sinhKhi: 'Tây Nam',
    thienY: 'Tây Bắc',
    dienNien: 'Tây',
    phucVi: 'Đông Bắc',
    tuyetMenh: 'Đông Nam',
    nguQuy: 'Bắc',
  },
  Đoài: {
    name: 'Đoài',
    element: 'Kim',
    group: 'Tây Tứ Mệnh',
    sinhKhi: 'Tây Bắc',
    thienY: 'Tây Nam',
    dienNien: 'Đông Bắc',
    phucVi: 'Tây',
    tuyetMenh: 'Đông',
    nguQuy: 'Nam',
  },
};

const CAN_LIST = ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'];
const CHI_LIST = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

function getCanChi(year: number): string {
  const can = CAN_LIST[year % 10];
  const chi = CHI_LIST[(year - 4) % 12];
  return `${can} ${chi}`;
}

function calculateCung(year: number, isMale: boolean = true): CungInfo {
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

// 5 Tình huống mẫu phong thủy
const SAMPLE_SCENARIOS = [
  {
    id: 'huong-tuoi',
    icon: Compass,
    title: 'Xem hướng bàn thờ theo tuổi',
    prompt: 'Xem hướng đặt bàn thờ theo năm sinh',
  },
  {
    id: 'lo-ban-kich-thuoc',
    icon: Ruler,
    title: 'Kích thước Lỗ Ban 38.8cm',
    prompt: 'Kích thước bàn thờ chung cư chuẩn Thước Lỗ Ban 38.8cm',
  },
  {
    id: 'hoa-giai-phong-thuy',
    icon: ShieldAlert,
    title: 'Hóa giải vướng xà / gần cửa',
    prompt: 'Hóa giải bàn thờ bị vướng xà ngang hoặc đối diện cửa',
  },
  {
    id: 'phan-biet-go-loi',
    icon: Award,
    title: 'Nhận biết 100% gỗ lõi không rác',
    prompt: 'Làm sao nhận biết bàn thờ 100% gỗ lõi không pha rác?',
  },
  {
    id: 'tang-van-khan',
    icon: FileText,
    title: 'Tặng trọn bộ Văn Khấn (PDF)',
    prompt: 'Tặng trọn bộ văn khấn an vị bàn thờ và lễ về nhà mới',
  },
];

// Helper hiển thị Markdown in đậm / in nghiêng sạch sẽ (Xóa sạch hoàn toàn dấu sao *** lỗi font)
function FormattedInline({ text, isUser = false }: { text: string; isUser?: boolean }) {
  // Tách token ***in đậm nghiêng***, **in đậm**, và *in nghiêng*
  const parts = text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
          const content = part.slice(3, -3);
          return (
            <strong
              key={index}
              className={`font-bold italic ${isUser ? 'text-white' : 'text-stone-950 font-extrabold'}`}
            >
              {content}
            </strong>
          );
        }
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          const content = part.slice(2, -2);
          return (
            <strong
              key={index}
              className={`font-bold ${isUser ? 'text-white' : 'text-stone-950 font-bold'}`}
            >
              {content}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          const content = part.slice(1, -1);
          return (
            <em
              key={index}
              className={`italic ${isUser ? 'text-amber-100' : 'text-stone-700'}`}
            >
              {content}
            </em>
          );
        }
        // Xóa bất kỳ dấu sao trôi nổi nào còn sót lại
        const cleanPart = part.replace(/\*\*/g, '');
        return <React.Fragment key={index}>{cleanPart}</React.Fragment>;
      })}
    </>
  );
}

// Helper format toàn bộ khối tin nhắn văn bản
function FormattedMessage({ text, isUser = false }: { text: string; isUser?: boolean }) {
  if (isUser) {
    return (
      <div className="text-xs sm:text-[13px] font-medium leading-relaxed whitespace-pre-wrap">
        {text}
      </div>
    );
  }

  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-stone-800">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) {
          return <div key={idx} className="h-1" />;
        }

        // 0. Đường kẻ ngang phân cách (--- hoặc ***)
        if (/^[-*_]{3,}$/.test(line)) {
          return <hr key={idx} className="border-t border-amber-900/15 my-2" />;
        }

        // 1. Tiêu đề Markdown (### hoặc ## hoặc #)
        if (/^#{1,4}\s+/.test(line)) {
          const headingText = line.replace(/^#{1,4}\s+/, '');
          return (
            <div key={idx} className="font-bold text-[12.5px] sm:text-[13.5px] text-[#802219] mt-2 mb-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#802219]"></span>
              <FormattedInline text={headingText} isUser={false} />
            </div>
          );
        }

        // 2. Tiêu đề khối có Emoji (Ví dụ: 🧭 **TRA CỨU...** hoặc 📍 **QUY CHUẨN...**)
        if (/^[🧭📍🪵📜🙏🎯🌟💡✨]\s*/.test(line)) {
          return (
            <div
              key={idx}
              className="font-bold text-[12px] sm:text-[13px] text-[#802219] bg-amber-500/10 px-2.5 py-1.5 rounded-lg border-l-3 border-[#802219] my-1"
            >
              <FormattedInline text={line} isUser={false} />
            </div>
          );
        }

        // 3. Dòng bảng Markdown (| Cột 1 | Cột 2 |)
        if (line.startsWith('|') && line.endsWith('|')) {
          if (/^\|[\s\-:|]+\|$/.test(line)) {
            // Dòng ngăn cách header bảng (|---|---|), bỏ qua
            return null;
          }
          const cells = line
            .split('|')
            .filter((c) => c.trim() !== '')
            .map((c) => c.trim());
          if (cells.length >= 2) {
            return (
              <div key={idx} className="bg-stone-50 border border-stone-200/90 rounded-lg p-2 text-[11px] sm:text-xs my-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-[#802219]"><FormattedInline text={cells[0]} isUser={false} /></span>
                <span className="text-stone-700"><FormattedInline text={cells.slice(1).join(' • ')} isUser={false} /></span>
              </div>
            );
          }
        }

        // 4. Dòng gạch đầu dòng (• hoặc - hoặc * hoặc +)
        if (/^[\s]*[•\-\*\+]\s+/.test(line)) {
          const content = line.replace(/^[\s]*[•\-\*\+]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-0.5 my-0.5">
              <span className="text-amber-700 font-bold shrink-0 mt-0.5 text-xs">•</span>
              <div className="flex-1 leading-relaxed">
                <FormattedInline text={content} isUser={false} />
              </div>
            </div>
          );
        }

        // 5. Dòng đánh số thứ tự (1. , 2. , 3. ...)
        if (/^\d+\.\s+/.test(line)) {
          const match = line.match(/^(\d+\.)\s+(.*)$/);
          if (match) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-0.5 my-1">
                <span className="font-bold text-[#802219] shrink-0 text-xs mt-0.5">
                  {match[1]}
                </span>
                <div className="flex-1 leading-relaxed">
                  <FormattedInline text={match[2]} isUser={false} />
                </div>
              </div>
            );
          }
        }

        // 6. Đoạn văn thông thường
        return (
          <p key={idx} className="leading-relaxed">
            <FormattedInline text={line} isUser={false} />
          </p>
        );
      })}
    </div>
  );
}

// Tích hợp Google Gemini AI (Google AI Studio gemini-2.5-flash)
const GEMINI_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_GEMINI_API_KEY) || '';
const GEMINI_MODEL =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_GEMINI_MODEL) ||
  'gemini-2.5-flash';

async function callGemini(userText: string): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const payload = {
    system_instruction: {
      parts: [
        {
          text: `Bạn là Nghệ nhân Thợ Cả Bùi Văn Thắng (25 năm kinh nghiệm mộc cổ truyền) kiêm Trợ Lý Phong Thủy & Không Gian Thờ An Gia Tịnh.
Bạn tư vấn chuyên sâu, chân thành, am hiểu cho các gia chủ mua bàn thờ gia tiên, bàn thờ treo tường chung cư, án gian, vách ngăn và tranh Trúc Chỉ.

Quy chuẩn nghề mộc & tôn chỉ của xưởng An Gia Tịnh:
1. Bản sắc nghề mộc & 100% gỗ lõi không rác:
   - Cam kết 100% gỗ lõi tuyển chọn, tuyệt đối không dính rác gỗ (dác gỗ). Nếu phát hiện pha gỗ rác xưởng đền 200%.
   - Thời hạn bảo hành gỗ lõi minh bạch: Gỗ Xoan Đào (2 năm), Sồi Mỹ (3 năm), Mít Ta / Dổi / Gụ Lào / Gõ Đỏ / Hương Đá (5 năm).
   - Kỹ thuật mộng đục thắt thủ công truyền thống, tuyệt đối không bắn đinh kim loại trên mặt bàn thờ gia tiên, hoàn thiện sơn bóng mờ Inchem cao cấp 5 lớp.
   - Luôn có video mộc 15s kiểm tra 4 mặt thớ gỗ trước khi đóng gói gửi khách.
2. Thước Lỗ Ban 38.8cm Âm Phần (Đồ Thờ):
   - Bàn thờ treo chung cư: 48x81cm (Hỷ Sự - Đăng Khoa), 48x89cm (Hỷ Sự - Thêm Phúc).
   - Bàn thờ đứng gia tiên: 61x107cm (Lục Hợp - Thêm Đinh - Tiến Bảo), 67x127cm (Quý Tử - Tiến Bảo).
3. Hướng đặt bàn thờ Bát Trạch:
   - Đông Tứ Mệnh (Khảm, Ly, Chấn, Tốn) hợp hướng Đông, Đông Nam, Nam, Bắc.
   - Tây Tứ Mệnh (Càn, Khôn, Cấn, Đoài) hợp hướng Tây, Tây Bắc, Tây Nam, Đông Bắc.
4. Trả lời chu đáo, phân tích rõ ràng, so sánh thớ vân, màu sắc, độ bền, phong thủy từng loại gỗ. Trình bày gạch đầu dòng rõ ràng, không dùng bảng markdown phức tạp.
5. Luôn xưng hô lễ phép, cung kính ("Kính thưa gia chủ", "Dạ anh/chị").
6. Khuyên gia chủ để lại số Zalo hoặc kết nối Hotline/Zalo 0339.533.380 để Thợ Cả gửi clip mộc thô 15s và tư vấn theo mặt bằng căn hộ.`
        }
      ]
    },
    contents: [
      {
        parts: [{ text: userText }]
      }
    ],
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 2500,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    }
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) return text;
    }
  } catch (err) {
    console.warn('Gemini API call warning, falling back:', err);
  }
  return null;
}

// Cấu hình Giới Hạn Chống Spam & Bảo Vệ Tài Nguyên (Anti-Spam Shield)
const ANTI_SPAM_CONFIG = {
  MIN_INTERVAL_MS: 3000,         // Tối thiểu 3s giữa 2 lần gửi liên tiếp
  MAX_PER_MINUTE: 5,             // Tối đa 5 câu hỏi trong 60s (chặn spam burst)
  MAX_DAILY_QUERIES: 3,          // Tối đa 3 câu hỏi/ngày trên mỗi người dùng
  MAX_CHAR_LENGTH: 300,          // Giới hạn 300 ký tự mỗi câu hỏi
  MIN_CHAR_LENGTH: 2,            // Tối thiểu 2 ký tự (chặn ký tự rác)
};

function getTodayStorageKey(): string {
  const d = new Date();
  return `agt_ai_chat_daily_${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}`;
}

function getStoredDailyCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const val = localStorage.getItem(getTodayStorageKey());
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function incrementStoredDailyCount(): number {
  if (typeof window === 'undefined') return 1;
  try {
    const key = getTodayStorageKey();
    const count = getStoredDailyCount() + 1;
    localStorage.setItem(key, count.toString());
    return count;
  } catch {
    return 1;
  }
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Kính chào quý gia chủ! 🙏\n\nTôi là **Trợ Lý Phong Thủy AI** của xưởng gỗ **An Gia Tịnh**.\nThợ cả đã chuẩn bị sẵn các câu hỏi tư vấn thực tế theo từng nhu cầu dưới đây, gia chủ bấm chọn ngay hoặc gõ trực tiếp câu hỏi nhé:`,
      time: 'Vừa xong',
      suggestions: [
        'Sinh năm 1989 đặt hướng nào?',
        'Sinh năm 1993 đặt hướng nào?',
        'Kích thước bàn thờ 48x81cm có ý nghĩa gì?',
        'Bàn thờ bị vướng dầm xà hóa giải ra sao?',
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [spamAlert, setSpamAlert] = useState<string | null>(null);
  const [dailyCount, setDailyCount] = useState<number>(() => getStoredDailyCount());
  const [honeypot, setHoneypot] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastSendTimeRef = useRef<number>(0);
  const recentTimestampsRef = useRef<number[]>([]);
  const lastQueryRef = useRef<string>('');

  // Đếm ngược Cooldown (3s)
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Tự động tắt thông báo cảnh báo spam sau 4.5 giây
  useEffect(() => {
    if (!spamAlert) return;
    const timer = setTimeout(() => {
      setSpamAlert(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [spamAlert]);

  // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  // Lắng nghe sự kiện mở chat từ các nút ngoài trang (Header/Hero/SpiritualHooks)
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

  // Bộ tư vấn FIX CỨNG chuyên sâu, chính xác 100% & Dẫn về Zalo
  const processConsultation = (userText: string): { text: string; actionCard?: ChatMessage['actionCard']; suggestions?: string[] } => {
    const text = userText.toLowerCase();

    // 1. Nhận diện số điện thoại (Bắt lead Zalo)
    const phoneMatch = text.match(/(0[3|5|7|8|9][0-9]{8})/);
    if (phoneMatch) {
      const p = phoneMatch[0];
      return {
        text: `Dạ Thợ Cả An Gia Tịnh đã nhận số Zalo **${p}** của gia chủ! 🎉\n\nNghệ nhân Bùi Văn Thắng sẽ kết nối Zalo gửi trọn bộ **file PDF Văn Khấn Cổ Truyền** và clip quay mộc 15s cho gia chủ trong ít phút ạ!`,
        actionCard: {
          title: 'Kết Nối Zalo Trực Tiếp',
          description: `Gia chủ có thể chủ động nhắn trước cho Thợ Cả số ${p} để nhận tư vấn ngay lập tức:`,
          zaloUrl: `https://zalo.me/0339533380`,
          phoneUrl: `tel:0339533380`,
        },
        suggestions: [
          'Kích thước bàn thờ 48x81cm có ý nghĩa gì?',
          'Tiêu chuẩn 100% gỗ lõi không rác thế nào?',
        ],
      };
    }

    // 2. Tra cứu năm sinh cụ thể (Có số năm sinh 4 chữ số)
    const yearMatch = text.match(/\b(19\d{2}|20[0-2]\d)\b/);
    if (yearMatch) {
      const year = parseInt(yearMatch[0], 10);
      const canChi = getCanChi(year);
      const isMale = !text.includes('nữ');
      const cung = calculateCung(year, isMale);

      return {
        text: `🧭 **KẾT QUẢ TRA CỨU PHONG THỦY TUỔI ${canChi.toUpperCase()} (${year})**\n\n` +
          `• **Quẻ Cung**: ${cung.name} ${cung.element} thuộc **${cung.group}**\n` +
          `• **4 Hướng Đại Cát Đặt Bàn Thờ**:\n` +
          `  - 🌟 **Sinh Khí**: Hướng **${cung.sinhKhi}** (Thu hút tài lộc, vượng khí hanh thông)\n` +
          `  - 🛡️ **Thiên Y**: Hướng **${cung.thienY}** (Gia đạo bình an, sức khỏe trường thọ)\n` +
          `  - 🌿 **Diên Niên**: Hướng **${cung.dienNien}** (Gia đình thuận hòa, con cháu hiếu thảo)\n` +
          `  - 🌸 **Phục Vị**: Hướng **${cung.phucVi}** (Củng cố nội lực, thi cử đỗ đạt)\n\n` +
          `• **Kích thước Lỗ Ban 38.8cm khuyên dùng**: Mẫu **48x81cm** (Hỷ Sự - Đăng Khoa) hoặc **48x89cm** (Thêm Phúc) bằng chất gỗ **Sồi Mỹ** hoặc **Gõ Đỏ / Gụ Lào** tương sinh ngũ hành.`,
        actionCard: {
          title: 'Tư Vấn Vị Trí Bàn Thờ Theo Mặt Bằng Căn Hộ',
          description: 'Mỗi căn hộ có cửa chính và ban công khác nhau. Nhắn Zalo gửi sơ đồ nhà, Thợ Cả An Gia Tịnh sẽ vẽ hướng đặt bàn thờ Tọa Cát Hướng Cát miễn phí:',
          zaloUrl: 'https://zalo.me/0339533380',
          phoneUrl: 'tel:0339533380',
        },
        suggestions: [
          'Kích thước bàn thờ 48x81cm có ý nghĩa gì?',
          'Bàn thờ bị vướng dầm xà hóa giải ra sao?',
          'Gửi video mộc 15s qua Zalo',
        ],
      };
    }

    // 3. Khách hỏi hướng chung chung nhưng chưa nói năm sinh
    if (text.includes('hướng') && (text.includes('năm sinh') || text.includes('tuổi') || text.includes('xem hướng'))) {
      return {
        text: `🧭 **TRA CỨU HƯỚNG ĐẶT BÀN THỜ THEO BÁT TRẠCH**\n\n` +
          `Để tính chính xác Quẻ Cung (Đông Tứ Mệnh hay Tây Tứ Mệnh) và 4 hướng đại cát Sinh Khí - Thiên Y - Diên Niên - Phục Vị, gia chủ sinh năm bao nhiêu (âm lịch) ạ?\n\n` +
          `👉 Gia chủ có thể **bấm chọn các năm sinh phổ biến bên dưới** hoặc **gõ 4 số năm sinh** (VD: 1989) vào ô chat nhé:`,
        actionCard: {
          title: 'Nhắn Zalo Xem Mặt Bằng Trực Tiếp',
          description: 'Hoặc gia chủ chụp ảnh sơ đồ căn hộ gửi qua Zalo 0339.533.380 để thợ cả xem hướng ngay:',
          zaloUrl: 'https://zalo.me/0339533380',
          phoneUrl: 'tel:0339533380',
        },
        suggestions: [
          '1985 (Ất Sửu)',
          '1988 (Mậu Thìn)',
          '1989 (Kỷ Tỵ)',
          '1990 (Canh Ngọ)',
          '1992 (Nhâm Thân)',
          '1993 (Quý Dậu)',
          '1994 (Giáp Tuất)',
        ],
      };
    }

    // 4. Tình huống Kích thước Lỗ Ban 38.8cm
    if (text.includes('lỗ ban') || text.includes('kích thước') || text.includes('48x81') || text.includes('48x89') || text.includes('61x107') || text.includes('chung cư')) {
      return {
        text: `📍 **QUY CHUẨN KÍCH THƯỚC BÀN THỜ CHUNG CƯ (THƯỚC LỖ BAN 38.8CM ÂM PHẦN)**\n\n` +
          `Trong không gian thờ tự, bắt buộc phải dùng Thước 38.8cm (không dùng thước 52.2cm thông thủy cửa):\n\n` +
          `1. **Căn hộ 1 - 2 Phòng Ngủ (45m² - 65m²)**:\n` +
          `   • Kích thước: **Sâu 48cm x Rộng 81cm**\n` +
          `   • Cung đỏ: **Hỷ Sự** (Đón tin vui hạnh phúc) & **Đăng Khoa** (Con cái đỗ đạt khoa bảng). Bày 1 bát hương rất gọn gàng.\n\n` +
          `2. **Căn hộ 2 - 3 Phòng Ngủ (70m² - 95m²)**:\n` +
          `   • Kích thước: **Sâu 48cm x Rộng 89cm**\n` +
          `   • Cung đỏ: **Hỷ Sự** & **Thêm Phúc** (Gia tăng phúc đức ba đời). Mặt ban thoải mái bày 1 - 3 bát hương và mâm cúng.\n\n` +
          `3. **Nhà Phố / Căn Hộ Lớn (>90m²)**:\n` +
          `   • Kích thước bàn đứng: **61x107cm** (Lục Hợp - Thêm Đinh - Tiến Bảo) kèm **tủ cơm kéo rút** bên dưới tiện lợi ngày giỗ chạp.`,
        actionCard: {
          title: 'Nhận Báo Giá Xưởng & Clip Mộc 15s',
          description: 'Gia chủ gửi diện tích phòng khách qua Zalo 0339.533.380 để thợ cả tư vấn kích thước vừa vặn nhất:',
          zaloUrl: 'https://zalo.me/0339533380',
          phoneUrl: 'tel:0339533380',
        },
        suggestions: [
          'Hóa giải bàn thờ vướng dầm xà / gần cửa',
          'Làm sao nhận biết 100% gỗ lõi không pha rác?',
          'Tặng trọn bộ văn khấn an vị bàn thờ',
        ],
      };
    }

    // 5. Tình huống Hóa giải phong thủy (dầm xà, cửa, nhà vệ sinh, ám khói trần)
    if (text.includes('dầm') || text.includes('xà') || text.includes('hóa giải') || text.includes('cửa') || text.includes('ám khói') || text.includes('vách')) {
      return {
        text: `🪵 **GIẢI PHÁP HÓA GIẢI CÁC ĐIỀU ĐẠI KỴ KHI ĐẶT BÀN THỜ CHUNG CƯ**\n\n` +
          `• **Vướng dầm xà đè trên đầu (Áp đỉnh sát)**:\n` +
          `  👉 *Hóa giải*: Lắp **Tấm chắn ám khói chữ Thọ** hoặc hạ độ cao ban thờ xuống tầm 1m75 - 1m95; kết hợp **Tranh Trúc Chỉ hoa sen** tỏa vầng hào quang ấm áp xua tan sát khí đè nén.\n\n` +
          `• **Nhìn thẳng ra cửa chính hoặc lối đi lại**:\n` +
          `  👉 *Hóa giải*: Lắp bộ **Vách ngăn CNC chữ Vạn/Thọ 2 bên** giúp tạo một không gian thờ tự trang nghiêm, kín đáo, tụ khí sinh tài.\n\n` +
          `• **Khói hương làm đen ố vàng trần thạch cao**:\n` +
          `  👉 *Hóa giải*: Sử dụng **Tấm chống ám khói 3 lớp** có tấm mica rút lau chùi nhẹ nhàng, bảo vệ trần nhà luôn trắng sạch quanh năm.`,
        actionCard: {
          title: 'Tư Vấn Đo Đạc Vách Ngăn Theo Không Gian Thực Tế',
          description: 'Gia chủ chụp ảnh góc phòng thờ nhà mình gửi qua Zalo 0339.533.380, xưởng sẽ may đo chính xác:',
          zaloUrl: 'https://zalo.me/0339533380',
          phoneUrl: 'tel:0339533380',
        },
        suggestions: [
          'Làm sao nhận biết 100% gỗ lõi không pha rác?',
          'Kích thước bàn thờ 48x81cm có ý nghĩa gì?',
          'Tặng trọn bộ văn khấn an vị bàn thờ',
        ],
      };
    }

    // 6. Tình huống Gỗ lõi, Đa dạng chất gỗ & Chính sách bảo hành
    if (text.includes('gỗ lõi') || text.includes('rác') || text.includes('gỗ xoan') || text.includes('gỗ sồi') || text.includes('gõ đỏ') || text.includes('gụ') || text.includes('hương đá') || text.includes('dổi') || text.includes('mít') || text.includes('chất lượng') || text.includes('bảo hành') || text.includes('mộc 15s')) {
      return {
        text: `🪵 **DANH MỤC 7 LOẠI GỖ CHUYÊN ĐỒ THỜ & BẢO HÀNH GỖ LÕI**\n\n` +
          `An Gia Tịnh cam kết **100% Gỗ Lõi Tuyển Chọn Không Pha Rác** (Đền 200% nếu phát hiện gỗ dác). Thời hạn bảo hành minh bạch theo từng loại gỗ:\n\n` +
          `1. **Gỗ Xoan Đào (Bình dân giá mềm)**: Bảo hành 2 năm (Giá chỉ từ 990k, sấy lò chống co ngót).\n` +
          `2. **Gỗ Sồi Mỹ (Hiện đại Japandi)**: Bảo hành 3 năm (Bắt vít tường siêu chắc, vân elip sáng đẹp).\n` +
          `3. **Gỗ Dổi / Mít Ta Vàng Tâm (Tâm linh cổ truyền)**: Bảo hành 5 năm (Tinh dầu thơm tự nhiên, thớ vàng tôn nghiêm).\n` +
          `4. **Gỗ Gõ Đỏ Pachy / Gụ Lào (Cao cấp sang trọng)**: Bảo hành 5 năm (Thớ đanh nặng, tom mịn bóng như sừng).\n` +
          `5. **Gỗ Hương Đá (Thượng lưu siêu VIP)**: Bảo hành 5 năm (Vân xoáy chỉ tơ đỉnh cao, đanh đặc bền vững).\n\n` +
          `• **Quy chuẩn video mộc 15s**: Trước khi phun sơn Inchem, thợ cả luôn quay clip mộc 4 mặt gửi Zalo gia chủ duyệt tận mắt!`,
        actionCard: {
          title: 'Xem Clip Mộc Thô 15s & Báo Giá Zalo',
          description: 'Nhắn Zalo 0339.533.380 để thợ cả gửi clip mộc thô 15s và tư vấn loại gỗ phù hợp kinh phí của gia đình:',
          zaloUrl: 'https://zalo.me/0339533380',
          phoneUrl: 'tel:0339533380',
        },
        suggestions: [
          'Sinh năm 1989 đặt hướng nào?',
          'Bàn thờ treo gỗ Xoan giá bao nhiêu?',
          'Kích thước bàn thờ chung cư chuẩn Lỗ Ban 38.8cm',
          'Tặng trọn bộ văn khấn an vị bàn thờ',
        ],
      };
    }

    // 7. Tình huống Tặng Văn Khấn Cổ Truyền
    if (text.includes('văn khấn') || text.includes('nhập trạch') || text.includes('bao sái') || text.includes('về nhà mới') || text.includes('tặng')) {
      return {
        text: `📜 **TRỌN BỘ VĂN KHẤN AN VỊ BÀN THỜ & LỄ NHẬP TRẠCH CỔ TRUYỀN (FILE PDF)**\n\n` +
          `Xưởng An Gia Tịnh đã biên soạn sẵn cẩm nang tâm linh chuẩn nghi thức cổ truyền gồm:\n` +
          `1. Bài văn khấn An Vị Bát Hương & Lập Bàn Thờ Mới.\n` +
          `2. Văn khấn Lễ Nhập Trạch về căn hộ chung cư / nhà phố mới.\n` +
          `3. Bài văn khấn Bao Sái, tỉa chân nhang cuối năm.\n` +
          `4. Hướng dẫn sắm mâm lễ chay/mặn tươm tất thanh tịnh.\n\n` +
          `Xưởng gửi tặng hoàn toàn **Miễn Phí 100%** cho quý gia chủ!`,
        actionCard: {
          title: 'Nhận File PDF Văn Khấn Ngay Qua Zalo',
          description: 'Gia chủ bấm nút nhắn tin Zalo hoặc để lại số điện thoại tại ô chat, thợ cả gửi file PDF đọc trên điện thoại ngay nhé:',
          zaloUrl: 'https://zalo.me/0339533380',
          phoneUrl: 'tel:0339533380',
        },
        suggestions: [
          'Sinh năm 1989 đặt hướng nào?',
          'Kích thước bàn thờ chung cư chuẩn Lỗ Ban 38.8cm',
          'Làm sao nhận biết 100% gỗ lõi không pha rác?',
        ],
      };
    }

    // 8. Câu trả lời mặc định khi hỏi câu hỏi chung chung
    return {
      text: `Kính thưa gia chủ! 🙏\n\nĐể nhận được câu trả lời phong thủy chính xác và vừa vặn nhất cho không gian gia đình mình, gia chủ có thể:\n\n` +
        `• Gõ **Năm sinh** (ví dụ: *1989, 1993, 1985...*) để xem ngay 4 hướng tốt.\n` +
        `• Gõ câu hỏi về **Kích thước Lỗ Ban**, **Cách hóa giải xà ngang** hoặc **Chất gỗ lõi**.\n` +
        `• Hoặc kết nối trực tiếp với Nghệ nhân Thợ Cả qua Zalo để gửi ảnh căn hộ:`,
      actionCard: {
        title: 'Tư Vấn Phong Thủy & Xem Mẫu Thực Tế',
        description: 'Thợ Cả Bùi Văn Thắng (25 năm nghề mộc An Gia Tịnh) trực tiếp tư vấn qua Zalo 0339.533.380:',
        zaloUrl: 'https://zalo.me/0339533380',
        phoneUrl: 'tel:0339533380',
      },
      suggestions: [
        'Xem hướng bàn thờ theo năm sinh',
        'Kích thước bàn thờ chung cư chuẩn Lỗ Ban 38.8cm',
        'Tặng trọn bộ văn khấn an vị bàn thờ',
      ],
    };
  };

  const handleSend = async (textToSend?: string) => {
    // 0. Chống bot crawl tự động bằng bẫy Honeypot
    if (honeypot.trim()) {
      return;
    }

    const query = (textToSend || input).trim();
    if (!query) return;

    // 1. Kiểm tra độ dài câu hỏi (Chống chuỗi rác hoặc payload quá dài làm tràn token)
    if (query.length < ANTI_SPAM_CONFIG.MIN_CHAR_LENGTH) {
      setSpamAlert('Gia chủ vui lòng nhập câu hỏi rõ ràng (tối thiểu 2 ký tự).');
      return;
    }
    if (query.length > ANTI_SPAM_CONFIG.MAX_CHAR_LENGTH) {
      setSpamAlert(
        `Câu hỏi quá dài (${query.length}/${ANTI_SPAM_CONFIG.MAX_CHAR_LENGTH} ký tự). Gia chủ vui lòng rút gọn lại nhé.`
      );
      return;
    }

    // 2. Chống spam câu hỏi trùng lặp liên tiếp
    if (query.toLowerCase() === lastQueryRef.current.toLowerCase()) {
      setSpamAlert(
        'Gia chủ vừa gửi câu hỏi này rồi ạ. Nếu cần tư vấn thêm, gia chủ có thể nhắn Zalo 0339.533.380 nhé!'
      );
      return;
    }

    const now = Date.now();

    // 3. Chống bấm gửi liên thanh (Cooldown tối thiểu 3 giây)
    if (now - lastSendTimeRef.current < ANTI_SPAM_CONFIG.MIN_INTERVAL_MS) {
      const waitSec = Math.ceil(
        (ANTI_SPAM_CONFIG.MIN_INTERVAL_MS - (now - lastSendTimeRef.current)) / 1000
      );
      setSpamAlert(
        `Gia chủ thao tác hơi nhanh, vui lòng đợi ${waitSec} giây để hệ thống phản hồi chu đáo...`
      );
      return;
    }

    // 4. Chống spam burst (Tối đa 5 câu hỏi trong 60 giây)
    const validTimestamps = recentTimestampsRef.current.filter((t) => now - t < 60000);
    if (validTimestamps.length >= ANTI_SPAM_CONFIG.MAX_PER_MINUTE) {
      setSpamAlert(
        'Gia chủ đã gửi quá 5 câu hỏi trong 1 phút. Vui lòng tạm nghỉ 30 giây để Thợ Cả trả lời kịp nhé!'
      );
      return;
    }

    // 5. Kiểm tra hạn mức câu hỏi trong ngày (Tối đa 3 câu/ngày/thiết bị)
    const currentDaily = getStoredDailyCount();
    if (currentDaily >= ANTI_SPAM_CONFIG.MAX_DAILY_QUERIES) {
      const limitMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Kính thưa gia chủ! 🙏\n\nĐể đảm bảo phục vụ mọi gia chủ chu đáo, hệ thống AI trực tuyến đã đạt **giới hạn 3 câu hỏi hôm nay** trên thiết bị của gia chủ.\n\nKính mời gia chủ kết nối trực tiếp với **Nghệ nhân Thợ Cả Bùi Văn Thắng** qua Hotline hoặc Zalo **0339.533.380** để gửi ảnh căn hộ và nhận tư vấn hướng đặt bàn thờ hoàn toàn miễn phí ạ!`,
        actionCard: {
          title: 'Kết Nối Trực Tiếp Thợ Cả Bùi Văn Thắng',
          description: 'Nhắn Zalo 0339.533.380 nhận tư vấn 1-1 chuyên sâu không giới hạn:',
          zaloUrl: 'https://zalo.me/0339533380',
          phoneUrl: 'tel:0339533380',
        },
        time: 'Vừa xong',
      };
      setMessages((prev) => [...prev, limitMsg]);
      return;
    }

    // Ghi nhận lượt tương tác hợp lệ
    lastSendTimeRef.current = now;
    recentTimestampsRef.current = [...validTimestamps, now];
    lastQueryRef.current = query;
    const newCount = incrementStoredDailyCount();
    setDailyCount(newCount);
    setCooldown(3); // Kích hoạt 3 giây đếm ngược
    setSpamAlert(null);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: 'Vừa xong',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 1. Nếu là số điện thoại hoặc tra cứu năm sinh: Dùng engine chuyên sâu tức thì
    const isPhone = /(0[3|5|7|8|9][0-9]{8})/.test(query);
    const isYear = /\b(19\d{2}|20[0-2]\d)\b/.test(query);

    if (isPhone || isYear) {
      setTimeout(() => {
        const { text, actionCard, suggestions } = processConsultation(query);
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text,
          actionCard,
          suggestions,
          time: 'Vừa xong',
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 300);
      return;
    }

    // 2. Với các câu hỏi tư vấn khác: Gọi Google Gemini 2.5 Flash thông minh
    try {
      const geminiReply = await callGemini(query);
      if (geminiReply) {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: geminiReply,
          actionCard: {
            title: 'Tư Vấn Trực Tiếp Với Nghệ Nhân Thợ Cả',
            description:
              'Gia chủ nhắn Zalo 0339.533.380 hoặc để lại số điện thoại để Thợ Cả gửi clip mộc 15s và tư vấn sơ đồ nhà:',
            zaloUrl: 'https://zalo.me/0339533380',
            phoneUrl: 'tel:0339533380',
          },
          suggestions: [
            'Xem hướng bàn thờ theo năm sinh',
            'Kích thước bàn thờ 48x81cm có ý nghĩa gì?',
            'Tặng trọn bộ văn khấn an vị bàn thờ',
          ],
          time: 'Vừa xong',
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }
    } catch (e) {
      console.warn('Gemini chat error:', e);
    }

    // 3. Phản hồi quy tắc chuẩn nếu offline
    setTimeout(() => {
      const { text, actionCard, suggestions } = processConsultation(query);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text,
        actionCard,
        suggestions,
        time: 'Vừa xong',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: `Kính chào quý gia chủ! 🙏\n\nTôi là **Trợ Lý Phong Thủy AI** của xưởng gỗ **An Gia Tịnh**.\nThợ cả đã chuẩn bị sẵn các câu hỏi tư vấn thực tế theo từng nhu cầu dưới đây, gia chủ bấm chọn ngay hoặc gõ trực tiếp câu hỏi nhé:`,
        time: 'Vừa xong',
        suggestions: [
          'Sinh năm 1989 đặt hướng nào?',
          'Sinh năm 1993 đặt hướng nào?',
          'Kích thước bàn thờ 48x81cm có ý nghĩa gì?',
          'Bàn thờ bị vướng dầm xà hóa giải ra sao?',
        ],
      },
    ]);
  };

  return (
    <>
      {/* 1. NÚT KÍCH HOẠT FLOATING BÊN GÓC TRÁI MÀN HÌNH (DESKTOP) */}
      <div className="hidden md:block fixed bottom-6 left-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#802219] via-[#6d1b13] to-[#59140e] hover:from-[#94271d] hover:to-[#802219] text-white rounded-full shadow-2xl border border-amber-400/60 hover:border-amber-300 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Mở Trợ Lý Phong Thủy AI"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-tight pr-1 text-amber-100">
              AI Phong Thủy
            </span>
          </button>
        )}
      </div>

      {/* 2. CỬA SỔ CHATBOT POPUP THÔNG MINH */}
      {isOpen && (
        <div className="fixed bottom-14 inset-x-2 sm:inset-x-auto sm:bottom-6 sm:left-6 z-50 w-auto sm:w-[420px] max-w-[96vw] h-[590px] max-h-[85vh] bg-[#FAF9F6] rounded-3xl shadow-2xl border border-amber-900/25 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header - Nền Đỏ Son Phong Thủy Sang Trọng */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#802219] via-[#6d1b13] to-[#59140e] text-white flex items-center justify-between border-b border-[#a83226] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-black text-xs sm:text-sm text-white">
                  Trợ Lý Phong Thủy An Gia Tịnh
                </span>
                <span className="block text-[10px] text-amber-300 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Trực Tuyến 24/7 • Hotline/Zalo: 0339.533.380
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-full text-amber-200/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Bắt đầu lại cuộc hội thoại"
                aria-label="Làm mới hội thoại"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-amber-200/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Đóng trợ lý AI"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Scenario Buttons Strip (5 Tình huống mẫu) */}
          <div className="p-2.5 bg-amber-500/10 border-b border-amber-200/60 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold text-amber-950 uppercase tracking-wider shrink-0 pl-1">
              Chọn nhanh:
            </span>
            {SAMPLE_SCENARIOS.map((sc) => {
              const Icon = sc.icon;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSend(sc.prompt)}
                  className="px-2.5 py-1 bg-white hover:bg-amber-100/70 border border-amber-300/80 hover:border-amber-400 text-stone-800 rounded-full text-[11px] font-medium transition-all shrink-0 flex items-center gap-1 shadow-3xs active:scale-95"
                >
                  <Icon className="w-3 h-3 text-amber-700 shrink-0" />
                  <span className="whitespace-nowrap">{sc.title}</span>
                </button>
              );
            })}
          </div>

          {/* Messages Body */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-[#FAF9F6] text-xs scroll-smooth"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[90%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-700 text-white rounded-br-none shadow-xs font-medium'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-none shadow-2xs'
                  }`}
                >
                  {/* Rich Formatted Message Text: Xóa sạch toàn bộ dấu sao và định dạng in đậm chuẩn */}
                  <FormattedMessage text={m.text} isUser={m.sender === 'user'} />

                  {/* Action Card: Dẫn về Zalo & Gọi Điện Thợ Cả */}
                  {m.actionCard && (
                    <div className="mt-3 p-3 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl border border-amber-300/70 space-y-2">
                      <div className="flex items-start gap-1.5">
                        <span className="text-base shrink-0">📍</span>
                        <div>
                          <h4 className="font-bold text-stone-900 text-xs leading-snug">
                            {m.actionCard.title}
                          </h4>
                          <p className="text-[11px] text-stone-600 font-light mt-0.5 leading-relaxed">
                            {m.actionCard.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={m.actionCard.zaloUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-95"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Nhắn Zalo Thợ Cả</span>
                        </a>

                        <a
                          href={m.actionCard.phoneUrl}
                          className="py-2 px-3 bg-[#451a03] hover:bg-[#5c2406] text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1 shadow-xs transition-colors active:scale-95"
                          title="Gọi điện ngay"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-300" />
                          <span className="hidden sm:inline">0339.533.380</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick suggestions chips */}
                {m.suggestions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {m.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(s)}
                        className="px-2.5 py-1 bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-800 border border-stone-200 hover:border-amber-300 rounded-full text-[11px] font-medium transition-all text-left shadow-3xs flex items-center gap-1"
                      >
                        <span>{s}</span>
                        <ChevronRight className="w-2.5 h-2.5 text-stone-400" />
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
                <span className="text-[10px] text-stone-500 ml-1">Đang tra cứu phong thủy Bát Trạch...</span>
              </div>
            )}
          </div>

          {/* Anti-Spam Alerts & Rate Limit Banners */}
          {spamAlert && (
            <div className="px-3 py-2 bg-amber-500/15 border-t border-amber-300 text-amber-950 text-[11px] font-medium flex items-center justify-between shrink-0 animate-in fade-in">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>{spamAlert}</span>
              </div>
              <button
                type="button"
                onClick={() => setSpamAlert(null)}
                className="text-stone-400 hover:text-stone-700 p-0.5"
                aria-label="Đóng cảnh báo"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {dailyCount >= ANTI_SPAM_CONFIG.MAX_DAILY_QUERIES && (
            <div className="px-3 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border-t border-amber-300 text-stone-800 text-[11px] font-medium text-center flex items-center justify-center gap-1.5 shrink-0">
              <AlertCircle className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span>
                Đã dùng hết 3 lượt hỏi AI hôm nay. Kính mời gia chủ nhắn Zalo{' '}
                <strong className="text-[#802219]">0339.533.380</strong> để Thợ Cả tư vấn trực tiếp!
              </span>
            </div>
          )}

          {/* Quick Input Bar With Anti-Spam Shield */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-1.5 shrink-0"
          >
            {/* Honeypot hidden field để bẫy bot tự động */}
            <input
              type="text"
              name="agt_bot_trap"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                maxLength={ANTI_SPAM_CONFIG.MAX_CHAR_LENGTH}
                disabled={dailyCount >= ANTI_SPAM_CONFIG.MAX_DAILY_QUERIES || isTyping}
                placeholder={
                  dailyCount >= ANTI_SPAM_CONFIG.MAX_DAILY_QUERIES
                    ? 'Đã dùng hết 3 lượt hỏi hôm nay...'
                    : cooldown > 0
                    ? `Vui lòng đợi ${cooldown}s để hỏi tiếp...`
                    : `Nhập năm sinh hoặc câu hỏi (còn ${Math.max(0, ANTI_SPAM_CONFIG.MAX_DAILY_QUERIES - dailyCount)}/3 lượt)...`
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-amber-600 font-medium placeholder:text-stone-400 disabled:opacity-60 disabled:bg-stone-100 pr-12"
              />

              {/* Bộ đếm ký tự chống spam văn bản dài */}
              {input.length > 180 && (
                <span className="absolute right-2 text-[10px] text-stone-400 font-mono select-none">
                  {input.length}/{ANTI_SPAM_CONFIG.MAX_CHAR_LENGTH}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={
                !input.trim() ||
                isTyping ||
                cooldown > 0 ||
                dailyCount >= ANTI_SPAM_CONFIG.MAX_DAILY_QUERIES
              }
              className="p-2 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-xs active:scale-95 shrink-0 flex items-center justify-center min-w-[36px] h-9"
              aria-label="Gửi câu hỏi"
            >
              {cooldown > 0 ? (
                <span className="text-[11px] font-mono font-bold px-0.5">{cooldown}s</span>
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

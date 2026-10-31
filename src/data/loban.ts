import type { LobanCung } from '../types';

export const LOBAN_CYCLE_CM = 38.8;

export const LOBAN_CUNG_LIST: LobanCung[] = [
  {
    id: 1,
    name: 'Đinh',
    isGood: true,
    meaning: 'Gia đạo sinh con trai quý tử, đỗ đạt công danh, tiền của dồi dào, phúc tinh chiếu mệnh.',
    subCung: [
      { name: 'Phúc Tinh', isGood: true, detail: 'Sao phúc chiếu rọi, gặp may mắn trong mọi việc.' },
      { name: 'Cấp Đệ', isGood: true, detail: 'Thi cử đỗ đạt, thăng quan tiến chức.' },
      { name: 'Tài Vượng', isGood: true, detail: 'Tiền của phát triển, buôn bán sinh lời.' },
      { name: 'Đăng Khoa', isGood: true, detail: 'Đỗ khoa bảng, rạng danh dòng tộc.' },
    ],
  },
  {
    id: 2,
    name: 'Hại',
    isGood: false,
    meaning: 'Dễ vướng điều tiếng thị phi khẩu thiệt, gia đạo ốm đau bệnh tật triền miên, hao tổn.',
    subCung: [
      { name: 'Khẩu Thiệt', isGood: false, detail: 'Dễ mang tiếng xấu, tranh chấp cãi cọ.' },
      { name: 'Bệnh Lâm', isGood: false, detail: 'Bệnh tật dai dẳng khó chữa.' },
      { name: 'Tử Tuyệt', isGood: false, detail: 'Tuyệt tự, con cháu suy hao.' },
      { name: 'Tai Họa', isGood: false, detail: 'Gặp tai bay vạ gió bất ngờ.' },
    ],
  },
  {
    id: 3,
    name: 'Vượng',
    isGood: true,
    meaning: 'Vượng khí ngập tràn, đón nhiều tin vui hỷ sự, tiền tài của cải sinh sôi nảy nở.',
    subCung: [
      { name: 'Thiên Đức', isGood: true, detail: 'Được trời ban phúc đức chở che.' },
      { name: 'Hỷ Sự', isGood: true, detail: 'Trong nhà liên tiếp có chuyện vui, cưới hỏi, sinh nở.' },
      { name: 'Tiến Bảo', isGood: true, detail: 'Đón nhận thêm của quý, tài lộc dồi dào.' },
      { name: 'Thêm Phúc', isGood: true, detail: 'Phúc lộc tràn đầy, gia đạo bình an.' },
    ],
  },
  {
    id: 4,
    name: 'Khổ',
    isGood: false,
    meaning: 'Khổ ải trắc trở, tiền tài thất thoát, dính líu kiện tụng quan quỷ, con cái khó nuôi.',
    subCung: [
      { name: 'Thất Thoát', isGood: false, detail: 'Tiền bạc trôi đi mất, khó tích lũy.' },
      { name: 'Quan Quỷ', isGood: false, detail: 'Hay gặp chuyện kiện cáo, rắc rối cửa quan.' },
      { name: 'Kiếp Tài', isGood: false, detail: 'Dễ bị lừa gạt, mất mát tài sản.' },
      { name: 'Vô Tự', isGood: false, detail: 'Hiếm muộn, cô độc không nơi nương tựa.' },
    ],
  },
  {
    id: 5,
    name: 'Nghĩa',
    isGood: true,
    meaning: 'Nghĩa khí, gia đình hòa thuận thảo hiền, đại cát đại lợi, có quý nhân tương trợ.',
    subCung: [
      { name: 'Đại Cát', isGood: true, detail: 'Điều lành lớn lao, làm gì cũng hanh thông.' },
      { name: 'Tài Vượng', isGood: true, detail: 'Kinh doanh phát tài, nguồn thu dồi dào.' },
      { name: 'Lợi Ích', isGood: true, detail: 'Đạt được nhiều điều mong cầu may mắn.' },
      { name: 'Thiên Khố', isGood: true, detail: 'Kho trời ban tặng của cải bất ngờ.' },
    ],
  },
  {
    id: 6,
    name: 'Quan',
    isGood: true,
    meaning: 'Đường công danh sự nghiệp rộng mở, đỗ đạt khoa bảng, kinh doanh tiến bảo vinh hiển.',
    subCung: [
      { name: 'Phú Quý', isGood: true, detail: 'Giàu sang phú quý lâu dài.' },
      { name: 'Tiến Bảo', isGood: true, detail: 'Được thêm điền sản, lộc lá phương xa.' },
      { name: 'Tài Lộc', isGood: true, detail: 'Vận may tiền bạc đến liên tục.' },
      { name: 'Thuận Khoa', isGood: true, detail: 'Học hành thi cử hanh thông suôn sẻ.' },
    ],
  },
  {
    id: 7,
    name: 'Tử',
    isGood: false,
    meaning: 'Cung hung hiểm, dễ biệt ly, phân tán tha hương lập nghiệp khó nhọc, thoái tài.',
    subCung: [
      { name: 'Ly Hương', isGood: false, detail: 'Phải rời bỏ quê cha đất tổ bôn ba.' },
      { name: 'Tử Biệt', isGood: false, detail: 'Mất mát người thân, chia ly đau buồn.' },
      { name: 'Thoái Đinh', isGood: false, detail: 'Con cháu suy giảm, vận khí sa sút.' },
      { name: 'Thất Tài', isGood: false, detail: 'Mất mát cơ hội kinh doanh lớn.' },
    ],
  },
  {
    id: 8,
    name: 'Hưng',
    isGood: true,
    meaning: 'Gia đạo hưng thịnh phồn vinh, con cháu thông minh tài giỏi, thêm đinh thêm của.',
    subCung: [
      { name: 'Đăng Khoa', isGood: true, detail: 'Đỗ đạt thủ khoa, bảng vàng ghi tên.' },
      { name: 'Quý Tử', isGood: true, detail: 'Sinh được quý tử nối dõi tông đường.' },
      { name: 'Thêm Đinh', isGood: true, detail: 'Gia đình thêm người, con đàn cháu đống.' },
      { name: 'Hưng Vượng', isGood: true, detail: 'Mọi mặt đời sống đều vươn lên thịnh trị.' },
    ],
  },
  {
    id: 9,
    name: 'Thất',
    isGood: false,
    meaning: 'Mất mát, hao tổn công sức làm nhiều hưởng ít, dễ vướng lao tù hoặc cảnh cô quả.',
    subCung: [
      { name: 'Cô Quả', isGood: false, detail: 'Sống cảnh cô đơn, người thân xa cách.' },
      { name: 'Lao Tù', isGood: false, detail: 'Rắc rối pháp luật, vướng vòng tù tội.' },
      { name: 'Thoái Tài', isGood: false, detail: 'Tài chính tụt dốc, nợ nần phát sinh.' },
      { name: 'Công Hư', isGood: false, detail: 'Công sức bỏ ra đều đổ sông đổ biển.' },
    ],
  },
  {
    id: 10,
    name: 'Tài',
    isGood: true,
    meaning: 'Đón nhận phúc đức ngập tràn, đón lộc tứ phương, sáu phương tương trợ (Lục hợp).',
    subCung: [
      { name: 'Nghinh Phúc', isGood: true, detail: 'Mở cửa rước phúc lành vào nhà.' },
      { name: 'Thoái Lộc', isGood: true, detail: 'Đón nhận lộc lớn trời ban.' },
      { name: 'Tiến Bảo', isGood: true, detail: 'Của cải tích lũy ngày càng nhiều.' },
      { name: 'Lục Hợp', isGood: true, detail: 'Sáu hướng hòa hợp, vạn sự cát tường viên mãn.' },
    ],
  },
];

export function calculateLoBan388(lengthCm: number) {
  if (!lengthCm || lengthCm <= 0) {
    return {
      lengthCm: 0,
      cung: null,
      subCung: null,
      isGood: false,
      advice: 'Vui lòng nhập kích thước lớn hơn 0 cm.',
    };
  }

  // Chu kỳ 38.8cm
  const remainder = ((lengthCm % LOBAN_CYCLE_CM) + LOBAN_CYCLE_CM) % LOBAN_CYCLE_CM;
  const cungLength = LOBAN_CYCLE_CM / 10; // 3.88cm mỗi cung lớn
  const cungIndex = Math.min(Math.floor(remainder / cungLength), 9);
  const cung = LOBAN_CUNG_LIST[cungIndex];

  // Tính cung nhỏ (mỗi cung nhỏ = 3.88 / 4 = 0.97cm)
  const subLength = cungLength / 4;
  const subIndex = Math.min(Math.floor((remainder % cungLength) / subLength), 3);
  const subCung = cung.subCung[subIndex];

  const advice = cung.isGood
    ? `Kích thước ${lengthCm}cm thuộc CUNG ĐỎ (${cung.name} - ${subCung.name}): Đại cát đại lợi, rất tốt cho ban thờ gia tiên & tài vận gia đình!`
    : `Kích thước ${lengthCm}cm rơi vào CUNG ĐEN (${cung.name} - ${subCung.name}): Nên điều chỉnh kích thước về cung đỏ cát tường để tránh phạm phong thủy!`;

  return {
    lengthCm,
    cung,
    subCung,
    isGood: cung.isGood,
    advice,
  };
}

export const POPULAR_ALTAR_SIZES = [
  {
    name: 'Bàn thờ treo chung cư 48 x 81 cm',
    depth: 48,
    depthCung: 'Hỷ Sự (Cung Vượng)',
    width: 81,
    widthCung: 'Đăng Khoa (Cung Đinh)',
    suitableFor: 'Căn hộ chung cư 1-2 phòng ngủ, không gian ấm cúng',
  },
  {
    name: 'Bàn thờ treo chung cư 48 x 89 cm',
    depth: 48,
    depthCung: 'Hỷ Sự (Cung Vượng)',
    width: 89,
    widthCung: 'Thêm Phúc (Cung Vượng)',
    suitableFor: 'Căn hộ chung cư 2-3 phòng ngủ, bày 1 đến 3 bát hương',
  },
  {
    name: 'Bàn thờ treo đại cát 61 x 107 cm',
    depth: 61,
    depthCung: 'Lục Hợp (Cung Tài)',
    width: 107,
    widthCung: 'Thêm Đinh (Cung Hưng)',
    suitableFor: 'Nhà phố hoặc chung cư diện tích lớn, thờ Gia Tiên & Thần Linh',
  },
  {
    name: 'Bàn thờ đứng gia tiên 61 x 127 cm',
    depth: 61,
    depthCung: 'Lục Hợp (Cung Tài)',
    width: 127,
    widthCung: 'Tiến Bảo (Cung Quan)',
    suitableFor: 'Phòng thờ riêng biệt nhà phố, biệt thự',
  },
  {
    name: 'Bàn thờ đứng đại gia tiên 67 x 153 cm',
    depth: 67,
    depthCung: 'Quý Tử (Cung Hưng)',
    width: 153,
    widthCung: 'Lục Hợp (Cung Tài)',
    suitableFor: 'Nhà thờ họ, từ đường, gia đình tam đại đồng đường',
  },
];

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  author: string;
  category: string;
  readingTime: string;
  coverImage: string;
  headings: { depth: number; slug: string; text: string }[];
  contentHtml: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'kich-thuoc-ban-tho-chung-cu-chuan-thuoc-lo-ban-38-8cm',
    title: 'Kích Thước Bàn Thờ Chung Cư Chuẩn Thước Lỗ Ban 38.8cm Thu Hút Tài Lộc',
    description: 'Hướng dẫn chi tiết cách chọn kích thước bàn thờ treo chung cư chuẩn Thước Lỗ Ban 38.8cm Cung Đỏ (48x81, 48x89, 61x107). Tránh phạm cung hung, đón trọn vượng khí bình an.',
    publishDate: '2026-10-31',
    author: 'Nghệ Nhân Bùi Văn Thắng (Thợ Cả Làng Nghề Thạch Thất)',
    category: 'Phong Thủy Bàn Thờ',
    readingTime: '6 phút đọc',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    headings: [
      { depth: 2, slug: '1-tong-quan-thuoc-lo-ban-38-8cm', text: '1. Tổng quan về Thước Lỗ Ban 38.8cm Âm Phần' },
      { depth: 3, slug: '1-1-su-khac-nhau-giua-3-loai-thuoc-lo-ban', text: '1.1. Sự khác nhau giữa 3 loại Thước Lỗ Ban phổ biến' },
      { depth: 3, slug: '1-2-vi-sao-dong-ban-tho-phai-dung-thuoc-38-8cm', text: '1.2. Vì sao đóng bàn thờ bắt buộc phải dùng thước 38.8cm?' },
      { depth: 2, slug: '2-cac-kich-thuoc-ban-tho-treo-chung-cu-dai-cat', text: '2. Các kích thước bàn thờ treo chung cư Cung Đỏ đại cát' },
      { depth: 3, slug: '2-1-kich-thuoc-48x81cm-hy-su-va-dang-khoa', text: '2.1. Kích thước 48x81cm: Cung Hỷ Sự & Đăng Khoa' },
      { depth: 3, slug: '2-2-kich-thuoc-48x89cm-hy-su-va-them-phuc', text: '2.2. Kích thước 48x89cm: Cung Hỷ Sự & Thêm Phúc' },
      { depth: 3, slug: '2-3-kich-thuoc-61x107cm-luc-hop-va-them-dinh', text: '2.3. Kích thước 61x107cm: Cung Lục Hợp & Thêm Đinh' },
      { depth: 2, slug: '3-chieu-cao-lap-ban-tho-treo-tuong-chung-cu', text: '3. Chiều cao lắp đặt bàn thờ treo tường chung cư hợp lý' },
      { depth: 3, slug: '3-1-tam-cao-dai-cat-1m75-cung-phu-quy', text: '3.1. Tầm cao Đại Cát 1m75: Cung Phú Quý' },
      { depth: 3, slug: '3-2-tam-cao-tien-bao-1m95-hoac-2m12', text: '3.2. Tầm cao Tiến Bảo 1m95 hoặc 2m12' },
      { depth: 2, slug: '4-nhung-dieu-dai-ky-khi-dat-ban-tho-chung-cu', text: '4. Những điều đại kỵ cần tuyệt đối tránh khi đặt bàn thờ chung cư' },
      { depth: 3, slug: '4-1-tranh-nhin-thang-vao-nha-ve-sinh-va-bep', text: '4.1. Tránh nhìn thẳng vào cửa nhà vệ sinh và bếp nấu' },
      { depth: 3, slug: '4-2-tranh-dat-duoi-xa-ngang-va-duoi-may-lanh', text: '4.2. Tránh đặt dưới xà ngang và luồng gió máy lạnh' },
    ],
    contentHtml: `
      <h2 id="1-tong-quan-thuoc-lo-ban-38-8cm">1. Tổng quan về Thước Lỗ Ban 38.8cm Âm Phần</h2>
      <p>Trong văn hóa tâm linh người Việt, không gian thờ tự là nơi ngự trì của gia tiên tiền tổ và thần linh bản thổ. Việc chọn đúng kích thước bàn thờ không chỉ mang lại sự hài hòa về mặt thẩm mỹ kiến trúc mà còn ảnh hưởng sâu sắc đến sự bình an, hưng thịnh của cả gia đạo.</p>

      <h3 id="1-1-su-khac-nhau-giua-3-loai-thuoc-lo-ban">1.1. Sự khác nhau giữa 3 loại Thước Lỗ Ban phổ biến</h3>
      <p>Nhiều gia chủ khi tự mua bàn thờ hoặc thợ mộc tay ngang thường nhầm lẫn giữa 3 loại thước:</p>
      <ul>
        <li><strong>Thước 52.2cm:</strong> Đo khoảng thông thủy cửa nhà, cửa sổ.</li>
        <li><strong>Thước 42.9cm:</strong> Đo khối xây dựng dương trạch (bếp, bậc cầu thang, giường).</li>
        <li><strong>Thước 38.8cm (hay 39cm):</strong> Thước Âm Phần dùng cho bàn thờ gia tiên, tiểu quách, mộ phần.</li>
      </ul>

      <h3 id="1-2-vi-sao-dong-ban-tho-phai-dung-thuoc-38-8cm">1.2. Vì sao đóng bàn thờ bắt buộc phải dùng thước 38.8cm?</h3>
      <p>Thước 38.8cm chu kỳ gồm 10 cung lớn: Đinh, Hại, Vượng, Khổ, Nghĩa, Quan, Tử, Hưng, Thất, Tài. Chỉ có 6 cung đỏ là cát tường. Nếu dùng nhầm thước 52.2cm, một kích thước tưởng là tốt ở thước này lại có thể rơi đúng vào cung Tử hoặc Khổ của thước âm phần.</p>

      <h2 id="2-cac-kich-thuoc-ban-tho-treo-chung-cu-dai-cat">2. Các kích thước bàn thờ treo chung cư Cung Đỏ đại cát</h2>
      <p>Đối với căn hộ chung cư có trần cao từ 2.6m đến 2.8m, bàn thờ treo tường là giải pháp tiết kiệm diện tích tối ưu nhất. Dưới đây là 3 kích thước vàng được xưởng An Gia Tịnh chế tác nhiều nhất:</p>

      <h3 id="2-1-kich-thuoc-48x81cm-hy-su-va-dang-khoa">2.1. Kích thước 48x81cm: Cung Hỷ Sự & Đăng Khoa</h3>
      <p>Chiều sâu 48cm rơi vào cung <strong>Hỷ Sự</strong> (trong cung Vượng) mang ý nghĩa đón nhận tin vui hỷ sự. Chiều rộng 81cm rơi vào cung <strong>Đăng Khoa</strong> (trong cung Đinh) ngụ ý con cháu học hành tấn tới, thi cử đỗ đạt, công danh rạng rỡ. Phù hợp cho căn hộ 1-2 phòng ngủ bày 1 bát hương.</p>

      <h3 id="2-2-kich-thuoc-48x89cm-hy-su-va-them-phuc">2.2. Kích thước 48x89cm: Cung Hỷ Sự & Thêm Phúc</h3>
      <p>Chiều rộng 89cm rơi vào cung <strong>Thêm Phúc</strong> (trong cung Vượng). Đây là cặp kích thước song vượng được gia chủ chung cư 2-3 phòng ngủ ưa chuộng nhất, mặt ban đủ rộng để bày 1 đến 3 bát hương cùng mâm bồng ngũ quả tươm tất.</p>

      <h3 id="2-3-kich-thuoc-61x107cm-luc-hop-va-them-dinh">2.3. Kích thước 61x107cm: Cung Lục Hợp & Thêm Đinh</h3>
      <p>Kích thước sâu 61cm (cung Lục Hợp - hòa hợp thuận thảo) x rộng 107cm (cung Thêm Đinh - thêm người thêm của). Thích hợp cho gia chủ có phòng khách chung cư diện tích lớn từ 80m² trở lên.</p>

      <h2 id="3-chieu-cao-lap-ban-tho-treo-tuong-chung-cu">3. Chiều cao lắp đặt bàn thờ treo tường chung cư hợp lý</h2>
      <p>Chiều cao lắp đặt bàn thờ treo được tính từ mặt sàn nhà hoàn thiện lên đến mép trên cùng của mặt bàn thờ.</p>

      <h3 id="3-1-tam-cao-dai-cat-1m75-cung-phu-quy">3.1. Tầm cao Đại Cát 1m75: Cung Phú Quý</h3>
      <p>Tầm cao 1m75 rơi vào cung Phú Quý (cung Quan), tạo khoảng cách vừa tầm với chiều cao trung bình của người Việt Nam khi thắp nhang, không quá sát trần gây ám khói.</p>

      <h3 id="3-2-tam-cao-tien-bao-1m95-hoac-2m12">3.2. Tầm cao Tiến Bảo 1m95 hoặc 2m12</h3>
      <p>Với những gia đình có trần nhà cao thoáng từ 2.8m - 3.2m, tầm cao 1m95 (cung Tiến Bảo) hoặc 2m12 (cung Đăng Khoa) tạo thế uy nghiêm, tĩnh lặng cho ban thờ.</p>

      <h2 id="4-nhung-dieu-dai-ky-khi-dat-ban-tho-chung-cu">4. Những điều đại kỵ cần tuyệt đối tránh khi đặt bàn thờ chung cư</h2>

      <h3 id="4-1-tranh-nhin-thang-vao-nha-ve-sinh-va-bep">4.1. Tránh nhìn thẳng vào cửa nhà vệ sinh và bếp nấu</h3>
      <p>Bàn thờ cần sự thanh tịnh, uế khí từ nhà vệ sinh hay hỏa khí ngùn ngụt từ bếp nấu nhìn thẳng vào bàn thờ sẽ làm tán tài tán lộc, gia đạo dễ nảy sinh bất hòa.</p>

      <h3 id="4-2-tranh-dat-duoi-xa-ngang-va-duoi-may-lanh">4.2. Tránh đặt dưới xà ngang và luồng gió máy lạnh</h3>
      <p>Xà ngang đè lên bàn thờ tạo cảm giác nặng nề, áp bức (áp đỉnh sát). Hơi gió máy lạnh thổi trực diện vào bát hương làm tán linh khí và nguy cơ thổi tàn nhang gây mất an toàn.</p>
    `,
  },
  {
    slug: 'bi-quyet-nhan-biet-100-go-loi-khong-pha-rac-ban-tho',
    title: 'Bí Quyết Nhận Biết 100% Gỗ Lõi Không Pha Rác Khi Mua Bàn Thờ',
    description: 'Hướng dẫn gia chủ nhận biết thớ gỗ lõi và gỗ rác (dác gỗ) khi chọn bàn thờ gia tiên. Vì sao An Gia Tịnh cam kết bồi thường 200% nếu phát hiện dính rác?',
    publishDate: '2026-10-31',
    author: 'Nghệ Nhân Bùi Văn Thắng (Thợ Cả Làng Nghề Thạch Thất)',
    category: 'Kiến Thức Nghề Mộc',
    readingTime: '5 phút đọc',
    coverImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1000&q=80',
    headings: [
      { depth: 2, slug: '1-khai-niem-go-loi-va-go-rac', text: '1. Khái niệm khoa học: Gỗ Lõi (Heartwood) và Gỗ Rác (Sapwood)' },
      { depth: 3, slug: '1-1-go-loi-la-gi-vi-sao-sieu-ben', text: '1.1. Gỗ lõi là gì? Vì sao đanh chắc không mối mọt?' },
      { depth: 3, slug: '1-2-go-rac-la-gi-nguy-co-tiem-tang', text: '1.2. Gỗ rác là gì? Vì sao đại kỵ làm đồ thờ cúng?' },
      { depth: 2, slug: '2-cach-nhan-biet-khi-kiem-tra-moc-tho', text: '2. Cách phân biệt gỗ lõi và gỗ rác khi xem mộc thô 15s' },
      { depth: 3, slug: '2-1-phan-biet-qua-mau-sac-tu-nhien', text: '2.1. Phân biệt qua màu sắc tự nhiên của thớ gỗ' },
      { depth: 3, slug: '2-2-phan-biet-qua-trong-luong-va-do-cung', text: '2.2. Phân biệt qua trọng lượng và độ đanh chắc' },
      { depth: 2, slug: '3-chinh-sach-cam-ket-den-200-tai-an-gia-tinh', text: '3. Chính sách cam kết đền bù 200% tại An Gia Tịnh' },
      { depth: 3, slug: '3-1-quy-trinh-quay-video-moc-15s-truoc-khi-son', text: '3.1. Quy trình quay video mộc 15s cận cảnh thớ vân' },
      { depth: 3, slug: '3-2-chinh-sach-bao-hanh-10-20-nam', text: '3.2. Chính sách bảo hành nứt nẻ, mối mọt 10-20 năm' },
    ],
    contentHtml: `
      <h2 id="1-khai-niem-go-loi-va-go-rac">1. Khái niệm khoa học: Gỗ Lõi (Heartwood) và Gỗ Rác (Sapwood)</h2>
      <p>Khi một cây gỗ phát triển hàng chục năm, thân cây được chia thành hai phần rõ rệt: Gỗ rác ở bên ngoài và Gỗ lõi ở chính giữa trung tâm.</p>

      <h3 id="1-1-go-loi-la-gi-vi-sao-sieu-ben">1.1. Gỗ lõi là gì? Vì sao đanh chắc không mối mọt?</h3>
      <p>Gỗ lõi là phần tế bào gỗ già đã chuyển hóa hóa học, tích tụ nhiều chất nhựa, tannin và tinh dầu tự nhiên. Phần này có mật độ phân tử cực cao, kháng 100% các loại côn trùng ăn gỗ và mối mọt, có thể tồn tại hàng trăm năm mà không bị phân hủy.</p>

      <h3 id="1-2-go-rac-la-gi-nguy-co-tiem-tang">1.2. Gỗ rác là gì? Vì sao đại kỵ làm đồ thờ cúng?</h3>
      <p>Gỗ rác (dác gỗ) là lớp vỏ non bên ngoài dẫn nước và chất dinh dưỡng nuôi cây. Lớp này chứa nhiều đường và tinh bột nên mối mọt cực kỳ ưa thích. Sau 1-2 năm sử dụng, gỗ rác sẽ bị mọt đùn thành bột trắng, cong vênh và nứt toác. Trong phong thủy, bàn thờ tổ tiên bị nứt toác mối mọt là điềm đại kỵ cho gia đạo.</p>

      <h2 id="2-cach-nhan-biet-khi-kiem-tra-moc-tho">2. Cách phân biệt gỗ lõi và gỗ rác khi xem mộc thô 15s</h2>
      <p>Nhiều xưởng kém uy tín thường dùng sơn màu phủ đậm để che lấp phần gỗ rác. Đó là lý do vì sao An Gia Tịnh luôn quay video mộc thô khi chưa sơn để gia chủ tự mắt kiểm tra:</p>

      <h3 id="2-1-phan-biet-qua-mau-sac-tu-nhien">2.1. Phân biệt qua màu sắc tự nhiên của thớ gỗ</h3>
      <p>Gỗ lõi luôn có màu sẫm đặc trưng (Gụ vàng sẫm chuyển son, Gõ Đỏ màu hổ phách, Sồi Mỹ màu vàng sáng ấm). Trong khi đó, phần gỗ rác luôn có màu trắng đục, nhợt nhạt và không có đường vân liên tục.</p>

      <h3 id="2-2-phan-biet-qua-trong-luong-va-do-cung">2.2. Phân biệt qua trọng lượng và độ đanh chắc</h3>
      <p>Dùng móng tay bấm vào thớ gỗ lõi không để lại vết lún vì thớ gỗ đanh cứng như sừng. Gỗ rác mềm xốp, dễ bị ấn lún và nhẹ hơn đáng kể.</p>

      <h2 id="3-chinh-sach-cam-ket-den-200-tai-an-gia-tinh">3. Chính sách cam kết đền bù 200% tại An Gia Tịnh</h2>

      <h3 id="3-1-quy-trinh-quay-video-moc-15s-truoc-khi-son">3.1. Quy trình quay video mộc 15s cận cảnh thớ vân</h3>
      <p>Mỗi sản phẩm trước khi đưa vào phòng sơn lụa Inchem đều được thợ cả cầm điện thoại quay cận cảnh 4 mặt, các góc mộng và mặt sau của bàn thờ. Video được gửi trực tiếp qua Zalo cho gia chủ duyệt.</p>

      <h3 id="3-2-chinh-sach-bao-hanh-10-20-nam">3.2. Chính sách bảo hành nứt nẻ, mối mọt 10-20 năm</h3>
      <p>Nếu trong quá trình sử dụng phát hiện sản phẩm có dính bất kỳ milimet gỗ rác nào, xưởng cam kết thu hồi và hoàn trả gấp đôi (200%) số tiền cho gia chủ.</p>
    `,
  },
];

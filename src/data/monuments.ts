export interface MonumentSource {
  name: string;
  publisher: string;
  url: string;
}

export interface Monument {
  id: string;
  name: string;
  shortName: string;
  province: string;
  type: string;
  level: string;
  isUnesco: boolean;
  isNationalSpecial: boolean;
  unescoYear?: number;
  nationalSpecialYear?: number;
  period: string;
  summary: string;
  history: string;
  value: string;
  decision: string;
  lat: number;
  lng: number;
  coordinatesNote: string;
  territoryNote?: string;
  unescoDistinctionNote?: string;
  badge: string;
  featured: boolean;
  sources: MonumentSource[];
}

export const MONUMENTS_DATA: Monument[] = [
  {
    id: "hoang-thanh-thang-long",
    name: "Khu trung tâm Hoàng thành Thăng Long – Hà Nội",
    shortName: "Hoàng thành Thăng Long",
    province: "Hà Nội",
    type: "Di tích lịch sử và khảo cổ",
    level: "Di sản Văn hóa Thế giới UNESCO & Di tích Quốc gia Đặc biệt",
    isUnesco: true,
    isNationalSpecial: true,
    unescoYear: 2010,
    nationalSpecialYear: 2009,
    period: "Từ thế kỷ XI (năm 1010) qua các triều Lý, Trần, Lê, Mạc, Nguyễn đến thời đại hiện đại",
    summary: "Trung tâm quyền lực chính trị liên tục suốt hơn 10 thế kỷ của lịch sử Việt Nam, minh chứng cho sự giao thoa văn hóa Đông Á và văn minh sông Hồng.",
    history: "Năm 1010, vua Lý Thái Tổ ban Chiếu dời đô từ Hoa Lư về Đại La và đổi tên thành Thăng Long, chính thức đặt nền móng xây dựng hoàng thành. Hoàng thành Thăng Long liên tục giữ vai trò trung tâm chính trị - quân sự suốt các triều đại Lý, Trần, Hậu Lê, Mạc, Lê Trung Hưng và nhà Nguyễn (đặt thành Hà Nội), kéo dài đến dấu mốc lịch sử hiện đại như Tổng hành dinh Quân đội nhân dân Việt Nam (nhà và hầm D67).",
    value: "Giá trị toàn cầu nổi bật về lịch sử giao thoa văn hóa Á Đông, nghệ thuật kiến trúc thành lũy phong kiến, và tính kế thừa nhiều tầng văn hóa khảo cổ ngàn năm liên tục tại trục trung tâm (Kỳ đài, Đoan Môn, điện Kính Thiên, Hậu Lâu, Bắc Môn) và khu di chỉ khảo cổ học 18 Hoàng Diệu.",
    decision: "Quyết định số 1272/QĐ-TTg ngày 12/8/2009 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt; Được UNESCO ghi danh vào Danh mục Di sản Văn hóa Thế giới ngày 01/8/2010 tại Kỳ họp lần thứ 34 (Brasilia).",
    lat: 21.0354,
    lng: 105.8398,
    coordinatesNote: "Tọa độ tham khảo tại trục trung tâm Đoan Môn - Điện Kính Thiên, không đại diện cho ranh giới khoanh vùng bảo vệ di tích.",
    territoryNote: "Khu vực trung tâm Ba Đình, Thủ đô Hà Nội.",
    unescoDistinctionNote: "Hoàng thành Thăng Long vừa là Di sản Văn hóa Thế giới của UNESCO vừa là Di tích Quốc gia Đặc biệt của Việt Nam.",
    badge: "UNESCO 2010 • QG Đặc biệt",
    featured: true,
    sources: [
      {
        name: "Hồ sơ Di sản Thế giới #1328 (Central Sector of the Imperial Citadel of Thang Long)",
        publisher: "Trung tâm Di sản Thế giới UNESCO",
        url: "https://whc.unesco.org/en/list/1328"
      },
      {
        name: "Danh mục Di tích Quốc gia Đặc biệt (Đợt 1)",
        publisher: "Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch",
        url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
      }
    ]
  },
  {
    id: "van-mieu-quoc-tu-giam",
    name: "Di tích lịch sử và kiến trúc nghệ thuật Văn Miếu – Quốc Tử Giám",
    shortName: "Văn Miếu – Quốc Tử Giám",
    province: "Hà Nội",
    type: "Di tích lịch sử và kiến trúc nghệ thuật",
    level: "Di tích Quốc gia Đặc biệt (Có 82 Bia tiến sĩ là Di sản tư liệu thế giới UNESCO)",
    isUnesco: false,
    isNationalSpecial: true,
    nationalSpecialYear: 2012,
    period: "Văn Miếu lập năm 1070 (thời Lý Thánh Tông); Quốc Tử Giám lập năm 1076 (thời Lý Nhân Tông)",
    summary: "Trường đại học đầu tiên của Việt Nam, biểu tượng đỉnh cao của nền văn hiến Thăng Long và truyền thống hiếu học tôn sư trọng đạo.",
    history: "Năm Canh Tuất 1070, vua Lý Thánh Tông cho khởi dựng Văn Miếu để thờ Chu Công, Khổng Tử và Tứ phối. Năm 1076, vua Lý Nhân Tông cho lập Quốc Tử Giám bên cạnh làm nơi học tập của hoàng tử và các bậc tuấn kiệt trong nước. Trải qua các thời Trần, Hậu Lê, nơi đây tiếp tục được mở mang, đặc biệt là sự kiện vua Lê Thánh Tông cho dựng hệ thống 82 bia tiến sĩ từ khoa thi năm 1442 (khởi khắc năm 1484) nhằm biểu dương hiền tài - nguyên khí quốc gia.",
    value: "Kiến trúc quần thể cổ kính cân đối theo trục Bắc Nam với cổng Văn Miếu, Đại Trung Môn, Khuê Văn Các (biểu tượng Thủ đô), giếng Thiên Quang, Đại Thành Môn, nhà Thái Học cùng hệ thống 82 tấm Bia Tiến sĩ vô giá bằng đá xanh trên lưng rùa đá.",
    decision: "Quyết định số 548/QĐ-TTg ngày 10/5/2012 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt. (82 Bia Tiến sĩ được UNESCO công nhận là Di sản tư liệu thế giới năm 2011).",
    lat: 21.0285,
    lng: 105.8355,
    coordinatesNote: "Tọa độ tham khảo tại khu vực Khuê Văn Các - Giếng Thiên Quang, không đại diện cho ranh giới quy hoạch bảo vệ di tích.",
    territoryNote: "Quận Đống Đa, Thủ đô Hà Nội.",
    unescoDistinctionNote: "Phân biệt rõ: Bản thân quần thể di tích được xếp hạng Di tích Quốc gia Đặc biệt của Việt Nam; 82 Bia Tiến sĩ lưu giữ tại đây là Di sản tư liệu thuộc Chương trình Ký ức Thế giới của UNESCO, không đồng nhất toàn bộ quần thể là Di sản Văn hóa Thế giới.",
    badge: "QG Đặc biệt • Ký ức Thế giới UNESCO",
    featured: true,
    sources: [
      {
        name: "Hồ sơ di tích Văn Miếu – Quốc Tử Giám",
        publisher: "Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch",
        url: "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953"
      },
      {
        name: "Danh mục Di tích Quốc gia Đặc biệt (Đợt 3)",
        publisher: "Cục Di sản văn hóa",
        url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
      }
    ]
  },
  {
    id: "co-do-hue",
    name: "Quần thể di tích Cố đô Huế",
    shortName: "Cố đô Huế",
    province: "TP Huế",
    type: "Di tích lịch sử và kiến trúc nghệ thuật",
    level: "Di sản Văn hóa Thế giới UNESCO & Di tích Quốc gia Đặc biệt",
    isUnesco: true,
    isNationalSpecial: true,
    unescoYear: 1993,
    nationalSpecialYear: 2009,
    period: "Kinh đô thời nhà Nguyễn (1802 – 1945)",
    summary: "Kinh đô phong kiến cuối cùng của Việt Nam, mẫu hình kiệt xuất về một kinh thành phương Đông hòa quyện phong thủy tự nhiên bờ sông Hương.",
    history: "Sau khi đánh bại phong trào Tây Sơn và thống nhất đất nước, năm 1802 vua Gia Long đặt kinh đô tại Phú Xuân - Huế. Quần thể được xây dựng quy mô lớn từ năm 1805 với ba vòng thành: Kinh thành, Hoàng thành và Tử Cấm thành theo nguyên tắc kiến trúc truyền thống kết hợp kỹ thuật công sự phòng thủ Vauban phương Tây. Quần thể còn bao gồm hệ thống lăng tẩm các vua Gia Long, Minh Mạng, Thiệu Trị, Tự Đức, Đồng Khánh, Khải Định ven sông Hương.",
    value: "Quần thể kiến trúc cung đình quy mô đồ sộ bậc nhất Việt Nam còn tương đối toàn vẹn, kết hợp hài hòa tuyệt đối giữa thiên nhiên núi Ngự - sông Hương và không gian triều nghi, tâm linh, phong thủy phương Đông.",
    decision: "Được UNESCO ghi danh là Di sản Văn hóa Thế giới đầu tiên của Việt Nam vào ngày 11/12/1993; Quyết định số 1272/QĐ-TTg ngày 12/8/2009 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt.",
    lat: 16.4698,
    lng: 107.5779,
    coordinatesNote: "Tọa độ tham khảo tại Kỳ Đài - Ngọ Môn Hoàng thành Huế, không đại diện cho ranh giới phân vùng bảo vệ quần thể.",
    territoryNote: "Thành phố Huế trực thuộc Trung ương (có hiệu lực từ ngày 01/01/2025 theo Nghị quyết của Quốc hội).",
    unescoDistinctionNote: "Quần thể Cố đô Huế vừa là Di sản Văn hóa Thế giới UNESCO (1993) vừa là Di tích Quốc gia Đặc biệt (2009).",
    badge: "UNESCO 1993 • QG Đặc biệt",
    featured: true,
    sources: [
      {
        name: "Complex of Hué Monuments #678",
        publisher: "Trung tâm Di sản Thế giới UNESCO",
        url: "https://whc.unesco.org/en/list/678"
      },
      {
        name: "Thành lập Thành phố Huế trực thuộc Trung ương từ 1/1/2025",
        publisher: "Cổng Thông tin điện tử Chính phủ",
        url: "https://xaydungchinhsach.chinhphu.vn/thanh-lap-thanh-pho-hue-truc-thuoc-trung-uong-tu-1-1-2025-119241130091551714.htm"
      }
    ]
  },
  {
    id: "do-thi-co-hoi-an",
    name: "Đô thị cổ Hội An",
    shortName: "Đô thị cổ Hội An",
    province: "TP Đà Nẵng",
    type: "Di tích lịch sử và kiến trúc đô thị cổ",
    level: "Di sản Văn hóa Thế giới UNESCO & Di tích Quốc gia Đặc biệt",
    isUnesco: true,
    isNationalSpecial: true,
    unescoYear: 1999,
    nationalSpecialYear: 2009,
    period: "Thời kỳ hưng thịnh của thương cảng quốc tế thế kỷ XV – XIX",
    summary: "Thương cảng quốc tế truyền thống Đông Á được bảo tồn gần như nguyên vẹn với hơn 1.000 kiến trúc gỗ cổ, chùa Cầu và các hội quán bang phái.",
    history: "Hình thành từ cửa biển Đại Chiêm, Hội An phát triển rực rỡ từ thế kỷ XVI dưới sự bảo trợ của các chúa Nguyễn Đàng Trong. Nơi đây trở thành trạm trung chuyển sầm uất trên con đường tơ lụa và gốm sứ trên biển, quy tụ cộng đồng kiều dân Nhật Bản, Trung Hoa, châu Âu chung sống hòa hợp cùng cư dân bản địa Đại Việt.",
    value: "Minh chứng đặc biệt về sự hòa nhập các nền văn hóa qua các thời kỳ trong một thương cảng quốc tế; quần thể kiến trúc đô thị sống động bao gồm nhà ở dạng hình ống, hội quán thương mại, đền chùa và Chùa Cầu biểu tượng.",
    decision: "Được UNESCO ghi danh Di sản Văn hóa Thế giới ngày 04/12/1999; Quyết định số 1272/QĐ-TTg ngày 12/8/2009 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt.",
    lat: 15.8801,
    lng: 108.3380,
    coordinatesNote: "Tọa độ tham khảo tại khu vực phố Trần Phú - Chùa Cầu, không bao gồm toàn bộ vùng đệm bảo tồn.",
    territoryNote: "Khu vực đô thị cổ Hội An; địa danh trước sắp xếp thuộc tỉnh Quảng Nam; nay thuộc vùng phụ cận đô thị lớn miền Trung theo định hướng liên kết vùng Quốc hội quy định.",
    unescoDistinctionNote: "Khu phố cổ Hội An được UNESCO ghi danh Di sản Văn hóa Thế giới (1999) và xếp hạng Di tích Quốc gia Đặc biệt của Việt Nam.",
    badge: "UNESCO 1999 • QG Đặc biệt",
    featured: false,
    sources: [
      {
        name: "Hoi An Ancient Town #948",
        publisher: "Trung tâm Di sản Thế giới UNESCO",
        url: "https://whc.unesco.org/en/list/948"
      },
      {
        name: "Danh mục Di tích Quốc gia Đặc biệt",
        publisher: "Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch",
        url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
      }
    ]
  },
  {
    id: "den-thap-my-son",
    name: "Khu đền tháp Mỹ Sơn",
    shortName: "Thánh địa Mỹ Sơn",
    province: "TP Đà Nẵng",
    type: "Di tích khảo cổ và kiến trúc tôn giáo",
    level: "Di sản Văn hóa Thế giới UNESCO & Di tích Quốc gia Đặc biệt",
    isUnesco: true,
    isNationalSpecial: true,
    unescoYear: 1999,
    nationalSpecialYear: 2009,
    period: "Văn hóa Champa từ thế kỷ IV đến thế kỷ XIII",
    summary: "Thánh địa Ấn Độ giáo của vương quốc Champa cổ đại trong thung lũng khép kín, nổi tiếng với nghệ thuật xây gạch mài chập bí ẩn.",
    history: "Bắt đầu khởi dựng từ thế kỷ IV dưới triều vua Bhadravarman I, Mỹ Sơn là trung tâm cúng tế linh thiêng của các vị vua vương triều Champa dâng lên thần Shiva. Trải qua gần 10 thế kỷ liên tục xây dựng các cụm tháp (A, B, C, D, E, F, G, H), nơi đây phản ánh đỉnh cao tư tưởng tôn giáo và kỹ thuật xây gạch không mạch vữa lộ rõ của cư dân Chăm cổ.",
    value: "Bằng chứng độc nhất vô nhị về nền văn minh Champa cổ đã biến mất ở châu Á, lưu giữ kho tàng điêu khắc sa thạch tinh xảo miêu tả các vị thần Brahma, Vishnu, Shiva, Apsara và linh vật huyền thoại.",
    decision: "Được UNESCO ghi danh Di sản Văn hóa Thế giới ngày 04/12/1999; Quyết định số 1272/QĐ-TTg ngày 12/8/2009 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt.",
    lat: 15.7958,
    lng: 108.1248,
    coordinatesNote: "Tọa độ tham khảo tại trung tâm cụm tháp A và B, không đại diện cho phạm vi toàn bộ thung lũng bảo vệ.",
    territoryNote: "Xã Duy Phú, huyện Duy Xuyên (địa danh trước sắp xếp thuộc tỉnh Quảng Nam; nay thuộc vùng quy hoạch liên kết miền Trung).",
    unescoDistinctionNote: "Khu đền tháp Mỹ Sơn được UNESCO ghi danh Di sản Văn hóa Thế giới năm 1999 và là Di tích Quốc gia Đặc biệt.",
    badge: "UNESCO 1999 • QG Đặc biệt",
    featured: false,
    sources: [
      {
        name: "My Son Sanctuary #949",
        publisher: "Trung tâm Di sản Thế giới UNESCO",
        url: "https://whc.unesco.org/en/list/949"
      },
      {
        name: "Danh mục Di tích Quốc gia Đặc biệt",
        publisher: "Cục Di sản văn hóa",
        url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
      }
    ]
  },
  {
    id: "thanh-nha-ho",
    name: "Di tích lịch sử và kiến trúc Thành nhà Hồ",
    shortName: "Thành nhà Hồ",
    province: "Thanh Hóa",
    type: "Di tích lịch sử và kiến trúc quân sự cổ",
    level: "Di sản Văn hóa Thế giới UNESCO & Di tích Quốc gia Đặc biệt",
    isUnesco: true,
    isNationalSpecial: true,
    unescoYear: 2011,
    nationalSpecialYear: 2012,
    period: "Xây dựng năm 1397 dưới thời Hồ Quý Ly (cuối triều Trần sang nhà Hồ)",
    summary: "Tòa thành đá kỳ vĩ độc nhất vô nhị ở Đông Nam Á, được ghép bằng những khối đá vôi đồ sộ nặng hàng chục tấn hoàn thành chỉ trong 3 tháng.",
    history: "Mùa xuân năm 1397, Hồ Quý Ly cho xây dựng kinh thành Tây Đô tại vùng đất An Tôn (nay thuộc huyện Vĩnh Lộc, Thanh Hóa) nhằm chuẩn bị dời đô từ Thăng Long về phía nam. Công trình gồm Hoàng thành kiên cố với 4 cổng vòm cuốn bằng đá xanh, hào nước bao bọc và La Thành đắp bằng đất bảo vệ từ xa.",
    value: "Kỹ thuật đẽo gọt và ghép đá tảng lớn không vữa kết dính đạt độ chính xác phi thường, đại diện cho giai đoạn giao thoa chính trị - quân sự - tư tưởng Nho giáo cải cách cuối thế kỷ XIV - đầu thế kỷ XV tại Đại Việt.",
    decision: "Được UNESCO ghi danh là Di sản Văn hóa Thế giới ngày 27/6/2011; Quyết định số 1419/QĐ-TTg ngày 02/10/2012 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt.",
    lat: 20.0784,
    lng: 105.6062,
    coordinatesNote: "Tọa độ tham khảo tại Cổng Nam Thành nhà Hồ, không đại diện cho ranh giới La Thành và vùng đệm khảo cổ.",
    territoryNote: "Huyện Vĩnh Lộc, tỉnh Thanh Hóa.",
    unescoDistinctionNote: "Thành nhà Hồ được UNESCO ghi danh Di sản Văn hóa Thế giới (2011) và là Di tích Quốc gia Đặc biệt (2012).",
    badge: "UNESCO 2011 • QG Đặc biệt",
    featured: false,
    sources: [
      {
        name: "Citadel of the Ho Dynasty #1358",
        publisher: "Trung tâm Di sản Thế giới UNESCO",
        url: "https://whc.unesco.org/en/list/1358"
      },
      {
        name: "Danh mục Di tích Quốc gia Đặc biệt",
        publisher: "Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch",
        url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
      }
    ]
  },
  {
    id: "quan-the-danh-thang-trang-an",
    name: "Quần thể danh thắng Tràng An",
    shortName: "Danh thắng Tràng An",
    province: "Ninh Bình",
    type: "Di sản hỗn hợp Văn hóa và Danh lam thắng cảnh",
    level: "Di sản Thế giới Hỗn hợp UNESCO (Văn hóa & Thiên nhiên) & Di tích Quốc gia Đặc biệt",
    isUnesco: true,
    isNationalSpecial: true,
    unescoYear: 2014,
    nationalSpecialYear: 2012,
    period: "Dấu tích con người tiền sử cư trú hơn 30.000 năm; Kinh đô Hoa Lư thế kỷ X",
    summary: "Di sản thế giới hỗn hợp đầu tiên và duy nhất tại Đông Nam Á, kết hợp cảnh quan núi đá vôi karst ngập nước kỳ vĩ và trầm tích khảo cổ tiền sử.",
    history: "Tràng An nằm ở rìa phía nam của đồng bằng châu thổ sông Hồng. Trải qua hàng trăm triệu năm kiến tạo địa chất và các đợt biển tiến thoái, khu vực hình thành các thung lũng karst kín và hệ thống hang luồn xuyên thủy. Khảo cổ học tại các hang Mòi, hang Bói, hang Trống chứng minh con người tiền sử đã thích ứng bền vững với các biến đổi khí hậu khắc nghiệt qua hàng chục thiên niên kỷ. Sang thế kỷ X, nơi đây được vua Đinh Tiên Hoàng chọn làm kinh đô dựng nước Đại Cồ Việt.",
    value: "Giá trị ngoại hạng toàn cầu về địa mạo karst nhiệt đới ngập nước, cảnh quan thẩm mỹ hùng vĩ của những đỉnh núi đá vôi thẳng đứng soi bóng dòng sông Sao Khê, cùng bằng chứng khảo cổ tiền sử vô giá về sự tương tác của con người với tự nhiên.",
    decision: "Được UNESCO ghi danh là Di sản Thế giới Hỗn hợp ngày 23/6/2014 tại Doha (Qatar); Quyết định số 548/QĐ-TTg ngày 10/5/2012 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt.",
    lat: 20.2528,
    lng: 105.9080,
    coordinatesNote: "Tọa độ tham khảo tại bến thuyền Tràng An, không thể hiện ranh giới khoanh vùng bảo vệ rộng hơn 12.000 ha.",
    territoryNote: "Các huyện Hoa Lư, Gia Viễn, Nho Quan và TP Ninh Bình, tỉnh Ninh Bình.",
    unescoDistinctionNote: "Tràng An là di sản thế giới kép (vừa mang tiêu chí văn hóa vừa mang tiêu chí thiên nhiên) duy nhất ở Việt Nam tính đến nay, đồng thời thuộc danh mục Di tích Quốc gia Đặc biệt.",
    badge: "UNESCO Kép 2014 • QG Đặc biệt",
    featured: false,
    sources: [
      {
        name: "Trang An Landscape Complex #1438",
        publisher: "Trung tâm Di sản Thế giới UNESCO",
        url: "https://whc.unesco.org/en/list/1438"
      },
      {
        name: "Danh mục Di tích Quốc gia Đặc biệt",
        publisher: "Cục Di sản văn hóa",
        url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
      }
    ]
  },
  {
    id: "dinh-doc-lap",
    name: "Di tích lịch sử Dinh Độc Lập (Hội trường Thống Nhất)",
    shortName: "Dinh Độc Lập",
    province: "TP Hồ Chí Minh",
    type: "Di tích lịch sử và kiến trúc nghệ thuật",
    level: "Di tích Quốc gia Đặc biệt (Không thuộc Danh mục Di sản Thế giới UNESCO)",
    isUnesco: false,
    isNationalSpecial: true,
    nationalSpecialYear: 2009,
    period: "Khởi công xây mới năm 1962, khánh thành năm 1966; Dấu mốc lịch sử 30/4/1975",
    summary: "Dấu ấn lịch sử trọng đại của thời khắc thống nhất đất nước trưa ngày 30/4/1975, kiệt tác kiến trúc hiện đại hòa quyện triết lý phương Đông của KTS Ngô Viết Thụ.",
    history: "Được xây dựng trên nền Dinh Norodom thời thuộc địa Pháp. Năm 1962, công trình được xây dựng lại theo đồ án thiết kế của Kiến trúc sư Ngô Viết Thụ (người Việt Nam duy nhất đoạt giải Khôi nguyên La Mã). Vào hồi 11 giờ 30 phút ngày 30/4/1975, xe tăng số hiệu 390 và 843 của Quân Giải phóng húc tung cánh cổng sắt, cờ cách mạng bay trên nóc dinh, ghi dấu thắng lợi trọn vẹn của Chiến dịch Hồ Chí Minh lịch sử.",
    value: "Giá trị lịch sử dân tộc sâu sắc tượng trưng cho hòa bình, độc lập và toàn vẹn lãnh thổ; tác phẩm kiến trúc hiện đại đỉnh cao thế kỷ XX với bố cục hình chữ CÁT (吉), mặt tiền rèm hoa đá cách điệu các đốt trúc và các phòng khánh tiết nghi lễ trang nghiêm.",
    decision: "Quyết định số 1272/QĐ-TTg ngày 12/8/2009 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt (Đợt 1).",
    lat: 10.7770,
    lng: 106.6953,
    coordinatesNote: "Tọa độ tham khảo tại cổng chính số 135 Nam Kỳ Khởi Nghĩa, không đại diện cho toàn bộ khuôn viên ranh giới công viên bao quanh.",
    territoryNote: "Phường Bến Thành, Quận 1, TP Hồ Chí Minh.",
    unescoDistinctionNote: "Phân biệt cấp độ: Dinh Độc Lập là Di tích Quốc gia Đặc biệt của Việt Nam, không được UNESCO ghi danh là Di sản Thế giới.",
    badge: "Di tích Quốc gia Đặc biệt",
    featured: false,
    sources: [
      {
        name: "Hồ sơ Di tích lịch sử Dinh Độc Lập",
        publisher: "Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch",
        url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
      },
      {
        name: "Quyết định 1272/QĐ-TTg xếp hạng Di tích quốc gia đặc biệt đợt 1",
        publisher: "Cổng Thông tin điện tử Chính phủ",
        url: "https://cms.baochinhphu.vn/nghi-quyet-cua-quoc-hoi-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-102250612191145158.htm"
      }
    ]
  },
  {
    id: "den-hung",
    name: "Khu di tích lịch sử Đền Hùng",
    shortName: "Khu di tích Đền Hùng",
    province: "Phú Thọ",
    type: "Di tích lịch sử văn hóa",
    level: "Di tích Quốc gia Đặc biệt (Gắn liền Tín ngưỡng thờ cúng Hùng Vương - Di sản phi vật thể nhân loại)",
    isUnesco: false,
    isNationalSpecial: true,
    nationalSpecialYear: 2009,
    period: "Thời đại Hùng Vương dựng nước Văn Lang; xây dựng và tôn tạo liên tục từ triều Đinh, Tiền Lê, Lý, Trần, Hậu Lê đến Nguyễn",
    summary: "Không gian cội nguồn thiêng liêng của dân tộc Việt Nam trên núi Nghĩa Lĩnh, trung tâm thực hành tín ngưỡng thờ cúng tổ tiên và biểu tượng đại đoàn kết dân tộc.",
    history: "Tọa lạc trên núi Nghĩa Lĩnh (núi Hùng), thuộc đất Phong Châu xưa - kinh đô của nhà nước Văn Lang thời các Vua Hùng dựng nước. Quần thể gồm Đền Hạ, Đền Trung, Đền Thượng, Lăng Hùng Vương, Đền Giếng và Đền Mẫu Âu Cơ. Hàng năm vào ngày mùng 10 tháng 3 âm lịch, ngày Quốc giỗ Giỗ Tổ Hùng Vương được tổ chức trọng thể tại đây.",
    value: "Giá trị văn hóa tinh thần tối cao quy tụ tâm thức dân tộc hướng về cội nguồn 'Uống nước nhớ nguồn', gắn liền với truyền thuyết bọc trăm trứng mẹ Âu Cơ - cha Lạc Long Quân và lòng tự hào giống nòi Lạc Hồng.",
    decision: "Quyết định số 1272/QĐ-TTg ngày 12/8/2009 của Thủ tướng Chính phủ xếp hạng Di tích quốc gia đặc biệt (Đợt 1).",
    lat: 21.3976,
    lng: 105.3283,
    coordinatesNote: "Tọa độ tham khảo tại khu vực Đền Thượng trên đỉnh núi Nghĩa Lĩnh, không đại diện cho toàn bộ vùng đệm bảo vệ rừng quốc gia Đền Hùng.",
    territoryNote: "Xã Hy Cương, TP Việt Trì, tỉnh Phú Thọ.",
    unescoDistinctionNote: "Phân biệt chuẩn xác: Quần thể công trình kiến trúc Đền Hùng là Di tích Quốc gia Đặc biệt (xếp hạng 2009); 'Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ' được UNESCO ghi danh vào Danh mục Di sản văn hóa phi vật thể đại diện của nhân loại (năm 2012). Không đồng nhất công trình di tích vật thể với danh hiệu UNESCO phi vật thể.",
    badge: "QG Đặc biệt • UNESCO Phi vật thể",
    featured: false,
    sources: [
      {
        name: "Hồ sơ Khu di tích lịch sử Đền Hùng",
        publisher: "Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch",
        url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
      },
      {
        name: "Tín ngưỡng thờ cúng Hùng Vương tại Phú Thọ",
        publisher: "UNESCO Intangible Cultural Heritage",
        url: "https://ich.unesco.org/en/RL/ancestor-worship-of-the-hung-kings-in-phu-tho-00735"
      }
    ]
  }
];

export const OFFICIAL_REFERENCES = [
  {
    id: "ref-unesco",
    name: "Danh sách Di sản Thế giới tại Việt Nam (World Heritage List - Viet Nam)",
    organization: "Trung tâm Di sản Thế giới UNESCO (UNESCO World Heritage Centre)",
    description: "Cơ sở dữ liệu chính thức và các tài liệu nghị quyết công nhận di sản văn hóa và thiên nhiên thế giới của UNESCO.",
    url: "https://whc.unesco.org/en/statesparties/vn"
  },
  {
    id: "ref-dsvh-national",
    name: "Hệ thống Danh mục Di tích Quốc gia Đặc biệt Việt Nam",
    organization: "Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch",
    description: "Cơ sở dữ liệu phân loại, hồ sơ khoa học và các quyết định của Thủ tướng Chính phủ về xếp hạng di tích quốc gia đặc biệt.",
    url: "https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752"
  },
  {
    id: "ref-chinhphu-administrative",
    name: "Nghị quyết của Quốc hội về việc sắp xếp, thành lập đơn vị hành chính cấp tỉnh",
    organization: "Cổng Thông tin điện tử Chính phủ nước CHXHCN Việt Nam",
    description: "Văn bản chính thức của Quốc hội về việc điều chỉnh, sắp xếp và quy hoạch các đơn vị hành chính cấp tỉnh từ năm 2025.",
    url: "https://cms.baochinhphu.vn/nghi-quyet-cua-quoc-hoi-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-102250612191145158.htm"
  },
  {
    id: "ref-hue-centrally-governed",
    name: "Thành lập Thành phố Huế trực thuộc Trung ương từ ngày 01/01/2025",
    organization: "Chuyên trang Xây dựng chính sách - Cổng Thông tin điện tử Chính phủ",
    description: "Nghị quyết số 175/2024/QH15 của Quốc hội về thành lập Thành phố Huế trực thuộc Trung ương.",
    url: "https://xaydungchinhsach.chinhphu.vn/thanh-lap-thanh-pho-hue-truc-thuoc-trung-uong-tu-1-1-2025-119241130091551714.htm"
  },
  {
    id: "ref-dsvh-vanmieu",
    name: "Hồ sơ di tích lịch sử và kiến trúc nghệ thuật Văn Miếu – Quốc Tử Giám",
    organization: "Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch",
    description: "Tư liệu nghiên cứu lịch sử hình thành, kiến trúc, 82 bia tiến sĩ và quyết định xếp hạng số 548/QĐ-TTg của Thủ tướng Chính phủ.",
    url: "https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953"
  },
  {
    id: "ref-unesco-hung-king",
    name: "Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ (Di sản Văn hóa Phi vật thể)",
    organization: "UNESCO Intangible Cultural Heritage",
    description: "Hồ sơ ghi danh di sản văn hóa phi vật thể đại diện của nhân loại năm 2012 của UNESCO cho tín ngưỡng thờ cúng Hùng Vương.",
    url: "https://ich.unesco.org/en/RL/ancestor-worship-of-the-hung-kings-in-phu-tho-00735"
  }
];

export const PROJECT_INFO = {
  appName: "DiTichSo",
  projectCode: "A01",
  projectName: "Bản đồ số di tích lịch sử, văn hóa Việt Nam",
  slogan: "Chạm vào bản đồ. Chạm tới lịch sử.",
  authorName: "Trần Mạnh Trường",
  studentId: "PH59448",
  group: "Nhóm 1",
  ideaCode: "A01",
  program: "Chương trình Thực tập sinh Đợt 15 FPT Polytechnic × IMTA TECH",
  targetAudience: "Sinh viên, học sinh, giáo viên, người dân và du khách muốn tìm hiểu giá trị di sản Việt Nam",
  projectMission: "Dự án cộng đồng giáo dục phi lợi nhuận, không quảng cáo, không thu phí, không yêu cầu đăng nhập. Tập trung vào tính minh bạch, chính xác và phân biệt rõ các cấp độ xếp hạng di sản.",
  plannedDomain: "ditichso.ai.studio"
};

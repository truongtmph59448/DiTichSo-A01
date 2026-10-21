import express, { Request, Response } from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '100kb' }));

// Simple in-memory rate limiter: max 15 requests per minute per IP
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimits = new Map<string, RateLimitRecord>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimits.get(ip);
  if (!record || now > record.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return true;
  }
  if (record.count >= 15) {
    return false;
  }
  record.count += 1;
  return true;
}

// Server-side verified knowledge base for grounding Gemini
const VERIFIED_KNOWLEDGE_CONTEXT = `
DƯỚI ĐÂY LÀ TOÀN BỘ CƠ SỞ DỮ LIỆU ĐƯỢC KIỂM CHỨNG CỦA DỰ ÁN DITICHSO:

1. Hoàng thành Thăng Long – Hà Nội:
- Niên đại: Khởi dựng từ thế kỷ XI (năm 1010 khi vua Lý Thái Tổ dời đô về Thăng Long) qua các triều Lý, Trần, Lê, Mạc, Nguyễn đến thời hiện đại (Tổng hành dinh QĐND Việt Nam D67).
- Phân loại: Di tích lịch sử và khảo cổ.
- Cấp độ xếp hạng: Được xếp hạng Di tích quốc gia đặc biệt theo Quyết định số 1272/QĐ-TTg ngày 12/8/2009 của Thủ tướng Chính phủ; Được UNESCO ghi danh là Di sản Văn hóa Thế giới ngày 01/8/2010.
- Giá trị: Trung tâm quyền lực chính trị liên tục hơn 10 thế kỷ, giao thoa văn hóa Đông Á và sông Hồng.
- Nguồn: https://whc.unesco.org/en/list/1328 (UNESCO), https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752 (Cục Di sản văn hóa).

2. Văn Miếu – Quốc Tử Giám – Hà Nội:
- Niên đại: Văn Miếu lập năm 1070 (thời vua Lý Thánh Tông); Quốc Tử Giám lập năm 1076 (thời vua Lý Nhân Tông). Bia tiến sĩ khởi dựng từ năm 1484 dưới thời vua Lê Thánh Tông.
- Phân loại: Di tích lịch sử và kiến trúc nghệ thuật.
- Cấp độ xếp hạng: Xếp hạng Di tích quốc gia đặc biệt theo Quyết định số 548/QĐ-TTg ngày 10/5/2012 của Thủ tướng Chính phủ.
- Lưu ý phân biệt: Quần thể di tích được xếp hạng Di tích Quốc gia Đặc biệt; 82 tấm Bia Tiến sĩ tại đây được UNESCO ghi danh là Di sản tư liệu thế giới thuộc Chương trình Ký ức Thế giới (năm 2011). Bản thân quần thể không phải là Di sản văn hóa thế giới.
- Giá trị: Trường đại học đầu tiên của Việt Nam, biểu tượng văn hiến và tinh thần tôn sư trọng đạo.
- Nguồn: https://dsvh.gov.vn/di-tich-lich-su-va-kien-truc-nghe-thuat-van-mieu-quoc-tu-giam-2953 (Cục Di sản văn hóa).

3. Quần thể di tích Cố đô Huế:
- Niên đại: Triều Nguyễn (1802 – 1945), kinh đô thống nhất thời Gia Long, Minh Mạng...
- Địa phương: Thành phố Huế (trực thuộc Trung ương từ ngày 01/01/2025 theo Nghị quyết số 175/2024/QH15 của Quốc hội).
- Phân loại: Di tích lịch sử và kiến trúc nghệ thuật.
- Cấp độ xếp hạng: Được UNESCO ghi danh là Di sản Văn hóa Thế giới ngày 11/12/1993; Di tích quốc gia đặc biệt theo Quyết định số 1272/QĐ-TTg ngày 12/8/2009.
- Giá trị: Kinh đô phong kiến cuối cùng, kiến trúc cung đình và lăng tẩm hòa quyện cảnh quan phong thủy núi Ngự - sông Hương.
- Nguồn: https://whc.unesco.org/en/list/678 (UNESCO), https://xaydungchinhsach.chinhphu.vn/thanh-lap-thanh-pho-hue-truc-thuoc-trung-uong-tu-1-1-2025-119241130091551714.htm (Cổng TTĐT Chính phủ).

4. Đô thị cổ Hội An:
- Niên đại: Thương cảng quốc tế sầm uất thế kỷ XV – XIX.
- Địa phương: TP Đà Nẵng (Lưu ý: địa danh trước sắp xếp hành chính thuộc tỉnh Quảng Nam; nay thuộc vùng quy hoạch đô thị trung tâm miền Trung).
- Phân loại: Di tích lịch sử và kiến trúc đô thị cổ.
- Cấp độ xếp hạng: Được UNESCO ghi danh Di sản Văn hóa Thế giới năm 1999; Di tích quốc gia đặc biệt theo Quyết định số 1272/QĐ-TTg năm 2009.
- Giá trị: Bảo tồn nguyên vẹn quần thể hơn 1.000 di tích nhà cổ, hội quán, Chùa Cầu biểu tượng thương cảng truyền thống châu Á.
- Nguồn: https://whc.unesco.org/en/list/948 (UNESCO).

5. Khu đền tháp Mỹ Sơn:
- Niên đại: Văn hóa Champa từ thế kỷ IV đến thế kỷ XIII (khởi nguồn từ vua Bhadravarman).
- Địa phương: TP Đà Nẵng (địa danh trước sắp xếp thuộc tỉnh Quảng Nam).
- Phân loại: Di tích khảo cổ và kiến trúc tôn giáo.
- Cấp độ xếp hạng: Được UNESCO ghi danh Di sản Văn hóa Thế giới năm 1999; Di tích quốc gia đặc biệt theo Quyết định 1272/QĐ-TTg năm 2009.
- Giá trị: Thánh địa Ấn Độ giáo của vương quốc Champa cổ, kỹ thuật xây gạch mài chập không vữa lộ rõ.
- Nguồn: https://whc.unesco.org/en/list/949 (UNESCO).

6. Thành nhà Hồ – Thanh Hóa:
- Niên đại: Xây dựng năm 1397 dưới thời Hồ Quý Ly (cuối Trần đầu Hồ).
- Phân loại: Di tích lịch sử và kiến trúc quân sự cổ.
- Cấp độ xếp hạng: Được UNESCO ghi danh Di sản Văn hóa Thế giới năm 2011; Di tích quốc gia đặc biệt năm 2012 (QĐ 1419/QĐ-TTg).
- Giá trị: Thành đá đồ sộ bằng các phiến đá vôi lớn nặng hàng chục tấn ghép khít không vữa duy nhất ở Đông Nam Á.
- Nguồn: https://whc.unesco.org/en/list/1358 (UNESCO).

7. Quần thể danh thắng Tràng An – Ninh Bình:
- Niên đại: Dấu tích con người tiền sử cư trú hơn 30.000 năm; gắn liền kinh đô Hoa Lư thế kỷ X thời Đinh - Tiền Lê.
- Phân loại: Di sản hỗn hợp Văn hóa và Danh lam thắng cảnh.
- Cấp độ xếp hạng: Được UNESCO ghi danh là Di sản Thế giới Hỗn hợp (Văn hóa & Thiên nhiên) năm 2014; Di tích quốc gia đặc biệt năm 2012 (QĐ 548/QĐ-TTg).
- Giá trị: Di sản kép đầu tiên và duy nhất ở Đông Nam Á, địa mạo karst nhiệt đới ngập nước và chứng tích khảo cổ thích ứng biến đổi khí hậu.
- Nguồn: https://whc.unesco.org/en/list/1438 (UNESCO).

8. Dinh Độc Lập – TP Hồ Chí Minh:
- Niên đại: Xây dựng lại 1962–1966 theo thiết kế của KTS Ngô Viết Thụ; Dấu mốc lịch sử trưa ngày 30/4/1975 kết thúc cuộc kháng chiến giải phóng dân tộc.
- Phân loại: Di tích lịch sử và kiến trúc nghệ thuật.
- Cấp độ xếp hạng: Di tích Quốc gia Đặc biệt theo Quyết định số 1272/QĐ-TTg ngày 12/8/2009.
- Lưu ý phân biệt: Dinh Độc Lập KHÔNG nằm trong danh mục Di sản Thế giới của UNESCO.
- Giá trị: Biểu tượng chiến thắng lịch sử 30/4/1975, kiệt tác kiến trúc hiện đại hòa quyện triết lý phương Đông.
- Nguồn: https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752 (Cục Di sản văn hóa).

9. Khu di tích lịch sử Đền Hùng – Phú Thọ:
- Niên đại: Khởi nguồn từ thời các Vua Hùng dựng nước Văn Lang trên núi Nghĩa Lĩnh; liên tục trùng tu qua các triều đại.
- Phân loại: Di tích lịch sử văn hóa.
- Cấp độ xếp hạng: Di tích Quốc gia Đặc biệt theo Quyết định số 1272/QĐ-TTg ngày 12/8/2009.
- Lưu ý phân biệt: Quần thể công trình kiến trúc Đền Hùng là Di tích Quốc gia Đặc biệt; 'Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ' được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại năm 2012. Không được đồng nhất di tích vật thể với di sản thế giới vật thể.
- Giá trị: Không gian cội nguồn thiêng liêng của toàn thể dân tộc Việt Nam, biểu tượng đại đoàn kết dân tộc và đạo lý 'Uống nước nhớ nguồn'.
- Nguồn: https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752, https://ich.unesco.org/en/RL/ancestor-worship-of-the-hung-kings-in-phu-tho-00735 (UNESCO).

DANH MỤC NGUỒN CHÍNH THỐNG:
- Trung tâm Di sản Thế giới UNESCO: https://whc.unesco.org/en/statesparties/vn
- Cục Di sản văn hóa (Bộ VHTTDL): https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752
- Cổng Thông tin điện tử Chính phủ: https://cms.baochinhphu.vn/nghi-quyet-cua-quoc-hoi-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-102250612191145158.htm
- Xây dựng chính sách - Cổng TTĐT Chính phủ (TP Huế trực thuộc TW từ 2025): https://xaydungchinhsach.chinhphu.vn/thanh-lap-thanh-pho-hue-truc-thuoc-trung-uong-tu-1-1-2025-119241130091551714.htm
`;

// API Ask endpoint
app.post('/api/ask', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      error: 'Bạn đang gửi câu hỏi quá nhanh. Vui lòng đợi ít phút trước khi thử lại.'
    });
    return;
  }

  const { question } = req.body || {};

  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'Câu hỏi không hợp lệ.' });
    return;
  }

  const trimmedQuestion = question.trim();
  if (trimmedQuestion.length < 2) {
    res.status(400).json({ error: 'Câu hỏi quá ngắn. Vui lòng nhập chi tiết hơn.' });
    return;
  }

  if (trimmedQuestion.length > 600) {
    res.status(400).json({ error: 'Câu hỏi vượt quá giới hạn 600 ký tự cho phép.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    res.status(503).json({
      error: 'Máy chủ chưa được thiết lập khóa GEMINI_API_KEY trong mục Secrets của AI Studio. Vui lòng cấu hình khóa API để kích hoạt Trợ lý Di sản.'
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemInstruction = `
Bạn là Trợ lý Di sản DiTichSo thuộc dự án cộng đồng giáo dục A01 "Bản đồ số di tích lịch sử, văn hóa Việt Nam".
Nhiệm vụ của bạn là giải đáp thắc mắc cho học sinh, sinh viên, giáo viên, người dân và du khách.

QUY TẮC BẮT BUỘC KHI TRẢ LỜI:
1. NGUYÊN TẮC CHÍNH XÁC: Chỉ phân tích và giải đáp dựa trên dữ liệu các di tích đã được kiểm chứng dưới đây. Không bao giờ đưa ra thông tin không có căn cứ.
2. NGUYÊN TẮC PHÂN BIỆT RÕ RÀNG:
   - Phân biệt rõ giữa Di sản Thế giới do UNESCO ghi danh (chỉ có: Hoàng thành Thăng Long, Cố đô Huế, Đô thị cổ Hội An, Thánh địa Mỹ Sơn, Thành nhà Hồ, Danh thắng Tràng An) và Di tích Quốc gia Đặc biệt của Việt Nam.
   - Tuyệt đối không đồng nhất hai khái niệm này.
   - Lưu ý đặc biệt: Dinh Độc Lập là Di tích Quốc gia Đặc biệt, KHÔNG phải Di sản Thế giới UNESCO.
   - Văn Miếu - Quốc Tử Giám: bản thân quần thể là Di tích Quốc gia Đặc biệt, chỉ có 82 Bia Tiến sĩ là Di sản tư liệu thế giới thuộc Chương trình Ký ức Thế giới của UNESCO.
   - Đền Hùng: bản thân di tích là Di tích Quốc gia Đặc biệt, "Tín ngưỡng thờ cúng Hùng Vương" là Di sản phi vật thể nhân loại.
   - Cập nhật địa giới: Thành phố Huế trở thành Thành phố trực thuộc Trung ương từ ngày 01/01/2025 theo Nghị quyết của Quốc hội.
3. KHI THIẾU THÔNG TIN: Nếu câu hỏi hỏi về di tích ngoài danh sách đã kiểm chứng hoặc thông tin không có tài liệu xác thực, bạn PHẢI nói rõ: "Chưa đủ dữ liệu để khẳng định" và giải thích phạm vi dữ liệu đã kiểm chứng hiện có. Tuyệt đối không tự suy diễn hoặc bịa đặt niên đại, văn bản quyết định.
4. DẪN NGUỒN: Cuối câu trả lời, hãy luôn trích dẫn tên nguồn chính thống kèm đường dẫn URL chính thức (ví dụ: UNESCO: https://whc.unesco.org, Cục Di sản văn hóa: https://dsvh.gov.vn...).
5. ĐỊNH DẠNG: Trả lời bằng văn bản thuần phong nhã, mạch lạc, dễ hiểu. KHÔNG chèn thẻ HTML do AI tạo.

DỮ LIỆU ĐƯỢC KIỂM CHỨNG:
${VERIFIED_KNOWLEDGE_CONTEXT}
`;

    // Use gemini-3.1-flash-lite for fast, high-quality, grounded responses
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: trimmedQuestion,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2
        }
      });
    } catch (modelErr: any) {
      console.warn('Fallback to gemini-3.8-flash due to:', modelErr?.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: trimmedQuestion,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2
        }
      });
    }

    const answerText = response.text || 'Chưa đủ dữ liệu để khẳng định câu trả lời cho nội dung này.';
    res.json({ answer: answerText });
  } catch (error: any) {
    // Avoid exposing raw API keys or internal stack traces
    if (error?.status === 429) {
      res.status(429).json({
        error: 'Hệ thống AI đang quá tải hoặc đã đạt hạn mức yêu cầu. Vui lòng thử lại sau vài giây.'
      });
    } else if (error?.status === 403 || error?.status === 401) {
      res.status(403).json({
        error: 'Khóa API Gemini không hợp lệ hoặc không có quyền truy cập. Vui lòng kiểm tra lại cấu hình trong AI Studio.'
      });
    } else {
      res.status(500).json({
        error: 'Đã xảy ra lỗi trong quá trình xử lý câu hỏi với Trợ lý Di sản. Vui lòng thử lại.'
      });
    }
  }
});

// Setup Vite development middleware or production static files
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DiTichSo server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

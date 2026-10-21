import React from 'react';
import { 
  MapPin, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Landmark, 
  Layers, 
  FileCheck2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { MONUMENTS_DATA, Monument, PROJECT_INFO } from '../data/monuments';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onSelectMonument: (monument: Monument) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectMonument
}) => {
  const featuredMonuments = MONUMENTS_DATA.filter(m => m.featured);

  // Exact statistics calculated from verified dataset
  const totalMonuments = MONUMENTS_DATA.length;
  const unescoCount = MONUMENTS_DATA.filter(m => m.isUnesco).length;
  const nationalSpecialCount = MONUMENTS_DATA.filter(m => m.isNationalSpecial).length;
  const provincesCount = new Set(MONUMENTS_DATA.map(m => m.province)).size;

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#153D35] via-[#1A4B41] to-[#0F2D27] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-[#B97249]/30">
        {/* Subtle Graphic Motifs (Temple & Heritage Lines) */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
          <svg className="w-96 h-96 text-white" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 10 L160 60 L140 60 L140 180 L60 180 L60 60 L40 60 Z" />
            <circle cx="100" cy="110" r="25" />
            <path d="M10 65 L190 65 L180 80 L20 80 Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-[#EADBC8] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse"></span>
            <span>Dự án cộng đồng {PROJECT_INFO.projectCode} • FPT Polytechnic × IMTA TECH</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Chạm vào bản đồ. <br />
              <span className="text-[#EADBC8] bg-clip-text">Chạm tới lịch sử.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#FAF7F2]/85 leading-relaxed font-normal max-w-2xl">
              Nền tảng số hóa bản đồ các di tích lịch sử, văn hóa Việt Nam đã được xếp hạng. 
              Cung cấp kiến thức chính xác, minh bạch, phân biệt rõ Di sản Thế giới UNESCO và Di tích Quốc gia Đặc biệt.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('map')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#B97249] hover:bg-[#9A5A35] text-white font-semibold text-sm transition-all shadow-lg shadow-[#B97249]/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MapPin className="w-5 h-5" />
              <span>Mở Bản đồ di sản</span>
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F2] font-semibold text-sm transition-all border border-white/20"
            >
              <Compass className="w-5 h-5 text-[#C89B3C]" />
              <span>Khám phá danh sách ({totalMonuments})</span>
            </button>

            <button
              onClick={() => onNavigate('gemini')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#C89B3C]/20 hover:bg-[#C89B3C]/30 text-[#EADBC8] font-semibold text-sm transition-all border border-[#C89B3C]/40"
            >
              <Sparkles className="w-5 h-5 text-[#C89B3C]" />
              <span>Hỏi Trợ lý Gemini</span>
            </button>
          </div>

          {/* Key Integrity Attributes */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#FAF7F2]/75">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
              <span>Dữ liệu nguồn kiểm chứng</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
              <span>Không quảng cáo / Thu phí</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
              <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
              <span>Không yêu cầu đăng nhập</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accurate Statistics Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs">
          <div className="flex items-center justify-between text-[#153D35] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Di tích chuẩn hóa</span>
            <Landmark className="w-5 h-5 text-[#153D35]" />
          </div>
          <div className="text-3xl font-extrabold text-[#153D35]">{totalMonuments}</div>
          <p className="text-xs text-gray-600 mt-1">Hồ sơ di tích đợt 1 kiểm chứng</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs">
          <div className="flex items-center justify-between text-[#B97249] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">UNESCO Ghi danh</span>
            <Award className="w-5 h-5 text-[#B97249]" />
          </div>
          <div className="text-3xl font-extrabold text-[#B97249]">{unescoCount}</div>
          <p className="text-xs text-gray-600 mt-1">Di sản Văn hóa & Hỗn hợp thế giới</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs">
          <div className="flex items-center justify-between text-[#C89B3C] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">QG Đặc biệt</span>
            <FileCheck2 className="w-5 h-5 text-[#C89B3C]" />
          </div>
          <div className="text-3xl font-extrabold text-[#153D35]">{nationalSpecialCount}</div>
          <p className="text-xs text-gray-600 mt-1">Xếp hạng theo Quyết định của TTg</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs">
          <div className="flex items-center justify-between text-[#1E5247] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Địa phương</span>
            <Layers className="w-5 h-5 text-[#1E5247]" />
          </div>
          <div className="text-3xl font-extrabold text-[#153D35]">{provincesCount}</div>
          <p className="text-xs text-gray-600 mt-1">Tỉnh/thành phố khắp 3 miền</p>
        </div>
      </section>

      {/* 3 Featured Monuments Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5DFD4] pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#153D35] tracking-tight flex items-center gap-2">
              <Award className="w-6 h-6 text-[#B97249]" />
              3 Di tích nổi bật tiêu biểu
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Những biểu tượng nghìn năm văn hiến và dấu ấn lịch sử hào hùng của dân tộc Việt Nam.
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-[#B97249] hover:text-[#9A5A35] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Xem toàn bộ 9 di tích</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredMonuments.map((monument) => (
            <div
              key={monument.id}
              className="flex flex-col rounded-2xl bg-white border border-[#E5DFD4] hover:border-[#B97249]/60 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden group"
            >
              {/* Graphic Emblem Banner */}
              <div className="h-32 bg-gradient-to-br from-[#153D35] to-[#1E5247] p-5 flex flex-col justify-between text-white relative overflow-hidden">
                {/* Cultural motif */}
                <div className="absolute -right-4 -bottom-4 text-white/10 group-hover:text-white/15 transition-colors">
                  <svg className="w-28 h-28" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
                    <polygon points="50,15 61,38 85,38 66,54 73,78 50,62 27,78 34,54 15,38 39,38" />
                  </svg>
                </div>

                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#B97249] text-white">
                    {monument.badge}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white">
                    {monument.province}
                  </span>
                </div>

                <div className="z-10">
                  <h3 className="font-bold text-lg leading-tight text-white group-hover:text-[#EADBC8] transition-colors line-clamp-1">
                    {monument.shortName}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 line-clamp-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B97249]" />
                    <span>{monument.period}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-3">
                    {monument.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectMonument(monument)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#B97249] text-[#153D35] hover:text-white font-semibold text-xs border border-[#E5DFD4] hover:border-[#B97249] transition-all"
                  >
                    <span>Xem hồ sơ chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gemini AI Assistant Teaser */}
      <section className="rounded-2xl bg-gradient-to-r from-[#FAF1E6] to-[#F2EDE4] border border-[#B97249]/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153D35] text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Trợ lý Gemini Di tích số</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#153D35] tracking-tight">
            Tra cứu thông minh từ cơ sở dữ liệu đã kiểm chứng
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Hỏi đáp trực tiếp với mô hình Gemini được kết nối an toàn qua máy chủ. Trợ lý cam kết chỉ phân tích dựa trên dữ liệu di tích trong dự án, luôn dẫn nguồn chính thống và trả lời "Chưa đủ dữ liệu để khẳng định" nếu chưa có bằng chứng kiểm chứng.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate('gemini')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#153D35] hover:bg-[#1E5247] text-white font-semibold text-sm transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#C89B3C]" />
            <span>Trải nghiệm Trợ lý Gemini</span>
          </button>
        </div>
      </section>

      {/* Educational & Scientific Statement */}
      <section className="rounded-2xl bg-white border border-[#E5DFD4] p-5 sm:p-6 text-xs text-gray-600 space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#153D35] text-sm">
          <BookOpen className="w-4 h-4 text-[#B97249]" />
          <span>Nguyên tắc khoa học và trách nhiệm dữ liệu di sản</span>
        </div>
        <p className="leading-relaxed">
          DiTichSo thực hiện nghiêm túc việc phân biệt rõ giữa danh hiệu Di sản Thế giới do UNESCO ghi danh và xếp hạng Di tích Quốc gia Đặc biệt của Nhà nước Việt Nam. Tuyệt đối không tùy tiện gán ghép danh hiệu, không sử dụng ảnh giả tạo AI để quảng cáo làm sai lệch giá trị lịch sử và bảo tồn.
        </p>
      </section>
    </div>
  );
};

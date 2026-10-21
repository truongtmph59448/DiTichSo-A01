import React from 'react';
import { 
  Info, 
  User, 
  GraduationCap, 
  Users, 
  Code2, 
  Globe, 
  HeartHandshake, 
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { PROJECT_INFO } from '../data/monuments';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Title */}
      <div className="border-b border-[#E5DFD4] pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#153D35] tracking-tight flex items-center gap-2">
          <Info className="w-6 h-6 text-[#B97249]" />
          <span>Giới thiệu Đề tài & Tác giả</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Thông tin chi tiết về dự án tốt nghiệp thực tập và cam kết trách nhiệm cộng đồng.
        </p>
      </div>

      {/* Primary Project Profile Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#153D35] to-[#1E5247] text-white p-6 sm:p-8 shadow-xl border border-[#B97249]/30 relative overflow-hidden">
        {/* Cultural Background Graphic */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
          <svg className="w-80 h-80 text-white" viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="4" fill="none" />
            <polygon points="100,20 115,70 170,70 125,105 140,160 100,125 60,160 75,105 30,70 85,70" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B97249] text-white text-xs font-bold shadow-xs">
            <Award className="w-4 h-4" />
            <span>Mã đề tài: {PROJECT_INFO.projectCode} • Nhóm 1</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {PROJECT_INFO.appName}
            </h2>
            <p className="text-base sm:text-lg text-[#EADBC8] font-medium">
              {PROJECT_INFO.projectName}
            </p>
            <p className="text-xs sm:text-sm text-white/80 italic">
              "{PROJECT_INFO.slogan}"
            </p>
          </div>

          <div className="pt-2 text-xs sm:text-sm text-white/90 leading-relaxed font-light">
            {PROJECT_INFO.program}
          </div>
        </div>
      </div>

      {/* Author & Student Details (Exact specifications) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#153D35] flex items-center gap-2 border-b border-gray-100 pb-2.5">
            <User className="w-5 h-5 text-[#B97249]" />
            <span>Hồ sơ Sinh viên thực hiện</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Họ và tên:</span>
              <span className="font-bold text-[#153D35] text-base">{PROJECT_INFO.authorName}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Mã sinh viên:</span>
              <span className="font-mono font-bold text-[#B97249] text-base">{PROJECT_INFO.studentId}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Phân nhóm:</span>
              <span className="font-semibold text-gray-800">{PROJECT_INFO.group}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Mã ý tưởng:</span>
              <span className="font-semibold text-gray-800">{PROJECT_INFO.ideaCode}</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-gray-500 font-medium">Tên miền dự kiến:</span>
              <span className="font-mono font-semibold text-[#153D35] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E5DFD4]">
                {PROJECT_INFO.plannedDomain}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#153D35] flex items-center gap-2 border-b border-gray-100 pb-2.5">
            <GraduationCap className="w-5 h-5 text-[#B97249]" />
            <span>Đơn vị phối hợp & Chương trình</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p>
              <strong>Chương trình:</strong> Thực tập sinh Đợt 15 (Chuyên ngành Công nghệ thông tin / Ứng dụng phần mềm).
            </p>
            <p>
              <strong>Đơn vị đào tạo & Hướng dẫn:</strong> Trường Cao đẳng FPT Polytechnic phối hợp cùng Doanh nghiệp công nghệ IMTA TECH.
            </p>
            <p>
              <strong>Mục tiêu đào tạo:</strong> Rèn luyện tác phong kỹ sư phần mềm chuyên nghiệp, làm chủ kiến trúc full-stack React / Node.js, tích hợp trí tuệ nhân tạo Gemini bảo mật và phụng sự cộng đồng.
            </p>
          </div>
        </div>
      </div>

      {/* Community & Non-profit Mission */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs space-y-4">
        <h3 className="font-bold text-base text-[#153D35] flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#B97249]" />
          <span>Mục tiêu và Tôn chỉ Sản phẩm Cộng đồng</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD4] space-y-1.5">
            <div className="font-bold text-sm text-[#153D35] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>100% Phi lợi nhuận</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Không gắn banner quảng cáo, không thương mại hóa dữ liệu và không thu bất kỳ chi phí nào từ người dùng.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD4] space-y-1.5">
            <div className="font-bold text-sm text-[#153D35] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Tiếp cận mở</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Không bắt buộc đăng nhập tài khoản. Mọi học sinh, sinh viên, giáo viên và du khách đều có thể tra cứu tức thì.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD4] space-y-1.5">
            <div className="font-bold text-sm text-[#153D35] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Tôn trọng tính lịch sử</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tuyệt đối không sử dụng ảnh giả tạo AI hay thông tin bịa đặt. Luôn trích dẫn văn bản pháp lý chính thống.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

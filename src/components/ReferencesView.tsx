import React from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Building2, 
  Globe2, 
  FileText 
} from 'lucide-react';
import { OFFICIAL_REFERENCES } from '../data/monuments';

export const ReferencesView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Title */}
      <div className="border-b border-[#E5DFD4] pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#153D35] tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#B97249]" />
          <span>Nguồn Tham khảo & Văn bản Pháp lý Chính thống</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Danh mục các cổng thông tin, cơ sở dữ liệu và văn bản quy phạm pháp luật được sử dụng để kiểm chứng thông tin cho ứng dụng DiTichSo.
        </p>
      </div>

      {/* Assurance banner */}
      <div className="p-4 rounded-2xl bg-[#FAF1E6] border border-[#B97249]/30 text-xs text-[#7D3F1E] flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-[#B97249] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold uppercase tracking-wider text-[11px] block text-[#9A5A35]">
            Cam kết minh bạch học thuật & Không xuyên tạc:
          </span>
          <p className="leading-relaxed">
            Mọi hồ sơ di tích trong dự án DiTichSo đều được tra cứu đối chiếu từ các nguồn chính thống có tư cách pháp nhân quốc tế và cấp Nhà nước. Tuyệt đối không trích dẫn nguồn diễn đàn, blog cá nhân chưa kiểm chứng.
          </p>
        </div>
      </div>

      {/* List of Official Sources */}
      <div className="space-y-3.5">
        {OFFICIAL_REFERENCES.map((ref, idx) => (
          <div
            key={ref.id}
            className="p-5 rounded-2xl bg-white border border-[#E5DFD4] hover:border-[#B97249] shadow-xs hover:shadow-md transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#153D35] text-white">
                    Nguồn {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#B97249] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {ref.organization}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#153D35] group-hover:text-[#B97249] transition-colors">
                  {ref.name}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {ref.description}
                </p>

                <div className="pt-1">
                  <span className="text-[11px] font-mono text-gray-500 break-all">
                    {ref.url}
                  </span>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#B97249] text-[#153D35] hover:text-white border border-[#E5DFD4] hover:border-[#B97249] text-xs font-semibold transition-all shadow-xs"
                >
                  <span>Truy cập nguồn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legal & Administrative Disclaimer */}
      <div className="p-5 rounded-2xl bg-white border border-[#E5DFD4] text-xs text-gray-600 space-y-2">
        <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-[#153D35]" />
          Lưu ý về sắp xếp đơn vị hành chính và địa giới
        </h4>
        <p className="leading-relaxed">
          - <strong>Thành phố Huế:</strong> Kể từ ngày 01/01/2025, Thành phố Huế chính thức trở thành Thành phố trực thuộc Trung ương theo Nghị quyết số 175/2024/QH15 của Quốc hội khóa XV.
        </p>
        <p className="leading-relaxed">
          - <strong>Đô thị cổ Hội An & Khu đền tháp Mỹ Sơn:</strong> Căn cứ chủ trương sáp nhập và quy hoạch liên kết vùng kinh tế trọng điểm miền Trung của Quốc hội, ứng dụng đã cập nhật chỉ dẫn hành chính để người học tiện theo dõi không gian phân bố hiện hành.
        </p>
      </div>
    </div>
  );
};

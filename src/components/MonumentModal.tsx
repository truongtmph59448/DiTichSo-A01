import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Award, 
  FileText, 
  ExternalLink, 
  Heart, 
  Compass, 
  AlertCircle, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';
import { Monument } from '../data/monuments';

interface MonumentModalProps {
  monument: Monument | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenOnMap: (monument: Monument) => void;
}

export const MonumentModal: React.FC<MonumentModalProps> = ({
  monument,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenOnMap
}) => {
  if (!monument) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0F2D27]/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog Content */}
      <div className="relative bg-[#FAF7F2] text-[#1c2e27] rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#B97249]/30 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Title and badges */}
        <div className="p-6 bg-gradient-to-r from-[#153D35] to-[#1E5247] text-white shrink-0 border-b border-[#153D35]/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B97249] text-white shadow-xs">
                  <Award className="w-3.5 h-3.5" />
                  {monument.badge}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/15 text-white">
                  <MapPin className="w-3.5 h-3.5" />
                  {monument.province}
                </span>
                <span className="text-xs text-white/80 font-medium">
                  {monument.type}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {monument.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
              aria-label="Đóng hồ sơ"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* CRITICAL: UNESCO vs National Special Distinction Notice */}
          {monument.unescoDistinctionNote && (
            <div className="p-4 rounded-xl bg-[#FAF1E6] border border-[#B97249]/30 text-xs sm:text-sm text-[#7D3F1E] flex items-start gap-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-[#B97249] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider text-[11px] block mb-1 text-[#9A5A35]">
                  Phân biệt cấp độ & danh hiệu khoa học:
                </span>
                <p className="leading-relaxed font-medium">
                  {monument.unescoDistinctionNote}
                </p>
              </div>
            </div>
          )}

          {/* Quick Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-xl bg-white border border-[#E5DFD4] shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#153D35]/10 text-[#153D35]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-gray-700 block font-bold">Giai đoạn / Niên đại</span>
                <span className="text-xs sm:text-sm font-semibold text-[#153D35]">{monument.period}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#B97249]/10 text-[#B97249]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-gray-700 block font-bold">Văn bản & Quyết định xếp hạng</span>
                <span className="text-xs sm:text-sm font-semibold text-[#153D35]">{monument.decision}</span>
              </div>
            </div>

            {monument.territoryNote && (
              <div className="flex items-start gap-3 sm:col-span-2 pt-2 border-t border-gray-100">
                <div className="p-2 rounded-lg bg-[#C89B3C]/15 text-[#965733]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-700 block font-bold">Địa giới hành chính</span>
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">{monument.territoryNote}</span>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-sm font-bold text-[#153D35] uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B97249]" />
              Tóm lược di tích
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD4] italic">
              "{monument.summary}"
            </p>
          </div>

          {/* Detailed History */}
          <div>
            <h3 className="text-sm font-bold text-[#153D35] uppercase tracking-wider mb-2">
              Nguồn gốc & Diễn trình lịch sử
            </h3>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-2 bg-white p-4 rounded-xl border border-[#E5DFD4]">
              <p>{monument.history}</p>
            </div>
          </div>

          {/* Typical Values */}
          <div>
            <h3 className="text-sm font-bold text-[#153D35] uppercase tracking-wider mb-2">
              Giá trị tiêu biểu về lịch sử, văn hóa & kiến trúc
            </h3>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed bg-white p-4 rounded-xl border border-[#E5DFD4]">
              <p>{monument.value}</p>
            </div>
          </div>

          {/* Coordinates Notice */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800">Tọa độ tham khảo: </span>
              <span className="font-mono text-gray-700">[{monument.lat}, {monument.lng}]</span>
              <p className="mt-0.5 text-gray-500 italic">{monument.coordinatesNote}</p>
            </div>
          </div>

          {/* Official Sources - Direct Clickable Links */}
          <div>
            <h3 className="text-sm font-bold text-[#153D35] uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#153D35]" />
              Tài liệu & Hồ sơ khoa học chính thống ({monument.sources.length} nguồn)
            </h3>
            <div className="space-y-2">
              {monument.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E5DFD4] hover:border-[#B97249] hover:bg-[#FAF1E6]/30 transition-all group shadow-xs"
                >
                  <div className="min-w-0 pr-3">
                    <div className="font-semibold text-sm text-[#153D35] group-hover:text-[#B97249] transition-colors flex items-center gap-1.5">
                      <span className="truncate">{src.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 block mt-0.5 font-medium">
                      Đơn vị công bố: {src.publisher}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-[#B97249] group-hover:text-white transition-colors text-gray-600 shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F2EDE4] border-t border-[#E5DFD4] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(monument.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isFavorite
                  ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
              <span>{isFavorite ? 'Đã lưu yêu thích' : 'Lưu yêu thích'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                onOpenOnMap(monument);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#153D35] text-white hover:bg-[#1E5247] text-sm font-semibold transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Mở trên bản đồ</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

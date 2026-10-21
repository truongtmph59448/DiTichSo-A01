import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Info, 
  Compass, 
  Award, 
  ExternalLink, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { MONUMENTS_DATA, Monument } from '../data/monuments';

interface HeritageMapProps {
  onSelectMonument: (monument: Monument) => void;
  focusedMonument?: Monument | null;
}

export const HeritageMap: React.FC<HeritageMapProps> = ({
  onSelectMonument,
  focusedMonument
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [activeMonumentId, setActiveMonumentId] = useState<string | null>(
    focusedMonument ? focusedMonument.id : null
  );

  // Unique provinces for filter
  const provinces = ['all', ...Array.from(new Set(MONUMENTS_DATA.map(m => m.province))).sort()];

  // Filtered monuments based on province
  const displayedMonuments = MONUMENTS_DATA.filter((m) => {
    if (selectedProvince === 'all') return true;
    return m.province === selectedProvince;
  });

  // Custom Leaflet Icons
  const createCustomIcon = (isUnesco: boolean, isSelected: boolean) => {
    const bgColor = isUnesco ? '#B97249' : '#153D35';
    const borderColor = isSelected ? '#C89B3C' : '#FFFFFF';
    const size = isSelected ? 36 : 30;

    return L.divIcon({
      className: 'custom-heritage-marker',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${bgColor};
          border: 2.5px solid ${borderColor};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease;
        ">
          <div style="
            transform: rotate(45deg);
            color: #FFFFFF;
            font-size: ${isSelected ? '16px' : '13px'};
            font-weight: bold;
          ">
            ${isUnesco ? '★' : '🏛️'}
          </div>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
      popupAnchor: [0, -size],
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centered on Vietnam (approx. 16.0 N, 107.5 E)
      const map = L.map(mapContainerRef.current, {
        center: [16.4698, 107.5779],
        zoom: 6,
        minZoom: 5,
        maxZoom: 18,
        scrollWheelZoom: true,
      });

      // Standard OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add markers for all displayed monuments
    displayedMonuments.forEach((m) => {
      const isSelected = activeMonumentId === m.id;
      const marker = L.marker([m.lat, m.lng], {
        icon: createCustomIcon(m.isUnesco, isSelected),
        title: m.name,
      }).addTo(map);

      // Popup content
      const popupContent = document.createElement('div');
      popupContent.className = 'text-left space-y-2';
      popupContent.innerHTML = `
        <div style="font-size: 11px; font-weight: 700; color: #B97249; text-transform: uppercase;">
          ${m.badge}
        </div>
        <div style="font-size: 14px; font-weight: 700; color: #153D35; line-height: 1.3;">
          ${m.name}
        </div>
        <div style="font-size: 11px; color: #666; margin-top: 2px;">
          📍 ${m.province} • ${m.type}
        </div>
        <div style="font-size: 10px; color: #777; background: #FAF1E6; padding: 4px 6px; border-radius: 6px; margin-top: 6px; border-left: 2px solid #B97249;">
          <em>Tọa độ tham khảo: [${m.lat}, ${m.lng}] (Không đại diện cho ranh giới di tích)</em>
        </div>
        <div style="margin-top: 8px;">
          <button id="view-details-${m.id}" style="
            width: 100%;
            background: #153D35;
            color: #FFFFFF;
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            text-align: center;
          ">
            Xem hồ sơ chi tiết →
          </button>
        </div>
      `;

      // Event listener for popup action
      const btn = popupContent.querySelector(`#view-details-${m.id}`);
      if (btn) {
        btn.addEventListener('click', () => {
          onSelectMonument(m);
        });
      }

      marker.bindPopup(popupContent, {
        className: 'custom-monument-popup',
        maxWidth: 280,
      });

      marker.on('click', () => {
        setActiveMonumentId(m.id);
      });

      markersRef.current[m.id] = marker;
    });

    // Auto-focus if focusedMonument exists
    if (focusedMonument && markersRef.current[focusedMonument.id]) {
      const targetMarker = markersRef.current[focusedMonument.id];
      map.setView([focusedMonument.lat, focusedMonument.lng], 13, {
        animate: true,
      });
      targetMarker.openPopup();
      setActiveMonumentId(focusedMonument.id);
    }

    // Leaflet needs invalidateSize after rendering
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, [displayedMonuments, activeMonumentId]);

  // Handle click from sidebar list
  const handleSelectFromList = (monument: Monument) => {
    setActiveMonumentId(monument.id);
    const map = mapInstanceRef.current;
    if (map && markersRef.current[monument.id]) {
      map.setView([monument.lat, monument.lng], 12, { animate: true });
      markersRef.current[monument.id].openPopup();
    }
  };

  // Reset map view to full Vietnam
  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.setView([16.4698, 107.5779], 6, { animate: true });
      map.closePopup();
      setActiveMonumentId(null);
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header bar of the map */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DFD4] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#153D35] tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#B97249]" />
            <span>Bản đồ Di sản Lịch sử, Văn hóa Việt Nam</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Dữ liệu không gian địa lý mở OpenStreetMap. Chấm tọa độ biểu diễn vị trí trung tâm di tích.
          </p>
        </div>

        {/* Local Province Filter & Reset View */}
        <div className="flex items-center gap-2">
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-[#E5DFD4] text-xs font-medium text-gray-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#153D35]/30"
          >
            <option value="all">Tất cả địa phương ({MONUMENTS_DATA.length})</option>
            {provinces.filter(p => p !== 'all').map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <button
            onClick={handleResetView}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-gray-100 border border-[#E5DFD4] text-xs font-semibold text-gray-700 shadow-xs transition-colors shrink-0"
            title="Xem toàn cảnh Việt Nam"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#153D35]" />
            <span className="hidden sm:inline">Toàn cảnh</span>
          </button>
        </div>
      </div>

      {/* Main Map & Interactive List Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[650px] rounded-2xl overflow-hidden border border-[#E5DFD4] shadow-md bg-white">
        
        {/* Interactive List (Side on Desktop, Bottom on Mobile) */}
        <div className="lg:col-span-4 h-52 lg:h-full flex flex-col border-b lg:border-b-0 lg:border-r border-[#E5DFD4] bg-[#FAF7F2]">
          <div className="p-3.5 bg-white border-b border-[#E5DFD4] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#153D35] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#B97249]" />
              Danh sách di tích ({displayedMonuments.length})
            </span>
            <span className="text-[11px] text-gray-500 font-medium">Bấm để định vị</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
            {displayedMonuments.map((m) => {
              const isSelected = activeMonumentId === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => handleSelectFromList(m)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#B97249] shadow-sm ring-1 ring-[#B97249]'
                      : 'bg-white/80 border-[#E5DFD4] hover:bg-white hover:border-[#153D35]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#153D35] text-white">
                      {m.badge}
                    </span>
                    <span className="text-[10px] font-medium text-gray-500">
                      {m.province}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-[#153D35] mt-1.5 line-clamp-1">
                    {m.shortName}
                  </h4>

                  <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
                    {m.period}
                  </p>

                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-600">
                      [{m.lat}, {m.lng}]
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMonument(m);
                      }}
                      className="text-[10px] font-semibold text-[#B97249] hover:underline flex items-center gap-0.5"
                    >
                      <span>Hồ sơ</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map legend in sidebar */}
          <div className="p-3 bg-white border-t border-[#E5DFD4] text-[11px] text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B97249] inline-block"></span>
              <span>Di sản Thế giới UNESCO (★)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#153D35] inline-block"></span>
              <span>Di tích Quốc gia Đặc biệt (🏛️)</span>
            </div>
          </div>
        </div>

        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-8 h-full relative">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Disclaimer Banner */}
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 max-w-md bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-gray-200 shadow-md text-[11px] text-gray-600 z-[1000] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#B97249] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-800">Chú thích bản đồ: </span>
              <span>
                Tọa độ hiển thị tại điểm trung tâm tham khảo, không đại diện cho ranh giới khoanh vùng bảo vệ di tích theo Luật Di sản Văn hóa.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

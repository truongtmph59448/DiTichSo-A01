import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Copy, 
  Check, 
  RotateCcw,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
}

export const GeminiAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Xin chào! Tôi là Trợ lý Di sản DiTichSo. Tôi được kết nối trực tiếp với mô hình Gemini ở máy chủ và chỉ giải đáp dựa trên dữ liệu các di tích lịch sử, văn hóa Việt Nam đã được kiểm chứng khoa học. Tôi luôn dẫn nguồn chính thống và sẽ nói "Chưa đủ dữ liệu để khẳng định" nếu thông tin nằm ngoài phạm vi dữ liệu đã xác thực.',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleQuestions = [
    'Những di tích nào trong danh sách được UNESCO ghi danh là Di sản Thế giới?',
    'Sự khác biệt giữa Di sản Thế giới UNESCO và Di tích Quốc gia Đặc biệt là gì?',
    'Hoàng thành Thăng Long và Văn Miếu - Quốc Tử Giám có niên đại và văn bản xếp hạng như thế nào?',
  ];

  const handleSend = async (questionToSend?: string) => {
    const text = (questionToSend !== undefined ? questionToSend : inputQuestion).trim();
    if (!text || isLoading) return;

    if (text.length > 600) {
      setErrorMessage('Câu hỏi vượt quá giới hạn 600 ký tự cho phép.');
      return;
    }

    setErrorMessage(null);
    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }
    ];
    setMessages(newMessages);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Máy chủ không thể xử lý câu hỏi vào lúc này.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.answer,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } catch (err: any) {
      const errorText = err.message || 'Đã xảy ra lỗi khi kết nối với Trợ lý Gemini.';
      setErrorMessage(errorText);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `⚠️ ${errorText}`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: 'Đã làm mới cuộc hội thoại. Hãy đặt câu hỏi về các di tích lịch sử văn hóa để bắt đầu tra cứu!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DFD4] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#153D35] tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#C89B3C]" />
            <span>Trợ lý Di sản Gemini</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Mô hình AI gọi trực tiếp từ máy chủ, chỉ suy luận trên dữ liệu kiểm chứng và trích dẫn tài liệu nguồn.
          </p>
        </div>

        <button
          onClick={handleClearChat}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 border border-[#E5DFD4] text-xs font-medium text-gray-600 transition-colors shadow-xs"
          title="Làm mới cuộc trò chuyện"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm mới hội thoại</span>
        </button>
      </div>

      {/* Strict Guidelines Banner */}
      <div className="p-4 rounded-2xl bg-[#FAF1E6] border border-[#B97249]/30 text-xs text-[#7D3F1E] flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-[#B97249] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold uppercase tracking-wider text-[11px] block text-[#9A5A35]">
            Nguyên tắc bảo vệ tính xác thực lịch sử:
          </span>
          <p className="leading-relaxed">
            Trợ lý chỉ cung cấp thông tin dựa trên cơ sở dữ liệu di tích đã được chuẩn hóa của đề tài A01. 
            Nếu chưa đủ dữ liệu hoặc hỏi di tích chưa được xác thực, hệ thống sẽ trả lời: <em>"Chưa đủ dữ liệu để khẳng định"</em>, tuyệt đối không bịa đặt văn bản xếp hạng hay niên đại.
          </p>
        </div>
      </div>

      {/* Sample Question Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#B97249]" />
          3 Câu hỏi mẫu gợi ý (Bấm để gửi ngay):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="p-3 text-left rounded-xl bg-white border border-[#E5DFD4] hover:border-[#B97249] hover:bg-[#FAF7F2] text-xs text-[#153D35] font-medium transition-all shadow-xs disabled:opacity-50"
            >
              <span className="text-[#B97249] font-bold block mb-1">Câu hỏi {idx + 1}:</span>
              <span className="line-clamp-2">{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="rounded-2xl bg-white border border-[#E5DFD4] shadow-xs flex flex-col min-h-[420px] max-h-[550px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 shadow-xs relative group ${
                    isUser
                      ? 'bg-[#153D35] text-white rounded-tr-none'
                      : msg.isError
                      ? 'bg-red-50 text-red-900 border border-red-200 rounded-tl-none'
                      : 'bg-[#FAF7F2] text-gray-800 border border-[#E5DFD4] rounded-tl-none'
                  }`}
                >
                  {/* Sender Badge */}
                  <div className="flex items-center justify-between gap-4 mb-1.5 text-[10px]">
                    <span className={`font-bold ${isUser ? 'text-[#EADBC8]' : 'text-[#B97249]'}`}>
                      {isUser ? 'Bạn' : 'Trợ lý Di sản DiTichSo (Gemini)'}
                    </span>
                    <span className={isUser ? 'text-white/60' : 'text-gray-600'}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Message Content: Clean text, preserves paragraphs, safe against XSS */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-normal">
                    {msg.text}
                  </div>

                  {/* Copy button for Assistant */}
                  {!isUser && (
                    <div className="mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-end">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="text-[11px] text-gray-500 hover:text-[#153D35] flex items-center gap-1 transition-colors"
                        title="Sao chép nội dung"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-green-600 font-medium">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Animation */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-tl-none p-4 bg-[#FAF7F2] border border-[#E5DFD4] text-xs text-gray-600 flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-[#B97249] animate-spin" />
                <span className="font-medium">
                  Trợ lý Gemini đang đối chiếu cơ sở dữ liệu kiểm chứng...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#FAF7F2] border-t border-[#E5DFD4] rounded-b-2xl">
          {errorMessage && (
            <div className="mb-2 p-2 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <textarea
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                maxLength={600}
                placeholder="Nhập câu hỏi về di tích lịch sử, niên đại, văn bản xếp hạng... (Tối đa 600 ký tự)"
                rows={2}
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD4] text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#153D35]/30 focus:border-[#153D35] resize-none disabled:bg-gray-100"
              />
              <span className={`absolute right-2.5 bottom-2 text-[10px] ${
                inputQuestion.length > 550 ? 'text-red-500 font-bold' : 'text-gray-500'
              }`}>
                {inputQuestion.length}/600
              </span>
            </div>

            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputQuestion.trim()}
              className="px-4 py-3 rounded-xl bg-[#153D35] hover:bg-[#1E5247] disabled:bg-gray-300 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-1.5 shrink-0 disabled:cursor-not-allowed"
              title="Gửi câu hỏi tới Gemini"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Gửi</span>
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
            <span>Chỉ gửi khi bấm nút hoặc phím Enter • Bảo vệ dữ liệu người dùng</span>
            <span className="font-semibold text-[#153D35]">gemini-2.5-flash</span>
          </div>
        </div>
      </div>
    </div>
  );
};

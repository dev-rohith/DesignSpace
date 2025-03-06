import { MessageCircle } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 px-4 py-2">
      <MessageCircle className="w-5 h-5 text-gray-700 animate-pulse" />
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-[bounce_1.3s_infinite]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-[bounce_1.3s_infinite] delay-150"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-[bounce_1.3s_infinite] delay-300"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;

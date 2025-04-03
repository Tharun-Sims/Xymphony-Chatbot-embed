
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
  color?: string;
  textColor?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  onClick, 
  color = '#4F46E5', 
  textColor = '#FFFFFF' 
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-full shadow-lg w-14 h-14 transition-transform hover:scale-110 focus:outline-none"
      style={{ backgroundColor: color }}
      aria-label="Open chat"
    >
      <MessageSquare size={24} color={textColor} />
    </button>
  );
};

export default ChatBubble;

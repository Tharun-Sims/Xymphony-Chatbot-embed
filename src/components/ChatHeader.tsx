
import React from 'react';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  primaryColor?: string;
  textColor?: string;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  subtitle,
  avatarUrl,
  primaryColor = '#4F46E5',
  textColor = '#FFFFFF',
  onClose
}) => {
  return (
    <div 
      className="flex items-center justify-between p-3"
      style={{ backgroundColor: primaryColor, color: textColor }}
    >
      <div className="flex items-center">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt="Chatbot Avatar" 
            className="w-8 h-8 rounded-full mr-3" 
          />
        ) : (
          <div 
            className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <span className="text-sm font-bold">{title.charAt(0)}</span>
          </div>
        )}
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          {subtitle && <p className="text-xs opacity-90">{subtitle}</p>}
        </div>
      </div>
      <button 
        onClick={onClose}
        className="rounded-full p-1 hover:bg-white/20 transition-colors"
        aria-label="Close chat"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ChatHeader;

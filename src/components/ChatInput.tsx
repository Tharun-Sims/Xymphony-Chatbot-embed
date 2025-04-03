
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  primaryColor?: string;
  placeholderText?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled, 
  primaryColor = '#4F46E5',
  placeholderText = 'Type your message...'
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t border-gray-200 p-3 bg-white"
    >
      <div className="flex items-center rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-opacity-40" 
           style={{ backgroundColor: 'white', boxShadow: 'none', focusWithinRingColor: primaryColor }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholderText}
          disabled={disabled}
          className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-2 rounded-r-lg focus:outline-none transition-opacity disabled:opacity-50"
          style={{ 
            color: message.trim() && !disabled ? primaryColor : '#9CA3AF'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;

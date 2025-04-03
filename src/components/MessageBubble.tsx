
import React from 'react';
import { Message } from '../types/chatbot';

interface MessageBubbleProps {
  message: Message;
  primaryColor?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, primaryColor = '#4F46E5' }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`inline-block rounded-lg p-3 max-w-[80%] ${
          isUser 
            ? 'bg-gray-200 text-gray-800' 
            : 'text-white'
        }`}
        style={{
          backgroundColor: isUser ? '#E5E7EB' : primaryColor,
          color: isUser ? '#1F2937' : '#FFFFFF'
        }}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
      </div>
    </div>
  );
};

export default MessageBubble;

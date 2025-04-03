
import React, { useEffect, useRef } from 'react';
import { Message } from '../types/chatbot';
import MessageBubble from './MessageBubble';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  primaryColor?: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  isLoading, 
  primaryColor = '#4F46E5' 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id}
            message={message}
            primaryColor={primaryColor}
          />
        ))}
        
        {isLoading && (
          <div className="flex">
            <div 
              className="inline-flex rounded-lg p-3 max-w-[80%] bg-gray-200"
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;

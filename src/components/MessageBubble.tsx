import React from 'react';
import { Message } from '../types/chatbot';
import { FileText, Image, Mic } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  primaryColor?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, primaryColor = '#4F46E5' }) => {
  const isUser = message.role === 'user';
  
  const renderContent = () => {
    const textContent = message.contentType === 'text' ? (
      <div className="whitespace-pre-wrap break-words">{message.content as string}</div>
    ) : null;

    const fileContent = message.files?.map((file, index) => (
      <div key={index} className="mt-2">
        {file.type === 'image' ? (
          <img 
            src={URL.createObjectURL(file.file)} 
            alt={file.name} 
            className="max-w-full rounded"
            style={{ maxHeight: '200px' }}
          />
        ) : (
          <div className="flex items-center gap-2">
            <FileText size={18} />
            <span>{file.name}</span>
          </div>
        )}
      </div>
    ));

    return (
      <div className="space-y-2">
        {textContent}
        {fileContent}
      </div>
    );
  };

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
        {renderContent()}
      </div>
    </div>
  );
};

export default MessageBubble;

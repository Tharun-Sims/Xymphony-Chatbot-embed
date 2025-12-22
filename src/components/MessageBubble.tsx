import React, { useState } from 'react';
import { Message } from '../types/chatbot';
import { FileText, Copy, Check, Mic } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageBubbleProps {
  message: Message;
  primaryColor?: string;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, primaryColor = '#4F46E5' }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const isUser = message.role === 'user';

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const renderContent = () => {
    if (message.contentType === 'text' && typeof message.content === 'string') {
      return (
        <div className="prose prose-invert prose-sm w-full max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: CodeProps) {
                const match = /language-(\w+)/.exec(className || '');
                const code = String(children).replace(/\n$/, '');
                
                if (!inline && match) {
                  return (
                    <div className="relative w-full bg-gray-800 rounded-xl group" style={{ borderRadius: '0.75rem' }}>
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => copyToClipboard(code, 0)}
                          className="p-2 rounded hover:bg-gray-700 transition-colors"
                          title="Copy code"
                        >
                          {copiedIndex === 0 ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} className="text-gray-300" />
                          )}
                        </button>
                      </div>
                      <SyntaxHighlighter
                        language={match[1]}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.5rem',
                          padding: '2.5rem 1rem 1rem',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                          background: 'transparent'
                        }}
                        {...props}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {typeof message.content === 'string' ? message.content : ''}
          </ReactMarkdown>
        </div>
      );
    }

    const fileContent = message.files?.map((file, index) => (
      <div key={index} className="mt-2">
        {file.type === 'image' ? (
          <img 
            src={URL.createObjectURL(file.file)} 
            alt={file.name} 
            className="max-w-full rounded-xl"
            style={{ maxHeight: '200px', borderRadius: '0.75rem' }}
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
      <div className="space-y-2 text-sm">
        {message.contentType === 'text' && typeof message.content === 'string' && (
          <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</div>
        )}
        {fileContent}
      </div>
    );
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`inline-block rounded-2xl p-2.5 max-w-[80%] text-sm ${
          isUser 
            ? 'bg-gray-200 text-gray-800' 
            : 'text-white'
        }`}
        style={{
          backgroundColor: isUser ? '#E5E7EB' : primaryColor,
          color: isUser ? '#1F2937' : '#FFFFFF',
          borderRadius: '1rem' // Explicit border radius for Shadow DOM compatibility
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default MessageBubble;

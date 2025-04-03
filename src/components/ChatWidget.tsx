
import React, { useState, useEffect } from 'react';
import { ChatbotConfig, Message } from '../types/chatbot';
import ChatBubble from './ChatBubble';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';

interface ChatWidgetProps {
  config: ChatbotConfig;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add welcome message when chat is first opened
    if (isOpen && messages.length === 0 && config.welcomeMessage) {
      setMessages([
        {
          id: uuidv4(),
          content: config.welcomeMessage,
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length, config.welcomeMessage]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call the API with the chatflow ID
      const response = await fetch(`${config.apiHost}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatflowid: config.chatflowid,
          message: content,
        }),
      });

      const data = await response.json();
      
      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        content: data.response || "Sorry, I couldn't process your request.",
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Sorry, something went wrong. Please try again later.",
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Position styles based on config
  const positionStyles = {
    position: 'fixed',
    bottom: '20px',
    [config.position === 'left' ? 'left' : 'right']: '20px',
    zIndex: 9999,
  } as React.CSSProperties;

  return (
    <div style={positionStyles} className="flex flex-col">
      {isOpen ? (
        <div 
          className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden"
          style={{
            width: config.width,
            height: config.height,
            maxHeight: '80vh', 
            maxWidth: '90vw'
          }}
        >
          <ChatHeader 
            title={config.title || "Chat Assistant"}
            subtitle={config.subtitle}
            avatarUrl={config.avatarUrl}
            primaryColor={config.primaryColor}
            textColor={config.textColor}
            onClose={toggleChat}
          />
          
          <ChatMessages 
            messages={messages} 
            isLoading={isLoading}
            primaryColor={config.primaryColor}
          />
          
          <ChatInput 
            onSendMessage={sendMessage} 
            disabled={isLoading}
            primaryColor={config.primaryColor}
            placeholderText={config.placeholderText}
          />
        </div>
      ) : (
        <ChatBubble 
          onClick={toggleChat} 
          color={config.bubbleColor}
          textColor={config.bubbleTextColor}
        />
      )}
    </div>
  );
};

export default ChatWidget;

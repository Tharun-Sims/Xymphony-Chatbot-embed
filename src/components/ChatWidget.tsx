import React, { useState, useEffect } from "react";
import { ChatbotConfig, Message } from "../types/chatbot";
import ChatBubble from "./ChatBubble";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

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
          contentType: 'text',
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length, config.welcomeMessage]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (content: string, files: File[] = []) => {
    if (!content.trim() && files.length === 0) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      contentType: 'text',
      role: "user",
      timestamp: new Date(),
      files: files.map(file => ({
        file,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        name: file.name
      }))
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Structure agent_data as JSON
      const agentData = {
        query: content,
        stream: false,
        new_session: messages.length === 1
      };
      formData.append('agent_data', JSON.stringify(agentData));
      
      // Separate images and PDFs
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          formData.append('images', file);
        } else {
          formData.append('pdfs', file);
        }
      });

      const response = await fetch(`${config.apiHost}`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        content: data.response || "Sorry, I couldn't process your request.",
        contentType: 'text',
        role: "assistant",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Sorry, something went wrong. Please try again later.",
        contentType: 'text',
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('agent_id', config.agent_id);

    const userMessage: Message = {
      id: uuidv4(),
      content: file,
      contentType: file.type.startsWith('image/') ? 'image' : 'document',
      role: 'user',
      timestamp: new Date(),
      fileName: file.name
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${config.apiHost}/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: uuidv4(),
        content: data.response || "I've received your file.",
        contentType: 'text',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending file:', error);
      // ... error handling ...
    } finally {
      setIsLoading(false);
    }
  };

  const sendAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('agent_id', config.agent_id);

    const userMessage: Message = {
      id: uuidv4(),
      content: audioBlob,
      contentType: 'audio',
      role: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${config.apiHost}/upload-audio`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: uuidv4(),
        content: data.response,
        contentType: 'text',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending audio:', error);
      // ... error handling ...
    } finally {
      setIsLoading(false);
    }
  };

  // Position styles based on config
  const positionStyles = {
    position: "fixed",
    bottom: "20px",
    [config.position === "left" ? "left" : "right"]: "20px",
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
            maxHeight: "80vh",
            maxWidth: "90vw",
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
            onSendFile={sendFile}
            onSendAudio={sendAudio}
            disabled={isLoading}
            primaryColor={config.primaryColor}
            placeholderText={config.placeholderText}
            enableAudioRecording={config.enableAudioRecording}
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

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
  const [sessionId, setSessionId] = useState<string>("");

  // Debug: Log config on mount to verify headers are received
  useEffect(() => {
    try {
      console.log('⚙️ Chatbot Config:', {
        apiHost: config.apiHost,
        hasHeaders: !!config.headers,
        headerKeys: config.headers ? Object.keys(config.headers) : [],
        headerValues: config.headers ? Object.entries(config.headers).map(([k, v]) => [k, v ? '***' + String(v).slice(-4) : 'empty']) : []
      });
    } catch (e) {
      // Silently fail if console is not available
    }
  }, [config]);

  // Helper function to build headers dynamically
  const buildHeaders = (): Headers => {
    const headers = new Headers();
    
    // Use dynamic headers if provided
    if (config.headers && typeof config.headers === 'object') {
      Object.entries(config.headers).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
          headers.append(key, value);
        }
      });
    }
    
    // Legacy support: backward compatibility with apiKey and userEmail
    if (config.apiKey) {
      headers.append('X-API-KEY', config.apiKey);
    }
    if (config.userEmail) {
      headers.append('X-XAI-USER', config.userEmail);
    }
    
    // Debug: Log headers being sent
    const headerEntries: string[] = [];
    headers.forEach((value, key) => {
      headerEntries.push(`${key}: ${value.substring(0, 4)}***`);
    });
    
    try {
      if (headerEntries.length > 0) {
        console.log('🔑 Chatbot Headers being sent:', Array.from(headers.keys()));
        console.log('📋 Headers (masked):', headerEntries);
      } else {
        console.warn('⚠️ No headers configured!');
      }
    } catch (e) {
      // Silently fail if console is not available
    }
    
    return headers;
  };

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
      // Reset session when opening a fresh chat
      setSessionId("");
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
      const headers = buildHeaders();
      let response: Response;
      let data: any;

      // Use FormData with 'question' as request parameter (Java backend format)
      const formData = new FormData();
      formData.append('question', content);
      
      // Add files if present
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          formData.append('images', file);
        } else {
          formData.append('pdfs', file);
        }
      });

      try {
        const headerKeys = Array.from(headers.keys());
        console.log('🚀 Sending request to:', config.apiHost);
        console.log('📤 Headers count:', headerKeys.length);
        console.log('📤 Header keys:', headerKeys);
        console.log('📦 FormData keys:', Array.from(formData.keys()));
        console.log('📝 Question param:', content);
      } catch (e) {
        // Silently fail if console is not available
      }
      
      response = await fetch(`${config.apiHost}`, {
        method: "POST",
        headers: headers,
        body: formData
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      data = await response.json();

      // Store session_id from response if provided (Xymphony format)
      if (data.session_id) {
        setSessionId(data.session_id);
      }

      // Intelligent response parsing - handles both formats
      let responseContent = "Sorry, I couldn't process your request.";
      
      // Try Java backend format first (data.data.content)
      if (data?.status === 'SUCCESS' && data?.data?.content) {
        responseContent = data.data.content;
      } else if (data?.data?.content) {
        responseContent = data.data.content;
      } 
      // Try Xymphony format (data.response)
      else if (data?.response) {
        responseContent = data.response;
      }
      // Fallback formats
      else if (data?.content) {
        responseContent = data.content;
      } else if (data?.message) {
        responseContent = data.message;
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        content: responseContent,
        contentType: 'text',
        role: "assistant",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        console.log('📥 Response status:', response.status);
        console.log('📥 Response data:', data);
      } catch (e) {
        // Silently fail if console is not available
      }
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
      // Build headers with authentication
      const headers = buildHeaders();
      
      console.log('📤 File upload - Headers:', Array.from(headers.keys()));

      const response = await fetch(`${config.apiHost}/upload`, {
        method: 'POST',
        headers: headers,
        body: formData
      });

      const data = await response.json();
      
      // Store session_id from response if provided
      if (data.session_id) {
        setSessionId(data.session_id);
      }
      
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
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Sorry, something went wrong while uploading the file. Please try again later.",
        contentType: 'text',
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

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
      // Build headers with authentication
      const headers = buildHeaders();
      
      console.log('📤 Audio upload - Headers:', Array.from(headers.keys()));

      const response = await fetch(`${config.apiHost}/upload-audio`, {
        method: 'POST',
        headers: headers,
        body: formData
      });

      const data = await response.json();
      
      // Store session_id from response if provided
      if (data.session_id) {
        setSessionId(data.session_id);
      }
      
      const assistantMessage: Message = {
        id: uuidv4(),
        content: data.response || "I've received your audio message.",
        contentType: 'text',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending audio:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Sorry, something went wrong while sending the audio. Please try again later.",
        contentType: 'text',
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const embedMode = config.embedMode || "floating";
  const isPanelMode = embedMode === "panel";

  // For panel mode, always show the chat (no bubble, no toggle)
  useEffect(() => {
    if (isPanelMode && !isOpen) {
      setIsOpen(true);
    }
  }, [isPanelMode, isOpen]);

  // Position styles based on embed mode
  const containerStyles: React.CSSProperties = isPanelMode
    ? {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }
    : {
        position: "fixed",
        bottom: "20px",
        [config.position === "left" ? "left" : "right"]: "20px",
        zIndex: 9999,
      };

  // Widget container styles
  const widgetStyles: React.CSSProperties = isPanelMode
    ? {
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
        borderRadius: '0.5rem', // Slightly rounded for panel mode
      }
    : {
        width: config.width,
        height: config.height,
        maxHeight: "80vh",
        maxWidth: "90vw",
        borderRadius: '1rem', // Explicit border radius for Shadow DOM compatibility
      };

  return (
    <div style={containerStyles} className="flex flex-col">
      {isOpen || isPanelMode ? (
        <div
          className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden"
          style={widgetStyles}
        >
          <ChatHeader
            title={config.title || "Chat Assistant"}
            subtitle={config.subtitle}
            avatarUrl={config.avatarUrl}
            primaryColor={config.primaryColor}
            textColor={config.textColor}
            onClose={isPanelMode ? undefined : toggleChat} // Hide close button in panel mode
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
        !isPanelMode && (
          <ChatBubble
            onClick={toggleChat}
            color={config.bubbleColor}
            textColor={config.bubbleTextColor}
          />
        )
      )}
    </div>
  );
};

export default ChatWidget;

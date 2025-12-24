export interface ChatbotConfig {
  apiHost: string;
  // Dynamic headers - pass any custom headers as key-value pairs
  headers?: Record<string, string>;
  // Legacy support (deprecated - use headers instead)
  apiKey?: string;
  userEmail?: string;
  // Embed mode: 'floating' = floating bubble widget, 'panel' = embedded panel (30% width, full height)
  embedMode?: "floating" | "panel";
  // For panel mode: container element ID or HTMLElement where chatbot should be embedded (if not provided, appends to body)
  containerId?: string;
  container?: HTMLElement;
  // For panel mode: width as percentage or CSS value (default: "30%")
  panelWidth?: string;
  // For panel mode: position on screen ("left" | "right", default: "right") - only used if no container specified
  panelPosition?: "left" | "right";
  // For floating mode: position of the bubble
  position?: "left" | "right";
  primaryColor?: string;
  textColor?: string;
  bubbleColor?: string;
  bubbleTextColor?: string;
  welcomeMessage?: string;
  placeholderText?: string;
  title?: string;
  subtitle?: string;
  avatarUrl?: string;
  height?: string;
  width?: string;
  enableAudioRecording?: boolean;
  maxFileSize?: number;
  allowedFileTypes?: string[];
}

export interface Message {
  id: string;
  content: string | File | Blob;
  contentType: 'text' | 'image' | 'document' | 'audio';
  role: 'user' | 'assistant';
  timestamp: Date;
  fileName?: string;
  fileUrl?: string;
  files?: Array<{
    file: File;
    type: 'image' | 'document';
    name: string;
  }>;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  config: ChatbotConfig;
}

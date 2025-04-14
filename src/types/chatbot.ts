export interface ChatbotConfig {
  agent_id: string;
  apiHost: string;
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


export interface ChatbotConfig {
  chatflowid: string;
  apiHost: string;
  position?: 'left' | 'right';
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
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  config: ChatbotConfig;
}

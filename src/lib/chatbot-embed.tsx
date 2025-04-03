import { createRoot } from "react-dom/client";
import { ChatbotConfig } from "../types/chatbot";
import ChatWidget from "../components/ChatWidget";

class Chatbot {
  private static instance: Chatbot | null = null;
  private config: ChatbotConfig | null = null;
  private container: HTMLElement | null = null;

  private constructor() {
    // Singleton pattern
  }

  public static getInstance(): Chatbot {
    if (!Chatbot.instance) {
      Chatbot.instance = new Chatbot();
    }
    return Chatbot.instance;
  }

  public init(config: ChatbotConfig): void {
    this.config = {
      position: "right",
      primaryColor: "#4F46E5",
      textColor: "#FFFFFF",
      bubbleColor: "#4F46E5",
      bubbleTextColor: "#FFFFFF",
      welcomeMessage: "Hello! How can I help you today?",
      placeholderText: "Type your message...",
      title: "Chat Assistant",
      subtitle: "Ask me anything",
      height: "500px",
      width: "350px",
      ...config,
    };

    // Create container if it doesn't exist
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "chatbot-container";
      document.body.appendChild(this.container);
    }

    // Render the chatbot UI
    const root = createRoot(this.container);
    root.render(<ChatWidget config={this.config} />);
  }
}

export default Chatbot.getInstance();

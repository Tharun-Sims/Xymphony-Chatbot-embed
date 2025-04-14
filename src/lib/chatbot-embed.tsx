import * as ReactDOM from "react-dom";
import { ChatbotConfig } from "../types/chatbot";
import ChatWidget from "../components/ChatWidget";
import chatbotStyles from "../index.css?inline";
import { createRoot } from "react-dom/client";

class Chatbot {
  private static instance: Chatbot | null = null;
  private config: ChatbotConfig | null = null;
  private container: HTMLElement | null = null;

  private constructor() {}

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

    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "chatbot-container";
      document.body.appendChild(this.container);
    }
    // 🔒 Create Shadow DOM
    const shadow = this.container.attachShadow({ mode: "open" });

    // 🧵 Inject CSS
    const style = document.createElement("style");
    style.textContent = chatbotStyles;
    shadow.appendChild(style);

    // 🪝 Create app mount point
    const mount = document.createElement("div");
    shadow.appendChild(mount);

    // 🚀 Render Chatbot
    const root = createRoot(mount);
    root.render(<ChatWidget config={this.config} />);
  }
}

export default Chatbot.getInstance();

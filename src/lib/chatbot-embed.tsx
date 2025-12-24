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
      embedMode: "floating",
      position: "right",
      panelPosition: "right",
      panelWidth: "30%",
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

    const embedMode = this.config.embedMode || "floating";

    // Check if user provided a container element or container ID
    let userContainer: HTMLElement | null = null;
    
    if (this.config.container) {
      userContainer = this.config.container;
    } else if (this.config.containerId) {
      userContainer = document.getElementById(this.config.containerId);
      if (!userContainer) {
        console.warn(`Container with ID "${this.config.containerId}" not found. Appending to body.`);
      }
    }

    // Determine the actual container to use
    if (embedMode === "panel" && userContainer) {
      // Panel mode with container: Use user's container directly (embedded in layout)
      this.container = userContainer;
      
      // Ensure the user's container has proper styling for embedded mode
      if (!this.container.shadowRoot) {
        // Only set styles if shadow DOM doesn't exist yet
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.display = "flex";
        this.container.style.flexDirection = "column";
        this.container.style.position = "relative";
        this.container.style.overflow = "hidden";
      }
    } else {
      // Floating mode OR panel mode without container: Create our own container
      if (!this.container) {
        this.container = document.createElement("div");
        this.container.id = "chatbot-container";
        
        if (embedMode === "panel") {
          // Panel mode without container: overlay mode
          this.container.style.position = "fixed";
          this.container.style.top = "0";
          this.container.style.bottom = "0";
          this.container.style.width = this.config.panelWidth || "30%";
          this.container.style[this.config.panelPosition === "left" ? "left" : "right"] = "0";
          this.container.style.zIndex = "9999";
          this.container.style.backgroundColor = "transparent";
        } else {
          // Floating mode
          this.container.style.position = "relative";
        }
        
        document.body.appendChild(this.container);
      }
    }
    
    // 🔒 Create Shadow DOM (attach to container, or use existing if already attached)
    let shadow = this.container.shadowRoot;
    if (!shadow) {
      shadow = this.container.attachShadow({ mode: "open" });
    } else {
      // Clear existing content if re-initializing
      shadow.innerHTML = "";
    }

    // 🧵 Inject CSS
    const style = document.createElement("style");
    style.textContent = chatbotStyles;
    shadow.appendChild(style);

    // 🪝 Create app mount point
    const mount = document.createElement("div");
    if (embedMode === "panel") {
      mount.style.width = "100%";
      mount.style.height = "100%";
      mount.style.display = "flex";
      mount.style.flexDirection = "column";
    }
    shadow.appendChild(mount);

    // 🚀 Render Chatbot
    const root = createRoot(mount);
    root.render(<ChatWidget config={this.config} />);
  }
}

export default Chatbot.getInstance();

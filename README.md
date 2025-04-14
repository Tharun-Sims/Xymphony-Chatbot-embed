# Chatbot Embed

A customizable chatbot widget that can be easily embedded into any web application. Create an AI agent using Xymphony AI and embed this chatbot with various custom configurations.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/chatbot-embed.git
cd chatbot-embed
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Serve the build files locally:
```bash
npx serve -l 3001 --cors
```

## Embedding the Chatbot

Add the following script tag to your HTML file:

```html
<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/chatbot-embed/dist/index.js';
  
  Chatbot.init({
    // Required parameters
    agent_id: 'YOUR_CHATFLOW_ID',
    apiHost: 'https://your-api-host.com',
    
    // Optional parameters
    position: 'right',           // 'left' or 'right'
    primaryColor: '#4F46E5',     // Main color
    textColor: '#FFFFFF',        // Text color for header
    bubbleColor: '#4F46E5',      // Chat bubble color
    bubbleTextColor: '#FFFFFF',  // Chat bubble icon color
    welcomeMessage: 'Hello! How can I help you today?',
    placeholderText: 'Type your message...',
    title: 'Chat Assistant',
    subtitle: 'Powered by Xymphony',
    avatarUrl: 'https://example.com/avatar.png',
    height: '500px',
    width: '350px',
    enableAudioRecording: true   // Enable/disable audio recording feature
  });
</script>
```

## Configuration Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `agent_id` | string | - | **Required**. Your Xymphony AI agent ID |
| `apiHost` | string | - | **Required**. Your API host URL |
| `position` | 'left' \| 'right' | 'right' | Position of the chat widget |
| `primaryColor` | string | '#4F46E5' | Main color for the chat widget |
| `textColor` | string | '#FFFFFF' | Text color for the header |
| `bubbleColor` | string | '#4F46E5' | Color of the chat bubble |
| `bubbleTextColor` | string | '#FFFFFF' | Color of the chat bubble icon |
| `welcomeMessage` | string | 'Hello! How can I help you today?' | Initial welcome message |
| `placeholderText` | string | 'Type your message...' | Input placeholder text |
| `title` | string | 'Chat Assistant' | Title of the chat widget |
| `subtitle` | string | 'Powered by Xymphony' | Subtitle of the chat widget |
| `avatarUrl` | string | - | URL of the chatbot avatar image |
| `height` | string | '500px' | Height of the chat widget |
| `width` | string | '350px' | Width of the chat widget |
| `enableAudioRecording` | boolean | true | Enable/disable audio recording feature |

## Features

- Text chat with AI assistant
- File upload support (images and documents)
- Audio message recording (optional)
- Customizable appearance
- Responsive design
- Easy integration

## Development

1. Start the development server:
```bash
npm run dev
```

2. Make your changes in the `src` directory

3. Build for production:
```bash
npm run build
```

## License

MIT

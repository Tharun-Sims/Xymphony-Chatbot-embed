import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Code, Copy } from "lucide-react";
import Chatbot from "../lib/chatbot-embed";

const Index = () => {
  const handleInitChatbot = () => {
    Chatbot.init({
      apiHost: "https://api.example.com",
      primaryColor: "#4F46E5",
      title: "AI Assistant",
      subtitle: "Demo Version",
    });
  };

  const codeSnippet = `<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/chatbot-embed/dist/index.js';
  
  Chatbot.init({
    apiHost: 'https://chatbot-embed-server.com/{agent_id}',
    
    // Optional configuration
    position: 'right',           // 'left' or 'right'
    primaryColor: '#4F46E5',     // Main color
    textColor: '#FFFFFF',        // Text color for header
    bubbleColor: '#4F46E5',      // Chat bubble color
    bubbleTextColor: '#FFFFFF',  // Chat bubble icon color
    welcomeMessage: 'Hello! How can I help you today?',
    placeholderText: 'Type your message...',
    title: 'Chat Assistant',
    subtitle: 'Powered by Xymphony',
    avatarUrl: 'https://ues.smartims.net/avatar.png',
    height: '500px',
    width: '350px'
  });
</script>`;

  const npmInstallCode = `npm install chatbot-embed`;
  const reactImportCode = `import { Chatbot } from 'chatbot-embed';

// In your component
useEffect(() => {
  Chatbot.init({
    agent_id: 'YOUR_CHATFLOW_ID',
    apiHost: 'https://chatbot-embed-server.com/{agent_id}',
    // ... other options
  });
}, []);`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast message here
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Chatbot Embed - Xymphony
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A powerful, customizable chatbot widget you can embed on any website
            with just a few lines of code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Live Demo
              </CardTitle>
              <CardDescription>
                Try out the chatbot by clicking the button below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleInitChatbot}
                className="w-full"
                style={{ backgroundColor: "#4F46E5", color: "white" }}
              >
                Launch Chatbot Demo
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                This is a live demonstration. Click the button to initialize the
                chatbot with sample configuration.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                Integration Options
              </CardTitle>
              <CardDescription>
                Add the chatbot to your website with these methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="script">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="script" className="flex-1">
                    Script Tag
                  </TabsTrigger>
                  <TabsTrigger value="npm" className="flex-1">
                    NPM Package
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="script">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                      <code>{codeSnippet}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(codeSnippet)}
                      className="absolute top-2 right-2 p-2 bg-gray-800 rounded hover:bg-gray-700"
                      aria-label="Copy code"
                    >
                      <Copy size={14} className="text-gray-300" />
                    </button>
                  </div>
                </TabsContent>

                <TabsContent value="npm">
                  <div className="space-y-4">
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                        <code>{npmInstallCode}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(npmInstallCode)}
                        className="absolute top-2 right-2 p-1 bg-gray-800 rounded hover:bg-gray-700"
                        aria-label="Copy code"
                      >
                        <Copy size={12} className="text-gray-300" />
                      </button>
                    </div>

                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                        <code>{reactImportCode}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(reactImportCode)}
                        className="absolute top-2 right-2 p-1 bg-gray-800 rounded hover:bg-gray-700"
                        aria-label="Copy code"
                      >
                        <Copy size={12} className="text-gray-300" />
                      </button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Customization Options
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The chatbot widget comes with many configuration options to match
            your brand and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Appearance",
              description: "Colors, sizes, and positioning",
            },
            {
              name: "Content",
              description: "Messages, placeholders and titles",
            },
            { name: "Behavior", description: "Interaction with your backend" },
            { name: "Branding", description: "Custom logos and styling" },
            { name: "Accessibility", description: "Works on all devices" },
            { name: "Lightweight", description: "Minimal impact on page load" },
          ].map((feature) => (
            <Card key={feature.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{feature.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Code, Copy, Check, Zap, Shield, Palette, Globe } from "lucide-react";
import Chatbot from "../lib/chatbot-embed";
import { useState } from "react";

const Index = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleInitChatbot = () => {
    Chatbot.init({
      apiHost: "http://{YOUR-API-HOST}/quote/regulatory",
      headers: {
        'API-KEY': '',
        'USER-EMAIL': ''
      },
      primaryColor: "#11a8a5",
      textColor: "#FFFFFF",
      bubbleColor: "#11a8a5",
      bubbleTextColor: "#FFFFFF",
      title: "Insure Assist",
      subtitle: "Demo Version - Xymphony Agent",
      welcomeMessage: "👋 Hello! How can I help you today?",
      placeholderText: "Type your message...",
      position: "right",
      height: "500px",
      width: "350px",
      enableAudioRecording: true
    });
  };

  const basicIntegrationCode = `<!-- Add React and ReactDOM -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Add Chatbot Embed Library -->
<!-- Replace 'your-username' with your GitHub username -->
<script
    src="https://{CONTACT-TO-GET-THE-LATEST-VERSION-OF-THE-CHATBOT-EMBED}/chatbot-embed.iife.js"
></script>

<!-- Initialize Chatbot -->
<script>
    Chatbot.init({
        apiHost: "http://{YOUR-API-HOST}/quote/regulatory",
        
        // Optional: Custom headers
        headers: {
            'API-KEY': 'your-api-key',
            'USER-EMAIL': 'user@example.com'
        },
        
        // Optional: Appearance
        position: "right",
        primaryColor: "#11a8a5",
        title: "Chat Assistant",
        subtitle: "Powered by Xymphony"
    });
</script>`;

  const fullConfigCode = `Chatbot.init({
    // Required: Your backend API endpoint
    apiHost: "http://{YOUR-API-HOST}/quote/regulatory",
    
    // Optional: Custom headers for authentication
    headers: {
        'API-KEY': 'your-api-key',
        'USER-EMAIL': 'user@example.com',
        'Authorization': 'Bearer token'
        // Add any custom headers here
    },
    
    // Optional: Position
    position: "right",  // 'left' or 'right'
    
    // Optional: Colors
    primaryColor: "#11a8a5",
    textColor: "#FFFFFF",
    bubbleColor: "#11a8a5",
    bubbleTextColor: "#FFFFFF",
    
    // Optional: Content
    title: "Chat Assistant",
    subtitle: "Powered by Xymphony",
    welcomeMessage: "Hello! How can I help you?",
    placeholderText: "Type your message...",
    avatarUrl: "https://example.com/avatar.png",
    
    // Optional: Size
    height: "500px",
    width: "350px",
    
    // Optional: Features
    enableAudioRecording: true
});`;

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Xymphony Chatbot Embed
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Embed a powerful, AI-powered chatbot widget on any website with just a few lines of code. 
            Fully customizable, lightweight, and easy to integrate.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleInitChatbot}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Try Live Demo
            </Button>
            <Button
              onClick={() => {
                const element = document.getElementById('integration');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              variant="outline"
            >
              <Code className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Minimal bundle size, optimized performance" },
            { icon: Palette, title: "Fully Customizable", desc: "Colors, sizes, and branding options" },
            { icon: Shield, title: "Secure", desc: "Shadow DOM isolation, CORS support" },
            { icon: Globe, title: "Universal", desc: "Works on any website, any framework" },
          ].map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardContent className="pt-6">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-indigo-600" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Section */}
        <div id="integration" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Integration</h2>
            <p className="text-lg text-gray-600">
              Add the chatbot to your website in under 2 minutes
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                Basic Integration
              </CardTitle>
              <CardDescription>
                Copy and paste this code into your HTML file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{basicIntegrationCode}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(basicIntegrationCode, 'basic')}
                  className="absolute top-4 right-4 p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  aria-label="Copy code"
                >
                  {copiedCode === 'basic' ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-gray-300" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Full Configuration Example</CardTitle>
              <CardDescription>
                All available configuration options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{fullConfigCode}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(fullConfigCode, 'full')}
                  className="absolute top-4 right-4 p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  aria-label="Copy code"
                >
                  {copiedCode === 'full' ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-gray-300" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
            <p className="text-lg text-gray-600">
              Everything you need for a modern chatbot experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Text Chat",
                description: "Real-time text messaging with markdown support and code syntax highlighting",
                icon: MessageSquare,
              },
              {
                title: "File Uploads",
                description: "Support for images, PDFs, and documents with preview",
                icon: MessageSquare,
              },
              {
                title: "Audio Messages",
                description: "Record and send audio messages (optional feature)",
                icon: MessageSquare,
              },
              {
                title: "Custom Headers",
                description: "Send authentication headers and custom API keys",
                icon: Shield,
              },
              {
                title: "Session Management",
                description: "Automatic session tracking across conversations",
                icon: Zap,
              },
              {
                title: "Responsive Design",
                description: "Works perfectly on desktop, tablet, and mobile devices",
                icon: Globe,
              },
            ].map((feature) => (
              <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <feature.icon className="mr-2 h-5 w-5 text-indigo-600" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Configuration Options */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Configuration Options</h2>
            <p className="text-lg text-gray-600">
              Customize every aspect of your chatbot widget
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Parameter</th>
                      <th className="text-left p-3 font-semibold">Type</th>
                      <th className="text-left p-3 font-semibold">Default</th>
                      <th className="text-left p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs bg-gray-50">apiHost</td>
                      <td className="p-3">string</td>
                      <td className="p-3 text-gray-500">-</td>
                      <td className="p-3">Required. Your backend API endpoint URL</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs bg-gray-50">headers</td>
                      <td className="p-3">object</td>
                      <td className="p-3 text-gray-500">-</td>
                      <td className="p-3">Optional. Custom headers (e.g., API-KEY, USER-EMAIL)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs bg-gray-50">position</td>
                      <td className="p-3">'left' | 'right'</td>
                      <td className="p-3 text-gray-500">'right'</td>
                      <td className="p-3">Widget position on screen</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs bg-gray-50">primaryColor</td>
                      <td className="p-3">string</td>
                      <td className="p-3 text-gray-500">'#4F46E5'</td>
                      <td className="p-3">Main theme color</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs bg-gray-50">title</td>
                      <td className="p-3">string</td>
                      <td className="p-3 text-gray-500">'Chat Assistant'</td>
                      <td className="p-3">Chat widget title</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs bg-gray-50">enableAudioRecording</td>
                      <td className="p-3">boolean</td>
                      <td className="p-3 text-gray-500">true</td>
                      <td className="p-3">Enable/disable audio recording</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold text-xl">1</span>
                </div>
                <CardTitle>Add Script Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Include React, ReactDOM, and the chatbot embed script in your HTML
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold text-xl">2</span>
                </div>
                <CardTitle>Configure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Initialize the chatbot with your API endpoint and customization options
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold text-xl">3</span>
                </div>
                <CardTitle>Done!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The chatbot appears on your website. Users can start chatting immediately
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* API Request Format */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>API Request Format</CardTitle>
              <CardDescription>
                The chatbot sends requests to your backend in this format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Request Method:</h4>
                  <code className="bg-gray-100 px-2 py-1 rounded">POST</code>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Request Headers:</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Custom headers specified in the <code className="bg-gray-100 px-1 rounded">headers</code> config are automatically included.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Request Body:</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    For text-only messages: JSON format
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-3">
                    <code>{`{
  "question": "user message text"
}`}</code>
                  </pre>
                  <p className="text-sm text-gray-600 mb-2">
                    For messages with files: FormData format
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`question: "user message text"
images: [file objects if images are uploaded]
pdfs: [file objects if documents are uploaded]`}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response Format:</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    The chatbot automatically handles multiple response formats:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li><code className="bg-gray-100 px-1 rounded">data.data.content</code> - Java backend format</li>
                    <li><code className="bg-gray-100 px-1 rounded">data.content</code> - Alternative format</li>
                    <li><code className="bg-gray-100 px-1 rounded">data.response</code> - Xymphony format</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CORS Configuration */}
        <div className="mb-16">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-yellow-600" />
                Important: CORS Configuration
              </CardTitle>
              <CardDescription>
                Make sure your backend server is configured to allow cross-origin requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                Your backend API must include the following CORS headers to allow the chatbot to make requests:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
                <code>{`Access-Control-Allow-Origin: https://your-domain.com
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, API-KEY, USER-EMAIL, Authorization
Access-Control-Allow-Credentials: true`}</code>
              </pre>
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Replace <code className="bg-gray-200 px-1 rounded">your-domain.com</code> with the actual domain where your chatbot is embedded. 
                For local development, use <code className="bg-gray-200 px-1 rounded">http://localhost:3000</code> or your local development URL.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-gray-600">
            Built with ❤️ by <span className="font-semibold">Xymphony</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Open source chatbot embed widget for modern web applications
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

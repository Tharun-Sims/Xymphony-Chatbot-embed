import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, StopCircle, X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, files: File[]) => void;
  onSendFile: (file: File) => void;
  onSendAudio: (audioBlob: Blob) => void;
  disabled: boolean;
  primaryColor?: string;
  placeholderText?: string;
  enableAudioRecording?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onSendAudio,
  disabled, 
  primaryColor = '#4F46E5',
  placeholderText = 'Type your message...',
  enableAudioRecording = true
}) => {
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || uploadedFiles.length > 0) && !disabled) {
      onSendMessage(message, uploadedFiles);
      setMessage('');
      setUploadedFiles([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        onSendAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t border-gray-200 p-3 bg-white"
    >
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {uploadedFiles.map((file, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-gray-100 rounded-lg p-2"
            >
              {file.type.startsWith('image/') ? (
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Preview" 
                  className="w-8 h-8 object-cover rounded"
                />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded">
                  <Paperclip size={16} />
                </div>
              )}
              <span className="text-sm truncate max-w-[100px]">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-opacity-40" 
           style={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholderText}
          disabled={disabled}
          className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
        />
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*,.pdf,.doc,.docx,.txt"
          className="hidden"
          multiple
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-400 hover:text-gray-600"
          disabled={disabled}
        >
          <Paperclip size={18} />
        </button>

        {enableAudioRecording && (
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className="p-2 text-gray-400 hover:text-gray-600"
            disabled={disabled}
            style={{ color: isRecording ? 'red' : undefined }}
          >
            {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
          </button>
        )}

        <button
          type="submit"
          disabled={(!message.trim() && uploadedFiles.length === 0) || disabled}
          className="p-2 rounded-r-lg focus:outline-none transition-opacity disabled:opacity-50"
          style={{ 
            color: (message.trim() || uploadedFiles.length > 0) && !disabled ? primaryColor : '#9CA3AF'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;

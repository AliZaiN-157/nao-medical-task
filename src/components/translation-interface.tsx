"use client";

import { useState } from "react";
import { Mic, Volume2, Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  original: string;
  translated: string;
  fromLanguage: string;
  toLanguage: string;
  timestamp: Date;
}

export default function TranslationInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      original: "Hello, how are you feeling today?",
      translated: "Hola, ¿cómo te sientes hoy?",
      fromLanguage: "en",
      toLanguage: "es",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      original: "I have been experiencing headaches for the past week.",
      translated:
        "He estado experimentando dolores de cabeza durante la última semana.",
      fromLanguage: "es",
      toLanguage: "en",
      timestamp: new Date(),
    },
  ]);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "zh", name: "Mandarin" },
    { code: "ar", name: "Arabic" },
    { code: "ru", name: "Russian" },
    { code: "pt", name: "Portuguese" },
    { code: "hi", name: "Hindi" },
    { code: "bn", name: "Bengali" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "de", name: "German" },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would start the speech recognition
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsTranslating(true);

    // Simulate translation process
    setTimeout(() => {
      setIsTranslating(false);
      // Add a new message
      const newMessage = {
        id: Date.now().toString(),
        original: "I need to check your blood pressure and temperature.",
        translated:
          sourceLanguage === "en" && targetLanguage === "es"
            ? "Necesito revisar su presión arterial y temperatura."
            : "I need to check your blood pressure and temperature.",
        fromLanguage: sourceLanguage,
        toLanguage: targetLanguage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
    }, 2000);
  };

  const handlePlayAudio = (messageId: string) => {
    setIsPlaying(true);
    // In a real implementation, this would play the audio of the translation
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Language Selection */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2 w-1/2">
          <Languages className="h-5 w-5 text-gray-500" />
          <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Source Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 w-1/2">
          <Languages className="h-5 w-5 text-gray-500" />
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Target Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div className="font-medium text-gray-700">
                  {message.fromLanguage === "en" ? "English" : "Spanish"}
                </div>
                <div className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              <p className="text-gray-800">{message.original}</p>

              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="font-medium text-gray-700 mb-1">
                  {message.toLanguage === "en" ? "English" : "Spanish"}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-800">{message.translated}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayAudio(message.id)}
                    disabled={isPlaying}
                  >
                    {isPlaying ? (
                      <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-teal-600" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recording Controls */}
      <div className="p-4 border-t flex justify-center">
        <Button
          className={`rounded-full w-16 h-16 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-teal-600 hover:bg-teal-700"}`}
          onMouseDown={handleStartRecording}
          onMouseUp={handleStopRecording}
          onTouchStart={handleStartRecording}
          onTouchEnd={handleStopRecording}
          disabled={isTranslating}
        >
          {isTranslating ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
        <div className="text-xs text-gray-500 mt-2 text-center">
          {isRecording ? "Release to translate" : "Hold to speak"}
        </div>
      </div>
    </div>
  );
}

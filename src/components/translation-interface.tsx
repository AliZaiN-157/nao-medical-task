"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Volume2, Languages, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  original: string;
  translated: string;
  fromLanguage: string;
  toLanguage: string;
  timestamp: Date;
}

interface LanguageOption {
  code: string;
  name: string;
}

export default function TranslationInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
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

  const languages: LanguageOption[] = [
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

  // Speech recognition setup
  const recognitionRef = useRef<any>(null);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  useEffect(() => {
    // Initialize speech recognition if browser supports it
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // @ts-ignore - WebkitSpeechRecognition is not in the TypeScript types
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    } else {
      setError("Speech recognition is not supported in this browser");
    }
  }, []);

  const handleStartRecording = () => {
    setError(null);
    setTranscript("");
    setIsRecording(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = sourceLanguage;
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
        setError("Failed to start speech recognition");
        setIsRecording(false);
      }
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (transcript) {
      translateText(transcript);
    }
  };

  const translateText = async (text: string) => {
    if (!text.trim()) return;

    setIsTranslating(true);

    try {
      // In a real implementation, this would call an API like OpenAI
      // For now, we'll simulate the translation with a timeout
      setTimeout(() => {
        const translations: Record<string, Record<string, string>> = {
          en: {
            es: "Necesito revisar su presión arterial y temperatura.",
            fr: "Je dois vérifier votre tension artérielle et votre température.",
            de: "Ich muss Ihren Blutdruck und Ihre Temperatur überprüfen.",
          },
          es: {
            en: "I need to check your blood pressure and temperature.",
            fr: "Je dois vérifier votre tension artérielle et votre température.",
            de: "Ich muss Ihren Blutdruck und Ihre Temperatur überprüfen.",
          },
        };

        // Get translation or use original text if no translation available
        const translated =
          translations[sourceLanguage]?.[targetLanguage] || text;

        const newMessage = {
          id: Date.now().toString(),
          original: text,
          translated,
          fromLanguage: sourceLanguage,
          toLanguage: targetLanguage,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setIsTranslating(false);
        setTranscript("");
      }, 1500);
    } catch (err) {
      console.error("Translation error:", err);
      setError("Failed to translate text");
      setIsTranslating(false);
    }
  };

  const handlePlayAudio = (messageId: string, text: string) => {
    if (!synth) {
      setError("Text-to-speech is not supported in this browser");
      return;
    }

    setIsPlaying(messageId);

    const utterance = new SpeechSynthesisUtterance(text);

    // Set the language for the utterance
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      utterance.lang = message.toLanguage;
    }

    utterance.onend = () => {
      setIsPlaying(null);
    };

    utterance.onerror = () => {
      setIsPlaying(null);
      setError("Failed to play audio");
    };

    synth.speak(utterance);
  };

  const getLanguageName = (code: string): string => {
    return languages.find((lang) => lang.code === code)?.name || code;
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

      {/* Error message */}
      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Live transcript */}
      {isRecording && transcript && (
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <p className="text-sm font-medium text-blue-800">Listening...</p>
          <p className="text-gray-800">{transcript}</p>
        </div>
      )}

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div className="font-medium text-gray-700">
                  {getLanguageName(message.fromLanguage)}
                </div>
                <div className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              <p className="text-gray-800">{message.original}</p>

              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="font-medium text-gray-700 mb-1">
                  {getLanguageName(message.toLanguage)}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-800">{message.translated}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handlePlayAudio(message.id, message.translated)
                    }
                    disabled={isPlaying !== null}
                  >
                    {isPlaying === message.id ? (
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
      <div className="p-4 border-t flex flex-col items-center">
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

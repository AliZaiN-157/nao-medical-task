import Link from "next/link";
import { ArrowUpRight, Check, Mic, Languages, Volume2 } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Breaking{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                Language Barriers
              </span>{" "}
              in Healthcare
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Real-time speech translation that bridges communication between
              patients and healthcare providers across multiple languages.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors text-lg font-medium"
              >
                Start Translating
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#languages"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                Supported Languages
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-teal-500" />
                <span>Real-time speech recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-teal-500" />
                <span>Multiple language support</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-teal-500" />
                <span>Audio playback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

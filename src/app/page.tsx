import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Mic,
  Languages,
  Volume2,
  HeartPulse,
  Globe2,
  Clock,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Breaking Language Barriers in Healthcare
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our real-time translation platform helps healthcare providers
              deliver better care by enabling clear communication with patients
              of all backgrounds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="w-6 h-6" />,
                title: "Real-time Speech Recognition",
                description:
                  "Instantly converts spoken language into text as you speak",
              },
              {
                icon: <Languages className="w-6 h-6" />,
                title: "Multilingual Translation",
                description:
                  "Supports multiple languages commonly needed in healthcare settings",
              },
              {
                icon: <Volume2 className="w-6 h-6" />,
                title: "Audio Playback",
                description:
                  "Listen to translations with natural-sounding text-to-speech",
              },
              {
                icon: <HeartPulse className="w-6 h-6" />,
                title: "Medical Terminology",
                description:
                  "Specialized in healthcare vocabulary and medical terms",
              },
              {
                icon: <Globe2 className="w-6 h-6" />,
                title: "Conversation History",
                description:
                  "Maintains context of the entire medical discussion",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Instant Updates",
                description:
                  "WebSocket implementation for immediate transcription display",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="languages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Supported Languages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform supports a wide range of languages to meet the
              diverse needs of healthcare providers and patients.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "English",
              "Spanish",
              "French",
              "Mandarin",
              "Arabic",
              "Russian",
              "Portuguese",
              "Hindi",
              "Bengali",
              "Japanese",
              "Korean",
              "German",
              "Italian",
              "Ukrainian",
              "Vietnamese",
              "Tagalog",
            ].map((language, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm text-center"
              >
                <span className="text-gray-800">{language}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-teal-100">Languages Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-teal-100">Healthcare Facilities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-teal-100">Translation Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Improve Patient Communication?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare providers who are breaking language
            barriers and improving patient care.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Start Translating Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

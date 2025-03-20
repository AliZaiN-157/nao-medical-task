import DashboardNavbar from "@/components/dashboard-navbar";
import TranslationInterface from "@/components/translation-interface";
import { InfoIcon, UserCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Healthcare Translation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Translation Interface */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
            <TranslationInterface />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-teal-600 font-bold mr-2">•</span>
                  <span>
                    Speak clearly and at a normal pace for best results
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-bold mr-2">•</span>
                  <span>
                    Use short sentences for more accurate translations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-bold mr-2">•</span>
                  <span>
                    The conversation history is saved for the duration of your
                    session
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 font-bold mr-2">•</span>
                  <span>
                    Click the speaker icon to have translations read aloud
                  </span>
                </li>
              </ul>
            </div>

            {/* Recent Conversations */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Recent Conversations
              </h2>
              <div className="space-y-3">
                <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Patient Intake</span>
                    <span className="text-xs text-gray-500">
                      Today, 2:30 PM
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">English → Spanish</div>
                </div>
                <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Follow-up Consultation</span>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    English → Mandarin
                  </div>
                </div>
                <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Medication Instructions</span>
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </div>
                  <div className="text-sm text-gray-600">English → Arabic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

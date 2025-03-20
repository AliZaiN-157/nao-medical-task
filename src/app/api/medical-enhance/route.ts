import { NextRequest, NextResponse } from "next/server";
import { enhanceWithMedicalTerminology } from "@/lib/translation-service";

// API endpoint to enhance text with medical terminology
export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    if (!text || !language) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    const enhancedText = enhanceWithMedicalTerminology(text, language);

    return NextResponse.json({
      original: text,
      enhanced: enhancedText,
      language,
    });
  } catch (error) {
    console.error("Medical enhancement error:", error);
    return NextResponse.json(
      { error: "Failed to enhance text with medical terminology" },
      { status: 500 },
    );
  }
}

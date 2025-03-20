import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

// API endpoint to save conversation history to Supabase
export async function POST(request: NextRequest) {
  try {
    const { messages, title } = await request.json();
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Save conversation to Supabase
    const { data, error } = await supabase.from("conversations").insert({
      user_id: user.id,
      title: title || `Conversation ${new Date().toLocaleString()}`,
      messages: messages,
      created_at: new Date().toISOString(),
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Conversation saved successfully",
      data,
    });
  } catch (error) {
    console.error("Save conversation error:", error);
    return NextResponse.json(
      { error: "Failed to save conversation" },
      { status: 500 },
    );
  }
}

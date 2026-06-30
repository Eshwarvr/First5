import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    // In a real app, this would call OpenAI/Gemini API
    // const response = await fetch("https://api.openai.com/v1/chat/completions", { ... })
    
    // Simulating AI classification delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const transcriptLower = transcript.toLowerCase();
    
    let classification = {
      type: "Medical Emergency",
      confidence: 85,
      riskLevel: "Medium",
      action: "Please stay calm. A volunteer is on the way. If you have medical conditions, prepare your medication.",
      hospitalRequired: false,
    };

    if (transcriptLower.includes("heart") || transcriptLower.includes("chest") || transcriptLower.includes("breathe")) {
       classification = {
        type: "Heart Attack",
        confidence: 96,
        riskLevel: "Critical",
        action: "Have the person chew (not swallow whole) an aspirin (325mg) unless allergic. Loosen tight clothing. Prepare for CPR.",
        hospitalRequired: true,
      };
    } else if (transcriptLower.includes("accident") || transcriptLower.includes("crash") || transcriptLower.includes("hit")) {
        classification = {
        type: "Road Accident",
        confidence: 92,
        riskLevel: "High",
        action: "Do not move the injured person unless they are in immediate danger. Apply direct pressure to any bleeding wounds.",
        hospitalRequired: true,
      };
    } else if (transcriptLower.includes("fall") || transcriptLower.includes("slipped")) {
        classification = {
        type: "Fall Injury",
        confidence: 89,
        riskLevel: "Medium",
        action: "Do not try to stand up immediately. Check for broken bones or head injury. Wait for responders.",
        hospitalRequired: false,
      };
    }

    return NextResponse.json(classification);
  } catch (error) {
    return NextResponse.json({ error: "Failed to classify emergency" }, { status: 500 });
  }
}

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      questionEn,
      questionFa,
      stateTag = "Maryland MVA",
      correctAnswerEn,
      correctAnswerFa,
      statuteRef = "Maryland Transportation Code",
      instructorHack = "Vocalize your maneuver and breathe deeply.",
      instructorName = "Sam",
      instructorAvatarUrl = "https://samdrivingschool.org/assets/instructors/sam.jpg",
      targetAspectRatio = "9:16"
    } = body;

    if (!questionEn || typeof questionEn !== "string") {
      return NextResponse.json(
        { error: "Quiz question is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are the Chief Visual Prompt Engineer and Social Media Content Architect for "Sam's Driving School" (samdrivingschool.org, 751 Rockville Pike, Rockville MD 20852).
BRAND IDENTITY:
- Women-owned, led by Sam (Degree in Psychology).
- Zero-yelling, psychological calming, anxiety relief for teen & nervous drivers.
- Modern dual-brake dual-control vehicles.
- Location: Montgomery County MD (Rockville Pike MD-355, Gaithersburg MVA track, White Oak MVA).

CRITICAL DIRECTIVES:
1. INSTRUCTOR CHARACTER PRESERVATION (100% Face & Identity):
   - Always reference the female instructor character (${instructorName}).
   - In Midjourney prompt, include: "--cref ${instructorAvatarUrl} --cw 100 --v 6.1 --style raw".
   - In FLUX prompt, include: "[IP-Adapter Character FaceID: 100% facial structure, expression, and skin tone fidelity to instructor reference]".
   - In Video prompt, include: "Actor consistency: Maintain identical facial structure, warm reassuring coaching expression, zero facial morphing".

2. PRESERVATION OF WRITTEN TEXT & ROAD SIGNAGE ("صدرصد حفظ نوشته ها"):
   - Road signs, limit lines, and vehicle branding MUST have explicit quoted text:
     "door decal clearly displaying 'SAM'S DRIVING SCHOOL • ROCKVILLE, MD'",
     "reflective official sign reading 'STOP' or '${stateTag.toUpperCase()}'".
   - Strictly prohibit distorted or pseudo-language text glyphs.

3. SOCIAL MEDIA FLASHCARD EXPORT:
   - Provide platform-ready copy for Instagram Carousel (Slide 1 Hook, Slide 2 Question, Slide 3 Answer & Law, Slide 4 Sam's Hack), TikTok/Reels retention hook and script, and Facebook educational post.

OUTPUT SCHEMA (Must be strictly valid JSON):
{
  "midjourney_photo": {
    "prompt_template": "string (with {{ASPECT_RATIO}} and {{CREF_PARAM}} placeholders)",
    "text_preservation_directives": "string",
    "lighting_atmosphere": "string",
    "camera_lens": "string"
  },
  "flux_photo": {
    "prompt_template": "string",
    "exact_text_quotes": ["string", "string"],
    "composition": "string"
  },
  "dalle_photo": {
    "prompt_template": "string"
  },
  "video_prompt": {
    "runway_template": "string",
    "camera_movement": "string",
    "sound_design_en": "string",
    "sound_design_fa": "string"
  },
  "social_card_copy": {
    "instagram_carousel": {
      "slide_1_hook": "string",
      "slide_2_question": "string",
      "slide_3_answer": "string",
      "slide_4_sam_hack": "string",
      "caption_en": "string",
      "caption_fa": "string",
      "hashtags": ["#MarylandMVA", "#SamsDrivingSchool"]
    },
    "tiktok_reels_script": {
      "hook_en": "string",
      "hook_fa": "string",
      "on_screen_text": ["string"],
      "spoken_script_en": "string",
      "spoken_script_fa": "string"
    },
    "facebook_post": {
      "headline_en": "string",
      "headline_fa": "string",
      "body_en": "string",
      "body_fa": "string"
    }
  }
}
Return ONLY valid JSON. No Markdown ticks, no introductory prose.`;

    const userContent = `QUIZ QUESTION: "${questionEn}"
PERSIAN QUESTION: "${questionFa || ''}"
STATE / TAG: "${stateTag}"
CORRECT ANSWER: "${correctAnswerEn}"
PERSIAN ANSWER: "${correctAnswerFa || ''}"
LEGAL STATUTE: "${statuteRef}"
SAM'S INSTRUCTOR PASS TIP: "${instructorHack}"
TARGET ASPECT RATIO: "${targetAspectRatio}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${userContent}` }],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const cleaned = responseText
      .replace(/^```json/gi, "")
      .replace(/^```/gi, "")
      .replace(/```$/gi, "")
      .trim();

    const parsedData = JSON.parse(cleaned);

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Error generating quiz prompt:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate quiz prompt" },
      { status: 500 }
    );
  }
}

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      topic,
      mediaType = "both", // 'photo' | 'video' | 'both'
      cameraAngle = "cockpit_pov",
      lensOptics = "35mm_f18",
      lightingMood = "golden_hour",
      aspectRatio = "9:16",
      targetGenerator = "midjourney_runway",
      targetAudience = "teenagers",
    } = body;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are the Lead Visual Prompt Architect and Cinematographer for "Sam's Driving School" (samdrivingschool.org), located at 751 Rockville Pike, Rockville, MD 20852.
BRAND & TECHNICAL IDENTITY:
- Women-owned, founded by Sam (Degree in Psychology).
- Core differentiator: Driving anxiety elimination, zero-yelling instruction, psychological calming (physiological sigh, bilateral steering wheel grounding, verbal confirmation).
- Fleet: Modern dual-brake dual-control certified training cars (clearly showing dual brake pedal on passenger side when inside).
- Certified instructors: Calm female and multilingual (English, Spanish, Farsi).
- Location context: Montgomery County, Rockville Pike (MD-355), Rockville Metro station, Richard Montgomery High, Wootton High, Gaithersburg MVA closed-course track, White Oak MVA.
- Maryland MVA test rules: 50-ft straight backing along yellow curb without touching, reverse 2-point stall parking, 3-second full stop behind stop line with suspension rebound, move over law, school bus stop laws.

TASK:
Craft production-ready, highly detailed image and video generation prompts for this driving educational concept.
You must output strictly valid JSON matching this schema:

{
  "title_en": "string",
  "title_fa": "string",
  "educational_concept_summary_en": "string",
  "educational_concept_summary_fa": "string",
  "photo_prompts": {
    "midjourney_v6": {
      "prompt_en": "string (ultra photorealistic, camera lens, aperture, lighting, Rockville MD context, dual brake/student driver details, --ar 9:16 or selected, --v 6.1 --style raw)",
      "prompt_fa": "string (full Persian translation and explanation of the prompt)",
      "technical_parameters": "string (--ar, --v, --stylize, camera specs)",
      "lighting_and_atmosphere": "string",
      "composition_and_framing": "string"
    },
    "flux_pro": {
      "prompt_en": "string",
      "prompt_fa": "string"
    },
    "dalle3": {
      "prompt_en": "string"
    }
  },
  "video_prompts": {
    "runway_gen3": {
      "prompt_en": "string (cinematic camera trajectory, dolly/pan, vehicle motion, student/instructor expression, Rockville Pike scenery, smooth motion)",
      "prompt_fa": "string (full Persian directorial breakdown and translation)",
      "camera_motion_command": "string (e.g. Smooth dolly-in 24fps, slow pan)",
      "sound_design_sfx_en": "string (audio cues: indicator tick, brake pad engagement, calm breathing)",
      "sound_design_sfx_fa": "string"
    },
    "sora_kling": {
      "prompt_en": "string",
      "prompt_fa": "string"
    }
  },
  "pedagogical_visual_notes": {
    "teaching_goal_en": "string (what the student or parent learns visually from this image/video)",
    "teaching_goal_fa": "string",
    "mva_test_correlation_en": "string (how this connects directly to passing the Maryland MVA test)",
    "mva_test_correlation_fa": "string",
    "psychology_calm_anchor_en": "string (how Sam's psychology approach is visually conveyed)",
    "psychology_calm_anchor_fa": "string"
  }
}

Output ONLY valid JSON. No Markdown ticks, no introductory or concluding chat.`;

    const userPrompt = `Concept/Topic: "${topic}"
Target Media: "${mediaType}"
Camera Angle: "${cameraAngle}"
Lens/Optics: "${lensOptics}"
Lighting/Mood: "${lightingMood}"
Aspect Ratio: "${aspectRatio}"
Target AI Model: "${targetGenerator}"
Target Audience: "${targetAudience}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
        },
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const responseText = response.text || "{}";
    const parsedData = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Media prompt generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate media prompts" },
      { status: 500 }
    );
  }
}

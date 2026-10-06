import { MOCK_QUIZ_QUESTIONS, MockQuizQuestion } from './driving-school-data';

export type AspectRatioType = '9:16' | '1:1' | '4:5' | '1.91:1';

export interface SocialMediaDimensionConfig {
  id: AspectRatioType;
  platform: 'TikTok & IG Stories/Reels' | 'Instagram Square & FB Feed' | 'Instagram Portrait 4:5' | 'Facebook Landscape & Link';
  label_en: string;
  label_fa: string;
  width: number;
  height: number;
  ratio_str: string;
  midjourney_ar: string;
}

export const SOCIAL_DIMENSIONS: SocialMediaDimensionConfig[] = [
  {
    id: '9:16',
    platform: 'TikTok & IG Stories/Reels',
    label_en: '9:16 Vertical Story / Reel / TikTok (1080×1920)',
    label_fa: '۹:۱۶ عمودی ریلز، استوری و تیک‌تاک (۱۰۸۰×۱۹۲۰)',
    width: 1080,
    height: 1920,
    ratio_str: '9:16',
    midjourney_ar: '--ar 9:16'
  },
  {
    id: '1:1',
    platform: 'Instagram Square & FB Feed',
    label_en: '1:1 Square Post / Carousel (1080×1080)',
    label_fa: '۱:۱ مربعی پست اینستاگرام و فیسبوک (۱۰۸۰×۱۰۸۰)',
    width: 1080,
    height: 1080,
    ratio_str: '1:1',
    midjourney_ar: '--ar 1:1'
  },
  {
    id: '4:5',
    platform: 'Instagram Portrait 4:5',
    label_en: '4:5 Portrait Feed (1080×1350)',
    label_fa: '۴:۵ پرتره فید اینستاگرام (۱۰۸۰×۱۳۵۰)',
    width: 1080,
    height: 1350,
    ratio_str: '4:5',
    midjourney_ar: '--ar 4:5'
  },
  {
    id: '1.91:1',
    platform: 'Facebook Landscape & Link',
    label_en: '1.91:1 Landscape Banner / Link (1200×630)',
    label_fa: '۱.۹۱:۱ عریض فیسبوک و وب‌سایت (۱۲۰۰×۶۳۰)',
    width: 1200,
    height: 630,
    ratio_str: '1.91:1',
    midjourney_ar: '--ar 16:9'
  }
];

export interface InstructorCharacterProfile {
  id: string;
  name: string;
  title_en: string;
  title_fa: string;
  description_en: string;
  description_fa: string;
  avatar_url: string;
  is_custom_upload?: boolean;
  cref_token: string;
}

export const PRESET_INSTRUCTORS: InstructorCharacterProfile[] = [
  {
    id: 'sam_founder',
    name: "Sam (Founder & Psychology Lead)",
    title_en: "Founder, Certified MVA Instructor & Psychologist",
    title_fa: "موسس، مربی ارشد و کارشناس روان‌شناسی غلبه بر اضطراب",
    description_en: "Professional woman in her early 30s with gentle confident smile, wearing a professional navy blue polo with 'Sam's Driving School' embroidered badge, warm engaging eyes, calm soothing aura.",
    description_fa: "خانم جوان حرفه‌ای در اوایل دهه ۳۰ سالگی، با لبخند گرم و آرامش‌بخش، لباس سرمه‌ای رسمی با لوگوی آموزشگاه رانندگی سام، چشمان متمرکز و انرژی آرام و مثبت.",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    cref_token: "https://samdrivingschool.org/assets/instructors/sam_lead_character.jpg"
  },
  {
    id: 'maria_bilingual',
    name: "Maria (Bilingual Road Master)",
    title_en: "Senior Instructor & Dual-Brake Specialist",
    title_fa: "مربی ارشد دوزبانه و متخصص تمرین در خیابان‌های اصلی",
    description_en: "Courteous Hispanic/Multilingual female driving instructor with ponytail, warm supportive expression, holding instructor clipboard, standing beside dual-brake Toyota training sedan.",
    description_fa: "مربی خانم باانرژی و صبور با موهای جمع‌شده، فرم آموزشی و کلیپ‌بورد ممتحن در کنار خودروی آموزشی دو پداله.",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    cref_token: "https://samdrivingschool.org/assets/instructors/maria_character.jpg"
  },
  {
    id: 'sarah_mva_prep',
    name: "Sarah (MVA Course Coach)",
    title_en: "Gaithersburg & White Oak Test Track Specialist",
    title_fa: "مربی تخصصی پیست بسته MVA گیترزبرگ و وایت اوک",
    description_en: "Friendly instructor with glasses, approachable demeanor, demonstrating mirror angle adjustments from the passenger seat of modern sedan.",
    description_fa: "مربی مهربان و دقیق با عینک و رویکرد صمیمانه، در حال آموزش تنظیم زاویه آینه‌ها از صندلی شاگرد.",
    avatar_url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    cref_token: "https://samdrivingschool.org/assets/instructors/sarah_character.jpg"
  }
];

export interface QuizPromptRecord {
  id: string;
  quiz_id: string;
  quiz_question_en: string;
  quiz_question_fa: string;
  state_tag: string;
  category?: string;
  category_label_en?: string;
  category_label_fa?: string;
  options_en: string[];
  options_fa: string[];
  correct_index: number;
  correct_answer_en: string;
  correct_answer_fa: string;
  explain_why_en: string;
  explain_why_fa: string;
  statute_reference: string;
  instructor_hack: string;
  
  // Midjourney Prompt Engineering (Character Reference + Text Preservation)
  midjourney_photo: {
    prompt_template: string; // contains {{CREF_PARAM}} and {{ASPECT_RATIO}}
    text_preservation_directives: string;
    lighting_atmosphere: string;
    camera_lens: string;
  };

  // FLUX.1 Pro Prompt Engineering (LoRA / IP-Adapter + Text Rendering)
  flux_photo: {
    prompt_template: string;
    exact_text_quotes: string[];
    composition: string;
  };

  // DALL-E 3 Prompt Engineering
  dalle_photo: {
    prompt_template: string;
  };

  // Runway Gen-3 / Sora Video Prompt
  video_prompt: {
    runway_template: string;
    camera_movement: string;
    sound_design_en: string;
    sound_design_fa: string;
  };

  // Social Media Native Flashcard Text Copy
  social_card_copy: {
    instagram_carousel: {
      slide_1_hook: string;
      slide_2_question: string;
      slide_3_answer: string;
      slide_4_sam_hack: string;
      caption_en: string;
      caption_fa: string;
      hashtags: string[];
    };
    tiktok_reels_script: {
      hook_en: string;
      hook_fa: string;
      on_screen_text: string[];
      spoken_script_en: string;
      spoken_script_fa: string;
    };
    facebook_post: {
      headline_en: string;
      headline_fa: string;
      body_en: string;
      body_fa: string;
    };
  };

  created_at: string;
  is_custom?: boolean;
}

// Generate pre-seeded prompt records for ALL 12 quiz questions
export const PRESEEDED_QUIZ_PROMPTS: QuizPromptRecord[] = MOCK_QUIZ_QUESTIONS.map((q) => {
  const isBacking = q.id.includes('backing') || q.id.includes('curb');
  const isStop = q.id.includes('stop');
  const isAlcohol = q.id.includes('bac') || q.id.includes('foreign');
  const isSpeedOrLaw = q.id.includes('reckless') || q.id.includes('move_over') || q.id.includes('provisional') || q.id.includes('dc');

  const correctAnswerEn = q.options_en[q.correct_index];
  const correctAnswerFa = q.options_fa[q.correct_index];

  return {
    id: `prompt_db_${q.id}`,
    quiz_id: q.id,
    quiz_question_en: q.question_en,
    quiz_question_fa: q.question_fa,
    state_tag: q.state_tag,
    category: q.category || 'mva_maneuvers',
    category_label_en: q.category_label_en || 'MVA Curriculum & Road Skills',
    category_label_fa: q.category_label_fa || 'سرفصل‌های رسمی MVA و مهارت‌های رانندگی',
    options_en: q.options_en,
    options_fa: q.options_fa,
    correct_index: q.correct_index,
    correct_answer_en: correctAnswerEn,
    correct_answer_fa: correctAnswerFa,
    explain_why_en: q.explain_why_en,
    explain_why_fa: q.explain_why_fa,
    statute_reference: q.statute_reference,
    instructor_hack: q.instructor_tip,

    midjourney_photo: {
      prompt_template: `Hyper-realistic editorial automotive educational flashcard photograph. In the modern training sedan passenger seat, female driving instructor Sam (exact facial structure, warm reassuring smile, hair and skin identical to reference character) calmly coaches a teenage driver on ${q.state_tag} rules: "${q.question_en}". Clear view through windshield showing Rockville Maryland streetscape with crisp reflective street signs. Crisp vehicle door lettering displaying "SAM'S DRIVING SCHOOL • ROCKVILLE, MD". Ultra-detailed 8k resolution, authentic lighting, Sony A7R V, 35mm f/1.8 lens {{ASPECT_RATIO}} {{CREF_PARAM}} --cw 100 --v 6.1 --style raw`,
      text_preservation_directives: `Preserve exact legible text on vehicle decal: "SAM'S DRIVING SCHOOL • 751 ROCKVILLE PIKE" and street sign: "${q.state_tag.toUpperCase()} TRAFFIC LAW" with zero AI glyph distortion.`,
      lighting_atmosphere: 'Crisp natural morning sunlight on Rockville Pike with subtle dashboard illumination and zero glare.',
      camera_lens: 'Sony A7R V, 35mm f/1.8 prime lens, shallow depth of field highlighting instructor facial reassurance.'
    },

    flux_photo: {
      prompt_template: `Professional photorealistic driving test flashcard graphic. Subject: Female driving school instructor [Character FaceID: 100% face consistency] with calm encouraging expression in dual-brake car. Scene illustrates legal rule: ${q.statute_reference}. Visible text clearly rendered: "SAM'S DRIVING SCHOOL", "${correctAnswerEn.slice(0, 45)}...". Pavement markings in Montgomery County Maryland are sharp and accurate. High aesthetic quality, 8k, photorealism.`,
      exact_text_quotes: [
        "SAM'S DRIVING SCHOOL",
        "ROCKVILLE, MD",
        q.state_tag,
        "PASS TEST MVA"
      ],
      composition: 'Rule of thirds composition, instructor on the right third, student steering wheel on left, windshield traffic backdrop.'
    },

    dalle_photo: {
      prompt_template: `A photorealistic high-resolution flashcard image showing a calm professional female driving instructor sitting in the passenger seat of a dual-control driving school car in Rockville Maryland, demonstrating traffic safety for: ${q.question_en}. The car door has a clean decal saying "Sam's Driving School". The scene looks welcoming and stress-free.`
    },

    video_prompt: {
      runway_template: `Cinematic 4K 24fps camera dolly shot inside dual-control car on Rockville Pike MD. Instructor Sam [maintain 100% actor facial identity and calm facial expressions across shot] gestures reassuringly towards the road while explaining: "${correctAnswerEn}". Smooth motion, cinematic bokeh, student nods confidently, vehicle glides smoothly.`,
      camera_movement: 'Slow interior tracking dolly from passenger instructor to driver hands on steering wheel.',
      sound_design_en: 'Subtle car engine hum, rhythmic turn signal click, calm instructor voice saying: "Remember to verify the clearance, take a deep breath."',
      sound_design_fa: 'صدای نرم موتور خودرو، تیک‌تیک آرام راهنما، صدای آرام مربی: «آرام نفس بکش، فاصله را با دقت چک کن، عالی بود».'
    },

    social_card_copy: {
      instagram_carousel: {
        slide_1_hook: `🚨 MVA EXAM TRAP: ${q.question_en.slice(0, 60)}...?`,
        slide_2_question: q.question_en,
        slide_3_answer: `✅ CORRECT ANSWER: ${correctAnswerEn}\n\n📖 Legal Basis: ${q.statute_reference}`,
        slide_4_sam_hack: `💡 SAM'S PSYCHOLOGY PASS TIP: ${q.instructor_tip}\n📍 Sam's Driving School, 751 Rockville Pike, Rockville MD`,
        caption_en: `⚠️ Montgomery County Drivers: Don't let this Tri-State law fail your MVA test! ${q.question_en} 👉 Swipe for the legal breakdown and Sam's calming hack! Save this card for test day! 🚗✨ #MarylandMVA #RockvilleMD #DriversEd`,
        caption_fa: `⚠️ تله آزمون رانندگی مریلند و منطقه DMV! آیا جواب درست این قانون ترافیکی را می‌دانستید؟ برای مشاهده پاسخ رسمی طبق کتابچه MVA و تکنیک‌های روان‌شناسی سام ورق بزنید! 🚗`,
        hashtags: ['#MarylandMVA', '#RockvillePike', '#SamsDrivingSchool', '#DMVDrivers', '#DriversLicenseMD', '#TestPrep']
      },
      tiktok_reels_script: {
        hook_en: `90% of students mess this up on their Maryland driving test. Don't be one of them!`,
        hook_fa: `۹۰ درصد داوطلبان این سوال را در آزمون رانندگی مریلند اشتباه پاسخ می‌دهند!`,
        on_screen_text: [
          `MVA QUESTION: ${q.question_en}`,
          `ANSWER: ${correctAnswerEn}`,
          `STATUTE: ${q.statute_reference}`,
          `PASS AT SAM'S DRIVING SCHOOL`
        ],
        spoken_script_en: `Here is the trick: ${q.question_en} The law says ${correctAnswerEn}. At Sam's Driving School in Rockville, we drill this with zero yelling so you pass on your first try!`,
        spoken_script_fa: `نکته کلیدی اینجاست: طبق قانون ${q.statute_reference}، پاسخ صحیح این است: ${correctAnswerFa}. در آموزشگاه سام در راکویل بدون استرس و داد و بیداد امتحان را در اولین تلاش قبول شوید!`
      },
      facebook_post: {
        headline_en: `MVA Rule Spotlight: ${q.question_en}`,
        headline_fa: `بررسی قانون رسمی آزمون MVA: ${q.question_fa}`,
        body_en: `Preparing for your Maryland Driver Skills Test at Gaithersburg or White Oak? Here is a common scenario applicants get caught on: ${q.question_en}\n\nThe correct legal answer is: ${correctAnswerEn} (${q.statute_reference}).\n\nAt Sam's Driving School (751 Rockville Pike, Rockville MD), we specialize in driving anxiety relief with certified female instructors and dual-control cars. Call us or visit samdrivingschool.org to book your BTW lessons!`,
        body_fa: `در حال آماده شدن برای آزمون رانندگی MVA مریلند در شعب گیترزبرگ یا وایت اوک هستید؟ این سوال یکی از پرتکرارترین موارد آزمون است.\n\nپاسخ صحیح: ${correctAnswerFa} (طبق ماده قانونی ${q.statute_reference}).\n\nآموزشگاه رانندگی سام در راکویل مریلند (۷۵۱ Rockville Pike) با مربیان مجرب خانم، ناوگان دو پداله و تکنیک‌های روان‌شناسی آرامش ذهن در خدمت شماست. samdrivingschool.org`
      }
    },

    created_at: new Date().toISOString()
  };
});

// Client Storage Key
const PROMPTS_DB_STORAGE_KEY = 'sams_mva_quiz_prompts_db_v5';
const INSTRUCTOR_PROFILE_STORAGE_KEY = 'sams_active_instructor_character_v5';

export function getQuizPromptsDatabase(): QuizPromptRecord[] {
  if (typeof window === 'undefined') return PRESEEDED_QUIZ_PROMPTS;
  try {
    const raw = localStorage.getItem(PROMPTS_DB_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROMPTS_DB_STORAGE_KEY, JSON.stringify(PRESEEDED_QUIZ_PROMPTS));
      return PRESEEDED_QUIZ_PROMPTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // If cached list is smaller than preseeded questions, merge any missing preseeded records
      if (parsed.length < PRESEEDED_QUIZ_PROMPTS.length) {
        const existingIds = new Set(parsed.map((p: QuizPromptRecord) => p.quiz_id));
        const missing = PRESEEDED_QUIZ_PROMPTS.filter((p) => !existingIds.has(p.quiz_id));
        const merged = [...parsed, ...missing];
        localStorage.setItem(PROMPTS_DB_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading quiz prompts db:', err);
  }
  return PRESEEDED_QUIZ_PROMPTS;
}

export function saveQuizPromptToDatabase(record: QuizPromptRecord): QuizPromptRecord[] {
  if (typeof window === 'undefined') return [record];
  try {
    const existing = getQuizPromptsDatabase();
    const index = existing.findIndex((p) => p.id === record.id);
    let updated: QuizPromptRecord[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = record;
    } else {
      updated = [record, ...existing];
    }
    localStorage.setItem(PROMPTS_DB_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save quiz prompt to database:', err);
    return [];
  }
}

export function deleteQuizPromptFromDatabase(id: string): QuizPromptRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getQuizPromptsDatabase();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(PROMPTS_DB_STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Failed to delete prompt from database:', err);
    return [];
  }
}

export function resetQuizPromptsDatabase(): QuizPromptRecord[] {
  if (typeof window === 'undefined') return PRESEEDED_QUIZ_PROMPTS;
  try {
    localStorage.setItem(PROMPTS_DB_STORAGE_KEY, JSON.stringify(PRESEEDED_QUIZ_PROMPTS));
  } catch (err) {
    console.error('Failed to reset db:', err);
  }
  return PRESEEDED_QUIZ_PROMPTS;
}

export function getActiveInstructorProfile(): InstructorCharacterProfile {
  if (typeof window === 'undefined') return PRESET_INSTRUCTORS[0];
  try {
    const raw = localStorage.getItem(INSTRUCTOR_PROFILE_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
  return PRESET_INSTRUCTORS[0];
}

export function saveActiveInstructorProfile(profile: InstructorCharacterProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(INSTRUCTOR_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error(e);
  }
}

// Format Midjourney prompt with active character reference URL/token and target aspect ratio
export function formatMidjourneyPromptWithCharacter(
  template: string,
  instructor: InstructorCharacterProfile,
  dimension: AspectRatioType
): string {
  const dim = SOCIAL_DIMENSIONS.find((d) => d.id === dimension) || SOCIAL_DIMENSIONS[0];
  const crefPart = `--cref ${instructor.cref_token || instructor.avatar_url}`;
  
  return template
    .replace('{{CREF_PARAM}}', crefPart)
    .replace('{{ASPECT_RATIO}}', dim.midjourney_ar);
}

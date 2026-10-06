'use client';

import React, { useState, useRef } from 'react';
import {
  Layers,
  Camera,
  Video,
  Download,
  Copy,
  Check,
  Sparkles,
  Upload,
  UserCheck,
  Shield,
  Award,
  Database,
  RefreshCw,
  Search,
  Sliders,
  Eye,
  Share2,
  FileJson,
  CheckCircle2,
  HeartHandshake,
  Car,
  Globe,
  Phone,
  Flame,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Zap,
  Bookmark,
  Compass,
  FileText
} from 'lucide-react';
import {
  AspectRatioType,
  SOCIAL_DIMENSIONS,
  InstructorCharacterProfile,
  PRESET_INSTRUCTORS,
  QuizPromptRecord,
  PRESEEDED_QUIZ_PROMPTS,
  getQuizPromptsDatabase,
  saveQuizPromptToDatabase,
  resetQuizPromptsDatabase,
  getActiveInstructorProfile,
  saveActiveInstructorProfile,
  formatMidjourneyPromptWithCharacter
} from '@/lib/quiz-prompts-db';

interface QuizSocialFlashcardStudioProps {
  languageMode: 'bilingual' | 'en' | 'fa';
}

export type CardThemeType = 'gold' | 'navy' | 'rose' | 'emerald';
export type CardLanguageType = 'bilingual' | 'en' | 'fa';
export type CarouselSlideIndex = 1 | 2 | 3 | 4 | 5;

export interface CarouselSlideConfig {
  index: CarouselSlideIndex;
  title_en: string;
  title_fa: string;
  badge_en: string;
  badge_fa: string;
  tagline_en: string;
  tagline_fa: string;
}

export const CAROUSEL_SLIDES: CarouselSlideConfig[] = [
  {
    index: 1,
    title_en: 'Slide 1: Hook & Topic Cover',
    title_fa: 'صفحه ۱: کاور پست و قلاب جذب',
    badge_en: 'COVER & HOOK',
    badge_fa: 'کاور جذاب و چالش',
    tagline_en: 'Can you pass this Maryland MVA test scenario?',
    tagline_fa: 'آیا می‌توانید به این سوال تستی MVA پاسخ درست دهید؟'
  },
  {
    index: 2,
    title_en: 'Slide 2: Practice Question & 4 Options',
    title_fa: 'صفحه ۲: سوال و گزینه‌های استاندارد',
    badge_en: 'PRACTICE QUESTION',
    badge_fa: 'سوال و گزینه‌های تستی',
    tagline_en: 'Select the legally compliant choice (A, B, C, or D)',
    tagline_fa: 'گزینه صحیح و قانونی را انتخاب کنید (الف، ب، ج یا د)'
  },
  {
    index: 3,
    title_en: 'Slide 3: Official Answer & Legal Statute',
    title_fa: 'صفحه ۳: پاسخ رسمی و ماده قانونی',
    badge_en: 'VERIFIED ANSWER',
    badge_fa: 'پاسخ رسمی و استناد قانونی',
    tagline_en: 'Official Maryland / Tri-State Code compliance',
    tagline_fa: 'پاسخ تایید شده طبق ماده قانونی رسمی ایالت'
  },
  {
    index: 4,
    title_en: 'Slide 4: Examiner Deep Dive & Gotchas',
    title_fa: 'صفحه ۴: تحلیل تشریحی و خطاهای بحرانی',
    badge_en: 'EXAMINER ANALYSIS',
    badge_fa: 'تحلیل ممتحن و خطاهای ردی',
    tagline_en: 'Why this law exists and common test failure traps',
    tagline_fa: 'تحلیل چرایی قانون و تله‌های ردی در پیست آزمون'
  },
  {
    index: 5,
    title_en: "Slide 5: Sam's Psychology Hack & School Info",
    title_fa: 'صفحه ۵: تکنیک آرامش ذهن و ثبت‌نام',
    badge_en: 'PSYCHOLOGY HACK',
    badge_fa: 'آرامش ذهن و آموزشگاه',
    tagline_en: 'Physiological sigh anxiety relief & dual-brake coaching',
    tagline_fa: 'تخلیه اضطراب پشت فرمان و خدمات آموزشگاه سام'
  }
];

export default function QuizSocialFlashcardStudio({
  languageMode: appLanguageMode
}: QuizSocialFlashcardStudioProps) {
  // Database of quiz prompt records with lazy state initializers
  const [dbRecords, setDbRecords] = useState<QuizPromptRecord[]>(() => getQuizPromptsDatabase());
  const [selectedRecordId, setSelectedRecordId] = useState<string>(() => {
    const list = getQuizPromptsDatabase();
    return list[0]?.id || '';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStateTag, setFilterStateTag] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Instructor profile & face preservation
  const [instructor, setInstructor] = useState<InstructorCharacterProfile>(() => getActiveInstructorProfile());
  const [customPhotoPreview, setCustomPhotoPreview] = useState<string | null>(() => {
    const active = getActiveInstructorProfile();
    return active.is_custom_upload ? active.avatar_url : null;
  });

  // Social media dimension
  const [activeDimension, setActiveDimension] = useState<AspectRatioType>('9:16');
  
  // Multi-page carousel slide index (1 to 5)
  const [activeSlide, setActiveSlide] = useState<CarouselSlideIndex>(1);

  // Luxury Card Styling & Language selection
  const [cardTheme, setCardTheme] = useState<CardThemeType>('gold');
  const [cardLanguage, setCardLanguage] = useState<CardLanguageType>('bilingual');

  // Sub tabs: Visual Card Export vs AI Prompts vs Social Captions
  const [activeTab, setActiveTab] = useState<'card_preview' | 'ai_prompts' | 'social_copy'>('card_preview');

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // AI Generation on demand
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  // Export status
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [batchProgress, setBatchProgress] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentRecord = dbRecords.find((r) => r.id === selectedRecordId) || dbRecords[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  // Instructor photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setCustomPhotoPreview(result);
      const customProfile: InstructorCharacterProfile = {
        id: `custom_instructor_${Date.now()}`,
        name: 'Custom Instructor (Uploaded Face)',
        title_en: 'Uploaded Certified Instructor Character',
        title_fa: 'شخصیت آپلود شده مربی با حفظ ۱۰۰٪ چهره',
        description_en: 'Custom uploaded instructor image with facial structure locked via Midjourney --cref and FLUX IP-Adapter.',
        description_fa: 'تصویر اختصاصی مربی با انطباق چهره و جلوگیری از تغییر قیافه در تولید هوش مصنوعی.',
        avatar_url: result,
        is_custom_upload: true,
        cref_token: result
      };
      setInstructor(customProfile);
      saveActiveInstructorProfile(customProfile);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetInstructor = (p: InstructorCharacterProfile) => {
    setInstructor(p);
    setCustomPhotoPreview(null);
    saveActiveInstructorProfile(p);
  };

  // Generate / update AI prompt for currently selected quiz with Gemini API
  const handleRegenerateWithGemini = async () => {
    if (!currentRecord) return;
    setIsGeneratingAi(true);
    setGenerationNotice(null);

    try {
      const res = await fetch('/api/generate-quiz-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionEn: currentRecord.quiz_question_en,
          questionFa: currentRecord.quiz_question_fa,
          stateTag: currentRecord.state_tag,
          correctAnswerEn: currentRecord.correct_answer_en,
          correctAnswerFa: currentRecord.correct_answer_fa,
          statuteRef: currentRecord.statute_reference,
          instructorHack: currentRecord.instructor_hack,
          instructorName: instructor.name,
          instructorAvatarUrl: instructor.cref_token || instructor.avatar_url,
          targetAspectRatio: activeDimension
        })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate prompt');
      }

      const updatedRecord: QuizPromptRecord = {
        ...currentRecord,
        midjourney_photo: json.data.midjourney_photo || currentRecord.midjourney_photo,
        flux_photo: json.data.flux_photo || currentRecord.flux_photo,
        dalle_photo: json.data.dalle_photo || currentRecord.dalle_photo,
        video_prompt: json.data.video_prompt || currentRecord.video_prompt,
        social_card_copy: json.data.social_card_copy || currentRecord.social_card_copy,
        is_custom: true
      };

      const newDb = saveQuizPromptToDatabase(updatedRecord);
      setDbRecords(newDb);
      setGenerationNotice(
        appLanguageMode === 'fa'
          ? 'پرامپت جدید با چهره مربی و حفظ نوشته‌ها در دیتابیس ثبت شد!'
          : 'New prompt registered in database with 100% instructor face lock!'
      );
    } catch (err: any) {
      console.error(err);
      setGenerationNotice(`Error: ${err.message || 'Generation failed'}`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Reset database to default pre-seeded quiz records
  const handleResetDb = () => {
    if (confirm(appLanguageMode === 'fa' ? `آیا مایل به بازگردانی دیتابیس به ${PRESEEDED_QUIZ_PROMPTS.length} سرفصل پیش‌فرض آموزشی هستید؟` : `Reset database to ${PRESEEDED_QUIZ_PROMPTS.length} pre-seeded curriculum records?`)) {
      const reset = resetQuizPromptsDatabase();
      setDbRecords(reset);
      setSelectedRecordId(reset[0]?.id || '');
    }
  };

  // Export Database as JSON
  const handleExportDbJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dbRecords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sams_driving_school_curriculum_prompts_db_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // ==========================================
  // HIGH-RESOLUTION CANVAS RENDERER FOR 5 SLIDES (FIXED GEOMETRY FOR ALL RATIOS)
  // ==========================================
  const renderSlideToCanvas = (
    record: QuizPromptRecord,
    slideNum: CarouselSlideIndex,
    dimension: AspectRatioType,
    theme: CardThemeType,
    lang: CardLanguageType
  ): HTMLCanvasElement | null => {
    const dimConfig = SOCIAL_DIMENSIONS.find((d) => d.id === dimension) || SOCIAL_DIMENSIONS[0];
    const canvas = document.createElement('canvas');
    canvas.width = dimConfig.width;
    canvas.height = dimConfig.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const { width, height } = canvas;
    const isLandscape = dimension === '1.91:1';
    const isSquare = dimension === '1:1';
    const isPortrait = dimension === '4:5';
    const isVertical = dimension === '9:16';

    // Theme color palette
    let bgStart = '#09090b';
    let bgMid = '#18181b';
    let bgEnd = '#000000';
    let accentPrimary = '#facc15'; // Gold
    let accentGlow = 'rgba(250, 204, 21, 0.15)';
    let borderOuter = '#eab308';
    let badgeBg = '#854d0e';
    let badgeText = '#fef08a';

    if (theme === 'navy') {
      bgStart = '#020b1e';
      bgMid = '#0a192f';
      bgEnd = '#020617';
      accentPrimary = '#38bdf8'; // Cyan
      accentGlow = 'rgba(56, 189, 248, 0.15)';
      borderOuter = '#0284c7';
      badgeBg = '#0369a1';
      badgeText = '#e0f2fe';
    } else if (theme === 'rose') {
      bgStart = '#14031d';
      bgMid = '#1e082b';
      bgEnd = '#0a010f';
      accentPrimary = '#fb7185'; // Rose
      accentGlow = 'rgba(251, 113, 133, 0.15)';
      borderOuter = '#f43f5e';
      badgeBg = '#be123c';
      badgeText = '#ffe4e6';
    } else if (theme === 'emerald') {
      bgStart = '#02231c';
      bgMid = '#064e3b';
      bgEnd = '#011410';
      accentPrimary = '#34d399'; // Emerald
      accentGlow = 'rgba(52, 211, 153, 0.15)';
      borderOuter = '#10b981';
      badgeBg = '#047857';
      badgeText = '#d1fae5';
    }

    // 1. Draw Background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, bgStart);
    bgGradient.addColorStop(0.5, bgMid);
    bgGradient.addColorStop(1, bgEnd);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Radial flare glow
    const flare = ctx.createRadialGradient(width / 2, height * 0.4, 50, width / 2, height * 0.4, width * 0.6);
    flare.addColorStop(0, accentGlow);
    flare.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = flare;
    ctx.fillRect(0, 0, width, height);

    // 2. Outer Luxury Double Border
    const pad = Math.round(width * (isLandscape ? 0.016 : isSquare ? 0.022 : 0.025));
    ctx.strokeStyle = borderOuter;
    ctx.lineWidth = Math.max(5, Math.round(width * 0.005));
    ctx.beginPath();
    ctx.roundRect(pad, pad, width - pad * 2, height - pad * 2, isLandscape ? 20 : 30);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(pad + 8, pad + 8, width - (pad + 8) * 2, height - (pad + 8) * 2, isLandscape ? 16 : 24);
    ctx.stroke();

    // Text Wrap Helper
    const wrapText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      maxLines = 6,
      align: CanvasTextAlign = 'center'
    ) => {
      ctx.textAlign = align;
      const words = text.split(' ');
      let line = '';
      let currentY = y;
      let lineCount = 0;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
          lineCount++;
          if (lineCount >= maxLines) {
            ctx.fillText((line + '...').trim(), x, currentY);
            return currentY + lineHeight;
          }
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, currentY);
      return currentY + lineHeight;
    };

    const slideInfo = CAROUSEL_SLIDES[slideNum - 1];
    const bannerLabel = lang === 'fa'
      ? `${record.state_tag.toUpperCase()} • ${slideInfo.badge_fa} (${slideNum}/۵)`
      : `${record.state_tag.toUpperCase()} • ${slideInfo.badge_en} (SLIDE ${slideNum}/5)`;

    // ==========================================
    // 3. HEADER RENDERING (ADAPTIVE PER ASPECT RATIO)
    // ==========================================
    if (isLandscape) {
      // 1.91:1 Landscape: Compact Top Header Bar
      const logoRadius = 22;
      const logoX = 60;
      const logoY = 46;

      ctx.save();
      ctx.beginPath();
      ctx.arc(logoX, logoY, logoRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = accentPrimary;
      ctx.stroke();

      // Shield Emblem
      ctx.fillStyle = accentPrimary;
      ctx.beginPath();
      const sw = logoRadius * 0.7;
      const sh = logoRadius * 0.85;
      ctx.moveTo(logoX, logoY - sh * 0.6);
      ctx.lineTo(logoX + sw * 0.7, logoY - sh * 0.3);
      ctx.lineTo(logoX + sw * 0.6, logoY + sh * 0.4);
      ctx.lineTo(logoX, logoY + sh * 0.8);
      ctx.lineTo(logoX - sw * 0.6, logoY + sh * 0.4);
      ctx.lineTo(logoX - sw * 0.7, logoY - sh * 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText("SAM'S DRIVING SCHOOL", logoX + 32, logoY - 2);

      ctx.fillStyle = accentPrimary;
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText("ROCKVILLE, MD • VOTED BEST OF 2025 • DUAL-CONTROL FLEET", logoX + 32, logoY + 18);

      // Slide Indicator Pill at Top Right
      const pillW = 430;
      const pillH = 38;
      const pillX = width - pillW - 40;
      const pillY = 28;

      ctx.fillStyle = badgeBg;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 12);
      ctx.fill();
      ctx.strokeStyle = accentPrimary;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = badgeText;
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(bannerLabel, pillX + pillW / 2, pillY + 24);

    } else {
      // 9:16, 4:5, 1:1 Vertical / Square: Centered Luxury Crest
      const logoRadius = isVertical ? 46 : isPortrait ? 40 : 34;
      const logoY = isVertical ? 135 : isPortrait ? 100 : 75;

      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, logoY, logoRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = accentPrimary;
      ctx.stroke();

      // Shield Emblem inside Crest
      ctx.fillStyle = accentPrimary;
      ctx.beginPath();
      const sw = logoRadius * 0.7;
      const sh = logoRadius * 0.85;
      ctx.moveTo(width / 2, logoY - sh * 0.6);
      ctx.lineTo(width / 2 + sw * 0.7, logoY - sh * 0.3);
      ctx.lineTo(width / 2 + sw * 0.6, logoY + sh * 0.4);
      ctx.lineTo(width / 2, logoY + sh * 0.8);
      ctx.lineTo(width / 2 - sw * 0.6, logoY + sh * 0.4);
      ctx.lineTo(width / 2 - sw * 0.7, logoY - sh * 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      const titleFontSize = isVertical ? 38 : isPortrait ? 32 : 28;
      const subFontSize = isVertical ? 18 : isPortrait ? 16 : 14;

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${titleFontSize}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText("SAM'S DRIVING SCHOOL", width / 2, logoY + logoRadius + (isVertical ? 36 : 30));

      ctx.fillStyle = accentPrimary;
      ctx.font = `bold ${subFontSize}px system-ui, sans-serif`;
      ctx.fillText("ROCKVILLE, MD • VOTED BEST OF 2025 • DUAL-CONTROL FLEET", width / 2, logoY + logoRadius + (isVertical ? 65 : 55));

      // Slide Pill
      const pillY = isVertical ? 320 : isPortrait ? 250 : 205;
      const pillW = width * (isVertical ? 0.78 : 0.72);
      const pillH = isVertical ? 66 : isPortrait ? 56 : 48;

      ctx.fillStyle = badgeBg;
      ctx.beginPath();
      ctx.roundRect(width / 2 - pillW / 2, pillY, pillW, pillH, 14);
      ctx.fill();
      ctx.strokeStyle = accentPrimary;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = badgeText;
      ctx.font = `bold ${isVertical ? 22 : isPortrait ? 18 : 16}px system-ui, sans-serif`;
      ctx.fillText(bannerLabel, width / 2, pillY + pillH * 0.64);
    }

    // ==========================================
    // 4. CONTENT RENDERING: 1.91:1 WIDESCREEN 2-COLUMN LAYOUT
    // ==========================================
    if (isLandscape) {
      const colLeftX = 45;
      const colLeftW = 535;
      const colLeftCenter = colLeftX + colLeftW / 2;

      const colRightX = 620;
      const colRightW = 535;
      const colRightCenter = colRightX + colRightW / 2;

      const bodyY = 96;
      const bodyH = 475;

      if (slideNum === 1) {
        // Slide 1 (1.91:1): Hook on Left, Full Question on Right
        // Left Column: Hook & Swipe prompt
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(colLeftX, bodyY, colLeftW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = accentPrimary;
        ctx.font = 'bold 20px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '🔥 سوال پرتکرار آزمون MVA' : '🔥 CRITICAL MVA EXAM CHALLENGE', colLeftCenter, bodyY + 60);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '15px system-ui';
        ctx.fillText(lang === 'fa' ? 'آموزشگاه رانندگی سام • راکویل مریلند' : "Sam's Driving School • Rockville, MD", colLeftCenter, bodyY + 95);

        // Big Swipe Prompt Box
        ctx.fillStyle = 'rgba(250, 204, 21, 0.12)';
        ctx.beginPath();
        ctx.roundRect(colLeftX + 30, bodyY + 160, colLeftW - 60, 240, 16);
        ctx.fill();
        ctx.strokeStyle = accentPrimary;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = accentPrimary;
        ctx.font = 'bold 22px system-ui';
        ctx.fillText(lang === 'fa' ? '👉 ورق بزنید' : '👉 SWIPE TO TEST', colLeftCenter, bodyY + 240);

        ctx.fillStyle = '#ffffff';
        ctx.font = '15px system-ui';
        ctx.fillText(lang === 'fa' ? 'گزینه‌های آزمون و پاسخ رسمی MVA' : 'Multiple choices & verified answer', colLeftCenter, bodyY + 285);
        ctx.fillText(lang === 'fa' ? 'همراه با تحلیل ممتحن و متد سام' : 'With examiner analysis & psychology tips', colLeftCenter, bodyY + 325);

        // Right Column: Question Content
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.roundRect(colRightX, bodyY, colRightW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = accentPrimary;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = accentPrimary;
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '📖 متن چالش ترافیکی:' : '📖 OFFICIAL SCENARIO:', colRightCenter, bodyY + 45);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px system-ui';
        let qY = bodyY + 95;
        if (lang === 'en' || lang === 'bilingual') {
          qY = wrapText(record.quiz_question_en, colRightCenter, qY, colRightW - 40, 32, 4);
        }
        if (lang === 'fa' || lang === 'bilingual') {
          ctx.fillStyle = '#e2e8f0';
          ctx.font = 'bold 20px system-ui';
          wrapText(record.quiz_question_fa, colRightCenter, qY + 15, colRightW - 40, 30, 4);
        }

      } else if (slideNum === 2) {
        // Slide 2 (1.91:1): Question on Left, 2x2 Grid of 4 Choices on Right
        // Left Column: Question
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(colLeftX, bodyY, colLeftW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = accentPrimary;
        ctx.font = 'bold 18px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '❓ صورت سوال تستی MVA' : '❓ QUESTION SCENARIO', colLeftCenter, bodyY + 45);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 21px system-ui';
        const qTxt = lang === 'fa' ? record.quiz_question_fa : record.quiz_question_en;
        const afterQ = wrapText(qTxt, colLeftCenter, bodyY + 95, colLeftW - 40, 30, 5);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 14px system-ui';
        ctx.fillText(lang === 'fa' ? 'کدام گزینه پاسخ صحیح است؟' : 'Which choice is legally correct?', colLeftCenter, afterQ + 30);

        // Right Column: 2x2 Grid of Options
        const letters = ['A', 'B', 'C', 'D'];
        const farsiLetters = ['الف', 'ب', 'ج', 'د'];
        const optW = 255;
        const optH = 215;
        const gapX = 25;
        const gapY = 25;

        for (let i = 0; i < 4; i++) {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const boxX = colRightX + col * (optW + gapX);
          const boxY = bodyY + 10 + row * (optH + gapY);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, optW, optH, 14);
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Letter Badge
          ctx.fillStyle = accentPrimary;
          ctx.beginPath();
          ctx.arc(boxX + 28, boxY + 28, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#000000';
          ctx.font = 'bold 14px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(lang === 'fa' ? farsiLetters[i] : letters[i], boxX + 28, boxY + 33);

          // Option Text
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px system-ui';
          const optStr = lang === 'fa' ? record.options_fa[i] : record.options_en[i];
          wrapText(optStr || '', boxX + optW / 2, boxY + 68, optW - 24, 20, 5);
        }

      } else if (slideNum === 3) {
        // Slide 3 (1.91:1): Verified Answer on Left, Legal Statute on Right
        // Left Column: Emerald Answer Box
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.beginPath();
        ctx.roundRect(colLeftX, bodyY, colLeftW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 20px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '✅ پاسخ رسمی مورد تایید MVA' : '✅ OFFICIAL MVA VERIFIED ANSWER', colLeftCenter, bodyY + 50);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px system-ui';
        const ansTxt = lang === 'fa' ? record.correct_answer_fa : record.correct_answer_en;
        wrapText(ansTxt, colLeftCenter, bodyY + 130, colLeftW - 50, 34, 6);

        // Right Column: Legal Statute Box
        ctx.fillStyle = 'rgba(250, 204, 21, 0.08)';
        ctx.beginPath();
        ctx.roundRect(colRightX, bodyY, colRightW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 20px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('⚖️ LEGAL STATUTE & CODE', colRightCenter, bodyY + 50);

        ctx.fillStyle = accentPrimary;
        ctx.font = 'bold 22px system-ui';
        wrapText(record.statute_reference, colRightCenter, bodyY + 120, colRightW - 50, 30, 3);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '16px system-ui';
        wrapText(
          lang === 'fa'
            ? 'رعایت این ماده قانونی در تمام جاده‌های مریلند الزامی است. عدم رعایت در آزمون رانندگی موجب ردی درجا می‌گردد.'
            : 'Strict statutory compliance required across all Maryland roadways. Non-compliance results in automatic road test disqualification.',
          colRightCenter,
          bodyY + 240,
          colRightW - 50,
          26,
          4
        );

      } else if (slideNum === 4) {
        // Slide 4 (1.91:1): Examiner Analysis on Left, Gotcha on Right
        // Left Column: Examiner Analysis
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(colLeftX, bodyY, colLeftW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = accentPrimary;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = accentPrimary;
        ctx.font = 'bold 18px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '📖 تحلیل ممتحن: چرا این قانون مهم است؟' : '📖 EXAMINER ANALYSIS: WHY THIS MATTERS', colLeftCenter, bodyY + 45);

        ctx.fillStyle = '#ffffff';
        ctx.font = '16px system-ui';
        const whyTxt = lang === 'fa' ? record.explain_why_fa : record.explain_why_en;
        wrapText(whyTxt, colLeftCenter, bodyY + 95, colLeftW - 40, 25, 10);

        // Right Column: Gotcha Failure Trap
        ctx.fillStyle = 'rgba(244, 63, 94, 0.12)';
        ctx.beginPath();
        ctx.roundRect(colRightX, bodyY, colRightW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#fb7185';
        ctx.font = 'bold 20px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '⚠️ خطای بحرانی در امتحان شهر' : '⚠️ CRITICAL MVA GOTCHA FAILURE', colRightCenter, bodyY + 55);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px system-ui';
        wrapText(
          lang === 'fa'
            ? 'داوطلبان در مراکز گیترزبرگ و وایت اوک بیشترین خطا را در این بخش مرتکب می‌شوند. کوچک‌ترین سهل‌انگاری باعث لغو آنی آزمون خواهد شد.'
            : 'Applicants at Gaithersburg & White Oak MVA frequently fail on this specific maneuver. A single lapse triggers instant disqualification.',
          colRightCenter,
          bodyY + 130,
          colRightW - 50,
          28,
          6
        );

      } else if (slideNum === 5) {
        // Slide 5 (1.91:1): Sam's Psychology on Left, School Info & CTA on Right
        // Left Column: Psychology Hack
        ctx.fillStyle = 'rgba(244, 63, 94, 0.12)';
        ctx.beginPath();
        ctx.roundRect(colLeftX, bodyY, colLeftW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#fb7185';
        ctx.font = 'bold 19px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '🧠 متد روان‌شناسی سام برای آرامش ذهن' : "🧠 SAM'S PSYCHOLOGY-LED CALMING HACK", colLeftCenter, bodyY + 45);

        ctx.fillStyle = '#ffffff';
        ctx.font = '17px system-ui';
        wrapText(record.instructor_hack, colLeftCenter, bodyY + 100, colLeftW - 40, 26, 9);

        // Right Column: School CTA
        ctx.fillStyle = 'rgba(250, 204, 21, 0.1)';
        ctx.beginPath();
        ctx.roundRect(colRightX, bodyY, colRightW, bodyH, 18);
        ctx.fill();
        ctx.strokeStyle = accentPrimary;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = accentPrimary;
        ctx.font = 'bold 22px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText("SAM'S DRIVING SCHOOL • ROCKVILLE, MD", colRightCenter, bodyY + 50);

        ctx.fillStyle = '#ffffff';
        ctx.font = '16px system-ui';
        ctx.fillText("36-Hr Drivers Ed ($378) • Behind-the-Wheel ($120)", colRightCenter, bodyY + 110);
        ctx.fillText("MVA Road Test Car Rental with 45-min warm-up ($140)", colRightCenter, bodyY + 150);
        ctx.fillText("3-Hour Alcohol & Drug Program ($90)", colRightCenter, bodyY + 190);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 17px system-ui';
        ctx.fillText("FREE ROCKVILLE METRO STATION PICKUP", colRightCenter, bodyY + 250);

        ctx.fillStyle = accentPrimary;
        ctx.font = 'bold 22px system-ui';
        ctx.fillText("(301) 279-0000 • samdrivingschool.org", colRightCenter, bodyY + 310);
      }

    } else {
      // ==========================================
      // VERTICAL (9:16), PORTRAIT (4:5) & SQUARE (1:1)
      // ==========================================
      const contentTopY = isVertical ? 420 : isPortrait ? 330 : 275;
      const contentMaxH = height - contentTopY - (isVertical ? 120 : isPortrait ? 100 : 80);

      if (slideNum === 1) {
        // Slide 1: Challenge Hook & Cover
        ctx.fillStyle = accentPrimary;
        ctx.font = `bold ${isVertical ? 32 : isPortrait ? 26 : 22}px system-ui`;
        ctx.textAlign = 'center';
        const hookText = lang === 'fa' ? '🔥 سوال پرتکرار آزمون رانندگی مریلند' : '🔥 MARYLAND MVA TEST CHALLENGE';
        ctx.fillText(hookText, width / 2, contentTopY + (isVertical ? 40 : 25));

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${isVertical ? 40 : isPortrait ? 32 : 26}px system-ui`;
        let nextY = contentTopY + (isVertical ? 120 : isPortrait ? 90 : 70);

        if (lang === 'en' || lang === 'bilingual') {
          nextY = wrapText(record.quiz_question_en, width / 2, nextY, width * 0.84, isVertical ? 50 : isPortrait ? 40 : 34, isVertical ? 4 : 3);
        }
        if (lang === 'fa' || lang === 'bilingual') {
          ctx.fillStyle = '#cbd5e1';
          ctx.font = `${isVertical ? 32 : isPortrait ? 26 : 22}px system-ui`;
          wrapText(record.quiz_question_fa, width / 2, nextY + (isVertical ? 30 : 20), width * 0.84, isVertical ? 44 : isPortrait ? 34 : 28, isVertical ? 4 : 3);
        }

        // Swipe Box Prompt
        const ctaH = isVertical ? 120 : isPortrait ? 90 : 75;
        const ctaY = height - ctaH - (isVertical ? 160 : isPortrait ? 120 : 90);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(width * 0.08, ctaY, width * 0.84, ctaH, 18);
        ctx.fill();
        ctx.strokeStyle = accentPrimary;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = accentPrimary;
        ctx.font = `bold ${isVertical ? 26 : isPortrait ? 20 : 17}px system-ui`;
        const ctaTxt = lang === 'fa' ? '👉 برای مشاهده گزینه‌ها و پاسخ ورق بزنید' : '👉 SWIPE FOR OPTIONS & VERIFIED ANSWER';
        ctx.fillText(ctaTxt, width / 2, ctaY + ctaH * 0.58);

      } else if (slideNum === 2) {
        // Slide 2: Question & 4 Multiple Choices
        ctx.fillStyle = accentPrimary;
        ctx.font = `bold ${isVertical ? 28 : isPortrait ? 22 : 18}px system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '❓ متن سوال و گزینه‌ها' : '❓ QUESTION & CHOICES', width / 2, contentTopY + (isVertical ? 30 : 20));

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${isVertical ? 32 : isPortrait ? 26 : 21}px system-ui`;
        const qText = lang === 'fa' ? record.quiz_question_fa : record.quiz_question_en;
        const afterQ = wrapText(qText, width / 2, contentTopY + (isVertical ? 85 : isPortrait ? 65 : 55), width * 0.84, isVertical ? 42 : isPortrait ? 32 : 26, 2);

        // 4 Options Stacked Vertically
        const letters = ['A', 'B', 'C', 'D'];
        const farsiLetters = ['الف', 'ب', 'ج', 'د'];
        const optCount = Math.min(record.options_en.length, 4);

        const startY = afterQ + (isVertical ? 35 : isPortrait ? 25 : 18);
        const optH = isVertical ? 150 : isPortrait ? 110 : 90;
        const optGap = isVertical ? 25 : isPortrait ? 18 : 14;

        for (let i = 0; i < optCount; i++) {
          const itemY = startY + i * (optH + optGap);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.beginPath();
          ctx.roundRect(width * 0.08, itemY, width * 0.84, optH, 16);
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Letter badge
          ctx.fillStyle = accentPrimary;
          ctx.beginPath();
          ctx.arc(width * 0.14, itemY + optH / 2, optH * 0.32, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#000000';
          ctx.font = `bold ${isVertical ? 24 : isPortrait ? 18 : 15}px system-ui`;
          ctx.textAlign = 'center';
          ctx.fillText(lang === 'fa' ? farsiLetters[i] : letters[i], width * 0.14, itemY + optH / 2 + (isVertical ? 8 : 6));

          ctx.fillStyle = '#ffffff';
          ctx.font = `${isVertical ? 24 : isPortrait ? 18 : 15}px system-ui`;
          ctx.textAlign = 'left';
          const optStr = lang === 'fa' ? record.options_fa[i] : record.options_en[i];
          wrapText(optStr || '', width * 0.22, itemY + optH * 0.42, width * 0.68, isVertical ? 30 : isPortrait ? 22 : 18, 2, 'left');
        }

      } else if (slideNum === 3) {
        // Slide 3: Official MVA Answer & Legal Statute
        ctx.fillStyle = '#10b981';
        ctx.font = `bold ${isVertical ? 32 : isPortrait ? 26 : 22}px system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '✅ پاسخ رسمی مورد تایید MVA' : '✅ OFFICIAL MVA VERIFIED ANSWER', width / 2, contentTopY + (isVertical ? 35 : 25));

        // Answer Box
        const ansBoxY = contentTopY + (isVertical ? 80 : isPortrait ? 60 : 45);
        const ansBoxH = isVertical ? 320 : isPortrait ? 250 : 200;

        ctx.fillStyle = 'rgba(16, 185, 129, 0.14)';
        ctx.beginPath();
        ctx.roundRect(width * 0.08, ansBoxY, width * 0.84, ansBoxH, 20);
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#34d399';
        ctx.font = `bold ${isVertical ? 34 : isPortrait ? 28 : 22}px system-ui`;
        const ansTxt = lang === 'fa' ? record.correct_answer_fa : record.correct_answer_en;
        wrapText(ansTxt, width / 2, ansBoxY + ansBoxH * 0.45, width * 0.76, isVertical ? 46 : isPortrait ? 36 : 28, 4);

        // Statute Box
        const statY = ansBoxY + ansBoxH + (isVertical ? 40 : isPortrait ? 30 : 20);
        const statH = isVertical ? 240 : isPortrait ? 180 : 140;

        ctx.fillStyle = 'rgba(250, 204, 21, 0.1)';
        ctx.beginPath();
        ctx.roundRect(width * 0.08, statY, width * 0.84, statH, 18);
        ctx.fill();
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fde047';
        ctx.font = `bold ${isVertical ? 28 : isPortrait ? 22 : 18}px system-ui`;
        ctx.fillText(`⚖️ ${record.statute_reference}`, width / 2, statY + statH * 0.42);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = `${isVertical ? 22 : isPortrait ? 18 : 14}px system-ui`;
        ctx.fillText(
          lang === 'fa' ? 'رعایت این ماده قانونی در تمام جاده‌های مریلند الزامی است' : 'Strict legal compliance required across Maryland roads',
          width / 2,
          statY + statH * 0.75
        );

      } else if (slideNum === 4) {
        // Slide 4: Curriculum Deep Dive & Why It Is Taught
        ctx.fillStyle = accentPrimary;
        ctx.font = `bold ${isVertical ? 30 : isPortrait ? 24 : 20}px system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '📖 تحلیل ممتحن: چرا این قانون تدریس می‌شود؟' : '📖 EXAMINER ANALYSIS: WHY THIS MATTERS', width / 2, contentTopY + (isVertical ? 35 : 25));

        const deepY = contentTopY + (isVertical ? 80 : isPortrait ? 60 : 45);
        const deepH = isVertical ? 720 : isPortrait ? 520 : 410;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.roundRect(width * 0.08, deepY, width * 0.84, deepH, 20);
        ctx.fill();
        ctx.strokeStyle = accentPrimary;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = `${isVertical ? 26 : isPortrait ? 20 : 16}px system-ui`;
        const whyContent = lang === 'fa' ? record.explain_why_fa : record.explain_why_en;
        wrapText(whyContent, width / 2, deepY + (isVertical ? 90 : isPortrait ? 65 : 50), width * 0.76, isVertical ? 38 : isPortrait ? 28 : 22, isVertical ? 12 : 9);

        ctx.fillStyle = '#fda4af';
        ctx.font = `bold ${isVertical ? 24 : isPortrait ? 19 : 15}px system-ui`;
        ctx.fillText(
          lang === 'fa' ? '⚠️ عدم رعایت در امتحان شهر = کسر امتیاز یا ردی فوری' : '⚠️ Failure to comply during MVA test = Automatic disqualification',
          width / 2,
          deepY + deepH - (isVertical ? 45 : 30)
        );

      } else if (slideNum === 5) {
        // Slide 5: Sam's Psychology Hack & School CTA
        ctx.fillStyle = '#f43f5e';
        ctx.font = `bold ${isVertical ? 30 : isPortrait ? 24 : 20}px system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText(lang === 'fa' ? '🧠 متد روان‌شناسی سام برای غلبه بر اضطراب' : "🧠 SAM'S PSYCHOLOGY-LED CALMING HACK", width / 2, contentTopY + (isVertical ? 35 : 25));

        const hackY = contentTopY + (isVertical ? 75 : isPortrait ? 55 : 40);
        const hackH = isVertical ? 340 : isPortrait ? 240 : 190;

        ctx.fillStyle = 'rgba(244, 63, 94, 0.12)';
        ctx.beginPath();
        ctx.roundRect(width * 0.08, hackY, width * 0.84, hackH, 20);
        ctx.fill();
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = `${isVertical ? 26 : isPortrait ? 20 : 16}px system-ui`;
        wrapText(record.instructor_hack, width / 2, hackY + (isVertical ? 80 : isPortrait ? 55 : 45), width * 0.76, isVertical ? 40 : isPortrait ? 28 : 22, 5);

        // School Booking CTA Box
        const ctaY = hackY + hackH + (isVertical ? 40 : isPortrait ? 25 : 18);
        const ctaH = isVertical ? 360 : isPortrait ? 260 : 210;

        ctx.fillStyle = 'rgba(250, 204, 21, 0.1)';
        ctx.beginPath();
        ctx.roundRect(width * 0.08, ctaY, width * 0.84, ctaH, 20);
        ctx.fill();
        ctx.strokeStyle = accentPrimary;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = accentPrimary;
        ctx.font = `bold ${isVertical ? 30 : isPortrait ? 24 : 20}px system-ui`;
        ctx.fillText("SAM'S DRIVING SCHOOL • ROCKVILLE, MD", width / 2, ctaY + ctaH * 0.28);

        ctx.fillStyle = '#ffffff';
        ctx.font = `${isVertical ? 22 : isPortrait ? 17 : 14}px system-ui`;
        ctx.fillText("36-Hr Drivers Ed ($378) • Behind-the-Wheel ($120/session) • MVA Car Rental ($140)", width / 2, ctaY + ctaH * 0.52);

        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold ${isVertical ? 22 : isPortrait ? 17 : 14}px system-ui`;
        ctx.fillText("FREE ROCKVILLE METRO STATION PICKUP • (301) 279-0000 • samdrivingschool.org", width / 2, ctaY + ctaH * 0.76);
      }
    }

    // 6. Common Footer with Small Corner Question Code & Slide Number (ریز در پایین گوشه)
    const cornerPad = isLandscape ? 36 : 42;
    const footerY = height - (isLandscape ? 18 : 26);

    // Left Bottom: School address & accreditation
    ctx.fillStyle = '#94a3b8';
    ctx.font = `${Math.round(width * (isLandscape ? 0.010 : isSquare ? 0.012 : 0.015))}px system-ui`;
    ctx.textAlign = 'left';
    ctx.fillText("751 Rockville Pike, Rockville MD • Voted Best of 2025 • samdrivingschool.org", cornerPad, footerY);

    // Right Bottom Corner: Small Question Code & Slide Number (ریز در پایین گوشه)
    const codeTag = lang === 'fa'
      ? `کد: #${record.quiz_id.replace('q_', '').toUpperCase()} • اسلاید ${slideNum}/۵`
      : `CODE: #${record.quiz_id.replace('q_', '').toUpperCase()} • SLIDE ${slideNum}/5`;

    const codeFontSize = Math.round(width * (isLandscape ? 0.011 : isSquare ? 0.013 : 0.016));
    ctx.font = `bold ${codeFontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
    ctx.textAlign = 'right';
    ctx.fillStyle = accentPrimary;
    ctx.fillText(codeTag, width - cornerPad, footerY);

    return canvas;
  };

  // Download Single Slide
  const handleDownloadSingleSlide = (slideNum: CarouselSlideIndex) => {
    if (!currentRecord) return;
    setIsExportingImage(true);

    const canvas = renderSlideToCanvas(currentRecord, slideNum, activeDimension, cardTheme, cardLanguage);
    if (!canvas) {
      setIsExportingImage(false);
      return;
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `sams_${currentRecord.quiz_id}_slide_${slideNum}_${cardLanguage}_${activeDimension.replace(':', 'x')}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
      setIsExportingImage(false);
    }, 'image/png');
  };

  // Download Complete 5-Slide Carousel Pack (All 5 slides sequentially)
  const handleDownloadFullCarouselPack = async () => {
    if (!currentRecord) return;
    setIsExportingImage(true);

    for (let s = 1; s <= 5; s++) {
      setBatchProgress(`Exporting Slide ${s} of 5 for ${currentRecord.quiz_id}...`);
      const canvas = renderSlideToCanvas(currentRecord, s as CarouselSlideIndex, activeDimension, cardTheme, cardLanguage);
      if (canvas) {
        await new Promise<void>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `sams_${currentRecord.quiz_id}_slide_${s}_pack_${cardLanguage}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }
            resolve();
          }, 'image/png');
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    setBatchProgress(null);
    setIsExportingImage(false);
  };

  // Batch Export All 20 Questions in the Database
  const handleBatchExportAll = async () => {
    if (dbRecords.length === 0) return;
    setIsExportingImage(true);

    for (let i = 0; i < dbRecords.length; i++) {
      const rec = dbRecords[i];
      setBatchProgress(`Exporting card ${i + 1} of ${dbRecords.length}: ${rec.quiz_id}...`);

      const canvas = renderSlideToCanvas(rec, 1, activeDimension, cardTheme, cardLanguage);
      if (canvas) {
        await new Promise<void>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `sams_curriculum_${i + 1}_${rec.quiz_id}_${cardLanguage}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }
            resolve();
          }, 'image/png');
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    setBatchProgress(null);
    setIsExportingImage(false);
  };

  // Filtered records
  const filteredRecords = dbRecords.filter((rec) => {
    const matchesSearch =
      rec.quiz_question_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.quiz_question_fa.includes(searchQuery) ||
      rec.statute_reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.category && rec.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (rec.category_label_en && rec.category_label_en.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag =
      filterStateTag === 'all' || rec.state_tag === filterStateTag;
    const matchesCategory =
      filterCategory === 'all' || rec.category === filterCategory;
    return matchesSearch && matchesTag && matchesCategory;
  });

  const activeDimConfig = SOCIAL_DIMENSIONS.find((d) => d.id === activeDimension) || SOCIAL_DIMENSIONS[0];
  const activeSlideInfo = CAROUSEL_SLIDES[activeSlide - 1];

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-600/15 via-rose-600/15 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Layers className="w-3.5 h-3.5" />
                {appLanguageMode === 'fa' ? 'پکیج ۵ اسلایدی چند صفحه‌ای (Multi-Slide Carousel)' : '5-Slide Social Media Carousel Pack'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                <Globe className="w-3.5 h-3.5" />
                {appLanguageMode === 'fa'
                  ? `انتخاب زبان: ${cardLanguage === 'fa' ? 'فارسی کامل' : cardLanguage === 'en' ? 'انگلیسی کامل' : 'دوزبانه'}`
                  : `Language: ${cardLanguage.toUpperCase()}`}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <Database className="w-3.5 h-3.5" />
                {appLanguageMode === 'fa' ? `${dbRecords.length} سرفصل آموزشی کامل` : `${dbRecords.length} Full Curriculum Topics`}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {appLanguageMode === 'fa' ? (
                <span>
                  فلش‌کارت‌های چند صفحه‌ای فیکس سوشال مدیا{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                    با لوگوی رسمی آموزشگاه و استخراج بدون به‌هم‌ریختگی
                  </span>
                </span>
              ) : (
                <span>
                  Multi-Slide Fixed Carousel Studio &amp;{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                    Official School Logo Export
                  </span>
                </span>
              )}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {appLanguageMode === 'fa' ? (
                <span>
                  ابعاد و ساختار کارت‌ها برای تمام پلتفرم‌ها (استوری ۹:۱۶، پست مربعی ۱:۱، پرتره ۴:۵ و لنداسکیپ ۱.۹۱:۱) کاملاً فیکس و قفل شده است. هر سوال دارای یک پکیج ۵ صفحه‌ای تخصصی (کاور، سوال، پاسخ رسمی، تحلیل ممتحن، و تکنیک آرامش سام) همراه با لوگوی رسمی آموزشگاه و ترانسفر رایگان از متروی راکویل است.
                </span>
              ) : (
                <span>
                  Rock-solid, fixed-aspect-ratio cards that never distort. Every topic includes a full 5-slide carousel pack (Cover, Question, Verified Answer, Examiner Deep Dive, Sam&apos;s Psychology Hack) ready to post!
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportDbJson}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700"
            >
              <FileJson className="w-3.5 h-3.5 text-indigo-400" />
              <span>{appLanguageMode === 'fa' ? 'خروجی دیتابیس JSON' : 'Export DB (JSON)'}</span>
            </button>
            <button
              onClick={handleResetDb}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
              <span>{appLanguageMode === 'fa' ? 'ریست دیتابیس' : 'Reset DB'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: INSTRUCTOR CHARACTER & FACE LOCK PANEL */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{appLanguageMode === 'fa' ? 'شخصیت مربی و انطباق چهره (100% Face ID Lock)' : 'Instructor Face Lock Engine'}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {appLanguageMode === 'fa'
                  ? 'عکس مربی را آپلود کنید تا چهره مربی و متن تابلوهای ترافیکی در تمام کارت‌ها و پرامپت‌ها بدون تغییر قفل بماند.'
                  : 'Upload an instructor photo or select Sam to inject strict character reference (--cref --cw 100) into prompts.'}
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 text-white hover:opacity-95 shadow-lg shadow-rose-950/40 transition"
          >
            <Upload className="w-4 h-4" />
            <span>{appLanguageMode === 'fa' ? 'آپلود عکس جدید مربی' : 'Upload Instructor Photo'}</span>
          </button>
        </div>

        {/* Selected Instructor Display & Presets */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-1 flex items-center gap-3.5 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div className="relative">
              <img
                src={customPhotoPreview || instructor.avatar_url}
                alt={instructor.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-black">
                ✓
              </span>
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="text-xs font-bold text-white truncate">{instructor.name}</div>
              <div className="text-[11px] text-amber-300 font-mono truncate">
                {instructor.is_custom_upload ? 'Custom Face' : 'Lead Psychologist'}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>--cw 100 Face Locked</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESET_INSTRUCTORS.map((preset) => {
              const isSelected = instructor.id === preset.id && !customPhotoPreview;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPresetInstructor(preset)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-400 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={preset.avatar_url}
                    alt={preset.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{preset.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {appLanguageMode === 'fa' ? preset.title_fa : preset.title_en}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: MULTI-PAGE CONTROLS, DIMENSIONS & PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 20 Questions Curriculum Library & Filters (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>{appLanguageMode === 'fa' ? `سرفصل‌های تدریس (${dbRecords.length} مبحث)` : `Curriculum Deck (${dbRecords.length} Topics)`}</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {filteredRecords.length} / {dbRecords.length}
              </span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={appLanguageMode === 'fa' ? 'جستجوی سرفصل آموزشی...' : 'Search curriculum topic...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Question Model / Curriculum Category Pills */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {appLanguageMode === 'fa' ? 'مدل سوال و سرفصل آموزشی:' : 'Question Model & Category:'}
              </span>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label_en: 'All Models', label_fa: 'همه مدل‌ها', icon: '🌟' },
                  { id: 'tristate_laws', label_en: 'Tri-State Laws', label_fa: 'قوانین MD/DC/VA', icon: '🏛️' },
                  { id: 'mva_maneuvers', label_en: 'MVA Maneuvers', label_fa: 'مانورهای عملی', icon: '🚗' },
                  { id: 'instant_fails', label_en: 'Instant Fails', label_fa: 'ردی فوری', icon: '🛑' },
                  { id: 'psychology_anxiety', label_en: 'Psychology', label_fa: 'روان‌شناسی سام', icon: '🧠' },
                  { id: 'emergency_defensive', label_en: 'Emergencies', label_fa: 'شرایط اضطراری', icon: '🚨' },
                  { id: 'curriculum_services', label_en: '36-Hr Programs', label_fa: 'دوره ۳۶ ساعته', icon: '🎓' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition flex items-center gap-1 ${
                      filterCategory === cat.id
                        ? 'bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{appLanguageMode === 'fa' ? cat.label_fa : cat.label_en}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* State Tag Filter Pills */}
            <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-800/60">
              {['all', 'Maryland MVA', 'Washington D.C.', 'Virginia DMV', 'Tri-State Universal'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterStateTag(tag)}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-semibold transition ${
                    filterStateTag === tag
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {tag === 'all' ? (appLanguageMode === 'fa' ? `تمام ایالت‌ها (${dbRecords.length})` : `All Regions (${dbRecords.length})`) : tag}
                </button>
              ))}
            </div>

            {/* Questions List scrollable with pagination indicators */}
            <div className="max-h-[460px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredRecords.map((item, idx) => {
                const isSelected = item.id === currentRecord?.id;
                const catIcon =
                  item.category === 'tristate_laws'
                    ? '🏛️'
                    : item.category === 'mva_maneuvers'
                    ? '🚗'
                    : item.category === 'instant_fails'
                    ? '🛑'
                    : item.category === 'psychology_anxiety'
                    ? '🧠'
                    : item.category === 'curriculum_services'
                    ? '🎓'
                    : '🚨';

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedRecordId(item.id);
                      setActiveSlide(1); // reset to slide 1
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition space-y-1.5 ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-amber-400 font-bold">TOPIC #{idx + 1}</span>
                        <span className="text-[10px]">{catIcon}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[9px]">
                        <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-amber-300/90">
                          #{item.quiz_id.replace('q_', '').toUpperCase()}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                          {item.state_tag}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold line-clamp-2 leading-snug">
                      {appLanguageMode === 'fa' ? item.quiz_question_fa : item.quiz_question_en}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate font-mono">
                      {item.statute_reference}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Page Carousel Viewer & Fixed Viewport (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Controls Bar: Language Mode, Luxury Theme & Social Dimensions */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            {/* ROW 1: LANGUAGE SELECTION & LUXURY THEME */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              {/* Language Selection */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>{appLanguageMode === 'fa' ? 'انتخاب زبان خروجی کارت (Language):' : 'Flashcard Export Language:'}</span>
                </span>
                <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 gap-1">
                  <button
                    onClick={() => setCardLanguage('en')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      cardLanguage === 'en'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🇺🇸 English Only
                  </button>
                  <button
                    onClick={() => setCardLanguage('fa')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      cardLanguage === 'fa'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🇮🇷 فارسی کامل
                  </button>
                  <button
                    onClick={() => setCardLanguage('bilingual')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      cardLanguage === 'bilingual'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🌐 دوزبانه (EN / FA)
                  </button>
                </div>
              </div>

              {/* Luxury Theme Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>{appLanguageMode === 'fa' ? 'تم لوکس طراحی کارت:' : 'Luxury Card Theme:'}</span>
                </span>
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setCardTheme('gold')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      cardTheme === 'gold' ? 'bg-amber-500 text-slate-950' : 'text-amber-300 hover:text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Gold Onyx</span>
                  </button>
                  <button
                    onClick={() => setCardTheme('navy')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      cardTheme === 'navy' ? 'bg-sky-500 text-slate-950' : 'text-sky-300 hover:text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    <span>Royal Navy</span>
                  </button>
                  <button
                    onClick={() => setCardTheme('rose')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      cardTheme === 'rose' ? 'bg-rose-500 text-white' : 'text-rose-300 hover:text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span>Cyber Rose</span>
                  </button>
                  <button
                    onClick={() => setCardTheme('emerald')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      cardTheme === 'emerald' ? 'bg-emerald-500 text-slate-950' : 'text-emerald-300 hover:text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>Emerald Pass</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ROW 2: FIXED SOCIAL DIMENSIONS PICKER */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{appLanguageMode === 'fa' ? 'ابعاد استاندارد پلتفرم جهت خروجی:' : 'Fixed Social Dimensions:'}</span>
                </span>
                <span className="text-[11px] font-mono text-amber-300 font-bold">
                  {activeDimConfig.label_en}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SOCIAL_DIMENSIONS.map((dim) => {
                  const isActive = activeDimension === dim.id;
                  return (
                    <button
                      key={dim.id}
                      onClick={() => setActiveDimension(dim.id)}
                      className={`p-2.5 rounded-2xl border text-left transition space-y-1 ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-600/30 to-rose-600/30 border-amber-400 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black">{dim.id}</span>
                        <span className="text-[10px] font-mono opacity-80">{dim.width}×{dim.height}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-200 truncate">
                        {dim.platform}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MULTI-PAGE CAROUSEL NAVIGATION BAR */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">
                  {appLanguageMode === 'fa' ? 'صفحات پکیج کروسل (۵ اسلاید):' : 'Carousel Slides (5-Slide Pack):'}
                </span>
              </div>
              <span className="text-xs font-mono text-amber-300 font-bold">
                {activeSlide} / 5: {appLanguageMode === 'fa' ? activeSlideInfo.badge_fa : activeSlideInfo.badge_en}
              </span>
            </div>

            {/* Slide Selection Buttons */}
            <div className="grid grid-cols-5 gap-1.5">
              {CAROUSEL_SLIDES.map((s) => {
                const isCurrent = activeSlide === s.index;
                return (
                  <button
                    key={s.index}
                    onClick={() => setActiveSlide(s.index)}
                    className={`py-2 px-1 rounded-xl text-center border transition flex flex-col items-center gap-0.5 ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold">Slide {s.index}</span>
                    <span className="text-[9px] truncate max-w-full opacity-80 hidden sm:inline">
                      {appLanguageMode === 'fa' ? s.badge_fa : s.badge_en}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub Navigation: Card Preview vs AI Prompts vs Social Captions */}
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('card_preview')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'card_preview'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{appLanguageMode === 'fa' ? 'پیش‌نمایش زنده و استخراج تصویر' : 'Live Graphic & PNG Export'}</span>
              </button>
              <button
                onClick={() => setActiveTab('ai_prompts')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'ai_prompts'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{appLanguageMode === 'fa' ? 'پرامپت‌های Midjourney و FLUX' : 'AI Media Prompts (--cref)'}</span>
              </button>
              <button
                onClick={() => setActiveTab('social_copy')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'social_copy'
                    ? 'bg-rose-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{appLanguageMode === 'fa' ? 'متن پست و اسکریپت ریلز' : 'Captions & Video Script'}</span>
              </button>
            </div>

            <button
              onClick={handleRegenerateWithGemini}
              disabled={isGeneratingAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-indigo-300 hover:text-white hover:bg-slate-700 transition border border-slate-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAi ? 'Generating...' : appLanguageMode === 'fa' ? 'ساخت مجدد با هوش مصنوعی' : 'Re-engineer with AI'}</span>
            </button>
          </div>

          {generationNotice && (
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{generationNotice}</span>
            </div>
          )}

          {/* TAB 1: VISUAL CARD GRAPHIC & COMPLETE EXPORT */}
          {activeTab === 'card_preview' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              {/* ACTION BAR: Slide Controls & Multi-Slide Download Options */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSlide((prev) => (prev > 1 ? (prev - 1) as CarouselSlideIndex : 5))}
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold text-white px-2">
                    Slide {activeSlide} / 5
                  </span>
                  <button
                    onClick={() => setActiveSlide((prev) => (prev < 5 ? (prev + 1) as CarouselSlideIndex : 1))}
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct Download Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleDownloadSingleSlide(activeSlide)}
                    disabled={isExportingImage}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 transition border border-slate-700 disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {appLanguageMode === 'fa'
                        ? `دانلود همین اسلاید (${activeSlide})`
                        : `Download Slide ${activeSlide}`}
                    </span>
                  </button>

                  <button
                    onClick={handleDownloadFullCarouselPack}
                    disabled={isExportingImage}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white hover:opacity-95 shadow-md shadow-rose-950/40 transition disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>
                      {appLanguageMode === 'fa'
                        ? 'دانلود پکیج کامل ۵ اسلایدی'
                        : 'Download 5-Slide Pack'}
                    </span>
                  </button>

                  <button
                    onClick={handleBatchExportAll}
                    disabled={isExportingImage}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-sm disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{appLanguageMode === 'fa' ? `استخراج تمام ${dbRecords.length} سرفصل` : `Export All ${dbRecords.length} Topics`}</span>
                  </button>
                </div>
              </div>

              {batchProgress && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2 animate-pulse font-mono">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{batchProgress}</span>
                </div>
              )}

              {/* LIVE ULTRA-LUXURY FLASHCARD FIXED PREVIEW STAGE */}
              <div className="flex justify-center items-center py-6 px-2 min-h-[520px] bg-slate-950/70 rounded-3xl border border-slate-900 overflow-hidden">
                <div
                  className={`relative overflow-hidden rounded-3xl border-2 transition-all shadow-2xl flex flex-col justify-between select-none mx-auto ${
                    cardTheme === 'gold'
                      ? 'bg-gradient-to-b from-stone-950 via-zinc-950 to-black border-amber-400/60 shadow-amber-950/30'
                      : cardTheme === 'navy'
                      ? 'bg-gradient-to-b from-slate-950 via-sky-950 to-black border-sky-400/60 shadow-sky-950/30'
                      : cardTheme === 'rose'
                      ? 'bg-gradient-to-b from-purple-950 via-rose-950 to-black border-rose-400/60 shadow-rose-950/30'
                      : 'bg-gradient-to-b from-emerald-950 via-teal-950 to-black border-emerald-400/60 shadow-emerald-950/30'
                  }`}
                  style={{
                    width: '100%',
                    maxWidth:
                      activeDimension === '9:16'
                        ? '320px'
                        : activeDimension === '4:5'
                        ? '430px'
                        : activeDimension === '1:1'
                        ? '490px'
                        : '680px',
                    height:
                      activeDimension === '9:16'
                        ? '570px'
                        : activeDimension === '4:5'
                        ? '540px'
                        : activeDimension === '1:1'
                        ? '490px'
                        : '355px',
                    padding: activeDimension === '1.91:1' ? '1rem 1.25rem' : '1.25rem 1.5rem',
                  }}
                >
                  {/* Decorative ambient radial glow */}
                  <div
                    className={`absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none ${
                      cardTheme === 'gold'
                        ? 'bg-amber-500/15'
                        : cardTheme === 'navy'
                        ? 'bg-sky-500/15'
                        : cardTheme === 'rose'
                        ? 'bg-rose-500/15'
                        : 'bg-emerald-500/15'
                    }`}
                  />

                  {/* HEADER: Official School Logo Crest & Branding */}
                  <div className="space-y-1 text-center relative z-10 shrink-0">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-7 h-7 rounded-full border-2 border-amber-400 bg-slate-950/90 flex items-center justify-center shadow-lg relative">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-black text-white tracking-wider">
                          SAM&apos;S DRIVING SCHOOL
                        </div>
                        <div className="text-[9px] text-amber-300 font-bold uppercase tracking-tight">
                          Rockville, MD • Voted Best of 2025
                        </div>
                      </div>
                    </div>

                    {/* Official State Tag & Slide Badge */}
                    <div className="inline-block px-3 py-0.5 rounded-full text-[9px] font-black tracking-wide shadow-sm bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 text-white">
                      {currentRecord.state_tag.toUpperCase()} • {appLanguageMode === 'fa' ? activeSlideInfo.badge_fa : activeSlideInfo.badge_en} ({activeSlide}/5)
                    </div>
                  </div>

                  {/* BODY CONTENT: Tailored to Active Slide & Dimension */}
                  <div className="my-auto relative z-10 py-1 overflow-hidden min-h-0 flex-1 flex flex-col justify-center">
                    {/* WIDESCREEN 2-COLUMN LAYOUT FOR 1.91:1 */}
                    {activeDimension === '1.91:1' ? (
                      <div className="grid grid-cols-2 gap-3 items-center w-full h-full">
                        {/* Slide 1 in 1.91:1 */}
                        {activeSlide === 1 && (
                          <>
                            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                                🔥 {appLanguageMode === 'fa' ? 'تله پرتکرار MVA' : 'MVA Exam Challenge'}
                              </span>
                              <div className="text-xs font-bold text-amber-300">
                                {appLanguageMode === 'fa' ? 'قوانین رسمی مریلند و منطقه DMV' : 'Official Tri-State Law Spotlight'}
                              </div>
                              <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 font-bold">
                                👉 {appLanguageMode === 'fa' ? 'ورق بزنید برای گزینه‌ها' : 'Swipe for choices'}
                              </div>
                            </div>
                            <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-400/30 space-y-1.5 text-left">
                              <div className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-3">
                                {cardLanguage === 'fa' ? currentRecord.quiz_question_fa : currentRecord.quiz_question_en}
                              </div>
                              {cardLanguage === 'bilingual' && (
                                <div className="text-[11px] text-slate-300 line-clamp-2">
                                  {currentRecord.quiz_question_fa}
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        {/* Slide 2 in 1.91:1 */}
                        {activeSlide === 2 && (
                          <>
                            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                                {currentRecord.state_tag}
                              </div>
                              <div className="text-xs font-extrabold text-white line-clamp-4 leading-snug">
                                {cardLanguage === 'fa' ? currentRecord.quiz_question_fa : currentRecord.quiz_question_en}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {currentRecord.options_en.slice(0, 4).map((optEn, idx) => {
                                const letters = ['A', 'B', 'C', 'D'];
                                const farsiLetters = ['الف', 'ب', 'ج', 'د'];
                                const optFa = currentRecord.options_fa[idx] || optEn;
                                const textToShow = cardLanguage === 'fa' ? optFa : optEn;
                                return (
                                  <div
                                    key={idx}
                                    className="p-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[10px] flex items-center gap-1.5"
                                  >
                                    <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center shrink-0">
                                      {cardLanguage === 'fa' ? farsiLetters[idx] : letters[idx]}
                                    </span>
                                    <span className="text-slate-200 line-clamp-2 leading-tight">
                                      {textToShow}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}

                        {/* Slide 3 in 1.91:1 */}
                        {activeSlide === 3 && (
                          <>
                            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-1 text-center">
                              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wide">
                                ✅ {cardLanguage === 'fa' ? 'پاسخ رسمی MVA' : 'VERIFIED ANSWER'}
                              </span>
                              <div className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-3">
                                {cardLanguage === 'fa' ? currentRecord.correct_answer_fa : currentRecord.correct_answer_en}
                              </div>
                            </div>
                            <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-1.5 text-center">
                              <div className="text-xs font-black text-amber-300 font-mono">
                                ⚖️ {currentRecord.statute_reference}
                              </div>
                              <div className="text-[10px] text-slate-300 leading-snug">
                                {cardLanguage === 'fa'
                                  ? 'رعایت این ماده قانونی در تمام جاده‌های مریلند الزامی است.'
                                  : 'Strict legal compliance required across Maryland roads.'}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Slide 4 in 1.91:1 */}
                        {activeSlide === 4 && (
                          <>
                            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                              <div className="text-[10px] font-bold text-amber-400">
                                📖 {cardLanguage === 'fa' ? 'تحلیل آموزشی ممتحن:' : 'Examiner Analysis:'}
                              </div>
                              <div className="text-[11px] text-slate-200 leading-snug line-clamp-4">
                                {cardLanguage === 'fa' ? currentRecord.explain_why_fa : currentRecord.explain_why_en}
                              </div>
                            </div>
                            <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-1 text-center">
                              <span className="text-[10px] font-black text-rose-300 uppercase">
                                ⚠️ {cardLanguage === 'fa' ? 'خطای بحرانی در آزمون' : 'Critical Test Gotcha'}
                              </span>
                              <div className="text-[10px] text-white leading-snug">
                                {cardLanguage === 'fa'
                                  ? 'کوچک‌ترین اشتباه در این مانور باعث ردی آنی در مراکز گیترزبرگ و وایت اوک می‌شود.'
                                  : 'Examiners in Gaithersburg & White Oak strictly fail applicants for this maneuver.'}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Slide 5 in 1.91:1 */}
                        {activeSlide === 5 && (
                          <>
                            <div className="p-2.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-1 text-left">
                              <div className="text-[10px] font-black text-rose-300 uppercase flex items-center gap-1">
                                <HeartHandshake className="w-3.5 h-3.5" />
                                <span>{cardLanguage === 'fa' ? 'تکنیک روان‌شناسی سام:' : "Sam's Psychology Hack:"}</span>
                              </div>
                              <div className="text-[11px] text-white leading-snug line-clamp-3">
                                {currentRecord.instructor_hack}
                              </div>
                            </div>
                            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-0.5 text-center">
                              <div className="text-xs font-black text-amber-300">
                                Sam&apos;s Driving School • (301) 279-0000
                              </div>
                              <div className="text-[10px] text-slate-300">
                                36-Hr Drivers Ed ($378) • BTW ($120) • Rental ($140)
                              </div>
                              <div className="text-[9px] text-sky-400 font-bold">
                                Free Rockville Metro Station Pickup
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      /* VERTICAL / SQUARE LAYOUT FOR 9:16, 4:5, 1:1 */
                      <div className="space-y-2.5 w-full">
                        {/* Slide 1 */}
                        {activeSlide === 1 && (
                          <div className="space-y-3 text-center">
                            <div className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                              🔥 {appLanguageMode === 'fa' ? 'تله پرتکرار آزمون شهر MVA' : 'Critical MVA Driving Gotcha'}
                            </div>
                            <div className="text-sm sm:text-base font-extrabold text-white leading-snug line-clamp-3">
                              {cardLanguage === 'fa' ? currentRecord.quiz_question_fa : currentRecord.quiz_question_en}
                            </div>
                            {cardLanguage === 'bilingual' && (
                              <div className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                                {currentRecord.quiz_question_fa}
                              </div>
                            )}
                            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-amber-300 font-bold">
                              👉 {appLanguageMode === 'fa' ? 'برای مشاهده گزینه‌های پاسخ ورق بزنید' : 'Swipe to test your knowledge'}
                            </div>
                          </div>
                        )}

                        {/* Slide 2 */}
                        {activeSlide === 2 && (
                          <div className="space-y-2">
                            <div className="text-center text-[11px] font-extrabold text-white line-clamp-2">
                              {cardLanguage === 'fa' ? currentRecord.quiz_question_fa : currentRecord.quiz_question_en}
                            </div>
                            <div className="space-y-1.5">
                              {currentRecord.options_en.slice(0, 4).map((optEn, idx) => {
                                const letters = ['A', 'B', 'C', 'D'];
                                const farsiLetters = ['الف', 'ب', 'ج', 'د'];
                                const optFa = currentRecord.options_fa[idx] || optEn;
                                const textToShow = cardLanguage === 'fa' ? optFa : optEn;
                                return (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs"
                                  >
                                    <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center shrink-0">
                                      {cardLanguage === 'fa' ? farsiLetters[idx] : letters[idx]}
                                    </span>
                                    <span className="text-slate-200 line-clamp-1 text-[11px]">
                                      {textToShow}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Slide 3 */}
                        {activeSlide === 3 && (
                          <div className="space-y-2 text-center">
                            <div className="inline-block px-3 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              ✅ {cardLanguage === 'fa' ? 'پاسخ رسمی مورد تایید MVA' : 'OFFICIAL MVA VERIFIED ANSWER'}
                            </div>
                            <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 space-y-1">
                              <div className="text-xs sm:text-sm font-extrabold text-emerald-300 leading-snug line-clamp-3">
                                {cardLanguage === 'fa' ? currentRecord.correct_answer_fa : currentRecord.correct_answer_en}
                              </div>
                              {cardLanguage === 'bilingual' && (
                                <div className="text-[11px] text-emerald-200/80 line-clamp-2">
                                  {currentRecord.correct_answer_fa}
                                </div>
                              )}
                            </div>
                            <div className="text-[10px] font-mono text-amber-300 font-bold bg-amber-500/10 py-1 px-2 rounded-lg border border-amber-500/20">
                              ⚖️ {currentRecord.statute_reference}
                            </div>
                          </div>
                        )}

                        {/* Slide 4 */}
                        {activeSlide === 4 && (
                          <div className="space-y-2">
                            <div className="text-center text-xs font-bold text-amber-400">
                              📖 {cardLanguage === 'fa' ? 'تحلیل آموزشی ممتحن MVA:' : 'Examiner Curriculum Deep Dive:'}
                            </div>
                            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed max-h-[160px] overflow-hidden text-left line-clamp-5">
                              {cardLanguage === 'fa' ? currentRecord.explain_why_fa : currentRecord.explain_why_en}
                            </div>
                            <div className="text-center text-[10px] font-bold text-rose-400">
                              ⚠️ {appLanguageMode === 'fa' ? 'خطای بحرانی در امتحان شهر = ردی درجا' : 'Critical MVA Failure Trap'}
                            </div>
                          </div>
                        )}

                        {/* Slide 5 */}
                        {activeSlide === 5 && (
                          <div className="space-y-2">
                            <div className="p-2.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-left space-y-1">
                              <div className="text-[10px] font-black text-rose-300 uppercase tracking-wide flex items-center gap-1">
                                <HeartHandshake className="w-3.5 h-3.5" />
                                <span>
                                  {cardLanguage === 'fa' ? 'تکنیک روان‌شناسی سام:' : 'Sam’s Psychology Pass Tip:'}
                                </span>
                              </div>
                              <div className="text-[11px] text-white leading-relaxed line-clamp-3">
                                {currentRecord.instructor_hack}
                              </div>
                            </div>

                            <div className="p-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-0.5">
                              <div className="text-xs font-black text-amber-300">
                                Sam&apos;s Driving School • (301) 279-0000
                              </div>
                              <div className="text-[10px] text-slate-300">
                                36-Hr Drivers Ed ($378) • BTW ($120) • Rental ($140)
                              </div>
                              <div className="text-[9px] text-sky-400 font-bold">
                                Free Rockville Metro Station Transfer
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* FOOTER: School Contact, Address & Small Corner Question Code + Slide Number (ریز در پایین گوشه) */}
                  <div className="border-t border-slate-800/80 pt-1.5 text-[9px] text-slate-400 relative z-10 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-1.5 truncate max-w-[55%]">
                      <img
                        src={customPhotoPreview || instructor.avatar_url}
                        alt="Instructor"
                        className="w-5 h-5 rounded-full object-cover border border-amber-400 shrink-0"
                      />
                      <span className="font-semibold text-slate-200 truncate">{instructor.name.split(' ')[0]}</span>
                      <span className="font-mono text-slate-400 hidden sm:inline">• 751 Rockville Pike</span>
                    </div>

                    {/* Small in bottom corner: Question Code & Slide Number (ریز در پایین گوشه) */}
                    <div className="flex items-center gap-1 font-mono text-[8px] sm:text-[9px] px-2 py-0.5 rounded-lg bg-slate-900/95 border border-amber-500/40 text-amber-300 font-bold shrink-0 shadow-sm">
                      <span>
                        {cardLanguage === 'fa'
                          ? `کد: #${currentRecord.quiz_id.replace('q_', '').toUpperCase()} • اسلاید ${activeSlide}/۵`
                          : `CODE: #${currentRecord.quiz_id.replace('q_', '').toUpperCase()} • SLIDE ${activeSlide}/5`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI PROMPTS WITH 100% FACE PRESERVATION */}
          {activeTab === 'ai_prompts' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>Midjourney v6.1 &amp; FLUX.1 Pro Photo Prompts</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Includes strict character reference (--cref &amp; --cw 100) and explicit quoted text preservation.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Target AR: {activeDimension}
                </span>
              </div>

              {/* Midjourney v6.1 Block */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Midjourney v6.1 Prompt (with --cref &amp; --cw 100)</span>
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        formatMidjourneyPromptWithCharacter(
                          currentRecord.midjourney_photo.prompt_template,
                          instructor,
                          activeDimension
                        ),
                        'mj_prompt'
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
                  >
                    {copiedKey === 'mj_prompt' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Midjourney Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs font-mono text-slate-200 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 leading-relaxed break-words">
                  {formatMidjourneyPromptWithCharacter(
                    currentRecord.midjourney_photo.prompt_template,
                    instructor,
                    activeDimension
                  )}
                </p>

                <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                  <div>
                    <span className="text-slate-300 font-semibold">Lighting &amp; Lens: </span>
                    {currentRecord.midjourney_photo.lighting_atmosphere} ({currentRecord.midjourney_photo.camera_lens})
                  </div>
                  <div>
                    <span className="text-emerald-400 font-semibold">Text Preservation: </span>
                    {currentRecord.midjourney_photo.text_preservation_directives}
                  </div>
                </div>
              </div>

              {/* FLUX.1 Pro Block */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5" />
                    <span>FLUX.1 Pro (LoRA / IP-Adapter FaceID + Text Quotes)</span>
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(currentRecord.flux_photo.prompt_template, 'flux_prompt')
                    }
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
                  >
                    {copiedKey === 'flux_prompt' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy FLUX Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs font-mono text-slate-200 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 leading-relaxed break-words">
                  {currentRecord.flux_photo.prompt_template}
                </p>

                <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                  <span className="text-slate-300 font-semibold">Preserved Text Tokens:</span>
                  {currentRecord.flux_photo.exact_text_quotes.map((q, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[10px]"
                    >
                      &quot;{q}&quot;
                    </span>
                  ))}
                </div>
              </div>

              {/* Video Prompt (Runway Gen-3 / Sora) */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5 font-mono">
                    <Video className="w-3.5 h-3.5" />
                    <span>Runway Gen-3 / Sora Video Prompt (Actor Consistency)</span>
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(currentRecord.video_prompt.runway_template, 'runway_prompt')
                    }
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 transition"
                  >
                    {copiedKey === 'runway_prompt' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Video Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs font-mono text-slate-200 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 leading-relaxed break-words">
                  {currentRecord.video_prompt.runway_template}
                </p>

                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <div>
                    <span className="text-slate-300 font-semibold">Camera Direction: </span>
                    {currentRecord.video_prompt.camera_movement}
                  </div>
                  <div>
                    <span className="text-rose-300 font-semibold">Sound Design SFX: </span>
                    {currentRecord.video_prompt.sound_design_en}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLATFORM-NATIVE SOCIAL MEDIA CAPTIONS */}
          {activeTab === 'social_copy' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>Platform-Native Social Media Captions &amp; Scripts</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Ready-to-post copy tailored for Instagram Carousels, TikTok/Reels retention hooks, and Facebook.
                </p>
              </div>

              {/* Instagram Carousel Breakdown */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 font-mono">
                    Instagram 5-Slide Carousel Copy
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        `${currentRecord.social_card_copy.instagram_carousel.caption_en}\n\n${currentRecord.social_card_copy.instagram_carousel.hashtags.join(' ')}`,
                        'ig_caption'
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 transition"
                  >
                    {copiedKey === 'ig_caption' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Caption &amp; Hashtags</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Slide 1 (Hook):</div>
                    <div className="font-semibold text-white">{currentRecord.social_card_copy.instagram_carousel.slide_1_hook}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Slide 2 (Question):</div>
                    <div className="font-semibold text-white truncate">{currentRecord.social_card_copy.instagram_carousel.slide_2_question}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Slide 3 (Answer &amp; Law):</div>
                    <div className="font-semibold text-emerald-400">{currentRecord.social_card_copy.instagram_carousel.slide_3_answer}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">Slide 4 &amp; 5 (Deep Dive &amp; Hack):</div>
                    <div className="font-semibold text-rose-300">{currentRecord.social_card_copy.instagram_carousel.slide_4_sam_hack}</div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 mb-1">Caption (Bilingual):</div>
                  <p className="leading-relaxed mb-2">{currentRecord.social_card_copy.instagram_carousel.caption_en}</p>
                  <p className="leading-relaxed text-slate-400">{currentRecord.social_card_copy.instagram_carousel.caption_fa}</p>
                  <div className="text-[11px] text-rose-400 font-mono mt-2">
                    {currentRecord.social_card_copy.instagram_carousel.hashtags.join(' ')}
                  </div>
                </div>
              </div>

              {/* TikTok / Reels Script */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-300 font-mono">
                    TikTok / Reels 45s Viral Video Script
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        `${currentRecord.social_card_copy.tiktok_reels_script.hook_en}\n\n${currentRecord.social_card_copy.tiktok_reels_script.spoken_script_en}`,
                        'tiktok_script'
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 transition"
                  >
                    {copiedKey === 'tiktok_script' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <div>
                    <span className="text-amber-400 font-bold">Retention Hook (First 3s): </span>
                    <span className="text-white">{currentRecord.social_card_copy.tiktok_reels_script.hook_en}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold">قلاب شروع (فارسی): </span>
                    <span className="text-slate-300">{currentRecord.social_card_copy.tiktok_reels_script.hook_fa}</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2">
                    <span className="text-sky-300 font-bold">Voiceover Script: </span>
                    <p className="text-slate-200 mt-1 leading-relaxed">
                      {currentRecord.social_card_copy.tiktok_reels_script.spoken_script_en}
                    </p>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      {currentRecord.social_card_copy.tiktok_reels_script.spoken_script_fa}
                    </p>
                  </div>
                </div>
              </div>

              {/* Facebook Post */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 font-mono">
                    Facebook Community / Parent Discussion Post
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        `${currentRecord.social_card_copy.facebook_post.headline_en}\n\n${currentRecord.social_card_copy.facebook_post.body_en}`,
                        'fb_post'
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
                  >
                    {copiedKey === 'fb_post' ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Post</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 leading-relaxed">
                  <div className="font-bold text-white text-sm">
                    {currentRecord.social_card_copy.facebook_post.headline_en}
                  </div>
                  <p className="text-slate-300">{currentRecord.social_card_copy.facebook_post.body_en}</p>
                  <p className="text-slate-400 border-t border-slate-800 pt-2">{currentRecord.social_card_copy.facebook_post.body_fa}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

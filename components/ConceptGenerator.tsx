'use client';

import React, { useState } from 'react';
import { Sparkles, Wand2, Users, AlertCircle, Compass, CheckCircle2, RefreshCw } from 'lucide-react';
import { CURATED_CONCEPTS, SocialMediaContentPackage } from '@/lib/driving-school-data';

interface ConceptGeneratorProps {
  onSelectConcept: (pkg: SocialMediaContentPackage) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  languageMode: 'bilingual' | 'en' | 'fa';
}

export default function ConceptGenerator({
  onSelectConcept,
  isLoading,
  setIsLoading,
  languageMode,
}: ConceptGeneratorProps) {
  const [customConcept, setCustomConcept] = useState('');
  const [targetAudience, setTargetAudience] = useState<'teenagers' | 'parents' | 'both'>('teenagers');
  const [category, setCategory] = useState<'mva_test' | 'anxiety_relief' | 'tristate_laws' | 'teen_freedom' | 'parent_safety'>('mva_test');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (conceptText?: string) => {
    const textToUse = conceptText || customConcept;
    if (!textToUse.trim()) {
      setErrorMsg(
        languageMode === 'fa'
          ? 'لطفا یک موضوع یا ایده برای تولید محتوا وارد کنید.'
          : 'Please enter a concept or choose one of the preset topics.'
      );
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: textToUse,
          audience: targetAudience,
          category,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate content package');
      }

      onSelectConcept(data.data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Generation error. Falling back to pre-built sample.');
      // Fallback to closest curated concept if API fails
      const fallback = CURATED_CONCEPTS[0];
      onSelectConcept(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const presetIdeas = [
    {
      title_en: "The 3-Second Stop Sign Rule at Rockville/Gaithersburg MVA",
      title_fa: "قانون توقف کامل ۳ ثانیه‌ای پشت تابلوی ایست در MVA راکویل و گیترزبرگ",
      desc_en: "Why 68% of teens fail for rolling stops & how Sam's Psychology Box-Breathing cures it.",
      desc_fa: "چرا ۶۸٪ افراد به خاطر استاپ ناقص رد می‌شوند و چطور تنفس روان‌شناختی سام آن را حل می‌کند.",
      concept: "The 3-Second Stop Sign Rule & Gaithersburg MVA Test Gotcha: Rolling stop failure trap vs suspension weight settling physics",
      audience: 'teenagers' as const,
      category: 'mva_test' as const,
      curatedIndex: 0,
    },
    {
      title_en: "MVA 50-Foot Straight Backing: The Yellow Curb Trap",
      title_fa: "دنده عقب ۵۰ فوت در MVA: تله برخورد لاستیک به جدول زرد",
      desc_en: "Where to look (why staring at the backup camera screen causes automatic failure).",
      desc_fa: "کجا را نگاه کنیم (چرا نگاه صرف به دوربین دنده عقب باعث ردی فوری است).",
      concept: "Mastering the 50-Foot MVA Straight-Line Backing Test Without Touching the Curb or Failing Camera Rules",
      audience: 'both' as const,
      category: 'mva_test' as const,
      curatedIndex: 1,
    },
    {
      title_en: "MD vs DC vs VA: 3 Huge Traffic Law Traps for Commuters",
      title_fa: "مریلند در برابر DC و ویرجینیا: ۳ تفاوت بزرگ قوانین رانندگی و جریمه‌ها",
      desc_en: "DC universal No-Turn-on-Red ban, MD Move Over law expansion, and VA 20mph reckless driving.",
      desc_fa: "ممنوعیت گردش به راست در قرمز در DC، قانون فاصله با خودروهای متوقف در مریلند، و جرم سرعت در ویرجینیا.",
      concept: "Driving in MD vs DC vs VA: 3 Huge Traffic Law Differences That Catch Drivers Off Guard",
      audience: 'both' as const,
      category: 'tristate_laws' as const,
      curatedIndex: 2,
    },
    {
      title_en: "Relieving Severe Driving Anxiety (Psychology-Led Methods)",
      title_fa: "درمان اضطراب شدید رانندگی با تکنیک‌های روان‌شناسی سام",
      desc_en: "Why yelling parents make driving panic worse and how dual-brake zero-yelling builds calm confidence.",
      desc_fa: "چرا داد زدن والدین ترس را تشدید می‌کند و چگونه مربیان صبور و ترمز کمکی اعتماد به نفس می‌سازند.",
      concept: "Severe driving anxiety relief for teens and adults in Montgomery County through psychology and calm dual-control training",
      audience: 'parents' as const,
      category: 'anxiety_relief' as const,
    },
    {
      title_en: "School Bus $570 Fine Trap: Divided vs Undivided MD Roads",
      title_fa: "تله جریمه ۵۷۰ دلاری اتوبوس مدرسه در خیابان‌های دوطرفه مریلند",
      desc_en: "When do oncoming cars have to stop? The physical barrier vs center turn lane confusion.",
      desc_fa: "چه زمانی خودروهای لاین مخالف باید پشت اتوبوس مدرسه بایستند؟ مرز جدول وسط خیابان چیست؟",
      concept: "School bus stopping laws in Maryland: $570 fine and 3 points, physical median vs continuous left turn lane rules",
      audience: 'both' as const,
      category: 'tristate_laws' as const,
    },
    {
      title_en: "Montgomery County High School Freedom: From Permit to License",
      title_fa: "آزادی رانندگی برای دانش‌آموزان دبیرستان‌های مانتگامری کانتی",
      desc_en: "Richard Montgomery High, Wootton, and Rockville High teens: 15y 9m permit rules & 18-month provisional mastery.",
      desc_fa: "دانش‌آموزان RMHS و Wootton: سن ۱۵ سال و ۹ ماه، قوانین ۶۰ ساعت تمرین و نجات از دوره مشروط.",
      concept: "Teen driver freedom in Montgomery County: Richard Montgomery, Wootton, and Rockville High students mastering MVA test without yelling",
      audience: 'teenagers' as const,
      category: 'teen_freedom' as const,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {languageMode === 'fa'
                ? 'استودیوی استراتژی محتوا و پرامپت‌نویسی هوش مصنوعی'
                : "Social Media Strategist & AI Prompt Lab"}
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            {languageMode === 'fa'
              ? 'تولید اسکریپت‌های بومی برای تیک‌تاک، ریلز اینستاگرام، فیسبوک، یوتیوب شورتز به همراه پرامپت‌های فوتورئالیستیک میدجورنی و ویدیوهای سینمایی ران‌وی'
              : 'Generate platform-native scripts for TikTok, IG Reels, Facebook, YouTube Shorts + Midjourney & Runway prompts from a single concept.'}
          </p>
        </div>

        {/* Target Audience Pill Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 px-2 font-medium flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            {languageMode === 'fa' ? 'مخاطب هدف:' : 'Audience:'}
          </span>
          <button
            onClick={() => setTargetAudience('teenagers')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              targetAudience === 'teenagers'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {languageMode === 'fa' ? 'نوجوانان (Gen Z)' : 'Teens (Gen Z)'}
          </button>
          <button
            onClick={() => setTargetAudience('parents')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              targetAudience === 'parents'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {languageMode === 'fa' ? 'والدین (ایمنی)' : 'Parents (Safety)'}
          </button>
          <button
            onClick={() => setTargetAudience('both')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              targetAudience === 'both'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {languageMode === 'fa' ? 'هر دو' : 'Both'}
          </button>
        </div>
      </div>

      {/* Custom Input Field */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            {languageMode === 'fa'
              ? 'ایده یا موضوع محتوای خود را بنویسید (انگلیسی یا فارسی):'
              : 'Enter Content Concept or Test Scenario (English or Persian):'}
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={customConcept}
              onChange={(e) => setCustomConcept(e.target.value)}
              placeholder={
                languageMode === 'fa'
                  ? 'مثال: آموزش نحوه پارک عمودی دو نقطه‌ای دنده عقب در محوطه امتحان MVA و کنترل لرزش پا روی پدال ترمز...'
                  : "e.g. Reverse two-point turn into MVA stall, overcoming leg-tremble panic on the brake pedal, and passing on first try..."
              }
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                onClick={() => handleGenerate()}
                disabled={isLoading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg disabled:opacity-50 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{languageMode === 'fa' ? 'در حال تولید هوشمند...' : 'Architecting...'}</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>{languageMode === 'fa' ? 'تولید پکیج محتوا با هوش مصنوعی' : 'Generate Full Package'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {errorMsg && (
            <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </p>
          )}
        </div>

        {/* Preset Concept Pills */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              {languageMode === 'fa'
                ? 'موضوعات پرطرفدار و تست‌شده برای مریلند و منطقه DMV:'
                : 'Or Pick From Tested Viral Presets for Maryland & DMV Tri-State:'}
            </span>
            <span className="text-[11px] text-slate-500">
              {languageMode === 'fa' ? 'کلیک کنید تا فورا لود شود' : '1-click instant load'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {presetIdeas.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCustomConcept(preset.concept);
                  setTargetAudience(preset.audience);
                  setCategory(preset.category);
                  if (typeof preset.curatedIndex === 'number') {
                    onSelectConcept(CURATED_CONCEPTS[preset.curatedIndex]);
                  } else {
                    handleGenerate(preset.concept);
                  }
                }}
                disabled={isLoading}
                className="text-left group bg-slate-950/80 hover:bg-slate-800 border border-slate-800/90 hover:border-indigo-500/50 rounded-xl p-3.5 transition-all relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {languageMode === 'fa' ? preset.title_fa : preset.title_en}
                  </h4>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap">
                    {preset.audience === 'teenagers' ? 'Gen Z' : preset.audience === 'parents' ? 'Parents' : 'All'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {languageMode === 'fa' ? preset.desc_fa : preset.desc_en}
                </p>
                <div className="mt-2.5 flex items-center gap-2 text-[10px] text-indigo-400 font-semibold opacity-80 group-hover:opacity-100">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {languageMode === 'fa' ? 'مشاهده اسکریپت و پرامپت‌ها' : 'Load full script & prompts'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

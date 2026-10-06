'use client';

import React, { useState } from 'react';
import {
  Camera,
  Video,
  Sparkles,
  Copy,
  Check,
  Wand2,
  Layers,
  Sliders,
  Eye,
  Volume2,
  Film,
  BrainCircuit,
  Compass,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  FileJson
} from 'lucide-react';
import {
  CAMERA_ANGLES,
  LENS_OPTICS,
  LIGHTING_MOODS,
  PRESET_MEDIA_PACKAGES,
  EducationalMediaPromptPackage
} from '@/lib/media-prompts-data';

interface AiMediaPromptStudioProps {
  languageMode: 'bilingual' | 'en' | 'fa';
}

export default function AiMediaPromptStudio({ languageMode }: AiMediaPromptStudioProps) {
  const [selectedPackage, setSelectedPackage] = useState<EducationalMediaPromptPackage>(
    PRESET_MEDIA_PACKAGES[0]
  );
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | 'video' | 'pedagogy'>('photo');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Custom Prompt Builder state
  const [customTopic, setCustomTopic] = useState('');
  const [selectedAngle, setSelectedAngle] = useState(CAMERA_ANGLES[0].id);
  const [selectedLens, setSelectedLens] = useState(LENS_OPTICS[0].id);
  const [selectedLighting, setSelectedLighting] = useState(LIGHTING_MOODS[0].id);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('9:16');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateCustom = async (topicToUse?: string) => {
    const text = topicToUse || customTopic;
    if (!text.trim()) {
      setErrorMsg(
        languageMode === 'fa'
          ? 'لطفا یک موضوع یا سناریوی آموزشی برای ساخت پرامپت وارد کنید.'
          : 'Please enter a driving education scenario or pick a preset topic.'
      );
      return;
    }

    setErrorMsg(null);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate-media-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: text,
          cameraAngle: selectedAngle,
          lensOptics: selectedLens,
          lightingMood: selectedLighting,
          aspectRatio: selectedAspectRatio,
          targetAudience: 'teenagers',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate media prompts');
      }

      const generated: EducationalMediaPromptPackage = {
        id: `custom_${Date.now()}`,
        title_en: json.data.title_en || text,
        title_fa: json.data.title_fa || 'پرامپت اختصاصی تولید محتوا',
        category: 'mva_skills',
        concept_summary_en: json.data.educational_concept_summary_en || text,
        concept_summary_fa: json.data.educational_concept_summary_fa || '',
        camera_angle: selectedAngle,
        lens_optics: selectedLens,
        lighting_mood: selectedLighting,
        aspect_ratio: selectedAspectRatio,
        photo_prompts: json.data.photo_prompts,
        video_prompts: json.data.video_prompts,
        pedagogical_visual_notes: json.data.pedagogical_visual_notes || {
          teaching_goal_en: 'Defensive driving and test maneuver mastery.',
          teaching_goal_fa: 'تسلط بر رانندگی تدافعی و مانورهای آزمون شهر.',
          mva_test_correlation_en: 'Maryland MVA skills test compliance.',
          mva_test_correlation_fa: 'مطابق با چک‌لیست رسمی ممتحنان MVA مریلند.',
          psychological_calm_anchor_en: 'Zero-yelling and psychological calmness.',
          psychological_calm_anchor_fa: 'آموزش آرام و رهایی از استرس پشت فرمان.',
        },
      };

      setSelectedPackage(generated);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Generation error. Falling back to preset.');
      setSelectedPackage(PRESET_MEDIA_PACKAGES[0]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>AI Media Prompt Studio</span>
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Video className="w-3.5 h-3.5" />
              <span>Midjourney v6.1 • FLUX.1 • Runway Gen-3 • Sora</span>
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {languageMode === 'fa'
              ? 'استودیوی تخصصی ساخت پرامپت عکس و ویدیوی آموزشی رانندگی'
              : 'Educational Driving Photo & Video Prompt Architect'}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {languageMode === 'fa'
              ? 'تولید پرامپت‌های سینمایی و فوتورئال بر اساس کل سیستم آموزشگاه سام: قوانین ترافیکی مریلند و منطقه DMV، خودروهای دو پداله، متد روان‌شناسی رفع اضطراب، زوایای دقیق دوربین داخل کابین و جزئیات لنزهای اپتیکال برای استفاده مستقیم در میدجورنی، فلوکس و ران‌وی.'
              : 'Construct high-fidelity photo and video prompts integrating Sam’s Driving School identity, Maryland MVA test gotchas, dual-control brake mechanics, and psychology calming anchors with real camera lens optics and cinematic motion.'}
          </p>
        </div>
      </div>

      {/* Interactive Prompt Builder Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base md:text-lg font-bold text-white">
            {languageMode === 'fa'
              ? 'تنظیمات سفارشی دوربین، نورپردازی و سناریوی آموزشی'
              : 'Custom Visual Parameters & Educational Scenario'}
          </h3>
        </div>

        {/* Input Textarea */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            {languageMode === 'fa'
              ? 'سناریو یا موضوع مد نظر خود را بنویسید (انگلیسی یا فارسی):'
              : 'Enter Educational Driving Scenario (English or Persian):'}
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder={
                languageMode === 'fa'
                  ? 'مثال: آموزش نحوه پارک دوبل بین دو مخروط در پیست MVA گیترزبرگ با نگاه مستقیم به شیشه عقب و کنترل لرزش پای راننده...'
                  : 'e.g. Practicing parallel parking between cones at Gaithersburg MVA with rear window view, dual brake security, and calming breath...'
              }
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <button
              onClick={() => handleGenerateCustom()}
              disabled={isGenerating}
              className="absolute bottom-3 right-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{languageMode === 'fa' ? 'در حال مهندسی پرامپت...' : 'Architecting...'}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{languageMode === 'fa' ? 'ساخت پرامپت با هوش مصنوعی' : 'Generate Prompts'}</span>
                </>
              )}
            </button>
          </div>
          {errorMsg && (
            <p className="text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </p>
          )}
        </div>

        {/* Cinematography Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Camera Angle */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Camera Shot &amp; Angle
            </label>
            <select
              value={selectedAngle}
              onChange={(e) => setSelectedAngle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CAMERA_ANGLES.map((ang) => (
                <option key={ang.id} value={ang.id}>
                  {languageMode === 'fa' ? ang.desc_fa : ang.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Lens & Optics */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Lens &amp; Optical Depth
            </label>
            <select
              value={selectedLens}
              onChange={(e) => setSelectedLens(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {LENS_OPTICS.map((l) => (
                <option key={l.id} value={l.id}>
                  {languageMode === 'fa' ? l.desc_fa : l.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Lighting Mood */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Lighting &amp; Atmosphere
            </label>
            <select
              value={selectedLighting}
              onChange={(e) => setSelectedLighting(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {LIGHTING_MOODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {languageMode === 'fa' ? m.desc_fa : m.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Target Aspect Ratio
            </label>
            <select
              value={selectedAspectRatio}
              onChange={(e) => setSelectedAspectRatio(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="9:16">9:16 (Vertical Reels / TikTok / Shorts)</option>
              <option value="16:9">16:9 (Landscape Cinematic YouTube / Web)</option>
              <option value="1:1">1:1 (Square Instagram Feed)</option>
              <option value="4:5">4:5 (Instagram Portrait)</option>
            </select>
          </div>
        </div>

        {/* Tested Preset Packages Carousel */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            {languageMode === 'fa'
              ? 'یا از سناریوهای تست‌شده سیستم انتخاب کنید (کلیک برای لود آنی):'
              : 'Or Load from Tested MVA System Presets (1-Click Instant Load):'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRESET_MEDIA_PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => {
                  setSelectedPackage(pkg);
                  setCustomTopic(pkg.title_en);
                }}
                className={`text-left p-3.5 rounded-xl border transition-all relative overflow-hidden group ${
                  selectedPackage.id === pkg.id
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {languageMode === 'fa' ? pkg.title_fa : pkg.title_en}
                  </h4>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 uppercase shrink-0">
                    {pkg.aspect_ratio}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {languageMode === 'fa' ? pkg.concept_summary_fa : pkg.concept_summary_en}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-indigo-400 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>{languageMode === 'fa' ? 'مشاهده پرامپت‌های Midjourney و Runway' : 'Inspect prompts'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prompts Inspection Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
        {/* Package Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 p-5 md:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                Ratio: {selectedPackage.aspect_ratio}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                {selectedPackage.category.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {(languageMode === 'bilingual' || languageMode === 'en') && (
              <h3 className="text-lg md:text-xl font-black text-white">
                {selectedPackage.title_en}
              </h3>
            )}
            {(languageMode === 'bilingual' || languageMode === 'fa') && (
              <h3 dir="rtl" className="text-base md:text-lg font-bold text-amber-200 font-sans">
                {selectedPackage.title_fa}
              </h3>
            )}
          </div>

          <button
            onClick={() => {
              const fullText = JSON.stringify(selectedPackage, null, 2);
              handleCopy(fullText, 'full_media_json');
            }}
            className="self-start md:self-auto bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {copiedKey === 'full_media_json' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Package Copied!</span>
              </>
            ) : (
              <>
                <FileJson className="w-3.5 h-3.5 text-indigo-400" />
                <span>Export Package JSON</span>
              </>
            )}
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="bg-slate-950 px-4 border-b border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveMediaTab('photo')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeMediaTab === 'photo'
                ? 'border-amber-500 text-amber-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Midjourney &amp; FLUX Image Prompts</span>
          </button>

          <button
            onClick={() => setActiveMediaTab('video')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeMediaTab === 'video'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4 text-emerald-400" />
            <span>Runway &amp; Sora Video Prompts</span>
          </button>

          <button
            onClick={() => setActiveMediaTab('pedagogy')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeMediaTab === 'pedagogy'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <span>MVA &amp; Psychology Pedagogy</span>
          </button>
        </div>

        {/* Tab Content View */}
        <div className="p-5 md:p-7 space-y-6">
          {/* ================= PHOTO PROMPTS TAB ================= */}
          {activeMediaTab === 'photo' && (
            <div className="space-y-6">
              {/* Midjourney v6.1 Primary Prompt Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                      Midjourney v6.1 Production String
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {selectedPackage.photo_prompts.midjourney_v6.technical_parameters}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        selectedPackage.photo_prompts.midjourney_v6.prompt_en,
                        'copy_mj_en'
                      )
                    }
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700 cursor-pointer shadow-sm"
                  >
                    {copiedKey === 'copy_mj_en' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Midjourney String</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-xs text-amber-200 leading-relaxed select-all">
                  {selectedPackage.photo_prompts.midjourney_v6.prompt_en}
                </div>

                {/* Persian Translation & Directorial Notes */}
                <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    ترجمه دقیق و راهنمای فارسی پرامپت عکس:
                  </span>
                  <p dir="rtl" className="text-xs md:text-sm text-amber-100/90 leading-relaxed font-sans">
                    {selectedPackage.photo_prompts.midjourney_v6.prompt_fa}
                  </p>
                </div>

                {/* Lighting and Framing Specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="font-bold text-slate-300 block mb-0.5">Lighting &amp; Atmosphere:</span>
                    <p className="text-slate-400">{selectedPackage.photo_prompts.midjourney_v6.lighting_and_atmosphere}</p>
                  </div>
                  <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="font-bold text-slate-300 block mb-0.5">Composition &amp; Framing:</span>
                    <p className="text-slate-400">{selectedPackage.photo_prompts.midjourney_v6.composition_and_framing}</p>
                  </div>
                </div>
              </div>

              {/* FLUX.1 Pro and DALL-E 3 Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300">FLUX.1 Pro Prompt:</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          selectedPackage.photo_prompts.flux_pro.prompt_en,
                          'copy_flux'
                        )
                      }
                      className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'copy_flux' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                    {selectedPackage.photo_prompts.flux_pro.prompt_en}
                  </p>
                  {selectedPackage.photo_prompts.flux_pro.prompt_fa && (
                    <p dir="rtl" className="text-xs text-amber-200/90 font-sans pt-1">
                      {selectedPackage.photo_prompts.flux_pro.prompt_fa}
                    </p>
                  )}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">DALL-E 3 Prompt:</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          selectedPackage.photo_prompts.dalle3.prompt_en,
                          'copy_dalle'
                        )
                      }
                      className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'copy_dalle' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                    {selectedPackage.photo_prompts.dalle3.prompt_en}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIDEO PROMPTS TAB ================= */}
          {activeMediaTab === 'video' && (
            <div className="space-y-6">
              {/* Runway Gen-3 Prompt */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
                      Runway Gen-3 Alpha Cinematic Video
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Camera: {selectedPackage.video_prompts.runway_gen3.camera_motion_command}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        selectedPackage.video_prompts.runway_gen3.prompt_en,
                        'copy_runway_en'
                      )
                    }
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700 cursor-pointer shadow-sm"
                  >
                    {copiedKey === 'copy_runway_en' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Runway Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed select-all">
                  {selectedPackage.video_prompts.runway_gen3.prompt_en}
                </div>

                {/* Persian Directorial Breakdown */}
                <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    راهنمای کارگردانی ویدیو و ترجمه فارسی:
                  </span>
                  <p dir="rtl" className="text-xs md:text-sm text-amber-100/90 leading-relaxed font-sans">
                    {selectedPackage.video_prompts.runway_gen3.prompt_fa}
                  </p>
                </div>

                {/* Sound Design SFX Section */}
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <Volume2 className="w-4 h-4" />
                    <span>Sound Design (SFX) &amp; Cockpit Audio Cues:</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {selectedPackage.video_prompts.runway_gen3.sound_design_sfx_en}
                  </p>
                  {selectedPackage.video_prompts.runway_gen3.sound_design_sfx_fa && (
                    <p dir="rtl" className="text-xs text-amber-200/90 font-sans pt-1 border-t border-slate-800">
                      {selectedPackage.video_prompts.runway_gen3.sound_design_sfx_fa}
                    </p>
                  )}
                </div>
              </div>

              {/* Sora / Kling AI Alternative Prompt */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">OpenAI Sora &amp; Kling AI Motion Prompt:</span>
                  <button
                    onClick={() =>
                      handleCopy(
                        selectedPackage.video_prompts.sora_kling.prompt_en,
                        'copy_sora'
                      )
                    }
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                  >
                    {copiedKey === 'copy_sora' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {selectedPackage.video_prompts.sora_kling.prompt_en}
                </p>
              </div>
            </div>
          )}

          {/* ================= PEDAGOGY TAB ================= */}
          {activeMediaTab === 'pedagogy' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  1. Visual Teaching Goal (هدف آموزشی برای هنرجو یا والدین):
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {selectedPackage.pedagogical_visual_notes.teaching_goal_en}
                </p>
                {selectedPackage.pedagogical_visual_notes.teaching_goal_fa && (
                  <p dir="rtl" className="text-xs md:text-sm text-amber-200 font-sans pt-1 border-t border-slate-800">
                    {selectedPackage.pedagogical_visual_notes.teaching_goal_fa}
                  </p>
                )}
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
                  2. Maryland MVA Test Rubric Correlation (انطباق با چک‌لیست رسمی آزمون MVA):
                </span>
                <p className="text-xs md:text-sm text-rose-200 leading-relaxed">
                  {selectedPackage.pedagogical_visual_notes.mva_test_correlation_en}
                </p>
                {selectedPackage.pedagogical_visual_notes.mva_test_correlation_fa && (
                  <p dir="rtl" className="text-xs md:text-sm text-amber-200 font-sans pt-1 border-t border-slate-800">
                    {selectedPackage.pedagogical_visual_notes.mva_test_correlation_fa}
                  </p>
                )}
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  3. Sam’s Psychology Calm Anchor (روش روان‌شناسی کاهش استرس):
                </span>
                <p className="text-xs md:text-sm text-emerald-200 leading-relaxed">
                  {selectedPackage.pedagogical_visual_notes.psychological_calm_anchor_en}
                </p>
                {selectedPackage.pedagogical_visual_notes.psychological_calm_anchor_fa && (
                  <p dir="rtl" className="text-xs md:text-sm text-amber-200 font-sans pt-1 border-t border-slate-800">
                    {selectedPackage.pedagogical_visual_notes.psychological_calm_anchor_fa}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

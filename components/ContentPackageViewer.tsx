'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  Video,
  Camera,
  Share2,
  FileJson,
  Sparkles,
  Layers,
  Scale,
  HeartHandshake,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { SocialMediaContentPackage } from '@/lib/driving-school-data';

interface ContentPackageViewerProps {
  content: SocialMediaContentPackage;
  languageMode: 'bilingual' | 'en' | 'fa';
}

export default function ContentPackageViewer({
  content,
  languageMode,
}: ContentPackageViewerProps) {
  const [activeTab, setActiveTab] = useState<'tiktok' | 'reels' | 'shorts' | 'facebook' | 'photo_prompts' | 'video_prompts' | 'mva_law'>('tiktok');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopiedKey('full_json');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Banner with Concept Title & Meta */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 p-5 md:p-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                {content.target_audience === 'teenagers' ? 'Target: Teenagers (Gen Z)' : content.target_audience === 'parents' ? 'Target: Parents (Safety First)' : 'Target: All Montgomery County Drivers'}
              </span>
              <span className="text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
                {content.category.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Bilingual Titles */}
            {(languageMode === 'bilingual' || languageMode === 'en') && (
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug">
                {content.concept_title_en}
              </h3>
            )}
            {(languageMode === 'bilingual' || languageMode === 'fa') && (
              <h3
                dir="rtl"
                className="text-lg md:text-xl font-bold text-amber-200 tracking-tight leading-snug font-sans"
              >
                {content.concept_title_fa}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyJSON}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-700 transition-all cursor-pointer shadow-sm"
              title="Copy valid raw JSON according to schema"
            >
              {copiedKey === 'full_json' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">JSON Copied!</span>
                </>
              ) : (
                <>
                  <FileJson className="w-4 h-4 text-indigo-400" />
                  <span>Copy Raw JSON</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-slate-950 px-4 border-b border-slate-800 flex overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => setActiveTab('tiktok')}
          className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'tiktok'
              ? 'border-rose-500 text-rose-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>TikTok Script</span>
        </button>

        <button
          onClick={() => setActiveTab('reels')}
          className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'reels'
              ? 'border-purple-500 text-purple-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <span>Instagram Reels</span>
        </button>

        <button
          onClick={() => setActiveTab('shorts')}
          className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'shorts'
              ? 'border-red-500 text-red-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>YouTube Shorts</span>
        </button>

        <button
          onClick={() => setActiveTab('facebook')}
          className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'facebook'
              ? 'border-blue-500 text-blue-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Facebook (Parents)</span>
        </button>

        <button
          onClick={() => setActiveTab('photo_prompts')}
          className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'photo_prompts'
              ? 'border-amber-500 text-amber-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>Midjourney / FLUX Prompts</span>
        </button>

        <button
          onClick={() => setActiveTab('video_prompts')}
          className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'video_prompts'
              ? 'border-emerald-500 text-emerald-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-emerald-400" />
          <span>Runway / Sora Video Prompts</span>
        </button>

        <button
          onClick={() => setActiveTab('mva_law')}
          className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'mva_law'
              ? 'border-indigo-500 text-indigo-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-indigo-400" />
          <span>MVA Law &amp; Anxiety Tips</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-5 md:p-7 space-y-6">
        {/* ===================== TIKTOK TAB ===================== */}
        {activeTab === 'tiktok' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-rose-500/20 text-rose-400 px-2.5 py-1 rounded-md">
                  TikTok Native Script
                </span>
                <span className="text-xs text-slate-400">
                  Optimized for 0-2s retention hook &amp; Montgomery County Gen Z
                </span>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `HOOK:\n${content.tiktok.hook_en}\n\nSCRIPT:\n${content.tiktok.script_en}\n\nHASHTAGS:\n${content.tiktok.hashtags.join(' ')}`,
                    'tiktok_all'
                  )
                }
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'tiktok_all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Script</span>
              </button>
            </div>

            {/* Hook Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                First 2-Seconds Hook (قلاب ۲ ثانیه اول)
              </span>
              {(languageMode === 'bilingual' || languageMode === 'en') && (
                <p className="text-sm font-semibold text-white">
                  &ldquo;{content.tiktok.hook_en}&rdquo;
                </p>
              )}
              {(languageMode === 'bilingual' || languageMode === 'fa') && (
                <p dir="rtl" className="text-sm font-medium text-amber-200">
                  «{content.tiktok.hook_fa}»
                </p>
              )}
            </div>

            {/* On Screen Text Badges */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                On-Screen Text Overlays (متن‌های روی صفحه)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {content.tiktok.on_screen_text_en.map((text, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs">
                    <span className="text-[10px] text-slate-500 font-mono block mb-1">
                      Text {idx + 1}
                    </span>
                    {(languageMode === 'bilingual' || languageMode === 'en') && (
                      <p className="font-semibold text-slate-200">{text}</p>
                    )}
                    {(languageMode === 'bilingual' || languageMode === 'fa') && content.tiktok.on_screen_text_fa?.[idx] && (
                      <p dir="rtl" className="text-amber-200/90 text-[11px] mt-1">
                        {content.tiktok.on_screen_text_fa[idx]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Spoken Script */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Spoken Script / Voiceover (متن گفتاری گوینده)
                </span>
                <button
                  onClick={() => handleCopy(content.tiktok.script_en, 'tiktok_spoken')}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                >
                  {copiedKey === 'tiktok_spoken' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy English</span>
                </button>
              </div>

              {(languageMode === 'bilingual' || languageMode === 'en') && (
                <div className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800/80">
                  {content.tiktok.script_en}
                </div>
              )}

              {(languageMode === 'bilingual' || languageMode === 'fa') && (
                <div
                  dir="rtl"
                  className="text-sm text-amber-100 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800/80 font-sans"
                >
                  {content.tiktok.script_fa}
                </div>
              )}
            </div>

            {/* Directorial Cues: Audio & Pacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Audio &amp; Trending Sound
                </span>
                <p className="text-xs text-slate-300">{content.tiktok.sound_recommendation}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Visual Pacing &amp; Camera Cuts
                </span>
                <p className="text-xs text-slate-300">{content.tiktok.visual_pacing}</p>
              </div>
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-slate-400">Hashtags:</span>
              {content.tiktok.hashtags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-slate-800 text-rose-300 px-2 py-0.5 rounded font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ===================== INSTAGRAM REELS TAB ===================== */}
        {activeTab === 'reels' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-purple-500/20 text-purple-400 px-2.5 py-1 rounded-md">
                  Instagram Reels Master Script
                </span>
                <span className="text-xs text-slate-400">
                  Aesthetic visual framing + Psychological Calming Hook
                </span>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `HOOK:\n${content.instagram_reels.hook_en}\n\nSCRIPT:\n${content.instagram_reels.script_en}\n\nCAPTION:\n${content.instagram_reels.caption_en}\n\nCTA:\n${content.instagram_reels.call_to_action_en}\n\nHASHTAGS:\n${content.instagram_reels.hashtags.join(' ')}`,
                    'reels_all'
                  )
                }
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'reels_all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Reel Package</span>
              </button>
            </div>

            {/* Aesthetic Visual Description */}
            <div className="bg-purple-950/20 border border-purple-900/40 rounded-xl p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                Visual Aesthetic &amp; Color Grading:
              </span>
              <p className="text-xs text-purple-200">{content.instagram_reels.visual_aesthetic}</p>
            </div>

            {/* Hook */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                Reel Hook:
              </span>
              {(languageMode === 'bilingual' || languageMode === 'en') && (
                <p className="text-sm font-semibold text-white">{content.instagram_reels.hook_en}</p>
              )}
              {(languageMode === 'bilingual' || languageMode === 'fa') && (
                <p dir="rtl" className="text-sm font-medium text-amber-200">
                  {content.instagram_reels.hook_fa}
                </p>
              )}
            </div>

            {/* Voiceover Script */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Spoken Narration (Psychology &amp; Technique):
              </span>
              {(languageMode === 'bilingual' || languageMode === 'en') && (
                <div className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800/80">
                  {content.instagram_reels.script_en}
                </div>
              )}
              {(languageMode === 'bilingual' || languageMode === 'fa') && (
                <div
                  dir="rtl"
                  className="text-sm text-amber-100 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800/80 font-sans"
                >
                  {content.instagram_reels.script_fa}
                </div>
              )}
            </div>

            {/* Instagram Caption & CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Feed Caption (EN):
                  </span>
                  <button
                    onClick={() => handleCopy(content.instagram_reels.caption_en, 'reels_cap_en')}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    {copiedKey === 'reels_cap_en' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {content.instagram_reels.caption_en}
                </p>
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-indigo-400">CTA:</span>
                  <p className="text-xs text-indigo-200 mt-0.5">{content.instagram_reels.call_to_action_en}</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    کپشن اینستاگرام (فارسی):
                  </span>
                  <button
                    onClick={() => handleCopy(content.instagram_reels.caption_fa, 'reels_cap_fa')}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    {copiedKey === 'reels_cap_fa' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <p dir="rtl" className="text-xs text-amber-200/90 whitespace-pre-wrap leading-relaxed font-sans">
                  {content.instagram_reels.caption_fa}
                </p>
                <div dir="rtl" className="pt-2 border-t border-slate-800/80 font-sans">
                  <span className="text-[10px] uppercase font-bold text-amber-400">فراخوان به اقدام (CTA):</span>
                  <p className="text-xs text-amber-300 mt-0.5">{content.instagram_reels.call_to_action_fa}</p>
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-slate-400">Reels Tags:</span>
              {content.instagram_reels.hashtags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-slate-800 text-purple-300 px-2 py-0.5 rounded font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ===================== YOUTUBE SHORTS TAB ===================== */}
        {activeTab === 'shorts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2.5 py-1 rounded-md">
                  YouTube Shorts Architecture
                </span>
                <span className="text-xs text-slate-400">
                  High-retention pacing, 4-step actionable clarity
                </span>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `TITLE:\n${content.youtube_shorts.title_en}\n\nHOOK:\n${content.youtube_shorts.retention_hook_en}\n\nSTEPS:\n${content.youtube_shorts.step_by_step_en.join('\n')}\n\nSCRIPT:\n${content.youtube_shorts.script_en}\n\nPINNED COMMENT:\n${content.youtube_shorts.pinned_comment_en}`,
                    'shorts_all'
                  )
                }
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'shorts_all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Shorts Package</span>
              </button>
            </div>

            {/* Title & Retention Hook */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                  High-CTR Title (عنوان ویدیوی شورتز):
                </span>
                <p className="text-base font-bold text-white">{content.youtube_shorts.title_en}</p>
                {content.youtube_shorts.title_fa && (
                  <p dir="rtl" className="text-sm font-semibold text-amber-200 mt-1">
                    {content.youtube_shorts.title_fa}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Retention Hook (شروع ضربتی برای جلوگیری از اسکرول):
                </span>
                <p className="text-sm text-slate-200 italic">&ldquo;{content.youtube_shorts.retention_hook_en}&rdquo;</p>
              </div>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Actionable 4-Step Breakdown (مراحل گام‌به‌گام برای قبولی):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {content.youtube_shorts.step_by_step_en.map((step, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
                    <span className="text-indigo-400 font-bold text-[11px]">Step {idx + 1}</span>
                    <p className="text-slate-200">{step}</p>
                    {content.youtube_shorts.step_by_step_fa?.[idx] && (
                      <p dir="rtl" className="text-amber-200/90 text-[11px] font-sans pt-1 border-t border-slate-800/80">
                        {content.youtube_shorts.step_by_step_fa[idx]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Script & Pinned Comment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Shorts Script:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{content.youtube_shorts.script_en}</p>
                {content.youtube_shorts.script_fa && (
                  <p dir="rtl" className="text-xs text-amber-200/90 font-sans leading-relaxed pt-2 border-t border-slate-800">
                    {content.youtube_shorts.script_fa}
                  </p>
                )}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Pinned Comment &amp; CTA:
                  </span>
                  <button
                    onClick={() => handleCopy(content.youtube_shorts.pinned_comment_en, 'pinned_comment')}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    {copiedKey === 'pinned_comment' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  {content.youtube_shorts.pinned_comment_en}
                </p>
                {content.youtube_shorts.pinned_comment_fa && (
                  <p dir="rtl" className="text-xs text-amber-200/90 bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-sans">
                    {content.youtube_shorts.pinned_comment_fa}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== FACEBOOK TAB ===================== */}
        {activeTab === 'facebook' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-md">
                  Facebook Community Post
                </span>
                <span className="text-xs text-slate-400">
                  Tailored for Parents, Decision-Makers, and Montgomery County Community
                </span>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `HEADLINE:\n${content.facebook.headline_en}\n\nBODY:\n${content.facebook.body_en}\n\nLOCAL TRUST:\n${content.facebook.local_trust_hook_en}\n\nCTA:\n${content.facebook.cta_en}`,
                    'facebook_all'
                  )
                }
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'facebook_all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Post</span>
              </button>
            </div>

            {/* Headline */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                Authoritative Headline for Parents (تیتر اطمینان‌بخش برای والدین):
              </span>
              {(languageMode === 'bilingual' || languageMode === 'en') && (
                <p className="text-base font-bold text-white">{content.facebook.headline_en}</p>
              )}
              {(languageMode === 'bilingual' || languageMode === 'fa') && (
                <p dir="rtl" className="text-base font-bold text-amber-200 font-sans">
                  {content.facebook.headline_fa}
                </p>
              )}
            </div>

            {/* Post Body */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  Long-Form Narrative Body:
                </span>
                <button
                  onClick={() => handleCopy(content.facebook.body_en, 'fb_body')}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                >
                  {copiedKey === 'fb_body' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Body</span>
                </button>
              </div>

              {(languageMode === 'bilingual' || languageMode === 'en') && (
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                  {content.facebook.body_en}
                </div>
              )}

              {(languageMode === 'bilingual' || languageMode === 'fa') && (
                <div
                  dir="rtl"
                  className="text-sm text-amber-100 leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-4 rounded-lg border border-slate-800 font-sans"
                >
                  {content.facebook.body_fa}
                </div>
              )}
            </div>

            {/* Trust Hook & CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Local Rockville Trust &amp; Metro Pickup:
                </span>
                <p className="text-xs text-slate-300">{content.facebook.local_trust_hook_en}</p>
                {content.facebook.local_trust_hook_fa && (
                  <p dir="rtl" className="text-xs text-amber-200/90 font-sans mt-2 pt-2 border-t border-slate-800">
                    {content.facebook.local_trust_hook_fa}
                  </p>
                )}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Enrollment CTA &amp; Direct Phone:
                </span>
                <p className="text-xs text-slate-300">{content.facebook.cta_en}</p>
                {content.facebook.cta_fa && (
                  <p dir="rtl" className="text-xs text-amber-200/90 font-sans mt-2 pt-2 border-t border-slate-800">
                    {content.facebook.cta_fa}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== PHOTO PROMPTS TAB ===================== */}
        {activeTab === 'photo_prompts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  AI Image Generation Prompts (Midjourney v6.1 &amp; FLUX.1 Pro)
                </span>
                <span className="text-xs text-slate-400">
                  Photorealistic, lens optics, cinematic lighting &amp; Rockville Pike context
                </span>
              </div>
            </div>

            {/* Midjourney v6.1 Hero Prompt */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded">
                    Midjourney v6.1 (Official Production Prompt)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Aspect Ratio: {content.image_prompts.recommended_aspect_ratio}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(content.image_prompts.midjourney_v6_en, 'mj_prompt')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  {copiedKey === 'mj_prompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Midjourney Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800/80 font-mono text-xs text-emerald-300 leading-relaxed select-all">
                {content.image_prompts.midjourney_v6_en}
              </div>

              {/* Persian Explanation / Translation */}
              <div className="bg-slate-900/50 p-3.5 rounded-lg border border-slate-800/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  توضیحات و ترجمه پرامپت به فارسی:
                </span>
                <p dir="rtl" className="text-xs text-amber-200/90 leading-relaxed font-sans">
                  {content.image_prompts.midjourney_v6_fa}
                </p>
              </div>
            </div>

            {/* FLUX.1 Pro & DALL-E 3 Prompts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    FLUX.1 Pro Prompt:
                  </span>
                  <button
                    onClick={() => handleCopy(content.image_prompts.flux_pro_en, 'flux_prompt')}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                  >
                    {copiedKey === 'flux_prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {content.image_prompts.flux_pro_en}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    DALL-E 3 Prompt:
                  </span>
                  <button
                    onClick={() => handleCopy(content.image_prompts.dalle3_en, 'dalle_prompt')}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                  >
                    {copiedKey === 'dalle_prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {content.image_prompts.dalle3_en}
                </p>
              </div>
            </div>

            {/* Framing & Composition Details */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block">
                Camera Angle &amp; Dual-Brake Composition Guide:
              </span>
              <p className="text-xs text-slate-300">{content.image_prompts.composition_details_en}</p>
              {content.image_prompts.composition_details_fa && (
                <p dir="rtl" className="text-xs text-amber-200/90 font-sans pt-2 border-t border-slate-800">
                  {content.image_prompts.composition_details_fa}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ===================== VIDEO PROMPTS TAB ===================== */}
        {activeTab === 'video_prompts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  Cinematic AI Video Prompts (Runway Gen-3 / Sora / Kling / Luma)
                </span>
                <span className="text-xs text-slate-400">
                  Camera trajectory, speed, cockpit details, and spatial SFX audio
                </span>
              </div>
            </div>

            {/* Runway Gen-3 Prompt */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
                    Runway Gen-3 Alpha Prompt
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Motion: {content.video_prompts.motion_intensity}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(content.video_prompts.runway_gen3_en, 'runway_prompt')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  {copiedKey === 'runway_prompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Video Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800/80 font-mono text-xs text-emerald-300 leading-relaxed select-all">
                {content.video_prompts.runway_gen3_en}
              </div>

              <div className="bg-slate-900/50 p-3.5 rounded-lg border border-slate-800/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  راهنمای کارگردانی و ترجمه پرامپت ویدیویی به فارسی:
                </span>
                <p dir="rtl" className="text-xs text-amber-200/90 leading-relaxed font-sans">
                  {content.video_prompts.runway_gen3_fa}
                </p>
              </div>
            </div>

            {/* Sora / Kling AI Alternative */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  OpenAI Sora &amp; Kling AI Alternative Prompt:
                </span>
                <button
                  onClick={() => handleCopy(content.video_prompts.sora_kling_en, 'sora_prompt')}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                >
                  {copiedKey === 'sora_prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-xs font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                {content.video_prompts.sora_kling_en}
              </p>
            </div>

            {/* Directorial Cues: Camera Movement & Sound FX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block">
                  Camera Trajectory &amp; Dolly Move:
                </span>
                <p className="text-xs text-slate-300">{content.video_prompts.camera_movement_en}</p>
                {content.video_prompts.camera_movement_fa && (
                  <p dir="rtl" className="text-xs text-amber-200/90 font-sans pt-1 border-t border-slate-800">
                    {content.video_prompts.camera_movement_fa}
                  </p>
                )}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block">
                  Sound Effects (SFX) &amp; Cockpit Audio:
                </span>
                <p className="text-xs text-slate-300">{content.video_prompts.sound_fx_en}</p>
                {content.video_prompts.sound_fx_fa && (
                  <p dir="rtl" className="text-xs text-amber-200/90 font-sans pt-1 border-t border-slate-800">
                    {content.video_prompts.sound_fx_fa}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== MVA LAW & PSYCHOLOGY TAB ===================== */}
        {activeTab === 'mva_law' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  MVA Law, Tri-State Comparison &amp; Psychology Protocols
                </span>
              </div>
            </div>

            {/* Maryland Specific Code */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block">
                Maryland Traffic Law Reference:
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {content.mva_law_notes.md_specific_rule}
              </p>
              {content.mva_law_notes.md_specific_rule_fa && (
                <p dir="rtl" className="text-sm text-amber-200 leading-relaxed font-sans pt-2 border-t border-slate-800">
                  {content.mva_law_notes.md_specific_rule_fa}
                </p>
              )}
            </div>

            {/* Tri-State Comparison (MD vs DC vs VA) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                Tri-State Comparison (Maryland vs Washington D.C. vs Virginia):
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {content.mva_law_notes.tristate_comparison}
              </p>
              {content.mva_law_notes.tristate_comparison_fa && (
                <p dir="rtl" className="text-xs text-amber-200/90 leading-relaxed font-sans pt-2 border-t border-slate-800">
                  {content.mva_law_notes.tristate_comparison_fa}
                </p>
              )}
            </div>

            {/* Test Pass Tip & Psychology Protocol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  MVA Test Pass Secret (Examiner Gotcha):
                </span>
                <p className="text-xs text-rose-200 leading-relaxed">
                  {content.mva_law_notes.mva_test_pass_tip}
                </p>
                {content.mva_law_notes.mva_test_pass_tip_fa && (
                  <p dir="rtl" className="text-xs text-amber-200/90 font-sans leading-relaxed pt-2 border-t border-rose-900/30">
                    {content.mva_law_notes.mva_test_pass_tip_fa}
                  </p>
                )}
              </div>

              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Sam&apos;s Psychology Calming Technique:
                </span>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  {content.mva_law_notes.psychological_calm_tip}
                </p>
                {content.mva_law_notes.psychological_calm_tip_fa && (
                  <p dir="rtl" className="text-xs text-amber-200/90 font-sans leading-relaxed pt-2 border-t border-emerald-900/30">
                    {content.mva_law_notes.psychological_calm_tip_fa}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

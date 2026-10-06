'use client';

import React from 'react';
import { ShieldCheck, Award, MapPin, Phone, Globe, Sparkles, Car } from 'lucide-react';
import { BRAND_INFO } from '@/lib/driving-school-data';

interface NavbarProps {
  languageMode: 'bilingual' | 'en' | 'fa';
  setLanguageMode: (mode: 'bilingual' | 'en' | 'fa') => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({
  languageMode,
  setLanguageMode,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase">
              {BRAND_INFO.awards}
            </span>
            <span className="hidden sm:inline">
              Women-Owned &amp; Psychology-Led • Zero-Yelling Environment • Dual-Brake Fleet
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-200" />
              751 Rockville Pike, Rockville, MD 20852
            </span>
            <span className="hidden md:flex items-center gap-1 text-emerald-200 font-semibold">
              <Car className="w-3.5 h-3.5" />
              Free Rockville Metro Pickup
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Details */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-indigo-100 to-rose-200 bg-clip-text text-transparent">
                Sam&apos;s Driving School
              </h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold">
                Content Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>آموزشگاه رانندگی سام (راکویل، مریلند)</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-mono text-[11px]">samdrivingschool.org</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveSection('studio')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'studio'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Social Content Studio
          </button>
          <button
            onClick={() => setActiveSection('media_prompts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              activeSection === 'media_prompts'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow'
                : 'text-amber-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Photo &amp; Video Prompts</span>
          </button>
          <button
            onClick={() => setActiveSection('tristate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'tristate'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            MD vs DC vs VA Laws
          </button>
          <button
            onClick={() => setActiveSection('checklist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'checklist'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            MVA Test &amp; Anxiety Hacks
          </button>
          <button
            onClick={() => setActiveSection('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeSection === 'quiz'
                ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow'
                : 'text-rose-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>MVA Mock Quiz</span>
          </button>
          <button
            onClick={() => setActiveSection('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeSection === 'flashcards'
                ? 'bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow'
                : 'text-amber-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Flashcards</span>
          </button>
          <button
            onClick={() => setActiveSection('quiz_social_export')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeSection === 'quiz_social_export'
                ? 'bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white shadow'
                : 'text-rose-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>Social Export &amp; Prompts DB</span>
          </button>
          <button
            onClick={() => setActiveSection('tracker')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeSection === 'tracker'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                : 'text-purple-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Progress Tracker</span>
          </button>
          <button
            onClick={() => setActiveSection('pricing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'pricing'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Official Services
          </button>
        </nav>

        {/* Language Mode Toggle & Action */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => setLanguageMode('bilingual')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                languageMode === 'bilingual'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Dual View: English & Persian Side by Side"
            >
              EN / FA
            </button>
            <button
              onClick={() => setLanguageMode('en')}
              className={`px-2 py-1 rounded-md transition-all font-medium ${
                languageMode === 'en'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English Only"
            >
              EN
            </button>
            <button
              onClick={() => setLanguageMode('fa')}
              className={`px-2 py-1 rounded-md transition-all font-medium ${
                languageMode === 'fa'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="فارسی فقط"
            >
              فارسی
            </button>
          </div>

          <a
            href="tel:3012790000"
            className="hidden sm:inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>(301) 279-0000</span>
          </a>
        </div>
      </div>
    </header>
  );
}

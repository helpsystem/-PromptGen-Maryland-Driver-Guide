'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ConceptGenerator from '@/components/ConceptGenerator';
import ContentPackageViewer from '@/components/ContentPackageViewer';
import TriStateLawMatrix from '@/components/TriStateLawMatrix';
import MvaTestChecklist from '@/components/MvaTestChecklist';
import MvaMockQuiz from '@/components/MvaMockQuiz';
import AiMediaPromptStudio from '@/components/AiMediaPromptStudio';
import StudentProgressTracker from '@/components/StudentProgressTracker';
import FlashcardStudy from '@/components/FlashcardStudy';
import QuizSocialFlashcardStudio from '@/components/QuizSocialFlashcardStudio';
import ServicesOverview from '@/components/ServicesOverview';
import { CURATED_CONCEPTS, SocialMediaContentPackage } from '@/lib/driving-school-data';
import { Sparkles, Shield, HeartHandshake, Car, Award, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';

export default function Home() {
  const [languageMode, setLanguageMode] = useState<'bilingual' | 'en' | 'fa'>('bilingual');
  const [activeSection, setActiveSection] = useState<string>('studio');
  const [activePackage, setActivePackage] = useState<SocialMediaContentPackage>(CURATED_CONCEPTS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        languageMode={languageMode}
        setLanguageMode={setLanguageMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-10 md:py-14 px-4">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-rose-600/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-rose-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">
              {languageMode === 'fa'
                ? 'استودیوی استراتژیست محتوا و معماری پرامپت آموزشگاه رانندگی سام'
                : "Sam's Driving School • Rockville, MD • Voted Best of 2025"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {languageMode === 'fa' ? (
              <span className="font-sans">
                تولید محتوا و پرامپت‌نویسی تخصصی{' '}
                <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                  آموزش رانندگی مریلند و منطقه DMV
                </span>
              </span>
            ) : (
              <span>
                Maryland MVA &amp; Tri-State{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                  Content Architect &amp; AI Prompt Studio
                </span>
              </span>
            )}
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {languageMode === 'fa' ? (
              <span className="font-sans">
                طراحی اسکریپت‌های بومی برای تیک‌تاک، ریلز اینستاگرام، فیسبوک، یوتیوب شورتز به همراه پرامپت‌های سینمایی فوتورئال میدجورنی و ران‌وی با جزئیات کامل قوانین مریلند، دی‌سی و ویرجینیا، تکنیک‌های روان‌شناسی غلبه بر ترس رانندگی و قبولی تضمینی در آزمون MVA.
              </span>
            ) : (
              <span>
                Platform-native content for TikTok, Instagram Reels, Facebook, and YouTube Shorts from a single concept, paired with photorealistic Midjourney v6 &amp; Runway Gen-3 prompts, Tri-State traffic laws, and Sam&apos;s psychology-led driving anxiety relief.
              </span>
            )}
          </p>

          {/* Quick Pillar Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              <span>{languageMode === 'fa' ? 'روان‌شناسی رفع اضطراب رانندگی' : 'Psychology-Led / Zero-Yelling'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>{languageMode === 'fa' ? 'ناوگان خودروهای دو پداله' : 'Dual-Brake Certified Fleet'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
              <Car className="w-4 h-4 text-emerald-400" />
              <span>{languageMode === 'fa' ? 'متروی رایگان راکویل' : 'Free Rockville Metro Pickup'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{languageMode === 'fa' ? 'برترین آموزشگاه ۲۰۲۵' : 'Voted Best of 2025'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-10">
        {/* Navigation Selector Bar (Mobile Friendly) */}
        <div className="flex flex-wrap items-center justify-center p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-4xl mx-auto shadow-md gap-1">
          <button
            onClick={() => setActiveSection('studio')}
            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeSection === 'studio'
                ? 'bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {languageMode === 'fa' ? 'اسکریپت شبکه‌های اجتماعی' : 'Social Scripts Studio'}
          </button>
          <button
            onClick={() => setActiveSection('media_prompts')}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeSection === 'media_prompts'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow'
                : 'text-amber-300 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{languageMode === 'fa' ? 'پرامپت عکس و فیلم' : 'Photo & Video Prompts'}</span>
          </button>
          <button
            onClick={() => setActiveSection('tristate')}
            className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeSection === 'tristate'
                ? 'bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {languageMode === 'fa' ? 'قوانین MD / DC / VA' : 'Tri-State Laws'}
          </button>
          <button
            onClick={() => setActiveSection('checklist')}
            className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeSection === 'checklist'
                ? 'bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {languageMode === 'fa' ? 'چک‌لیست آزمون MVA' : 'MVA Test Hacks'}
          </button>
          <button
            onClick={() => setActiveSection('quiz')}
            className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeSection === 'quiz'
                ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow'
                : 'text-rose-300 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>{languageMode === 'fa' ? 'کوییز آزمایشی' : 'MVA Quiz'}</span>
          </button>
          <button
            onClick={() => setActiveSection('flashcards')}
            className={`flex-1 min-w-[105px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeSection === 'flashcards'
                ? 'bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow'
                : 'text-amber-300 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{languageMode === 'fa' ? 'فلش‌کارت‌ها' : 'Flashcards'}</span>
          </button>
          <button
            onClick={() => setActiveSection('quiz_social_export')}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeSection === 'quiz_social_export'
                ? 'bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white shadow'
                : 'text-rose-300 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>{languageMode === 'fa' ? 'استخراج سوشال و پرامپت‌ها' : 'Social Export & Prompts'}</span>
          </button>
          <button
            onClick={() => setActiveSection('tracker')}
            className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeSection === 'tracker'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>{languageMode === 'fa' ? 'نمودار پیشرفت' : 'Progress Tracker'}</span>
          </button>
          <button
            onClick={() => setActiveSection('pricing')}
            className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeSection === 'pricing'
                ? 'bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {languageMode === 'fa' ? 'خدمات سام' : 'Official Services'}
          </button>
        </div>

        {/* SECTION 1: STUDIO (Content Generator & Package Viewer) */}
        {activeSection === 'studio' && (
          <div className="space-y-8">
            <ConceptGenerator
              onSelectConcept={(pkg) => setActivePackage(pkg)}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              languageMode={languageMode}
            />

            <ContentPackageViewer
              content={activePackage}
              languageMode={languageMode}
            />
          </div>
        )}

        {/* SECTION 2: AI PHOTO & VIDEO MEDIA PROMPT STUDIO */}
        {activeSection === 'media_prompts' && (
          <AiMediaPromptStudio languageMode={languageMode} />
        )}

        {/* SECTION 3: TRI-STATE LAWS MATRIX */}
        {activeSection === 'tristate' && (
          <TriStateLawMatrix languageMode={languageMode} />
        )}

        {/* SECTION 4: MVA ROAD TEST CHECKLIST & ANXIETY HACKS */}
        {activeSection === 'checklist' && (
          <MvaTestChecklist languageMode={languageMode} />
        )}

        {/* SECTION 5: MVA MOCK PRACTICE QUIZ */}
        {activeSection === 'quiz' && (
          <MvaMockQuiz
            languageMode={languageMode}
            onViewProgressTracker={() => setActiveSection('tracker')}
          />
        )}

        {/* SECTION 6: FLASHCARD STUDY MODE */}
        {activeSection === 'flashcards' && (
          <FlashcardStudy
            languageMode={languageMode}
            onNavigateToQuiz={() => setActiveSection('quiz')}
            onNavigateToSocialStudio={() => setActiveSection('quiz_social_export')}
          />
        )}

        {/* SECTION 6.5: SOCIAL MEDIA FLASHCARDS & 100% FACE-LOCKED PROMPTS STUDIO */}
        {activeSection === 'quiz_social_export' && (
          <QuizSocialFlashcardStudio languageMode={languageMode} />
        )}

        {/* SECTION 7: STUDENT PROGRESS TRACKER & LAW WEAKNESS MATRIX */}
        {activeSection === 'tracker' && (
          <StudentProgressTracker
            languageMode={languageMode}
            onNavigateToQuiz={() => setActiveSection('quiz')}
            onNavigateToLaws={() => setActiveSection('tristate')}
          />
        )}

        {/* SECTION 8: OFFICIAL SAM'S DRIVING SCHOOL SERVICES */}
        {activeSection === 'pricing' && (
          <ServicesOverview languageMode={languageMode} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <p className="text-slate-300 font-bold">
              Sam&apos;s Driving School • Voted &ldquo;Best of 2025&rdquo; in Rockville, MD
            </p>
            <p className="text-slate-400">
              751 Rockville Pike, Rockville, MD 20852 • (301) 279-0000 • samdrivingschool.org
            </p>
            <p className="text-slate-500 text-[11px]">
              آموزشگاه رانندگی سام • مجهز به خودروهای دو کنترله • رفع اضطراب و استرس رانندگی با متدهای علمی روان‌شناسی
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={() => {
                setActiveSection('media_prompts');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              Photo &amp; Video Prompts
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveSection('tristate');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              Tri-State Law Matrix
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveSection('checklist');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              MVA Test Checklist
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveSection('quiz');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="text-rose-400 hover:text-rose-300 transition-colors font-medium"
            >
              MVA Mock Quiz
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveSection('flashcards');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              Flashcards
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveSection('quiz_social_export');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="text-rose-400 hover:text-rose-300 transition-colors font-medium"
            >
              Social Export &amp; Prompts DB
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveSection('tracker');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Progress Tracker
            </button>
            <span>•</span>
            <a
              href="https://samdrivingschool.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Official Website
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Scale,
  BrainCircuit,
  Award,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  Flame,
  ArrowRight
} from 'lucide-react';
import { MOCK_QUIZ_QUESTIONS, MockQuizQuestion } from '@/lib/driving-school-data';

type ConfidenceLevel = 'none' | 'need_review' | 'almost' | 'mastered';

interface FlashcardStudyProps {
  languageMode: 'bilingual' | 'en' | 'fa';
  onNavigateToQuiz?: () => void;
  onNavigateToSocialStudio?: () => void;
}

export default function FlashcardStudy({
  languageMode,
  onNavigateToQuiz,
  onNavigateToSocialStudio,
}: FlashcardStudyProps) {
  const [deck, setDeck] = useState<MockQuizQuestion[]>(MOCK_QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, ConfidenceLevel>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('mva_flashcard_confidence');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to load flashcard confidence ratings:', e);
      }
    }
    return {};
  });
  const [filterState, setFilterState] = useState<'all' | 'need_review' | 'mastered'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Save confidence ratings to localStorage
  const saveConfidence = (qId: string, level: ConfidenceLevel) => {
    const updated = { ...confidenceRatings, [qId]: level };
    setConfidenceRatings(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mva_flashcard_confidence', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save flashcard confidence:', e);
      }
    }
  };

  // Filtered deck calculation
  const filteredDeck = deck.filter((card) => {
    if (filterState !== 'all') {
      const rating = confidenceRatings[card.id] || 'none';
      if (filterState === 'need_review' && !(rating === 'need_review' || rating === 'none')) return false;
      if (filterState === 'mastered' && rating !== 'mastered') return false;
    }
    if (categoryFilter !== 'all') {
      if (card.category !== categoryFilter) return false;
    }
    return true;
  });

  const activeCard: MockQuizQuestion | undefined = filteredDeck[currentIndex] || filteredDeck[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentIndex < filteredDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredDeck.length - 1);
    }
  };

  const handleShuffleDeck = () => {
    setIsFlipped(false);
    const shuffled = [...MOCK_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const handleResetConfidence = () => {
    setConfidenceRatings({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mva_flashcard_confidence');
    }
  };

  // Keyboard navigation (Space to flip, arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNextCard();
      } else if (e.code === 'ArrowLeft') {
        handlePrevCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Calculate mastery statistics
  const totalCards = MOCK_QUIZ_QUESTIONS.length;
  const masteredCount = Object.values(confidenceRatings).filter((r) => r === 'mastered').length;
  const needReviewCount = Object.values(confidenceRatings).filter((r) => r === 'need_review').length;
  const almostCount = Object.values(confidenceRatings).filter((r) => r === 'almost').length;
  const masteryPercentage = Math.round((masteredCount / totalCards) * 100);

  const currentConfidence = activeCard ? confidenceRatings[activeCard.id] || 'none' : 'none';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Interactive Flashcard Deck</span>
              </span>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold px-3 py-1 rounded-full">
                Active Recall &amp; Spaced Repetition
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {languageMode === 'fa'
                ? 'فلش‌کارت‌های هوشمند یادگیری قوانین و تله‌های آزمون MVA'
                : 'MVA Driving Laws & Gotchas Flashcards'}
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {languageMode === 'fa'
                ? 'مرور فعال با قابلیت برگرداندن کارت (Flip Card)، سنجش میزان تسلط ذهنی (Confidence Level) و تمرکز خودکار بر مباحث نیازمند تکرار قبل از آزمون رسمی مریلند.'
                : 'Test your active recall, flip the card to reveal Maryland statutes, and tag your confidence level to prioritize weak areas before test day.'}
            </p>
          </div>

          {/* Mastery Progress Card */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-4 shrink-0 shadow-lg">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                {languageMode === 'fa' ? 'درصد تسلط کلی' : 'Mastery Level'}
              </span>
              <span className="text-3xl font-black text-emerald-400">
                {masteryPercentage}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {masteredCount} / {totalCards} {languageMode === 'fa' ? 'کارت مسلط' : 'Mastered'}
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] border-l border-slate-800 pl-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-300">{masteredCount} Mastered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-slate-300">{almostCount} Almost Got It</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-slate-300">{needReviewCount} Need Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filter, Shuffle, Reset */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Confidence Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              <span>Status:</span>
            </span>
            <button
              onClick={() => {
                setFilterState('all');
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterState === 'all'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({totalCards})
            </button>
            <button
              onClick={() => {
                setFilterState('need_review');
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                filterState === 'need_review'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Need Review ({needReviewCount})</span>
            </button>
            <button
              onClick={() => {
                setFilterState('mastered');
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                filterState === 'mastered'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Mastered ({masteredCount})</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {onNavigateToSocialStudio && (
              <button
                onClick={onNavigateToSocialStudio}
                className="bg-gradient-to-r from-rose-600 to-indigo-600 hover:opacity-95 text-white px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-950/30"
                title="Export Flashcards to Social Media & AI Prompts"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{languageMode === 'fa' ? 'استخراج سوشال مدیا و پرامپت‌ها' : 'Social Export & Prompts'}</span>
              </button>
            )}

            <button
              onClick={handleShuffleDeck}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Randomize card order"
            >
              <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
              <span>{languageMode === 'fa' ? 'بر زدن کارت‌ها' : 'Shuffle Deck'}</span>
            </button>

            <button
              onClick={handleResetConfidence}
              className="text-slate-400 hover:text-slate-200 p-2 rounded-xl border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
              title="Reset confidence levels"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Model & Curriculum Categories Row */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 px-1 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>{languageMode === 'fa' ? 'مدل سوال و آموزش:' : 'Question Model:'}</span>
          </span>
          {[
            { id: 'all', label_en: 'All Topics', label_fa: 'همه مباحث', icon: '🌟' },
            { id: 'tristate_laws', label_en: 'Tri-State Laws', label_fa: 'قوانین ترای‌استیت', icon: '🏛️' },
            { id: 'mva_maneuvers', label_en: 'MVA Maneuvers', label_fa: 'مانورهای عملی MVA', icon: '🚗' },
            { id: 'instant_fails', label_en: 'Instant Fails', label_fa: 'خطاهای ردی فوری', icon: '🛑' },
            { id: 'psychology_anxiety', label_en: 'Psychology Relief', label_fa: 'روان‌شناسی سام', icon: '🧠' },
            { id: 'emergency_defensive', label_en: 'Emergencies', label_fa: 'شرایط اضطراری', icon: '🚨' },
            { id: 'curriculum_services', label_en: '36-Hr Program', label_fa: 'دوره ۳۶ ساعته', icon: '🎓' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition flex items-center gap-1 ${
                categoryFilter === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{languageMode === 'fa' ? cat.label_fa : cat.label_en}</span>
            </button>
          ))}
        </div>
      </div>

      {filteredDeck.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <Award className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No cards matching this filter!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You don’t have any cards marked under this category yet. Switch back to &quot;All Cards&quot; to review the full deck.
          </p>
          <button
            onClick={() => setFilterState('all')}
            className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Show All Cards
          </button>
        </div>
      ) : activeCard ? (
        /* ================= THE FLASHCARD ================= */
        <div className="space-y-6">
          {/* Card Meta & Step Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                Card {currentIndex + 1} of {filteredDeck.length}
              </span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">
                {activeCard.state_tag}
              </span>
            </div>

            <span className="hidden sm:inline text-slate-500 text-[11px]">
              Shortcut: Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">Space</kbd> to flip, <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">← / →</kbd> to navigate
            </span>
          </div>

          {/* Interactive 3D/Flipping Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[360px] md:min-h-[400px] cursor-pointer perspective-1000 select-none group"
          >
            <div
              className={`w-full min-h-[360px] md:min-h-[400px] rounded-2xl border transition-all duration-500 flex flex-col justify-between p-6 md:p-8 shadow-2xl relative overflow-hidden ${
                isFlipped
                  ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border-indigo-500/60 ring-1 ring-indigo-500/30'
                  : 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Tag & Flip Hint */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isFlipped
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isFlipped ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>ANSWER &amp; STATUTE (پشت کارت: پاسخ)</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>QUESTION SCENARIO (روی کارت: سوال)</span>
                      </>
                    )}
                  </span>

                  {activeCard && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                      <span>
                        {activeCard.category === 'tristate_laws'
                          ? '🏛️'
                          : activeCard.category === 'mva_maneuvers'
                          ? '🚗'
                          : activeCard.category === 'instant_fails'
                          ? '🛑'
                          : activeCard.category === 'psychology_anxiety'
                          ? '🧠'
                          : activeCard.category === 'curriculum_services'
                          ? '🎓'
                          : '🚨'}
                      </span>
                      <span>{activeCard.state_tag}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-indigo-400 group-hover:text-indigo-300 font-semibold transition-colors">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'Click to view Question' : 'Click to Flip for Answer'}</span>
                </div>
              </div>

              {/* CARD BODY CONTENT */}
              <div className="my-auto py-6 space-y-4">
                {!isFlipped ? (
                  /* FRONT: QUESTION */
                  <div className="space-y-4">
                    {(languageMode === 'bilingual' || languageMode === 'en') && (
                      <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                        {activeCard.question_en}
                      </h3>
                    )}
                    {(languageMode === 'bilingual' || languageMode === 'fa') && (
                      <h3
                        dir="rtl"
                        className="text-base md:text-lg font-semibold text-amber-200 leading-relaxed font-sans pt-2 border-t border-slate-800/80"
                      >
                        {activeCard.question_fa}
                      </h3>
                    )}

                    <div className="pt-3 flex items-center gap-2 text-xs text-slate-400">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        {languageMode === 'fa'
                          ? 'پاسخ و قانون را در ذهن مرور کنید، سپس روی کارت کلیک کنید تا پاسخ باز شود.'
                          : 'Try to recall the Maryland rule in your mind before clicking to flip.'}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* BACK: ANSWER, STATUTE & EXPLANATION */
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* Correct Answer Highlight */}
                    <div className="bg-emerald-950/40 border border-emerald-500/50 p-4 rounded-xl space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {languageMode === 'fa' ? 'پاسخ صحیح:' : 'Correct Answer:'}
                      </span>
                      {(languageMode === 'bilingual' || languageMode === 'en') && (
                        <p className="text-sm md:text-base font-bold text-white">
                          {activeCard.options_en[activeCard.correct_index]}
                        </p>
                      )}
                      {(languageMode === 'bilingual' || languageMode === 'fa') && activeCard.options_fa?.[activeCard.correct_index] && (
                        <p dir="rtl" className="text-sm md:text-base font-bold text-amber-200 font-sans pt-1">
                          {activeCard.options_fa[activeCard.correct_index]}
                        </p>
                      )}
                    </div>

                    {/* Legal Statute Citation */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-bold flex items-center gap-1 text-indigo-400">
                          <Scale className="w-3.5 h-3.5" />
                          <span>Statute &amp; Legal Reference:</span>
                        </span>
                        <span className="font-mono text-[11px] text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {activeCard.statute_reference}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed pt-1">
                        {activeCard.explain_why_en}
                      </p>
                      {activeCard.explain_why_fa && (languageMode === 'bilingual' || languageMode === 'fa') && (
                        <p dir="rtl" className="text-amber-200/90 font-sans pt-1 border-t border-slate-800/80">
                          {activeCard.explain_why_fa}
                        </p>
                      )}
                    </div>

                    {/* Sam's Instructor Tip */}
                    <div className="bg-indigo-950/20 border border-indigo-800/40 p-3 rounded-lg flex items-start gap-2 text-xs">
                      <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div className="text-indigo-200 leading-relaxed">
                        <span className="font-bold text-purple-300">
                          {languageMode === 'fa' ? 'نکته مربی سام:' : "Sam's Tip: "}
                        </span>
                        {activeCard.instructor_tip}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* BOTTOM: Small Corner Question Code & Card Number (ریز در پایین گوشه) */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-amber-500/30 text-amber-300 font-bold">
                    CODE: #{activeCard.id.replace('q_', '').toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    CARD {currentIndex + 1}/{filteredDeck.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px]">Your rating:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      currentConfidence === 'mastered'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : currentConfidence === 'almost'
                        ? 'bg-amber-500/20 text-amber-300'
                        : currentConfidence === 'need_review'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {currentConfidence.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CONFIDENCE LEVEL SELECTOR & NEXT BUTTONS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Mark Your Confidence Level on this Law:</span>
              </span>

              <span className="text-[11px] text-slate-500">
                Helps prioritize questions in future reviews
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* 3 Confidence Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => saveConfidence(activeCard.id, 'need_review')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    currentConfidence === 'need_review'
                      ? 'bg-rose-600 text-white border-rose-500 shadow-md ring-2 ring-rose-400/30'
                      : 'bg-slate-950 text-rose-300 border-rose-900/40 hover:bg-rose-950/40'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{languageMode === 'fa' ? 'نیاز به مرور (بلد نیستم)' : 'Need Review 🔴'}</span>
                </button>

                <button
                  onClick={() => saveConfidence(activeCard.id, 'almost')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    currentConfidence === 'almost'
                      ? 'bg-amber-600 text-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-slate-950 text-amber-300 border-amber-900/40 hover:bg-amber-950/40'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{languageMode === 'fa' ? 'تقریباً بلدم' : 'Almost Got It 🟡'}</span>
                </button>

                <button
                  onClick={() => saveConfidence(activeCard.id, 'mastered')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    currentConfidence === 'mastered'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                      : 'bg-slate-950 text-emerald-300 border-emerald-900/40 hover:bg-emerald-950/40'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{languageMode === 'fa' ? 'کاملاً مسلطم' : 'Mastered 🟢'}</span>
                </button>
              </div>

              {/* Navigation: Prev / Next */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCard}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{languageMode === 'fa' ? 'قبلی' : 'Previous'}</span>
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
                </button>

                <button
                  onClick={handleNextCard}
                  className="bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>{languageMode === 'fa' ? 'کارت بعدی' : 'Next Card'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Call to Action Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
          <span>
            {languageMode === 'fa'
              ? 'آموزشگاه رانندگی سام در راکویل (۷۵۱ Rockville Pike) • دوره‌های آنلاین ۳۰ ساعته در زوم + ۶ ساعت آموزش عملی در خیابان'
              : "Sam's Driving School • 751 Rockville Pike • 30-Hour Interactive Zoom Drivers Ed + 6-Hour Behind-the-Wheel"}
          </span>
        </div>

        {onNavigateToQuiz && (
          <button
            onClick={onNavigateToQuiz}
            className="text-indigo-400 hover:text-indigo-300 font-semibold whitespace-nowrap flex items-center gap-1 cursor-pointer"
          >
            <span>Test Yourself in Mock Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

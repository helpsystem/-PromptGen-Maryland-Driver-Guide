'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  Info,
  Scale,
  BrainCircuit,
  Phone,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { MOCK_QUIZ_QUESTIONS, MockQuizQuestion, BRAND_INFO } from '@/lib/driving-school-data';

interface MvaMockQuizProps {
  languageMode: 'bilingual' | 'en' | 'fa';
  onViewProgressTracker?: () => void;
}

function getQuizQuestions(count: number | 'all' = 5, category: string = 'all'): MockQuizQuestion[] {
  let pool = [...MOCK_QUIZ_QUESTIONS];
  if (category !== 'all') {
    pool = pool.filter((q) => q.category === category);
  }
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  if (count === 'all') return shuffled;
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function MvaMockQuiz({ languageMode, onViewProgressTracker }: MvaMockQuizProps) {
  const [quizSize, setQuizSize] = useState<number | 'all'>(5);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [questions, setQuestions] = useState<MockQuizQuestion[]>(() => getQuizQuestions(5, 'all'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  const handleRestartQuiz = (newSize?: number | 'all', newCat?: string) => {
    const targetSize = newSize !== undefined ? newSize : quizSize;
    const targetCat = newCat !== undefined ? newCat : selectedCategory;
    setQuestions(getQuizQuestions(targetSize, targetCat));
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsQuizComplete(false);
  };

  if (questions.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        Loading Tri-State MVA Quiz...
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const hasAnsweredCurrent = selectedAnswers[currentIndex] !== undefined;
  const selectedOptionIndex = selectedAnswers[currentIndex];
  const isCurrentCorrect = selectedOptionIndex === currentQ.correct_index;

  const handleSelectOption = (idx: number) => {
    if (hasAnsweredCurrent) return; // Prevent changing after instant feedback
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(selectedAnswers[currentIndex + 1] !== undefined);
    } else {
      setIsQuizComplete(true);
      if (typeof window !== 'undefined') {
        try {
          const missedCats: string[] = [];
          questions.forEach((q, idx) => {
            if (selectedAnswers[idx] !== q.correct_index) {
              missedCats.push(q.state_tag);
            }
          });
          const existingRaw = localStorage.getItem('mva_quiz_history');
          const existing = existingRaw ? JSON.parse(existingRaw) : [];
          const calculatedCorrect = Object.entries(selectedAnswers).filter(
            ([qIdx, optIdx]) => questions[Number(qIdx)]?.correct_index === optIdx
          ).length;
          const newEntry = {
            id: `session-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            displayDate: `Test #${existing.length + 1}`,
            scorePercent: Math.round((calculatedCorrect / questions.length) * 100),
            correctCount: calculatedCorrect,
            totalQuestions: questions.length,
            missedCategories: missedCats,
          };
          localStorage.setItem('mva_quiz_history', JSON.stringify([...existing, newEntry]));
        } catch (e) {
          console.error('Failed to auto-save quiz session:', e);
        }
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowExplanation(true);
    }
  };

  // Compute final score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, optIdx]) => questions[Number(qIdx)]?.correct_index === optIdx
  ).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);
  const isPassing = scorePercent >= 80; // Maryland MVA standard is typically ~85%

  return (
    <div className="space-y-6">
      {/* Quiz Master Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-52 h-52 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {languageMode === 'fa'
                  ? 'آزمون شبیه‌ساز MVA و قوانین ترافیکی منطقه DMV'
                  : 'Interactive MVA Mock Quiz & Tri-State Practice'}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-400">
              {languageMode === 'fa'
                ? '۵ سوال تصادفی از قوانین مریلند، دی‌سی و ویرجینیا به همراه بازخورد آنی و تحلیل چرایی پاسخ درست'
                : '5 random questions drawn from Maryland MVA, D.C., and Virginia laws with instant feedback and "Explain Why" breakdowns.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Quiz Size selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 px-1 font-bold">
                {languageMode === 'fa' ? 'تعداد:' : 'Length:'}
              </span>
              {[
                { size: 5, label: '5 Qs' },
                { size: 10, label: '10 Qs' },
                { size: 'all', label: `All (${MOCK_QUIZ_QUESTIONS.length})` }
              ].map((item) => (
                <button
                  key={String(item.size)}
                  onClick={() => {
                    const s = item.size as number | 'all';
                    setQuizSize(s);
                    handleRestartQuiz(s);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition ${
                    quizSize === item.size
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleRestartQuiz()}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 transition-all cursor-pointer shadow-sm"
              title="Shuffle a new set of questions"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span>{languageMode === 'fa' ? 'آزمون تصادفی جدید' : 'New Random Quiz'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter selector */}
        <div className="pt-3 pb-1 border-b border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[10px] font-bold text-slate-400 block px-1">
            {languageMode === 'fa' ? 'فیلتر سرفصل:' : 'Category:'}
          </span>
          {[
            { id: 'all', label_en: 'All Topics', label_fa: 'همه مباحث', icon: '🌟' },
            { id: 'tristate_laws', label_en: 'Tri-State Laws', label_fa: 'قوانین ترای‌استیت', icon: '🏛️' },
            { id: 'mva_maneuvers', label_en: 'MVA Maneuvers', label_fa: 'مانورهای عملی', icon: '🚗' },
            { id: 'instant_fails', label_en: 'Instant Fails', label_fa: 'ردی فوری', icon: '🛑' },
            { id: 'psychology_anxiety', label_en: 'Psychology', label_fa: 'روان‌شناسی سام', icon: '🧠' },
            { id: 'emergency_defensive', label_en: 'Emergencies', label_fa: 'شرایط اضطراری', icon: '🚨' },
            { id: 'curriculum_services', label_en: '36-Hr Program', label_fa: 'دوره ۳۶ ساعته', icon: '🎓' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                handleRestartQuiz(quizSize, cat.id);
              }}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{languageMode === 'fa' ? cat.label_fa : cat.label_en}</span>
            </button>
          ))}
        </div>

        {!isQuizComplete ? (
          /* ================= ACTIVE QUIZ VIEW ================= */
          <div className="mt-6 space-y-6">
            {/* Progress Bar & Badges */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">
                    {languageMode === 'fa'
                      ? `سوال ${currentIndex + 1} از ${questions.length}`
                      : `Question ${currentIndex + 1} of ${questions.length}`}
                  </span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">
                    {currentQ.state_tag}
                  </span>
                  {currentQ.category_label_en && (
                    <span className="text-[9px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                      {languageMode === 'fa' ? currentQ.category_label_fa : currentQ.category_label_en}
                    </span>
                  )}
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  {Object.keys(selectedAnswers).length}/{questions.length} {languageMode === 'fa' ? 'پاسخ داده شده' : 'Answered'}
                </span>
              </div>

              {/* Visual Progress Steps */}
              <div
                className={`grid gap-1.5 ${
                  questions.length <= 5
                    ? 'grid-cols-5'
                    : questions.length <= 10
                    ? 'grid-cols-5 sm:grid-cols-10'
                    : 'grid-cols-8 sm:grid-cols-12 md:grid-cols-16'
                }`}
              >
                {questions.map((q, idx) => {
                  const answered = selectedAnswers[idx] !== undefined;
                  const isCorrect = selectedAnswers[idx] === q.correct_index;
                  const isCurrent = idx === currentIndex;
                  return (
                    <div
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowExplanation(selectedAnswers[idx] !== undefined);
                      }}
                      className={`h-2 rounded-full cursor-pointer transition-all ${
                        isCurrent
                          ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 bg-indigo-500'
                          : answered
                          ? isCorrect
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                          : 'bg-slate-800'
                      }`}
                      title={`Go to Question ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Question Text Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2 shadow-inner">
              {(languageMode === 'bilingual' || languageMode === 'en') && (
                <p className="text-sm md:text-base font-bold text-white leading-relaxed">
                  {currentQ.question_en}
                </p>
              )}
              {(languageMode === 'bilingual' || languageMode === 'fa') && (
                <p
                  dir="rtl"
                  className="text-sm md:text-base font-semibold text-amber-200 leading-relaxed font-sans pt-1 border-t border-slate-800/80"
                >
                  {currentQ.question_fa}
                </p>
              )}
            </div>

            {/* Answer Options Grid */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {languageMode === 'fa' ? 'گزینه مورد نظر خود را انتخاب کنید:' : 'Select an Answer:'}
              </span>

              <div className="space-y-2.5">
                {currentQ.options_en.map((optEn, optIdx) => {
                  const isSelected = selectedOptionIndex === optIdx;
                  const isThisCorrect = optIdx === currentQ.correct_index;

                  let cardStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300';
                  let badge = (
                    <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:border-slate-500">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  );

                  if (hasAnsweredCurrent) {
                    if (isThisCorrect) {
                      cardStyle = 'bg-emerald-950/40 border-emerald-500/70 text-emerald-200 shadow-sm';
                      badge = (
                        <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      );
                    } else if (isSelected && !isThisCorrect) {
                      cardStyle = 'bg-rose-950/40 border-rose-500/70 text-rose-200 shadow-sm';
                      badge = (
                        <span className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white">
                          <XCircle className="w-4 h-4" />
                        </span>
                      );
                    } else {
                      cardStyle = 'bg-slate-950/50 border-slate-800/60 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer group flex items-start gap-3.5 ${cardStyle}`}
                    >
                      <div className="shrink-0 mt-0.5">{badge}</div>
                      <div className="space-y-1 flex-1">
                        {(languageMode === 'bilingual' || languageMode === 'en') && (
                          <p className="text-xs md:text-sm font-medium leading-relaxed">{optEn}</p>
                        )}
                        {(languageMode === 'bilingual' || languageMode === 'fa') && currentQ.options_fa?.[optIdx] && (
                          <p
                            dir="rtl"
                            className="text-xs md:text-sm text-amber-200/90 leading-relaxed font-sans pt-0.5"
                          >
                            {currentQ.options_fa[optIdx]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instant Feedback Banner & "Explain Why" Section */}
            {hasAnsweredCurrent && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Status Bar */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isCurrentCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCurrentCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                    <div>
                      <p className="text-xs md:text-sm font-bold">
                        {isCurrentCorrect
                          ? languageMode === 'fa'
                            ? 'کاملا درست است! +۱ نمره'
                            : 'Correct! Excellent driving knowledge.'
                          : languageMode === 'fa'
                            ? 'پاسخ اشتباه بود. گزینه درست مشخص شده است.'
                            : 'Incorrect. The correct option is highlighted in green.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="text-xs font-bold underline hover:no-underline flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {showExplanation
                        ? languageMode === 'fa'
                          ? 'بستن تحلیل'
                          : 'Hide Explanation'
                        : languageMode === 'fa'
                          ? 'چرا این پاسخ درست است؟'
                          : 'Explain Why'}
                    </span>
                  </button>
                </div>

                {/* "EXPLAIN WHY" Detailed Card */}
                {showExplanation && (
                  <div className="bg-slate-950 border border-indigo-900/50 rounded-xl p-5 space-y-3.5 shadow-xl">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Scale className="w-4 h-4" />
                        {languageMode === 'fa' ? 'تحلیل حقوقی و دلیل علمی (Explain Why):' : 'Legal Statute & Rationale (Explain Why):'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {currentQ.statute_reference}
                      </span>
                    </div>

                    {(languageMode === 'bilingual' || languageMode === 'en') && (
                      <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                        {currentQ.explain_why_en}
                      </p>
                    )}

                    {(languageMode === 'bilingual' || languageMode === 'fa') && (
                      <p
                        dir="rtl"
                        className="text-xs md:text-sm text-amber-200 leading-relaxed font-sans pt-1 border-t border-slate-800/80"
                      >
                        {currentQ.explain_why_fa}
                      </p>
                    )}

                    {/* Sam's Instructor Tip */}
                    <div className="bg-indigo-950/20 border border-indigo-800/40 p-3 rounded-lg flex items-start gap-2.5 mt-2">
                      <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-indigo-200 leading-relaxed">
                        <span className="font-bold text-purple-300">
                          {languageMode === 'fa' ? 'نکته مربی سام:' : "Sam's Instructor Tip: "}
                        </span>
                        {currentQ.instructor_tip}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Controls / Next Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrevQuestion}
                disabled={currentIndex === 0}
                className="text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none px-3 py-2 rounded-lg font-medium transition-all"
              >
                {languageMode === 'fa' ? '← سوال قبلی' : '← Previous Question'}
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={!hasAnsweredCurrent}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>
                  {currentIndex === questions.length - 1
                    ? languageMode === 'fa'
                      ? 'مشاهده نتیجه نهایی آزمون'
                      : 'Finish Quiz & View Score'
                    : languageMode === 'fa'
                      ? 'سوال بعدی →'
                      : 'Next Question →'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ================= SCORE REPORT & SUMMARY ================= */
          <div className="mt-6 space-y-6 animate-in zoom-in-95 duration-300">
            {/* Score Hero Banner */}
            <div
              className={`p-6 md:p-8 rounded-2xl border text-center space-y-3 relative overflow-hidden ${
                isPassing
                  ? 'bg-gradient-to-b from-emerald-950/50 via-slate-900 to-slate-950 border-emerald-500/40'
                  : 'bg-gradient-to-b from-amber-950/50 via-slate-900 to-slate-950 border-amber-500/40'
              }`}
            >
              <div className="inline-flex p-3 rounded-full bg-slate-950/80 border border-slate-800 mb-1">
                <Award
                  className={`w-10 h-10 ${isPassing ? 'text-emerald-400' : 'text-amber-400'}`}
                />
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white">
                {isPassing
                  ? languageMode === 'fa'
                    ? 'تبریک! نمره قبولی در آزمون استاندارد MVA 🎉'
                    : 'Congratulations! You Passed the MVA Standard 🎉'
                  : languageMode === 'fa'
                    ? 'نیاز به تمرین بیشتر برای رسیدن به استاندارد ۸۵٪ MVA'
                    : 'Good Effort! Practice Needed for MVA 85% Standard'}
              </h3>

              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {scorePercent}%
                </span>
                <span className="text-sm text-slate-400 font-medium">
                  ({correctCount} / {questions.length} {languageMode === 'fa' ? 'پاسخ صحیح' : 'Correct'})
                </span>
              </div>

              <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                {isPassing
                  ? languageMode === 'fa'
                    ? 'دانش شما در مورد قوانین ترافیکی مریلند و تفاوت‌های منطقه‌ای DMV بسیار قوی است. برای تسلط بر مانورهای عملی محوطه بسته (دنده عقب ۵۰ فوت و پارک دو نقطه‌ای)، پکیج‌های عملی سام در راکویل را بررسی کنید.'
                    : 'Your grasp of Maryland Transportation Codes and DMV regional rules is test-ready. Take your confidence behind the wheel with Sam’s Driving School dual-control vehicles in Rockville.'
                  : languageMode === 'fa'
                    ? 'اداره MVA مریلند معمولا به حداقل ۸۵٪ نمره قبولی نیاز دارد. تحلیل سوالات زیر را مرور کنید و با تمرین در دوره‌های ۳۶ ساعته آنلاین آموزشگاه سام، بدون استرس قبول شوید.'
                    : 'Maryland MVA requires an ~85% passing score. Review the "Explain Why" breakdowns below to master the gotchas before test day.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => handleRestartQuiz()}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{languageMode === 'fa' ? 'آزمون مجدد با ۵ سوال جدید' : 'Retake with 5 New Questions'}</span>
                </button>

                {onViewProgressTracker && (
                  <button
                    onClick={onViewProgressTracker}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{languageMode === 'fa' ? 'مشاهده نمودار پیشرفت و نقاط ضعف' : 'View Progress Tracker & Weaknesses'}</span>
                  </button>
                )}

                <a
                  href="tel:3012790000"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-400" />
                  <span>Call (301) 279-0000</span>
                </a>
              </div>
            </div>

            {/* Question by Question Review */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>{languageMode === 'fa' ? 'مرور پاسخ‌ها و توضیحات تکمیلی:' : 'Question-by-Question Review & Explanations:'}</span>
                </h4>
              </div>

              <div className="space-y-3">
                {questions.map((q, idx) => {
                  const userChoice = selectedAnswers[idx];
                  const isCorrect = userChoice === q.correct_index;
                  return (
                    <div
                      key={q.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 shrink-0">
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            )}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-slate-400 block mb-0.5">
                              Question {idx + 1} • {q.state_tag}
                            </span>
                            <p className="text-xs md:text-sm font-semibold text-white">
                              {languageMode === 'fa' ? q.question_fa : q.question_en}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {isCorrect ? 'Correct' : 'Missed'}
                        </span>
                      </div>

                      {/* Display what user answered vs correct */}
                      <div className="text-xs space-y-1 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                        <p className="text-emerald-300 font-medium">
                          ✓ <strong>{languageMode === 'fa' ? 'پاسخ صحیح:' : 'Correct Answer:'}</strong>{' '}
                          {languageMode === 'fa'
                            ? q.options_fa[q.correct_index]
                            : q.options_en[q.correct_index]}
                        </p>
                        {!isCorrect && userChoice !== undefined && (
                          <p className="text-rose-300 font-medium">
                            ✕ <strong>{languageMode === 'fa' ? 'پاسخ شما:' : 'Your Answer:'}</strong>{' '}
                            {languageMode === 'fa'
                              ? q.options_fa[userChoice]
                              : q.options_en[userChoice]}
                          </p>
                        )}
                      </div>

                      {/* Explain Why section */}
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                          {languageMode === 'fa' ? 'دلیل و استناد قانونی:' : 'Statute & Reason:'}
                        </span>
                        <p>{languageMode === 'fa' ? q.explain_why_fa : q.explain_why_en}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sam's Driving School Reassurance Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            {languageMode === 'fa'
              ? 'آموزشگاه رانندگی سام در راکویل (۷۵۱ Rockville Pike) • آموزش تخصصی رفع اضطراب رانندگی با متد روان‌شناسی و خودروهای دو پداله'
              : "Sam's Driving School • 751 Rockville Pike, Rockville MD • Psychology-Led Anxiety Relief & Dual-Control Vehicles"}
          </span>
        </div>
        <a
          href="https://samdrivingschool.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 font-semibold whitespace-nowrap flex items-center gap-1"
        >
          <span>samdrivingschool.org</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

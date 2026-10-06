'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  Scale,
  BrainCircuit,
  RotateCcw,
  PlusCircle,
  HelpCircle,
  Target,
  Sparkles,
  BarChart3,
  Calendar,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface QuizSessionRecord {
  id: string;
  date: string;
  displayDate: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  missedCategories: string[];
}

interface LawProficiency {
  categoryKey: string;
  title_en: string;
  title_fa: string;
  correct: number;
  total: number;
  statute: string;
  studyTip_en: string;
  studyTip_fa: string;
  priority: 'high' | 'medium' | 'mastered';
}

interface StudentProgressTrackerProps {
  languageMode: 'bilingual' | 'en' | 'fa';
  onNavigateToQuiz?: () => void;
  onNavigateToLaws?: () => void;
}

const DEFAULT_SESSIONS: QuizSessionRecord[] = [
  {
    id: 'session-1',
    date: '2026-09-24',
    displayDate: 'Sep 24',
    scorePercent: 60,
    correctCount: 3,
    totalQuestions: 5,
    missedCategories: ['School Bus Laws', 'GLS 18-Month Reset'],
  },
  {
    id: 'session-2',
    date: '2026-09-27',
    displayDate: 'Sep 27',
    scorePercent: 60,
    correctCount: 3,
    totalQuestions: 5,
    missedCategories: ['DC No Turn on Red', 'Move Over Law'],
  },
  {
    id: 'session-3',
    date: '2026-10-01',
    displayDate: 'Oct 01',
    scorePercent: 80,
    correctCount: 4,
    totalQuestions: 5,
    missedCategories: ['School Bus Laws'],
  },
  {
    id: 'session-4',
    date: '2026-10-03',
    displayDate: 'Oct 03',
    scorePercent: 80,
    correctCount: 4,
    totalQuestions: 5,
    missedCategories: ['MVA 50-ft Backing Camera Trap'],
  },
  {
    id: 'session-5',
    date: '2026-10-05',
    displayDate: 'Oct 05 (Today)',
    scorePercent: 100,
    correctCount: 5,
    totalQuestions: 5,
    missedCategories: [],
  },
];

const INITIAL_PROFICIENCIES: LawProficiency[] = [
  {
    categoryKey: 'school_bus',
    title_en: 'School Bus Stop Rules (Paved Center Turn Lane Trap)',
    title_fa: 'قوانین توقف پشت اتوبوس مدرسه (لاین وسط و جدول فیزیکی)',
    correct: 3,
    total: 6,
    statute: 'MD Transportation Code § 21-706',
    studyTip_en: 'Remember: A continuous paved left-turn lane is NOT a physical barrier. Vehicles in BOTH directions must stop at least 20 feet away!',
    studyTip_fa: 'نکته حیاتی: خط آسفالت گردش به چپ مانع فیزیکی نیست. هر دو لاین رفت و برگشت باید حداقل ۲۰ فوت قبل از اتوبوس متوقف شوند!',
    priority: 'high',
  },
  {
    categoryKey: 'gls_sanctions',
    title_en: 'Maryland GLS 18-Month Clean Record Reset',
    title_fa: 'قانون ریست شدن دوره ۱۸ ماهه گواهینامه مشروط مریلند',
    correct: 4,
    total: 6,
    statute: 'MD Transportation Code § 16-113',
    studyTip_en: 'Any moving violation ticket or at-fault accident automatically resets your entire 18-month provisional clock to day zero.',
    studyTip_fa: 'هرگونه تخلف حرکتی یا تصادف مقصرانه، دوره ۱۸ ماهه مشروط را صفر کرده و شمارش مجدداً از روز اول شروع می‌شود.',
    priority: 'medium',
  },
  {
    categoryKey: 'backing_observation',
    title_en: 'MVA 50-Ft Straight Backing & Camera Trap',
    title_fa: 'دنده عقب ۵۰ فوت MVA و تله نگاه صرف به دوربین',
    correct: 5,
    total: 7,
    statute: 'MD MVA Skills Scoring Rubric',
    studyTip_en: 'Turning body 45 degrees and looking through rear window is MANDATORY. Backup camera is only a secondary aid.',
    studyTip_fa: 'چرخاندن نیم‌تنه به عقب و نگاه از شیشه عقب الزامی است؛ زل زدن به دوربین دنده عقب باعث مردودی فوری است.',
    priority: 'medium',
  },
  {
    categoryKey: 'move_over_expanded',
    title_en: 'Expanded Move Over Law (Hazard Flashers)',
    title_fa: 'قانون گسترش‌یافته Move Over برای تمام خودروهای دارای فلاشر',
    correct: 6,
    total: 7,
    statute: 'MD Transportation Code § 21-405(e)',
    studyTip_en: 'Vacate the closest lane or slow down for ALL stationary vehicles displaying hazard lights, not just police cruisers.',
    studyTip_fa: 'الزام به تغییر لاین یا کاهش شدید سرعت برای تمام خودروهای متوقف در شانه راه که چراغ فلاشر دارند.',
    priority: 'mastered',
  },
  {
    categoryKey: 'stop_sign_physics',
    title_en: 'The 3-Second Stop Sign & Rolling Stop Prevention',
    title_fa: 'توقف ۳ ثانیه‌ای پشت خط ایست و پیشگیری از رولینگ استاپ',
    correct: 7,
    total: 7,
    statute: 'MD Transportation Code § 21-707',
    studyTip_en: 'Stop behind the white stop bar until suspension rebounds, count 3 seconds (1-2-3), then creep for visibility.',
    studyTip_fa: 'توقف ۱۰۰٪ کامل پشت خط سفید، شمارش ۳ ثانیه و احساس استقرار وزن خودرو قبل از هرگونه خزیدن به جلو.',
    priority: 'mastered',
  },
  {
    categoryKey: 'dc_right_turn_red',
    title_en: 'Washington D.C. Universal No-Turn-on-Red Ban',
    title_fa: 'ممنوعیت پیش‌فرض گردش به راست در چراغ قرمز واشنگتن دی‌سی',
    correct: 5,
    total: 6,
    statute: 'DCMR Title 18 / DC Safer Streets Act',
    studyTip_en: 'Unlike MD and VA, right turn on red is default BANNED across signalized intersections in DC unless signed otherwise.',
    studyTip_fa: 'برخلاف مریلند و ویرجینیا، در واشنگتن دی‌سی گردش به راست در چراغ قرمز به صورت پیش‌فرض ممنوع است.',
    priority: 'mastered',
  },
];

export default function StudentProgressTracker({
  languageMode,
  onNavigateToQuiz,
  onNavigateToLaws,
}: StudentProgressTrackerProps) {
  const [sessions, setSessions] = useState<QuizSessionRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('mva_quiz_history');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Error loading quiz history:', e);
      }
    }
    return DEFAULT_SESSIONS;
  });

  const [proficiencies, setProficiencies] = useState<LawProficiency[]>(INITIAL_PROFICIENCIES);
  const [hoveredPoint, setHoveredPoint] = useState<QuizSessionRecord | null>(null);

  // Sync with localStorage on changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mva_quiz_history', JSON.stringify(sessions));
      } catch (e) {
        console.error('Error saving quiz history:', e);
      }
    }
  }, [sessions]);

  // Compute analytics
  const totalQuizzes = sessions.length;
  const latestScore = sessions[sessions.length - 1]?.scorePercent ?? 0;
  const averageScore = Math.round(
    sessions.reduce((acc, curr) => acc + curr.scorePercent, 0) / (totalQuizzes || 1)
  );
  const highestScore = Math.max(...sessions.map((s) => s.scorePercent), 0);
  const isMvaPassing = averageScore >= 80;

  // Weak area calculations
  const weakAreas = proficiencies.filter((p) => Math.round((p.correct / p.total) * 100) < 75);

  const handleSimulateQuizScore = (score: number) => {
    const newSession: QuizSessionRecord = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      displayDate: `Test #${sessions.length + 1}`,
      scorePercent: score,
      correctCount: Math.round((score / 100) * 5),
      totalQuestions: 5,
      missedCategories: score < 80 ? ['School Bus Laws', 'GLS 18-Month Reset'] : [],
    };
    setSessions((prev) => [...prev, newSession]);
  };

  const handleResetHistory = () => {
    setSessions(DEFAULT_SESSIONS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mva_quiz_history');
    }
  };

  // SVG Chart geometry
  const chartWidth = 600;
  const chartHeight = 220;
  const paddingX = 45;
  const paddingY = 30;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  // Map session coordinates
  const points = sessions.map((s, idx) => {
    const x =
      sessions.length === 1
        ? chartWidth / 2
        : paddingX + (idx / (sessions.length - 1)) * usableWidth;
    const y = chartHeight - paddingY - (s.scorePercent / 100) * usableHeight;
    return { x, y, session: s };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${
          chartHeight - paddingY
        } Z`
      : '';

  const passingY = chartHeight - paddingY - 0.85 * usableHeight;

  return (
    <div className="space-y-8">
      {/* Top Banner & Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Student Progress Analytics</span>
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border ${
                  isMvaPassing
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>
                  {isMvaPassing
                    ? languageMode === 'fa'
                      ? 'آماده آزمون رسمی MVA (نمره بالای ۸۵٪)'
                      : 'MVA Test-Ready Readiness Level'
                    : languageMode === 'fa'
                      ? 'نیاز به تمرین روی مباحث قرمز'
                      : 'More Practice Recommended (<85%)'}
                </span>
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {languageMode === 'fa'
                ? 'نمودار روند پیشرفت و تحلیل نقاط ضعف در قوانین مریلند'
                : 'Maryland Driving Laws Performance Tracker'}
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {languageMode === 'fa'
                ? 'رصد هوشمند نمرات آزمون‌ها در طول زمان، شناسایی خودکار مباحث پرخطا (توقف پشت اتوبوس مدرسه، دوره ۱۸ ماهه مشروط، رولینگ استاپ) و راهکارهای آموزشی متد روان‌شناسی سام.'
                : 'Track your mock quiz scores over time, pinpoint exact weak spots in Maryland Transportation Code, and view personalized study guidance to guarantee a first-time pass.'}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3 shrink-0">
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {languageMode === 'fa' ? 'میانگین نمرات' : 'Average Score'}
              </span>
              <span
                className={`text-xl font-black ${
                  averageScore >= 80 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {averageScore}%
              </span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {languageMode === 'fa' ? 'آخرین آزمون' : 'Latest Score'}
              </span>
              <span
                className={`text-xl font-black ${
                  latestScore >= 80 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {latestScore}%
              </span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {languageMode === 'fa' ? 'بالاترین نمره' : 'Personal Best'}
              </span>
              <span className="text-xl font-black text-indigo-400">{highestScore}%</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {languageMode === 'fa' ? 'تعداد آزمون‌ها' : 'Total Quizzes'}
              </span>
              <span className="text-xl font-black text-slate-200">{totalQuizzes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chart Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base md:text-lg font-bold text-white">
                {languageMode === 'fa'
                  ? 'نمودار تغییرات نمره آزمون در طول زمان'
                  : 'Quiz Performance Trend Over Time'}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              {languageMode === 'fa'
                ? 'خط‌چین سبز: حد نصاب قبولی MVA مریلند (۸۵٪)'
                : 'Dashed line indicates Maryland MVA passing standard (85%)'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => handleSimulateQuizScore(100)}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition-all flex items-center gap-1 cursor-pointer"
              title="Add a 100% score to graph"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{languageMode === 'fa' ? '+ ثبت تست کامل (۱۰۰٪)' : '+ Log 100%'}</span>
            </button>
            <button
              onClick={handleResetHistory}
              className="text-[11px] text-slate-400 hover:text-slate-200 p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 cursor-pointer"
              title="Reset to default history"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Responsive Interactive SVG Chart */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[550px] relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                {/* Area Gradient */}
                <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
                {/* Line Gradient */}
                <linearGradient id="scoreLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((level) => {
                const y = chartHeight - paddingY - (level / 100) * usableHeight;
                return (
                  <g key={level}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#334155"
                      strokeWidth="1"
                      strokeDasharray={level === 0 || level === 100 ? '0' : '3 3'}
                      opacity="0.4"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 3}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {level}%
                    </text>
                  </g>
                );
              })}

              {/* 85% MVA Passing Threshold Reference Line */}
              <line
                x1={paddingX}
                y1={passingY}
                x2={chartWidth - paddingX}
                y2={passingY}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.8"
              />
              <text
                x={chartWidth - paddingX + 5}
                y={passingY + 3}
                fill="#34d399"
                fontSize="9"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                85% MVA Pass
              </text>

              {/* Gradient Area Fill */}
              {areaD && <path d={areaD} fill="url(#scoreAreaGradient)" />}

              {/* Connecting Score Line */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#scoreLineGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Interactive Data Points */}
              {points.map((pt, idx) => {
                const isHovered = hoveredPoint?.id === pt.session.id;
                const isPass = pt.session.scorePercent >= 80;
                return (
                  <g
                    key={pt.session.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(pt.session)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    onClick={() => setHoveredPoint(pt.session)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 8 : 5}
                      fill={isPass ? '#10b981' : '#f43f5e'}
                      stroke="#0f172a"
                      strokeWidth="2.5"
                      className="transition-all duration-200"
                    />
                    {/* Score Label above point */}
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      fill={isHovered ? '#ffffff' : '#cbd5e1'}
                      fontSize={isHovered ? '11' : '9'}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {pt.session.scorePercent}%
                    </text>

                    {/* X-axis date labels */}
                    <text
                      x={pt.x}
                      y={chartHeight - 10}
                      fill="#94a3b8"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      {pt.session.displayDate}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Hover / Active Session Detail Box */}
        {hoveredPoint && (
          <div className="bg-slate-950 border border-indigo-500/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">
                  {hoveredPoint.displayDate}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    hoveredPoint.scorePercent >= 80
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {hoveredPoint.scorePercent >= 80 ? 'MVA Pass' : 'Below 85% Standard'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Score: <strong>{hoveredPoint.scorePercent}%</strong> ({hoveredPoint.correctCount}/
                {hoveredPoint.totalQuestions} questions correct)
              </p>
            </div>

            {hoveredPoint.missedCategories.length > 0 ? (
              <div className="text-xs text-rose-300">
                <span className="font-bold">Missed Topics: </span>
                <span>{hoveredPoint.missedCategories.join(', ')}</span>
              </div>
            ) : (
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Perfect score! All Maryland MVA law questions answered correctly.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Weak Areas in Maryland Driving Laws (Category Breakdown) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-400" />
              <h3 className="text-base md:text-lg font-bold text-white">
                {languageMode === 'fa'
                  ? 'تفکیک تسلط بر قوانین و شناسایی نقاط ضعف در آزمون'
                  : 'Maryland Driving Law Weakness & Mastery Matrix'}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              {languageMode === 'fa'
                ? 'مباحثی که درصد پاسخ صحیح به آن‌ها زیر ۷۵٪ است به عنوان نقاط ضعف نیازمند مطالعه مشخص شده‌اند.'
                : 'Topics with accuracy under 75% are flagged as high-priority areas to study before testing.'}
            </p>
          </div>

          {weakAreas.length > 0 && (
            <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>
                {weakAreas.length} {languageMode === 'fa' ? 'مبحث نیازمند مرور' : 'Weak Area(s) Detected'}
              </span>
            </span>
          )}
        </div>

        {/* Progress Bars List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proficiencies.map((item) => {
            const percent = Math.round((item.correct / item.total) * 100);
            const isWeak = percent < 75;
            const isMastered = percent >= 85;

            return (
              <div
                key={item.categoryKey}
                className={`p-4 rounded-xl border transition-all ${
                  isWeak
                    ? 'bg-rose-950/20 border-rose-900/50 shadow-sm'
                    : isMastered
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-slate-950 border-amber-900/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-white">
                        {languageMode === 'fa' ? item.title_fa : item.title_en}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.statute}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded ${
                        isWeak
                          ? 'bg-rose-500/20 text-rose-300'
                          : isMastered
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {percent}%
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isWeak
                          ? 'bg-rose-500'
                          : isMastered
                          ? 'bg-emerald-500'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Actionable Study Tip */}
                  <div className="pt-2 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-indigo-300">
                      {languageMode === 'fa' ? 'نکته قبولی در آزمون: ' : 'MVA Rule: '}
                    </span>
                    <span>{item.studyTip_en}</span>
                    {item.studyTip_fa && (languageMode === 'bilingual' || languageMode === 'fa') && (
                      <p dir="rtl" className="text-amber-200/90 text-xs font-sans mt-1">
                        {item.studyTip_fa}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sam's Targeted Practice & Psychological Action Plan */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-indigo-900/40">
          <BrainCircuit className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-base md:text-lg font-bold text-white">
              {languageMode === 'fa'
                ? 'برنامه تمرینی اختصاصی سام برای رفع ضعف‌ها و قبولی ۱۰۰٪'
                : "Sam's Psychology-Led Action Plan to Eliminate Weak Areas"}
            </h3>
            <p className="text-xs text-indigo-200/80">
              {languageMode === 'fa'
                ? 'تمرکز بر حل تعارضات فکری ناشی از استرس ممتحن و ایجاد الگوهای ذهنی خودکار'
                : 'Turn identified law weaknesses into automatic muscle memory before your White Oak or Gaithersburg test.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/80 border border-indigo-500/30 p-4 rounded-xl space-y-2">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              {languageMode === 'fa' ? '۱. حل ضعف‌های شناسایی‌شده' : '1. Target Weak Topics'}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {languageMode === 'fa'
                ? 'با اجرای مجدد کوییز ۵ سوالی، سوالات اتوبوس مدرسه و دوره ۱۸ ماهه را مرور کنید تا نمره این مباحث بالای ۸۵٪ برسد.'
                : 'Retake the 5-question mock quiz until School Bus center turn lanes and GLS sanctions reach 85%+.'}
            </p>
            {onNavigateToQuiz && (
              <button
                onClick={onNavigateToQuiz}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 pt-1"
              >
                <span>Take Mock Quiz Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="bg-slate-950/80 border border-indigo-500/30 p-4 rounded-xl space-y-2">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {languageMode === 'fa' ? '۲. مقایسه قوانین سه‌گانه' : '2. Study Tri-State Matrix'}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {languageMode === 'fa'
                ? 'تفاوت‌های واشنگتن دی‌سی (ممنوعیت گردش به راست در قرمز) و ویرجینیا (سرعت بالای ۸۵ مایل) را مرور کنید.'
                : 'Review the side-by-side legal comparison between MD, DC (No Turn on Red), and VA (Reckless speed).'}
            </p>
            {onNavigateToLaws && (
              <button
                onClick={onNavigateToLaws}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 pt-1"
              >
                <span>Open Law Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="bg-slate-950/80 border border-indigo-500/30 p-4 rounded-xl space-y-2">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {languageMode === 'fa' ? '۳. تمرین عملی ۴۵ دقیقه‌ای MVA' : '3. Pre-Test MVA Warm-Up'}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {languageMode === 'fa'
                ? 'پکیج اجاره خودرو به همراه ۴۵ دقیقه مرور قبل از آزمون سام در راکویل (۱۴۰ دلار) استرس روز تست را صفر می‌کند.'
                : "Book Sam's MVA Road Test Car Rental ($140) with 45-min pre-test warm-up in dual-brake certified cars."}
            </p>
            <a
              href="tel:3012790000"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 pt-1"
            >
              <span>Call (301) 279-0000</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

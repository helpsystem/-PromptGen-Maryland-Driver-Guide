'use client';

import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  AlertOctagon,
  BrainCircuit,
  Heart,
  Shield,
  Sparkles,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import {
  MVA_TEST_CHECKLIST,
  MVA_GOTCHA_FAILS,
  SAMS_PSYCHOLOGY_PROTOCOLS,
  BRAND_INFO
} from '@/lib/driving-school-data';

interface MvaTestChecklistProps {
  languageMode: 'bilingual' | 'en' | 'fa';
}

export default function MvaTestChecklist({ languageMode }: MvaTestChecklistProps) {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalItems = MVA_TEST_CHECKLIST.length;
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const readinessPercentage = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="space-y-8">
      {/* Test Maneuvers Checklist Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <CheckSquare className="w-5 h-5" />
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {languageMode === 'fa'
                  ? 'چک‌لیست آزمون عملی MVA مریلند (وایت اوک، گیترزبرگ، گلن برنی)'
                  : 'Maryland MVA Road Test Mastery Checklist'}
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              {languageMode === 'fa'
                ? 'مانورهای محوطه بسته، نقاط چرخش فرمان و اشتباهاتی که مانع از ردی فوری می‌شوند'
                : 'Closed-course maneuvers, inspection protocols, and pivot points required by Maryland examiners.'}
            </p>
          </div>

          {/* Readiness Tracker */}
          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {languageMode === 'fa' ? 'میزان آمادگی شما' : 'MVA Readiness'}
              </span>
              <span className="text-lg font-black text-emerald-400">{readinessPercentage}%</span>
            </div>
            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Maneuver Steps List */}
        <div className="space-y-4">
          {MVA_TEST_CHECKLIST.map((step) => {
            const isChecked = !!completedItems[step.id];
            return (
              <div
                key={step.id}
                onClick={() => toggleCheck(step.id)}
                className={`p-4 md:p-5 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button className="mt-0.5 text-slate-400 focus:outline-none">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-600" />
                    )}
                  </button>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3
                        className={`text-sm md:text-base font-bold transition-colors ${
                          isChecked ? 'text-emerald-300 line-through opacity-80' : 'text-white'
                        }`}
                      >
                        {languageMode === 'fa' ? step.title_fa : step.title}
                      </h3>
                      {isChecked && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold self-start sm:self-auto">
                          Mastered
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                    {step.desc_fa && (languageMode === 'bilingual' || languageMode === 'fa') && (
                      <p dir="rtl" className="text-xs text-amber-200/90 leading-relaxed font-sans pt-1">
                        {step.desc_fa}
                      </p>
                    )}

                    {/* Psychology Tip Callout */}
                    <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg flex items-start gap-2.5 mt-2">
                      <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-bold text-purple-300">
                          {languageMode === 'fa' ? 'ترفند روان‌شناسی سام:' : "Sam's Psychology Hack: "}
                        </span>
                        <span className="text-slate-300"> {step.psychology_tip}</span>
                        {step.psychology_tip_fa && (languageMode === 'bilingual' || languageMode === 'fa') && (
                          <span dir="rtl" className="block text-amber-200/90 font-sans mt-0.5">
                            {step.psychology_tip_fa}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instant Automatic Disqualifications (Gotchas) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
            <AlertOctagon className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
              {languageMode === 'fa'
                ? '۵ خطای مرگبار که بلافاصله باعث ردی در امتحان شهر MVA می‌شوند'
                : 'Top 5 Instant MVA Disqualifications & How to Prevent Them'}
            </h3>
            <p className="text-xs text-slate-400">
              {languageMode === 'fa'
                ? 'این موارد آزمون را درجا متوقف کرده و ممتحن خودرو را به محوطه بازمی‌گرداند'
                : 'These actions trigger an immediate failed scorecard.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MVA_GOTCHA_FAILS.map((fail, idx) => (
            <div key={idx} className="bg-slate-950 border border-rose-900/30 rounded-xl p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  {languageMode === 'fa' ? fail.rule_fa : fail.rule_en}
                </span>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded font-bold uppercase whitespace-nowrap">
                  Instant Fail
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-emerald-400">Prevention: </strong>
                {fail.prevention_en}
              </p>
              {fail.prevention_fa && (languageMode === 'bilingual' || languageMode === 'fa') && (
                <p dir="rtl" className="text-xs text-amber-200/90 font-sans leading-relaxed pt-1 border-t border-slate-800/80">
                  <strong className="text-amber-400">راهکار پیشگیری: </strong>
                  {fail.prevention_fa}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sam's Psychology-Led Calming Protocols */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-900/40 rounded-2xl p-5 md:p-7 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 pb-4 border-b border-indigo-900/40">
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Heart className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
              {languageMode === 'fa'
                ? 'پروتکل‌های روان‌شناسی سام برای رهایی از اضطراب رانندگی'
                : "Sam's Psychology-Led Driving Anxiety Relief Protocols"}
            </h3>
            <p className="text-xs text-indigo-200/80">
              {languageMode === 'fa'
                ? 'طراحی‌شده توسط سام با مدرک آکادمیک روان‌شناسی برای کنترل تپش قلب و بازگرداندن تمرکز مغز'
                : 'Designed by Sam (Psychology Degree) to calm the sympathetic nervous system and build lifelong road confidence.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMS_PSYCHOLOGY_PROTOCOLS.map((protocol, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-indigo-500/30 rounded-xl p-4 space-y-2.5">
              <h4 className="text-xs font-bold text-indigo-300">
                {languageMode === 'fa' ? protocol.name_fa : protocol.name_en}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {protocol.steps_en}
              </p>
              {protocol.steps_fa && (languageMode === 'bilingual' || languageMode === 'fa') && (
                <p dir="rtl" className="text-xs text-amber-200/90 font-sans leading-relaxed pt-1.5 border-t border-slate-800">
                  {protocol.steps_fa}
                </p>
              )}
              <div className="pt-2 text-[11px] text-emerald-300 font-medium">
                <span>Benefit: </span>{languageMode === 'fa' ? protocol.benefit_fa : protocol.benefit_en}
              </div>
            </div>
          ))}
        </div>

        {/* School Info Footer */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All lessons conducted in dual-brake certified training vehicles. Instructors speak English, Spanish &amp; Farsi.
            </span>
          </div>
          <span className="text-emerald-400 font-bold whitespace-nowrap">
            751 Rockville Pike • (301) 279-0000
          </span>
        </div>
      </div>
    </div>
  );
}

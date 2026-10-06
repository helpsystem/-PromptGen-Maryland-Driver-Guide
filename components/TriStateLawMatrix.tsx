'use client';

import React, { useState } from 'react';
import { Scale, AlertCircle, ShieldAlert, CheckCircle2, Search, HelpCircle, Info } from 'lucide-react';
import { TRISTATE_LAWS_DATA } from '@/lib/driving-school-data';

interface TriStateLawMatrixProps {
  languageMode: 'bilingual' | 'en' | 'fa';
}

export default function TriStateLawMatrix({ languageMode }: TriStateLawMatrixProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLawId, setSelectedLawId] = useState<string>(TRISTATE_LAWS_DATA[0].id);

  const filteredLaws = TRISTATE_LAWS_DATA.filter((item) =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category_fa.includes(searchQuery)
  );

  const activeLaw = TRISTATE_LAWS_DATA.find((l) => l.id === selectedLawId) || TRISTATE_LAWS_DATA[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Scale className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {languageMode === 'fa'
                ? 'مقایسه جامع قوانین رانندگی مریلند، واشنگتن دی‌سی و ویرجینیا'
                : 'Tri-State Traffic Law Matrix: Maryland vs DC vs Virginia'}
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            {languageMode === 'fa'
              ? 'تفاوت‌های حقوقی، تله‌های جریمه و دوربین‌های ترافیکی در منطقه پایتخت (DMV) با نکات اختصاصی قبولی در آزمون MVA'
              : 'Legal differences, photo camera enforcement, and MVA test gotchas across MD, DC, and VA.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={languageMode === 'fa' ? 'جستجوی قانون...' : 'Search traffic law...'}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Category Selector Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {filteredLaws.map((law) => (
          <button
            key={law.id}
            onClick={() => setSelectedLawId(law.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedLawId === law.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>{languageMode === 'fa' ? law.category_fa : law.category}</span>
          </button>
        ))}
      </div>

      {/* Side-by-Side 3-State Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* MARYLAND CARD */}
        <div className="bg-slate-950 border-2 border-indigo-500/40 rounded-xl p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-amber-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Maryland (MD MVA)
              </h3>
            </div>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold">
              Home State
            </span>
          </div>

          {'permit_age' in activeLaw.maryland ? (
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">Learner&apos;s Permit:</strong> {activeLaw.maryland.permit_age}</p>
              <p><strong className="text-white">Provisional License:</strong> {activeLaw.maryland.provisional_age}</p>
              <p><strong className="text-white">Practice Log:</strong> {activeLaw.maryland.practice_hours}</p>
              <p><strong className="text-white">Night Curfew:</strong> {activeLaw.maryland.curfew}</p>
              <p><strong className="text-white">Passenger Rule:</strong> {activeLaw.maryland.passengers}</p>
            </div>
          ) : (
            <div className="space-y-2 text-xs text-slate-300">
              <p className="leading-relaxed">{activeLaw.maryland.rule || (activeLaw.maryland as any).maneuvers}</p>
              {'penalty' in activeLaw.maryland && (
                <div className="pt-2 border-t border-slate-800/80 text-rose-300 font-semibold">
                  <span>Penalty: </span>{activeLaw.maryland.penalty}
                </div>
              )}
            </div>
          )}
        </div>

        {/* VIRGINIA CARD */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 shadow">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider">
                Virginia (VA DMV)
              </h3>
            </div>
            <span className="text-[10px] text-slate-500">Neighbor</span>
          </div>

          {'permit_age' in activeLaw.virginia ? (
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">Learner&apos;s Permit:</strong> {activeLaw.virginia.permit_age}</p>
              <p><strong className="text-white">Provisional Stage:</strong> {activeLaw.virginia.provisional_age}</p>
              <p><strong className="text-white">Practice Log:</strong> {activeLaw.virginia.practice_hours}</p>
              <p><strong className="text-white">Night Curfew:</strong> {activeLaw.virginia.curfew}</p>
              <p><strong className="text-white">Passenger Rule:</strong> {activeLaw.virginia.passengers}</p>
            </div>
          ) : (
            <div className="space-y-2 text-xs text-slate-300">
              <p className="leading-relaxed">{activeLaw.virginia.rule || (activeLaw.virginia as any).maneuvers}</p>
              {'penalty' in activeLaw.virginia && (
                <div className="pt-2 border-t border-slate-800/80 text-rose-300 font-semibold">
                  <span>Penalty: </span>{activeLaw.virginia.penalty}
                </div>
              )}
            </div>
          )}
        </div>

        {/* WASHINGTON DC CARD */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 shadow">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600" />
              <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider">
                Washington D.C. (DC DMV)
              </h3>
            </div>
            <span className="text-[10px] text-slate-500">Capital District</span>
          </div>

          {'permit_age' in activeLaw.dc ? (
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">Learner&apos;s Permit:</strong> {activeLaw.dc.permit_age}</p>
              <p><strong className="text-white">Provisional Stage:</strong> {activeLaw.dc.provisional_age}</p>
              <p><strong className="text-white">Practice Log:</strong> {activeLaw.dc.practice_hours}</p>
              <p><strong className="text-white">Night Curfew:</strong> {activeLaw.dc.curfew}</p>
              <p><strong className="text-white">Passenger Rule:</strong> {activeLaw.dc.passengers}</p>
            </div>
          ) : (
            <div className="space-y-2 text-xs text-slate-300">
              <p className="leading-relaxed">{activeLaw.dc.rule || (activeLaw.dc as any).maneuvers}</p>
              {'penalty' in activeLaw.dc && (
                <div className="pt-2 border-t border-slate-800/80 text-rose-300 font-semibold">
                  <span>Penalty: </span>{activeLaw.dc.penalty}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Uniform Rule Across All Three & Maryland MVA Gotcha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Uniform Law Across MD, VA &amp; DC (قانون یکسان در هر سه حوزه):
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeLaw.uniform_rule}
          </p>
          {activeLaw.uniform_rule_fa && (
            <p dir="rtl" className="text-xs text-amber-200/90 font-sans pt-1 border-t border-slate-800">
              {activeLaw.uniform_rule_fa}
            </p>
          )}
        </div>

        <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-900/40 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            Maryland MVA Road Test Gotcha (نکته حیاتی قبولی در آزمون):
          </span>
          <p className="text-xs text-rose-200 leading-relaxed">
            {activeLaw.mva_gotcha}
          </p>
          {activeLaw.mva_gotcha_fa && (
            <p dir="rtl" className="text-xs text-amber-200/90 font-sans pt-1 border-t border-rose-900/30">
              {activeLaw.mva_gotcha_fa}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import {
  Car,
  CheckCircle,
  Phone,
  Globe,
  MapPin,
  Clock,
  Award,
  ShieldCheck,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { BRAND_INFO } from '@/lib/driving-school-data';

interface ServicesOverviewProps {
  languageMode: 'bilingual' | 'en' | 'fa';
}

export default function ServicesOverview({ languageMode }: ServicesOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Brand Hero Card */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {BRAND_INFO.awards}
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-3 py-1 rounded-full">
              Women-Owned &amp; Psychology-Led
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {languageMode === 'fa'
              ? 'آموزشگاه رانندگی سام (راکویل، مریلند)'
              : "Sam's Driving School - Rockville, MD"}
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            {languageMode === 'fa'
              ? 'تخصصی‌ترین مرکز آموزش رانندگی بدون استرس در مریلند به رهبری سام (دارای مدرک روان‌شناسی). مجهز به خودروهای دو کنترله استاندارد، آموزش چندزبانه (انگلیسی، اسپانیایی، فارسی) و سرویس رایگان از ایستگاه مترو راکویل.'
              : 'Montgomery County’s premier driving academy led by Sam (Academic Degree in Psychology). Dedicated to eliminating driving anxiety, zero-yelling instruction, and mastering the Maryland MVA test in certified dual-brake vehicles.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" />
              {BRAND_INFO.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-indigo-400" />
              {BRAND_INFO.website}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <Car className="w-4 h-4" />
              {BRAND_INFO.metro}
            </span>
          </div>
        </div>
      </div>

      {/* Official Services Grid with Discounted Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {BRAND_INFO.services.map((svc, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 shadow-xl space-y-4 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base md:text-lg font-bold text-white">
                  {languageMode === 'fa' ? svc.title_fa : svc.title}
                </h3>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-emerald-400">
                      {svc.price_discounted}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      {svc.price_regular}
                    </span>
                  </div>
                  {svc.per && (
                    <span className="text-[10px] text-slate-400 block">
                      {languageMode === 'fa' ? svc.per_fa : svc.per}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {svc.details}
              </p>
              {svc.details_fa && (languageMode === 'bilingual' || languageMode === 'fa') && (
                <p dir="rtl" className="text-xs text-amber-200/90 font-sans leading-relaxed pt-1 border-t border-slate-800">
                  {svc.details_fa}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                MVA Certified &amp; Approved
              </span>
              <a
                href={`tel:${BRAND_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Book Now</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Montgomery County High Schools Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">
            {languageMode === 'fa'
              ? 'دبیرستان‌های تحت پوشش در مانتگامری کانتی مریلند'
              : 'Serving Students Across Montgomery County High Schools'}
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          {languageMode === 'fa'
            ? 'دانش‌آموزان دبیرستان‌های محلی برای رهایی از اضطراب آزمون و گذراندن دوره ۳۶ ساعته، آموزشگاه سام را انتخاب می‌کنند:'
            : 'Trusted by teens and parents from nearby MCPS schools for anxiety-free driving education:'}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {BRAND_INFO.localHighSchools.map((school, i) => (
            <span
              key={i}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {school}
            </span>
          ))}
        </div>
      </div>

      {/* Contact & Location Footer */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h4 className="text-sm font-bold text-white">
            Ready to pass your Maryland MVA test with zero stress?
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Visit us at 751 Rockville Pike, Rockville, MD 20852 • Call or text (301) 279-0000
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://samdrivingschool.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            Visit samdrivingschool.org
          </a>
          <a
            href="tel:3012790000"
            className="bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>(301) 279-0000</span>
          </a>
        </div>
      </div>
    </div>
  );
}

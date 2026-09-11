import React from 'react';
import { Sparkles, History, Compass, ArrowRight, ShieldCheck, Moon, Star } from 'lucide-react';
import { TarotCardBack } from './TarotCardArt';
import { MAJOR_ARCANA } from '../data/tarotCards';
import { TarotCardArt } from './TarotCardArt';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onStartReading: () => void;
  onViewHistory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartReading, onViewHistory }) => {
  const { t, isMyanmar } = useLanguage();
  // Sample card archetypes for preview
  const theStar = MAJOR_ARCANA.find((c) => c.id === 'major-17')!;
  const theSun = MAJOR_ARCANA.find((c) => c.id === 'major-19')!;
  const theMagician = MAJOR_ARCANA.find((c) => c.id === 'major-1')!;

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden">
      {/* Mystical Background Orbs & Starlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Subtle Starfield Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-70 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-200 text-xs sm:text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.12)]">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{t('hero_badge')}</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 max-w-4xl leading-[1.15]">
          {isMyanmar ? (
            <>
              တားရော့ကတ်များ ဖော်ပြပေးမည့်{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 underline decoration-amber-400/30 underline-offset-8">
                လျှို့ဝှက်ဆန်းကြယ် လမ်းညွှန်ချက်
              </span>
            </>
          ) : (
            <>
              {t('hero_title_lead')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 underline decoration-amber-400/30 underline-offset-8">
                {t('hero_title_accent')}
              </span>
            </>
          )}
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300/90 max-w-2xl font-light leading-relaxed">
          {t('hero_subtitle')}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-primary-cta"
            onClick={onStartReading}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-serif text-base sm:text-lg font-bold tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2.5"
          >
            <Sparkles className="w-5 h-5" />
            <span>{t('hero_cta_primary')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-secondary-cta"
            onClick={onViewHistory}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-amber-200 border border-white/10 hover:border-amber-400/30 backdrop-blur-md text-base sm:text-lg font-medium transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <History className="w-5 h-5 text-amber-400/80" />
            <span>{t('nav_reading_history')}</span>
          </button>
        </div>

        {/* Interactive Floating Card Fan Preview */}
        <div className="mt-14 sm:mt-20 relative w-full max-w-2xl h-56 sm:h-72 flex items-center justify-center">
          {/* Left angled card */}
          <div className="absolute w-36 sm:w-44 -translate-x-24 sm:-translate-x-32 -rotate-12 hover:-rotate-8 transition-transform duration-300 shadow-2xl hover:z-30 cursor-pointer">
            <TarotCardArt card={theMagician} isReversed={false} />
          </div>

          {/* Right angled card */}
          <div className="absolute w-36 sm:w-44 translate-x-24 sm:translate-x-32 rotate-12 hover:rotate-8 transition-transform duration-300 shadow-2xl hover:z-30 cursor-pointer">
            <TarotCardArt card={theSun} isReversed={false} />
          </div>

          {/* Center glowing focal card */}
          <div className="relative z-20 w-40 sm:w-48 shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:scale-105 transition-transform duration-300 cursor-pointer">
            <TarotCardArt card={theStar} isReversed={false} />
          </div>
        </div>

        {/* Feature Pillars */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full text-left">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-slate-100 text-base">{t('hero_feature1_title')}</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('hero_feature1_desc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-slate-100 text-base">{t('hero_feature2_title')}</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('hero_feature2_desc')}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-400/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-3">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-slate-100 text-base">{t('hero_feature3_title')}</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('hero_feature3_desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

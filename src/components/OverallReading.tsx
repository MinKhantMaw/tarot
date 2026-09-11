import React, { useState } from 'react';
import { TarotInterpretation } from '../types/tarot';
import { Sparkles, Compass, Lightbulb, CheckCircle2, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OverallReadingProps {
  interpretation: TarotInterpretation;
}

export const OverallReading: React.FC<OverallReadingProps> = ({ interpretation }) => {
  const { t, isMyanmar } = useLanguage();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Overall Synthesis Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181138]/60 via-[#100D28]/80 to-[#0A081C]/90 border border-amber-400/25 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        <div className="flex items-center space-x-2 text-amber-300 mb-3">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-slate-100">
            {t('reading_overall')}
          </h3>
        </div>
        <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
          <p className="whitespace-pre-line">{interpretation.overallReading}</p>
        </div>
      </div>

      {/* Practical Guidance */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg">
        <div className="flex items-center space-x-2 text-amber-300 mb-3">
          <Compass className="w-5 h-5" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-slate-100">
            {t('reading_guidance')}
          </h3>
        </div>
        <div className="text-slate-200 text-sm sm:text-base leading-relaxed">
          <p className="whitespace-pre-line">{interpretation.practicalGuidance}</p>
        </div>
      </div>

      {/* Reflection Points */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg">
        <div className="flex items-center space-x-2 text-amber-300 mb-2">
          <Lightbulb className="w-5 h-5" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-slate-100">
            {t('reading_reflection')}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-4">
          {isMyanmar
            ? 'ဤမေးခွန်းများကို တရားမှတ်ရှုဆင်ခြင်ခြင်း သို့မဟုတ် သင်၏ ဂျာနယ်တွင် မှတ်တမ်းတင်တွေးတောခြင်း ပြုလုပ်နိုင်ပါသည်:'
            : 'Consider meditating upon these questions or recording your reflections in a journal:'}
        </p>

        <div className="space-y-3">
          {interpretation.reflectionPoints.map((point, index) => {
            const isCopied = copiedIndex === index;
            return (
              <div
                key={index}
                className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-amber-400/30 transition-all flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/15 text-amber-300 text-xs font-serif font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                    {point}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPrompt(point, index)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-amber-200 shrink-0 transition-colors cursor-pointer"
                  title={isMyanmar ? 'ဆင်ခြင်ရန် အချက်ကို ကူးယူမည်' : 'Copy reflection prompt'}
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

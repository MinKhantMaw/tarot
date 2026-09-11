import React from 'react';
import { DrawnCard } from '../types/tarot';
import { TarotCardArt } from './TarotCardArt';
import { Sparkles, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CardInterpretationProps {
  cardIndex: number;
  drawnCard: DrawnCard;
  interpretationText: string;
}

export const CardInterpretation: React.FC<CardInterpretationProps> = ({
  cardIndex,
  drawnCard,
  interpretationText,
}) => {
  const { t, isMyanmar, getCardName, getPositionLabel } = useLanguage();
  const isReversed = drawnCard.orientation === 'reversed';
  const localizedCardName = getCardName(drawnCard.card.id, drawnCard.card.name);
  const localizedPosition = getPositionLabel(drawnCard.position);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-400/25 backdrop-blur-xl transition-all shadow-lg">
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
        {/* Card visual thumb */}
        <div className="w-40 sm:w-44 shrink-0 shadow-xl">
          <TarotCardArt card={drawnCard.card} isReversed={isReversed} />
        </div>

        {/* Card Interpretation Text & Details */}
        <div className="flex-1 text-left space-y-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold">
                {isMyanmar ? `ကတ် ${cardIndex + 1}` : `Card ${cardIndex + 1}`} &bull; {localizedPosition}
              </span>
              <span
                className={`text-xs font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                  isReversed
                    ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                    : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                }`}
              >
                {isReversed ? t('reversed') : t('upright')}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-100 pt-1">
              {localizedCardName}
            </h3>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {drawnCard.card.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* AI Narrative */}
          <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-2 pt-2 border-t border-white/5">
            <p className="whitespace-pre-line">{interpretationText}</p>
          </div>

          {/* Traditional Symbolism Note */}
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex items-start space-x-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-amber-300/70 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-300 font-medium">
                {isMyanmar ? 'ရှေးရိုးရာ အဓိပ္ပာယ်ဖော်ပြချက်: ' : 'Traditional Lore: '}
              </strong>
              {drawnCard.card.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

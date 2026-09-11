import React from 'react';
import { DrawnCard } from '../types/tarot';
import { TarotCardArt, TarotCardBack } from './TarotCardArt';
import { Eye, RotateCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TarotCardProps {
  drawnCard: DrawnCard;
  isRevealed: boolean;
  onReveal: () => void;
  interactive?: boolean;
}

export const TarotCard: React.FC<TarotCardProps> = ({
  drawnCard,
  isRevealed,
  onReveal,
  interactive = true,
}) => {
  const { t, isMyanmar, getCardName, getPositionLabel } = useLanguage();
  const isReversed = drawnCard.orientation === 'reversed';
  const localizedCardName = getCardName(drawnCard.card.id, drawnCard.card.name);
  const localizedPosition = getPositionLabel(drawnCard.position);

  return (
    <div className="flex flex-col items-center w-full max-w-[280px] mx-auto">
      {/* Position Header Banner */}
      <div className="mb-3 text-center">
        <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 font-semibold">
          {isMyanmar ? `ကတ် ${drawnCard.positionIndex + 1}` : `Card ${drawnCard.positionIndex + 1}`} &bull; {localizedPosition}
        </span>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className={`relative w-full aspect-[2/3.3] perspective-1000 ${
          interactive && !isRevealed ? 'cursor-pointer group' : ''
        }`}
        onClick={() => {
          if (interactive && !isRevealed) {
            onReveal();
          }
        }}
      >
        <div
          className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
            isRevealed ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Back Face (Hidden state) */}
          <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center">
            <TarotCardBack className="group-hover:border-amber-400/60 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300" />
            
            {interactive && !isRevealed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                <span className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold font-serif shadow-lg flex items-center space-x-1.5 transform group-hover:scale-105 transition-transform">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isMyanmar ? 'ကတ်ကိုဖွင့်မည်' : 'Reveal Card'}</span>
                </span>
              </div>
            )}
          </div>

          {/* Card Front Face (Revealed state) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <TarotCardArt card={drawnCard.card} isReversed={isReversed} />
          </div>
        </div>
      </div>

      {/* Revealed Card Metadata Strip */}
      {isRevealed ? (
        <div className="mt-3 text-center space-y-1 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-center space-x-1.5">
            <span className="font-serif font-bold text-slate-100 text-sm sm:text-base">
              {localizedCardName}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <span
              className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                isReversed
                  ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              }`}
            >
              {isReversed ? t('reversed') : t('upright')}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 line-clamp-2 px-1">
            {isReversed ? drawnCard.card.reversedMeaning : drawnCard.card.uprightMeaning}
          </p>
        </div>
      ) : (
        <div className="mt-3 text-center">
          <span className="text-xs text-slate-500 italic">{isMyanmar ? 'ကတ်ကိုနှိပ်၍ ဖွင့်ပါ' : 'Click card to reveal'}</span>
        </div>
      )}
    </div>
  );
};

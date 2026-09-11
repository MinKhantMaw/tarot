import React, { useState, useEffect } from 'react';
import { TarotCardBack } from './TarotCardArt';
import { Sparkles, FastForward, Shuffle, Layers, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type ShufflePhase = 'gather' | 'split' | 'riffle' | 'square' | 'deal';

interface TarotDeckShuffleAnimationProps {
  cardCount: number;
  question?: string;
  onShuffleComplete: () => void;
}

const STACK_CARDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const TarotDeckShuffleAnimation: React.FC<TarotDeckShuffleAnimationProps> = ({
  cardCount,
  question,
  onShuffleComplete,
}) => {
  const { t, isMyanmar } = useLanguage();
  const [phase, setPhase] = useState<ShufflePhase>('gather');
  const [progress, setProgress] = useState(10);

  // Sequential timeline driven by CSS transitions
  useEffect(() => {
    // 0ms: Gather
    setPhase('gather');
    setProgress(15);

    // 600ms: Split
    const timer1 = setTimeout(() => {
      setPhase('split');
      setProgress(40);
    }, 650);

    // 1600ms: Riffle
    const timer2 = setTimeout(() => {
      setPhase('riffle');
      setProgress(68);
    }, 1650);

    // 2700ms: Square
    const timer3 = setTimeout(() => {
      setPhase('square');
      setProgress(88);
    }, 2750);

    // 3450ms: Deal
    const timer4 = setTimeout(() => {
      setPhase('deal');
      setProgress(100);
    }, 3500);

    // 4300ms: Finish and trigger onShuffleComplete
    const timer5 = setTimeout(() => {
      onShuffleComplete();
    }, 4350);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onShuffleComplete]);

  const handleSkip = () => {
    onShuffleComplete();
  };

  // Compute CSS transition properties for each card based on phase
  const getCardStyle = (index: number) => {
    const isTopDrawn = index < Math.min(cardCount, 5);

    // Base CSS transition
    const baseTransition =
      'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease, box-shadow 500ms ease';

    switch (phase) {
      case 'gather': {
        const yOffset = (9 - index) * -2.2;
        const rot = ((index % 3) - 1) * 0.9;
        return {
          transform: `translate3d(0px, ${yOffset}px, 0px) rotate(${rot}deg) scale(1)`,
          transition: baseTransition,
          transitionDelay: '0ms',
          zIndex: index + 1,
          opacity: 1,
          boxShadow: index === 9 ? '0 10px 25px rgba(0,0,0,0.6)' : 'none',
        };
      }

      case 'split': {
        const isLeft = index < 5;
        const subIndex = isLeft ? index : index - 5;
        const xOffset = isLeft ? -75 : 75;
        const yOffset = (4 - subIndex) * -2.5;
        const rot = isLeft ? -12 + subIndex * 1.5 : 12 - subIndex * 1.5;

        return {
          transform: `translate3d(${xOffset}px, ${yOffset}px, 0px) rotate(${rot}deg) scale(0.97)`,
          transition: 'transform 700ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 400ms ease',
          transitionDelay: `${subIndex * 35}ms`,
          zIndex: index + 1,
          opacity: 1,
          boxShadow: '0 12px 28px rgba(0,0,0,0.7)',
        };
      }

      case 'riffle': {
        const isEven = index % 2 === 0;
        const xOffset = isEven ? -15 + index * 1.5 : 15 - index * 1.5;
        const yOffset = (9 - index) * -3.2;
        const rot = isEven ? -3.5 + index * 0.6 : 3.5 - index * 0.6;

        return {
          transform: `translate3d(${xOffset}px, ${yOffset}px, 0px) rotate(${rot}deg) scale(1)`,
          transition: 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1), opacity 400ms ease',
          transitionDelay: `${(index % 5) * 55}ms`,
          zIndex: index + 1,
          opacity: 1,
          boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
        };
      }

      case 'square': {
        const yOffset = (9 - index) * -1.8;
        return {
          transform: `translate3d(0px, ${yOffset}px, 0px) rotate(0deg) scale(${index === 9 ? 1.05 : 1.02})`,
          transition: 'transform 550ms cubic-bezier(0.18, 0.89, 0.32, 1.25), box-shadow 400ms ease',
          transitionDelay: `${(9 - index) * 20}ms`,
          zIndex: index + 1,
          opacity: 1,
          boxShadow:
            index >= 7
              ? '0 0 25px rgba(212,175,55,0.35), 0 15px 30px rgba(0,0,0,0.8)'
              : 'none',
        };
      }

      case 'deal': {
        if (isTopDrawn) {
          const effectiveCount = Math.min(cardCount, 5);
          const spreadOffset = index - (effectiveCount - 1) / 2;
          const xOffset = spreadOffset * 70;
          const yOffset = -55 - Math.abs(spreadOffset) * 8;
          const rot = spreadOffset * 7;

          return {
            transform: `translate3d(${xOffset}px, ${yOffset}px, 0px) rotate(${rot}deg) scale(1.06)`,
            transition: 'transform 750ms cubic-bezier(0.2, 0.9, 0.3, 1), opacity 500ms ease',
            transitionDelay: `${index * 80}ms`,
            zIndex: 20 + index,
            opacity: 1,
            boxShadow: '0 0 30px rgba(212,175,55,0.45), 0 15px 35px rgba(0,0,0,0.9)',
          };
        } else {
          return {
            transform: `translate3d(0px, ${(9 - index) * -1.5 + 20}px, 0px) scale(0.92)`,
            transition: 'transform 600ms ease-out, opacity 500ms ease',
            transitionDelay: '100ms',
            zIndex: index,
            opacity: 0.3,
            boxShadow: 'none',
          };
        }
      }
    }
  };

  const getPhaseDescription = () => {
    switch (phase) {
      case 'gather':
        return t('shuffle_step_gather');
      case 'split':
        return t('shuffle_step_split');
      case 'riffle':
        return t('shuffle_step_riffle');
      case 'square':
        return t('shuffle_step_square');
      case 'deal':
        return t('shuffle_step_deal');
    }
  };

  const steps: { key: ShufflePhase; label: string }[] = [
    { key: 'gather', label: isMyanmar ? 'စုစည်း' : 'Gather' },
    { key: 'split', label: isMyanmar ? 'ခွဲထုတ်' : 'Split' },
    { key: 'riffle', label: isMyanmar ? 'မွှေနှောက်' : 'Riffle' },
    { key: 'square', label: isMyanmar ? 'ချိန်ညှိ' : 'Square' },
    { key: 'deal', label: isMyanmar ? 'ခင်းကျင်း' : 'Deal' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === phase);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10 px-4">
      {/* Top Ceremony Header */}
      <div className="text-center space-y-2 mb-6 sm:mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-200 text-xs font-medium">
          <Shuffle className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>{t('shuffle_ritual_badge')}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 tracking-wide">
          {t('shuffle_title')}
        </h3>

        {question && (
          <p className="text-xs sm:text-sm text-slate-300 italic max-w-md mx-auto line-clamp-1">
            &ldquo;{question}&rdquo;
          </p>
        )}
      </div>

      {/* Sacred Ritual Mat & Animated Deck Stage */}
      <div className="relative w-full max-w-md h-72 sm:h-80 flex items-center justify-center select-none overflow-visible">
        {/* Mystic velvet aura backdrop */}
        <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-amber-500/10 via-purple-900/20 to-amber-500/5 blur-xl pointer-events-none" />

        {/* Ornate altar rings */}
        <div className="absolute w-60 h-60 sm:w-68 sm:h-68 rounded-full border border-amber-400/15 border-dashed pointer-events-none animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-amber-300/10 pointer-events-none" />

        {/* Phase-specific glowing burst */}
        <div
          className={`absolute w-36 h-36 rounded-full transition-all duration-700 pointer-events-none ${
            phase === 'square'
              ? 'bg-amber-400/25 blur-2xl scale-150'
              : phase === 'deal'
              ? 'bg-purple-500/20 blur-2xl scale-125'
              : 'bg-amber-400/10 blur-xl scale-100'
          }`}
        />

        {/* Stacked Cards undergoing CSS transitions */}
        <div className="relative w-28 sm:w-32 aspect-[2/3.3] flex items-center justify-center">
          {STACK_CARDS.map((cardIndex) => {
            const cardStyle = getCardStyle(cardIndex);
            return (
              <div
                key={cardIndex}
                className="absolute inset-0 w-full h-full will-change-transform pointer-events-none"
                style={{
                  transform: cardStyle.transform,
                  transition: cardStyle.transition,
                  transitionDelay: cardStyle.transitionDelay,
                  zIndex: cardStyle.zIndex,
                  opacity: cardStyle.opacity,
                  boxShadow: cardStyle.boxShadow,
                }}
              >
                <TarotCardBack className="w-full h-full shadow-lg border-amber-400/40" />
              </div>
            );
          })}
        </div>

        {/* Ambient sparkle badge for current count */}
        <div className="absolute bottom-1 right-2 sm:right-6 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-amber-400/30 text-[11px] text-amber-200 backdrop-blur-md">
          <Layers className="w-3 h-3 text-amber-300" />
          <span>78 {isMyanmar ? 'ကတ်' : 'Cards'}</span>
        </div>
      </div>

      {/* Ritual Phase Progress & Status */}
      <div className="w-full max-w-md space-y-4 mt-4">
        {/* Dynamic Ritual Status Text */}
        <div className="text-center min-h-[2rem]">
          <p className="font-serif text-amber-200 text-sm sm:text-base tracking-wide flex items-center justify-center space-x-2 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{getPhaseDescription()}</span>
          </p>
        </div>

        {/* Step Progress Visual Bar */}
        <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={step.key}
                className={`flex items-center space-x-1 transition-colors ${
                  isCurrent
                    ? 'text-amber-300 font-semibold scale-105'
                    : isCompleted
                    ? 'text-amber-400/80'
                    : 'text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent ? 'bg-amber-300 ring-2 ring-amber-400/40' : 'bg-slate-600'
                    }`}
                  />
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Skip Button */}
        <div className="pt-2 text-center">
          <button
            type="button"
            id="skip-shuffle-btn"
            onClick={handleSkip}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-200 text-xs font-medium transition-all cursor-pointer"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>{t('shuffle_skip_btn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

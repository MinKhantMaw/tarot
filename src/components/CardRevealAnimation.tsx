import React, { useState } from 'react';
import { DrawnCard, ReadingCategory, SpreadId } from '../types/tarot';
import { TarotCard } from './TarotCard';
import { SPREAD_DEFINITIONS } from '../data/spreads';
import { Sparkles, Eye, Shuffle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TarotDeckShuffleAnimation } from './TarotDeckShuffleAnimation';

interface CardRevealAnimationProps {
  question: string;
  category: ReadingCategory;
  spread: SpreadId;
  cards: DrawnCard[];
  onAllRevealed: () => void;
  isGeneratingInterpretation: boolean;
}

export const CardRevealAnimation: React.FC<CardRevealAnimationProps> = ({
  question,
  category,
  spread,
  cards,
  onAllRevealed,
  isGeneratingInterpretation,
}) => {
  const { t, isMyanmar, getCategoryLabel, getSpreadLabel } = useLanguage();
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(true);

  const spreadDef = SPREAD_DEFINITIONS[spread];
  const spreadTitle = getSpreadLabel(spread, spreadDef?.name || 'Tarot Spread');
  const categoryTitle = getCategoryLabel(category);

  const handleRevealCard = (index: number) => {
    if (!revealedIndices.includes(index)) {
      const next = [...revealedIndices, index];
      setRevealedIndices(next);
      if (next.length === cards.length) {
        // All revealed!
        onAllRevealed();
      }
    }
  };

  const handleRevealAll = () => {
    const all = cards.map((_, i) => i);
    setRevealedIndices(all);
    onAllRevealed();
  };

  const handleReshuffle = () => {
    setRevealedIndices([]);
    setIsShuffling(true);
  };

  const allRevealed = revealedIndices.length === cards.length;

  // Responsive grid class based on card count
  const getGridClasses = () => {
    if (cards.length === 1) return 'flex justify-center items-center py-4';
    if (cards.length <= 3) return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center';
    if (cards.length <= 5) return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center';
    return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Visual Shuffle Animation Step using CSS transitions */}
      {isShuffling ? (
        <TarotDeckShuffleAnimation
          cardCount={cards.length}
          question={question}
          onShuffleComplete={() => setIsShuffling(false)}
        />
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Session Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {isMyanmar
                  ? `အဆင့် ၂: တားရော့ကတ် ၇၈ ကတ်မှ ${cards.length} ကတ် ရွေးချယ်ပြီးပါပြီ`
                  : `Step 2: Drawing ${cards.length} Cards from the 78-Card Arcana`}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              {isMyanmar ? 'သင်ရွေးချယ်ထားသော တားရော့ကတ်များ' : 'Your Cards are Drawn'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 italic">
              &ldquo;{question}&rdquo;
            </p>
            <div className="mt-2 flex items-center justify-center space-x-2 text-xs text-slate-400">
              <span>{isMyanmar ? 'ကဏ္ဍ' : 'Category'}: <strong className="text-amber-300 font-normal">{categoryTitle}</strong></span>
              <span>&bull;</span>
              <span>{isMyanmar ? 'ခင်းနည်း' : 'Spread'}: <strong className="text-amber-300 font-normal">{spreadTitle}</strong></span>
              <span>&bull;</span>
              <span>
                {isMyanmar ? 'အရေအတွက်' : 'Count'}:{' '}
                <strong className="text-amber-300 font-normal">
                  {cards.length} {isMyanmar ? 'ကတ်' : cards.length === 1 ? 'Card' : 'Cards'}
                </strong>
              </span>
            </div>
          </div>

          {/* Instructions and Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
              <span>
                {isMyanmar
                  ? 'ကတ်တစ်ခုချင်းစီကို နှိပ်၍ ၎င်း၏ လျှို့ဝှက်ဆန်းကြယ် သင်္ကေတကို ဖွင့်ကြည့်ပါ ('
                  : 'Touch or click each card to reveal its ancient reflection ('}
              </span>
              <strong className="text-amber-300">
                {isMyanmar
                  ? `${cards.length} ကတ်အနက် ${revealedIndices.length} ကတ် ဖွင့်ပြီး`
                  : `${revealedIndices.length} of ${cards.length} revealed`}
              </strong>
              <span>)</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                id="reshuffle-deck-btn"
                onClick={handleReshuffle}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-200 text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5"
                title={t('shuffle_reshuffle_btn')}
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('shuffle_reshuffle_btn')}</span>
              </button>

              {!allRevealed && (
                <button
                  type="button"
                  id="reveal-all-cards-btn"
                  onClick={handleRevealAll}
                  className="px-4 py-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-200 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('reveal_all_btn')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Cards Display Grid */}
          <div className={getGridClasses()}>
            {cards.map((card, idx) => (
              <TarotCard
                key={card.card.id}
                drawnCard={card}
                isRevealed={revealedIndices.includes(idx)}
                onReveal={() => handleRevealCard(idx)}
              />
            ))}
          </div>

          {/* All Revealed Banner */}
          {allRevealed && (
            <div className="mt-8 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-amber-950/30 to-purple-950/40 border border-amber-400/30 backdrop-blur-md max-w-xl mx-auto flex flex-col items-center">
                <Sparkles className="w-6 h-6 text-amber-300 mb-2" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-100">
                  {isMyanmar ? `ကတ် ${cards.length} ကတ်လုံး ဖွင့်လှစ်ပြီးပါပြီ` : `All ${cards.length} Cards Revealed`}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-md">
                  {isGeneratingInterpretation
                    ? (isMyanmar ? 'အော်ရာကယ်လ်သည် သင်၏ ကတ်များအကြား စွမ်းအင်စီးဆင်းမှုနှင့် ဟောကိန်းကို ဆန်းစစ်ဖော်ထုတ်နေပါသည်...' : 'The oracle is currently interpreting the energetic dialogue between your cards...')
                    : (isMyanmar ? 'ရှေးဟောင်းကတ်များ ညီညွတ်စွာ နေရာယူပြီးပါပြီ။ အသေးစိတ် ဟောကြားချက်ကို ပြုစုနေပါသည်...' : 'The ancient patterns are aligned. Synthesizing your deep reading...')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

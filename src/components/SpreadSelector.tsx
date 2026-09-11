import React, { useState } from 'react';
import { SPREAD_DEFINITIONS } from '../data/spreads';
import { SpreadId } from '../types/tarot';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SpreadSelectorProps {
  selectedSpread: SpreadId;
  onSelectSpread: (spread: SpreadId) => void;
}

export const SpreadSelector: React.FC<SpreadSelectorProps> = ({
  selectedSpread,
  onSelectSpread,
}) => {
  const { t, isMyanmar, getSpreadLabel, getPositionLabel } = useLanguage();
  const spreadEntries = Object.values(SPREAD_DEFINITIONS);
  const [filterCardCount, setFilterCardCount] = useState<number | 'all'>('all');

  const filteredSpreads =
    filterCardCount === 'all'
      ? spreadEntries
      : spreadEntries.filter((s) => s.cardCount === filterCardCount);

  const currentSpread = SPREAD_DEFINITIONS[selectedSpread];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-200 tracking-wide">
            {isMyanmar
              ? `တားရော့ကတ်ခင်းနည်း ရွေးချယ်ပါ (${currentSpread?.cardCount || 3} ကတ်)`
              : `Select Tarot Spread (${currentSpread?.cardCount || 3} Cards)`}
          </label>
          <span className="text-xs text-amber-300/80 font-medium">
            {currentSpread?.positions.map((pos) => getPositionLabel(pos)).join(' → ')}
          </span>
        </div>

        {/* Card count filter pill group */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
          {(
            [
              { label: isMyanmar ? 'အားလုံး' : 'All', value: 'all' as const },
              { label: isMyanmar ? '၁ ကတ်' : '1 Card', value: 1 as const },
              { label: isMyanmar ? '၃ ကတ်' : '3 Cards', value: 3 as const },
              { label: isMyanmar ? '၅ ကတ်' : '5 Cards', value: 5 as const },
              { label: isMyanmar ? '၇ ကတ်' : '7 Cards', value: 7 as const },
            ]
          ).map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setFilterCardCount(item.value)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterCardCount === item.value
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredSpreads.map((spread) => {
          const isSelected = selectedSpread === spread.id;
          const spreadTitle = getSpreadLabel(spread.id, spread.name);
          return (
            <button
              key={spread.id}
              type="button"
              id={`spread-btn-${spread.id}`}
              onClick={() => onSelectSpread(spread.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-400/15 border-amber-400 shadow-[0_0_18px_rgba(212,175,55,0.2)]'
                  : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-serif text-sm sm:text-base font-semibold ${
                      isSelected ? 'text-amber-200' : 'text-slate-200'
                    }`}
                  >
                    {spreadTitle}
                  </span>
                  <div className="flex items-center space-x-1 shrink-0">
                    <span
                      className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                        spread.cardCount === 1
                          ? 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20'
                          : spread.cardCount === 3
                          ? 'bg-amber-400/10 text-amber-300 border-amber-400/20'
                          : spread.cardCount === 5
                          ? 'bg-purple-400/10 text-purple-300 border-purple-400/20'
                          : 'bg-indigo-400/10 text-indigo-300 border-indigo-400/20'
                      }`}
                    >
                      {spread.cardCount} {isMyanmar ? 'ကတ်' : spread.cardCount === 1 ? 'Card' : 'Cards'}
                    </span>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {spread.description}
                </p>
              </div>

              {/* Positions visualization */}
              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-300 scrollbar-thin">
                {spread.positions.map((pos, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium whitespace-nowrap">
                      {getPositionLabel(pos)}
                    </span>
                    {idx < spread.positions.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-amber-400/60 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

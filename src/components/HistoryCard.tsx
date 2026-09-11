import React from 'react';
import { TarotReadingRecord } from '../types/tarot';
import { Calendar, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HistoryCardProps {
  reading: TarotReadingRecord;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  reading,
  onView,
  onDelete,
}) => {
  const { t, isMyanmar, getCardName, getCategoryLabel, getSpreadLabel } = useLanguage();

  const formattedDate = new Date(reading.createdAt).toLocaleDateString(isMyanmar ? 'my-MM' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 backdrop-blur-md transition-all flex flex-col justify-between group shadow-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.08)]">
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold">
              {getCategoryLabel(reading.category)}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
              {reading.cards.length} {isMyanmar ? 'ကတ်' : reading.cards.length === 1 ? 'Card' : 'Cards'}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Question */}
        <div>
          <h4 className="font-serif text-base sm:text-lg font-bold text-slate-100 line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors">
            &ldquo;{reading.question}&rdquo;
          </h4>
          <span className="text-xs text-slate-400 block mt-1">
            {isMyanmar ? 'ခင်းနည်း' : 'Spread'}: <strong className="text-slate-300 font-normal">{getSpreadLabel(reading.spreadId, reading.spreadName)}</strong>
          </span>
        </div>

        {/* Card Pills */}
        <div className="pt-2 border-t border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              {isMyanmar ? `ရွေးချယ်ထားသော ကတ်များ (${reading.cards.length}):` : `Cards Drawn (${reading.cards.length}):`}
            </span>
            {reading.clarifierCards && reading.clarifierCards.length > 0 && (
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                +{reading.clarifierCards.length} {isMyanmar ? 'ရှင်းလင်းချက်' : 'Clarifier'}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {reading.cards.map((c, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-lg bg-black/40 border border-white/10 text-slate-200 flex items-center space-x-1"
              >
                <span>{getCardName(c.card.id, c.card.name)}</span>
                <span
                  className={`text-[9px] uppercase ${
                    c.orientation === 'reversed' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  ({c.orientation === 'reversed' ? (isMyanmar ? 'ပြောင်းပြန်' : 'Rev') : (isMyanmar ? 'ပုံမှန်' : 'Up')})
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Short Excerpt */}
        <p className="text-xs text-slate-300/80 line-clamp-2 italic pt-1 leading-relaxed">
          {reading.interpretation.overallReading}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onDelete(reading.id)}
          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          title={isMyanmar ? 'မှတ်တမ်းမှ ပယ်ဖျက်မည်' : 'Delete reading from history'}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onView(reading.id)}
          className="px-3.5 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-200 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center space-x-1"
        >
          <span>{isMyanmar ? 'အပြည့်အစုံ ကြည့်မည်' : 'View Reading'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

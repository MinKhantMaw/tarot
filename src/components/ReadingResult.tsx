import React, { useState } from 'react';
import { ClarifierCardRecord, TarotReadingRecord } from '../types/tarot';
import { TarotCardArt } from './TarotCardArt';
import { CardInterpretation } from './CardInterpretation';
import { OverallReading } from './OverallReading';
import { drawSingleClarifierCard } from '../services/tarotDeck';
import { requestClarifierInterpretation } from '../services/geminiService';
import { readingRepository } from '../services/readingRepository';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Share2,
  ArrowLeft,
  RotateCcw,
  Check,
  Calendar,
  PlusCircle,
  Loader2,
  HelpCircle,
} from 'lucide-react';

interface ReadingResultProps {
  reading: TarotReadingRecord;
  onNewReading: () => void;
  onBackToHistory?: () => void;
}

export const ReadingResult: React.FC<ReadingResultProps> = ({
  reading: initialReading,
  onNewReading,
  onBackToHistory,
}) => {
  const { t, isMyanmar, language, getCardName, getPositionLabel, getCategoryLabel, getSpreadLabel } = useLanguage();
  const [reading, setReading] = useState<TarotReadingRecord>(initialReading);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isDrawingClarifier, setIsDrawingClarifier] = useState(false);
  const [clarifierError, setClarifierError] = useState<string | null>(null);

  const formattedDate = new Date(reading.createdAt).toLocaleDateString(isMyanmar ? 'my-MM' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleCopySummary = () => {
    const cardSummary = reading.cards
      .map((c) => `${getPositionLabel(c.position)}: ${getCardName(c.card.id, c.card.name)} (${c.orientation === 'reversed' ? t('reversed') : t('upright')})`)
      .join('\n');
    const clarifiersText = reading.clarifierCards?.length
      ? '\n\n' + (isMyanmar ? 'ရှင်းလင်းချက်ကတ်များ:' : 'Clarifier Cards:') + '\n' +
        reading.clarifierCards
          .map((c) => `${getCardName(c.drawnCard.card.id, c.drawnCard.card.name)} (${c.drawnCard.orientation === 'reversed' ? t('reversed') : t('upright')}): ${c.interpretation}`)
          .join('\n')
      : '';
    const fullSummary = `✦ Mystic Tarot Reading ✦\n\n${isMyanmar ? 'မေးခွန်း' : 'Question'}: "${reading.question}"\n${isMyanmar ? 'ကဏ္ဍ' : 'Category'}: ${getCategoryLabel(reading.category)}\n${isMyanmar ? 'ခင်းနည်း' : 'Spread'}: ${getSpreadLabel(reading.spreadId, reading.spreadName)}\n${isMyanmar ? 'ရက်စွဲ' : 'Date'}: ${formattedDate}\n\n${isMyanmar ? 'ကတ်များ' : 'Cards Drawn'}:\n${cardSummary}${clarifiersText}\n\n${isMyanmar ? 'ခြုံငုံသုံးသပ်ချက်' : 'Overall Reading'}:\n${reading.interpretation.overallReading}\n\n${isMyanmar ? 'လက်တွေ့လမ်းညွှန်ချက်' : 'Guidance'}:\n${reading.interpretation.practicalGuidance}`;
    navigator.clipboard.writeText(fullSummary);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleDrawClarifier = async () => {
    try {
      setIsDrawingClarifier(true);
      setClarifierError(null);

      const existingIds = [
        ...reading.cards.map((c) => c.card.id),
        ...(reading.clarifierCards || []).map((c) => c.drawnCard.card.id),
      ];

      const clarifierCount = reading.clarifierCards?.length || 0;
      const newClarifierCard = drawSingleClarifierCard(existingIds, clarifierCount);

      const interpretationText = await requestClarifierInterpretation({
        question: reading.question,
        category: reading.category,
        existingCards: reading.cards,
        clarifierCard: newClarifierCard,
        language: reading.language || language,
      });

      const newRecord: ClarifierCardRecord = {
        drawnCard: newClarifierCard,
        interpretation: interpretationText,
        drawnAt: new Date().toISOString(),
      };

      const updatedClarifiers = [...(reading.clarifierCards || []), newRecord];
      const updatedReading = {
        ...reading,
        clarifierCards: updatedClarifiers,
      };

      await readingRepository.updateReading(reading.id, {
        clarifierCards: updatedClarifiers,
      });

      setReading(updatedReading);
    } catch (err: any) {
      console.error('Failed to draw clarifier:', err);
      setClarifierError(err.message || (isMyanmar ? 'ယခုအချိန်တွင် ရှင်းလင်းချက်ကတ် ရွေးချယ်၍ မရနိုင်သေးပါ။' : 'Unable to draw clarifier card right now.'));
    } finally {
      setIsDrawingClarifier(false);
    }
  };

  const getGridClasses = (count: number) => {
    if (count === 1) return 'flex justify-center';
    if (count <= 3) return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center';
    if (count <= 5) return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center';
    return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10 sm:space-y-12">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        {onBackToHistory ? (
          <button
            onClick={onBackToHistory}
            className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('reading_back_to_history')}</span>
          </button>
        ) : (
          <button
            onClick={onNewReading}
            className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('reading_consult_again')}</span>
          </button>
        )}

        <div className="flex items-center space-x-3">
          <button
            id="share-reading-btn"
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center space-x-2"
          >
            {copiedShare ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">{t('reading_share_copied')}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-300" />
                <span>{t('reading_share')}</span>
              </>
            )}
          </button>

          <button
            onClick={onNewReading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('reading_new')}</span>
          </button>
        </div>
      </div>

      {/* Reading Result Hero Title & Metadata */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{isMyanmar ? 'အော်ရာကယ်လ် ဟောကြားချက် ပြီးမြောက်ပါပြီ' : 'Oracle Synthesis Complete'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
          {t('reading_title')}
        </h1>

        {/* Question Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/10 max-w-2xl mx-auto backdrop-blur-md">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-300/80 mb-1">
            {t('reading_question_title')}
          </div>
          <p className="text-base sm:text-lg font-serif italic text-slate-100">
            &ldquo;{reading.question}&rdquo;
          </p>
          <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span>{isMyanmar ? 'ကဏ္ဍ' : 'Category'}: <strong className="text-amber-200 font-medium">{getCategoryLabel(reading.category)}</strong></span>
            <span>&bull;</span>
            <span>{isMyanmar ? 'ခင်းနည်း' : 'Spread'}: <strong className="text-amber-200 font-medium">{getSpreadLabel(reading.spreadId, reading.spreadName)} ({reading.cards.length} {isMyanmar ? 'ကတ်' : 'Cards'})</strong></span>
            <span>&bull;</span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-amber-400/70" />
              <span>{formattedDate}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Drawn Cards in Horizontal Row on Desktop, Vertical on Mobile */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-slate-200 tracking-wide">
            {isMyanmar ? `ရွေးချယ်ထားသော တားရော့ကတ်များ (${reading.cards.length} ကတ်)` : `The Cards in Assembly (${reading.cards.length} Cards)`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {isMyanmar ? 'သတ်မှတ်ထားသော ကတ်ခင်းနည်းအတိုင်း နေရာချထားပါသည်' : 'Observed in sacred spread alignment'}
          </p>
        </div>

        <div className={getGridClasses(reading.cards.length)}>
          {reading.cards.map((drawn) => {
            const isReversed = drawn.orientation === 'reversed';
            return (
              <div
                key={drawn.card.id}
                className="w-full max-w-[260px] flex flex-col items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-md"
              >
                {/* Position & Orientation Title */}
                <div className="mb-3 text-center">
                  <div className="font-mono text-xs uppercase tracking-widest text-amber-300 font-bold">
                    {getPositionLabel(drawn.position)}
                  </div>
                  <div className="text-sm font-serif font-bold text-slate-100 mt-0.5">
                    {getCardName(drawn.card.id, drawn.card.name)}
                  </div>
                  <span
                    className={`inline-block mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                      isReversed
                        ? 'bg-rose-950/50 border-rose-500/30 text-rose-300'
                        : 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
                    }`}
                  >
                    {isReversed ? t('reversed') : t('upright')}
                  </span>
                </div>

                {/* Card Artwork */}
                <div className="w-full">
                  <TarotCardArt card={drawn.card} isReversed={isReversed} />
                </div>

                {/* Keywords */}
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {drawn.card.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opening Interpretation Arc */}
      {reading.interpretation.openingInterpretation && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/20 via-amber-950/20 to-purple-950/20 border border-amber-400/20 backdrop-blur-md text-left">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-200 mb-2">
            {isMyanmar ? 'အော်ရာကယ်လ်၏ နိဒါန်းအဖွင့်' : 'The Awakening Oracle'}
          </h3>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light italic">
            {reading.interpretation.openingInterpretation}
          </p>
        </div>
      )}

      {/* Detailed Card-by-Card Analysis */}
      <div className="space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 text-left">
          {isMyanmar ? 'ကတ်တစ်ခုချင်းစီအလိုက် အသေးစိတ် ခွဲခြမ်းစိတ်ဖြာချက်' : 'Card-by-Card Examination'}
        </h2>

        <div className="space-y-6">
          {reading.cards.map((card, idx) => {
            const interpText =
              reading.interpretation.cardInterpretations?.[idx]?.text ||
              (idx === 0
                ? reading.interpretation.card1Interpretation
                : idx === 1
                ? reading.interpretation.card2Interpretation
                : idx === 2
                ? reading.interpretation.card3Interpretation
                : (reading.interpretation as any)[`card${idx + 1}Interpretation`]) ||
              `The archetype of ${card.card.name} (${card.orientation}) brings foundational clarity to ${card.position}.`;

            return (
              <CardInterpretation
                key={`${card.card.id}-${idx}`}
                cardIndex={idx}
                drawnCard={card}
                interpretationText={interpText}
              />
            );
          })}
        </div>
      </div>

      {/* Clarifier Cards Section: Drawn cards for deeper clarity */}
      <div className="space-y-6 p-6 sm:p-8 rounded-3xl bg-amber-400/[0.03] border border-amber-400/20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest text-amber-300">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t('clarifier_badge')}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 mt-1">
              {t('clarifier_title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t('clarifier_desc')}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDrawClarifier}
            disabled={isDrawingClarifier}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer flex items-center justify-center space-x-2 self-start sm:self-auto shrink-0"
          >
            {isDrawingClarifier ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t('clarifier_drawing')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t('clarifier_draw_btn')}</span>
              </>
            )}
          </button>
        </div>

        {clarifierError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {clarifierError}
          </div>
        )}

        {/* Render existing clarifier cards */}
        {reading.clarifierCards && reading.clarifierCards.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-amber-400/15">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">
              {t('clarifier_cards_drawn')} ({reading.clarifierCards.length})
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {reading.clarifierCards.map((clarifier, idx) => (
                <div
                  key={clarifier.drawnCard.card.id + idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-amber-400/30 flex flex-col md:flex-row items-center md:items-start gap-5 shadow-lg"
                >
                  <div className="w-36 shrink-0 shadow-lg">
                    <TarotCardArt
                      card={clarifier.drawnCard.card}
                      isReversed={clarifier.drawnCard.orientation === 'reversed'}
                    />
                  </div>
                  <div className="space-y-2 text-left flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 font-bold">
                        {isMyanmar ? `ရှင်းလင်းချက်ကတ် #${idx + 1}` : `Clarifier #${idx + 1}`}
                      </span>
                      <span className="text-xs text-slate-300 font-semibold">
                        {getCardName(clarifier.drawnCard.card.id, clarifier.drawnCard.card.name)} ({clarifier.drawnCard.orientation === 'reversed' ? t('reversed') : t('upright')})
                      </span>
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                      {clarifier.interpretation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overall Reading, Guidance, Reflection Points */}
      <OverallReading interpretation={reading.interpretation} />

      {/* Bottom Completion Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-400/10 via-purple-600/10 to-indigo-900/15 border border-amber-400/30 text-center space-y-4 backdrop-blur-xl">
        <Sparkles className="w-8 h-8 text-amber-300 mx-auto" />
        <h3 className="font-serif text-2xl font-bold text-slate-100">
          {isMyanmar ? 'ဤတားရော့ဟောကြားချက်သည် သင်၏ လျှောက်လှမ်းရာလမ်းကို အလင်းပြပါစေ' : 'May the Wisdom Guide Your Steps'}
        </h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          {isMyanmar
            ? `ဤတားရော့ဟောကြားချက် (${reading.cards.length} ကတ်${reading.clarifierCards?.length ? ` နှင့် ရှင်းလင်းချက် ${reading.clarifierCards.length} ကတ်` : ''}) ကို သင်၏ သီးသန့်မှတ်တမ်းတွင် သိမ်းဆည်းထားပြီးဖြစ်ပါသည်။`
            : `This reading with its ${reading.cards.length} cards ${reading.clarifierCards?.length ? `and ${reading.clarifierCards.length} clarifier` : ''} has been securely cataloged in your private history.`}
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={onNewReading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
          >
            {t('reading_new')}
          </button>
          {onBackToHistory && (
            <button
              onClick={onBackToHistory}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-sm font-medium transition-all cursor-pointer"
            >
              {t('reading_back_to_history')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

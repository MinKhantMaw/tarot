import React, { useState, useMemo } from 'react';
import { ALL_TAROT_CARDS } from '../data/tarotCards';
import { TarotCard } from '../types/tarot';
import { TarotCardArt } from './TarotCardArt';
import { getTarotCardImageUrl } from '../utils/tarotCardImages';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  Sparkles,
  BookOpen,
  X,
  Flame,
  Droplets,
  Sword,
  Coins,
  Layers,
  ArrowRight,
  Info,
  ZoomIn,
} from 'lucide-react';

interface CardCodexProps {
  onSelectCardForReading?: (card: TarotCard) => void;
  onStartReading: () => void;
}

export const CardCodex: React.FC<CardCodexProps> = ({ onStartReading }) => {
  const { t, isMyanmar, getCardName } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'>('all');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [previewOrientation, setPreviewOrientation] = useState<'upright' | 'reversed'>('upright');
  const [showArtZoom, setShowArtZoom] = useState(false);

  // Filter cards
  const filteredCards = useMemo(() => {
    return ALL_TAROT_CARDS.filter((card) => {
      // Tab filter
      if (activeTab === 'major' && card.arcana !== 'major') return false;
      if (activeTab === 'wands' && card.suit !== 'wands') return false;
      if (activeTab === 'cups' && card.suit !== 'cups') return false;
      if (activeTab === 'swords' && card.suit !== 'swords') return false;
      if (activeTab === 'pentacles' && card.suit !== 'pentacles') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const localizedName = getCardName(card.id, card.name).toLowerCase();
        const matchesName = card.name.toLowerCase().includes(q) || localizedName.includes(q);
        const matchesKeywords = card.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesUpright = card.uprightMeaning.toLowerCase().includes(q);
        const matchesReversed = card.reversedMeaning.toLowerCase().includes(q);
        return matchesName || matchesKeywords || matchesUpright || matchesReversed;
      }

      return true;
    });
  }, [activeTab, searchQuery, getCardName]);

  const tabs = [
    { id: 'all', label: isMyanmar ? 'ကတ်အားလုံး' : 'All Cards', count: 78, icon: Layers },
    { id: 'major', label: isMyanmar ? 'မေဂျာ အာကိန်းနား' : 'Major Arcana', count: 22, icon: Sparkles },
    { id: 'wands', label: isMyanmar ? 'တုတ်ချောင်း (မီး)' : 'Wands (Fire)', count: 14, icon: Flame },
    { id: 'cups', label: isMyanmar ? 'ခွက် (ရေ)' : 'Cups (Water)', count: 14, icon: Droplets },
    { id: 'swords', label: isMyanmar ? 'ဓား (လေ)' : 'Swords (Air)', count: 14, icon: Sword },
    { id: 'pentacles', label: isMyanmar ? 'ဒင်္ဂါး (မြေ)' : 'Pentacles (Earth)', count: 14, icon: Coins },
  ] as const;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>{isMyanmar ? '၇၈ ကတ်ပါဝင်သော တားရော့ဒီဇိုင်းစုံ' : 'The Complete 78-Card Deck'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
          {t('codex_title')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {t('codex_subtitle')}
        </p>

        <div className="pt-2">
          <button
            onClick={onStartReading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isMyanmar ? 'တားရော့ဟောကိန်း စတင်မေးမြန်းမည်' : 'Consult the Oracle (Draw Cards)'}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-300/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('codex_search_placeholder')}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-amber-400/60 focus:bg-white/[0.07] focus:outline-none text-slate-100 placeholder-slate-400 text-sm transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suit & Arcana Filter Tabs */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-semibold'
                    : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-white/10 text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <span>
          {isMyanmar
            ? <>ကတ် ၇၈ ကတ်အနက် <strong className="text-amber-300">{filteredCards.length}</strong> ကတ် ပြသထားပါသည်</>
            : <>Showing <strong className="text-amber-300">{filteredCards.length}</strong> of 78 cards</>}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-amber-300 hover:underline cursor-pointer"
          >
            {isMyanmar ? 'ရှာဖွေမှု ပြန်လည်ရှင်းထုတ်မည်' : 'Clear Search'}
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {filteredCards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              setSelectedCard(card);
              setPreviewOrientation('upright');
            }}
            className="group flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer text-left shadow-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] focus:outline-none"
          >
            <div className="w-full max-w-[140px] transition-transform duration-300 group-hover:scale-105">
              <TarotCardArt card={card} isReversed={false} />
            </div>

            <div className="mt-3 w-full text-center space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80">
                {card.arcana === 'major'
                  ? (isMyanmar ? `မေဂျာ ${card.number !== undefined ? `• ${card.number}` : ''}` : `Major ${card.number !== undefined ? `• ${card.number}` : ''}`)
                  : (isMyanmar
                      ? card.suit === 'wands' ? 'တုတ်ချောင်း' : card.suit === 'cups' ? 'ခွက်' : card.suit === 'swords' ? 'ဓား' : 'ဒင်္ဂါး'
                      : card.suit)}
              </div>
              <h3 className="font-serif text-sm font-bold text-slate-100 group-hover:text-amber-200 transition-colors truncate">
                {getCardName(card.id, card.name)}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                {card.keywords.slice(0, 2).join(', ')}
              </p>
            </div>
          </button>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="py-16 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-300 text-sm">
            {isMyanmar ? 'ရှာဖွေမှုနှင့် ကိုက်ညီသော တားရော့ကတ် မတွေ့ရှိပါ။' : 'No tarot cards matched your search.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('all');
            }}
            className="px-4 py-1.5 rounded-lg bg-white/10 text-amber-300 text-xs hover:bg-white/15 cursor-pointer"
          >
            {isMyanmar ? 'စစ်ထုတ်မှုများ ပြန်လည်သတ်မှတ်မည်' : 'Reset Filters'}
          </button>
        </div>
      )}

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F0D24] border border-amber-400/30 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
              {/* Card visual thumb with orientation flip button */}
              <div className="w-48 sm:w-52 shrink-0 flex flex-col items-center space-y-3">
                <div className="w-full shadow-2xl">
                  <TarotCardArt
                    card={selectedCard}
                    isReversed={previewOrientation === 'reversed'}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewOrientation((prev) => (prev === 'upright' ? 'reversed' : 'upright'))
                    }
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-200 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>{isMyanmar ? 'အနေအထား:' : 'Orientation:'}</span>
                    <strong className="text-amber-300 uppercase font-semibold">
                      {previewOrientation === 'reversed' ? t('reversed') : t('upright')}
                    </strong>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowArtZoom(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer"
                    title={isMyanmar ? 'ကတ်ပုံရိပ် အပြည့်အစုံ ကြည့်မည်' : 'View full vintage artwork scan'}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{isMyanmar ? 'ပုံရိပ်ချဲ့ကြည့်မည်' : 'Zoom Artwork'}</span>
                  </button>
                </div>
              </div>

              {/* Card Meta & Lore */}
              <div className="flex-1 space-y-4 text-left">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold">
                      {selectedCard.arcana === 'major'
                        ? (isMyanmar
                            ? `မေဂျာ အာကိန်းနား ${selectedCard.number !== undefined ? `• ကတ်နံပါတ် ${selectedCard.number}` : ''}`
                            : `Major Arcana ${selectedCard.number !== undefined ? `• Card ${selectedCard.number}` : ''}`)
                        : (isMyanmar
                            ? `မိုင်နာ အာကိန်းနား • ${selectedCard.suit === 'wands' ? 'တုတ်ချောင်း' : selectedCard.suit === 'cups' ? 'ခွက်' : selectedCard.suit === 'swords' ? 'ဓား' : 'ဒင်္ဂါး'}`
                            : `Minor Arcana • Suit of ${selectedCard.suit}`)}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                    {getCardName(selectedCard.id, selectedCard.name)}
                  </h2>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedCard.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Meanings */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase text-emerald-400 font-semibold block mb-0.5">
                      ✦ {isMyanmar ? 'ပုံမှန်အနေအထား အဓိပ္ပာယ်:' : 'Upright Meaning:'}
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {selectedCard.uprightMeaning}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-rose-400 font-semibold block mb-0.5">
                      ✦ {isMyanmar ? 'ပြောင်းပြန်အနေအထား အဓိပ္ပာယ်:' : 'Reversed Meaning:'}
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {selectedCard.reversedMeaning}
                    </p>
                  </div>
                </div>

                {/* Traditional Lore */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs text-amber-300 font-medium">
                    <Info className="w-3.5 h-3.5" />
                    <span>{isMyanmar ? 'ရှေးရိုးရာ အထိမ်းအမှတ် သင်္ကေတနှင့် သမိုင်းကြောင်း' : 'Traditional Symbolism & Lore'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedCard.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom action */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedCard(null);
                  onStartReading();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>{isMyanmar ? 'ကတ်များကို စတင်မေးမြန်းမည်' : 'Draw Cards in a Reading'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / High-Res Vintage Artwork Scan Modal */}
      {showArtZoom && selectedCard && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowArtZoom(false)}
        >
          <div
            className="relative max-w-sm sm:max-w-md w-full bg-[#0d0a1c] border border-amber-400/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(212,175,55,0.25)] flex flex-col items-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-slate-100 text-base sm:text-lg">
                  {getCardName(selectedCard.id, selectedCard.name)}
                </h3>
                <span className="text-xs text-amber-300/80 font-mono">
                  Rider-Waite-Smith (1909)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowArtZoom(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res image frame */}
            <div className="relative w-full max-w-[280px] aspect-[2/3.4] rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-black flex items-center justify-center">
              <img
                src={selectedCard.imageUrl || getTarotCardImageUrl(selectedCard)}
                alt={selectedCard.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain transition-transform duration-500 ${
                  previewOrientation === 'reversed' ? 'rotate-180' : ''
                }`}
              />
            </div>

            <div className="flex items-center justify-between w-full pt-2 border-t border-white/10 text-xs text-slate-400">
              <button
                type="button"
                onClick={() =>
                  setPreviewOrientation((prev) => (prev === 'upright' ? 'reversed' : 'upright'))
                }
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 font-medium cursor-pointer"
              >
                {previewOrientation === 'reversed' ? t('reversed') : t('upright')}
              </button>
              <span className="text-[11px] text-slate-400">
                {selectedCard.keywords.slice(0, 3).join(' • ')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

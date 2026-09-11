import React, { useState, useEffect } from 'react';
import { TarotReadingRecord, ReadingCategory } from '../types/tarot';
import { readingRepository } from '../services/readingRepository';
import { HistoryCard } from './HistoryCard';
import { READING_CATEGORIES } from '../data/spreads';
import { History, Sparkles, Trash2, Search, Filter, AlertTriangle, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ReadingHistoryProps {
  onViewReading: (id: string) => void;
  onStartNewReading: () => void;
}

export const ReadingHistory: React.FC<ReadingHistoryProps> = ({
  onViewReading,
  onStartNewReading,
}) => {
  const { t, isMyanmar, getCategoryLabel } = useLanguage();
  const [readings, setReadings] = useState<TarotReadingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // In-app interactive confirmation dialog states (avoids window.confirm blocked in iframes)
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
  const [readingToDelete, setReadingToDelete] = useState<TarotReadingRecord | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const loadReadings = async () => {
    setLoading(true);
    const data = await readingRepository.getReadings();
    setReadings(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReadings();
  }, []);

  const openDeleteModal = (id: string) => {
    const target = readings.find((r) => r.id === id);
    if (target) {
      setReadingToDelete(target);
    }
  };

  const confirmDeleteReading = async () => {
    if (!readingToDelete) return;
    try {
      await readingRepository.deleteReading(readingToDelete.id);
      setReadings((prev) => prev.filter((r) => r.id !== readingToDelete.id));
      showToast(
        isMyanmar
          ? 'ဟောကိန်းမှတ်တမ်းကို ပယ်ဖျက်ပြီးပါပြီ'
          : 'Reading removed from archives'
      );
    } catch (err) {
      console.error('Failed to delete reading:', err);
    } finally {
      setReadingToDelete(null);
    }
  };

  const confirmClearAll = async () => {
    try {
      setIsClearing(true);
      await readingRepository.clearAllReadings();
      setReadings([]);
      setShowClearConfirmModal(false);
      showToast(
        isMyanmar
          ? 'မှတ်တမ်းများ အားလုံးကို အောင်မြင်စွာ ဖျက်ပစ်ပြီးပါပြီ'
          : 'All reading archives have been erased'
      );
    } catch (err) {
      console.error('Failed to clear readings:', err);
    } finally {
      setIsClearing(false);
    }
  };

  const filteredReadings = readings.filter((r) => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch =
      r.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cards.some((c) => c.card.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.interpretation.overallReading.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8 relative">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-2xl bg-[#140e26] border border-amber-400/40 text-amber-200 text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs font-medium mb-2">
            <History className="w-3.5 h-3.5 text-amber-300" />
            <span>{isMyanmar ? 'သိမ်းဆည်းထားသော မှတ်တမ်း' : 'Sacred Archive'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            {t('history_title')}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t('history_subtitle')}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {readings.length > 0 && (
            <button
              type="button"
              id="clear-all-records-btn"
              onClick={() => setShowClearConfirmModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-500/30 transition-all cursor-pointer flex items-center space-x-1.5 shadow-sm active:scale-95"
              title={t('history_clear_all')}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('history_clear_all')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onStartNewReading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('reading_new')}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {readings.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('history_search_placeholder')}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', ...READING_CATEGORIES.map((c) => c.id)].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {cat === 'All' ? (isMyanmar ? 'အားလုံး' : 'All') : getCategoryLabel(cat as any)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid of History Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm font-serif text-amber-200/80">
            {isMyanmar ? 'မှတ်တမ်းများကို ဖွင့်လှစ်ရှာဖွေနေပါသည်...' : 'Opening your sacred journal...'}
          </p>
        </div>
      ) : filteredReadings.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-white/[0.02] border border-white/5 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-300 mx-auto">
            <History className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-100">
            {searchQuery || selectedCategory !== 'All'
              ? (isMyanmar ? 'ကိုက်ညီသော တားရော့ဟောကိန်း မရှိပါ' : 'No Matching Readings')
              : t('history_empty_title')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {searchQuery || selectedCategory !== 'All'
              ? (isMyanmar ? 'ရှာဖွေမှုစကားလုံး သို့မဟုတ် ကဏ္ဍရွေးချယ်မှုကို ပြောင်းလဲစမ်းသပ်ကြည့်ပါ။' : 'Try adjusting your search query or selecting a different category filter.')
              : t('history_empty_desc')}
          </p>
          <div className="pt-2">
            <button
              onClick={onStartNewReading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer inline-flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isMyanmar ? 'ပထမဆုံး တားရော့ဟောကိန်းကို စတင်မည်' : 'Perform Your First Reading'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredReadings.map((reading) => (
            <HistoryCard
              key={reading.id}
              reading={reading}
              onView={onViewReading}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      {/* Clear All Records Confirmation Modal */}
      {showClearConfirmModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => !isClearing && setShowClearConfirmModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#120b22] border border-rose-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(244,63,94,0.25)] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button
                type="button"
                disabled={isClearing}
                onClick={() => setShowClearConfirmModal(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
                {isMyanmar ? 'မှတ်တမ်းအားလုံး ဖျက်ပစ်မည်လား?' : 'Clear All Tarot Records?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isMyanmar
                  ? `သင်၏ မှတ်တမ်းထဲရှိ သိမ်းဆည်းထားသော ဟောကိန်း (${readings.length}) ခုလုံးကို အပြီးအပိုင် ဖျက်ပစ်ပါမည်။ ဤလုပ်ဆောင်ချက်ကို ပြန်ပြင်၍ မရနိုင်ပါ။`
                  : `Are you sure you want to erase all ${readings.length} reading ${readings.length === 1 ? 'record' : 'records'} from your sacred journal? This action cannot be undone.`}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                disabled={isClearing}
                onClick={() => setShowClearConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                {isMyanmar ? 'မဖျက်တော့ပါ' : 'Keep Records'}
              </button>

              <button
                type="button"
                id="confirm-erase-all-btn"
                disabled={isClearing}
                onClick={confirmClearAll}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(225,29,72,0.35)] transition-all cursor-pointer flex items-center space-x-2 active:scale-95 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>
                  {isClearing
                    ? (isMyanmar ? 'ဖျက်နေပါသည်...' : 'Erasing...')
                    : (isMyanmar ? 'အားလုံး ဖျက်ပစ်မည်' : 'Yes, Erase All')}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Reading Delete Confirmation Modal */}
      {readingToDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setReadingToDelete(null)}
        >
          <div
            className="relative max-w-md w-full bg-[#120b22] border border-rose-500/30 rounded-3xl p-6 shadow-[0_0_40px_rgba(244,63,94,0.2)] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Trash2 className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setReadingToDelete(null)}
                className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-slate-100">
                {isMyanmar ? 'ဤဟောကိန်းကို မှတ်တမ်းမှ ပယ်ဖျက်မည်လား?' : 'Delete This Reading?'}
              </h3>
              <p className="text-xs text-slate-300 italic line-clamp-2 bg-black/30 p-2.5 rounded-xl border border-white/5">
                &ldquo;{readingToDelete.question}&rdquo;
              </p>
              <p className="text-xs text-slate-400">
                {isMyanmar
                  ? 'ဤမှတ်တမ်းကို ဖျက်ပစ်ပါက ပြန်လည်ရယူနိုင်မည် မဟုတ်ပါ။'
                  : 'This reading will be permanently removed from your history.'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setReadingToDelete(null)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
              >
                {isMyanmar ? 'မဖျက်တော့ပါ' : 'Cancel'}
              </button>

              <button
                type="button"
                onClick={confirmDeleteReading}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide shadow transition-all cursor-pointer flex items-center space-x-1.5 active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isMyanmar ? 'ဖျက်ပစ်မည်' : 'Delete Record'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

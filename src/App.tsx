import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ReadingSetup } from './components/ReadingSetup';
import { CardRevealAnimation } from './components/CardRevealAnimation';
import { ReadingResult } from './components/ReadingResult';
import { ReadingHistory } from './components/ReadingHistory';
import { CardCodex } from './components/CardCodex';
import { LoadingState } from './components/LoadingState';
import { ErrorMessage } from './components/ErrorMessage';
import { drawUniqueCards } from './services/tarotDeck';
import { readingRepository } from './services/readingRepository';
import { requestGeminiInterpretation } from './services/geminiService';
import { SPREAD_DEFINITIONS } from './data/spreads';
import { DrawnCard, ReadingCategory, SpreadId, TarotReadingRecord } from './types/tarot';
import { Sparkles, Moon, Compass, History, BookOpen, X, ExternalLink } from 'lucide-react';
import { ALL_TAROT_CARDS } from './data/tarotCards';
import { TarotCardArt } from './components/TarotCardArt';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t, isMyanmar, language, getCardName } = useLanguage();

  // Routing state based on browser path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Active Reading Flow State
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState<ReadingCategory>('General Life');
  const [spread, setSpread] = useState<SpreadId>('past-present-future');
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [readingStep, setReadingStep] = useState<'setup' | 'drawing' | 'interpreting'>('setup');
  const [activeReadingRecord, setActiveReadingRecord] = useState<TarotReadingRecord | null>(null);
  const [readingError, setReadingError] = useState<string | null>(null);
  const [showDeckDrawer, setShowDeckDrawer] = useState(false);
  const [deckFilter, setDeckFilter] = useState<'all' | 'major' | 'minor'>('all');

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation helper
  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load result from path if direct link e.g. /reading/result/:id
  useEffect(() => {
    if (currentPath.startsWith('/reading/result/')) {
      const id = currentPath.replace('/reading/result/', '').trim();
      if (id) {
        readingRepository.getReading(id).then((rec) => {
          if (rec) {
            setActiveReadingRecord(rec);
          } else {
            // If not found, redirect to history
            navigate('/history');
          }
        });
      }
    }
  }, [currentPath]);

  // Start new reading from setup
  const handleStartDraw = (q: string, cat: ReadingCategory, sp: SpreadId) => {
    setQuestion(q);
    setCategory(cat);
    setSpread(sp);
    setReadingError(null);

    // Draw cards according to spread definition (1, 3, 5, or 7 cards)
    const spreadDef = SPREAD_DEFINITIONS[sp];
    const cardCount = spreadDef?.cardCount || 3;
    const cards = drawUniqueCards(sp, cardCount);
    setDrawnCards(cards);
    setReadingStep('drawing');
  };

  // Once user reveals all cards in the drawing stage, trigger AI Interpretation
  const handleAllCardsRevealed = async () => {
    setReadingStep('interpreting');
    setReadingError(null);

    try {
      const spreadDef = SPREAD_DEFINITIONS[spread];
      const interpretation = await requestGeminiInterpretation({
        question,
        category,
        spreadType: spreadDef.name,
        cards: drawnCards,
        language,
      });

      // Save to ReadingRepository (localStorage)
      const savedRecord = await readingRepository.createReading({
        question,
        category,
        spread,
        spreadName: spreadDef.name,
        cards: drawnCards,
        interpretation,
        language,
      });

      setActiveReadingRecord(savedRecord);
      setReadingStep('setup');
      navigate(`/reading/result/${savedRecord.id}`);
    } catch (err: any) {
      console.error('Failed to generate reading interpretation:', err);
      setReadingError(err.message || (isMyanmar ? 'အော်ရာကယ်လ်နှင့် ချိတ်ဆက်ရာတွင် ချို့ယွင်းချက်ဖြစ်ပေါ်ခဲ့ပါသည်။' : 'An error occurred while connecting with the oracle.'));
      setReadingStep('drawing');
    }
  };

  const handleResetReading = () => {
    setQuestion('');
    setDrawnCards([]);
    setReadingStep('setup');
    setReadingError(null);
    navigate('/reading');
  };

  // Render current view based on currentPath
  const renderContent = () => {
    // 1. Result page: /reading/result/:id
    if (currentPath.startsWith('/reading/result/')) {
      if (!activeReadingRecord) {
        return (
          <div className="py-24 text-center">
            <LoadingState message={isMyanmar ? 'သင့်တားရော့ဟောကိန်း မှတ်တမ်းကို ရယူနေပါသည်...' : 'Retrieving your tarot reading record...'} />
          </div>
        );
      }
      return (
        <ReadingResult
          reading={activeReadingRecord}
          onNewReading={handleResetReading}
          onBackToHistory={() => navigate('/history')}
        />
      );
    }

    // 2. Reading flow: /reading
    if (currentPath === '/reading') {
      if (readingStep === 'interpreting') {
        return (
          <div className="py-12">
            <LoadingState message={isMyanmar ? 'Gemini က သင့်မေးခွန်းအတွက် ရှေးရိုးရာ တားရော့ပညာဖြင့် သုံးသပ်ပေးနေပါသည်...' : 'Gemini is synthesizing traditional tarot wisdom for your inquiry...'} />
          </div>
        );
      }

      if (readingStep === 'drawing') {
        return (
          <div className="space-y-6">
            {readingError && (
              <ErrorMessage
                title={isMyanmar ? 'အော်ရာကယ်လ် မေးမြန်းမှု သတိပေးချက်' : 'Oracle Consultation Note'}
                message={readingError}
                onRetry={handleAllCardsRevealed}
                onBack={() => setReadingStep('setup')}
              />
            )}
            <CardRevealAnimation
              question={question}
              category={category}
              spread={spread}
              cards={drawnCards}
              onAllRevealed={handleAllCardsRevealed}
              isGeneratingInterpretation={readingStep === 'interpreting'}
            />
          </div>
        );
      }

      return <ReadingSetup onStartDraw={handleStartDraw} />;
    }

    // 3. Card Codex: /cards
    if (currentPath === '/cards') {
      return (
        <CardCodex
          onStartReading={handleResetReading}
        />
      );
    }

    // 4. History page: /history
    if (currentPath === '/history') {
      return (
        <ReadingHistory
          onViewReading={(id) => {
            readingRepository.getReading(id).then((rec) => {
              if (rec) {
                setActiveReadingRecord(rec);
                navigate(`/reading/result/${id}`);
              }
            });
          }}
          onStartNewReading={handleResetReading}
        />
      );
    }

    // 5. Default: Landing page /
    return (
      <Hero
        onStartReading={() => {
          handleResetReading();
        }}
        onViewHistory={() => navigate('/history')}
      />
    );
  };

  const filteredDeck = ALL_TAROT_CARDS.filter((c) => {
    if (deckFilter === 'major') return c.arcana === 'major';
    if (deckFilter === 'minor') return c.arcana === 'minor';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#070714] text-slate-100 selection:bg-amber-400 selection:text-slate-950 relative">
      {/* Mystical Star Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px]" />
      </div>

      {/* Main Navbar */}
      <Navbar currentRoute={currentPath} onNavigate={navigate} />

      {/* Page Body */}
      <main className="flex-1 relative z-10">{renderContent()}</main>

      {/* Complete 78-Card Deck Modal Drawer */}
      {showDeckDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0B0920] border-l border-amber-500/20 h-full flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-200">
                  {isMyanmar ? 'တားရော့ ၇၈ ကတ် ဒီဇိုင်းစုံ' : 'The Complete 78 Arcana'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isMyanmar ? 'ကတ်တိုင်းတွင် ရှေးရိုးရာ အထိမ်းအမှတ် သင်္ကေတများနှင့် အနေအထားနှစ်မျိုး ပါဝင်ပါသည်' : 'Every card contains rich traditional symbolism and dual orientations'}
                </p>
              </div>
              <button
                onClick={() => setShowDeckDrawer(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 my-4">
              {(['all', 'major', 'minor'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setDeckFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider cursor-pointer ${
                    deckFilter === filter
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {filter === 'all' ? (isMyanmar ? 'အားလုံး' : 'All') : filter === 'major' ? (isMyanmar ? 'မေဂျာ' : 'Major') : (isMyanmar ? 'မိုင်နာ' : 'Minor')} ({filter === 'all' ? 78 : filter === 'major' ? 22 : 56})
                </button>
              ))}
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-12">
              {filteredDeck.map((card) => (
                <div key={card.id} className="space-y-1.5 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <TarotCardArt card={card} isReversed={false} />
                  <div className="text-[11px] text-center font-medium text-slate-200 truncate">
                    {getCardName(card.id, card.name)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Elegant Mystical Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050410] py-10 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-serif font-bold text-slate-100 tracking-wider">
                Mystic Tarot
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              {isMyanmar
                ? 'Gemini ဉာဏ်ရည်တု စွမ်းအားသုံး လေးနက်သော တားရော့ဟောကိန်းနှင့် စိတ်နှလုံးဆင်ခြင်ရာ ခိုလှုံရာနေရာ။'
                : 'A modern sanctuary for reflective mindfulness and thoughtful tarot interpretation powered by Gemini.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <button
              onClick={() => navigate('/cards')}
              className="hover:text-amber-300 transition-colors cursor-pointer flex items-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isMyanmar ? 'တားရော့ ၇၈ ကတ် လေ့လာရန်' : 'Browse 78 Cards'}</span>
            </button>
            <span>&bull;</span>
            <button
              onClick={() => navigate('/reading')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t('nav_reading')}
            </button>
            <span>&bull;</span>
            <button
              onClick={() => navigate('/history')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              {t('nav_history')}
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>&copy; {new Date().getFullYear()} Mystic Tarot. {isMyanmar ? 'ကိုယ်ပိုင်ဆင်ခြင်သုံးသပ်မှုနှင့် ဗဟုသုတအတွက် ရည်ရွယ်သည်။' : 'Designed for personal introspection and entertainment.'}</span>
          <span className="text-slate-500">
            {isMyanmar ? 'ငွေကြေး၊ ဥပဒေ သို့မဟုတ် ကျန်းမာရေးဆိုင်ရာ ဆေးဘက်ဆိုင်ရာ အကြံပြုချက်မဟုတ်ပါ။' : 'Not intended as financial, legal, or medical advice.'}
          </span>
        </div>
      </footer>
    </div>
  );
}

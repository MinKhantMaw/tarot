import React, { useState } from 'react';
import { ReadingCategory, SpreadId } from '../types/tarot';
import { CategorySelector } from './CategorySelector';
import { SpreadSelector } from './SpreadSelector';
import { READING_CATEGORIES, SPREAD_DEFINITIONS } from '../data/spreads';
import { Sparkles, HelpCircle, Lightbulb, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ReadingSetupProps {
  onStartDraw: (question: string, category: ReadingCategory, spread: SpreadId) => void;
}

const MYANMAR_PROMPT_HINTS: Record<ReadingCategory, string> = {
  'General Life': 'ကျွန်ုပ်၏ လက်ရှိဘဝခရီးလမ်းအတွက် တားရော့ကတ်များက မည်သည့်အကြံဉာဏ် ပေးသနည်း?',
  'Love & Relationships': 'ကျွန်ုပ်၏ အချစ်ရေးနှင့် သံယောဇဉ်ခရီးလမ်းအတွက် မည်သည့်သတင်းစကား ရှိသနည်း?',
  'Career': 'ကျွန်ုပ်၏ အလုပ်အကိုင်နှင့် ရည်မှန်းချက်များ အောင်မြင်စေရန် မည်သို့ ဆောင်ရွက်သင့်သနည်း?',
  'Money & Finance': 'စီးပွားရေးနှင့် ငွေကြေးတည်ငြိမ်တိုးတက်စေရန် မည်သည့်အခွင့်အလမ်းကို အာရုံစိုက်ရမည်နည်း?',
  'Future': 'ရှေ့လာမည့် ကာလများအတွင်း ကျွန်ုပ်ရင်ဆိုင်ကြုံတွေ့ရမည့် အခြေအနေများမှာ အဘယ်နည်း?',
  'Personal Growth': 'ကျွန်ုပ်၏ အတွင်းစိတ်ခွန်အားနှင့် ငြိမ်းချမ်းမှု ရရှိစေရန် မည်သည့်အရာကို ကုစားသင်ယူသင့်သနည်း?',
};

export const ReadingSetup: React.FC<ReadingSetupProps> = ({ onStartDraw }) => {
  const { t, isMyanmar } = useLanguage();
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState<ReadingCategory>('General Life');
  const [spread, setSpread] = useState<SpreadId>('past-present-future');
  const [error, setError] = useState<string | null>(null);

  const currentCategoryMeta = READING_CATEGORIES.find((c) => c.id === category);
  const spreadDef = SPREAD_DEFINITIONS[spread];
  const cardCount = spreadDef?.cardCount || 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError(isMyanmar ? 'ကျေးဇူးပြု၍ မေးလိုသော မေးခွန်း သို့မဟုတ် ခေါင်းစဉ်ကို ထည့်သွင်းပေးပါ။' : 'Please share a question or theme you would like the cards to address.');
      return;
    }
    setError(null);
    onStartDraw(question.trim(), category, spread);
  };

  const handleUsePromptHint = () => {
    if (isMyanmar) {
      setQuestion(MYANMAR_PROMPT_HINTS[category] || 'ကျွန်ုပ်၏ ဘဝအတွက် မည်သည့်လမ်းညွှန်ချက် ရှိသနည်း?');
      setError(null);
    } else if (currentCategoryMeta?.promptHint) {
      const hint = currentCategoryMeta.promptHint.replace(/^e\.g\.,\s*/i, '');
      setQuestion(hint);
      setError(null);
    }
  };

  const placeholderText = isMyanmar
    ? (MYANMAR_PROMPT_HINTS[category] || 'တားရော့ကတ်များထံမှ မည်သည့်အကြံဉာဏ် ရယူလိုပါသလဲ?')
    : (currentCategoryMeta?.promptHint || 'What guidance do the cards have for me today?');

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{t('setup_step_badge')}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          {t('setup_title')}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
          {t('setup_subtitle')}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-amber-500/20 shadow-[0_0_40px_rgba(10,8,25,0.8)] backdrop-blur-xl space-y-6"
      >
        {/* Question Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="tarot-question-input"
              className="block text-sm font-medium text-slate-200 tracking-wide"
            >
              {t('setup_question_label')}
            </label>
            <button
              type="button"
              id="hint-prompt-btn"
              onClick={handleUsePromptHint}
              className="text-xs text-amber-300/80 hover:text-amber-200 flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{t('setup_quick_prompts')}</span>
            </button>
          </div>

          <div className="relative">
            <textarea
              id="tarot-question-input"
              rows={3}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (error) setError(null);
              }}
              placeholder={placeholderText}
              className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 placeholder-slate-500 text-sm sm:text-base resize-none transition-all outline-none"
            />
          </div>
          {error && (
            <p className="text-xs text-rose-400 flex items-center space-x-1 pt-1 animate-in fade-in">
              <span>✦</span>
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Category Selector */}
        <CategorySelector
          selectedCategory={category}
          onSelectCategory={(cat) => setCategory(cat)}
        />

        {/* Spread Selector */}
        <SpreadSelector
          selectedSpread={spread}
          onSelectSpread={(s) => setSpread(s)}
        />

        {/* Submit CTA */}
        <div className="pt-4 border-t border-white/5 flex flex-col items-center space-y-3">
          <button
            type="submit"
            id="proceed-to-draw-cta"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-serif text-base sm:text-lg font-bold tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-5 h-5" />
            <span>
              {isMyanmar
                ? `တားရော့ကတ်များ မွှေပြီး ${cardCount} ကတ် ရွေးမည်`
                : `Shuffle Deck & Draw ${cardCount} ${cardCount === 1 ? 'Card' : 'Cards'}`}
            </span>
          </button>
          <p className="text-xs text-slate-400 text-center">
            {isMyanmar
              ? 'တားရော့ကတ် ၇၈ ကတ်လုံးမှ အမှန်အတိုင်း အတည့်နှင့် ပြောင်းပြန်အနေအထားများဖြင့် မွှေနှောက်ပေးမည်ဖြစ်ပါသည်။'
              : 'The deck will be thoroughly randomized with authentic upright & reversed cards.'}
          </p>
        </div>
      </form>
    </div>
  );
};

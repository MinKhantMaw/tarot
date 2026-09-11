import React, { useState, useEffect } from 'react';
import { Sparkles, Moon, Sun, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LoadingStateProps {
  message?: string;
}

const ORACLE_MESSAGES_EN = [
  'Consulting the Gemini Oracle...',
  'Aligning the symbols of the 78 Arcana...',
  'Weaving the drawn cards into a coherent narrative...',
  'Translating traditional symbols to your inquiry...',
  'Formulating practical, reflective guidance...',
];

const ORACLE_MESSAGES_MY = [
  'Gemini အော်ရာကယ်လ်ထံ မေးမြန်းနေပါသည်...',
  'တားရော့ ၇၈ ကတ်၏ သင်္ကေတများကို ချိန်ညှိနေပါသည်...',
  'ရွေးချယ်ထားသော ကတ်များမှ တားရော့ဇာတ်လမ်းကို ဖော်ဆောင်နေပါသည်...',
  'သင့်မေးခွန်းအတွက် ရှေးဟောင်းသင်္ကေတများကို ဘာသာပြန်ဆိုနေပါသည်...',
  'လက်တွေ့အသုံးချနိုင်သော လမ်းညွှန်ချက်များကို ပြုစုနေပါသည်...',
];

export const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  const { isMyanmar } = useLanguage();
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = isMyanmar ? ORACLE_MESSAGES_MY : ORACLE_MESSAGES_EN;

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto">
      {/* Mystical Animated Celestial Core */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
        {/* Outer glowing halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 via-amber-400/20 to-indigo-600/20 blur-xl animate-pulse" />

        {/* Outer rotating dashed zodiac ring */}
        <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-dashed border-amber-300/40 animate-[spin_12s_linear_infinite]" />

        {/* Middle counter-rotating ring */}
        <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-purple-400/40 animate-[spin_8s_linear_infinite_reverse]" />

        {/* Center glowing crystal orb */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#2D1B69] via-[#1A103C] to-[#0D0826] border border-amber-300/60 shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
        </div>

        {/* Orbiting celestial icons */}
        <div className="absolute -top-1 text-amber-300 text-xs">✦</div>
        <div className="absolute -bottom-1 text-amber-300 text-xs">✦</div>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 tracking-wide">
        {isMyanmar ? 'အော်ရာကယ်လ်က ဟောကြားနေပါသည်' : 'The Oracle is Speaking'}
      </h3>

      <p className="mt-2 text-sm sm:text-base text-amber-200/90 font-light italic transition-all duration-500 min-h-[1.5rem]">
        {message || messages[msgIndex]}
      </p>

      <p className="mt-4 text-xs text-slate-400 max-w-xs leading-relaxed">
        {isMyanmar
          ? 'ကတ်များ၏ တည်နေရာ၊ အနေအထားနှင့် မေးခွန်း၏ ပေါင်းစပ်မှုကို နက်နဲစွာ ခွဲခြမ်းစိတ်ဖြာနေပါသည်'
          : 'Taking a moment to deeply analyze the card positions, orientations, and question synergies.'}
      </p>
    </div>
  );
};

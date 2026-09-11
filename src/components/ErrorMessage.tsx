import React from 'react';
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  onRetry,
  onBack,
}) => {
  const { isMyanmar } = useLanguage();
  const displayTitle = title || (isMyanmar ? 'ဟောကြားမှု အဆင်မပြေပါ' : 'Consultation Disrupted');

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 backdrop-blur-xl text-center space-y-4 my-12 shadow-xl">
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-300 mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="font-serif text-xl font-bold text-slate-100">
        {displayTitle}
      </h3>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        {message}
      </p>

      <div className="pt-2 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isMyanmar ? 'ထပ်မံကြိုးစားမည်' : 'Try Again'}</span>
          </button>
        )}

        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isMyanmar ? 'နောက်သို့ပြန်သွားမည်' : 'Go Back'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

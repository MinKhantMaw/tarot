import React, { useState, useEffect } from 'react';
import { TarotCard } from '../types/tarot';
import { getTarotCardImageUrl, getTarotCardFallbackImageUrl } from '../utils/tarotCardImages';
import { 
  Sparkles, 
  Flame, 
  Droplets, 
  Sword, 
  CircleDot, 
  Moon, 
  Sun, 
  Star, 
  Compass, 
  Crown, 
  Eye, 
  Heart,
  Scale,
  Zap,
  Key,
  Shield,
  Hourglass,
  Wind
} from 'lucide-react';

interface TarotCardArtProps {
  card: TarotCard;
  isReversed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDetails?: boolean;
}

export const TarotCardArt: React.FC<TarotCardArtProps> = ({
  card,
  isReversed = false,
  size = 'md',
  className = '',
  showDetails = true,
}) => {
  const primaryUrl = card.imageUrl || getTarotCardImageUrl(card);
  const fallbackUrl = getTarotCardFallbackImageUrl(card);

  const [imgSrc, setImgSrc] = useState<string>(primaryUrl);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(card.imageUrl || getTarotCardImageUrl(card));
    setIsLoaded(false);
    setHasError(false);
  }, [card.id, card.imageUrl, card.number, card.suit, card.arcana]);

  const handleImageError = () => {
    if (imgSrc !== fallbackUrl) {
      setImgSrc(fallbackUrl);
    } else {
      setHasError(true);
    }
  };

  // Determine suit/arcana color gradient & symbol
  const getCardTheme = () => {
    if (card.arcana === 'major') {
      return {
        bg: 'from-[#1A1238] via-[#120D2C] to-[#0A071E]',
        border: 'border-amber-400/50',
        glow: 'shadow-[0_0_25px_rgba(212,175,55,0.22)]',
        accent: 'text-amber-300',
        iconBg: 'bg-amber-500/15 border-amber-400/40',
        badge: 'bg-amber-950/80 text-amber-200 border-amber-500/40',
      };
    }

    switch (card.suit) {
      case 'wands':
        return {
          bg: 'from-[#2A1208] via-[#1E0D06] to-[#0D0502]',
          border: 'border-orange-400/50',
          glow: 'shadow-[0_0_22px_rgba(251,146,60,0.18)]',
          accent: 'text-orange-300',
          iconBg: 'bg-orange-500/15 border-orange-400/40',
          badge: 'bg-orange-950/80 text-orange-200 border-orange-500/40',
        };
      case 'cups':
        return {
          bg: 'from-[#08182B] via-[#051120] to-[#020710]',
          border: 'border-cyan-400/50',
          glow: 'shadow-[0_0_22px_rgba(34,211,238,0.18)]',
          accent: 'text-cyan-300',
          iconBg: 'bg-cyan-500/15 border-cyan-400/40',
          badge: 'bg-cyan-950/80 text-cyan-200 border-cyan-500/40',
        };
      case 'swords':
        return {
          bg: 'from-[#14122B] via-[#0E0C22] to-[#070614]',
          border: 'border-indigo-400/50',
          glow: 'shadow-[0_0_22px_rgba(165,180,252,0.18)]',
          accent: 'text-indigo-300',
          iconBg: 'bg-indigo-500/15 border-indigo-400/40',
          badge: 'bg-indigo-950/80 text-indigo-200 border-indigo-500/40',
        };
      case 'pentacles':
        return {
          bg: 'from-[#142314] via-[#0C170C] to-[#050C05]',
          border: 'border-emerald-400/50',
          glow: 'shadow-[0_0_22px_rgba(52,211,153,0.18)]',
          accent: 'text-emerald-300',
          iconBg: 'bg-emerald-500/15 border-emerald-400/40',
          badge: 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40',
        };
      default:
        return {
          bg: 'from-[#181533] via-[#0F0D24] to-[#080718]',
          border: 'border-amber-400/50',
          glow: 'shadow-[0_0_22px_rgba(212,175,55,0.18)]',
          accent: 'text-amber-300',
          iconBg: 'bg-amber-500/15 border-amber-400/40',
          badge: 'bg-amber-950/80 text-amber-200 border-amber-500/40',
        };
    }
  };

  const theme = getCardTheme();

  // Pick emblematic icon based on card
  const renderSymbol = () => {
    if (card.arcana === 'major') {
      const num = card.number ?? 0;
      switch (num) {
        case 0: return <Compass className="w-10 h-10 text-amber-300" />;
        case 1: return <Sparkles className="w-10 h-10 text-amber-300" />;
        case 2: return <Moon className="w-10 h-10 text-amber-300" />;
        case 3: return <Crown className="w-10 h-10 text-amber-300" />;
        case 4: return <Shield className="w-10 h-10 text-amber-300" />;
        case 5: return <Key className="w-10 h-10 text-amber-300" />;
        case 6: return <Heart className="w-10 h-10 text-amber-300" />;
        case 7: return <Wind className="w-10 h-10 text-amber-300" />;
        case 8: return <Crown className="w-10 h-10 text-amber-300" />;
        case 9: return <Eye className="w-10 h-10 text-amber-300" />;
        case 10: return <Hourglass className="w-10 h-10 text-amber-300" />;
        case 11: return <Scale className="w-10 h-10 text-amber-300" />;
        case 12: return <Moon className="w-10 h-10 text-amber-300" />;
        case 13: return <Hourglass className="w-10 h-10 text-amber-300" />;
        case 14: return <Droplets className="w-10 h-10 text-amber-300" />;
        case 15: return <Flame className="w-10 h-10 text-amber-300" />;
        case 16: return <Zap className="w-10 h-10 text-amber-300" />;
        case 17: return <Star className="w-10 h-10 text-amber-300" />;
        case 18: return <Moon className="w-10 h-10 text-amber-300" />;
        case 19: return <Sun className="w-10 h-10 text-amber-300" />;
        case 20: return <Sparkles className="w-10 h-10 text-amber-300" />;
        case 21: return <CircleDot className="w-10 h-10 text-amber-300" />;
        default: return <Sparkles className="w-10 h-10 text-amber-300" />;
      }
    }

    switch (card.suit) {
      case 'wands':
        return <Flame className="w-10 h-10 text-orange-300" />;
      case 'cups':
        return <Droplets className="w-10 h-10 text-cyan-300" />;
      case 'swords':
        return <Sword className="w-10 h-10 text-indigo-300" />;
      case 'pentacles':
        return <CircleDot className="w-10 h-10 text-emerald-300" />;
      default:
        return <Sparkles className="w-10 h-10 text-amber-300" />;
    }
  };

  const getRomanNumeral = (num?: number) => {
    if (num === undefined) return '';
    const roman = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
    return roman[num] || String(num);
  };

  const getCardRankDisplay = () => {
    if (card.arcana === 'major') {
      return getRomanNumeral(card.number);
    }
    if (card.number === 1) return 'A';
    if (card.number === 11) return 'P';
    if (card.number === 12) return 'Kn';
    if (card.number === 13) return 'Q';
    if (card.number === 14) return 'K';
    return String(card.number);
  };

  return (
    <div
      className={`relative w-full aspect-[2/3.3] rounded-2xl overflow-hidden bg-gradient-to-b ${theme.bg} border ${theme.border} ${theme.glow} select-none transition-all duration-300 ${className}`}
    >
      {/* Decorative celestial background mandala (subtle underlying aura) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-amber-300/40 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-36 h-36 rounded-full border border-dashed border-amber-300/30" />
        <div className="absolute w-24 h-24 rotate-45 border border-amber-300/20" />
      </div>

      {/* Primary Card Artwork Image Aperture */}
      {!hasError ? (
        <div className="absolute inset-1 sm:inset-1.5 rounded-xl overflow-hidden bg-[#0a0714] border border-amber-400/30 shadow-inner flex items-center justify-center">
          {/* Subtle loading shimmer */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs z-10">
              <div className="w-7 h-7 rounded-full border-2 border-amber-400/30 border-t-amber-300 animate-spin" />
              <span className="text-[9px] font-mono tracking-widest text-amber-300/80 mt-2 uppercase">
                Arcana
              </span>
            </div>
          )}

          {/* Authentic Rider-Waite-Smith Illustration */}
          <img
            src={imgSrc}
            alt={card.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${isReversed ? 'rotate-180' : ''}`}
          />

          {/* Subtle parchment vignette shadow */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_16px_rgba(0,0,0,0.65)]" />
        </div>
      ) : (
        /* Fallback: Stylized Celestial Emblem when image cannot load */
        <div className="relative z-10 my-auto flex flex-col items-center justify-center p-4">
          <div className={`p-4 sm:p-5 rounded-2xl border ${theme.iconBg} backdrop-blur-sm shadow-inner relative group`}>
            {renderSymbol()}
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-300/60 animate-ping" />
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-amber-400/60" />
          </div>
          <h4 className="mt-3 font-serif text-sm sm:text-base font-bold text-center text-slate-100 tracking-wide px-1 line-clamp-2 leading-snug">
            {card.name}
          </h4>
        </div>
      )}

      {/* Card Header Overlay */}
      <div className="relative z-20 flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none">
        <span className="font-serif text-xs sm:text-sm tracking-widest text-amber-300 font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          {getCardRankDisplay()}
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full border border-amber-400/30 bg-black/70 text-amber-200 font-medium backdrop-blur-xs drop-shadow">
          {card.arcana === 'major' ? 'Major' : card.suit}
        </span>
      </div>

      {/* Card Footer Overlay */}
      {showDetails && (
        <div className="relative z-20 flex flex-col items-center justify-end p-2 sm:p-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none space-y-1">
          <div className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs border border-white/10 max-w-[95%] shadow-md">
            <h4 className="font-serif text-xs sm:text-sm font-bold text-center text-slate-100 tracking-wide truncate">
              {card.name}
            </h4>
          </div>
          {isReversed && (
            <span className="text-[9px] font-mono uppercase tracking-widest text-rose-300 font-semibold px-2 py-0.5 rounded-full bg-rose-950/85 border border-rose-500/40 shadow">
              Reversed
            </span>
          )}
        </div>
      )}

      {/* Elegant corner flourishes */}
      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-amber-400/70 pointer-events-none z-30" />
      <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-amber-400/70 pointer-events-none z-30" />
      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-amber-400/70 pointer-events-none z-30" />
      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-amber-400/70 pointer-events-none z-30" />
    </div>
  );
};

export const TarotCardBack: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[2/3.3] rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#100D28] via-[#09071A] to-[#04030D] border border-amber-400/30 shadow-[0_0_20px_rgba(212,175,55,0.12)] select-none ${className}`}
    >
      {/* Outer framing double border */}
      <div className="absolute inset-2 rounded-xl border border-amber-400/20 pointer-events-none" />
      <div className="absolute inset-3 rounded-lg border border-amber-400/10 pointer-events-none" />

      {/* Intricate Sacred Geometry Core */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer glowing ring */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-amber-400/30 flex items-center justify-center relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-dashed border-amber-300/40" />
          <div className="absolute w-16 h-16 rotate-45 border border-amber-400/30" />
          <div className="absolute w-16 h-16 -rotate-45 border border-amber-400/30" />

          {/* Central sunburst and moon icon */}
          <div className="absolute p-3 rounded-full bg-amber-500/15 border border-amber-300/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
          </div>
        </div>

        {/* Orbiting Moon Phases */}
        <div className="mt-3 flex items-center space-x-2 text-amber-300/60 text-xs">
          <span>☾</span>
          <span>●</span>
          <span>☽</span>
        </div>
      </div>

      {/* Mystical typography at top and bottom */}
      <div className="absolute top-4 font-serif text-[10px] tracking-[0.25em] text-amber-300/60 uppercase">
        Arcana
      </div>
      <div className="absolute bottom-4 font-serif text-[10px] tracking-[0.25em] text-amber-300/60 uppercase">
        Divina
      </div>

      {/* Corner stars */}
      <div className="absolute top-2 left-2 text-amber-400/60 text-xs">✦</div>
      <div className="absolute top-2 right-2 text-amber-400/60 text-xs">✦</div>
      <div className="absolute bottom-2 left-2 text-amber-400/60 text-xs">✦</div>
      <div className="absolute bottom-2 right-2 text-amber-400/60 text-xs">✦</div>
    </div>
  );
};

import { TarotCard } from '../types/tarot';

/**
 * Returns the CDN image URL for the official Rider-Waite-Smith tarot deck.
 * Hosted via jsDelivr from the public-domain repository with global CDN caching.
 */
export function getTarotCardImageUrl(card: {
  arcana: 'major' | 'minor';
  suit?: string | null;
  number?: number;
}): string {
  if (card.arcana === 'major') {
    const num = card.number ?? 0;
    const numStr = String(num).padStart(2, '0');
    return `https://cdn.jsdelivr.net/gh/searge/tarot@master/assets/img/big/maj${numStr}.jpg`;
  }

  // Minor Arcana mapping:
  // wands: wands01.jpg .. wands14.jpg
  // cups: cups01.jpg .. cups14.jpg
  // swords: swords01.jpg .. swords14.jpg
  // pentacles: pents01.jpg .. pents14.jpg
  let suitPrefix = 'wands';
  switch (card.suit) {
    case 'cups':
      suitPrefix = 'cups';
      break;
    case 'swords':
      suitPrefix = 'swords';
      break;
    case 'pentacles':
      suitPrefix = 'pents';
      break;
    case 'wands':
    default:
      suitPrefix = 'wands';
      break;
  }

  const num = card.number ?? 1;
  const numStr = String(num).padStart(2, '0');
  return `https://cdn.jsdelivr.net/gh/searge/tarot@master/assets/img/big/${suitPrefix}${numStr}.jpg`;
}

/**
 * Secondary fallback URL in case of CDN caching issues
 */
export function getTarotCardFallbackImageUrl(card: {
  arcana: 'major' | 'minor';
  suit?: string | null;
  number?: number;
}): string {
  if (card.arcana === 'major') {
    const num = card.number ?? 0;
    const numStr = String(num).padStart(2, '0');
    return `https://raw.githubusercontent.com/searge/tarot/master/assets/img/big/maj${numStr}.jpg`;
  }

  let suitPrefix = 'wands';
  switch (card.suit) {
    case 'cups':
      suitPrefix = 'cups';
      break;
    case 'swords':
      suitPrefix = 'swords';
      break;
    case 'pentacles':
      suitPrefix = 'pents';
      break;
    case 'wands':
    default:
      suitPrefix = 'wands';
      break;
  }

  const num = card.number ?? 1;
  const numStr = String(num).padStart(2, '0');
  return `https://raw.githubusercontent.com/searge/tarot/master/assets/img/big/${suitPrefix}${numStr}.jpg`;
}

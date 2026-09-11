import { ALL_TAROT_CARDS } from '../data/tarotCards';
import { SPREAD_DEFINITIONS } from '../data/spreads';
import { DrawnCard, SpreadId, TarotCard } from '../types/tarot';

/**
 * Modern Fisher-Yates shuffle implementation
 */
export function shuffleDeck<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Draws unique cards from the 78-card deck matching the spread count with randomized orientations
 */
export function drawUniqueCards(
  spreadId: SpreadId,
  count?: number
): DrawnCard[] {
  const spreadDef = SPREAD_DEFINITIONS[spreadId] || SPREAD_DEFINITIONS['past-present-future'];
  const targetCount = count || spreadDef.cardCount || 3;
  const shuffled = shuffleDeck(ALL_TAROT_CARDS);
  const selectedCards: TarotCard[] = shuffled.slice(0, targetCount);

  return selectedCards.map((card, index) => {
    // 70% chance upright, 30% chance reversed (authentic reading balance)
    const orientation: 'upright' | 'reversed' = Math.random() < 0.3 ? 'reversed' : 'upright';
    const positionName = spreadDef.positions[index] || `Card ${index + 1}`;
    const positionLabel = `${positionName} (${orientation === 'reversed' ? 'Reversed' : 'Upright'})`;

    return {
      card,
      orientation,
      position: positionName,
      positionIndex: index,
      positionLabel,
    };
  });
}

/**
 * Draws a single unique clarifier card that is not already in the current spread
 */
export function drawSingleClarifierCard(
  existingCardIds: string[],
  clarifierIndex: number = 0
): DrawnCard {
  const remaining = ALL_TAROT_CARDS.filter((c) => !existingCardIds.includes(c.id));
  const pool = remaining.length > 0 ? remaining : ALL_TAROT_CARDS;
  const shuffled = shuffleDeck(pool);
  const card = shuffled[0];
  const orientation: 'upright' | 'reversed' = Math.random() < 0.3 ? 'reversed' : 'upright';
  const position = clarifierIndex === 0 ? 'Clarifier Card' : `Clarifier Card #${clarifierIndex + 1}`;

  return {
    card,
    orientation,
    position,
    positionIndex: existingCardIds.length + clarifierIndex,
    positionLabel: `${position} (${orientation === 'reversed' ? 'Reversed' : 'Upright'})`,
  };
}

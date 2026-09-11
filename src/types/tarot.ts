export type ArcanaType = 'major' | 'minor';

export type CardSuit = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: string;
  name: string;
  arcana: ArcanaType;
  suit: CardSuit | null;
  number?: number;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  description: string;
  imageUrl?: string;
}

export type SpreadId =
  | 'single-card'
  | 'past-present-future'
  | 'situation-action-outcome'
  | 'problem-cause-solution'
  | 'three-card-reading'
  | 'five-card-cross'
  | 'decision-crossroads'
  | 'seven-card-horseshoe';

export interface SpreadDefinition {
  id: SpreadId;
  name: string;
  shortName: string;
  cardCount: number;
  description: string;
  positions: string[];
  positionDescriptions: string[];
}

export type ReadingCategory =
  | 'General Life'
  | 'Love & Relationships'
  | 'Career'
  | 'Money & Finance'
  | 'Future'
  | 'Personal Growth';

export interface DrawnCard {
  card: TarotCard;
  orientation: 'upright' | 'reversed';
  position: string;
  positionIndex: number;
  positionLabel: string;
}

export interface CardInterpretationItem {
  position: string;
  cardName: string;
  orientation: 'upright' | 'reversed';
  text: string;
}

export interface TarotInterpretation {
  openingInterpretation: string;
  cardInterpretations: CardInterpretationItem[];
  card1Interpretation?: string;
  card2Interpretation?: string;
  card3Interpretation?: string;
  card4Interpretation?: string;
  card5Interpretation?: string;
  card6Interpretation?: string;
  card7Interpretation?: string;
  overallReading: string;
  practicalGuidance: string;
  reflectionPoints: string[];
}

export interface ClarifierCardRecord {
  drawnCard: DrawnCard;
  interpretation: string;
  drawnAt: string;
}

export interface TarotReadingRecord {
  id: string;
  question: string;
  category: ReadingCategory;
  spread: SpreadId;
  spreadName: string;
  cards: DrawnCard[];
  clarifierCards?: ClarifierCardRecord[];
  interpretation: TarotInterpretation;
  createdAt: string;
  language?: 'en' | 'my';
}

export interface ReadingRequestPayload {
  question: string;
  category: ReadingCategory;
  spreadType: string;
  language?: 'en' | 'my';
  cards: {
    position: string;
    cardName: string;
    orientation: 'upright' | 'reversed';
    keywords: string[];
    meaning: string;
  }[];
}

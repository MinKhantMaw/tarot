import { DrawnCard, ReadingCategory, TarotInterpretation } from '../types/tarot';

export interface GenerateReadingOptions {
  question: string;
  category: ReadingCategory;
  spreadType: string;
  cards: DrawnCard[];
  language?: string;
}

export async function requestGeminiInterpretation(
  options: GenerateReadingOptions
): Promise<TarotInterpretation> {
  const payload = {
    question: options.question.trim(),
    category: options.category,
    spreadType: options.spreadType,
    language: options.language,
    cards: options.cards.map((c) => ({
      position: c.position,
      cardName: c.card.name,
      orientation: c.orientation,
      keywords: c.card.keywords,
      meaning: c.orientation === 'upright' ? c.card.uprightMeaning : c.card.reversedMeaning,
    })),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 second timeout

  try {
    const response = await fetch('/api/tarot/reading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Reading request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.overallReading) {
      throw new Error('Received incomplete interpretation structure');
    }

    // Ensure cardInterpretations array exists even if fallback format returned
    if (!data.cardInterpretations || !Array.isArray(data.cardInterpretations)) {
      data.cardInterpretations = options.cards.map((c, idx) => ({
        position: c.position,
        cardName: c.card.name,
        orientation: c.orientation,
        text:
          (data as any)[`card${idx + 1}Interpretation`] ||
          `Card ${idx + 1}: ${c.card.name} (${c.orientation}) brings foundational clarity to ${c.position}.`,
      }));
    }

    return data as TarotInterpretation;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('The oracle session timed out. Please try consulting the cards again.');
    }
    throw new Error(err.message || 'Unable to connect with the oracle right now.');
  }
}

export interface ClarifierRequestOptions {
  question: string;
  category: ReadingCategory;
  existingCards: DrawnCard[];
  clarifierCard: DrawnCard;
  language?: string;
}

export async function requestClarifierInterpretation(
  options: ClarifierRequestOptions
): Promise<string> {
  const payload = {
    question: options.question.trim(),
    category: options.category,
    language: options.language,
    existingCards: options.existingCards.map((c) => ({
      position: c.position,
      cardName: c.card.name,
      orientation: c.orientation,
    })),
    clarifierCard: {
      position: options.clarifierCard.position,
      cardName: options.clarifierCard.card.name,
      orientation: options.clarifierCard.orientation,
      keywords: options.clarifierCard.card.keywords,
      meaning:
        options.clarifierCard.orientation === 'upright'
          ? options.clarifierCard.card.uprightMeaning
          : options.clarifierCard.card.reversedMeaning,
    },
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch('/api/tarot/clarifier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Clarifier request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.interpretation;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('The clarifier request timed out. Please try again.');
    }
    throw new Error(err.message || 'Unable to connect with the oracle.');
  }
}

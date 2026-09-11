import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

const SYSTEM_INSTRUCTION = `You are an experienced, wise tarot reader who interprets tarot cards using traditional tarot symbolism.
Tarot readings should be presented as reflective and entertainment-oriented guidance, not as guaranteed predictions.

Interpret the cards according to:
* Traditional symbolism
* Card orientation (upright vs. reversed)
* Spread position
* User's specific question
* The energetic relationship between all three cards

Rules & Ethics:
1. Do not claim certainty about the future.
2. Use a warm, insightful, poetic yet grounded and empowering tone.
3. Focus on possibilities, patterns, self-reflection, and actionable practical guidance.
4. Do not make medical, legal, or financial guarantees.
5. When interpreting reversed cards, explain how the reversed energy shifts, delays, internalizes, or challenges the traditional upright meaning.
6. Always weave a coherent narrative across the three cards rather than treating each card as isolated.`;

interface CardPayload {
  position: string;
  cardName: string;
  orientation: 'upright' | 'reversed';
  keywords?: string[];
  meaning?: string;
}

// Fallback generator when API key is unconfigured or rate limited
function generateSynthesizedTarotReading(
  question: string,
  category: string,
  spreadType: string,
  cards: CardPayload[],
  language?: string
) {
  const isMyanmar = language === 'my';

  if (isMyanmar) {
    const cardSummary = cards
      .map((c) => `${c.cardName} (${c.position} - ${c.orientation === 'upright' ? 'အတည့်' : 'ပြောင်းပြန်'})`)
      .join('၊ ');

    const opening = `မေးခွန်းရှင်၏ "${question || 'လက်ရှိ ဘဝခရီးလမ်း'}" အတွက် တားရော့ကတ် ${cards.length} ချပ်ကို ဆွဲယူဆန်းစစ်ရာတွင် ${category} ကဏ္ဍနှင့်ဆိုင်သော အောက်ပါနိမိတ်များ ကျရောက်လာပါသည်: ${cardSummary}။`;

    const cardInterpretations = cards.map((c) => {
      const isRev = c.orientation === 'reversed';
      const text = `"${c.position}" နေရာတွင် ${c.cardName} ကတ်သည် ${isRev ? 'ပြောင်းပြန် (Reversed)' : 'အတည့် (Upright)'} ကျရောက်နေပါသည်။ ${
        isRev
          ? `ဤကတ် ပြောင်းပြန်ကျရောက်ခြင်းသည် အတွင်းစိတ်ထဲမှ မသေချာမှု၊ အတိတ်အစွဲ သို့မဟုတ် ပြင်ပထက် အတွင်းစိတ်ပိုင်းဆိုင်ရာ သင်ခန်းစာကို မီးမောင်းထိုးပြနေပါသည်။ စိုးရိမ်ပူပန်မှုများကို လျှော့ချပြီး မိမိကိုယ်ကို ပြန်လည်သုံးသပ်ကာ မလိုအပ်သော အရာများကို လက်လွှတ်စွန့်လွှတ်သင့်ကြောင်း တိုက်တွန်းနေပါသည်။`
          : `ဤကတ် အတည့်ကျရောက်ခြင်းသည် ကောင်းမွန်သော စွမ်းအင်စီးဆင်းမှု၊ ရှင်းလင်းပြတ်သားသော ဦးတည်ချက်နှင့် ရည်မှန်းချက်ဆီသို့ ယုံကြည်မှုအပြည့်ဖြင့် လျှောက်လှမ်းနိုင်သည့် အခွင့်အလမ်းကို ဖော်ညွှန်းနေပါသည်။ မိမိ၏ စွမ်းရည်နှင့် ပင်ကိုယ်ဉာဏ်ကို အပြည့်အဝ ယုံကြည်ဆောင်ရွက်နိုင်ပါသည်။`
      }`;

      return {
        position: c.position,
        cardName: c.cardName,
        orientation: c.orientation,
        text,
      };
    });

    const overall = `ဤ ${cards.length} ချပ်သော တားရော့ကတ်များ၏ ပေါင်းစပ်နိမိတ်အရ မေးခွန်းရှင်သည် လက်ရှိတွင် အရေးပါသော အကူးအပြောင်းကာလတစ်ခုကို ဖြတ်သန်းနေရပါသည်။ အတိတ်၏ အတွေ့အကြုံများနှင့် သင်ခန်းစာများကို အခြေခံ၍ ပစ္စုပ္ပန်တွင် အသိတရားလက်ကိုင်ထားပါက အနာဂတ်တွင် အောင်မြင်ငြိမ်းချမ်းမှုများ ရရှိနိုင်မည်ဖြစ်ပါသည်။ အရာရာကို အတင်းအကျပ် တွန်းအားပေးခြင်းထက် သဘာဝအတိုင်း အချိန်ယူ၍ မှန်ကန်သော ဆုံးဖြတ်ချက်များ ချမှတ်ရန် အရေးကြီးပါသည်။`;

    const guidance = `လက်ရှိတွင် ရှင်းလင်းပြတ်သားစွာ တွေးခေါ်ဆင်ခြင်ပြီး မိမိ၏ ဦးစားပေးရမည့် အလုပ်များကို အာရုံစိုက်ပါ။ စိတ်ခံစားမှုနောက် အလောတကြီး မလိုက်ဘဲ အတွင်းစိတ်၏ ငြိမ်သက်မှုကို ရှာဖွေကာ အကောင်းမြင်စိတ်ဖြင့် ရှေ့ဆက်လျှောက်လှမ်းပါ။`;

    const reflections = [
      `ကျရောက်သော ကတ်များအနက် မည်သည့်ကတ်၏ သတင်းစကားက သင့်လက်ရှိအခြေအနေနှင့် အကိုက်ညီဆုံးဟု ခံစားရပါသနည်း?`,
      `သင့်ဘဝတွင် လက်လွှတ်သင့်သောအရာ သို့မဟုတ် ပိုမိုအာရုံစိုက်သင့်သောအရာသည် မည်သည့်အရာ ဖြစ်သနည်း?`,
      `ယနေ့ သင့်စိတ်ငြိမ်းချမ်းမှုနှင့် တိုးတက်မှုအတွက် မည်သည့် လက်တွေ့ကျသော ခြေလှမ်းကို စတင်နိုင်မည်နည်း?`,
    ];

    return {
      openingInterpretation: opening,
      cardInterpretations,
      card1Interpretation: cardInterpretations[0]?.text || '',
      card2Interpretation: cardInterpretations[1]?.text || '',
      card3Interpretation: cardInterpretations[2]?.text || '',
      overallReading: overall,
      practicalGuidance: guidance,
      reflectionPoints: reflections,
    };
  }

  const cardSummary = cards
    .map((c) => `${c.cardName} in ${c.position} (${c.orientation})`)
    .join(', ');

  const opening = `As we lay down the ${cards.length} cards for your inquiry into "${question || 'the path ahead'}", the currents of the ${category} realm reveal an intricate tapestry. Across this ${spreadType} spread, the cards assemble: ${cardSummary}.`;

  const cardInterpretations = cards.map((c) => {
    const isRev = c.orientation === 'reversed';
    const text = `In the position of ${c.position}, ${c.cardName} emerges ${c.orientation}. ${
      isRev
        ? `Its reversed orientation highlights an internalized dynamic, hidden lesson, or gentle friction. Rather than external resistance, ${c.cardName} encourages you to soften expectations, process subconscious reservations, and release obsolete habits.`
        : `Its upright resonance offers clear guidance and active alignment. The archetype of ${c.cardName} affirms your capacity to move forward with intentionality, honoring traditional wisdom and personal agency.`
    }`;

    return {
      position: c.position,
      cardName: c.cardName,
      orientation: c.orientation,
      text,
    };
  });

  const overall = `Synthesizing this ${cards.length}-card arrangement, each card acts as a stepping stone within your current transition. Notice how the initial energies inform your current choices and point toward constructive evolution. The collective wisdom affirms that balance is achieved not by forcing outcomes, but through mindful discernment and steadfast trust in your inner compass.`;

  const guidance = `Focus your energy on immediate, grounded actions. Honor the counsel of your cards by maintaining honest communication, respecting personal boundaries, and dedicating daily attention to your authentic priorities.`;

  const reflections = [
    `What message from ${cards[0]?.cardName || 'this reading'} feels most resonant with your present circumstances?`,
    `Where in your life are you invited to shift from resistance into acceptance?`,
    `What tangible step can you take today to align with the highest potential revealed here?`,
  ];

  return {
    openingInterpretation: opening,
    cardInterpretations,
    card1Interpretation: cardInterpretations[0]?.text || '',
    card2Interpretation: cardInterpretations[1]?.text || '',
    card3Interpretation: cardInterpretations[2]?.text || '',
    overallReading: overall,
    practicalGuidance: guidance,
    reflectionPoints: reflections,
  };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Tarot AI Interpretation endpoint (supports 1, 3, 5, 7 or any number of cards)
app.post('/api/tarot/reading', async (req, res) => {
  try {
    const { question, category, spreadType, cards, language } = req.body as {
      question: string;
      category: string;
      spreadType: string;
      cards: CardPayload[];
      language?: string;
    };

    if (!cards || !Array.isArray(cards) || cards.length < 1) {
      return res.status(400).json({ error: 'At least one card must be provided for the reading.' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      console.log('Gemini API key not found in server environment, using synthesized tarot wisdom fallback');
      const fallbackReading = generateSynthesizedTarotReading(
        question,
        category,
        spreadType,
        cards,
        language
      );
      return res.json(fallbackReading);
    }

    const cardsDetails = cards
      .map(
        (c, idx) =>
          `Card ${idx + 1} - Position: "${c.position}"
Name: ${c.cardName} (${c.orientation.toUpperCase()})
Keywords: ${c.keywords?.join(', ') || 'N/A'}
Traditional Meaning: ${c.meaning || 'N/A'}`
      )
      .join('\n\n');

    const languageInstruction =
      language === 'my'
        ? `\n\nCRITICAL LANGUAGE REQUIREMENT:
The user has requested the reading in Myanmar language (မြန်မာဘာသာ).
You MUST deliver the ENTIRE tarot reading in fluent, natural, poetic, respectful, and compassionate Myanmar language (မြန်မာဘာသာ).
- Provide openingInterpretation, every card's text, overallReading, practicalGuidance, and all reflectionPoints in pure, elegant Burmese.
- Translate concepts appropriately (e.g. Upright = အတည့်, Reversed = ပြောင်းပြန်, Core Guidance = အဓိက လမ်းညွှန်ချက်, Past/Present/Future = အတိတ်/ပစ္စုပ္ပန်/အနာဂတ်).
- Do not mix raw English paragraphs; write in heartwarming, authentic Burmese prose.`
        : '';

    const promptText = `Please provide an in-depth, compassionate, and coherent tarot reading for the following query:
User Question: "${question || 'General guidance and perspective'}"
Reading Category: ${category}
Spread Type: ${spreadType} (Total Cards: ${cards.length})

Cards Drawn:
${cardsDetails}${languageInstruction}

Deliver your reading in JSON adhering exactly to the specified schema. Weave every card into one unified narrative arc that directly illuminates the user's question.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            openingInterpretation: {
              type: Type.STRING,
              description: 'A poetic and welcoming opening introducing the thematic arc of the reading.',
            },
            cardInterpretations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  position: { type: Type.STRING },
                  cardName: { type: Type.STRING },
                  orientation: { type: Type.STRING },
                  text: { type: Type.STRING, description: 'In-depth interpretation of this card in its position' },
                },
                required: ['position', 'cardName', 'orientation', 'text'],
              },
              description: 'An array with one interpretation object for each card in the spread.',
            },
            overallReading: {
              type: Type.STRING,
              description: 'A cohesive synthesis connecting all cards into a unified story and pattern.',
            },
            practicalGuidance: {
              type: Type.STRING,
              description: 'Empowering, actionable, and grounded steps the seeker can take.',
            },
            reflectionPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: '3 thoughtful questions or contemplation prompts for journaling and meditation.',
            },
          },
          required: [
            'openingInterpretation',
            'cardInterpretations',
            'overallReading',
            'practicalGuidance',
            'reflectionPoints',
          ],
        },
      },
    });

    const responseText = response.text?.trim();
    if (!responseText) {
      throw new Error('Empty response received from Gemini');
    }

    const parsed = JSON.parse(responseText);

    // Populate backward-compatible keys
    if (Array.isArray(parsed.cardInterpretations)) {
      parsed.card1Interpretation = parsed.cardInterpretations[0]?.text || '';
      parsed.card2Interpretation = parsed.cardInterpretations[1]?.text || '';
      parsed.card3Interpretation = parsed.cardInterpretations[2]?.text || '';
    }

    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/tarot/reading:', error);
    // Provide graceful fallback so seeker is never left with broken UI
    const { question, category, spreadType, cards, language } = req.body;
    if (cards && Array.isArray(cards) && cards.length >= 1) {
      const fallback = generateSynthesizedTarotReading(
        question,
        category,
        spreadType,
        cards,
        language
      );
      return res.json(fallback);
    }
    return res.status(500).json({ error: 'Failed to generate tarot interpretation' });
  }
});

// Clarifier Card endpoint: draws an additional card to clarify the reading
app.post('/api/tarot/clarifier', async (req, res) => {
  try {
    const { question, category, existingCards, clarifierCard, language } = req.body as {
      question: string;
      category: string;
      existingCards: CardPayload[];
      clarifierCard: CardPayload;
      language?: string;
    };

    if (!clarifierCard) {
      return res.status(400).json({ error: 'Clarifier card must be provided' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      const fallbackText =
        language === 'my'
          ? `ဤ ${clarifierCard.cardName} (${clarifierCard.orientation === 'upright' ? 'အတည့်' : 'ပြောင်းပြန်'}) ကတ်ပြားသည် မေးခွန်းရှင်အတွက် လိုအပ်နေသော နိမိတ်အလင်းရောင်ကို ဖြည့်ဆည်းပေးပါသည်။ မသေချာမရေရာမှုများကို ကျော်လွှားနိုင်ရန် အတွင်းစိတ်၏ ပင်ကိုယ်အသိဉာဏ်ကို ယုံကြည်ပြီး ယုံကြည်ချက် ခိုင်မာစွာဖြင့် ရှေ့ဆက်လျှောက်လှမ်းသင့်ကြောင်း ဖော်ပြနေပါသည်။`
          : `Drawing ${clarifierCard.cardName} (${clarifierCard.orientation}) brings timely illumination to your reading. In its ${clarifierCard.orientation} position, it advises you to synthesize previous insights with fresh awareness. Rather than doubting the spread, ${clarifierCard.cardName} provides the bridge to move forward with steady resolve and trust.`;
      return res.json({ interpretation: fallbackText });
    }

    const existingSummary = existingCards
      ? existingCards.map((c) => `${c.position}: ${c.cardName} (${c.orientation})`).join(', ')
      : 'Previous spread';

    const languageClarifier =
      language === 'my'
        ? `\n\nCRITICAL REQUIREMENT: Deliver the interpretation in natural, compassionate, and fluent Myanmar language (မြန်မာဘာသာ). Explain how this clarifier card (${clarifierCard.cardName}) sheds light on the seeker's question in Burmese.`
        : '';

    const promptText = `A seeker is looking for additional clarity on their tarot reading.
Question: "${question || 'Personal guidance'}"
Category: ${category}
Existing Cards: ${existingSummary}

Clarifier Card Drawn:
${clarifierCard.cardName} (${clarifierCard.orientation.toUpperCase()})
Keywords: ${clarifierCard.keywords?.join(', ') || 'N/A'}
Traditional Meaning: ${clarifierCard.meaning || 'N/A'}${languageClarifier}

Explain how this clarifier card specifically unlocks deeper understanding of the reading, clears doubts, and provides practical closure. Keep the tone compassionate, grounded, and insightful (2-3 paragraphs). Return JSON with a single "interpretation" string.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interpretation: {
              type: Type.STRING,
              description: 'Insightful explanation of how the clarifier card resolves the reading.',
            },
          },
          required: ['interpretation'],
        },
      },
    });

    const responseText = response.text?.trim();
    if (!responseText) {
      throw new Error('Empty response for clarifier card');
    }

    const parsed = JSON.parse(responseText);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/tarot/clarifier:', error);
    const { clarifierCard, language } = req.body;
    const fallbackText =
      language === 'my'
        ? `ဤ ${clarifierCard?.cardName || 'ရှင်းလင်းချက်ကတ်'} (${clarifierCard?.orientation === 'reversed' ? 'ပြောင်းပြန်' : 'အတည့်'}) သည် သင့်စိတ်ထဲမှ သံသယများကို ပယ်ဖျောက်ပေးပြီး မိမိကိုယ်ကို ယုံကြည်မှုအပြည့်ဖြင့် လျှောက်လှမ်းရန် အားပေးတိုက်တွန်းလျက်ရှိပါသည်။`
        : `Drawing ${clarifierCard?.cardName || 'a clarifier card'} (${clarifierCard?.orientation || 'upright'}) serves as an anchor of wisdom. It clarifies hidden reservations, offering peace of mind and urging you to follow your authentic intuition with confidence.`;
    return res.json({ interpretation: fallbackText });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mystic Tarot server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

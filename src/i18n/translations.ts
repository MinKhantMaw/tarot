export type AppLanguage = 'en' | 'my';

export interface TranslationDictionary {
  // Navigation
  nav_brand: string;
  nav_brand_subtitle: string;
  nav_home: string;
  nav_start_reading: string;
  nav_card_codex: string;
  nav_reading_history: string;
  nav_sound_on: string;
  nav_sound_off: string;
  nav_lang_toggle: string;

  // Hero
  hero_badge: string;
  hero_title_lead: string;
  hero_title_accent: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_codex: string;
  hero_feature1_title: string;
  hero_feature1_desc: string;
  hero_feature2_title: string;
  hero_feature2_desc: string;
  hero_feature3_title: string;
  hero_feature3_desc: string;
  hero_feature4_title: string;
  hero_feature4_desc: string;

  // Setup Step 1
  setup_step_badge: string;
  setup_title: string;
  setup_subtitle: string;
  setup_category_label: string;
  setup_category_subtitle: string;
  setup_spread_label: string;
  setup_question_label: string;
  setup_question_placeholder: string;
  setup_question_hint: string;
  setup_quick_prompts: string;
  setup_shuffle_btn: string;
  setup_card_count_filter_all: string;

  // Categories
  cat_general: string;
  cat_general_desc: string;
  cat_love: string;
  cat_love_desc: string;
  cat_career: string;
  cat_career_desc: string;
  cat_money: string;
  cat_money_desc: string;
  cat_future: string;
  cat_future_desc: string;
  cat_growth: string;
  cat_growth_desc: string;

  // Spreads
  spread_single_card_name: string;
  spread_single_card_desc: string;
  spread_past_present_future_name: string;
  spread_past_present_future_desc: string;
  spread_situation_action_outcome_name: string;
  spread_situation_action_outcome_desc: string;
  spread_problem_cause_solution_name: string;
  spread_problem_cause_solution_desc: string;
  spread_three_card_reading_name: string;
  spread_three_card_reading_desc: string;
  spread_five_card_cross_name: string;
  spread_five_card_cross_desc: string;
  spread_decision_crossroads_name: string;
  spread_decision_crossroads_desc: string;
  spread_seven_card_horseshoe_name: string;
  spread_seven_card_horseshoe_desc: string;

  // Card Positions
  pos_core_guidance: string;
  pos_past: string;
  pos_present: string;
  pos_future: string;
  pos_situation: string;
  pos_action: string;
  pos_outcome: string;
  pos_problem: string;
  pos_cause: string;
  pos_solution: string;
  pos_mind: string;
  pos_body: string;
  pos_spirit: string;
  pos_past_roots: string;
  pos_present_focus: string;
  pos_hidden_influences: string;
  pos_action_advice: string;
  pos_projected_outcome: string;
  pos_the_crossroads: string;
  pos_path_a_opportunity: string;
  pos_path_a_challenge: string;
  pos_path_b_opportunity: string;
  pos_path_b_challenge: string;
  pos_past_influences: string;
  pos_present_circumstance: string;
  pos_hidden_factors: string;
  pos_the_obstacle: string;
  pos_external_environment: string;
  pos_recommended_action: string;
  pos_final_resolution: string;

  // Reveal Animation Step 2
  reveal_step_badge: string;
  reveal_title: string;
  reveal_subtitle: string;
  reveal_hint: string;
  reveal_counter: string;
  reveal_all_btn: string;
  reveal_complete_title: string;
  reveal_complete_desc: string;
  reveal_consulting_btn: string;

  // Shuffle Animation
  shuffle_ritual_badge: string;
  shuffle_title: string;
  shuffle_step_gather: string;
  shuffle_step_split: string;
  shuffle_step_riffle: string;
  shuffle_step_square: string;
  shuffle_step_deal: string;
  shuffle_skip_btn: string;
  shuffle_reshuffle_btn: string;

  // Orientations
  orientation_upright: string;
  orientation_reversed: string;

  // Reading Result Step 3
  result_badge: string;
  result_title: string;
  result_category: string;
  result_spread: string;
  result_share_btn: string;
  result_copied: string;
  result_new_reading_btn: string;
  result_back_history_btn: string;
  result_cards_assembly_title: string;
  result_cards_assembly_desc: string;
  result_deep_analysis_title: string;
  result_overall_synthesis_title: string;
  result_guidance_title: string;
  result_reflections_title: string;
  result_wisdom_footer_title: string;
  result_wisdom_footer_desc: string;

  // Clarifier Card
  clarifier_badge: string;
  clarifier_title: string;
  clarifier_desc: string;
  clarifier_draw_btn: string;
  clarifier_drawing: string;
  clarifier_section_title: string;

  // Codex (78 Cards)
  codex_badge: string;
  codex_title: string;
  codex_subtitle: string;
  codex_cta: string;
  codex_search_placeholder: string;
  codex_tab_all: string;
  codex_tab_major: string;
  codex_tab_wands: string;
  codex_tab_cups: string;
  codex_tab_swords: string;
  codex_tab_pentacles: string;
  codex_showing: string;
  codex_clear_search: string;
  codex_no_results: string;
  codex_reset_filters: string;
  codex_modal_upright: string;
  codex_modal_reversed: string;
  codex_modal_lore: string;
  codex_modal_draw_cta: string;
  codex_orientation_toggle: string;

  // History
  history_badge: string;
  history_title: string;
  history_subtitle: string;
  history_search_placeholder: string;
  history_filter_all: string;
  history_empty_title: string;
  history_empty_desc: string;
  history_start_first: string;
  history_clear_all: string;
  history_clear_confirm: string;
  history_delete_btn: string;
  history_view_reading: string;
  history_no_matches: string;

  // Loading and Errors
  loading_title: string;
  loading_subtitle: string;
  loading_step1: string;
  loading_step2: string;
  loading_step3: string;
  error_title: string;
  error_retry: string;
  error_fallback_hint: string;

  // Convenient Aliases for Components
  upright: string;
  reversed: string;
  nav_reading: string;
  nav_history: string;
  reading_overall: string;
  reading_guidance: string;
  reading_reflection: string;
  reading_new: string;
  reading_back_to_history: string;
  reading_consult_again: string;
  reading_share: string;
  reading_share_copied: string;
  reading_title: string;
  reading_question_title: string;
  clarifier_cards_drawn: string;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  en: {
    // Navigation
    nav_brand: 'Mystic Tarot',
    nav_brand_subtitle: '78-Card Arcana & Gemini Oracle',
    nav_home: 'Home',
    nav_start_reading: 'Start Reading',
    nav_card_codex: 'Card Codex (78 Cards)',
    nav_reading_history: 'Reading History',
    nav_sound_on: 'Sound Muted (Click to un-mute)',
    nav_sound_off: 'Sound Enabled (Click to mute)',
    nav_lang_toggle: 'Language',

    // Hero
    hero_badge: 'Sacred 78-Card Tarot Arcana',
    hero_title_lead: 'Illuminate Your Path with the',
    hero_title_accent: 'Ancient Cards & Gemini Oracle',
    hero_subtitle:
      'Draw from the authentic 78-card deck across curated tarot spreads. Unveil deep personal clarity, career insights, and relationship wisdom synthesized by Gemini.',
    hero_cta_primary: 'Begin Your Sacred Reading',
    hero_cta_codex: 'Explore 78-Card Codex',
    hero_feature1_title: 'Full 78-Card Arcana',
    hero_feature1_desc: 'All 22 Major Arcana and 56 Minor Arcana with authentic upright and reversed alignments.',
    hero_feature2_title: 'Multiple Sacred Spreads',
    hero_feature2_desc: 'Choose from 1, 3, 5, or 7-card layouts including Timeline, Crossroads, and Horseshoe spreads.',
    hero_feature3_title: 'Deep Gemini Synthesis',
    hero_feature3_desc: 'Every card is connected into a unified, compassionate story answering your specific question.',
    hero_feature4_title: 'Need More Cards?',
    hero_feature4_desc: 'Draw clarifier cards from the remaining deck whenever you seek deeper clarity or resolution.',

    // Setup Step 1
    setup_step_badge: 'Step 1: Focus Your Intention',
    setup_title: 'Seek Wisdom from the Arcana',
    setup_subtitle:
      'Clarify what calls to your heart today. Select your life category, choose a sacred spread, and formulate your question.',
    setup_category_label: 'Choose Life Domain',
    setup_category_subtitle: 'Select the energetic field of your inquiry',
    setup_spread_label: 'Select Tarot Spread',
    setup_question_label: 'Your Question or Intention',
    setup_question_placeholder: 'What insights do the cards hold for my current journey?...',
    setup_question_hint: 'Open-ended questions (How, What, Why) unlock the deepest archetypal wisdom.',
    setup_quick_prompts: 'Quick Inspiration Prompts:',
    setup_shuffle_btn: 'Shuffle & Draw Sacred Cards',
    setup_card_count_filter_all: 'All',

    // Categories
    cat_general: 'General Life',
    cat_general_desc: 'Overall life journey, spiritual path, and energetic overview',
    cat_love: 'Love & Relationships',
    cat_love_desc: 'Soul connections, communication, harmony, and healing',
    cat_career: 'Career & Ambition',
    cat_career_desc: 'Professional decisions, creative vision, and leadership',
    cat_money: 'Money & Finance',
    cat_money_desc: 'Abundance mindset, resource stewardship, and investments',
    cat_future: 'Future & Destiny',
    cat_future_desc: 'Emerging trajectories, timing, and karmic crossroads',
    cat_growth: 'Personal Growth',
    cat_growth_desc: 'Inner shadow work, emotional resilience, and self-mastery',

    // Spreads
    spread_single_card_name: 'Single Oracle / Daily Draw',
    spread_single_card_desc: 'A focused, immediate illumination delivering a clear message or theme for your day or question.',
    spread_past_present_future_name: 'Past / Present / Future',
    spread_past_present_future_desc: 'Traces the foundational roots, current energies, and unfolding trajectory of your inquiry.',
    spread_situation_action_outcome_name: 'Situation / Action / Outcome',
    spread_situation_action_outcome_desc: 'Illuminates the exact nature of your dilemma, the wisest next move, and the likely result.',
    spread_problem_cause_solution_name: 'Problem / Cause / Solution',
    spread_problem_cause_solution_desc: 'Diagnoses the bottleneck or hurdle, reveals its root source, and offers clear resolution.',
    spread_three_card_reading_name: 'Mind / Body / Spirit',
    spread_three_card_reading_desc: 'A holistic inquiry into your mental clarity, physical manifestation, and spiritual compass.',
    spread_five_card_cross_name: 'The Elemental Cross (5 Cards)',
    spread_five_card_cross_desc: 'An expansive five-card layout examining past roots, present focus, hidden influences, action advice, and the projected outcome.',
    spread_decision_crossroads_name: 'Decision Crossroads (5 Cards)',
    spread_decision_crossroads_desc: 'Examines a choice between two paths, comparing the potentials and challenges of each direction.',
    spread_seven_card_horseshoe_name: 'Horseshoe of Destiny (7 Cards)',
    spread_seven_card_horseshoe_desc: 'A comprehensive seven-card journey exploring the full tapestry of influences, obstacles, external forces, and final resolution.',

    // Card Positions
    pos_core_guidance: 'Core Guidance',
    pos_past: 'Past',
    pos_present: 'Present',
    pos_future: 'Future',
    pos_situation: 'Situation',
    pos_action: 'Action',
    pos_outcome: 'Outcome',
    pos_problem: 'Problem',
    pos_cause: 'Cause',
    pos_solution: 'Solution',
    pos_mind: 'Mind',
    pos_body: 'Body',
    pos_spirit: 'Spirit',
    pos_past_roots: 'Past Roots',
    pos_present_focus: 'Present Focus',
    pos_hidden_influences: 'Hidden Influences',
    pos_action_advice: 'Action Advice',
    pos_projected_outcome: 'Projected Outcome',
    pos_the_crossroads: 'The Crossroads',
    pos_path_a_opportunity: 'Path A: Opportunity',
    pos_path_a_challenge: 'Path A: Challenge',
    pos_path_b_opportunity: 'Path B: Opportunity',
    pos_path_b_challenge: 'Path B: Challenge',
    pos_past_influences: 'Past Influences',
    pos_present_circumstance: 'Present Circumstance',
    pos_hidden_factors: 'Hidden Factors',
    pos_the_obstacle: 'The Obstacle',
    pos_external_environment: 'External Environment',
    pos_recommended_action: 'Recommended Action',
    pos_final_resolution: 'Final Resolution',

    // Reveal Animation Step 2
    reveal_step_badge: 'Step 2: Sacred Card Drawing',
    reveal_title: 'Your Cards are Drawn',
    reveal_subtitle: 'Take a quiet breath and align your mind. The arcana have emerged from the deck to mirror your inquiry.',
    reveal_hint: 'Touch or click each card to reveal its ancient reflection',
    reveal_counter: '{revealed} of {total} revealed',
    reveal_all_btn: 'Reveal All Cards',
    reveal_complete_title: 'All Cards Revealed',
    reveal_complete_desc: 'The ancient patterns are aligned. Gemini is synthesizing your reading...',
    reveal_consulting_btn: 'Consult Gemini Oracle',

    // Shuffle Animation
    shuffle_ritual_badge: 'The Sacred Shuffle',
    shuffle_title: 'Shuffling the 78 Arcana',
    shuffle_step_gather: 'Gathering the 78 Sacred Cards...',
    shuffle_step_split: 'Cutting the Deck in Two...',
    shuffle_step_riffle: 'Riffling and Inverting Orientations...',
    shuffle_step_square: 'Squaring the Deck & Aligning Energies...',
    shuffle_step_deal: 'Dealing Your Cards into the Spread...',
    shuffle_skip_btn: 'Skip Shuffle',
    shuffle_reshuffle_btn: 'Re-shuffle Deck',

    // Orientations
    orientation_upright: 'Upright',
    orientation_reversed: 'Reversed',

    // Reading Result Step 3
    result_badge: 'Sacred Reading Synthesis',
    result_title: 'Your Tarot Reading & Oracle Guidance',
    result_category: 'Category',
    result_spread: 'Spread',
    result_share_btn: 'Share Reading',
    result_copied: 'Copied to Clipboard!',
    result_new_reading_btn: 'New Reading',
    result_back_history_btn: 'Back to History',
    result_cards_assembly_title: 'The Cards in Assembly',
    result_cards_assembly_desc: 'Observed in sacred spread alignment',
    result_deep_analysis_title: 'Individual Card Interpretations',
    result_overall_synthesis_title: 'Synthesized Reading Arc',
    result_guidance_title: 'Practical Actionable Counsel',
    result_reflections_title: 'Sacred Reflection Inquiries',
    result_wisdom_footer_title: 'May the Wisdom Guide Your Steps',
    result_wisdom_footer_desc: 'This reading has been securely cataloged in your private history. You may return to reflect upon it at any time.',

    // Clarifier Card
    clarifier_badge: 'Need More Cards?',
    clarifier_title: 'Draw a Clarifier Card',
    clarifier_desc: 'If a specific position feels ambiguous, draw an additional card from the remaining deck to receive deeper resolution.',
    clarifier_draw_btn: 'Draw Clarifier Card',
    clarifier_drawing: 'Drawing & Interpreting...',
    clarifier_section_title: 'Clarifier Cards Drawn',

    // Codex (78 Cards)
    codex_badge: 'The Complete 78-Card Deck',
    codex_title: 'Tarot Card Codex',
    codex_subtitle: 'Explore the traditional symbolism, upright and reversed meanings, and archetypal lessons of every card in the mystical 78-card deck.',
    codex_cta: 'Consult the Oracle (Draw Cards)',
    codex_search_placeholder: 'Search by card name, keywords, or meanings (e.g. Fool, Love, Strength)...',
    codex_tab_all: 'All Cards',
    codex_tab_major: 'Major Arcana',
    codex_tab_wands: 'Wands (Fire)',
    codex_tab_cups: 'Cups (Water)',
    codex_tab_swords: 'Swords (Air)',
    codex_tab_pentacles: 'Pentacles (Earth)',
    codex_showing: 'Showing {count} of 78 cards',
    codex_clear_search: 'Clear Search',
    codex_no_results: 'No tarot cards matched your search.',
    codex_reset_filters: 'Reset Filters',
    codex_modal_upright: 'Upright Meaning',
    codex_modal_reversed: 'Reversed Meaning',
    codex_modal_lore: 'Traditional Symbolism & Lore',
    codex_modal_draw_cta: 'Draw Cards in a Reading',
    codex_orientation_toggle: 'Orientation',

    // History
    history_badge: 'Your Spiritual Journey',
    history_title: 'Tarot Reading Archives',
    history_subtitle: 'Revisit past readings, review the cards drawn, and track your evolving patterns over time.',
    history_search_placeholder: 'Search past questions or cards...',
    history_filter_all: 'All Categories',
    history_empty_title: 'No Past Readings Recorded',
    history_empty_desc: 'Your sacred readings will be automatically preserved here as you consult the cards.',
    history_start_first: 'Begin Your First Reading',
    history_clear_all: 'Clear All Records',
    history_clear_confirm: 'Are you sure you want to erase all reading history? This cannot be undone.',
    history_delete_btn: 'Delete',
    history_view_reading: 'View Full Reading',
    history_no_matches: 'No readings found matching your query.',

    // Loading and Errors
    loading_title: 'Consulting the Cosmic Oracle',
    loading_subtitle: 'Please wait while Gemini interprets your cards with deep compassion...',
    loading_step1: 'Shuffling the 78 archetypes...',
    loading_step2: 'Synthesizing spread positions...',
    loading_step3: 'Channeling profound wisdom...',
    error_title: 'An Energetic Interruption Occurred',
    error_retry: 'Try Again',
    error_fallback_hint: 'The oracle is temporarily resting. Please try once more.',

    // Convenient Aliases for Components
    upright: 'Upright',
    reversed: 'Reversed',
    nav_reading: 'Start Reading',
    nav_history: 'Reading History',
    reading_overall: 'Synthesized Reading Arc',
    reading_guidance: 'Practical Actionable Counsel',
    reading_reflection: 'Sacred Reflection Inquiries',
    reading_new: 'New Reading',
    reading_back_to_history: 'Back to History',
    reading_consult_again: 'Consult Again',
    reading_share: 'Share Reading',
    reading_share_copied: 'Copied to Clipboard!',
    reading_title: 'Your Tarot Reading & Oracle Guidance',
    reading_question_title: 'Inquiry Question',
    clarifier_cards_drawn: 'Clarifier Cards Drawn',
  },

  my: {
    // Navigation
    nav_brand: 'လျှို့ဝှက်ဆန်းကြယ် တားရော့',
    nav_brand_subtitle: '၇၈ ချပ်သော တားရော့နိမိတ်နှင့် ဂျီမီနိုင်း ဗေဒင်ဉာဏ်တော်',
    nav_home: 'ပင်မစာမျက်နှာ',
    nav_start_reading: 'တားရော့ မေးမြန်းရန်',
    nav_card_codex: 'ကတ်များ အဘိဓာန် (၇၈ ချပ်)',
    nav_reading_history: 'ဟောစာတမ်း မှတ်တမ်း',
    nav_sound_on: 'အသံပိတ်ထားသည် (ဖွင့်ရန်နှိပ်ပါ)',
    nav_sound_off: 'အသံဖွင့်ထားသည် (ပိတ်ရန်နှိပ်ပါ)',
    nav_lang_toggle: 'ဘာသာစကား ရွေးချယ်ရန်',

    // Hero
    hero_badge: '၇၈ ချပ်သော ရှေးဟောင်း တားရော့ပညာ',
    hero_title_lead: 'သင့်ဘဝခရီးလမ်းကို လမ်းညွှန်အလင်းပြမည့်',
    hero_title_accent: '၇၈ ချပ်သော တားရော့နှင့် ဉာဏ်ရည်တု ဗေဒင်',
    hero_subtitle:
      'အစဉ်အလာ ၇၈ ချပ်စုံလင်သော တားရော့ကတ်ပြားများမှ ဆွဲယူ၍ သင့်ဘဝ၊ အချစ်ရေး၊ အလုပ်အကိုင်နှင့် စီးပွားရေးဆိုင်ရာ မေးခွန်းများကို ဉာဏ်ရည်တု ဂျီမီနိုင်း၏ နက်နဲသော အဓိပ္ပာယ်ဖွင့်ဆိုချက်များဖြင့် ဖတ်ရှုဆင်ခြင်နိုင်ပါသည်။',
    hero_cta_primary: 'တားရော့ဟောစာတမ်း စတင်မေးမြန်းမည်',
    hero_cta_codex: '၇၈ ချပ်သော ကတ်များအဘိဓာန် ကြည့်ရှုမည်',
    hero_feature1_title: '၇၈ ချပ် စုံလင်သော တားရော့ကတ်များ',
    hero_feature1_desc: 'မေဂျာ အာကာနာ ၂၂ ချပ်နှင့် မိုင်နာ အာကာနာ ၅၆ ချပ်စလုံးကို အတည့်နှင့် ပြောင်းပြန်သဘောတရားများဖြင့် မှန်ကန်စွာ ထည့်သွင်းထားပါသည်။',
    hero_feature2_title: 'စိတ်ကြိုက်ရွေးချယ်နိုင်သော ကတ်ခင်းနည်းများ',
    hero_feature2_desc: '၁ ချပ်၊ ၃ ချပ်၊ ၅ ချပ် နှင့် ၇ ချပ်ခင်းနည်းများ (အတိတ်/ပစ္စုပ္ပန်/အနာဂတ်၊ လမ်းဆုံလမ်းခွ၊ ကံကြမ္မာမြင်းခွာခွင် စသည်)။',
    hero_feature3_title: 'နက်နဲသော ပေါင်းစပ်ဟောစာတမ်း',
    hero_feature3_desc: 'ကတ်တစ်ချပ်ချင်းစီ၏ နိမိတ်များကို တစ်ခုနှင့်တစ်ခု ချိတ်ဆက်၍ သင့်မေးခွန်းအတွက် ပြီးပြည့်စုံသော အကြံဉာဏ်ပေးအပ်ပါသည်။',
    hero_feature4_title: 'နောက်ထပ်ကတ်များ ထပ်မံဆွဲယူနိုင်ခြင်း',
    hero_feature4_desc: 'မေးခွန်းတွင် ပိုမိုရှင်းလင်းမှု လိုအပ်ပါက ကျန်ရှိသော ကတ်များမှ ရှင်းလင်းချက် အပိုကတ်များ ထပ်မံဆွဲယူနိုင်ပါသည်။',

    // Setup Step 1
    setup_step_badge: 'အဆင့် ၁: သင့်မေးခွန်း သို့မဟုတ် ရည်ရွယ်ချက်ကို အာရုံပြုပါ',
    setup_title: 'တားရော့နိမိတ်ဆီမှ အဖြေဉာဏ်ကို တောင်းခံပါ',
    setup_subtitle:
      'ယနေ့ သင့်စိတ်နှလုံးတွင် မေးမြန်းလိုသောအရာကို ငြိမ်သက်စွာ အာရုံပြုပါ။ ဘဝကဏ္ဍ၊ ကတ်ခင်းနည်းပုံစံနှင့် သင့်မေးခွန်းကို ရွေးချယ်ပါ။',
    setup_category_label: 'မေးမြန်းလိုသော ဘဝကဏ္ဍ',
    setup_category_subtitle: 'သင့်မေးခွန်းနှင့် သက်ဆိုင်ရာ နယ်ပယ်ကို ရွေးချယ်ပါ',
    setup_spread_label: 'ကတ်ခင်းနည်း ပုံစံ ရွေးချယ်ရန်',
    setup_question_label: 'သင့်မေးခွန်း သို့မဟုတ် စိတ်ဆန္ဒ',
    setup_question_placeholder: 'လက်ရှိ ကျွန်ုပ်၏ ဘဝခရီးလမ်းအတွက် တားရော့ကတ်များက မည်သည့်အကြံဉာဏ် ပေးသနည်း?...',
    setup_question_hint: 'အဘယ်ကြောင့်၊ မည်သို့မည်ပုံ စသော ပွင့်လင်းသည့် မေးခွန်းများသည် ပိုမိုပြည့်စုံသော အဖြေကို ရရှိစေပါသည်။',
    setup_quick_prompts: 'နမူနာ မေးခွန်းများ စမ်းသပ်ကြည့်ရန်:',
    setup_shuffle_btn: 'ကတ်များကို မွှေ၍ စတင်ဆွဲယူပါ',
    setup_card_count_filter_all: 'အားလုံး',

    // Categories
    cat_general: 'အထွေထွေ ဘဝခရီး',
    cat_general_desc: 'ဘဝခရီးလမ်း အလုံးစုံ၊ စိတ်ခွန်အားနှင့် လက်ရှိစွမ်းအင် အခြေအနေ',
    cat_love: 'အချစ်ရေးနှင့် သံယောဇဉ်',
    cat_love_desc: 'နှလုံးသားရေးရာ၊ နားလည်မှု၊ မေတ္တာနှင့် ကုစားမှုများ',
    cat_career: 'အလုပ်အကိုင်နှင့် လုပ်ငန်း',
    cat_career_desc: 'အလုပ်အကိုင် အပြောင်းအလဲ၊ ရည်မှန်းချက်နှင့် ဦးဆောင်မှု',
    cat_money: 'ငွေကြေးနှင့် စီးပွားရေး',
    cat_money_desc: 'ဓနဥစ္စာ၊ အရင်းအနှီး၊ စီးပွားအခွင့်အလမ်းနှင့် စီမံခန့်ခွဲမှု',
    cat_future: 'အနာဂတ် လားရာ',
    cat_future_desc: 'ဖြစ်ပေါ်လာမည့် အလားအလာများနှင့် ကံကြမ္မာ အကွေ့အကောက်များ',
    cat_growth: 'မိမိကိုယ်ကို ဖွံ့ဖြိုးတိုးတက်မှု',
    cat_growth_desc: 'စိတ်ခွန်အား တည်ဆောက်ခြင်း၊ အလေ့အကျင့်ကောင်းများနှင့် အတွင်းစိတ် ငြိမ်းချမ်းမှု',

    // Spreads
    spread_single_card_name: 'နေ့စဉ်ကံကြမ္မာ လမ်းညွှန် (၁ ချပ်)',
    spread_single_card_desc: 'ယနေ့အတွက် အဓိက သတိပြုရမည့် အကြောင်းအရာ သို့မဟုတ် မေးခွန်းတစ်ခုအတွက် တိုက်ရိုက်ရှင်းလင်းသော အဖြေ ၁ ချပ်။',
    spread_past_present_future_name: 'အတိတ် / ပစ္စုပ္ပန် / အနာဂတ် (၃ ချပ်)',
    spread_past_present_future_desc: 'ဖြစ်ရပ်၏ မူလအစ အတိတ်၊ လက်ရှိ ပစ္စုပ္ပန် အနေအထားနှင့် ရှေ့ဆက်ဖြစ်ပေါ်လာမည့် အနာဂတ် လမ်းစ ၃ ချပ်။',
    spread_situation_action_outcome_name: 'အခြေအနေ / ဆောင်ရွက်ရန် / ရလဒ် (၃ ချပ်)',
    spread_situation_action_outcome_desc: 'လက်ရှိ အခက်အခဲ၏ သဘောသဘာဝ၊ အကောင်းဆုံး ဆောင်ရွက်သင့်သည့် နည်းလမ်းနှင့် ရရှိလာမည့် ရလဒ် ၃ ချပ်။',
    spread_problem_cause_solution_name: 'အခက်အခဲ / အကြောင်းအရင်း / ဖြေရှင်းနည်း (၃ ချပ်)',
    spread_problem_cause_solution_desc: 'ရင်ဆိုင်နေရသော ပြဿနာ၊ ၎င်း၏ အရင်းခံ အကြောင်းတရားနှင့် အောင်မြင်စွာ ဖြေရှင်းကျော်လွှားနိုင်မည့် နည်းလမ်း ၃ ချပ်။',
    spread_three_card_reading_name: 'စိတ် / ရုပ် / ဝိညာဉ် ၃ ပါးညီညွတ်မှု (၃ ချပ်)',
    spread_three_card_reading_desc: 'စိတ်ပိုင်းဆိုင်ရာ အခြေအနေ၊ ရုပ်ပိုင်းဆိုင်ရာ ဆောင်ရွက်ချက်များနှင့် ဝိညာဉ်ပိုင်းဆိုင်ရာ အတွင်းလမ်းညွှန် ၃ ချပ်။',
    spread_five_card_cross_name: 'ဓါတ်ငါးပါး လေးထောင့်ခွင် (၅ ချပ်)',
    spread_five_card_cross_desc: 'အတိတ်အခြေခံ၊ လက်ရှိအာရုံ၊ မမြင်နိုင်သော လျှို့ဝှက်လွှမ်းမိုးမှုများ၊ လက်တွေ့အကြံပြုချက်နှင့် နောက်ဆုံးရလဒ် ၅ ချပ်။',
    spread_decision_crossroads_name: 'လမ်းဆုံလမ်းခွ ရွေးချယ်မှု (၅ ချပ်)',
    spread_decision_crossroads_desc: 'ရွေးချယ်စရာ လမ်းနှစ်သွယ်ကို နှိုင်းယှဉ်၍ လမ်းကြောင်း တစ်ခုချင်းစီ၏ အခွင့်အလမ်းနှင့် စိန်ခေါ်မှုများကို ဆန်းစစ်ခြင်း ၅ ချပ်။',
    spread_seven_card_horseshoe_name: 'ကံကြမ္မာ မြင်းခွာခွင် (၇ ချပ်)',
    spread_seven_card_horseshoe_desc: 'အတိတ်လွှမ်းမိုးမှု၊ ပစ္စုပ္ပန်၊ လျှို့ဝှက်အချက်၊ အတားအဆီး၊ ပြင်ပပတ်ဝန်းကျင်၊ ဆောင်ရွက်သင့်သောအချက်နှင့် အဆုံးစွန်ရလဒ် ၇ ချပ်။',

    // Card Positions
    pos_core_guidance: 'အဓိက လမ်းညွှန်ချက်',
    pos_past: 'အတိတ် အခြေခံ',
    pos_present: 'လက်ရှိ ပစ္စုပ္ပန်',
    pos_future: 'ရှေ့ဆက် အနာဂတ်',
    pos_situation: 'လက်ရှိ အခြေအနေ',
    pos_action: 'ပြုမူဆောင်ရွက်ရန်',
    pos_outcome: 'ရရှိလာမည့် ရလဒ်',
    pos_problem: 'ရင်ဆိုင်နေရသော အခက်အခဲ',
    pos_cause: 'အရင်းခံ အကြောင်းအရင်း',
    pos_solution: 'ဖြေရှင်းနိုင်မည့် နည်းလမ်း',
    pos_mind: 'စိတ်ပိုင်းဆိုင်ရာ (Mind)',
    pos_body: 'ရုပ်ပိုင်းဆိုင်ရာ (Body)',
    pos_spirit: 'ဝိညာဉ်ပိုင်းဆိုင်ရာ (Spirit)',
    pos_past_roots: 'အတိတ် အမြစ်တွယ်ရာ',
    pos_present_focus: 'ပစ္စုပ္ပန် အာရုံစိုက်မှု',
    pos_hidden_influences: 'လျှို့ဝှက်လွှမ်းမိုးမှုများ',
    pos_action_advice: 'လက်တွေ့ အကြံပြုချက်',
    pos_projected_outcome: 'မျှော်မှန်းနိုင်သော ရလဒ်',
    pos_the_crossroads: 'ဗဟို လမ်းဆုံလမ်းခွ',
    pos_path_a_opportunity: 'လမ်းကြောင်း (က) - အခွင့်အလမ်း',
    pos_path_a_challenge: 'လမ်းကြောင်း (က) - စိန်ခေါ်မှု',
    pos_path_b_opportunity: 'လမ်းကြောင်း (ခ) - အခွင့်အလမ်း',
    pos_path_b_challenge: 'လမ်းကြောင်း (ခ) - စိန်ခေါ်မှု',
    pos_past_influences: 'အတိတ်မှ လွှမ်းမိုးချက်',
    pos_present_circumstance: 'လက်ရှိ အခြေအနေများ',
    pos_hidden_factors: 'မမြင်နိုင်သော အကြောင်းရင်းများ',
    pos_the_obstacle: 'ရင်ဆိုင်ရမည့် အတားအဆီး',
    pos_external_environment: 'ပြင်ပပတ်ဝန်းကျင် သက်ရောက်မှု',
    pos_recommended_action: 'အကြံပြုတိုက်တွန်းချက်',
    pos_final_resolution: 'နောက်ဆုံး အဖြေရလဒ်',

    // Reveal Animation Step 2
    reveal_step_badge: 'အဆင့် ၂: တားရော့ကတ်များ ဆွဲယူခြင်း',
    reveal_title: 'သင့်ကတ်ပြားများ ပေါ်ထွက်လာပါပြီ',
    reveal_subtitle: 'စိတ်ကို အေးချမ်းစွာထားပါ။ သင့်မေးခွန်းအတွက် ရှေးဟောင်းတားရော့ ကတ်ပြားများ ထွက်ပေါ်လာခဲ့ပါပြီ။',
    reveal_hint: 'ကတ်တစ်ချပ်ချင်းစီ၏ နိမိတ်ကို မြင်တွေ့ရန် ကတ်ပြားကို နှိပ်၍ ဖွင့်လှစ်ပါ',
    reveal_counter: '{revealed} ချပ် / စုစုပေါင်း {total} ချပ် ဖွင့်ပြီး',
    reveal_all_btn: 'ကတ်အားလုံး တစ်ပြိုင်နက်ဖွင့်မည်',
    reveal_complete_title: 'ကတ်အားလုံး ဖွင့်လှစ်ပြီးပါပြီ',
    reveal_complete_desc: 'ကတ်နိမိတ်များ ပြည့်စုံစွာ ပေါ်ထွက်လာပါပြီ။ ဂျီမီနိုင်း ဉာဏ်တော်မှ ဟောစာတမ်းကို ဆင်ခြင်တွက်ချက်နေပါသည်...',
    reveal_consulting_btn: 'ဂျီမီနိုင်း ဗေဒင်ဉာဏ်တော်ထံမှ အဖြေရယူမည်',

    // Shuffle Animation
    shuffle_ritual_badge: 'တားရော့ကတ်များ မွှေနှောက်ခြင်း ထုံးတမ်း',
    shuffle_title: 'တားရော့ ၇၈ ကတ်လုံးကို မွှေနှောက်နေပါသည်',
    shuffle_step_gather: 'မင်္ဂလာတားရော့ ၇၈ ကတ်လုံးကို စုစည်းနေပါသည်...',
    shuffle_step_split: 'ကတ်များကို နှစ်ပိုင်းခွဲထုတ်နေပါသည်...',
    shuffle_step_riffle: 'ကတ်များကို အတည့်နှင့် ပြောင်းပြန် ရောနှောမွှေနှောက်နေပါသည်...',
    shuffle_step_square: 'ကတ်များကို စည်းစနစ်တကျ ပြန်လည်စုစည်းနေပါသည်...',
    shuffle_step_deal: 'သင့်မေးခွန်းအတွက် ကတ်များကို ခင်းကျင်းနေပါသည်...',
    shuffle_skip_btn: 'မွှေနှောက်မှု ကျော်မည်',
    shuffle_reshuffle_btn: 'ကတ်များ ပြန်မွှေမည်',

    // Orientations
    orientation_upright: 'အတည့် (Upright)',
    orientation_reversed: 'ပြောင်းပြန် (Reversed)',

    // Reading Result Step 3
    result_badge: 'တားရော့ ဟောစာတမ်း အပြည့်အစုံ',
    result_title: 'သင့်တားရော့ ဟောကိန်းနှင့် လမ်းညွှန်ချက်',
    result_category: 'ကဏ္ဍ',
    result_spread: 'ကတ်ခင်းနည်း',
    result_share_btn: 'ဟောစာတမ်း မျှဝေရန်',
    result_copied: 'ကူးယူပြီးပါပြီ!',
    result_new_reading_btn: 'အသစ်ထပ်မံမေးမြန်းမည်',
    result_back_history_btn: 'မှတ်တမ်းသို့ ပြန်သွားမည်',
    result_cards_assembly_title: 'ကျရောက်သော ကတ်ပြားများ',
    result_cards_assembly_desc: 'သတ်မှတ်ထားသော အစီအစဉ်အတိုင်း တွေ့မြင်ရသော နိမိတ်များ',
    result_deep_analysis_title: 'ကတ်တစ်ချပ်ချင်းစီ၏ အသေးစိတ် အဓိပ္ပာယ်',
    result_overall_synthesis_title: 'အလုံးစုံ ပေါင်းစပ်ဟောစာတမ်း',
    result_guidance_title: 'လက်တွေ့ လိုက်နာဆောင်ရွက်ရန် အကြံပြုချက်',
    result_reflections_title: 'မိမိကိုယ်ကို ပြန်လည်ဆင်ခြင်ရန် မေးခွန်းများ',
    result_wisdom_footer_title: 'ဤတားရော့ ဉာဏ်အလင်းသည် သင့်ခြေလှမ်းများကို လမ်းပြပါစေသတည်း',
    result_wisdom_footer_desc: 'ဤဟောစာတမ်းကို သင့်ကိုယ်ပိုင် မှတ်တမ်းထဲတွင် သိမ်းဆည်းပြီးဖြစ်၍ အချိန်မရွေး ပြန်လည်ဖတ်ရှုနိုင်ပါသည်။',

    // Clarifier Card
    clarifier_badge: 'နောက်ထပ်ကတ် လိုအပ်ပါသလား?',
    clarifier_title: 'ရှင်းလင်းချက် အပိုကတ် ဆွဲယူပါ',
    clarifier_desc: 'တစ်စုံတစ်ခုကို ပိုမိုရှင်းလင်းစွာ သိလိုပါက ကျန်ရှိသော ကတ်များထဲမှ အပိုကတ်တစ်ချပ် ထပ်မံဆွဲယူပြီး အဖြေရှာနိုင်ပါသည်။',
    clarifier_draw_btn: 'ရှင်းလင်းချက်ကတ် ဆွဲယူမည်',
    clarifier_drawing: 'ကတ်ဆွဲ၍ အဓိပ္ပာယ်ဖော်နေပါသည်...',
    clarifier_section_title: 'ထပ်မံဆွဲယူထားသော ရှင်းလင်းချက်ကတ်များ',

    // Codex (78 Cards)
    codex_badge: '၇၈ ချပ် စုံလင်သော တားရော့ အဘိဓာန်',
    codex_title: 'တားရော့ ကတ်များ အဘိဓာန်',
    codex_subtitle: 'တားရော့ကတ် ၇၈ ချပ်လုံး၏ အစဉ်အလာ အဓိပ္ပာယ်များ၊ အတည့်သဘော၊ ပြောင်းပြန်သဘောနှင့် သင်္ကေတများကို လေ့လာနိုင်ပါသည်။',
    codex_cta: 'တားရော့ မေးမြန်းရန် (ကတ်များဆွဲမည်)',
    codex_search_placeholder: 'ကတ်အမည် သို့မဟုတ် အဓိပ္ပာယ်ဖြင့် ရှာဖွေပါ (ဥပမာ - The Fool, မေတ္တာ, အောင်မြင်မှု)...',
    codex_tab_all: 'ကတ်အားလုံး (၇၈)',
    codex_tab_major: 'မေဂျာ အာကာနာ (၂၂)',
    codex_tab_wands: 'တုတ်ဒေါက် - မီး (၁၄)',
    codex_tab_cups: 'ဖလား - ရေ (၁၄)',
    codex_tab_swords: 'ဓား - လေ (၁၄)',
    codex_tab_pentacles: 'ဒင်္ဂါး - မြေ (၁၄)',
    codex_showing: '၇၈ ချပ်အနက် {count} ချပ် ပြသနေသည်',
    codex_clear_search: 'ရှာဖွေမှု ဖျက်မည်',
    codex_no_results: 'ရှာဖွေမှုနှင့် ကိုက်ညီသော တားရော့ကတ် မတွေ့ရှိပါ။',
    codex_reset_filters: 'မူလအတိုင်း ပြန်ထားမည်',
    codex_modal_upright: 'အတည့်ကျရောက်စဉ် အဓိပ္ပာယ်',
    codex_modal_reversed: 'ပြောင်းပြန်ကျရောက်စဉ် အဓိပ္ပာယ်',
    codex_modal_lore: 'ရိုးရာသင်္ကေတနှင့် သမိုင်းကြောင်း',
    codex_modal_draw_cta: 'ဤကတ်ကို အသုံးပြု၍ မေးမြန်းမည်',
    codex_orientation_toggle: 'အနေအထား (အတည့်/ပြောင်းပြန်)',

    // History
    history_badge: 'သင့်ဘဝခရီးလမ်း မှတ်တမ်း',
    history_title: 'တားရော့ ဟောစာတမ်း မှတ်တမ်းများ',
    history_subtitle: 'ယခင် မေးမြန်းခဲ့သော ကတ်များနှင့် ဟောစာတမ်းများကို အချိန်မရွေး ပြန်လည်ကြည့်ရှု သုံးသပ်နိုင်ပါသည်။',
    history_search_placeholder: 'မေးခွန်း သို့မဟုတ် ကတ်အမည်ဖြင့် ရှာဖွေပါ...',
    history_filter_all: 'ကဏ္ဍ အားလုံး',
    history_empty_title: 'ဟောစာတမ်း မှတ်တမ်း မရှိသေးပါ',
    history_empty_desc: 'တားရော့ကတ်များ စတင်မေးမြန်းပါက ဤနေရာတွင် အလိုအလျောက် သိမ်းဆည်းပေးထားပါမည်။',
    history_start_first: 'ပထမဆုံးအကြိမ် တားရော့ မေးမြန်းမည်',
    history_clear_all: 'မှတ်တမ်းအားလုံး ဖျက်ပစ်မည်',
    history_clear_confirm: 'မှတ်တမ်းများအားလုံးကို အပြီးအပိုင် ဖျက်ပစ်ရန် သေချာပါသလား?',
    history_delete_btn: 'ဖျက်မည်',
    history_view_reading: 'ဟောစာတမ်း အပြည့်အစုံ ကြည့်မည်',
    history_no_matches: 'ရှာဖွေမှုနှင့် ကိုက်ညီသော မှတ်တမ်း မတွေ့ရှိပါ။',

    // Loading and Errors
    loading_title: 'ဗေဒင်ဉာဏ်တော်ကို ဆည်းကပ်တောင်းခံနေပါသည်',
    loading_subtitle: 'ဂျီမီနိုင်း ဉာဏ်ရည်တုမှ သင့်ကတ်များကို မေတ္တာစေတနာဖြင့် ဟောစာတမ်း ရေးဖွဲ့နေပါသည်...',
    loading_step1: '၇၈ ချပ်သော ကတ်နိမိတ်များကို စစ်ဆေးနေသည်...',
    loading_step2: 'ကတ်ခင်းနည်း အစီအစဉ်များနှင့် ပေါင်းစပ်နေသည်...',
    loading_step3: 'နက်နဲသော အကြံဉာဏ်များကို ဖော်ထုတ်နေသည်...',
    error_title: 'ဆက်သွယ်မှု ပြတ်တောက်သွားခဲ့ပါသည်',
    error_retry: 'ထပ်မံ ကြိုးစားမည်',
    error_fallback_hint: 'ခေတ္တစောင့်ဆိုင်းပြီး နောက်တစ်ကြိမ် ထပ်မံကြိုးစားကြည့်ပါ။',

    // Convenient Aliases for Components
    upright: 'အတည့် (Upright)',
    reversed: 'ပြောင်းပြန် (Reversed)',
    nav_reading: 'တားရော့ မေးမြန်းရန်',
    nav_history: 'ဟောစာတမ်း မှတ်တမ်း',
    reading_overall: 'အလုံးစုံ ပေါင်းစပ်ဟောစာတမ်း',
    reading_guidance: 'လက်တွေ့ လိုက်နာဆောင်ရွက်ရန် အကြံပြုချက်',
    reading_reflection: 'မိမိကိုယ်ကို ပြန်လည်ဆင်ခြင်ရန် မေးခွန်းများ',
    reading_new: 'အသစ်ထပ်မံမေးမြန်းမည်',
    reading_back_to_history: 'မှတ်တမ်းသို့ ပြန်သွားမည်',
    reading_consult_again: 'ထပ်မံမေးမြန်းမည်',
    reading_share: 'ဟောစာတမ်း မျှဝေရန်',
    reading_share_copied: 'ကူးယူပြီးပါပြီ!',
    reading_title: 'သင့်တားရော့ ဟောကိန်းနှင့် လမ်းညွှန်ချက်',
    reading_question_title: 'မေးမြန်းထားသော မေးခွန်း',
    clarifier_cards_drawn: 'ထပ်မံဆွဲယူထားသော ရှင်းလင်းချက်ကတ်များ',
  },
};

/**
 * Myanmar translations for Major Arcana and Card Suits for beautiful display in the UI
 */
export const MYANMAR_CARD_NAMES: Record<string, string> = {
  'major-0': 'လူမိုက် (The Fool)',
  'major-1': 'မျက်လှည့်ဆရာ (The Magician)',
  'major-2': 'မယ်တော်ဆရာမကြီး (The High Priestess)',
  'major-3': 'ဧကရီမိဖုရား (The Empress)',
  'major-4': 'ဧကရာဇ်မင်းကြီး (The Emperor)',
  'major-5': 'သာသနာပိုင်ဆရာတော် (The Hierophant)',
  'major-6': 'ချစ်သူစုံတွဲ (The Lovers)',
  'major-7': 'အောင်ပွဲစစ်ရထား (The Chariot)',
  'major-8': 'ခွန်အားသတ္တိ (Strength)',
  'major-9': 'တရားရှာရသေ့ (The Hermit)',
  'major-10': 'ကံကြမ္မာစက်ဝိုင်း (Wheel of Fortune)',
  'major-11': 'တရားမျှတမှု (Justice)',
  'major-12': 'ဇောက်ထိုးတွဲလောင်းလူ (The Hanged Man)',
  'major-13': 'သေခြင်းတရားနှင့် အသစ်စတင်ခြင်း (Death)',
  'major-14': 'မျှတငြိမ်းချမ်းခြင်း (Temperance)',
  'major-15': 'မာရ်နတ် (The Devil)',
  'major-16': 'မျှော်စင်ပြိုကျခြင်း (The Tower)',
  'major-17': 'မျှော်လင့်ချက်ကြယ်ပွင့် (The Star)',
  'major-18': 'လမင်း (The Moon)',
  'major-19': 'အောင်မြင်မှုနေမင်း (The Sun)',
  'major-20': 'တရားစီရင်ခြင်း (Judgement)',
  'major-21': 'ကမ္ဘာလောကပြည့်စုံခြင်း (The World)',
};

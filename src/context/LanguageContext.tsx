import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  AppLanguage,
  TRANSLATIONS,
  TranslationDictionary,
  MYANMAR_CARD_NAMES,
} from '../i18n/translations';
import { ReadingCategory, SpreadId } from '../types/tarot';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: keyof TranslationDictionary, params?: Record<string, string | number>) => string;
  isMyanmar: boolean;
  getCardName: (cardId: string, englishName: string) => string;
  getCategoryLabel: (category: ReadingCategory) => string;
  getSpreadLabel: (spreadId: SpreadId, fallbackName: string) => string;
  getPositionLabel: (position: string) => string;
  getOrientationLabel: (orientation: 'upright' | 'reversed') => string;
}

const STORAGE_KEY = 'mystic_tarot_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'my') {
        return saved;
      }
      // Check browser language or default to 'en'
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('my')) {
        return 'my';
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const isMyanmar = language === 'my';

  const t = useMemo(() => {
    return (key: keyof TranslationDictionary, params?: Record<string, string | number>): string => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
      let text = dict[key] || TRANSLATIONS.en[key] || String(key);

      if (params) {
        Object.entries(params).forEach(([paramKey, val]) => {
          text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
        });
      }

      return text;
    };
  }, [language]);

  const getCardName = (cardId: string, englishName: string): string => {
    if (!isMyanmar) return englishName;
    return MYANMAR_CARD_NAMES[cardId] || englishName;
  };

  const getCategoryLabel = (category: ReadingCategory): string => {
    if (!isMyanmar) return category;
    switch (category) {
      case 'General Life':
        return t('cat_general');
      case 'Love & Relationships':
        return t('cat_love');
      case 'Career':
        return t('cat_career');
      case 'Money & Finance':
        return t('cat_money');
      case 'Future':
        return t('cat_future');
      case 'Personal Growth':
        return t('cat_growth');
      default:
        return category;
    }
  };

  const getSpreadLabel = (spreadId: SpreadId, fallbackName: string): string => {
    if (!isMyanmar) return fallbackName;
    switch (spreadId) {
      case 'single-card':
        return t('spread_single_card_name');
      case 'past-present-future':
        return t('spread_past_present_future_name');
      case 'situation-action-outcome':
        return t('spread_situation_action_outcome_name');
      case 'problem-cause-solution':
        return t('spread_problem_cause_solution_name');
      case 'three-card-reading':
        return t('spread_three_card_reading_name');
      case 'five-card-cross':
        return t('spread_five_card_cross_name');
      case 'decision-crossroads':
        return t('spread_decision_crossroads_name');
      case 'seven-card-horseshoe':
        return t('spread_seven_card_horseshoe_name');
      default:
        return fallbackName;
    }
  };

  const getPositionLabel = (position: string): string => {
    if (!isMyanmar) return position;
    const lower = position.toLowerCase();

    if (lower.includes('core guidance')) return t('pos_core_guidance');
    if (lower === 'past') return t('pos_past');
    if (lower === 'present') return t('pos_present');
    if (lower === 'future') return t('pos_future');
    if (lower === 'situation') return t('pos_situation');
    if (lower === 'action') return t('pos_action');
    if (lower === 'outcome') return t('pos_outcome');
    if (lower === 'problem') return t('pos_problem');
    if (lower === 'cause') return t('pos_cause');
    if (lower === 'solution') return t('pos_solution');
    if (lower === 'mind') return t('pos_mind');
    if (lower === 'body') return t('pos_body');
    if (lower === 'spirit') return t('pos_spirit');
    if (lower.includes('past root')) return t('pos_past_roots');
    if (lower.includes('present focus')) return t('pos_present_focus');
    if (lower.includes('hidden influence')) return t('pos_hidden_influences');
    if (lower.includes('action advice')) return t('pos_action_advice');
    if (lower.includes('projected outcome')) return t('pos_projected_outcome');
    if (lower.includes('crossroads')) return t('pos_the_crossroads');
    if (lower.includes('path a: opportunity')) return t('pos_path_a_opportunity');
    if (lower.includes('path a: challenge')) return t('pos_path_a_challenge');
    if (lower.includes('path b: opportunity')) return t('pos_path_b_opportunity');
    if (lower.includes('path b: challenge')) return t('pos_path_b_challenge');
    if (lower.includes('past influence')) return t('pos_past_influences');
    if (lower.includes('present circumstance')) return t('pos_present_circumstance');
    if (lower.includes('hidden factor')) return t('pos_hidden_factors');
    if (lower.includes('the obstacle')) return t('pos_the_obstacle');
    if (lower.includes('external environment')) return t('pos_external_environment');
    if (lower.includes('recommended action')) return t('pos_recommended_action');
    if (lower.includes('final resolution')) return t('pos_final_resolution');

    return position;
  };

  const getOrientationLabel = (orientation: 'upright' | 'reversed'): string => {
    if (!isMyanmar) return orientation === 'upright' ? 'Upright' : 'Reversed';
    return orientation === 'upright' ? t('orientation_upright') : t('orientation_reversed');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isMyanmar,
        getCardName,
        getCategoryLabel,
        getSpreadLabel,
        getPositionLabel,
        getOrientationLabel,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

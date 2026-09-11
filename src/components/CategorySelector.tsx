import React from 'react';
import { READING_CATEGORIES } from '../data/spreads';
import { ReadingCategory } from '../types/tarot';
import { Compass, Heart, Briefcase, Coins, Sparkles, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CategorySelectorProps {
  selectedCategory: ReadingCategory;
  onSelectCategory: (cat: ReadingCategory) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { t, getCategoryLabel } = useLanguage();

  const getIcon = (cat: ReadingCategory) => {
    switch (cat) {
      case 'General Life':
        return <Compass className="w-4 h-4" />;
      case 'Love & Relationships':
        return <Heart className="w-4 h-4" />;
      case 'Career':
        return <Briefcase className="w-4 h-4" />;
      case 'Money & Finance':
        return <Coins className="w-4 h-4" />;
      case 'Future':
        return <Sparkles className="w-4 h-4" />;
      case 'Personal Growth':
        return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-200 tracking-wide">
        {t('setup_category_label')}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {READING_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              id={`category-btn-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center space-x-2.5 ${
                isSelected
                  ? 'bg-amber-400/15 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20'
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  isSelected ? 'bg-amber-400/25 text-amber-300' : 'bg-white/5 text-slate-400'
                }`}
              >
                {getIcon(cat.id)}
              </div>
              <span className="text-xs sm:text-sm font-medium leading-tight whitespace-nowrap">
                {getCategoryLabel(cat.id)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

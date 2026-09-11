import React, { useState } from 'react';
import { Sparkles, History, Compass, Menu, X, BookOpen, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isMyanmar } = useLanguage();

  const navItems = [
    { label: t('nav_home'), route: '/', icon: Compass, id: 'home' },
    { label: t('nav_start_reading'), route: '/reading', icon: Sparkles, id: 'reading' },
    { label: t('nav_card_codex'), route: '/cards', icon: BookOpen, id: 'codex' },
    { label: t('nav_reading_history'), route: '/history', icon: History, id: 'history' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080718]/80 border-b border-amber-500/15 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            id="nav-logo-button"
            onClick={() => {
              onNavigate('/');
              setMobileMenuOpen(false);
            }}
            className="group flex items-center space-x-3 cursor-pointer text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 via-purple-600/20 to-amber-500/10 border border-amber-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-amber-400/70 transition-colors">
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
                {t('nav_brand')}
              </div>
              <div className="text-[10px] tracking-[0.2em] text-amber-400/70 uppercase font-medium">
                {t('nav_brand_subtitle')}
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.route)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-200 border border-amber-400/30 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                      : 'text-slate-300 hover:text-amber-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Language Switcher Pill */}
            <div
              id="language-switcher-desktop"
              className="ml-2 flex items-center bg-white/[0.05] border border-white/10 rounded-xl p-0.5"
            >
              <button
                type="button"
                id="lang-btn-en"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                id="lang-btn-my"
                onClick={() => setLanguage('my')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  language === 'my'
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="မြန်မာဘာသာသို့ ပြောင်းရန်"
              >
                မြန်မာ
              </button>
            </div>

            <button
              id="nav-quick-start-cta"
              onClick={() => onNavigate('/reading')}
              className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold tracking-wide bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMyanmar ? 'တားရော့မေးမြန်းမည်' : 'Consult Oracle'}</span>
            </button>
          </div>

          {/* Mobile Right Bar: Language pill & Hamburger Button */}
          <div className="md:hidden flex items-center space-x-2">
            <div
              id="language-switcher-mobile"
              className="flex items-center bg-white/[0.05] border border-white/10 rounded-xl p-0.5"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('my')}
                className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                  language === 'my'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400'
                }`}
              >
                မြန်မာ
              </button>
            </div>

            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-amber-200 hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 bg-[#0A081E] border-b border-amber-500/20 space-y-2 animate-in fade-in slide-in-from-top-3 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all text-left ${
                  isActive
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/30'
                    : 'text-slate-300 hover:text-amber-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('/reading');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('hero_cta_primary')}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

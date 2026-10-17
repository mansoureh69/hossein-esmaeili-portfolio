import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { fa } from './fa';
import { questionnaireFa } from './questionnaire';
import * as content from '../data/portfolio';
type Language = 'en' | 'fa';
const storageKey = 'hossein-portfolio-language';
function initialLanguage(): Language {
  try { const saved = localStorage.getItem(storageKey); if (saved === 'fa' || saved === 'en') return saved; } catch { /* Storage may be disabled. */ }
  return navigator.language.toLowerCase().startsWith('fa') ? 'fa' : 'en';
}
const Context = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (text: string) => string }>({ language: 'en', setLanguage: () => {}, t: text => text });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const value = useMemo(() => ({ language, setLanguage, t: (text: string) => language === 'fa' ? questionnaireFa[text] ?? fa[text] ?? text : text }), [language]);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.title = `${value.t('Hossein Esameili')} — ${value.t('Electrical Engineer')}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', value.t(content.profile.introduction));
    try { localStorage.setItem(storageKey, language); } catch { /* The switch still works without persistence. */ }
  }, [language, value]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useLanguage = () => useContext(Context);
function translateContent<T>(value: T, t: (s: string) => string): T {
  if (typeof value === 'string') return t(value) as T;
  if (Array.isArray(value)) return value.map(item => translateContent(item, t)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, ['id', 'url', 'heroImage', 'resumeUrl', 'email', 'endpoint', 'visual', 'src'].includes(key) ? item : translateContent(item, t)])) as T;
  return value;
}
export function usePortfolio() {
  const { t } = useLanguage();
  return useMemo(() => translateContent(content, t), [t]);
}
export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return <button className="language-switch" type="button" onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')} lang={language === 'fa' ? 'en' : 'fa'} aria-label={language === 'fa' ? 'Switch to English' : 'تغییر زبان به فارسی'}><span aria-hidden="true">◎</span>{language === 'fa' ? 'EN' : 'فارسی'}</button>;
}


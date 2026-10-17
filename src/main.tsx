import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/onest';
import './styles/global.css';
import './styles/design-system.css';
// Load the local variable fonts before the first render to avoid a fallback-font swap.
Promise.allSettled([
  document.fonts.load('400 16px "Onest Variable"'),
  document.fonts.load('400 16px "Vazirmatn Variable"'),
  document.fonts.load('400 16px "Vazirmatn Variable"', 'فارسی'),
]).then(async () => {
  const Page = import.meta.env.DEV && window.location.pathname === '/design-system'
    ? (await import('./components/DesignSystem')).default
    : App;
  ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><LanguageProvider><Page /></LanguageProvider><SpeedInsights /></React.StrictMode>);
});



import './styles/editorial.css';

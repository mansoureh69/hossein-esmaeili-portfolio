import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DesignSystem from './components/DesignSystem';
import { LanguageProvider } from './i18n/LanguageContext';
import '@fontsource-variable/vazirmatn';
import './styles/global.css';
import './styles/design-system.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><LanguageProvider>{window.location.pathname === '/design-system' ? <DesignSystem /> : <App />}</LanguageProvider></React.StrictMode>);



import './styles/editorial.css';

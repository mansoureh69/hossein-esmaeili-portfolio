import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage, usePortfolio } from '../i18n/LanguageContext';
import { Pill } from './Shared';
import LiquidReveal from './LiquidReveal';

export default function Hero({ ready, contactHref }: { ready: boolean; contactHref: string }) {
  const { t, language } = useLanguage();
  const { profile, themes } = usePortfolio();
  const [index, setIndex] = useState(0);
  return <section className="hero editorial-hero immersive-hero" id="home" tabIndex={-1} aria-labelledby="hero-title" data-ready={ready}>
    <LiquidReveal />
    <div className="shell hero-content">
      <div className="hero-main">
        <p className="eyebrow"><span className="tiny-dot" />{profile.title}</p>
        <h1 id="hero-title"><span>{t('Electrical design')}</span><span>{t('built for execution')}</span><span className="hero-heading-note">{t('From drawings to site supervision')}</span></h1>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-buttons"><Pill href={contactHref}>{t('Send your drawings')}</Pill><Pill outline arrow={false} href="#projects">{t('Explore Projects')}</Pill></div>
        <dl className="hero-proof">
          <div><dt>{t('Professional experience')}</dt><dd>{t('7+ years')}</dd></div>
          <div><dt>{t('Design & supervision project area')}</dt><dd>{t('300,000+ m²')}</dd></div>
        </dl>
      </div>
      <div className="hero-visual-column">
        <aside className="focus-card" aria-label={t('Engineering themes')}>
          <div className="focus-copy" aria-live="polite"><p>{themes[index].title}</p><h2>{themes[index].text.replace(/\.+$/, '')}</h2></div>
          <div className="focus-controls"><span>{(index + 1).toLocaleString(language)} / {themes.length.toLocaleString(language)}</span><div>
            <button aria-label={t('Previous theme')} onClick={() => setIndex(i => (i + themes.length - 1) % themes.length)}><ArrowLeft size={18} /></button>
            <button aria-label={t('Next theme')} onClick={() => setIndex(i => (i + 1) % themes.length)}><ArrowRight size={18} /></button>
          </div></div>
        </aside>
      </div>
    </div>
    <div className="shell hero-status"><span>{profile.biography.location}</span><span>{t('Electrical Engineering')}</span><a href="#projects">{t('Explore the work')}<ArrowDown size={16} /></a></div>
  </section>;
}

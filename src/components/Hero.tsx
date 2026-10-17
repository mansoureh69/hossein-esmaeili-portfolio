import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage, usePortfolio } from '../i18n/LanguageContext';
import { Pill } from './Shared';
import LiquidReveal from './LiquidReveal';

export default function Hero({ ready, onContact }: { ready: boolean; onContact: () => void }) {
  const { t, language } = useLanguage();
  const { profile, themes } = usePortfolio();
  const [index, setIndex] = useState(0);
  return <section className="hero editorial-hero immersive-hero" id="home" tabIndex={-1} aria-labelledby="hero-title" data-ready={ready}>
    <LiquidReveal />
    <div className="shell hero-content">
      <div className="hero-main">
        <p className="eyebrow"><span className="tiny-dot" />{t('Electrical Engineer')}</p>
        <h1 id="hero-title"><span>{t('Electrical design.')}</span><span>{t('Project supervision.')}</span><span className="hero-heading-note">{t('Built on experience.')}</span></h1>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-buttons"><Pill href="#projects">{t('Explore Projects')}</Pill><Pill outline arrow={false} onClick={onContact}>{t('Get in Touch')}</Pill></div>
        <p className="hero-credential">{t('Seven years of electrical engineering for buildings.')}</p>
      </div>
      <div className="hero-visual-column">
        <aside className="focus-card" aria-label={t('Engineering themes')}>
          <div className="focus-copy" aria-live="polite"><p>{themes[index].title}</p><h2>{themes[index].text}</h2></div>
          <div className="focus-controls"><span>{(index + 1).toLocaleString(language)} / {themes.length.toLocaleString(language)}</span><div>
            <button aria-label={t('Previous theme')} onClick={() => setIndex(i => (i + themes.length - 1) % themes.length)}><ArrowLeft size={18} /></button>
            <button aria-label={t('Next theme')} onClick={() => setIndex(i => (i + 1) % themes.length)}><ArrowRight size={18} /></button>
          </div></div>
        </aside>
        <p className="hero-image-label">{t("Concept illustration")}</p>
      </div>
    </div>
    <div className="shell hero-status"><span>{profile.biography.location}</span><span>{t('Electrical Engineering')}</span><a href="#projects">{t('Explore the work')}<ArrowDown size={16} /></a></div>
  </section>;
}

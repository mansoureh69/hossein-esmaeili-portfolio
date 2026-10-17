import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { useLanguage, usePortfolio } from '../i18n/LanguageContext';
import { Reveal } from './Shared';

export default function Capabilities() {
  const { t } = useLanguage();
  const { capabilities } = usePortfolio();
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [preference, setPreference] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    }, { threshold: 0.15 });
    if (section.current) observer.observe(section.current);
    const sync = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (loaded && visible && !hidden && !failed && (preference ?? !reduced)) {
      void element.play().catch(() => setPlaying(false));
    } else element.pause();
  }, [loaded, visible, hidden, reduced, preference, failed]);
  return <section ref={section} id="expertise" className="section shell capabilities expertise-video-section" tabIndex={-1}>
    <video ref={video} className="expertise-background-video" src={loaded ? '/videos/expertise-cad.mp4' : undefined}
      muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
    <div className="expertise-video-shade" aria-hidden="true" />
    <div className="expertise-video-content">
      <Reveal className="section-heading"><span className="section-kicker">{t('Services for your project')}</span><h2>{t('From design intent to installation')}</h2><p>{t('Choose a complete electrical design package or focused support for drawings, system calculations and site supervision.')}</p></Reveal>
      {!failed && <button className="expertise-video-control" type="button" onClick={() => {
        if (playing) { setPreference(false); video.current?.pause(); }
        else { setPreference(true); void video.current?.play().catch(() => setPlaying(false)); }
      }} aria-label={t(playing ? 'Pause background video' : 'Play background video')}>
        {playing ? <Pause size={16} /> : <Play size={16} />}<span>{t(playing ? 'Pause background video' : 'Play background video')}</span>
      </button>}
      <div className="focus-grid">{capabilities.map((item, i) => <Reveal key={item.title} delay={i * .06}>
        <article className="focus-block"><span className="focus-number" aria-hidden="true">0{i + 1}</span><h3>{item.title}</h3><p>{item.detail}</p><div className="technical-rule" aria-hidden="true"><i /><i /><i /></div></article>
      </Reveal>)}</div>
    </div>
  </section>;
}

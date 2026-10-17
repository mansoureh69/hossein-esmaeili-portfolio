import { useLanguage } from './i18n/LanguageContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import PageLoader from './components/PageLoader';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Capabilities from './components/Capabilities';
import Process from './components/Process';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NavigationOverlay from './components/NavigationOverlay';
import ContactDialog from './components/ContactDialog';
type Overlay = {
    type: 'navigation';
} | {
    type: 'contact';
} | null;
export default function App() {
    const { t } = useLanguage();
    const [ready, setReady] = useState(false);
    const [overlay, setOverlay] = useState<Overlay>(null);
    const pendingNav = useRef<string | null>(null);
    const reduced = useReducedMotion();
    const lenis = useSmoothScroll(!ready || !!overlay);
    const finishIntro = useCallback(() => setReady(true), []);
    const close = useCallback(() => setOverlay(null), []);
    const contact = useCallback(() => setOverlay({ type: 'contact' }), []);
    useEffect(() => {
        if (overlay || !pendingNav.current)
            return;
        const id = pendingNav.current;
        pendingNav.current = null;
        const frame = requestAnimationFrame(() => { const target = document.getElementById(id); if (target) {
            lenis.current?.scrollTo(target, { offset: -(document.querySelector('.header')?.getBoundingClientRect().height ?? 0) - 16, immediate: !!reduced, onComplete: () => target.focus({ preventScroll: true }) });
            history.replaceState(null, '', `#${id}`);
        } });
        return () => cancelAnimationFrame(frame);
    }, [overlay, lenis, reduced]);
    return <MotionConfig reducedMotion="user"><a className="skip" href="#main">{t("Skip to content")}</a><PageLoader onComplete={finishIntro}/><div inert={!ready}><Header ready={ready} onMenu={() => setOverlay({ type: 'navigation' })} onContact={contact}/><main id="main" tabIndex={-1}><Hero ready={ready} onContact={contact}/><Projects /><About /><Capabilities /><Process /><Experience /><Skills /><Contact onContact={contact}/></main><Footer onContact={contact}/></div>{overlay?.type === 'navigation' && <NavigationOverlay onClose={close} onContact={contact} onNavigate={id => { pendingNav.current = id; close(); }}/>}{overlay?.type === 'contact' && <ContactDialog onClose={close}/>}</MotionConfig>;
}


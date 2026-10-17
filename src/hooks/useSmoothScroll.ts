import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';
export function useSmoothScroll(locked: boolean) {
  const instance = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: !reduced, duration: 1.05 });
    instance.current = lenis;
    let frame = 0;
    const tick = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const target = link?.getAttribute('href');
      if (!target || target.length < 2) return;
      const element = document.getElementById(target.slice(1));
      if (element) { event.preventDefault(); lenis.scrollTo(element, { offset: -(document.querySelector('.header')?.getBoundingClientRect().height ?? 0) - 16, immediate: !!reduced, onComplete: () => { element.focus({ preventScroll: true }); } }); history.replaceState(null, '', target); }
    };
    document.addEventListener('click', navigate);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('click', navigate); lenis.destroy(); instance.current = null; };
  }, [reduced]);
  useEffect(() => {
    const html = document.documentElement;
    if (locked) { instance.current?.stop(); html.style.overflow = 'hidden'; }
    else { instance.current?.start(); html.style.removeProperty('overflow'); }
    return () => { html.style.removeProperty('overflow'); };
  }, [locked, reduced]);
  return instance;
}

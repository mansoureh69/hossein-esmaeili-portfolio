import { useLanguage } from '../i18n/LanguageContext';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
export default function Dialog({ children, onClose, titleId, className = '' }: {
    children: ReactNode;
    onClose: () => void;
    titleId: string;
    className?: string;
}) {
    const { t } = useLanguage();
    const ref = useRef<HTMLDialogElement>(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    const reduced = useReducedMotion();
    useEffect(() => {
        const dialog = ref.current!;
        const previous = document.activeElement as HTMLElement | null;
        dialog.showModal();
        const cancel = (e: Event) => { e.preventDefault(); closeRef.current(); };
        const trapFocus = (event: KeyboardEvent) => {
            if (event.key !== 'Tab')
                return;
            const focusable = [...dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex="0"]')].filter(el => el.getClientRects().length > 0);
            const first = focusable[0], last = focusable.at(-1);
            if (!first || !last)
                return;
            if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        };
        dialog.addEventListener('cancel', cancel);
        dialog.addEventListener('keydown', trapFocus);
        return () => { dialog.removeEventListener('cancel', cancel); dialog.removeEventListener('keydown', trapFocus); dialog.close(); previous?.focus({ preventScroll: true }); };
    }, []);
    return <dialog ref={ref} className={`dialog ${className}`} aria-labelledby={titleId} onClick={event => {
            if (event.target === event.currentTarget)
                onClose();
        }}><motion.div className="dialog-panel" data-lenis-prevent initial={{ opacity: 0, y: reduced ? 0 : 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .4, ease: [.16, 1, .3, 1] }}><button className="dialog-close" onClick={onClose} aria-label={t("Close dialog")} autoFocus><X size={20}/></button>{children}</motion.div></dialog>;
}

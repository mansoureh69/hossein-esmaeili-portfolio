import { useLanguage, usePortfolio } from '../i18n/LanguageContext';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
export function Brand({ short = false }: {
    short?: boolean;
}) {
    const { t } = useLanguage();
    return <span className="brand"><img className="brand-mark brand-mark-dark" src="/images/hossein-mark.svg" alt="" width="128" height="160" /><img className="brand-mark brand-mark-light" src="/images/hossein-mark-light.svg" alt="" width="128" height="160" />{!short && <span>{t("Hossein Esameili")}<span className="brand-caption">{t("Electrical Engineer")}</span></span>}</span>;
}
export function Reveal({ children, className = '', delay = 0 }: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const reduce = useReducedMotion();
    return <motion.div className={className} initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: reduce ? 0 : .45, delay: reduce ? 0 : delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}
export function Pill({ children, onClick, href, light = false, outline = false, arrow = true, type = 'button', disabled = false }: {
    children: ReactNode;
    onClick?: () => void;
    href?: string;
    light?: boolean;
    outline?: boolean;
    arrow?: boolean;
    type?: 'button' | 'submit';
    disabled?: boolean;
}) {
    const content = <>{children}{arrow && <span className="button-arrow"><ArrowUpRight size={18} aria-hidden="true"/></span>}</>;
    const className = `pill ${light ? 'light' : outline ? 'outline' : 'dark'} ${arrow ? '' : 'no-arrow'}`;
    return href ? <a href={href} onClick={onClick} className={className}>{content}</a> : <button className={className} type={type} onClick={onClick} disabled={disabled}>{content}</button>;
}
export function SocialLinks() {
    const { profile } = usePortfolio();
    return <>{profile.contact.socials.filter(s => /^https:\/\//.test(s.url)).map(s => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}<ArrowUpRight size={15}/></a>)}</>;
}


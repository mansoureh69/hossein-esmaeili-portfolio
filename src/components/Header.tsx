import { LanguageSwitch, useLanguage, usePortfolio } from '../i18n/LanguageContext';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Brand } from './Shared';
export function LocalClock() {
    const { t, language } = useLanguage();
    const [now, setNow] = useState(() => new Date());
    useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer); }, []);
    return <span className="clock"><span>{t("Your local time")}</span><time dateTime={now.toISOString()}>{now.toLocaleTimeString(language === 'fa' ? 'fa-IR' : 'en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()}</time></span>;
}
export default function Header({ ready, onMenu, contactHref }: {
    ready: boolean;
    onMenu: () => void;
    contactHref: string;
}) {
    const { t } = useLanguage();
    const { navigation } = usePortfolio();
    const reduced = useReducedMotion();
    const [active, setActive] = useState('home');
    useEffect(() => {
        const update = () => {
            const sections = navigation.map(item => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
            const current = sections.filter(el => el.getBoundingClientRect().top <= window.innerHeight * .35).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top).at(-1);
            setActive(current?.id ?? 'home');
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, [navigation]);
    return <motion.header className="header" initial={{ opacity: 0, y: reduced ? 0 : -14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: reduced ? 0 : .15 }}><div className="shell header-inner"><a href="#home" aria-label={t("Hossein Esmaeili, home")}><Brand /></a><nav aria-label={t("Primary")}><ul>{navigation.map(item => <li key={item.id}>{item.id === 'contact' ? <a className="header-contact" href={contactHref}>{item.label}</a> : <a aria-current={active === item.id ? "location" : undefined} href={`#${item.id}`}>{item.label}</a>}</li>)}</ul></nav><div className="header-actions"><LanguageSwitch /><button className="menu-button" onClick={onMenu} aria-label={t("Open navigation")}><Menu size={17}/><span>{t("Menu")}</span></button></div></div></motion.header>;
}

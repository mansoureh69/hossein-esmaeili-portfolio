import { LanguageSwitch, useLanguage, usePortfolio } from '../i18n/LanguageContext';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './Shared';
import Dialog from './Dialog';
export default function NavigationOverlay({ onClose, onNavigate, onContact }: {
    onClose: () => void;
    onNavigate: (id: string) => void;
    onContact: () => void;
}) {
    const { t } = useLanguage();
    const { navigation } = usePortfolio();
    const reduced = useReducedMotion();
    return <Dialog onClose={onClose} titleId="navigation-title" className="navigation-dialog"><div className="nav-brand"><Brand /></div><h2 className="sr-only" id="navigation-title">{t("Navigation")}</h2><nav aria-label={t("Full navigation")}>{navigation.map((item, i) => <motion.button key={item.id} initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : i * .045 + .08 }} onClick={() => item.id === 'contact' ? onContact() : onNavigate(item.id)}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={32}/></motion.button>)}</nav><div className="nav-footer"><LanguageSwitch /><button onClick={onContact}>{t("Get in Touch")}<ArrowUpRight size={18}/></button></div></Dialog>;
}

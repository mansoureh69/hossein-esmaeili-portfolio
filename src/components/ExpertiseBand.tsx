import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Shared';
export default function ExpertiseBand() {
    const { t } = useLanguage();
    return <section className="shell expertise-band" aria-label={t("Analyze, design, validate")}>{[t("Analyze"), t("Design"), 'arrow', t("Validate")].map((word, i) => <Reveal key={word} delay={i * .12} className={`band-item band-${i}`}><div>{word === 'arrow' ? <ArrowRight size={48} strokeWidth={1.5} aria-label={t("then")}/> : word}</div></Reveal>)}</section>;
}

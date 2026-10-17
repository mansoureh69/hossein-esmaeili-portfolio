import { useLanguage, usePortfolio } from '../i18n/LanguageContext';
import { ArrowDownRight } from 'lucide-react';
import { Reveal } from './Shared';
export default function Skills() {
    const { t } = useLanguage();
    const { skills } = usePortfolio();
    return <section className="shell section skills"><Reveal className="section-heading"><h2>{t("Technical Focus")}</h2><p>{t("From detailed electrical drawings to specialist technical advice.")}</p></Reveal><div className="skill-rows">{skills.map((group, i) => <Reveal key={group.category} delay={i * .07} className="skill-row"><h3><ArrowDownRight size={19}/>{group.category}</h3><ul>{group.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></Reveal>)}</div></section>;
}

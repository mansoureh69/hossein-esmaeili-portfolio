import { useLanguage, usePortfolio } from '../i18n/LanguageContext';
export default function ContactOptions() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();
  return <div className="direct-contact"><p>{t('Attach your drawings in your email app, or send them through Telegram.')}</p>
    <div className="direct-contact-links"><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a><a href={profile.contact.phoneUrl} dir="ltr">{profile.contact.phone}</a>{profile.contact.socials.filter(s => s.url).map(s => <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
  </div>;
}

import { useLanguage, usePortfolio } from '../i18n/LanguageContext';
import { Mail, Phone, Send, Instagram, Linkedin, ExternalLink } from 'lucide-react';
export default function ContactOptions() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();
  return <div className="direct-contact"><p>{t('Attach your drawings in your email app, or send them through Telegram.')}</p>
    <div className="direct-contact-links">
      <a href={`mailto:${profile.contact.email}`} aria-label={t('Email')} title={t('Email')}><Mail size={22} aria-hidden="true" /></a>
      <a href={profile.contact.phoneUrl} aria-label={t('Phone')} title={t('Phone')}><Phone size={22} aria-hidden="true" /></a>
      {profile.contact.socials.filter(s => s.url).map(s => {
        const Icon = s.label === t('Telegram') ? Send : s.label === t('Instagram') ? Instagram : s.label === t('LinkedIn') ? Linkedin : ExternalLink;
        return <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}><Icon size={22} aria-hidden="true" /></a>;
      })}
    </div>
  </div>;
}

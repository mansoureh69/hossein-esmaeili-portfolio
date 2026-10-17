import { Brand, Pill } from './Shared';
import { LanguageSwitch, useLanguage } from '../i18n/LanguageContext';
const colors = ['paper','card','concrete','graphite','steel','copper'] as const;
export default function DesignSystem() {
  const { language } = useLanguage();
  const fa = language === 'fa';
  return <main className="shell system-page">
    <header className="system-header"><Brand /><LanguageSwitch /><a href="/">{fa ? 'بازگشت به سایت' : 'Back to portfolio'}</a></header>
    <p className="section-kicker">HOSSEIN ESAMEILI / DESIGN SYSTEM 01</p>
    <h1>{fa ? 'دقیق، روشن، یکپارچه' : 'Precise. Clear. Consistent'}</h1>
    <p className="body-copy">{fa ? 'هویت بصری برگرفته از معماری: کاغذ گرم، گرافیت و تأکید مسی.' : 'An architectural identity built from warm paper, graphite and a restrained copper accent.'}</p>
    <section><h2>{fa ? 'رنگ و سطوح' : 'Color & surfaces'}</h2><div className="system-swatches">{colors.map(color => <div key={color}><div className={`swatch swatch-${color}`} /><h3>{color}</h3><code>--color-{color}</code></div>)}</div></section>
    <section><h2>{fa ? 'تایپوگرافی' : 'Typography'}</h2><div className="system-type"><h3>{fa ? 'طراحی برق. نظارت پروژه' : 'Electrical design. Project supervision'}</h3><p>{fa ? 'وزیرمتن برای فارسی؛ آنست برای انگلیسی. عنوان‌های متعادل، متن خوانا و فاصله‌گذاری منظم.' : 'Onest for English. Vazirmatn for Persian. Balanced headings, readable body copy and generous spacing.'}</p><code>Display 32–72 · Heading 24–64 · Body 14–16 · Label 12–14</code></div></section>
    <section><h2>{fa ? 'اجزا و تعامل' : 'Components & interaction'}</h2><div className="system-components"><Pill href="/#projects">{fa ? 'مشاهده پروژه‌ها' : 'Explore projects'}</Pill><Pill href="/#contact" outline>{fa ? 'ارتباط با من' : 'Get in touch'}</Pill><span className="illustrative">{fa ? 'سابقه پروژه' : 'Project record'}</span><div className="tags"><span>36,000 m²</span></div></div><p className="body-copy">{fa ? 'فوکوس خوانا، حرکت محدود هنگام هاور و پشتیبانی از کاهش حرکت.' : 'Visible focus rings, restrained hover movement, and reduced-motion support.'}</p></section>
    <section><h2>{fa ? 'قواعد چیدمان' : 'Layout rules'}</h2><div className="system-type"><p>{fa ? 'فاصله‌گذاری باز، گوشه‌های محدود، اسلایدر پروژه شاخص و خدمات خوانا. زمینه عاجی، متن زغالی و جزئیات مسی.' : 'Generous spacing, restrained corners, a featured project carousel and open service blocks. Warm ivory surfaces, charcoal text and copper details.'}</p></div></section>
  </main>;
}


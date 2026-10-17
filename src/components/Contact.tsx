import ContactOptions from "./ContactOptions";
import { useLanguage } from "../i18n/LanguageContext";
import { ArrowUpRight } from "lucide-react";
import { Pill, Reveal } from "./Shared";
export default function Contact({ contactHref }: { contactHref: string }) {
  const { t } = useLanguage();

  return (
    <section id="contact" className="shell contact-wrap" tabIndex={-1}>
      <Reveal className="contact-panel">
        <div className="contact-symbol" aria-hidden="true">
          <ArrowUpRight strokeWidth={0.65} />
        </div>
        <span className="section-kicker">{t("Let\u2019s connect")}</span>
        <h2>
          {t("Planning a building project?")}
        </h2>
        <p>
          {t(
            "Send your drawings and specifications by email or Telegram, or call to discuss your project.",
          )}
        </p>
        <ContactOptions />
        <div className="contact-actions">
          <Pill light href={contactHref}>
            {t("Get in Touch")}
          </Pill>
        </div>
      </Reveal>
    </section>
  );
}

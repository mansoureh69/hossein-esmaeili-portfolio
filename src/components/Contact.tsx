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
          {t("Let’s define your electrical scope")}
        </h2>
        <p>
          {t(
            "Planning a new build, preparing construction drawings or looking for site supervision? Share your plans to discuss the engineering support your project needs.",
          )}
        </p>
        <p className="contact-brief">{t("Include your location, building use, approximate area, project stage and target schedule. Architectural plans or existing electrical drawings are a useful starting point.")}</p>
        <ContactOptions />
        <div className="contact-actions">
          <Pill light href={contactHref}>
            {t("Send your drawings")}
          </Pill>
        </div>
      </Reveal>
    </section>
  );
}

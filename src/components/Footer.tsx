import { useLanguage, usePortfolio } from "../i18n/LanguageContext";
import { ArrowUp, Instagram, Linkedin, Send } from "lucide-react";
import { Brand } from "./Shared";
const socialIcons = {
  Instagram,
  LinkedIn: Linkedin,
  Telegram: Send,
};
export default function Footer({ contactHref }: { contactHref: string }) {
  const { t, language } = useLanguage();
  const { navigation, profile } = usePortfolio();
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <a href="#home">
              <Brand />
            </a>
            <p>
              {t("Electrical design, construction documentation and site supervision. Based in Tehran. Available for remote collaboration.")}
            </p>
          </div>
          <nav aria-label={t("Footer")}>
            {navigation
              .filter((n) => n.id !== "home")
              .map((item) =>
                item.id === "contact" ? (
                  <a key={item.id} href={contactHref}>
                    {item.label}
                  </a>
                ) : (
                  <a key={item.id} href={`#${item.id}`}>
                    {item.label}
                  </a>
                ),
              )}
          </nav>
          <div className="footer-socials">
            <div
              className="footer-social-list"
              role="group"
              aria-label={t("Social links")}
            >
              {profile.contact.socials.filter(s => s.url).map((s) => {
                const name = (
                  Object.keys(socialIcons) as Array<keyof typeof socialIcons>
                ).find((label) => t(label) === s.label);
                const Icon = name ? socialIcons[name] : null;
                if (!Icon || !name) return null;
                const icon = <Icon size={17} aria-hidden="true" />;
                return /^https:\/\//.test(s.url) ? (
                  <a
                    className={`social-button social-${name.toLowerCase()}`}
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                  >
                    {icon}
                    <span>{s.label}</span>
                  </a>
                ) : (
                  <button
                    className="social-button"
                    key={s.label}
                    type="button"
                    disabled
                    title={t("Link coming soon")}
                    aria-label={`${s.label}: ${t("Link coming soon")}`}
                  >
                    {icon}
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
            <a className="back-top" href="#home" aria-label={t("Back to top")}>
              <ArrowUp size={20} />
            </a>
          </div>
        </div>
        <div className="footer-legal">
          <span>
            ©{" "}
            {new Date()
              .getFullYear()
              .toLocaleString(language === "fa" ? "fa-IR" : "en-US", {
                useGrouping: false,
              })}{" "}
          </span>
          <span>{t("Electrical Engineer")}</span>
        </div>
      </div>
    </footer>
  );
}

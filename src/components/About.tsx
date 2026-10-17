import { useLanguage, usePortfolio } from "../i18n/LanguageContext";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Pill, Reveal, SocialLinks } from "./Shared";
export default function About() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();
  const reduced = useReducedMotion();
  const words = t("Engineering experience grounded in construction")
    .replace(/\.+$/, "")
    .split(" ");
  const fields = [
    [t("Specialization"), profile.biography.specialization],
    [t("Location"), profile.biography.location],
    [t("Professional role"), profile.biography.currentRole],
    [t("Project sectors"), profile.biography.interests],
  ];
  return (
    <section id="about" className="section shell about" tabIndex={-1}>
      <Reveal className="about-visual">
        <p className="eyebrow">{t("About")}</p>
        <p className="visual-caption">
          {t("From electrical plans")}{" "}
          <span>{t("to on-site supervision.")}</span>
        </p>
      </Reveal>
      <div className="about-copy">
        <motion.h2
          className="about-statement"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: reduced ? 0 : 0.035 }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.h2>
        <Reveal delay={0.1}>
          <p className="body-copy">
            {t(
              "With 7+ years of experience across 300,000+ m² of building projects, I connect electrical design with the realities of installation. I work with developers, architects and construction teams on residential, commercial and office buildings, from detailed drawings to site supervision.",
            )}
          </p>
          <ul className="about-credentials" aria-label={t("Professional credentials")}>
            <li>{t("Tehran Engineering Organization licence")}</li>
            <li>{t("Fire alarm systems certificate — Tehran Fire Department")}</li>
            <li>{t("AutoCAD documentation · DIALux lighting design")}</li>
          </ul>
          <dl className="bio-details">
            {fields.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value || t("Details to be added")}</dd>
              </div>
            ))}
          </dl>
          <div className="about-links">
            <Pill href="#experience" outline>
              {t("View Experience")}
            </Pill>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download>
                {t("Download r\u00E9sum\u00E9")}
                <ArrowUpRight size={16} />
              </a>
            )}
            <SocialLinks />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

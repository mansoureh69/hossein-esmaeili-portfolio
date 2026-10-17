import { useLanguage, usePortfolio } from "../i18n/LanguageContext";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Pill, Reveal, SocialLinks } from "./Shared";
export default function About() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();
  const reduced = useReducedMotion();
  const words = t("Seven years of electrical engineering for buildings.")
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
              "Based in Tehran, I work on electrical drawings, execution documentation and supervision for residential, commercial and office buildings. I also collaborate remotely and travel for supervision and execution-drawing projects.",
            )}
          </p>
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

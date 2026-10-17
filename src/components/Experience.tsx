import { useLanguage, usePortfolio } from "../i18n/LanguageContext";
import { BriefcaseBusiness, GraduationCap, Award } from "lucide-react";
import { Reveal } from "./Shared";
const icons = [BriefcaseBusiness, GraduationCap, Award];
export default function Experience() {
  const { t } = useLanguage();
  const { experience } = usePortfolio();
  return (
    <section id="experience" className="shell section experience" tabIndex={-1}>
      <Reveal className="section-heading">
        <h2>
          {t("Experience & Education")}
        </h2>
        <p>{t("Professional practice, engineering credentials and specialist training behind each project.")}</p>
      </Reveal>
      <div className="timeline">
        {experience.map((group, i) => {
          const Icon = icons[i];
          return (
            <Reveal
              key={group.title}
              delay={i * 0.1}
              className="timeline-group"
            >
              <span className="timeline-icon">
                <Icon size={21} strokeWidth={1.5} />
              </span>
              <div>
                <h3>{group.title}</h3>
                {group.entries.length ? (
                  group.entries.map((entry) => (
                    <article key={`${entry.title}-${entry.startDate}`}>
                      {entry.startDate && (
                        <span className="timeline-date">
                          {entry.startDate}
                          {entry.endDate ? ` — ${entry.endDate}` : ""}
                        </span>
                      )}
                      <h4>{entry.title}</h4>
                      <p>
                        {entry.organization}
                        {entry.location ? ` · ${entry.location}` : ""}
                      </p>
                      <p>{entry.description}</p>
                      <ul>
                        {entry.achievements.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </article>
                  ))
                ) : (
                  <>
                    <span className="empty-badge">
                      {t("Details to be added")}
                    </span>
                    <p>{group.empty}</p>
                  </>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

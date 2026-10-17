import { useCallback, useState } from "react";
import { useLanguage, usePortfolio } from "../i18n/LanguageContext";
import { projects as sourceProjects, type Project } from "../data/portfolio";
import ShutterBlindsCarousel from "./ui/shutter-blinds-carousel";
import { Reveal } from "./Shared";



const categories = ["Commercial", "Office & commercial", "Residential", "Office", "Hospitality"] as const;
const categoryGroups: Record<string, string[]> = {
  Retail: ["Commercial"],
  "Office & retail": ["Office & commercial"],
  "Medical building": ["Office & commercial"],
  "Residential & retail": ["Residential", "Commercial"],
  Residential: ["Residential"], Office: ["Office"], Hospitality: ["Hospitality"],
};

const placeholder = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800" viewBox="0 0 1400 800"><rect width="1400" height="800" fill="#d9d5cc"/><g fill="none" stroke="#918b7f" stroke-width="2"><path d="M350 540H1050M420 540V220L700 130L980 220V540M420 220H980M700 130V540M420 320H980M420 420H980"/><path d="M730 510V200M730 280H940M730 380H940M730 480H940" stroke="#b8794d"/></g></svg>`);

function ProjectSlider({ projects }: { projects: Project[] }) {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState(projects[0]?.id);
  const [shownId, setShownId] = useState(projects[0]?.id);
  const ordered = [...projects.filter(p => p.id === selectedId), ...projects.filter(p => p.id !== selectedId)];
  const slides = ordered.flatMap(project => {
    const area = project.tags.find(tag => /m\u00b2|\u0645\u062a\u0631/.test(tag));
    return (project.images?.length ? project.images : [{ src: placeholder }]).map(image => ({
      projectId: project.id,
      image: image.src,
      alt: image.alt || project.title,
      title: project.title,
      caption: project.location,
      category: project.category,
      notice: project.images?.length ? undefined : t("Project photos coming soon"),
      details: <div className="project-details"><strong>{area || t("Area not provided")}</strong>{project.tags.filter(tag => tag !== area).map(tag => <span key={tag}>{tag}</span>)}</div>,
    }));
  });
  const slideIds = slides.map(slide => slide.projectId).join(',');
  const onChange = useCallback((index: number) => setShownId(slideIds.split(',')[index]), [slideIds]);
  return <><ShutterBlindsCarousel key={selectedId} onChange={onChange} slides={slides} className="projects-slider projects-shutter"
    height="clamp(520px, 60vw, 680px)" slats={8} duration={650} stagger={45} autoplay={0}
    direction={language === 'fa' ? 'rtl' : 'ltr'} locale={language} fallbackImage={placeholder}
    previousLabel={t("Previous project")} nextLabel={t("Next project")} ariaLabel={t("Projects")} />
    <div className="project-secondary" aria-label={t("More projects")}>
      {projects.filter(project => project.id !== shownId).slice(0, 2).map(project => <button type="button" key={project.id} onClick={() => { setSelectedId(project.id); setShownId(project.id); }}>
        <span className="secondary-type">{project.category}</span><span className="secondary-title">{project.title}</span><span className="secondary-meta">{project.location}<span>{project.tags[0]}</span></span><span className="secondary-action">{t("Show project")} <span aria-hidden="true">&#8599;</span></span>
      </button>)}
    </div></>;
}

export default function Projects() {
  const { t, language } = useLanguage();
  const { projects } = usePortfolio();
  const [active, setActive] = useState('All projects');
  const matches = (id: string, category: string) => category === 'All projects' || categoryGroups[sourceProjects.find(project => project.id === id)?.category ?? '']?.includes(category);
  const filtered = projects.filter(project => matches(project.id, active));
  return (
    <section id="projects" className="section shell projects-section" tabIndex={-1}>
      <Reveal className="section-heading centered">
        <span className="section-kicker">{t("Ideas into practice")}</span>
        <h2>{t("Selected Engineering")} {t("Projects")}</h2>
        <p>{t("Explore projects by building use.")}</p>
      </Reveal>
      <div className="project-filters" role="group" aria-label={t("Project categories")}>
        {['All projects', ...categories].map(category => <button key={category} type="button" aria-pressed={active === category} aria-controls="project-results" onClick={() => setActive(category)}>{t(category)}<span>{projects.filter(project => matches(project.id, category)).length.toLocaleString(language)}</span></button>)}
      </div>
      <p className="project-result-count" role="status">{filtered.length.toLocaleString(language)} {t("projects shown")}</p>
      <div id="project-results">
        <ProjectSlider key={active} projects={filtered} />
      </div>
    </section>
  );
}


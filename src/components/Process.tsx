import { useLanguage, usePortfolio } from "../i18n/LanguageContext";
import {
  ArrowUpRight,
  ScanLine,
  Shapes,
  CircuitBoard,
  CheckCheck,
} from "lucide-react";
import { Reveal } from "./Shared";
const icons = [ScanLine, Shapes, CircuitBoard, CheckCheck];
export default function Process() {
  const { t } = useLanguage();
  const { process } = usePortfolio();
  return (
    <section className="process-wrap">
      <div className="shell section">
        <Reveal className="section-heading">
          <span className="section-kicker">{t("The working process")}</span>
          <h2>
            {t("From your plans to")}{" "}
            {t("a clear project scope.").replace(/\.+$/, "")}
          </h2>
        </Reveal>
        <ol className="process-grid">
          {process.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title}>
                <Reveal delay={i * 0.1}>
                  <div className="process-line">
                    <span>0{i + 1}</span>
                    <ArrowUpRight size={18} />
                  </div>
                  <Icon className="process-icon" size={38} strokeWidth={1.2} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

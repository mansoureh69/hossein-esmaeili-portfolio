import { useLanguage } from "../i18n/LanguageContext";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Brand } from "./Shared";
export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    let frame = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / (reduced ? 100 : 1300));
      const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setVisible(false);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="loader"
          initial={{ y: 0 }}
          exit={{ y: reduced ? 0 : "-100%", opacity: reduced ? 0 : 1 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-label={t("Introducing Hossein Esmaeili")}
        >
          <Brand />
          <p>
            {t("Electrical engineering.")}
            {t("Thoughtfully executed.")}
          </p>
          <div className="loader-track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="loader-count">
            <span>{t("INTRODUCING")}</span>
            <span>
              {progress.toLocaleString(language === "fa" ? "fa-IR" : "en-US", {
                minimumIntegerDigits: 3,
                useGrouping: false,
              })}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

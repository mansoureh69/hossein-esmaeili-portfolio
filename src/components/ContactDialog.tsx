import ContactOptions from "./ContactOptions";
import { useLanguage, usePortfolio } from "../i18n/LanguageContext";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Check, Info, AlertCircle } from "lucide-react";
import { Pill } from "./Shared";
import Dialog from "./Dialog";
export default function ContactDialog({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const { profile } = usePortfolio();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const controller = useRef<AbortController | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const demo = !profile.contact.endpoint;
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      controller.current?.abort();
    },
    [],
  );
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    if (demo) {
      timer.current = setTimeout(() => setStatus("success"), 650);
      return;
    }
    controller.current = new AbortController();
    try {
      const response = await fetch(profile.contact.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.current.signal,
      });
      if (!response.ok) throw new Error("Delivery failed");
      setStatus("success");
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setStatus("error");
    }
  }
  return (
    <Dialog
      onClose={onClose}
      titleId="contact-dialog-title"
      className="contact-dialog"
    >
      {status === "success" ? (
        <div className="form-success">
          <span className="success-mark">
            <Check size={30} />
          </span>
          <h2 id="contact-dialog-title" ref={successRef} tabIndex={-1}>
            {demo ? t("Demo complete") : t("Message sent")}
          </h2>
          <p>
            {demo
              ? t(
                  "Your message was not sent. Connect a form endpoint to enable delivery.",
                )
              : t(
                  "Thank you for reaching out. Your message has been submitted.",
                )}
          </p>
          <Pill onClick={onClose} arrow={false}>
            {t("Close")}
          </Pill>
        </div>
      ) : (
        <>
          <span className="section-kicker">{t("Get in Touch")}</span>
          <h2 id="contact-dialog-title">
            {t("Let\u2019s discuss")}
            {t("your project.").replace(/\.+$/, "")}
          </h2>
          <ContactOptions />
          {demo && (
            <p className="demo-note">
              <Info size={17} />
              {t("Demo form \u2014 messages are not sent.")}
            </p>
          )}
          <form
            onSubmit={submit}
            onInvalid={(event) => {
              const field = event.target as
                | HTMLInputElement
                | HTMLTextAreaElement;
              field.setCustomValidity(
                field.validity.typeMismatch
                  ? t("Please enter a valid email address.")
                  : t("Please fill out this field."),
              );
            }}
            onInput={(event) => {
              (
                event.target as HTMLInputElement | HTMLTextAreaElement
              ).setCustomValidity("");
            }}
          >
            <label htmlFor="contact-name">{t("Name")}</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              placeholder={t("Your name")}
              maxLength={120}
              disabled={status === "sending"}
            />
            <label htmlFor="contact-email">{t("Email")}</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              required
              placeholder="you@company.com"
              maxLength={254}
              disabled={status === "sending"}
            />
            <label htmlFor="contact-message">{t("Project or message")}</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder={t(
                "The problem, your requirements, and what you have in mind.",
              )}
              maxLength={5000}
              disabled={status === "sending"}
            />
            {status === "error" && (
              <p className="form-error" role="alert">
                <AlertCircle size={18} />
                {t("Your message could not be sent. Please try again.")}
              </p>
            )}
            <div className="form-submit">
              <span aria-live="polite">
                {status === "sending"
                  ? t("Preparing your message\u2026")
                  : t("A good conversation starts here.")}
              </span>
              <Pill type="submit" disabled={status === "sending"}>
                {status === "sending" ? t("Sending\u2026") : t("Send Message")}
              </Pill>
            </div>
          </form>
        </>
      )}
    </Dialog>
  );
}

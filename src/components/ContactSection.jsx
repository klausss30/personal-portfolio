import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion as Motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export default function ContactSection() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setIsSent(false);

    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      window.alert("Contact form is not configured yet.");
      setIsSending(false);
      return;
    }

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        emailConfig.publicKey
      );
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      window.alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
      <Motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl"
      >
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something meaningful."
              description="A short note is all it takes."
            />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <label className="grid gap-2">
              <span className="text-sm font-medium tracking-[0.04em] text-[var(--text-muted)]">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--field-bg)] px-5 py-4 text-base text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text-soft)] focus:border-[var(--text-soft)]"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium tracking-[0.04em] text-[var(--text-muted)]">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--field-bg)] px-5 py-4 text-base text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text-soft)] focus:border-[var(--text-soft)]"
                placeholder="you@example.com"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium tracking-[0.04em] text-[var(--text-muted)]">
                Message
              </span>
              <textarea
                name="message"
                rows="7"
                value={formData.message}
                onChange={handleChange}
                className="resize-none rounded-[1.35rem] border border-[var(--border)] bg-[var(--field-bg)] px-5 py-4 text-base text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text-soft)] focus:border-[var(--text-soft)]"
                placeholder="Tell me a little about your project."
              />
            </label>

            <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-[var(--button)] px-6 py-3.5 text-sm font-medium text-[var(--button-text)] transition-opacity duration-300 hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Submit"}
              </button>
              {isSent ? (
                <p className="text-sm text-[var(--text-soft)]">Message sent.</p>
              ) : null}
            </div>
          </form>
        </div>
      </Motion.div>
    </section>
  );
}

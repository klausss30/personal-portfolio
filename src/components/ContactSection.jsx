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
              <span className="text-sm font-medium tracking-[0.04em] text-[#4f4f55]">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-[1.35rem] border border-[#d9d9df] bg-[linear-gradient(180deg,#ffffff_0%,#fafafd_100%)] px-5 py-4 text-base text-[#111111] outline-none transition-all duration-300 placeholder:text-[#9a9aa1] focus:border-[#bcbcc4] focus:bg-white"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium tracking-[0.04em] text-[#4f4f55]">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-[1.35rem] border border-[#d9d9df] bg-[linear-gradient(180deg,#ffffff_0%,#fafafd_100%)] px-5 py-4 text-base text-[#111111] outline-none transition-all duration-300 placeholder:text-[#9a9aa1] focus:border-[#bcbcc4] focus:bg-white"
                placeholder="you@example.com"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium tracking-[0.04em] text-[#4f4f55]">
                Message
              </span>
              <textarea
                name="message"
                rows="7"
                value={formData.message}
                onChange={handleChange}
                className="resize-none rounded-[1.35rem] border border-[#d9d9df] bg-[linear-gradient(180deg,#ffffff_0%,#fafafd_100%)] px-5 py-4 text-base text-[#111111] outline-none transition-all duration-300 placeholder:text-[#9a9aa1] focus:border-[#bcbcc4] focus:bg-white"
                placeholder="Tell me a little about your project."
              />
            </label>

            <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Submit"}
              </button>
              {isSent ? (
                <p className="text-sm text-[#6e6e73]">Message sent.</p>
              ) : null}
            </div>
          </form>
        </div>
      </Motion.div>
    </section>
  );
}

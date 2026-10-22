'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { useLang } from '@/context/LangProvider';
import { brand, contact, sectionHeaders } from '@/data/content';

type Fields = { name: string; email: string; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { t } = useLang();
  const header = sectionHeaders.contact;
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSent(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = fields.name.trim();
    const email = fields.email.trim();
    const message = fields.message.trim();

    if (!name || !email || !message) {
      setError(t(contact.form.required));
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError(t(contact.form.invalidEmail));
      return;
    }

    const isEn = t(contact.form.required) === contact.form.required.en;
    const subject = isEn
      ? `Portfolio inquiry — ${name}`
      : `ติดต่อจากพอร์ตโฟลิโอ — ${name}`;
    const body = isEn
      ? `Name: ${name}\nEmail: ${email}\n\n${message}`
      : `ชื่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}`;

    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setFields({ name: '', email: '', message: '' });
    setError(null);
    setSent(true);
  };

  return (
    <section id="contact" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mono mb-3 text-muted">
            {header.eyebrow.en}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t(header.title)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t(header.subtitle)}</p>
          <a
            href={`mailto:${brand.email}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lav via-sky to-mint px-7 py-3 text-sm font-semibold text-fg shadow-soft transition hover:scale-[1.04] hover:shadow-softer"
          >
            <Send size={15} aria-hidden="true" />
            {t(contact.emailMe)}
          </a>
        </Reveal>

        {/* Form panel in a soft gray card with a pastel gradient border */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-gradient-to-r from-mint via-sky via-lav to-peach p-px shadow-softer">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl p-6 sm:p-10"
              style={{ background: 'rgb(var(--surface-tint))' }}
            >
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
                {t(contact.form.title)}
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-fg">{t(contact.form.name)}</span>
                  <input
                    type="text"
                    required
                    value={fields.name}
                    onChange={(e) => update('name')(e.target.value)}
                    placeholder={t(contact.form.namePlaceholder)}
                    className="rounded-xl border border-line/10 bg-card px-4 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/50"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-fg">{t(contact.form.email)}</span>
                  <input
                    type="email"
                    required
                    value={fields.email}
                    onChange={(e) => update('email')(e.target.value)}
                    placeholder={t(contact.form.emailPlaceholder)}
                    className="rounded-xl border border-line/10 bg-card px-4 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/50"
                  />
                </label>
              </div>

              <label className="mt-5 flex flex-col gap-2">
                <span className="text-xs font-semibold text-fg">{t(contact.form.message)}</span>
                <textarea
                  required
                  rows={5}
                  value={fields.message}
                  onChange={(e) => update('message')(e.target.value)}
                  placeholder={t(contact.form.messagePlaceholder)}
                  className="resize-none rounded-xl border border-line/10 bg-card px-4 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/50"
                />
              </label>

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky via-lav to-peach px-7 py-3 text-sm font-semibold text-fg shadow-soft transition hover:scale-[1.03] hover:shadow-softer"
                >
                  <Send size={15} aria-hidden="true" />
                  {t(contact.form.submit)}
                </button>

                <p
                  role="status"
                  aria-live="polite"
                  className="text-xs"
                >
                  {error && <span className="text-rose-400">{error}</span>}
                  {sent && (
                    <span className="text-fg">{t(contact.form.submitting)}</span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

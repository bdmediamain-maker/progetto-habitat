'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name:        string;
  email:       string;
  projectType: string;
  message:     string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

// ─── Static content ───────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    icon:  Mail,
    label: 'info@progettohabitat.it',
    href:  'mailto:info@progettohabitat.it',
  },
  {
    icon:  Phone,
    label: '+39 045 8009318',
    href:  'tel:+390458009318',
  },
  {
    icon:  MapPin,
    label: 'Via Carlo Cipolla 16, Verona',
    href:  'https://maps.google.com/?q=Via+Carlo+Cipolla+16+Verona',
  },
] as const;

// English values kept as form-submission keys; display is translated separately
const PROJECT_TYPE_KEYS = [
  { value: 'Residential',     key: 'residential'     },
  { value: 'Hospitality',     key: 'hospitality'     },
  { value: 'Commercial',      key: 'commercial'      },
  { value: 'Interior',        key: 'interior'        },
  { value: 'Bioarchitecture', key: 'bioarchitecture' },
  { value: 'Other',           key: 'other'           },
] as const;

// ─── Animated form field ──────────────────────────────────────────────────────

interface FieldProps {
  label:    string;
  id:       string;
  error?:   string;
  children: React.ReactNode;
  focused:  boolean;
}

function Field({ label, id, error, children, focused }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-body text-[11px] uppercase text-footer-text/40"
        style={{ letterSpacing: '0.15em' }}
      >
        {label}
      </label>

      <div className="relative pb-3">
        {children}

        <motion.div
          className="absolute bottom-0 left-0 h-px w-full"
          animate={{
            backgroundColor: focused
              ? '#DB4A2B'
              : 'rgba(228, 226, 221, 0.28)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1 font-body text-[12px] text-accent-red"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Submit button ────────────────────────────────────────────────────────────

function SubmitButton({ sending }: { sending: boolean }) {
  const t = useTranslations('contact.form');
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="submit"
      disabled={sending}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full overflow-hidden py-4 disabled:opacity-60"
      style={{
        backgroundColor: hovered ? '#F8A348' : '#DB4A2B',
        transition:      'background-color 0.3s ease',
      }}
    >
      <span
        className="flex items-center justify-center gap-3 font-display text-[14px] font-bold uppercase tracking-[0.1em]"
        style={{
          color:      hovered ? '#1E1E1E' : '#ffffff',
          transition: 'color 0.3s ease',
        }}
      >
        {sending ? (
          t('sending')
        ) : (
          <>
            {t('submit')}
            <Send size={14} strokeWidth={2} />
          </>
        )}
      </span>
    </button>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const t = useTranslations('contact');

  const [form, setForm] = useState<FormState>({
    name:        '',
    email:       '',
    projectType: '',
    message:     '',
  });
  const [errors,    setErrors]    = useState<FieldErrors>({});
  const [focused,   setFocused]   = useState<keyof FormState | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);

  function set(key: keyof FormState) {
    return (
      ev: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [key]: ev.target.value }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!form.name.trim())
      errs.name = t('form.error_name');
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t('form.error_email');
    if (!form.message.trim())
      errs.message = t('form.error_message');
    return errs;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSending(true);
    // TODO: replace with API route (e.g. POST /api/contact)
    await new Promise((r) => setTimeout(r, 800));
    console.log('[ContactForm] submission:', form);
    setSending(false);
    setSubmitted(true);
  }

  const inputClass =
    'w-full bg-transparent font-body text-[16px] text-footer-text outline-none placeholder:text-footer-text/30';

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-full flex-col items-start justify-center gap-4 py-12"
      >
        <span className="font-display text-[4vw] font-bold uppercase text-footer-text">
          {t('form.success_title')}
        </span>
        <p className="font-body text-[16px] text-footer-text/60">
          {t('form.success_body')}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

      {/* Name */}
      <Field
        id="name"
        label={t('form.name_label')}
        error={errors.name}
        focused={focused === 'name'}
      >
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={set('name')}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          placeholder={t('form.name_placeholder')}
          className={inputClass}
          autoComplete="name"
        />
      </Field>

      {/* Email */}
      <Field
        id="email"
        label={t('form.email_label')}
        error={errors.email}
        focused={focused === 'email'}
      >
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={set('email')}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          placeholder={t('form.email_placeholder')}
          className={inputClass}
          autoComplete="email"
        />
      </Field>

      {/* Project Type */}
      <Field
        id="projectType"
        label={t('form.type_label')}
        focused={focused === 'projectType'}
      >
        <div className="relative">
          <select
            id="projectType"
            value={form.projectType}
            onChange={set('projectType')}
            onFocus={() => setFocused('projectType')}
            onBlur={() => setFocused(null)}
            className={`${inputClass} select-dark appearance-none pr-6`}
            style={{
              color: form.projectType
                ? '#E4E2DD'
                : 'rgba(228, 226, 221, 0.3)',
            }}
          >
            <option value="" disabled>
              {t('form.type_placeholder')}
            </option>
            {PROJECT_TYPE_KEYS.map(({ value, key }) => (
              <option key={value} value={value}>
                {t(`types.${key}`)}
              </option>
            ))}
          </select>

          <span
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-footer-text/40"
            aria-hidden="true"
          >
            ↓
          </span>
        </div>
      </Field>

      {/* Message */}
      <Field
        id="message"
        label={t('form.message_label')}
        error={errors.message}
        focused={focused === 'message'}
      >
        <textarea
          id="message"
          value={form.message}
          onChange={set('message')}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          rows={4}
          placeholder={t('form.message_placeholder')}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <SubmitButton sending={sending} />
    </form>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ContactSection() {
  const t = useTranslations('contact');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.ct-item', {
        y:          40,
        opacity:    0,
        stagger:    0.14,
        duration:   1,
        ease:       'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 75%',
          once:    true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      style={{ backgroundColor: '#1E1E1E' }}
    >
      <div
        className="mx-auto grid grid-cols-1 gap-x-16 gap-y-20 px-6 py-24 lg:grid-cols-[3fr_2fr] lg:px-16 xl:px-24"
        style={{ maxWidth: '1600px' }}
      >

        {/* ══ LEFT — intro & contact info ══════════════════════════ */}
        <div className="flex flex-col justify-center gap-10">

          <p
            className="ct-item font-body text-[12px] uppercase text-footer-text/50"
            style={{ letterSpacing: '0.2em' }}
          >
            {t('overline')}
          </p>

          <h2
            id="contact-heading"
            className="ct-item font-display font-bold uppercase text-footer-text"
            style={{
              fontSize:      'clamp(2rem, 8vw, 120px)',
              lineHeight:    0.88,
              letterSpacing: '-0.04em',
            }}
          >
            {t('headline_l1')}
            <br />
            {t('headline_l2')}
            <br />
            {t('headline_l3')}
          </h2>

          <p
            className="ct-item font-body text-[18px] leading-relaxed text-footer-text/60"
            style={{ maxWidth: '400px' }}
          >
            {t('subtext')}
          </p>

          <ul className="ct-item flex flex-col gap-4">
            {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center gap-3 font-body text-[15px] text-footer-text transition-colors duration-200 hover:text-accent-red"
                >
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 transition-colors duration-200 group-hover:text-accent-red"
                    aria-hidden="true"
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ══ RIGHT — contact form ═════════════════════════════════ */}
        <div className="flex flex-col justify-center">
          <ContactForm />
        </div>

      </div>
    </section>
  );
}

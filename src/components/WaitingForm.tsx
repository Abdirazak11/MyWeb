import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Loader2, ChevronLeft } from 'lucide-react'
import { step1Schema, step2Schema, type Step1Data, type Step2Data } from '../lib/validation'
import { insertWaitingListEntry } from '../lib/sheetsClient'

interface WaitingFormProps {
  onSuccess: () => void
}

const SERVICE_OPTIONS = [
  { value: 'Software', label: 'Software Development', desc: 'Custom .NET/React solutions' },
  { value: 'Design', label: 'Graphic Design', desc: 'Brand identity & UI/UX' },
  { value: 'Automation', label: 'AI Automation', desc: 'Smart workflow systems' },
  { value: 'All', label: 'Everything', desc: 'Full-service partnership' },
] as const

type ServiceValue = (typeof SERVICE_OPTIONS)[number]['value']

export default function WaitingForm({ onSuccess }: WaitingFormProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [step, setStep] = useState<1 | 2>(1)
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [selectedService, setSelectedService] = useState<ServiceValue | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // ── Step 1 form ──────────────────────────────
  const {
    register: registerStep1,
    handleSubmit: handleStep1Submit,
    formState: { errors: errors1 },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: 'onBlur',
  })

  // ── Step 2 form ──────────────────────────────
  const {
    handleSubmit: handleStep2Submit,
    setValue: setStep2Value,
    formState: { errors: errors2 },
    clearErrors: clearStep2Errors,
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: 'onSubmit',
  })

  const onStep1Valid = (data: Step1Data) => {
    setStep1Data(data)
    setStep(2)
  }

  const onStep2Valid = async () => {
    if (!step1Data || !selectedService) return
    setIsSubmitting(true)
    setApiError(null)

    const result = await insertWaitingListEntry({
      full_name: step1Data.full_name,
      email: step1Data.email,
      service_interest: selectedService,
    })

    setIsSubmitting(false)

    if (result.success) {
      onSuccess()
    } else {
      setApiError(result.error || 'Something went wrong. Please try again.')
    }
  }

  const handleServiceSelect = (val: ServiceValue) => {
    setSelectedService(val)
    setStep2Value('service_interest', val)
    clearStep2Errors()
  }

  return (
    <section id="waitlist" className="relative py-32 px-6" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/4 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-6 bg-gold/50" />
            <span className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase">
              Exclusive Access
            </span>
            <div className="h-px w-6 bg-gold/50" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">
            Secure Your{' '}
            <span className="text-gradient-gold italic">Priority Spot</span>
          </h2>
          <p className="font-body text-white/40 text-sm leading-relaxed max-w-md mx-auto">
            We're selective about who we work with. Join the waiting list and our team
            will reach out to discuss your project personally.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative bg-obsidian-card border border-gold/15 rounded-sm overflow-hidden"
        >
          {/* Top accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          {/* Progress bar */}
          <div className="px-8 pt-8 pb-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex-1 h-px bg-obsidian-border">
                <motion.div
                  className="h-full bg-gold"
                  initial={{ width: '50%' }}
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="font-mono text-gold/50 text-[10px] tracking-widest whitespace-nowrap">
                Step {step} / 2
              </span>
            </div>
          </div>

          <div className="px-8 pb-8">
            <AnimatePresence mode="wait">
              {/* ── STEP 1 ─────────────────────── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display text-2xl text-white mb-1 font-light">
                    Tell us who you are
                  </h3>
                  <p className="font-body text-white/35 text-sm mb-7">
                    Your contact details stay private and are never shared.
                  </p>

                  <form onSubmit={handleStep1Submit(onStep1Valid)} noValidate className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="full_name"
                        className="block font-mono text-[11px] tracking-[0.2em] text-gold/60 uppercase mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="full_name"
                        type="text"
                        placeholder="Ahmed Al Mansouri"
                        autoComplete="name"
                        className="form-input w-full px-4 py-3 rounded-sm text-sm font-body"
                        aria-invalid={!!errors1.full_name}
                        aria-describedby={errors1.full_name ? 'name-error' : undefined}
                        {...registerStep1('full_name')}
                      />
                      {errors1.full_name && (
                        <p id="name-error" className="mt-2 text-red-400/80 text-xs font-mono">
                          {errors1.full_name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-[11px] tracking-[0.2em] text-gold/60 uppercase mb-2"
                      >
                        Business Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="ahmed@company.ae"
                        autoComplete="email"
                        className="form-input w-full px-4 py-3 rounded-sm text-sm font-body"
                        aria-invalid={!!errors1.email}
                        aria-describedby={errors1.email ? 'email-error' : undefined}
                        {...registerStep1('email')}
                      />
                      {errors1.email && (
                        <p id="email-error" className="mt-2 text-red-400/80 text-xs font-mono">
                          {errors1.email.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="group w-full flex items-center justify-center gap-3 py-3.5 bg-gold text-obsidian font-body font-semibold text-sm tracking-wide rounded-sm gold-glow hover:bg-gold-light transition-colors duration-300 mt-3"
                    >
                      Continue
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ── STEP 2 ─────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-white/30 hover:text-gold transition-colors duration-200 mb-6 text-xs font-mono tracking-wide"
                  >
                    <ChevronLeft size={14} />
                    Back
                  </button>

                  <h3 className="font-display text-2xl text-white mb-1 font-light">
                    What can we help with?
                  </h3>
                  <p className="font-body text-white/35 text-sm mb-7">
                    Select the service that best fits your needs.
                  </p>

                  <form onSubmit={handleStep2Submit(onStep2Valid)} noValidate className="space-y-4">
                    {/* Service cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_OPTIONS.map((opt) => {
                        const isSelected = selectedService === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleServiceSelect(opt.value)}
                            className={`relative p-4 text-left rounded-sm border transition-all duration-250 ${
                              isSelected
                                ? 'border-gold/60 bg-gold/8 shadow-[0_0_16px_rgba(212,175,55,0.15)]'
                                : 'border-white/8 bg-obsidian hover:border-gold/25 hover:bg-gold/4'
                            }`}
                            aria-pressed={isSelected}
                          >
                            {isSelected && (
                              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold" />
                            )}
                            <div className="font-body text-sm font-medium text-white mb-0.5">
                              {opt.label}
                            </div>
                            <div className="font-mono text-[10px] text-white/30 tracking-wide">
                              {opt.desc}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {errors2.service_interest && (
                      <p className="text-red-400/80 text-xs font-mono">
                        {errors2.service_interest.message}
                      </p>
                    )}

                    {/* API error */}
                    {apiError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
                        <p className="text-red-400 text-xs font-mono">{apiError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full flex items-center justify-center gap-3 py-3.5 bg-gold text-obsidian font-body font-semibold text-sm tracking-wide rounded-sm gold-glow hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Join Waiting List
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>

                    <p className="text-center font-mono text-white/20 text-[10px] tracking-wide pt-1">
                      No spam. No commitments. Just a conversation.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

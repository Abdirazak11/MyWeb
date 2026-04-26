import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Calendar } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            aria-describedby="success-desc"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="relative w-full max-w-md bg-obsidian-card border border-gold/20 rounded-sm pointer-events-auto overflow-hidden">
              {/* Top shimmer line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

              {/* Glow backdrop inside card */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gold/6 blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors duration-200 z-10"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              {/* Content */}
              <div className="relative px-10 py-12 text-center">
                {/* Animated check icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 mb-8"
                >
                  <div className="absolute w-16 h-16 bg-gold/10 rounded-full animate-ping opacity-30" />
                  <CheckCircle className="text-gold relative z-10" size={48} strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <motion.h2
                  id="success-title"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="font-display text-4xl font-light text-white mb-2"
                >
                  You're on the{' '}
                  <span className="text-gradient-gold italic">list.</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  id="success-desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="font-body text-white/45 text-sm leading-relaxed mb-10"
                >
                  Our team reviews every submission personally.
                  <br />
                  We'll be in touch within 24–48 hours.
                </motion.p>

                {/* Divider */}
                <div className="w-16 h-px bg-gold/20 mx-auto mb-10" />

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <a
                    href="mailto:hello@zacknode.com?subject=Consultation%20Request"
                    className="group inline-flex items-center gap-3 px-8 py-3.5 bg-gold text-obsidian font-body font-semibold text-sm tracking-wide rounded-sm gold-glow hover:bg-gold-light transition-all duration-300 mb-4"
                  >
                    <Calendar size={16} />
                    Book a Consultation
                  </a>

                  <p className="font-mono text-white/20 text-[10px] tracking-widest mt-5">
                    hello@zacknode.com
                  </p>
                </motion.div>
              </div>

              {/* Bottom shimmer */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

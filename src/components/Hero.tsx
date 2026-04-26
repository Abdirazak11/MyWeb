import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  onJoinClick: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero({ onJoinClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating orb - top right */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-gold/5 rounded-full blur-3xl floating pointer-events-none" />

      {/* Floating orb - bottom left */}
      <div
        className="absolute bottom-1/4 left-[5%] w-48 h-48 bg-gold/4 rounded-full blur-2xl pointer-events-none"
        style={{ animation: 'float 10s ease-in-out infinite reverse' }}
      />

      {/* Thin horizontal shimmer line */}
      <div className="absolute top-[48%] left-0 right-0 h-px shimmer-line opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow label */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-gold/80 text-xs tracking-[0.3em] uppercase">
            Dubai · Global
          </span>
          <div className="h-px w-8 bg-gold/60" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">Next-Gen Software</span>
          <br />
          <span className="text-white">&amp; </span>
          <span className="text-gradient-gold italic">AI Automation</span>
          <br />
          <span className="text-white/90 text-4xl md:text-5xl lg:text-6xl font-light">
            for the Dubai Market
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-body text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          We architect premium digital solutions—from enterprise software and intelligent automation
          to brand identity—serving ambitious businesses across the UAE and Turkey.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={onJoinClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-3 px-8 py-4 bg-gold text-obsidian font-body font-semibold text-sm tracking-wide rounded-sm animate-pulse-gold overflow-hidden"
          >
            <span className="relative z-10">Join the Waiting List</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={16} />
            </motion.span>
            <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Secondary CTA */}
          <button
            onClick={() => {
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-2 px-8 py-4 border border-white/10 hover:border-gold/30 text-white/60 hover:text-white font-body text-sm tracking-wide rounded-sm transition-all duration-300"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-20 flex flex-wrap items-center justify-center gap-12 border-t border-white/5 pt-12"
        >
          {[
            { value: '2', label: 'Markets Served' },
            { value: '4', label: 'Core Services' },
            { value: '∞', label: 'Possibilities' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl text-gradient-gold font-light">{stat.value}</div>
              <div className="font-mono text-white/30 text-xs tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-white/20 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}

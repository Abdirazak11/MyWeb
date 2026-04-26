import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal, Cpu, Palette, Globe } from 'lucide-react'

const services = [
  {
    icon: Terminal,
    title: 'Software Development',
    subtitle: 'Custom Engineering',
    description:
      'Enterprise-grade .NET and React solutions, scalable API architectures, and seamless third-party integrations tailored to the demands of Dubai\'s fast-moving market.',
    accent: 'from-emerald-500/10 to-transparent',
    tags: ['.NET', 'React', 'API Integration'],
  },
  {
    icon: Cpu,
    title: 'AI Automation',
    subtitle: 'Intelligent Workflows',
    description:
      'Smart, self-learning automation pipelines that eliminate manual overhead for trade operators and e-commerce businesses — letting your team focus on growth.',
    accent: 'from-blue-500/10 to-transparent',
    tags: ['LLM Pipelines', 'RPA', 'E-Commerce'],
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    subtitle: 'Brand & Visual Identity',
    description:
      'From conceptual brand strategy to precision UI/UX and professional commercial retouching — visual communication built to command attention and trust.',
    accent: 'from-purple-500/10 to-transparent',
    tags: ['Brand Identity', 'UI/UX', 'Retouching'],
  },
  {
    icon: Globe,
    title: 'Commercial Strategy',
    subtitle: 'Turkey ↔ UAE Bridge',
    description:
      'Deep market intelligence and strategic guidance for businesses navigating trade, partnerships, and expansion between Turkish and UAE markets.',
    accent: 'from-gold/10 to-transparent',
    tags: ['Market Entry', 'Trade', 'Partnerships'],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-32 px-6" ref={ref}>
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-light/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-6 bg-gold/50" />
            <span className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase">
              What We Build
            </span>
            <div className="h-px w-6 bg-gold/50" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-5">
            Four Disciplines,{' '}
            <span className="text-gradient-gold italic">One Vision</span>
          </h2>
          <p className="font-body text-white/40 max-w-xl mx-auto text-base leading-relaxed">
            Each service is delivered with the precision and craft that discerning clients in
            the Dubai and Turkish markets demand.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-sm card-border bg-obsidian-card transition-all duration-300 cursor-default"
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Gold accent line - top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-8">
                  {/* Icon & subtitle row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gold/8 rounded-sm group-hover:bg-gold/15 transition-colors duration-300" />
                        <Icon className="text-gold relative z-10" size={22} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="font-mono text-gold/50 text-[10px] tracking-[0.25em] uppercase mb-1">
                          {service.subtitle}
                        </div>
                        <h3 className="font-display text-white text-xl font-medium">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    {/* Arrow indicator */}
                    <div className="text-white/10 group-hover:text-gold/40 transition-colors duration-300 mt-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-white/45 text-sm leading-relaxed mb-6 group-hover:text-white/60 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] tracking-widest text-gold/50 border border-gold/15 px-3 py-1 rounded-sm group-hover:border-gold/30 group-hover:text-gold/70 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

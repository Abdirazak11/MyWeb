import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function AboutContact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      {/* About Section */}
      <section id="about" className="relative py-28 px-6" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="h-px w-6 bg-gold/50" />
                <span className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase">
                  About Us
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Where East meets{' '}
                <span className="text-gradient-gold italic">innovation</span>
              </h2>
              <p className="font-body text-white/45 text-sm leading-loose mb-6">
                ZackNode Systems was founded with a singular mission: to deliver world-class
                technology and creative services to the Middle East's most ambitious businesses.
                Based in Dubai and deeply connected to the Turkish market, we operate at
                the intersection of two of the world's most dynamic economies.
              </p>
              <p className="font-body text-white/35 text-sm leading-loose">
                Every project we take on is treated as a long-term partnership. We don't chase
                volume — we choose clients we can genuinely transform.
              </p>

              {/* Horizontal rule with gold dot */}
              <div className="flex items-center gap-4 mt-10">
                <div className="flex-1 h-px bg-gold/10" />
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <div className="flex-1 h-px bg-gold/10" />
              </div>

              {/* Values */}
              <div className="grid grid-cols-3 gap-6 mt-10">
                {[
                  { label: 'Craftsmanship', icon: '◈' },
                  { label: 'Discretion', icon: '◆' },
                  { label: 'Results', icon: '◉' },
                ].map((v) => (
                  <div key={v.label} className="text-center">
                    <div className="text-gold text-xl mb-2">{v.icon}</div>
                    <div className="font-mono text-white/40 text-[10px] tracking-widest uppercase">
                      {v.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Decorative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-sm mx-auto">
                {/* Outer ring */}
                <div className="absolute inset-0 border border-gold/10 rounded-full" />
                <div className="absolute inset-6 border border-gold/8 rounded-full" />
                <div className="absolute inset-12 border border-gold/12 rounded-full" />
                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-8xl text-gold/20 font-light mb-2">ZN</div>
                    <div className="font-mono text-white/20 text-xs tracking-[0.3em]">SYSTEMS</div>
                  </div>
                </div>
                {/* Orbiting dots */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6"
                >
                  <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 bg-gold/40 rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-6 bg-gold/50" />
              <span className="font-mono text-gold/70 text-xs tracking-[0.3em] uppercase">
                Contact
              </span>
              <div className="h-px w-6 bg-gold/50" />
            </div>
            <h2 className="font-display text-4xl font-light text-white">
              Let's Start a{' '}
              <span className="text-gradient-gold italic">Conversation</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: MapPin,
                label: 'Location',
                value: 'UAE',
                sub: 'Dubai',
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'abdourazakegh@gmail.com',
                sub: 'Replies within 24h',
              },
              {
                icon: Phone,
                label: 'WhatsApp',
                value: '+971 529 096 058',
                sub: 'Business hours only',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="bg-obsidian-card border border-gold/10 rounded-sm p-6 text-center hover:border-gold/25 transition-colors duration-300"
                >
                  <Icon className="text-gold mx-auto mb-3" size={20} strokeWidth={1.5} />
                  <div className="font-mono text-gold/50 text-[10px] tracking-widest uppercase mb-2">
                    {item.label}
                  </div>
                  <div className="font-body text-white text-sm mb-1">{item.value}</div>
                  <div className="font-mono text-white/25 text-[10px]">{item.sub}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

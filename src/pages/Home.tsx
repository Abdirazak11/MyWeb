import { useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WaitingForm from '../components/WaitingForm'
import SuccessModal from '../components/SuccessModal'
import AboutContact from '../components/AboutContact'
import Footer from '../components/Footer'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  const handleJoinClick = useCallback(() => {
    setFormOpen(true)
    // Smooth scroll to the waitlist form
    setTimeout(() => {
      document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }, [])

  const handleSuccess = useCallback(() => {
    setModalOpen(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-obsidian noise-overlay">
      {/* Global ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <Navbar onJoinClick={handleJoinClick} />

      <main>
        <Hero onJoinClick={handleJoinClick} />
        <Services />
        {formOpen && <WaitingForm onSuccess={handleSuccess} />}

        {/* If form not yet opened, show a teaser CTA row */}
        {!formOpen && (
          <section className="py-24 px-6 text-center">
            <div className="max-w-xl mx-auto">
              <p className="font-mono text-white/25 text-xs tracking-widest uppercase mb-6">
                Limited spots available
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8">
                Ready to build{' '}
                <span className="text-gradient-gold italic">something great?</span>
              </h2>
              <button
                onClick={handleJoinClick}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-obsidian font-body font-semibold text-sm tracking-wide rounded-sm animate-pulse-gold hover:bg-gold-light transition-colors duration-300"
              >
                Join the Waiting List
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </section>
        )}

        <AboutContact />
      </main>

      <Footer />

      <SuccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

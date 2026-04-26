export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="absolute inset-0 bg-gold/10 rounded-sm rotate-45" />
            <span className="relative font-display text-gold text-base font-bold leading-none">Z</span>
          </div>
          <div>
            <span className="font-display text-white/80 font-semibold text-sm">ZackNode</span>
            <span className="font-mono text-white/20 text-xs ml-1">Systems</span>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-gold/20" />
          <p className="font-mono text-white/20 text-[10px] tracking-widest text-center">
            © {year} ZACKNODE SYSTEMS · DUBAI, UAE
          </p>
          <div className="h-px w-8 bg-gold/20" />
        </div>

        {/* Rights */}
        <p className="font-mono text-white/15 text-[10px] tracking-widest">
          ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  )
}

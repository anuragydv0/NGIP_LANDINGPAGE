

export default function Footer() {
  return (
    <footer className="bg-ngip-navy text-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8">
            Help us turn this prototype into a regulated product.
          </h2>
          <p className="text-lg text-white/70 mb-12 font-light">
            We are looking for data partnerships, regulatory guidance, and early backers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:hello@ngip.com" className="bg-white text-ngip-navy px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all">
              Contact Us
            </a>
            <a href="https://anurag.social" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full font-medium border border-white/20 hover:bg-white/5 transition-all">
              Founder Portfolio
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-white/50">
          <div className="font-serif font-bold text-xl text-white tracking-tight">NGIP</div>
          <div>© 2026. Prototype stage — not a live investment product.</div>
        </div>
      </div>
    </footer>
  );
}

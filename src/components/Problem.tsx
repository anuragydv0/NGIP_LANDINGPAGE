import { motion } from 'framer-motion';

export default function Problem() {
  const tags = [
    { text: "World Bank", top: "10%", left: "15%", rotate: -12 },
    { text: "IMF Data", top: "25%", left: "60%", rotate: 8 },
    { text: "Central Banks", top: "60%", left: "10%", rotate: -5 },
    { text: "Trade Reports", top: "75%", left: "70%", rotate: 15 },
    { text: "News Feeds", top: "40%", left: "80%", rotate: -8 },
    { text: "Gov Statistics", top: "15%", left: "85%", rotate: 5 },
    { text: "Licensed Data", top: "80%", left: "30%", rotate: -10 },
  ];

  return (
    <section id="problem" className="py-32 bg-ngip-bg overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[400px] w-full rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden flex items-center justify-center lg:order-2">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            {tags.map((tag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
                className="absolute px-4 py-2 bg-white border border-black/10 shadow-sm rounded-md text-xs font-mono text-ngip-navy/70 whitespace-nowrap"
                style={{ top: tag.top, left: tag.left, rotate: tag.rotate }}
              >
                {tag.text}
              </motion.div>
            ))}
            <div className="z-10 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-black/10 shadow-lg text-center max-w-[250px]">
              <div className="text-sm font-semibold mb-1">Fragmented Intelligence</div>
              <div className="text-xs text-ngip-navy/60">No single source of truth for macroeconomic conviction.</div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-12 leading-tight">
              Economic data is scattered across dozens of sources.
            </h2>
            <ul className="space-y-8">
              {[
                "GDP, inflation, debt, FDI, employment, and infrastructure sit in 20+ disconnected sources.",
                "A belief like \"India will grow\" has no direct path to an investment.",
                "Investors default to stock-picking even when their real conviction is macroeconomic.",
                "Nothing connects country research to an actual financial instrument."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-ngip-navy/5 flex items-center justify-center text-xs font-mono text-ngip-navy/50 border border-black/5">
                    {i + 1}
                  </div>
                  <p className="text-lg text-ngip-navy/80 leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

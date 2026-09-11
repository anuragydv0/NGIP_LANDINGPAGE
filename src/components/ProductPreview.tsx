import { motion } from 'framer-motion';

export default function ProductPreview() {
  return (
    <section id="product" className="py-32 bg-ngip-bg">
      <div className="container mx-auto px-6 md:px-12 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-mono font-medium mb-6 border border-black/5">
            Built and tested — not just a concept
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
            A real full-stack prototype.
          </h2>
          <p className="text-lg text-ngip-navy/70 font-mono text-sm">
            Spring Boot + React.js • JWT Auth • MySQL/MongoDB • REST APIs
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden transform perspective-1000 hover:rotate-x-2 transition-transform duration-700 ease-out">
            {/* Header */}
            <div className="h-12 bg-black/5 border-b border-black/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-black/20"></div>
              <div className="w-3 h-3 rounded-full bg-black/20"></div>
              <div className="w-3 h-3 rounded-full bg-black/20"></div>
            </div>
            
            {/* Body */}
            <div className="p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h4 className="text-sm font-mono text-ngip-navy/50 mb-4 uppercase tracking-wider">Portfolio Exposure</h4>
                  <div className="h-6 w-full bg-black/5 rounded-sm overflow-hidden flex">
                    <motion.div initial={{width:0}} whileInView={{width:'40%'}} viewport={{once:true}} transition={{duration:1, delay:0.2}} className="h-full bg-ngip-navy" title="India 40%"></motion.div>
                    <motion.div initial={{width:0}} whileInView={{width:'25%'}} viewport={{once:true}} transition={{duration:1, delay:0.4}} className="h-full bg-ngip-green" title="USA 25%"></motion.div>
                    <motion.div initial={{width:0}} whileInView={{width:'15%'}} viewport={{once:true}} transition={{duration:1, delay:0.6}} className="h-full bg-ngip-amber" title="Vietnam 15%"></motion.div>
                    <motion.div initial={{width:0}} whileInView={{width:'10%'}} viewport={{once:true}} transition={{duration:1, delay:0.8}} className="h-full bg-black/20" title="Japan 10%"></motion.div>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs font-mono">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-ngip-navy"></div> India 40%</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-ngip-green"></div> USA 25%</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-ngip-amber"></div> Vietnam 15%</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-mono text-ngip-navy/50 mb-4 uppercase tracking-wider">Watchlist</h4>
                  <div className="space-y-3">
                    {['Brazil', 'Mexico', 'South Korea'].map((country, i) => (
                      <div key={i} className="flex justify-between items-center p-3 hover:bg-black/5 rounded-lg transition-colors border border-transparent hover:border-black/5">
                        <div className="font-medium">{country}</div>
                        <div className="font-mono text-sm">{(80 - i * 4).toFixed(1)} <span className="text-ngip-navy/40">/100</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-ngip-bg p-6 rounded-xl border border-black/5">
                <h4 className="text-sm font-mono text-ngip-navy/50 mb-4 uppercase tracking-wider">AI Explainability</h4>
                <div className="space-y-4">
                  <div className="text-sm text-ngip-navy/80 leading-relaxed border-l-2 border-ngip-green pl-3 py-1">
                    India's CGI score rose by 1.2 points this quarter, primarily driven by a 14% increase in infrastructure spending and stable FDI inflows.
                  </div>
                  <div className="text-sm text-ngip-navy/80 leading-relaxed border-l-2 border-ngip-amber pl-3 py-1">
                    Caution: Employment metrics have lagged behind GDP growth projections by 2.1%.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

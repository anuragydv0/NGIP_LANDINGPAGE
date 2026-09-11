import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { title: "Country", desc: "Select an economy you want to evaluate." },
  { title: "Economic Intelligence", desc: "We aggregate thousands of data points." },
  { title: "Growth Index", desc: "Data is synthesized into a single CGI score." },
  { title: "Investment Opportunities", desc: "We map the score to actionable instruments." },
  { title: "Portfolio Exposure", desc: "Track and manage your macroeconomic conviction." }
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="py-32 bg-ngip-navy text-white relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-medium mb-24 text-center"
        >
          How it works
        </motion.h2>

        <div ref={containerRef} className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-white/10 hidden md:block">
            <motion.div 
              className="w-full bg-ngip-green origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-8 relative"
              >
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/20 items-center justify-center font-mono text-sm z-10 relative">
                  0{i + 1}
                  {/* Active indicator */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-ngip-green"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.2 + 0.4 }}
                  />
                </div>
                <div className="pt-2">
                  <div className="text-sm font-mono text-ngip-green mb-2 md:hidden">0{i + 1}</div>
                  <h3 className="text-2xl font-serif font-medium mb-3">{step.title}</h3>
                  <p className="text-white/60 text-lg">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

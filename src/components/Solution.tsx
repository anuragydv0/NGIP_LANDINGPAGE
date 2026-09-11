import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const CountUp = ({ to, duration = 2 }: { to: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = to;
      const incrementTime = (duration * 1000) / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start > end ? end : start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, to, duration]);

  return <span ref={ref}>{count.toFixed(1)}</span>;
};

const Bar = ({ label, value, color, delay }: { label: string, value: number, color: string, delay: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs font-mono mb-1.5">
        <span className="text-ngip-navy/70">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function Solution() {
  return (
    <section id="index" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8 leading-tight">
              One score for every country's growth story.
            </h2>
            <div className="space-y-6 text-lg text-ngip-navy/80 leading-relaxed mb-8">
              <p>Transparent and comparable across global markets.</p>
              <p>Not a credit rating. Not a guarantee. A pure reflection of macro health and trajectory.</p>
              <p>Built to replace intuition with structured intelligence.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-ngip-bg p-8 md:p-10 rounded-2xl border border-black/5 shadow-xl relative overflow-hidden"
          >
            <div className="flex justify-between items-end border-b border-black/10 pb-6 mb-8">
              <div>
                <div className="text-sm font-mono text-ngip-navy/50 mb-2">COUNTRY GROWTH INDEX</div>
                <div className="text-3xl font-serif font-medium">India</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-ngip-green mb-1 flex items-center justify-end gap-1">
                  ↑ Trending Positive
                </div>
                <div className="text-6xl font-mono tracking-tight font-light text-ngip-navy">
                  <CountUp to={91.4} duration={2} />
                  <span className="text-2xl text-ngip-navy/40">/100</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Bar label="Growth" value={25} color="#101B33" delay={0.2} />
              <Bar label="Productivity" value={15} color="#1FAE7C" delay={0.3} />
              <Bar label="Investment" value={15} color="#C99A3E" delay={0.4} />
              <Bar label="Infrastructure" value={10} color="#101B33" delay={0.5} />
              <Bar label="Employment" value={10} color="#101B33" delay={0.6} />
              <Bar label="Other" value={25} color="#101B33" delay={0.7} />
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}

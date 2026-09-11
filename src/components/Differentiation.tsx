import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';

export default function Differentiation() {
  const rows = [
    { feature: "Country-First Discovery", traditional: false, robo: false, macro: true, ngip: true },
    { feature: "Real Investment Instruments", traditional: true, robo: true, macro: false, ngip: true },
    { feature: "AI Explainability", traditional: false, robo: false, macro: false, ngip: true },
    { feature: "Portfolio Concentration Insight", traditional: false, robo: true, macro: false, ngip: true },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-medium mb-16 text-center"
        >
          The Missing Link
        </motion.h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10">
                <th className="py-6 px-4 font-mono text-sm text-ngip-navy/50 font-medium">Capability</th>
                <th className="py-6 px-4 font-mono text-sm text-ngip-navy/50 font-medium">Traditional Brokers</th>
                <th className="py-6 px-4 font-mono text-sm text-ngip-navy/50 font-medium">Robo-Advisors</th>
                <th className="py-6 px-4 font-mono text-sm text-ngip-navy/50 font-medium">Macro Terminals</th>
                <th className="py-6 px-4 font-serif text-lg font-bold text-ngip-navy bg-ngip-bg/50 rounded-t-lg border-x border-t border-black/5">NGIP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-black/5 last:border-0"
                >
                  <td className="py-6 px-4 font-medium text-ngip-navy/90">{row.feature}</td>
                  <td className="py-6 px-4 text-center">{row.traditional ? <Check className="w-5 h-5 mx-auto text-black/30" /> : <Minus className="w-5 h-5 mx-auto text-black/10" />}</td>
                  <td className="py-6 px-4 text-center">{row.robo ? <Check className="w-5 h-5 mx-auto text-black/30" /> : <Minus className="w-5 h-5 mx-auto text-black/10" />}</td>
                  <td className="py-6 px-4 text-center">{row.macro ? <Check className="w-5 h-5 mx-auto text-black/30" /> : <Minus className="w-5 h-5 mx-auto text-black/10" />}</td>
                  <td className="py-6 px-4 text-center bg-ngip-bg/50 border-x border-black/5">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 + (i * 0.1) }}
                    >
                      <Check className="w-6 h-6 mx-auto text-ngip-green" strokeWidth={3} />
                    </motion.div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

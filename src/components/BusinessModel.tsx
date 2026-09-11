import { motion } from 'framer-motion';

export default function BusinessModel() {
  const tiers = [
    { name: "Free", desc: "Basic profiles, rankings, limited charts." },
    { name: "Premium", desc: "Advanced research, AI assistant, alerts & backtesting." },
    { name: "Professional", desc: "Full data API, strategy engine, institutional analytics." },
    { name: "Enterprise", desc: "Custom feeds, research infra, dedicated access." },
  ];

  return (
    <section className="py-32 bg-ngip-bg border-y border-black/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4">Business Model</h2>
          <p className="text-ngip-navy/60 font-mono text-sm">(Directional pricing / To be validated)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-xl border border-black/10 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-serif font-medium mb-3">{tier.name}</h3>
              <p className="text-ngip-navy/70 text-sm leading-relaxed">{tier.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

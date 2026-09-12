import { motion } from 'framer-motion';

export default function Team() {
  const team = [
    { name: "Anurag Yadav", role: "Founder" },
    { name: "Karan Patidar", role: "Founder" },
   
  ];

  return (
    <section id="team" className="py-32 bg-white scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-sm font-mono text-ngip-navy/50 mb-4">NGIP</div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium">The Team</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-black/5 border border-black/10 mb-4 flex items-center justify-center text-2xl font-serif text-ngip-navy/30">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-sm text-ngip-navy/60 font-mono mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TickerItem = ({ country, score, trend, change }: { country: string, score: number, trend: 'up' | 'flat' | 'down', change: string }) => (
  <div className="flex items-center space-x-3 px-4 py-2 border-r border-white/10 last:border-r-0 whitespace-nowrap">
    <span className="font-sans font-medium text-white/90">{country}</span>
    <span className="font-mono text-white font-semibold">{score}</span>
    <div className={`flex items-center text-xs font-mono ${trend === 'up' ? 'text-ngip-green' : trend === 'down' ? 'text-red-400' : 'text-white/50'}`}>
      {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {change}
    </div>
  </div>
);

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="relative min-h-screen bg-ngip-navy text-ngip-bg flex flex-col justify-center pt-24 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-ngip-green/[0.05] blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pb-32">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.05] tracking-tight mb-8"
          >
            Which economy do you believe in?
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-white/70 max-w-2xl leading-relaxed mb-12 font-light"
          >
            NGIP turns a country's GDP, inflation, employment and infrastructure data into one growth score — then connects that belief to real ways to invest in it.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <button className="bg-white text-ngip-navy px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all flex items-center gap-2 group">
              See how it works
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full font-medium border border-white/20 hover:bg-white/5 transition-all text-white">
              Get in touch
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Live Ticker */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 w-full border-y border-white/10 bg-white/[0.02] backdrop-blur-md"
      >
        <div className="flex overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex py-3 items-center"
          >
            {/* Duplicated for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                <TickerItem country="India" score={91.4} trend="up" change="6.8%" />
                <TickerItem country="Vietnam" score={88.2} trend="up" change="6.5%" />
                <TickerItem country="Indonesia" score={84.9} trend="up" change="5.1%" />
                <TickerItem country="USA" score={82.7} trend="flat" change="2.8%" />
                <TickerItem country="Japan" score={76.4} trend="flat" change="1.1%" />
                <TickerItem country="India" score={91.4} trend="up" change="6.8%" />
                <TickerItem country="Vietnam" score={88.2} trend="up" change="6.5%" />
                <TickerItem country="Indonesia" score={84.9} trend="up" change="5.1%" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

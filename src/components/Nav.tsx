
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 50], [0, 8]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all"
      style={{ 
        backgroundColor: `rgba(247, 248, 251, ${bgOpacity})`,
        backdropFilter: `blur(${blur}px)`,
        borderBottom: `1px solid rgba(16, 27, 51, ${borderOpacity} * 0.1)`
      }}
    >
      <div className="text-xl font-serif font-bold text-ngip-navy tracking-tight">NGIP</div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-ngip-navy/80">
        <a href="#problem" className="hover:text-ngip-navy transition-colors">Problem</a>
        <a href="#index" className="hover:text-ngip-navy transition-colors">Growth Index</a>
        <a href="#how-it-works" className="hover:text-ngip-navy transition-colors">How it works</a>
        <a href="#product" className="hover:text-ngip-navy transition-colors">Product</a>
        <a href="#team" className="hover:text-ngip-navy transition-colors">Team</a>
      </div>
      <button className="bg-ngip-navy text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ngip-navy/90 transition-all hover:scale-105 active:scale-95 shadow-sm">
        Get in touch
      </button>
    </motion.nav>
  );
}

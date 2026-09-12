
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import Logo from './Logo';
import { openContactModal } from './ContactModal';

export default function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.95]);
  const blurValue = useTransform(scrollY, [0, 50], [0, 12]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  
  const backgroundColor = useMotionTemplate`rgba(247, 248, 251, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurValue}px)`;
  const borderBottom = useMotionTemplate`1px solid rgba(16, 27, 51, ${borderOpacity})`;

  // Text color transition from white (on hero) to navy (on scroll)
  const textColor = useTransform(scrollY, [0, 50], ["#ffffff", "#101B33"]);
  const buttonBgColor = useTransform(scrollY, [0, 50], ["#ffffff", "#101B33"]);
  const buttonTextColor = useTransform(scrollY, [0, 50], ["#101B33", "#ffffff"]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 md:px-12 transition-all"
      style={{ 
        backgroundColor,
        backdropFilter,
        borderBottom
      }}
    >
      <motion.div className="flex items-center gap-2 text-xl font-serif font-bold tracking-tight" style={{ color: textColor }}>
        <Logo className="w-8 h-8" />
      </motion.div>
      <motion.div className="hidden md:flex space-x-8 text-sm font-medium" style={{ color: textColor }}>
        <a href="#problem" className="hover:opacity-80 transition-opacity">Problem</a>
        <a href="#index" className="hover:opacity-80 transition-opacity">Growth Index</a>
        <a href="#how-it-works" className="hover:opacity-80 transition-opacity">How it works</a>
        <a href="#product" className="hover:opacity-80 transition-opacity">Product</a>
        <a href="#team" className="hover:opacity-80 transition-opacity">Team</a>
      </motion.div>
      <motion.button 
        onClick={openContactModal}
        className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-sm"
        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
      >
        Get in touch
      </motion.button>
    </motion.nav>
  );
}

import { useEffect } from 'react';
import Lenis from 'lenis';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import ProductPreview from './components/ProductPreview';
import Differentiation from './components/Differentiation';
import BusinessModel from './components/BusinessModel';
import Team from './components/Team';
import FaqMarquee from './components/FaqMarquee';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { faqMarqueeData } from './data/faq';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-ngip-bg text-ngip-navy min-h-screen relative">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <ProductPreview />
      <Differentiation />
      <BusinessModel />
      <Team />
      <FaqMarquee 
        eyebrow="FAQ"
        title="Common questions, answered"
        subtitle="Everything you need to know about the Country Growth Index and our platform."
        rows={faqMarqueeData} 
      />
      <Footer />
      <ContactModal />
    </div>
  );
}

export default App;

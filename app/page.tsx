import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import BackToTop from '@/components/layout/BackToTop';

import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Timeline from '@/components/sections/Timeline';
import Certificates from '@/components/sections/Certificates';
import Showcase from '@/components/sections/Showcase';
import Hobbies from '@/components/sections/Hobbies';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      {/* Chrome */}
      <ScrollProgress />
      <Navbar />
      <BackToTop />

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Timeline />
        <Certificates />
        <Showcase />
        <Hobbies />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

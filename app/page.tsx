import Hero from "@/components/Hero";
import About from "@/components/About";
import MarketFit from "@/components/MarketFit";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Guestbook from "@/components/Guestbook";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <MarketFit />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Guestbook />
    </main>
  );
}

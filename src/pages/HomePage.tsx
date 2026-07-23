import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>

      <div id="about">
        <About />
        <Skills />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="contact">
        <Contact />
      </div>
    </>
  );
}

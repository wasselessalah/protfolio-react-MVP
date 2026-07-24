// src/pages/HomePage.tsx
import Hero from "@/components/layout/Hero";
import Projects from "@/components/sections/Projects";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Projects limit={3} />
    </div>
  );
}

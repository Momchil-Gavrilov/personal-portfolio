import Bridge from "@/components/Bridge";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Methods from "@/components/Methods";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Story from "@/components/Story";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Bridge />
        <Research />
        <Projects />
        <Methods />
        <Story />
        <Contact />
      </main>
    </>
  );
}

import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Story from "@/components/Story";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Work />
        <Publications />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

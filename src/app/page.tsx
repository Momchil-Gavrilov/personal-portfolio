import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Proof from "@/components/Proof";
import Publications from "@/components/Publications";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Story from "@/components/Story";

/*
  Section order follows the questions a hiring manager asks, in the order they
  ask them: what is this person for (Hero), are they real (Proof), what can
  they do (Skills), what have they actually found (Research), is it published
  (Publications), can they ship (Projects), do I want to work with them
  (Story), how do I reach them (Contact).

  Skills is deliberately short. Everything above Research is there to get a
  reader to Research believing it is worth reading, and nothing above it
  should cost more than a few seconds. The proof of every term in that band
  lives in the case studies, which is where a reader who wants it will go.
*/
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Skills />
        <Research />
        <Publications />
        <Projects />
        <Story />
        <Contact />
      </main>
    </>
  );
}

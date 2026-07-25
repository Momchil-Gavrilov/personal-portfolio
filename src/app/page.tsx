import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Proof from "@/components/Proof";
import Research from "@/components/Research";
import Story from "@/components/Story";
import Throughline from "@/components/Throughline";

/*
  Section order follows the questions a hiring manager asks, in the order
  they ask them: what is this person (Hero), are they credible (Proof),
  is this one person or three (Throughline), what is the rarest evidence
  (Research), can they ship (Projects), do I want to talk to them (Story),
  how do I reach them (Contact).
*/
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Throughline />
        <Research />
        <Projects />
        <Story />
        <Contact />
      </main>
    </>
  );
}

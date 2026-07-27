import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Practice from "@/components/Practice";
import Projects from "@/components/Projects";
import Proof from "@/components/Proof";
import Publications from "@/components/Publications";
import Research from "@/components/Research";
import Story from "@/components/Story";

/*
  Section order follows the questions a hiring manager asks, in the order they
  ask them: what is this person for (Hero), are they real (Proof), could I put
  them on a study (Practice), what have they actually found (Research), is it
  published (Publications), can they ship (Projects), do I want to work with
  them (Story), how do I reach them (Contact).

  Practice sits third on purpose. For a consultancy hiring at entry level,
  "can they run a session" is decided before "what did they find", and if the
  answer is no, nothing below it gets read.
*/
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Practice />
        <Research />
        <Publications />
        <Projects />
        <Story />
        <Contact />
      </main>
    </>
  );
}

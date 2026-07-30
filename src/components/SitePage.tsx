import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Story from "@/components/Story";

/*
  The whole page, once.

  The colourway trial that used to live here is gone: three colours no longer
  mean three routes, they mean one attribute on <html> that a visitor sets
  themselves, and the version of this page without the widget was compared
  against the version with it and lost.

  Section order follows the questions a hiring manager asks, in the order they
  ask them: what is this person for and are they real (Hero, which carries the
  four figures beside the portrait), do they know my field (the standards),
  what have they actually found (Research), is it published (Publications), can
  they ship (Projects), do I want to work with them (Story), what exactly can
  they do (Skills), how do I reach them (Contact).

  The skills band used to sit whole under the hero, and it was two things at
  once. The standards are a signal: a medical device reader uses that
  vocabulary to decide whether this person is oriented to their world, so it
  has to arrive before they have decided anything. The three skill groups are a
  reference: nobody reads a term list top to bottom, they check it once they
  are already interested, and between the hero and the research it made every
  reader walk through a lookup table on the way to the evidence. Split, each
  half sits where its own question gets asked, and the strip under the hero is
  one line instead of four.

  Everything above Research is there to get a reader to Research believing it
  is worth reading, and nothing above it should cost more than a few seconds.
  The proof of every term in the skills band lives in the case studies, which
  is where a reader who wants it will go.
*/
export default function SitePage({ colourway = false }: { colourway?: boolean }) {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills show="standards" />
        <Research />
        <Publications />
        <Projects />
        <Story />
        {/* Not the anchor: the standards half above already carries it. */}
        <Skills show="skills" anchor={false} />
        <Contact />
      </main>
      {/* The colourway widget rides in the footer rather than in a section of
          its own: two lines of site furniture, after the booking CTA, where a
          reader who wants it can find it and nobody else is asked anything. */}
      <Footer colourway={colourway} />
    </>
  );
}

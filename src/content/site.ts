export const site = {
  name: "Momchil Gavrilov",
  role: "Human factors & UX researcher",
  /* Split so the accent word stays content, not markup. Exactly one word is
     ever set in navy italic; that pattern is deliberate and does not change.
     The word itself moved from "adopt" to "trust" in the 2c design. */
  tagline: { lead: "I design technology that people", accent: "trust" },
  degree: "M.S. Biomedical Engineering, UC Davis",
  email: "mc.g.gavrilov@gmail.com",
  linkedin: {
    label: "linkedin.com/in/momchil-gavrilov-ux",
    url: "https://linkedin.com/in/momchil-gavrilov-ux",
  },
  github: {
    label: "github.com/Momchil-Gavrilov",
    url: "https://github.com/Momchil-Gavrilov",
  },
  booking: {
    label: "Book a call",
    url: "https://zcal.co/i/3ZUHG2G0",
  },
  resume: {
    label: "Résumé",
    url: "/momchil-gavrilov-human-factors-resume.pdf",
  },
};

/* The portrait returns to full size in this design, as a bordered card with a
   navy identity plate beneath it. It is a filing card, not a hero image: the
   thesis holds the headline and the face sits beside it, captioned. The study
   photographs moved down into the research rows, where each one sits with the
   study it came from. */
export const portrait = {
  src: "/headshot-portrait-b.png",
  width: 760,
  height: 950,
  alt: "Portrait of Momchil Gavrilov",
};

/* One-glance credibility, answering "is this person real" before any reading.
   Every figure here has to survive being asked about in an interview. */
/*
  "5 peer-reviewed" was not true and the page disproved it four screens later:
  of the five entries, one is a preprint and one is under review. A reader who
  opens the list finds the contradiction, and then has reason to doubt the
  r = 0.70 as well. Three peer-reviewed papers before finishing a master's is
  strong on its own; the inflated number bought nothing and risked everything.
*/
export const proofPoints = [
  { figure: "3", label: "Peer-Reviewed Publications" },
  { figure: "4", label: "Human Research Studies" },
  { figure: "185", label: "Participants" },
  { figure: "1", label: "Product In Daily Use" },
];

/* The through-line, drawn rather than argued. Written out as a sentence this
   reads soft, which is why it has never been on the page; as four scales with
   the study that measured each one, it is concrete and it is the thing that
   makes the researcher, the builder and the roboticist read as one person.
   Deliberately never uses the word "relationship". */
export const throughlineTitle = "The Same Question, Four Scales";

export const throughline = [
  {
    scale: "The body",
    question: "Does the hand become yours?",
    study: "Prosthetic embodiment",
    slug: "prosthetic-embodiment",
  },
  {
    scale: "The mind",
    question: "Did you cause that, or did it just happen?",
    study: "Sense of agency",
    slug: "sense-of-agency",
  },
  {
    scale: "The clinic",
    question: "Do the experts trust the measure?",
    study: "Prosthesis assessment",
    slug: "prosthesis-assessment-survey",
  },
  {
    scale: "The machine",
    question: "What does it sense, and how sure is it?",
    study: "Vehicle perception",
    slug: "autonomous-perception",
  },
];

/* Labelled as learning on purpose. He is reading toward medical device work
   and has not yet worked under these standards; claiming otherwise would not
   survive the first interview question. The label does the whole job, so it
   never gets dressed up. It lives beside Contact, after the evidence. */
export const standardsNote = "Currently learning";
export const standards = [
  "FDA HFE Guidance",
  "IEC 62366-1",
  "ISO 14971",
  "ISO 13485",
  "IEC 60601",
  "EU MDR",
];

export const storyTitle = "Why I Do This";

export const story: string[] = [
  "Everything started with a single LED blinking on a breadboard. I bought a circuit kit in undergrad out of pure curiosity, and when I made that little light glow, I felt how much had gone into it.",
  "I saw the physicists who gave their lives to defining electricity, and the engineers who shaped it so a student could make a light turn on. Then I started seeing it everywhere: the plaster walls, the heat coming from my vent, the bed where I sat. Someone's effort poured into every object in my room, made for a person they would never meet. That's when I felt the pull to be on the other side of that exchange.",
  "I sent pictures of that LED to my friends. It was a tiny thing, but it was mine, and all I wanted to do was share it.",
  "My fascination with people led me to study kinesiology: how we move, think, and interact with the world. Then a professor introduced me to brain-computer interfaces, and one idea inspired me. Technology could integrate with a body so seamlessly that it stopped feeling like a tool and started feeling like part of you. I spent the next three years measuring that with real people, and five peer-reviewed publications came out of it.",
  "But I found that sometimes research didn't make it out of the lab to have the impact it was meant to, so I learned to build. The most recent is Wellspring, a donation app a women's center uses every day, and the volunteers use it without training. Research taught me what people need. Building taught me how to put it in their hands. Now I work for the moment when something I made stops being mine and becomes theirs.",
];

export const contact = {
  footnote: "Designed and Built with Care",
};

export const site = {
  name: "Momchil Gavrilov",
  role: "Human factors & UX researcher",
  /* Split three ways so the accent word stays content, not markup. Exactly
     one word is ever set in navy, and it is now "people": the sentence
     describes the work, the accent names who it is for. */
  tagline: {
    lead: "I design how",
    accent: "people",
    tail: "interact with physical and digital systems",
  },
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
    label: "Resume",
    url: "/momchil-gavrilov-human-factors-resume.pdf",
  },
};

/* The portrait returns to full size in this design, as a bordered card with a
   navy identity plate beneath it. It is a filing card, not a hero image: the
   thesis holds the headline and the face sits beside it, captioned. The study
   photographs moved down into the research rows, where each one sits with the
   study it came from. */
export const portrait = {
  src: "/headshot.jpg",
  width: 808,
  height: 1010,
  alt: "Portrait of Momchil Gavrilov",
};

/*
  One-glance credibility, answering "is this person real" before any reading.
  Every figure here has to survive being asked about in an interview.

  "4 human research studies" came out: it restated what 185 participants and
  5 publications already said. Its slot went to the three clinical years,
  which say something nothing else on the page does, that he has stood in the
  environment a medical device actually gets used in.
*/
export const proofPoints = [
  { figure: "185", label: "Research Participants" },
  { figure: "5", label: "Publications" },
  { figure: "3", label: "Years in Clinical Care" },
  { figure: "1", label: "Product In Daily Use" },
];

export const skillsTitle = "Skills";

/*
  Three groups, all visible, none behind a click.

  Grouped the way his resume groups them, because this band stands in for the
  resume's skills block for a reader who has not downloaded it. Terms stay
  checked against the four live postings (Apple, Amgen, Akkodis, US Tech
  Solutions): "task and workflow analysis" and "mixed methods" are their
  words, "human performance analysis" appears almost verbatim in two of them.
  Everything here is demonstrated by a case study below; nothing is
  aspirational, which is what the Learning row underneath is for.
*/
export const skillGroups = [
  {
    group: "Usability engineering",
    items: [
      "Formative usability testing",
      "Task and workflow analysis",
      "Use-error informed design",
      "Human performance analysis",
      "HMI evaluation",
    ],
  },
  {
    group: "Research",
    items: [
      "Study design and protocol development",
      "Participant recruitment",
      "Session moderation",
      "Mixed methods analysis",
      "Psychometrics",
    ],
  },
  {
    group: "Technical",
    items: [
      "R",
      "Python",
      "MATLAB",
      "C/C++",
      "Figma",
      "EMG and biosignal processing",
      "ROS2",
    ],
  },
];

/*
  Not a disclosure. Collapsing these undid the whole point of the band: the
  standards vocabulary is the single fastest signal to a medical device reader
  that this candidate is oriented to their world, and behind a click most
  scanners never see it. It lines the bottom of the band, always open, under a
  label that keeps the claim honest.
*/
export const standardsNote = "Learning";
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
  /* Two cuts, both of the same kind. The publication count and the Wellspring
     name were the story reaching back for credentials the rest of the page
     has already made, and by the time a reader arrives here they have seen
     both. Removing them leaves the paragraphs doing the one thing this
     section is for. His sentences otherwise untouched. */
  "My fascination with people led me to study kinesiology: how we move, think, and interact with the world. Then a professor introduced me to brain-computer interfaces, and one idea inspired me. Technology could integrate with a body so seamlessly that it stopped feeling like a tool and started feeling like part of you. I spent the next three years measuring that with real people.",
  "But I found that sometimes research didn't make it out of the lab to have the impact it was meant to, so I learned to build. Research taught me what people need. Building taught me how to put it in their hands. Now I work for the moment when something I made stops being mine and becomes theirs.",
];

export const contact = {
  footnote: "Designed and Built with Care",
};

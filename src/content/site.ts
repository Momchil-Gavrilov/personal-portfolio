export const site = {
  name: "Momchil Gavrilov",
  role: "Human factors & UX researcher",
  /* Split so the accent word stays content, not markup. Exactly one word is
     ever set in navy; the italic came off because at 84px it read as a
     different typeface rather than as emphasis. */
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

/* One-glance credibility, answering "is this person real" before any reading.
   Every figure here has to survive being asked about in an interview. */
/*
  Ordered by magnitude, so the row reads as a descent rather than as four
  unrelated facts and the largest number lands first.

  No "peer-reviewed" qualifier on the publication count. Three have cleared
  review, one is in review and one is in submission; the list below names
  every venue exactly, and a scientific reader reads those correctly without
  being told. The count is honest; the label it used to carry was not.

*/
export const proofPoints = [
  { figure: "185", label: "Participants" },
  { figure: "5", label: "Publications" },
  { figure: "4", label: "Human Research Studies" },
  { figure: "1", label: "Product In Daily Use" },
];

export const practiceTitle = "Skills";

/*
  Grouped exactly as his resume groups them, so a recruiter holding both
  documents sees the same four headings in the same order. The terms are his
  too; this is the resume's skills block, set as chips.

  Rendered as tags rather than stacked lists. Four columns of short lines read
  as four paragraphs of prose from any distance, which is the opposite of what
  this band is for.

  Regulatory knowledge keeps his resume's wording. Knowing a standard and
  having worked under one are different claims, and "knowledge" makes only the
  first. Nothing here says he has run a submission.
*/
export const skillGroups = [
  {
    group: "Usability engineering",
    items: [
      "Formative testing",
      "Session moderation",
      "Task and protocol design",
      "Use-error informed design",
      "HMI evaluation",
    ],
  },
  {
    group: "Experimental design and statistics",
    items: [
      "Within-subject",
      "Factorial",
      "RCT and A/B",
      "Psychometrics",
      "Bayesian and inferential stats",
      "Regression",
    ],
  },
  {
    group: "Regulatory knowledge",
    items: [
      "FDA HFE Guidance",
      "IEC 62366-1",
      "ISO 14971",
      "ISO 13485",
      "IEC 60601",
      "EU MDR",
    ],
  },
  {
    group: "Technical",
    items: [
      "R",
      "MATLAB",
      "Python",
      "C/C++",
      "Figma",
      "EMG and biosignal processing",
      "ROS2",
      "CAD",
      "Git",
    ],
  },
];

export const storyTitle = "Why I Do This";

export const story: string[] = [
  "Everything started with a single LED blinking on a breadboard. I bought a circuit kit in undergrad out of pure curiosity, and when I made that little light glow, I felt how much had gone into it.",
  "I saw the physicists who gave their lives to defining electricity, and the engineers who shaped it so a student could make a light turn on. Then I started seeing it everywhere: the plaster walls, the heat coming from my vent, the bed where I sat. Someone's effort poured into every object in my room, made for a person they would never meet. That's when I felt the pull to be on the other side of that exchange.",
  "I sent pictures of that LED to my friends. It was a tiny thing, but it was mine, and all I wanted to do was share it.",
  /* "five peer-reviewed publications" was the last place on the site making
     that claim: three have cleared review, one is in review, one is in
     submission. One word removed, nothing else touched. */
  "My fascination with people led me to study kinesiology: how we move, think, and interact with the world. Then a professor introduced me to brain-computer interfaces, and one idea inspired me. Technology could integrate with a body so seamlessly that it stopped feeling like a tool and started feeling like part of you. I spent the next three years measuring that with real people, and five publications came out of it.",
  "But I found that sometimes research didn't make it out of the lab to have the impact it was meant to, so I learned to build. The most recent is Wellspring, a donation app a women's center uses every day, and the volunteers use it without training. Research taught me what people need. Building taught me how to put it in their hands. Now I work for the moment when something I made stops being mine and becomes theirs.",
];

export const contact = {
  footnote: "Designed and Built with Care",
};

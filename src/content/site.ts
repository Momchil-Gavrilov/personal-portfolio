export const site = {
  name: "Momchil Gavrilov",
  role: "Human factors & UX researcher",
  tagline:
    "I study how people and technology relate, and I build technology worth relating to.",
  credentials: [
    "4 years of human-machine interaction research",
    "5 peer-reviewed publications",
    "M.S. Biomedical Engineering, UC Davis",
  ],
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

/* One-glance credibility, answering "is this person real" before any reading.
   Every figure here has to survive being asked about in an interview. */
export const proofPoints = [
  { figure: "5", label: "Peer-Reviewed Publications" },
  { figure: "4", label: "Human Research Studies" },
  { figure: "185", label: "Participants" },
  { figure: "1", label: "Product In Daily Use" },
];

/* Labelled as learning on purpose. He is reading toward medical device work
   and has not yet worked under these standards; claiming otherwise would not
   survive the first interview question. */
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
  "My fascination with people led me to study kinesiology: how we move, think, and interact with the world. Then a professor introduced me to brain-computer interfaces, and one idea inspired me. Technology could integrate with a body so seamlessly that it stopped feeling like a tool and started feeling like part of you. I spent the next three years measuring that with real people, and five peer-reviewed publications came out of it.",
  "But I found that sometimes research didn't make it out of the lab to have the impact it was meant to, so I learned to build. The most recent is Wellspring, a donation app a women's center uses every day, and the volunteers use it without training. Research taught me what people need. Building taught me how to put it in their hands. Now I work for the moment when something I made stops being mine and becomes theirs.",
];

export const skills = [
  {
    label: "Research",
    text: "moderated usability testing, formative evaluation, interviews, surveys, A/B testing, psychometrics, longitudinal field studies",
  },
  {
    label: "Analysis",
    text: "Bayesian & inferential statistics, regression, factor analysis (R, Python, MATLAB)",
  },
  {
    label: "Craft",
    text: "Figma prototyping, biosignal acquisition (EMG), Git, and enough engineering to build what I design",
  },
];

export const contact = {
  /* Just the availability. The role is already named in the hero eyebrow and
     the medical device intent is carried by the standards chips and the
     prosthetics research, so naming either again here only narrows him. */
  availability: "Open to opportunities",
  footnote: "Designed and Built with Care",
};

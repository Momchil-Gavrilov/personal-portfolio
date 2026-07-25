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
  /* Domain line under the tagline: lets a medical-device reader self-identify
     without displacing the tagline. */
  domains: "Medical devices, assistive technology, and human-machine systems.",
};

/* One-glance credibility, answering "is this person real" before any reading.
   Counts are from the studies on this site: 23 + 38 + 8 participants. */
export const proofPoints = [
  { figure: "5", label: "peer-reviewed publications" },
  { figure: "3", label: "human-machine studies" },
  { figure: "69", label: "study participants" },
  { figure: "~90%", label: "task time removed at Wellspring" },
  { figure: "3", label: "products live and in use" },
];

export const standards = [
  "FDA HFE Guidance",
  "IEC 62366-1",
  "ISO 14971",
  "ISO 13485",
  "IEC 60601",
  "EU MDR",
];

export const storyTitle = "Why I do this";

export const story: string[] = [
  "Everything started with a single LED blinking on a breadboard. I bought a circuit kit in undergrad out of pure curiosity, and when I made that little light glow, I felt how much had gone into it.",
  "I saw the physicists who gave their lives to defining electricity, and the engineers who shaped it so a student could make a light turn on. Then I started seeing it everywhere: the plaster walls, the heat coming from my vent, the bed where I sat. Someone's effort poured into every object in my room, made for a person they would never meet. I sent pictures of that LED to my friends. It was a tiny thing, but it was mine. That's when I felt the pull to be on the other side of that exchange.",
  "My fascination with people led me to study kinesiology: how we move, think, and interact with the world. Then a professor introduced me to brain-computer interfaces, and one idea inspired me. Technology could integrate with a body so seamlessly that it stopped feeling like a tool and started feeling like part of you. I spent the next three years measuring that with real participants, and five peer-reviewed publications came out of it.",
  "But research does not always reach the people it was for. I wanted what I felt with that LED, so I learned to build. The most recent is Wellspring, a donation app a women's center uses every day, and the volunteers use it without training. Research taught me what people need. Building taught me how to put it in their hands. The best moment is when something I made stops being mine and becomes theirs, and I want to keep making that happen.",
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
  line: "If you're building technology for people, I'd love to talk.",
  footnote: "Designed and built by me, with care.",
};

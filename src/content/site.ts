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
  src: "/headshot.jpg",
  width: 808,
  height: 1010,
  alt: "Portrait of Momchil Gavrilov",
};

/* One-glance credibility, answering "is this person real" before any reading.
   Every figure here has to survive being asked about in an interview. */
/*
  Dropped the "peer-reviewed" qualifier rather than the count. All five are
  real output, the list below names every venue exactly, and a scientific
  reader reads "Research Square (preprint)" correctly without being told.
  What is no longer here is a label the page itself contradicted.

  "Sessions Run" replaces "Participants". The old figure summed everyone
  across all four studies, including 100 survey respondents he did not field.
  61 is the number he personally sat in a room with, and for a consultancy
  asking whether a new hire can be put on a study next month, sessions
  moderated is the more useful and the more defensible number.
*/
export const proofPoints = [
  { figure: "5", label: "Publications" },
  { figure: "4", label: "Human Research Studies" },
  { figure: "61", label: "Lab Sessions Run" },
  { figure: "1", label: "Product In Daily Use" },
];

/*
  The billability answer, in the slot the through-line used to hold.

  A consultancy hiring at entry level is asking one question before any other:
  can this person be put on a study next month without someone standing over
  them. Findings do not answer that. The unglamorous operational half does,
  and it is the half a new graduate is least likely to be able to evidence.

  Four stages of a real study, in order, each with the specific thing he did.

  NOTHING HERE MAY BE INFERRED. An earlier draft said he wrote the IRB, which
  he did not; the claim came from reading "Protocol, IRB" in a spec rail and
  filling in the rest. Every line now names an act he has stated in his own
  words in the case study prose, and nothing adjacent to it.

  Stage four ends on what he did NOT do on one study, because a reader who
  sees credit drawn precisely stops wondering whether the rest is inflated.
*/
export const practiceTitle = "A Study, End to End";
export const practiceDeck =
  "What I personally did on the studies below.";

export const practice = [
  {
    stage: "Design",
    detail:
      "I designed the forced-choice paradigm for the agency study and its staircase logic, then programmed the task on the Kinarm platform.",
  },
  {
    stage: "Apparatus",
    detail:
      "The EMG prosthetic hand was not working when the embodiment study needed it. I restored it before we could run a single participant.",
  },
  {
    stage: "Recruiting and sessions",
    detail:
      "I recruited and ran all 38 participants on the agency study, and the sessions on the embodiment study, to the same script every time.",
  },
  {
    stage: "Analysis",
    detail:
      "Psychometric models, statistics and figures. On the survey study the analysis was the whole of my contribution, and I did not field it.",
  },
];

/* Labelled as learning on purpose. He is reading toward medical device work
   and has not yet worked under these standards; claiming otherwise would not
   survive the first interview question. The label does the whole job, so it
   never gets dressed up. It sits under the credentials, where for a medical
   device reader the vocabulary itself is worth something. */
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

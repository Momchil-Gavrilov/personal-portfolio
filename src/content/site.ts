export const site = {
  name: "Momchil Gavrilov",
  role: "Human factors & UX researcher",
  /* Split so the accent word stays content, not markup. Exactly one word is
     ever set in navy italic; that pattern is deliberate and does not change.
     The word itself moved from "adopt" to "trust" in the 2c design. */
  tagline: { lead: "I design technology that people", accent: "trust" },
  degree: "M.S. Biomedical Engineering, UC Davis",
  /* The domain used to arrive four screens down, in the research section. For
     a consultancy that does medical device work it is the differentiator, so
     it belongs beside the name. A list of subjects, not of job titles. */
  domain: "Prosthetics, rehabilitation robotics, and human-machine interaction",
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
  Ordered by magnitude, so the row reads as a descent rather than as four
  unrelated facts and the largest number lands first.

  No "peer-reviewed" qualifier on the publication count. Three have cleared
  review, one is in review and one is in submission; the list below names
  every venue exactly, and a scientific reader reads those correctly without
  being told. The count is honest; the label it used to carry was not.

  The 61 sessions he personally ran are not lost, they moved into the
  practice band where they do more work.
*/
export const proofPoints = [
  { figure: "185", label: "Participants" },
  { figure: "5", label: "Publications" },
  { figure: "4", label: "Human Research Studies" },
  { figure: "1", label: "Product In Daily Use" },
];

/*
  The billability answer, in the slot the through-line used to hold.

  An employer hiring at entry level asks one question before any other: can
  this person be put on a study next month without someone standing over them.
  Findings do not answer that. The operational half does, and it is the half a
  new graduate is least likely to be able to evidence.

  The labels are deliberately the vocabulary of the job rather than of the
  lab. An Amgen HFE posting lists "study planning, protocol development, study
  moderation, data collection, participant recruitment, data analysis"; a
  reader scanning this grid should see their own requisition looking back.

  NOTHING HERE MAY BE INFERRED. An earlier draft said he wrote the IRB, which
  he did not; the claim came from reading "Protocol, IRB" in a spec rail and
  filling in the rest. Every line now names an act he has stated in his own
  words, and every one carries the study it came from, so no reader has to
  guess which claim belongs to which piece of work. That attribution is the
  whole defence against the error above.

  Two lines volunteer a limit: analysis on data he neither collected nor
  designed, and data handling under someone else's approved protocol. Both
  read as weaknesses in a lab and as strengths in industry, where junior staff
  almost always execute a design somebody else owns.
*/
export const practiceTitle = "Skills";
export const practiceDeck =
  "61 lab sessions run, 3 studies analysed, 2 products shipped.";

/*
  Grouped rather than listed. A flat wall of twenty terms is unscannable, and
  the groups themselves carry information: a reader looking for someone who
  can run a study sees a column headed "Running studies" and stops there.

  Every term is backed by something concrete in the case studies below.
  Nothing aspirational sits in the first three groups; anything he has not
  yet done lives in the fourth, under a label that says so.
*/
export const skillGroups = [
  {
    group: "Running studies",
    items: [
      "Protocol development",
      "Participant recruitment",
      "Study moderation",
      "Contextual interviews",
      "Consent and data handling",
    ],
  },
  {
    group: "Analysis",
    items: [
      "Psychophysics",
      "Psychometric modelling",
      "Statistical analysis",
      "Survey analysis",
      "Data visualisation",
    ],
  },
  {
    group: "Design and build",
    items: [
      "Task programming (Kinarm)",
      "Figma prototyping",
      "Full-stack web apps",
      "Sensor fusion and SLAM",
      "EMG hardware",
    ],
  },
];

/* Labelled as learning on purpose. He is reading toward medical device work
   and has not yet worked under these standards; claiming otherwise would not
   survive the first interview question. The label does the whole job, so it
   never gets dressed up. It sits under the credentials, where for a medical
   device reader the vocabulary itself is worth something. */
export const standardsNote = "Learning";
export const standards = [
  "FDA HFE Guidance",
  "IEC 62366-1",
  "ISO 14971",
  "ISO 13485",
  "IEC 60601",
  "EU MDR",
];

/*
  The judgment evidence, promoted rather than written.

  Capability, ownership and reliability were all evidenced somewhere on this
  page; judgment was not, and it is the one that separates "can follow a
  protocol" from "worth investing in". Each of these is a real decision made
  under uncertainty, already stated in the case study prose, where a reader
  who never opens a case study would never find it.

  Every line paraphrases his own words in the relevant case study. Nothing
  here is a decision he has not already described making.
*/
export const decisionsTitle = "Three Decisions";
export const decisionsDeck =
  "The moments where the work could have gone another way.";

export const decisions = [
  {
    label: "When the measure is the problem",
    text: "The field's standard test of agency was picking up causal expectation rather than intention. Rather than work around it, I held causation constant so that intention was the only thing left varying.",
    study: "Sense of agency",
    slug: "sense-of-agency",
  },
  {
    label: "When the obvious question is the wrong one",
    text: "We could have started from the interface. The more honest question was why a student opens a campus app at all, so we went to the coffee shop where students actually are and asked about their day instead of their screens.",
    study: "UC Davis Mobile",
    slug: "uc-davis-mobile",
  },
  {
    label: "When the constraint is the person, not the software",
    text: "A volunteer at intake has a queue and a lot of noise, so logging a donation could never compete with helping the person in front of them. I separated the two rather than making the form faster.",
    study: "Wellspring",
    slug: "wellspring",
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

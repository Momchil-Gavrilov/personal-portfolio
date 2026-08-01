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
    /* One word, so the label column holds one line. "Usability engineering"
       was the only group name that wrapped, and the wrap pushed its whole
       row of terms down against the next one. */
    group: "Usability",
    items: [
      "Formative testing",
      "Task analysis",
      "Use-error design",
      "Human performance analysis",
      "HMI evaluation",
    ],
  },
  {
    group: "Research",
    items: [
      "Study design",
      "Participant recruitment",
      "Session moderation",
      "Mixed methods",
      "Psychometrics",
    ],
  },
  {
    group: "Technical",
    items: ["R", "Python", "MATLAB", "C/C++", "Figma", "EMG", "ROS2", "CAD - SolidWorks", "Signal processing"],
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

/* His latest rewrite, verbatim. He has now revised this passage several
   times and been right each time; the only edits here are his own. */
export const story: string[] = [
  "Everything started with a single LED blinking on a breadboard. I bought a circuit kit in undergrad out of pure curiosity, and when I made that light glow, my world changed.",
  "I saw the physicists who gave their lives to define electricity, and the engineers who shaped it so a student like me could make a light blink. Then I started seeing it everywhere: the four walls around me, the heat coming from my vent, the bed where I sat. Someone's effort poured into every object in my room, made for a person they would never meet. That's when I felt that I wanted to be on the other side of that exchange.",
  "My fascination with people led me to study kinesiology: how we move, think, and interact with the world. When a professor introduced me to brain-computer interfaces, the concept inspired me. Technology that could integrate with a body so seamlessly that it stopped feeling like a tool and started feeling like part of you. I spent the next three years measuring that relationship between people and machines.",
  "But I found that sometimes research didn't make it out of the lab to have the impact it was meant to, so I learned to develop technology. Research taught me what people need. Engineering taught me how to put it in their hands. Now I work for the moment when something I make stops being mine and becomes someone else's.",
];

export const contact = {
  footnote: "Designed and Built with Care",
};

/*
  The colourway widget in the footer, and no sentences at all.

  It has been through a heading with two paragraphs and a bar chart, then a
  label with one line of prose, and is now a label, three swatches and two
  links. Each cut was the same correction: it is a toy in the footer, not a
  section, and every word it spends explaining itself makes it look like it
  needs explaining. A reader who has just been asked to book a call should
  not then be asked to read anything about paint.

  What is left says it by being usable. The label names the offer, the
  swatches are self-evident, and the vote link changes to "Change my vote"
  with the counts beside it, which is the whole loop in two words and three
  numbers.

  The second link is the one that asks for words. It is deliberately not
  about colour: someone who came from a post and has an opinion about the
  site should not have to find an email address to say it, and the box that
  is already here is the shortest path between the two.
*/
export const colourway = {
  label: "Customize your experience",
  cta: "Vote for this one",
  change: "Change my vote",
  feedback: "Leave feedback",
  /* Second person and open, because "Feedback" as a placeholder gets
     "looks good" and a question gets an answer. */
  feedbackPlaceholder: "What is on your mind?",
  feedbackSend: "Send",
  feedbackThanks: "Thank you. I read every message.",
  feedbackError: "That did not send. Worth another try.",
  feedbackThrottled: "One message a minute. Try again shortly.",
};

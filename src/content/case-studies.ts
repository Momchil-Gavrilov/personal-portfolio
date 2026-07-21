export type CaseStudySection = {
  /* One of the six narrative stages */
  heading:
    | "Context"
    | "Research question"
    | "Approach"
    | "What I did"
    | "What we found"
    | "Impact";
  paragraphs: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  oneLiner: string;
  /* Short metadata shown on cards and at the top of the page,
     e.g. method · sample · platform */
  meta: string[];
  status: "published" | "coming-soon";
  /* Hidden studies exist in content but do not render anywhere yet */
  hidden?: boolean;
  sections?: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sense-of-agency",
    title: "The Sense of Agency",
    oneLiner:
      "A 38-participant randomized study of user perception during human-robot interaction, designed and run end-to-end on a Kinarm robotic platform.",
    meta: [
      "Psychophysics · two-alternative forced choice",
      "38 participants, randomized between groups",
      "Kinarm robotic platform",
    ],
    status: "published",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "The sense of agency — the experience of controlling your own actions and their outcomes — sits at the heart of how people relate to assistive devices. A prosthesis or exoskeleton that moves your body without feeling like you is a device people abandon. Researchers often measure agency through intentional binding: the subjective compression of time between a voluntary action and its sensory outcome. But the standard methods are cognitively demanding for participants, and recent work suggested the effect might reflect causal expectations rather than intention itself.",
        ],
      },
      {
        heading: "Research question",
        paragraphs: [
          "Could we isolate intention from causation in measuring the sense of agency — and find a measure that survives the separation? If intentional binding mostly reflects cause-and-effect expectations, what part of temporal perception actually tracks the experience of intending a movement?",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "We designed a psychophysical two-alternative forced-choice study that matched causal outcomes across conditions, so any difference between groups could be attributed to intention rather than causation. Participants performed pairs of movements on a Kinarm robotic platform and judged which of two intervals — between a visual cue at the end of movement and a post-movement tone — was shorter. The experimental group compared active (self-initiated) movements against passive ones delivered by the robot; the control group compared two passive movements. A randomized between-groups design (n = 19 per group) kept each participant's judgments uncontaminated by the other condition.",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "I designed and ran the study end-to-end: developing the protocol and its psychophysical staircase logic, programming the Kinarm task, taking the protocol through IRB approval, recruiting and running all 38 participants, and fitting the psychometric models for analysis.",
        ],
      },
      {
        heading: "What we found",
        paragraphs: [
          "The two groups showed no difference in time-compression bias (the point of subjective equality) — but the experimental group showed significantly lower just-noticeable-difference values (p < 0.01), reflecting a lower temporal difference limen. In plain terms: intending a movement didn't shift how long the interval felt, but it sharpened participants' temporal discrimination. That precision, not the bias, is what tracked intention.",
        ],
      },
      {
        heading: "Impact",
        paragraphs: [
          "The finding supports recent claims that intentional binding may primarily reflect causal binding, and offers the temporal difference limen as an implicit measure of the sense of agency — one that doesn't rely on asking users what they felt. The work produced a peer-reviewed conference paper at ICORR 2025 and a full journal manuscript, and the paradigm is now available for evaluating agency in assistive-device interaction.",
        ],
      },
    ],
  },
  {
    slug: "prosthetic-embodiment",
    title: "Embodiment of a Prosthetic Hand",
    oneLiner:
      "Restoring a non-functional EMG-controlled prosthetic hand, then running formative usability evaluations and a 23-participant within-subject study of embodiment.",
    meta: [
      "Formative usability evaluation · within-subject study",
      "23 participants",
      "EMG-controlled prosthesis",
    ],
    status: "coming-soon",
  },
  {
    slug: "uc-davis-mobile",
    title: "UC Davis Mobile Redesign",
    oneLiner:
      "User research, usability testing, and prototyping for a campus app — awarded “Most User-Centered Design.”",
    meta: ["User research · usability testing · prototyping", "Figma"],
    status: "coming-soon",
  },
  {
    slug: "intentional-binding-methods",
    title: "A Forced-Choice Paradigm for Intentional Binding",
    oneLiner:
      "An 8-participant methods study extending intentional-binding measurement to whole-limb movements, published at ICORR 2025.",
    meta: ["Psychophysics methods study", "8 participants", "Kinarm"],
    status: "coming-soon",
    hidden: true,
  },
  {
    slug: "wearable-longitudinal",
    title: "Wearables in the Wild",
    oneLiner:
      "A 16-athlete, 8-month longitudinal study monitoring biomechanical and psychological state with wearable technology.",
    meta: ["Longitudinal field study", "16 athletes · 8 months", "IMUs · force plates"],
    status: "coming-soon",
    hidden: true,
  },
];

export const visibleCaseStudies = caseStudies.filter((cs) => !cs.hidden);

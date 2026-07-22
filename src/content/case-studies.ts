export type CaseStudySection = {
  /*
    Narrative template (adapt headings per study):
    problem/goal → thinking → action → result → takeaway
  */
  heading: string;
  paragraphs: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  oneLiner: string;
  /* Short metadata shown on cards and at the top of the page,
     e.g. method · sample · platform */
  meta: string[];
  /* "product" studies render as app-icon tiles; "research" as editorial cards */
  category: "product" | "research";
  /* One or two letters shown on the product tile when there is no icon yet */
  monogram?: string;
  status: "published" | "coming-soon";
  /* Hidden studies exist in content but do not render anywhere yet */
  hidden?: boolean;
  sections?: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "wellspring",
    title: "Wellspring Donation Tracker",
    oneLiner:
      "A women's center needed donation tracking their volunteers would actually use. I designed, built, and deployed it end to end, and it runs the center's intake today.",
    meta: [
      "Product design · full-stack build · live in production",
      "React, TypeScript, Express, MongoDB",
      "Installable web app (PWA)",
    ],
    category: "product",
    monogram: "W",
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The Wellspring Women's Center runs on donated goods, and donated goods arrive fast: bags of clothing, hygiene supplies, food, all logged by whichever volunteer is at the table. The center needed to know what came in, what it was worth, and how to report it, but volunteers are busy people with a line in front of them. Any tool slower than pen and paper would be abandoned by the second shift.",
        ],
      },
      {
        heading: "My thinking",
        paragraphs: [
          "I treated speed of a single log entry as the make-or-break metric, and designed everything backward from the volunteer's minute. That meant a mobile-first app on the phones already in their pockets, voice logging so a volunteer can speak items in while their hands are full, and automatic categorization rules so common items file themselves. It also meant respecting how the center actually works: one kind of account with volunteer and manager roles, self-service password help through a manager rather than fragile email flows, and guardrails that make it impossible to lock the last manager out. I prototyped the interface first and only then built the production system.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "The full product: volunteers log items by voice or by hand; managers review daily logs by contributor, standardize a shared catalog, set prices, and export a master sheet for reporting. Behind it sits a React and TypeScript front end, an Express and MongoDB back end deployed as serverless functions, JWT authentication, automated weekly database backups, and a built-in, role-aware help guide so onboarding never depends on me. The app installs to a phone's home screen like a native app.",
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          "The app is deployed and in use at the center now, tracking real donations. A fully isolated demo deployment with fake data exists so anyone can try it without touching the center's records.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "Shipping to non-technical users taught me that adoption is designed, not hoped for. Every feature that survived is one that made a volunteer's minute shorter, and every feature I cut was one that only made sense to me.",
        ],
      },
    ],
  },
  {
    slug: "sense-of-agency",
    title: "The Sense of Agency",
    oneLiner:
      "The field's standard measure of a person's sense of control stopped holding up, so we built a sharper one. A 38-participant randomized study I designed and ran end to end.",
    meta: [
      "Psychophysics · two-alternative forced choice",
      "38 participants, randomized between groups",
      "Kinarm robotic platform",
    ],
    category: "research",
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The sense of agency, the experience of controlling your own actions, is central to how people relate to assistive devices: a prosthesis that moves your body without feeling like you is a device people abandon. For years, researchers measured agency through intentional binding, the way time seems to compress between a voluntary action and its outcome. But the method was showing cracks. It demands a lot of cognitive effort from participants, and newer studies suggested the effect might reflect expectations about cause and effect rather than intention itself. What we thought measured a person's sense of control no longer clearly did, and we needed to find what does.",
        ],
      },
      {
        heading: "My thinking",
        paragraphs: [
          "If causal expectations were contaminating the measure, the fix was to hold causation constant and let intention be the only thing that varied. I designed a two-alternative forced-choice study around that idea: every participant judged the same kind of causal event, and only whether they had initiated the movement differed. Forced-choice psychophysics also lightened the cognitive load, replacing time estimation with a simple which-was-shorter judgment. A randomized between-groups design, with one group comparing active against passive movements and the other comparing two passive movements, kept each participant's judgments clean.",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "I ran the study end to end: developing the protocol and its psychophysical staircase logic, programming the task on the Kinarm robotic platform, taking the protocol through IRB approval, recruiting and running all 38 participants, and fitting the psychometric models for analysis.",
        ],
      },
      {
        heading: "What we found",
        paragraphs: [
          "The two groups showed no difference in time-compression bias, the effect the field had been leaning on. But the group that made voluntary movements showed significantly sharper temporal discrimination (p < 0.01), a lower temporal difference limen. Intending a movement didn't change how long the interval felt; it changed how precisely people could perceive it. The precision, not the bias, is what tracked intention.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "The classic effect may largely reflect causal binding rather than intention, and the temporal difference limen offers an implicit way to measure the sense of agency without asking users what they felt. The work produced a peer-reviewed conference paper at ICORR 2025 and a journal manuscript now under review, and the paradigm is available for evaluating agency in assistive-device interaction.",
        ],
      },
    ],
  },
  {
    slug: "prosthetic-embodiment",
    title: "Embodiment of a Prosthetic Hand",
    oneLiner:
      "Bionic hands keep getting better, yet users keep abandoning them. We measured what makes a prosthesis feel like part of you, in a 23-participant closed-loop study.",
    meta: [
      "Formative usability evaluation · within-subject study",
      "23 participants",
      "EMG-controlled prosthesis-like system",
    ],
    category: "research",
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Modern bionic hands offer remarkable control and even sensory feedback, yet abandonment rates stay stubbornly high. Part of the reason is embodiment: whether the device feels like part of your body. Embodiment has three components, the sense of owning the hand, the sense of controlling it, and the sense of the space it occupies, but the field measures them inconsistently, and nobody had a unified picture of how they interact when someone actually operates a prosthesis.",
        ],
      },
      {
        heading: "Our thinking",
        paragraphs: [
          "Instead of studying embodiment through illusions or passive setups, we wanted people using a real prosthesis-like system in a closed loop: intending a grasp, seeing it happen, feeling it happen. By systematically varying the sensorimotor cues, whether participants had voluntary control, whether they received matching tactile feedback, and where the hand sat in space, we could watch each component of embodiment respond on its own. We paired explicit questionnaire ratings with implicit measures, intentional binding for agency and proprioceptive drift for the sense of space, to see whether what people report matches what their perception reveals.",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "I restored the lab's non-functional EMG-controlled prosthetic hand to working order, ran formative usability evaluations of the restored system, and helped design and run the 23-participant within-subject study in which participants performed grasping tasks with the hand while we manipulated its control and feedback.",
        ],
      },
      {
        heading: "What we found",
        paragraphs: [
          "Every measure of embodiment was significantly higher when participants had voluntary control with matching tactile feedback (p < 0.05 against control conditions). Ownership correlated strongly with agency (r = 0.70) and with intentional binding (r = 0.56), but not with peripersonal space (r = -0.03), suggesting the sense of where the hand lives in space is its own phenomenon. Explicit and implicit measures of agency mostly agreed, then diverged when control and feedback were mismatched.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "Embodiment is not a switch that flips; it is a fluid experience whose components respond to specific, designable cues. For prosthesis designers, that is actionable: control and feedback each strengthen distinct parts of the experience of the hand being yours. The study is available as a preprint on Research Square.",
        ],
      },
    ],
  },
  {
    slug: "uc-davis-mobile",
    title: "UC Davis Mobile Redesign",
    oneLiner:
      "User research, usability testing, and prototyping for a campus app, awarded “Most User-Centered Design.”",
    meta: ["User research · usability testing · prototyping", "Figma"],
    category: "product",
    monogram: "UC",
    status: "coming-soon",
  },
  {
    slug: "chat-personal-trainer",
    title: "Chat Personal Trainer",
    oneLiner:
      "A conversational fitness and nutrition assistant built in 24 hours, focused on usability, personalization, and rapid deployment.",
    meta: ["Conversational UX · rapid prototyping", "Built in 24 hours"],
    category: "product",
    monogram: "C",
    status: "coming-soon",
  },
  {
    slug: "prosthesis-assessment-survey",
    title: "How Professions Assess Prostheses",
    oneLiner:
      "A survey study of how clinicians, engineers, and researchers evaluate upper-limb prostheses, and where their priorities diverge.",
    meta: ["Survey research · cross-professional", "Journal of Multidisciplinary Healthcare"],
    category: "research",
    status: "coming-soon",
  },
  {
    slug: "intentional-binding-methods",
    title: "A Forced-Choice Paradigm for Intentional Binding",
    oneLiner:
      "An 8-participant methods study extending intentional-binding measurement to whole-limb movements, published at ICORR 2025.",
    meta: ["Psychophysics methods study", "8 participants", "Kinarm"],
    category: "research",
    status: "coming-soon",
    hidden: true,
  },
  {
    slug: "wearable-longitudinal",
    title: "Wearables in the Wild",
    oneLiner:
      "A 16-athlete, 8-month longitudinal study monitoring biomechanical and psychological state with wearable technology.",
    meta: ["Longitudinal field study", "16 athletes · 8 months", "IMUs · force plates"],
    category: "research",
    status: "coming-soon",
    hidden: true,
  },
];

const bySlug = (slug: string) => caseStudies.find((cs) => cs.slug === slug)!;

/* Display order is defined here, decoupled from array order. */
export const productStudies: CaseStudy[] = [
  "wellspring",
  "uc-davis-mobile",
  "chat-personal-trainer",
].map(bySlug);

export const researchStudies: CaseStudy[] = [
  "prosthetic-embodiment",
  "sense-of-agency",
  "prosthesis-assessment-survey",
].map(bySlug);

export const visibleCaseStudies = caseStudies.filter((cs) => !cs.hidden);

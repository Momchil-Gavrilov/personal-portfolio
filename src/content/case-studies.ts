export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
  /* phone: narrow screenshot · portrait: standing photo · wide: full-column figure */
  shape?: "phone" | "portrait" | "wide";
  /* Intrinsic pixel dimensions, for correct aspect ratio */
  width?: number;
  height?: number;
};

export type CaseStudySection = {
  /*
    Narrative template (adapt headings per study):
    problem/goal → thinking → action → result → takeaway
  */
  heading: string;
  paragraphs: string[];
  image?: CaseStudyImage;
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
  /* Optional app-icon image for the product tile (overrides the monogram) */
  icon?: string;
  /* Optional live deployment to link from the case study page */
  liveUrl?: string;
  liveLabel?: string;
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
    icon: "/icons/wellspring.png",
    liveUrl: "https://wellspring-demo.vercel.app/",
    liveLabel: "Open the live demo",
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
        image: {
          src: "/wellspring/manager-dashboard.png",
          alt: "Wellspring manager view on a phone: a New Donation button, a month calendar with dots marking days that have donations, and buttons for the Master Sheet and Catalog.",
          caption:
            "The manager view: a running calendar of donations, one-tap logging, and the shared catalog and master sheet. Live in the demo.",
          shape: "phone",
          width: 860,
          height: 1864,
        },
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
    liveUrl: "https://doi.org/10.1109/ICORR66766.2025.11063055",
    liveLabel: "Read the paper",
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
        image: {
          src: "/agency/methods.png",
          alt: "Overview of the experiment. Panels A to D show the Kinarm apparatus, a participant operating it, and the task screens. Panel E diagrams one trial: an active move and a passive move, each followed by a delay and a tone, after which the participant judges which movement had the shorter delay.",
          caption:
            "The apparatus and the trial design: participants made an active and a passive movement, each followed by a tone, then judged which interval was shorter.",
          shape: "wide",
          width: 1477,
          height: 902,
        },
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
    liveUrl: "https://doi.org/10.21203/rs.3.rs-7348715/v1",
    liveLabel: "Read the paper",
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
        image: {
          src: "/embodiment/session.png",
          alt: "A study session in the lab: a participant in a lab coat operates the EMG-controlled prosthetic hand to grasp a wooden block on the table, with an occluding screen, a motion-capture camera on a tripod, and an assessment poster on the wall.",
          caption:
            "A session in progress: a participant grasps with the prosthesis-like hand while sensorimotor cues are varied and embodiment is measured.",
          shape: "portrait",
          width: 1179,
          height: 1572,
        },
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
      "The campus app was built like a social feed, not a tool students needed. We rebuilt it around why a student opens it at all, and it won “Most User-Centered Design.”",
    meta: [
      "User research · usability testing · prototyping",
      "Student interviews · Figma",
      "Awarded Most User-Centered Design",
    ],
    category: "product",
    monogram: "UC",
    icon: "/icons/ucdavis.png",
    liveUrl:
      "https://www.figma.com/proto/KGSipDKNGFWF7Y7cfg3R3b/Design-Interactive-Prototype?node-id=4-158",
    liveLabel: "View the prototype",
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The existing UC Davis app was built like a social media tool rather than something a student actually needs on a Tuesday morning. It opened on an events feed that the university rarely updated, so the first thing a student saw was usually stale. Everything that mattered, your class schedule, your tuition bill, academic advising, was scattered across different corners of the web, and the app did little to gather it. Students downloaded it, found nothing useful up front, and stopped opening it.",
        ],
      },
      {
        heading: "My thinking",
        paragraphs: [
          "We decided not to start from the interface. The more honest question was: why would a student download a UC Davis app at all, and what do they actually open it to do? If we answered that, the layout would follow. So we went to Philz, a coffee shop where students actually are, and interviewed them about their real campus days rather than asking them to react to screens.",
        ],
        image: {
          src: "/uc-davis/home.png",
          alt: "Redesigned myucdavis home screen with a UC Davis water-tower banner and large shortcut cards for Schedule Builder, MyBill, OASIS Student Advising, and Aggie Dish, above a five-item bottom navigation bar.",
          caption:
            "The redesigned home screen leads with the four things students said they open the app to do.",
          shape: "phone",
        },
      },
      {
        heading: "What I did",
        paragraphs: [
          "Those conversations distilled into a short list of what students genuinely come for, and we made that list the app's front door. The home screen became a launchpad to the four things people named most: their class schedule, the dining commons (hours and what is actually being served), OASIS for degree planning and advising, and MyBill for tuition. We rebuilt the bottom navigation around student priorities too: a bus schedule, the home page of quick links, a campus map for finding classrooms, and events. Everything else moved under a single “More” tab, present but out of the way. I contributed to the user interviews and the prototype iteration in Figma.",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "The redesign won “Most User-Centered Design” at the competition. The judges' reasoning matched ours: we had won it not by polishing the interface or reshuffling menus, but by anchoring the whole app to the student's purpose for opening it.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "The strongest design lever was not visual, it was deciding what the app was for. Looking back, there is plenty I would push further, and rebuilding it properly is something I would enjoy returning to. But the core lesson has stuck with me: figure out why someone reaches for a thing, and the design mostly tells you what it should be.",
        ],
      },
    ],
  },
  {
    slug: "casebase",
    title: "CaseBase",
    oneLiner:
      "Legal help is out of reach for many who need it most. I built a marketplace that matches clients with lawyers and uses an AI intake agent to save both sides hours per case.",
    meta: [
      "Product design · two-sided marketplace",
      "AI intake agent",
      "Built end to end",
    ],
    category: "product",
    monogram: "CB",
    icon: "/icons/casebase.png",
    liveUrl: "https://casebase-lmp.lovable.app/",
    liveLabel: "Open the live site",
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "As an international student, I kept running into how hard it is to get legal help, whether for a landlord dispute or a green card filing, and I watched friends hit the same wall. When I looked into it, the scale surprised me: in roughly a third of civil cases in the US, at least one side goes to court without a lawyer. It has a name, the justice gap, and it falls hardest on people with the least means, who go without help they genuinely need. The other side of the market is struggling too. Freelance and small-firm lawyers find it real work to reach the clients they could serve.",
        ],
      },
      {
        heading: "My thinking",
        paragraphs: [
          "Both sides needed the same thing, each other, and neither could find it efficiently. That is a matching problem, so I designed a marketplace around it, the way Airbnb matches hosts with travelers. A marketplace also has a structural advantage: network effects. Every lawyer who joins makes it more useful to clients, and every client makes it more attractive to lawyers, so the match gets better as it grows.",
          "The detail I kept coming back to was intake. Lawyers spend hours asking every new client the same opening questions, and clients wait anxiously just to be heard. So I put an AI intake agent at the front door: it gathers a client's situation the moment they arrive, gives them immediate support instead of a waiting room, and hands the lawyer a structured case summary instead of a cold first call.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "I built the product end to end: the two-sided matching between clients and lawyers, and the AI intake agent that runs the first conversation and prepares the case. I focused the design on the three assumptions that make or break a marketplace, trust, matching, and onboarding, and used user workflows and a working prototype to pressure-test them.",
          "The front door reflects that. Both sides enter through the same page but immediately pick their side, help-seeker or lawyer, so each sees a product shaped for them. The language stays plain and reassuring rather than legal, and the promise of privacy sits right where a nervous first-time user looks. It is the same instinct as the rest of my work: meet people where they are and make the next step obvious.",
        ],
        image: {
          src: "/casebase/landing.png",
          alt: "CaseBase landing screen with the headline “Legal help, made simple,” a short list of reassurances, and a sign-in card that lets a visitor choose between “I need help” and “I'm a lawyer.”",
          caption:
            "The entry point: one page, two audiences. Plain-language framing and a visible privacy promise lower the barrier for someone seeking help.",
          shape: "wide",
          width: 1800,
          height: 1125,
        },
      },
      {
        heading: "Where it stands",
        paragraphs: [
          "The product is built. I have not begun the deployment process yet, so it has not met its first real users. My estimate is that the intake and matching together save meaningful time on every case, hours across research, outreach, and onboarding, for both the client and the lawyer.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "I am driven by impact, by work that actually reaches people, and CaseBase is the clearest example of following a problem I felt personally all the way to something built to address it. Closing even a sliver of the justice gap means people get help they would otherwise go without.",
        ],
      },
    ],
  },
  {
    slug: "prosthesis-assessment-survey",
    title: "How Professions Assess Prostheses",
    oneLiner:
      "There was no agreement on how to measure whether an upper-limb prosthesis works, which slows adoption. This survey mapped what professionals actually use and value.",
    meta: [
      "Survey research · cross-professional",
      "Clinicians, prosthetists, physicians, researchers",
      "Journal of Multidisciplinary Healthcare",
    ],
    category: "research",
    liveUrl:
      "https://www.dovepress.com/exploring-the-perspectives-of-different-professions-on-task-based-uppe-peer-reviewed-fulltext-article-JMDH",
    liveLabel: "Read the paper",
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The tests used to evaluate an upper-limb prosthesis vary widely, and there was no clear picture of which ones professionals actually use or what they value in a test. That gap has real consequences. Without common ground, it is hard to justify a device's performance across different professionals or to insurers, which slows how quickly advanced bionic prostheses reach the people who need them.",
        ],
      },
      {
        heading: "The question",
        paragraphs: [
          "If the field wants a standard everyone can trust, the honest first step is to measure the disagreement: find out what clinicians, prosthetists, physicians, and researchers each actually use and prioritize. We surveyed professionals across these groups on their familiarity and use of task-based assessments, and on the attributes they weigh when choosing one, such as validity, administration time, comprehensiveness, and the ability to track a patient's progress.",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "I contributed to the survey's design and to the analysis of the responses, including the profession-by-profession comparisons of which tests are used and how much each attribute matters to each group.",
        ],
      },
      {
        heading: "What we found",
        paragraphs: [
          "Priorities diverged by profession more than any single best test did. Usage of most assessments differed significantly between groups, and even the attributes professionals valued, like how comprehensive a test is or how well it tracks progress, split along professional lines. A few tests, the Box and Block Test among them, were widely used across every group, marking the rare common ground worth building on.",
        ],
        image: {
          src: "/survey/usage.png",
          alt: "Two-panel figure. The left panel plots the percent of each profession (PT/OT, prosthetists, physicians, researchers) that uses each of thirteen task-based assessments, with Kruskal-Wallis p-values; the right panel marks which pairwise comparisons between professions were statistically significant.",
          caption:
            "Test usage varied significantly by profession across nearly every assessment. The Box and Block Test (BBT) was among the most widely used across all groups.",
          shape: "wide",
          width: 3400,
          height: 1962,
        },
      },
      {
        heading: "The impact",
        paragraphs: [
          "Naming where professionals agree and disagree is the groundwork for a standard testing protocol they can all accept. Shared, better evaluation techniques help professionals, users, and insurers speak the same language about what a device is worth, and that is ultimately what lets better prostheses reach the market.",
        ],
      },
    ],
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
  "casebase",
].map(bySlug);

export const researchStudies: CaseStudy[] = [
  "prosthetic-embodiment",
  "sense-of-agency",
  "prosthesis-assessment-survey",
].map(bySlug);

export const visibleCaseStudies = caseStudies.filter((cs) => !cs.hidden);

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
      "Stakeholder interviews and workflow analysis turned a paper intake of printing, handwriting, scanning, and retyping into a voice-first app that cut task time by roughly 90%. Deployed and in daily use.",
    meta: [
      "Stakeholder interviews · workflow analysis",
      "~90% task-time reduction · in daily use",
      "React, TypeScript, Express, MongoDB (PWA)",
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
          "The Wellspring Women's Center runs on donated goods, and tracking them was a workflow built out of friction. A volunteer printed log sheets and passed a binder around for everyone to handwrite what they had taken in. The sheets were then scanned and emailed, and someone on the back end read the handwriting, typed each item into a spreadsheet, and looked up a price and a category for every single entry. Handwriting got misread constantly, which mattered all the more because the volunteers were usually high school students or retirees in their seventies. A single day of donations could eat hours.",
        ],
      },
      {
        heading: "My thinking",
        paragraphs: [
          "Two ideas shaped everything. First, separate logging a donation from serving the person in front of you. A volunteer at intake has a line and a lot of noise, so logging could not compete with helping someone; it had to be something quick they do around the service, not during it. Second, design for the two very different people doing the logging. The same screen had to feel natural to a sixteen-year-old and to someone in their seventies, so I made voice the primary way in: speaking an item is the one interface everyone already knows, and it keeps hands and eyes free.",
          "From there, every feature had to make a volunteer's minute shorter, never longer. The manager tools are real and powerful, but they sit off to the side so they never crowd the one thing that matters at the table: logging an item fast.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "A volunteer opens the web app on the phone already in their pocket, no install and no training, and logs a donation by voice or by hand. It saves straight to a digital sheet the managers work from. Two features do the quiet heavy lifting. Auto-categorization learns as it goes: once an item has been given a category, every future entry of it is filed automatically. Pricing works the same way, so no one looks up the cost of diapers every two weeks; it is remembered, and updated only when prices actually change. The app also records who logged what, so a manager never has to hunt down who wrote an illegible line or made a mistake.",
          "Underneath sits a React and TypeScript front end, an Express and MongoDB back end on serverless functions, authentication, automated backups, and a built-in help guide, but a volunteer never has to know any of that exists.",
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
          "It is live at the center today, and it collapsed the old process by roughly ninety percent. No more printing, no binder of handwriting passed around, no scanning, no deciphering and retyping into a spreadsheet. A volunteer takes out their phone, logs, and it is done. I do not have exact numbers, but the time it hands back is easily a full-time role's worth, and the errors that came from misread handwriting are largely gone. A fully isolated demo with fake data lets anyone try it without touching the center's records.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "Every decision traced back to the people using it, down to the color palette, which I pulled from the center's own logo and branding so the app felt like theirs from the first tap. Accessible enough for a teenager and a retiree, simple enough to need no training, quietly powerful for the managers. This is designing for people taken to its maximum, and it is the work I am proudest of.",
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
      "Awarded “Most User-Centered Design.” User research, usability testing, and iterative prototyping to rebuild a campus app around what students actually open it to do.",
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
      "Legal help is out of reach for many who need it. I turned an intake task analysis into a two-sided marketplace with an AI agent that cuts time-on-task for clients and lawyers, from first question to matched case.",
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
        image: {
          src: "/casebase/ai-intake.png",
          alt: "The CaseBase AI assistant mid-conversation: a client has described a landlord withholding their security deposit and threatening eviction, and the assistant responds with plain-language guidance, a clarifying follow-up question, and the type of lawyer to look for.",
          caption:
            "The AI intake agent in action. It meets a worried client in plain language, asks the right follow-ups, and starts shaping the case before a lawyer is ever involved.",
          shape: "wide",
          width: 1800,
          height: 1056,
        },
      },
      {
        heading: "What I built",
        paragraphs: [
          "I built the product end to end: the two-sided matching between clients and lawyers, and the AI intake agent that runs the first conversation and prepares the case. I focused the design on the three assumptions that make or break a marketplace, trust, matching, and onboarding, and used user workflows and a working prototype to pressure-test them.",
          "On the lawyer's side, that groundwork pays off. Because the AI has already gathered and organized each situation, incoming cases arrive structured and categorized by area of law, so a lawyer scans genuine matches instead of fielding cold calls. Throughout, I kept the language plain and reassuring rather than legal, guided by the same instinct as the rest of my work: meet people where they are and make the next step obvious.",
        ],
        image: {
          src: "/casebase/marketplace.png",
          alt: "The lawyer's view in CaseBase: a “Client Cases” list showing eighteen incoming clients, each with a name and a categorized matter such as H-1B Visa Renewal, Employment Contract Review, Custody Modification, and Landlord Dispute.",
          caption:
            "The other side of the market. Because intake is done up front, lawyers see incoming cases already structured and categorized, real matches instead of cold calls.",
          shape: "wide",
          width: 1800,
          height: 1037,
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
    slug: "autonomous-perception",
    title: "Autonomous Perception",
    oneLiner:
      "The perception that lets autonomous machines sense their world, from an instrumented wheel-loader with SLAM and sensor fusion to a full self-driving car project.",
    meta: [
      "Perception · SLAM · sensor fusion",
      "Autonomous vehicles · robotics",
      "CORE Lab, UC Davis",
    ],
    category: "product",
    monogram: "AP",
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "An autonomous machine is only as capable as its perception. Before a wheel-loader or a car can act, it has to build a reliable picture of where it is and what surrounds it, from noisy, imperfect sensors, in the real world.",
        ],
      },
      {
        heading: "What I am building",
        paragraphs: [
          "At the CORE Lab I instrumented a full-size wheel-loader for autonomous operation: contributing to the deployment of SLAM (simultaneous localization and mapping) so the machine can locate itself and map its surroundings, fusing data across sensors, and doing the hardware assembly and mechanical design to put it all on the vehicle. I am now extending the same perception work to a full autonomous car project.",
        ],
      },
      {
        heading: "How it connects",
        paragraphs: [
          "This is the machine's side of the human-machine relationship I study. My research asks how a person perceives and comes to trust a device; this asks how a device perceives its world well enough to be trusted with it. Both reduce to the same problem: making the link between an agent and its environment accurate, legible, and safe.",
        ],
      },
      {
        heading: "Where it stands",
        paragraphs: [
          "Active and ongoing. This is current R&D, so I am keeping the details here light; I am happy to walk through the perception stack and results in a conversation.",
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
          "I owned the analysis and the visualizations, which is where this study earns its keep. I took the raw survey responses and turned them into the profession-by-profession picture: which tests each group actually uses, where those differences are statistically real, and how the attributes professionals value diverge. The figures below are mine, built to make a messy, multi-group dataset legible at a glance.",
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
  "autonomous-perception",
  "uc-davis-mobile",
  "casebase",
].map(bySlug);

export const researchStudies: CaseStudy[] = [
  "prosthetic-embodiment",
  "sense-of-agency",
  "prosthesis-assessment-survey",
].map(bySlug);

export const visibleCaseStudies = caseStudies.filter((cs) => !cs.hidden);

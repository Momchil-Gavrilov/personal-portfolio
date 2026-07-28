export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
  /* phone: narrow screenshot · portrait: standing photo · wide: full-column figure */
  shape?: "phone" | "portrait" | "wide";
  /* How the image fills a fixed frame. Photographs crop happily; a chart or a
     labelled figure must never be cropped, so it letterboxes instead. */
  fit?: "cover" | "contain";
  /* The device a product screenshot is shown in. A phone screenshot cropped
     into a landscape box reads as a fragment; in a phone it reads as a
     product. Web apps get a browser, photographs get nothing. */
  frame?: "phone" | "laptop" | "browser" | "bare";
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
  /* An interactive block rendered after the section's image. Used sparingly:
     only where walking the reader through something beats describing it. */
  component?: "trial-walkthrough";
};

export type CaseStudy = {
  slug: string;
  title: string;
  oneLiner: string;
  /* "product" studies render as app-icon tiles; "research" as editorial cards */
  category: "product" | "research";
  /* One or two letters shown on the product tile when there is no icon yet */
  monogram?: string;
  /* Optional app-icon image for the product tile (overrides the monogram) */
  icon?: string;
  /* Small proof image on the research card. A photo of a real session does
     more to establish that a study happened than the word "participants". */
  thumb?: CaseStudyImage;
  /* The home-page evidence card: the real figure at a size you can read and
     the one finding with its statistic left visible. Everything here is
     already stated in `sections` below; the card exists so a reader who never
     opens the case study still leaves knowing what was measured and what came
     out of it. */
  figure?: CaseStudyImage;
  /* The scale of the study, in the fewest characters that survive scrutiny.
     Rendered as the mono eyebrow above each research row, so a reader who
     scans only the eyebrows still learns the sample size and the design.
     Every value here is restated in `spec` below; nothing is claimed twice. */
  eyebrow?: string;
  /* A single short sentence for the home-page row. The oneLiner is written to
     open a case study page and runs two or three lines in a half-width
     column, which is more setup than a scanning reader will spend. */
  hook?: string;
  /* What the finding does not establish, in his own words.
     Volunteering this before anyone asks is the strongest trust signal
     available to an early-career researcher, and it is what an interviewer
     probes for anyway. Never write one of these on his behalf. */
  limitation?: string;
  /* The decision that shaped the work, surfaced on the case study page rather
     than the home page. It is judgment evidence, which only matters to a
     reader who already believes the person can do the job, and by the time
     someone has opened a case study they do. */
  lesson?: string;
  /* A wide screenshot of the product itself. The app-icon tiles said what the
     thing was called; a screenshot says what it is. */
  shot?: CaseStudyImage;
  /* Extra screens for the showcase slot. `shot` supplies the phone; these two
     put it on a laptop and a tablet beside it. */
  bundle?: {
    desktop: CaseStudyImage;
    laptop: CaseStudyImage;
    tablet: CaseStudyImage;
  };
  /* The specification a reviewer scans for. Rendered as a sticky rail beside
     the narrative on the case study page, and in the evidence card on the
     home page. */
  spec?: { k: string; v: string }[];
  finding?: string;
  /* Product tiles lead with what changed rather than what the thing is. The
     tile and the title already say what it is. Kept honest: where nothing has
     shipped yet, the line says so. */
  outcome?: string;
  /* Optional live deployment to link from the case study page */
  liveUrl?: string;
  liveLabel?: string;
  /* Tile badge. "in-use" is the only one that earns the pulsing dot: it means
     real people depend on it today. A demo or prototype says so plainly. */
  badge?: { label: string; kind: "in-use" | "demo" | "prototype" | "progress" };
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
      "A women's center's donation intake was hours of printing, handwriting, scanning, and retyping. I designed and built a voice-first web app that removed most of those steps entirely, and it runs their intake today.",
    spec: [
      { k: "My role", v: "Design and full-stack build, solo" },
      { k: "Users", v: "Volunteers aged 16 to 70+, and managers" },
      { k: "Stack", v: "React, TypeScript, Express, MongoDB" },
      { k: "Status", v: "In use at the center" },
    ],
    outcome:
      "Four steps gone from a volunteer's intake. It runs the center today.",
    lesson:
      "A volunteer at intake has a queue and a lot of noise, so logging a donation was never going to compete with helping the person in front of them. Making the form faster would not have fixed that. Separating the two did.",
    shot: {
      src: "/wellspring/manager-dashboard.png",
      alt: "The Wellspring manager view on a phone: a New Donation button, a month calendar marking days with donations, and buttons for the Master Sheet and Catalog.",
      frame: "phone",
      width: 860,
      height: 1864,
    },
    /* The centre runs this on whatever screen is to hand, so the showcase
       shows it on three. Captured from the live demo. */
    bundle: {
      desktop: {
        src: "/wellspring/desktop.png",
        alt: "Wellspring on a desktop monitor, at the screen where a volunteer or manager picks their role.",
        width: 960,
        height: 600,
      },
      laptop: {
        src: "/wellspring/desktop.png",
        alt: "The same view on a laptop.",
        width: 960,
        height: 600,
      },
      tablet: {
        src: "/wellspring/tablet.png",
        alt: "The same view on a tablet.",
        width: 720,
        height: 960,
      },
    },
    category: "product",
    monogram: "W",
    icon: "/icons/wellspring.png",
    liveUrl: "https://wellspring-demo.vercel.app/",
    liveLabel: "Open the live demo",
    badge: { label: "Live", kind: "in-use" },
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The Wellspring Women's Center runs on donated goods, and tracking them was a workflow built out of friction. A volunteer printed log sheets and passed a binder around for everyone to handwrite what they had taken in. The sheets were then scanned and emailed, and someone on the back end read the handwriting, typed each item into a spreadsheet, and looked up a price and a category for every single entry. Handwriting got misread constantly, a use error the workflow made close to inevitable, and it mattered all the more because the volunteers were usually high school students or retirees in their seventies. A single day of donations could eat hours.",
        ],
      },
      {
        heading: "My thinking",
        paragraphs: [
          "I started with stakeholder interviews across the center, managers and volunteers both, and translated what they described into requirements before writing anything. Two ideas shaped everything. First, separate logging a donation from serving the person in front of you. A volunteer at intake has a line and a lot of noise, so logging could not compete with helping someone; it had to be something quick they do around the service, not during it. Second, design for the two very different people doing the logging. The same screen had to feel natural to a sixteen-year-old and to someone in their seventies, so I made voice the primary way in: speaking an item is the one interface everyone already knows, and it keeps hands and eyes free.",
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
          "It is live at the center today. Four steps are gone outright: printing the log sheets, passing the binder around to handwrite entries, scanning and emailing them, and deciphering the handwriting to retype every line into a spreadsheet with a looked-up price and category. What is left is a volunteer taking out their phone, logging, and being done. I have not run a timed before-and-after study, so I will not put a percentage on it, but the steps removed are concrete and the use errors that came from misread handwriting are largely gone. A fully isolated demo with fake data lets anyone try it without touching the center's records.",
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
    category: "research",
    thumb: {
      src: "/agency/thumb.png",
      alt: "The Kinarm robotic platform used in the agency study, with a participant seated at it.",
    },
    eyebrow: "38 participants · randomized",
    hook: "The field's standard measure of control had stopped holding up, so we built a sharper one.",
    figure: {
      src: "/agency/session.jpg",
      alt: "A participant seated at the Kinarm robotic platform, both hands on the manipulanda under the display, reaching toward a target.",
      fit: "cover",
      width: 1600,
      height: 1200,
    },
    spec: [
      { k: "Method", v: "Two-alternative forced choice" },
      { k: "Participants", v: "38, randomized between groups" },
      { k: "My role", v: "Protocol, IRB, every session, analysis" },
      { k: "Output", v: "ICORR 2025" },
    ],
    finding:
      "Intending a movement did not change how long the delay felt, only how precisely it could be perceived.",
    limitation:
      "We did not corroborate the result with validated questionnaires.",
    lesson:
      "When a measure stops behaving, the useful move is to find what is contaminating it rather than to work around it. Causal expectation was doing the work everyone had attributed to intention, so I held causation constant and let intention be the only thing left varying.",
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
          "Before this was a study design problem it was a root cause analysis of a measure: two mechanisms could produce the same effect, and the field had been attributing all of it to one of them. If causal expectations were contaminating the measure, the fix was to hold causation constant and let intention be the only thing that varied. I designed a two-alternative forced-choice study around that idea: every participant judged the same kind of causal event, and only whether they had initiated the movement differed. Forced-choice psychophysics also lightened the cognitive load, replacing time estimation with a simple which-was-shorter judgment. A randomized between-groups design, with one group comparing active against passive movements and the other comparing two passive movements, kept each participant's judgments clean.",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "I ran the study end to end: developing the protocol and its psychophysical staircase logic, programming the task on the Kinarm robotic platform, running it under the lab's approved IRB protocol, recruiting and running all 38 participants, and fitting the psychometric models for analysis.",
        ],
        image: {
          src: "/agency/apparatus.png",
          alt: "Four photographs of the setup: the Kinarm robotic platform, a participant seated and operating it, the darkened task display, and the experimenter's screen showing a movement trace.",
          caption:
            "The apparatus: participants worked at the Kinarm, seeing only the task display in front of them.",
          shape: "wide",
          width: 1477,
          height: 477,
        },
        /* The trial itself is worth walking rather than describing, so panel E
           of the same figure runs underneath as a stepped walkthrough. */
        component: "trial-walkthrough",
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
    category: "research",
    thumb: {
      src: "/embodiment/session.png",
      alt: "A participant in the lab operating the EMG-controlled prosthetic hand to grasp a wooden block.",
    },
    eyebrow: "23 participants · within-subject",
    hook: "Bionic hands are improving, yet users keep abandoning them.",
    figure: {
      src: "/embodiment/setup.jpg",
      alt: "The study setup: a participant in a lab coat grasps a wooden block with the EMG-controlled prosthetic hand, with an occluding screen between them and the hand, and a motion-capture camera on a tripod behind.",
      fit: "cover",
      width: 1179,
      height: 800,
    },
    spec: [
      { k: "Method", v: "Formative evaluation, within-subject" },
      { k: "Participants", v: "23" },
      { k: "My role", v: "Restored the EMG hand, ran sessions, co-designed" },
      { k: "Output", v: "Preprint, Research Square" },
    ],
    finding:
      "Ownership tracked the sense of control (r = 0.70), but not the sense of where the hand sat in space (r = -0.03).",
    limitation:
      "No hand today moves with the fidelity of a real one, so these results are bounded by current sensors. That bound redirected the lab toward better biosensors.",
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
          "The first version of the protocol took four hours per participant. That is long enough that fatigue starts showing up in the data as though it were an effect, and long enough that a tired participant makes errors the task design should have prevented. I redesigned it down to two hours. Fewer participants dropped, the use-error risk fell, and the data came back cleaner than the longer protocol had produced.",
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
    spec: [
      { k: "My role", v: "User interviews and prototype iteration" },
      { k: "Method", v: "Contextual interviews, Figma prototype" },
      { k: "Output", v: "Most User-Centered Design" },
      { k: "Status", v: "Interactive demo" },
    ],
    outcome:
      "Won Most User-Centered Design by asking why a student opens the app at all.",
    lesson:
      "The obvious question was how to lay out the interface. The more honest one was why a student would open a campus app at all, so we went to the coffee shop where students actually are and asked about their day instead of their screens. The layout followed from the answer.",
    shot: {
      src: "/uc-davis/home.png",
      alt: "The redesigned myucdavis home screen, leading with the student's schedule instead of an events feed.",
      frame: "phone",
      width: 331,
      height: 709,
    },
    category: "product",
    monogram: "UC",
    icon: "/icons/ucdavis.png",
    liveUrl:
      "https://www.figma.com/proto/KGSipDKNGFWF7Y7cfg3R3b/Design-Interactive-Prototype?node-id=4-158",
    liveLabel: "Open the demo",
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
    spec: [
      { k: "My role", v: "Product design and build, end to end" },
      { k: "Method", v: "Workflow analysis, working prototype" },
      { k: "Stack", v: "Two-sided marketplace, AI intake agent" },
      { k: "Status", v: "Prototype" },
    ],
    outcome:
      "Built end to end, intake through match. A prototype, not yet with real users.",
    /* The intake screenshot is a wall of body text and reads as noise at card
       size; the case list shows the product's actual shape at a glance. */
    shot: {
      src: "/casebase/home.png",
      alt: "The CaseBase home screen: a client or lawyer chooses their side, then starts the prototype or signs in.",
      frame: "laptop",
      width: 1180,
      height: 738,
    },
    category: "product",
    monogram: "CB",
    icon: "/icons/casebase.png",
    liveUrl: "https://casebase-lmp.lovable.app/",
    liveLabel: "Open the prototype",
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
    slug: "prosthesis-assessment-survey",
    title: "How Professions Assess Prostheses",
    oneLiner:
      "There was no agreement on how to measure whether an upper-limb prosthesis works, which slows adoption. This survey mapped what professionals actually use and value.",
    category: "research",
    thumb: {
      src: "/survey/thumb.png",
      alt: "Grouped bar chart of what percent of each profession uses each assessment test.",
    },
    /* Panel A only. The published figure has three panels and is unreadable
       at card width; this is the one that carries the finding. The full
       figure still runs at full size inside the case study. */
    eyebrow: "100 respondents · 4 professions",
    hook: "Nobody agreed on how to measure whether an upper-limb prosthesis works.",
    figure: {
      src: "/survey/usage-panel-a.png",
      alt: "Bar chart of the percent of each profession (PT/OT, prosthetists, physicians, researchers) that uses each of twelve task-based assessments, with Kruskal-Wallis p-values down the right-hand side. The Box and Block Test is highest across every group.",
      fit: "contain",
      width: 1350,
      height: 840,
    },
    spec: [
      { k: "Method", v: "Cross-professional survey" },
      { k: "Respondents", v: "100 across PT/OT, prosthetists, physicians, researchers" },
      { k: "My role", v: "Analysis and visualization only" },
      { k: "Output", v: "J. Multidisciplinary Healthcare" },
    ],
    finding:
      "Test choice split significantly along professional lines, with the Box and Block Test the rare common ground.",
    limitation:
      "Self-reported rather than observed, and the sample skewed away from physical therapists: 16 against 27 or more in every other group.",
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
    slug: "autonomous-perception",
    title: "Autonomous Vehicle Perception",
    oneLiner:
      "I instrumented an autonomous wheel loader and built its perception stack, fusing camera, lidar, ultrasonic positioning, and IMU into a working SLAM system. I am now designing the same pipeline for a full-size autonomous car.",
    spec: [
      { k: "My role", v: "Instrumentation and perception stack" },
      { k: "Sensors", v: "Camera, 2D 360° lidar, IMU, ultrasonic beacons" },
      { k: "Method", v: "RTAB-Map SLAM, sensor fusion, time sync" },
      { k: "Status", v: "Loader working; car in architecture" },
    ],
    outcome:
      "Camera, lidar, IMU and ultrasonic beacons fused into a working SLAM map.",
    shot: {
      src: "/robotics/perception-rover.jpg",
      /* The rover, not the Kia. The Kia project is early: sensors on order,
         not his selection, architecture only. A photograph of it would look
         more impressive than the work behind it currently is. */
      alt: "The test rover carrying a 360 degree lidar, a camera and ultrasonic beacons.",
      frame: "bare",
      width: 1200,
      height: 1600,
    },
    category: "product",
    monogram: "AV",
    icon: "/icons/autonomous.png",
    status: "published",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A machine that moves around people has to know where it is and what is near it before it can be trusted to do anything else. The lab's autonomous wheel loader had none of that. It had no sensors mounted, no way to build a map of the space it was working in, and no estimate of its own position within that space. Everything downstream, planning a path or controlling the machine safely, depends on solving that first.",
        ],
      },
      {
        heading: "My thinking",
        paragraphs: [
          "No single sensor is trustworthy on its own. A camera is rich but loses depth and fails in bad light. A 2D lidar gives clean geometry but only in one plane. An IMU knows how the body is moving but drifts. Ultrasonic beacons give an absolute position but update slowly. The way through is to combine them so each covers the others' blind spots, which turns the problem from choosing a sensor into designing a fusion strategy.",
          "That choice has a hardware consequence people underestimate: fusion is only as good as the alignment between streams. If two sensors disagree about when a measurement happened, the fused estimate is confidently wrong, which is worse than no estimate at all.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "I instrumented the vehicle from scratch: selecting mounting positions, CAD modelling the holders for every sensor, and fabricating and fitting them. Then I built the perception system on top, combining a camera, a 2D 360-degree lidar, two ultrasonic positioning beacons, and an IMU into a SLAM pipeline built on RTAB-Map. It worked, producing a usable map and pose estimate while the vehicle drove. I also built a small rover as a test platform so the stack could be developed and debugged without tying up the loader.",
        ],
        image: {
          src: "/robotics/perception-rover.jpg",
          alt: "The test rover: a mast carrying a 360-degree lidar and a camera, mounted on a board with two Marvelmind ultrasonic beacons and a battery, sitting on a stack of control theory and system identification textbooks.",
          caption:
            "The rover I built to develop the perception stack, carrying the lidar, camera, IMU, and ultrasonic beacons.",
          shape: "portrait",
          width: 1200,
          height: 1600,
        },
      },
      {
        heading: "Where it stands",
        paragraphs: [
          "On the strength of that work I was assigned to the lab's full-size autonomous vehicle, a Kia Soul, to design its perception system. That project is early. The sensors are on order and were not my selection, and my work right now is the architecture: how the pipeline fits together, and how every sensor stream gets time-synchronized well enough that fusion is honest rather than plausible-looking. Motion planning and controller design belong to other people on the team. Perception is mine.",
        ],
        image: {
          src: "/robotics/kia-soul.jpg",
          alt: "The lab's Kia Soul EV with its hood open, a roof-mounted rail carrying GPS antennas and sensor hardware, parked in the research shop.",
          caption:
            "The full-size platform. The roof rail is where the perception suite goes once the sensors arrive.",
          shape: "wide",
          width: 1800,
          height: 1350,
        },
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "The rest of my work asks how a machine feels to the person using it. This asks the same question from the machine's side: what it senses, how confident it is, and where that confidence breaks down. Autonomy is trusted or abandoned for the same reason a prosthesis is, because of what it does when the person and the system disagree, and you cannot reason about that boundary without understanding both halves of it.",
        ],
      },
    ],
  },
  {
    slug: "intentional-binding-methods",
    title: "A Forced-Choice Paradigm for Intentional Binding",
    oneLiner:
      "An 8-participant methods study extending intentional-binding measurement to whole-limb movements, published at ICORR 2025.",
    spec: [
      { k: "Method", v: "Psychophysics methods study" },
      { k: "Participants", v: "8" },
      { k: "Apparatus", v: "Kinarm" },
    ],
    category: "research",
    status: "coming-soon",
    hidden: true,
  },
  {
    slug: "wearable-longitudinal",
    title: "Wearables in the Wild",
    oneLiner:
      "A 16-athlete, 8-month longitudinal study monitoring biomechanical and psychological state with wearable technology.",
    spec: [
      { k: "Method", v: "Longitudinal field study" },
      { k: "Participants", v: "16 athletes over 8 months" },
      { k: "Apparatus", v: "IMUs and force plates" },
    ],
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
  "casebase",
  "uc-davis-mobile",
].map(bySlug);

export const researchStudies: CaseStudy[] = [
  "prosthetic-embodiment",
  "sense-of-agency",
  "prosthesis-assessment-survey",
].map(bySlug);

export const visibleCaseStudies = caseStudies.filter((cs) => !cs.hidden);

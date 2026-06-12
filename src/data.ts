import { Course, ResourceTopic, TeamMember, Testimonial, SurvivalTrait } from "./types";

export const SURVIVAL_TRAITS: SurvivalTrait[] = [
  {
    id: "resilience",
    title: "Unrivaled Resilience",
    tagline: "The 300-Million-Year Test",
    biologyFact: "Cockroaches survived the Chicxulub asteroid that wiped out the dinosaurs. They can endure extreme radiation up to 15 times what is lethal to humans, and live for a week without a head.",
    aspirantLesson: "UPSC preparation is a grueling saga of repeated failures, isolation, and mental exhaustion. True selection doesn't require genielike brilliance; it requires a mental toughness that refuses to die, regardless of how many times you fall short of the cut-off.",
    iconName: "ShieldCheck"
  },
  {
    id: "adaptability",
    title: "Deep Adaptability",
    tagline: "Pattern Agnosticism",
    biologyFact: "They possess an exceptionally fluid genetic structure, allowing them to rapidly evolve immunity to man-made chemical poisons within a single generation.",
    aspirantLesson: "The UPSC examiner will throw unexpected pattern changes, tricky current affairs questions, or completely revamp the CSAT paper. Do not build stiff, fragile study routines. Remain fluid. Adapt instantly to any shift in the terrain.",
    iconName: "Compass"
  },
  {
    id: "frugality",
    title: "Extreme Efficiency",
    tagline: "Resource Optimization",
    biologyFact: "A survivor requires remarkably little to survive. They can stay active for over a month with absolute zero food, thriving in the quietest, darkest corners of the earth.",
    aspirantLesson: "Living in a congested 8x8 foot room, breathing humid air, and eating simple mess food is not a sign of your defeat. It is your active training in resourcefulness. He who can govern his desires in a tiny cubicle can govern a district with absolute integrity.",
    iconName: "Flame"
  },
  {
    id: "pressure-resistance",
    title: "Exoskeletal Elasticity",
    tagline: "Thriving Under Heavy Load",
    biologyFact: "Their bodies can compress by over 50% to slip through tiny crevices, resisting compressive forces up to 900 times their own body weight without getting hurt.",
    aspirantLesson: "You are constantly crushed under the weight of family expectations, societal comparisons, and heavy syllabi. Instead of breaking under the weight, compress your fears, absorb the stress, slip through the cracks of adversity, and emerge undamaged.",
    iconName: "Award"
  }
];

export const COURSES: Course[] = [
  {
    id: "gs-foundation-trial",
    title: "General Studies & Concept Mastery (Full Compass)",
    category: "GS Integrated (Prelims + Mains)",
    subtitle: "A shoulder to lean on for your complete core UPSC syllabus",
    description: "Every subject from Polity, International Relations, Economy to Modern History, taught slowly with hand-holding simplicity. No marketing gimmicks, just pure ground-up conceptual clarity.",
    features: [
      "220+ Exhaustive conceptual video modules",
      "Handwritten, condensed margin-notes focused on linkages",
      "Daily 1-on-1 feedback on your rough draft answers (from ex-aspirants)",
      "Weekly mental check-ins and direct personal guidance sessions"
    ],
    originalPrice: 18000,
    trialPrice: 349,
    trialDurationDays: 3,
    badge: "Most Empathetic Trial Method"
  },
  {
    id: "editorial-linkage-trial",
    title: "The Editorial Bridge & Analytical Writing",
    category: "Current Affairs & Answer Structuring",
    subtitle: "Learn the art of drawing critical connections for GS Papers 2 & 3",
    description: "We don't supply mindless daily 20-page compilations. We teach you how to pick one news article, dissect it, write down multi-dimensional linkages, and frame a flawless answer in 7 minutes.",
    features: [
      "Live daily 45-minute decoding of complex global events",
      "Our unique 'Cockroach Linkage' matrix template",
      "Cockroach answer blueprints for the last 5 years' papers",
      "Unlimited answer review during your active trial period"
    ],
    originalPrice: 8500,
    trialPrice: 249,
    trialDurationDays: 3,
    badge: "Try For Less Than A Price Of Chai"
  },
  {
    id: "ethics-essay-handholding",
    title: "Ethics (GS-IV) & Essay Companion Room",
    category: "Score Maximizers",
    subtitle: "Where your human values and experiences translate into top marks",
    description: "Ethics shouldn't be learned from books of heavy definitions. It must come from your survival journey, ethical dilemmas, and rich human case studies. We help write answers that stand out to the evaluator.",
    features: [
      "35 Case studies broken down step-by-step with administrative framework",
      "Essay masterclasses detailing hooks, flow, and thematic coherence",
      "Personal evaluation with audio feedback detailing tone corrections",
      "Mental resilience guide with real administrative case-scenarios"
    ],
    originalPrice: 12000,
    trialPrice: 299,
    trialDurationDays: 3,
    badge: "Highly Creative Approach"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Prashanth N",
    role: "Founder & CEO",
    bio: "Visionary behind the academys' student-first approach to UPSC preparation. An oracle in Ethics, Essay, and Mains Answer Writing, he is known for helping aspirants transform ideas into tech enabled impactful answers and develop the clarity, integrity, and analytical depth expected of future civil servants.",
    yearsOfStruggle: 6,
    specialization: "Ethics & Essay Oracle | Mains Answer Writing Coach",
    image: "prashanth.jpg"
  },
  {
    name: "Anusha PC",
    role: "Managing Director",
    bio: "A trusted UPSC mentor known for simplifying Anthropology and mastering Prelims strategy. Beyond academics, he serves as a constant companion, emotional anchor, and unwavering supporter throughout the preparation journey. His mission is to help aspirants build knowledge, confidence, resilience, and the determination needed for success.",
    yearsOfStruggle: 4,
    specialization: "Anthropology Expert | Prelims Wizard | Constant Companion",
    image: "anusha.jpg"
  },
  {
    name: "Varun Amidal",
    role: "President",
    bio: "A dedicated UPSC mentor specializing in Political Science & International Relations (PSIR) and CSAT. Known for his approachable nature, patient listening, and long-term mentorship, he helps aspirants navigate challenges with clarity and confidence. His guidance combines academic excellence, strategic preparation, and genuine care for every student's growth.",
    yearsOfStruggle: 5,
    specialization: "PSIR Expert | CSAT Strategist | Smiling Mentor",
    image: "varun.png"
  },
  {
    name: "Sanjeeva Reddy",
    role: "CTO",
    bio: "A technology leader dedicated to engineering seamless learning workspaces and resilient cognitive tools. Sanjeeva ensures that the platform delivers high-speed, interactive syllabus mapping and analytical workspaces for aspirants.",
    yearsOfStruggle: 3,
    specialization: "Tech Architecture | Platform Operations",
    image: "sanjeeva.png"
  },
  {
    name: "Riya P Kabadi",
    role: "CFO and HR",
    bio: "Manages the academy's fiscal operations and builds supportive mentor networks. Riya ensures that our trial companion cohorts remain highly affordable while selecting top-tier, empathetic mentors for handholding.",
    yearsOfStruggle: 3,
    specialization: "Finance Operations | Talent Acquisition",
    image: "riya.png"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "In the intense isolation of high-pressure UPSC preparation, keeping focus can be exceptionally hard. Cockroachias completely changed my framing. They showed me that my daily quiet persistence and survival-mindset was my greatest asset. I fought through my final attempt and finally found my name on the PDF.",
    author: "Kunal Kashyap",
    batch: "CSE 2025 Rank 142",
    isRanker: true,
    status: "Allocated to IPS (Uttar Pradesh Cadre)"
  },
  {
    id: "2",
    quote: "What I loved about this platform was that they didn't push me to buy ₹1.5 Lakh courses. I tried their Editorial Bridge for just ₹249! That ₹249 trial gave me more raw writing confidence than the ₹40,000 course I took elsewhere. They hold your hands like seniors, not like salespeople.",
    author: "Shreya Chaturvedi",
    batch: "Fought through 3 Prelims Blocks",
    isRanker: false,
    status: "Currently preparing with us from a home-town study space"
  },
  {
    id: "3",
    quote: "Every coaching center claimed to make me an IAS from day one. Cockroachias said: 'First, let’s survive the pressure, then we will build a nation-builder.' That absolute honesty saved my mental health and eventually got me through.",
    author: "Manish Rajan",
    batch: "CSE 2024 Rank 289",
    isRanker: true,
    status: "Allocated to IAS (Madhya Pradesh Cadre)"
  }
];

export const RESOURCE_TOPICS: ResourceTopic[] = [
  {
    id: "syllabus-decoded-mindmap",
    title: "The Companion's Integrated GS Syllabus Map",
    category: "Syllabus",
    summary: "A simplified, highly organized layout breaking down every dynamic micro-topic of the syllabus with exact resource links. Crucial for first-timers.",
    content: "We have stripped down the complex terms of the UPSC syllabus into simple, manageable objectives. For example, under Indian Economy, instead of 'Mobilization of resources', we rewrite it to: 'Where does the government get its money, and how does it plan to distribute it?' This PDF guide provides single-paragraph clarity for all 120 key syllabus concepts.",
    fileSize: "4.2 MB",
    survivalTip: "Do not move on to books until you can recall every item of this syllabus by heart. It acts as your compass.",
    readingTime: "5 mins"
  },
  {
    id: "compact-room-survivor-kit",
    title: "The Compact Study Room Survival Blueprint",
    category: "Mental Support",
    summary: "Practical guide containing routines to preserve physical health, survive poor ventilation, and combat heavy brain-fog in high-pressure rooms.",
    content: "If you live in a tiny single study room, your body faces lack of sunlight, high humidity, and early fatigue. This blueprint contains: 1) A simple 15-minute desk stretching routine. 2) Cognitive strategies to enhance focus and reduce screen fatigue under intense reading loads. 3) Methods to break the daily 12-hour isolation cycle using structured self-assessment tools.",
    fileSize: "1.8 MB",
    survivalTip: "Clean your table every night, and keep a small desk-plant. When you see life greening in a tiny corner of your desk, it reminds you that you too are growing.",
    readingTime: "8 mins"
  },
  {
    id: "daily-answer-feedback-framework",
    title: "Mastering the 'Intro-Body-Conclusion' Flow-Sheets",
    category: "Mains",
    summary: "Our famous hand-holding guide to writing structured answers. Learn to stop staring at blank pages and write with structural confidence.",
    content: "Most aspirants read infinitely but write nothing. This template sheet breaks down 5 core answer structures (Cause-Effect, Geographic Dimensions, Legal-Constitutional, Temporal evolution, and the stakeholder analysis matrix). Contains 24 dummy templates where you just fill in the news and complete the argument.",
    fileSize: "3.1 MB",
    survivalTip: "Write badly, but write daily. A bad page exists to be corrected; an unwritten page is a phantom that haunts your dreams.",
    readingTime: "12 mins"
  },
  {
    id: "prelims-elimination-myths",
    title: "Demystifying Prelims Elimination Techniques",
    category: "Prelims",
    summary: "A statistical research document on how MCQ framing works in the CSAT and GSM papers post-2023. Know the difference between a blind guess and scientific reasoning.",
    content: "Post-2023, the UPSC has heavily penalized standard 'shortcuts' and 'elimination key tricks' by introducing option pairings ('Only one pair', 'Only two pairs'). Our research document shows that success now comes down to absolute conceptual core depth and structural elimination based on logical traps. Learn how examiner draft the incorrect pairings.",
    fileSize: "5.5 MB",
    survivalTip: "Do not run behind MCQ shortcuts sold on YouTube. Learn the core theme. There is no replacement for absolute visual and semantic understanding.",
    readingTime: "15 mins"
  }
];

export const CONTROVERSY_DETAILS = {
  quote: "In 2026, the term \"cockroach\" entered public discourse after remarks made by Chief Justice of India Justice Surya Kant during a court hearing, triggering a nationwide debate. What was intended as criticism was subsequently embraced by many as a symbol of resilience and dissent.",
  source: "CJI Justice Surya Kant, 2026",
  analysis: "At COCKROACH IAS, we choose to focus on the positive symbolism. A cockroach survives where others give up. It adapts. It endures. It persists against overwhelming odds. Many aspirants are told they are not good enough. Many fail Prelims, Mains, or Interviews. Many are underestimated because of their background, language, or financial condition. Yet they continue. Like the cockroach, they survive every setback and return stronger.",
  ourStand: "COCKROACH IAS is therefore not about an insect. It is about the human capacity to persist when the world expects you to quit. Indian civilisation celebrates not those who never fall, but those who rise repeatedly."
};

export const SURVIVOR_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "You have spent 8 hours in a dark, windowless study cubicle. The air-conditioning breaks, and the air becomes humid. What is your survival response?",
    options: [
      {
        text: "I pack my bag in frustration, tell myself I can't study under these conditions, and feel a wave of anxiety.",
        point: "Fragile State (We will help build your stamina step-by-step.)"
      },
      {
        text: "I step out to drink black water, take 5 deep breaths, compress my fatigue like a resilient exoskeleton, and move to a well-ventilated terrace to finish my daily targets.",
        point: "Survivor Class (Excellent adaptability! You possess real survivor instincts.)"
      },
      {
        text: "I ignore the physical heat completely, telling myself pain is an illusion, but end up with severe burnout and brain-fog the next day.",
        point: "Rigid State (Stiffness breaks. Remember, we must survive safely to serve the state.)"
      }
    ]
  },
  {
    id: 2,
    question: "UPSC changes the Prelims pattern completely, removing standard historical chronology MCQs and replacing them with complex philosophical linkages. How do you respond?",
    options: [
      {
        text: "I go online, read 5 articles criticizing the Commission, and join the fear-mongering forums.",
        point: "Reacting State (Draining your fuel. Power comes from focus, not worry.)"
      },
      {
        text: "I accept that the change is identical for all 10 Lakh aspirants, scrap my rigid study logs, adapt my syllabus linkages, and master the new game of critical thinking.",
        point: "Adaptable Survivor (Brilliant! Real cockroaches adapt to the new temperature in seconds.)"
      },
      {
        text: "I rely on the same notes and short-cuts, hoping that this year was just an anomaly.",
        point: "Inertial State (Inertia is dangerous in a dynamic exam. Let us help you shift gears.)"
      }
    ]
  },
  {
    id: 3,
    question: "You check your mock test results. You scored 68, while the average classmate scored 110. Your heart sinks. What is the immediate survival philosophy?",
    options: [
      {
        text: "My score doesn't define my final rank. A mock test is a research environment, not a court of final verdict. I will dissect each of my 32 incorrect answers with a calm head.",
        point: "Indestructible Mindset (Superb. This deep wisdom is what transforms students into administrators.)"
      },
      {
        text: "I spiral into self-doubt, thinking I shouldn't have named Cockroachias my home, and waste the entire evening browsing success stories.",
        point: "Vulnerable State (Let us hold your hands. This is why we are here—to catch you when you fall.)"
      },
      {
        text: "I burn the result sheet, pretend it never happened, and continue reading more books without correcting my structural errors.",
        point: "Avoidant State (Avoidance prolongs the struggle. Face the errors; they are your actual targets.)"
      }
    ]
  }
];

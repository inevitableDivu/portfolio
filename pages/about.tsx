import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import FullPageSections, {
  useSectionNav,
} from "@/components/wrapper/full-page.wrapper";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const skills = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3"],
  Frontend: [
    "React.js",
    "Next.js",
    "Redux Toolkit",
    "MobX",
    "Micro-Frontend (Module Federation)",
    "Tailwind CSS",
    "Ant Design",
  ],
  Backend: [
    "Node.js",
    "NestJS",
    "Express.js",
    "FastAPI",
    "MongoDB",
    "RESTful APIs",
    "Redis",
  ],
  "Tools & Platforms": [
    "Git",
    "GitHub",
    "Docker",
    "CI/CD",
    "Linux",
    "Postman",
    "Figma",
  ],
};

const education = [
  {
    school: "IIMT College of Science & Technology",
    degree: "B.Sc. in Computer Science",
    year: "2023",
  },
];

const experience = [
  {
    company: "Saama Technologies (Chennai, India)",
    role: "Software Engineer",
    period: "Oct 2024 – Present",
    points: [
      "Engineered a scalable Micro-Frontend architecture using Webpack Module Federation, decoupling the monolithic codebase",
      "Spearheaded the migration of 40% of the legacy codebase to TypeScript, reducing regression bugs by 85%",
      "Defined technical roadmap and architecture strategies in collaboration with engineering leadership",
      "Took ownership of the end-to-end lifecycle for 4 key product features, from architectural design to deployment",
      "Developed custom plugins for OnlyOffice editor and integrated AI to streamline medical writing",
      "Optimized content insertion and sanitization to maintain document integrity while supporting rich formatting",
      "Strengthened product reliability by adding comprehensive unit tests and Playwright automation",
    ],
  },
  {
    company: "Dezy It (Remote)",
    role: "Full Stack Software Engineer",
    period: "Nov 2021 – Oct 2024",
    points: [
      "Led end-to-end development of a fully HIPAA-compliant healthcare application with strict encryption and RBAC",
      "Integrated conversational AI with real-time sentiment analysis, achieving over 92% user retention",
      "Mentored junior developers and conducted comprehensive code reviews, enforcing clean architecture patterns",
      "Delivered scalable full-stack solutions for 5+ client projects using React.js and Tailwind CSS",
      "Automated deployment workflows via CI/CD pipelines (GitHub Actions), reducing release overhead",
      "Optimized performance using SSR and lazy loading, reducing Time-to-Interactive (TTI) by ~40%",
    ],
  },
  {
    company: "Bit Brothers (Remote)",
    role: "Frontend Developer Intern",
    period: "Aug 2021 – Sept 2021",
    points: [
      "Developed highly reusable React UI components for the internal library, accelerating development time",
      "Collaborated on code reviews and debugged UI inconsistencies, ensuring cross-browser compatibility",
    ],
  },
];

/* ── Section 1: About + Skills + Education ─────────── */
const IntroSection = () => (
  <motion.div
    variants={stagger}
    initial="hidden"
    animate="visible"
    className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-8"
  >
    <div className="text-center space-y-2 sm:space-y-3">
      <motion.h1
        variants={fadeUp}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary"
      >
        About Me
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-xs sm:text-sm lg:text-base"
      >
        A Software Engineer with 4 years of experience specializing in scalable
        Frontend architecture, complemented by practical experience in Backend
        engineering and System Design. Expert in driving Micro-Frontend adoption
        and optimizing complex systems.
      </motion.p>
    </div>

    <motion.div variants={fadeUp} className="space-y-3 sm:space-y-4">
      <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground">
        Skills
      </h2>
      <div className="space-y-2.5 sm:space-y-3">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <p className="text-[11px] sm:text-xs font-medium text-muted-foreground mb-1 sm:mb-1.5">
              {category}
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {items.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="font-normal text-[10px] sm:text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Education inline */}
    <motion.div
      variants={fadeUp}
      className="pt-4 border-t border-border space-y-4"
    >
      <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground">
        Education
      </h2>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-accent shrink-0">
          <HugeiconsIcon
            icon={GraduationCap}
            size={14}
            strokeWidth={2}
            className="text-primary sm:w-4 sm:h-4"
          />
        </div>
        {education.map((edu) => (
          <div key={edu.school}>
            <p className="font-medium text-foreground text-xs sm:text-sm">
              {edu.degree}
              <span className="text-muted-foreground font-normal">
                {" "}
                · {edu.school}
              </span>
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {edu.year}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

/* ── Section 2: Experience (split panel with sub-navigation) ── */
const ExperienceSection = () => {
  const [activeExp, setActiveExp] = useState(0);
  const { registerSubNav, unregisterSubNav } = useSectionNav();
  const isInternalTransitioning = useRef(false);

  const handleSubScroll = useCallback(
    (dir: number): boolean => {
      if (isInternalTransitioning.current) return true;
      const next = activeExp + dir;
      if (next < 0 || next >= experience.length) return false;
      isInternalTransitioning.current = true;
      setActiveExp(next);
      setTimeout(() => {
        isInternalTransitioning.current = false;
      }, 600);
      return true;
    },
    [activeExp],
  );

  useEffect(() => {
    registerSubNav(handleSubScroll);
    return () => unregisterSubNav();
  }, [handleSubScroll, registerSubNav, unregisterSubNav]);

  const current = experience[activeExp];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center flex-1 h-full"
    >
      {/* Fixed title — never moves */}
      <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 flex-[0_1_15%]">
        <HugeiconsIcon
          icon={Briefcase}
          size={20}
          strokeWidth={2}
          className="text-primary sm:w-5 sm:h-5"
        />
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
          Experience
        </h2>
      </div>

      {/* ── Desktop: split panel ── */}
      <div className="hidden md:grid grid-cols-[1fr_1fr] gap-8 place-items-center w-full flex-[1_0_70%]">
        {/* LEFT: Metadata */}
        <div className="relative flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-accent-foreground">
                  {current.period}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground leading-snug">
                {current.role}
              </h3>
              <p className="text-primary font-medium">{current.company}</p>
            </motion.div>
          </AnimatePresence>
          <ProgressDots activeExp={activeExp} setActiveExp={setActiveExp} />
        </div>

        {/* RIGHT: Responsibilities — scrollable within fixed height */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto py-4"
            >
              <div className="space-y-0">
                {current.points.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    className="flex gap-4 py-3 border-b border-border/50 last:border-0"
                  >
                    <span className="text-primary font-display text-lg font-bold shrink-0 mt-0.5 w-6 text-right opacity-40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-foreground/80 leading-relaxed text-sm">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: fixed-height card ── */}
      <div className="md:hidden w-full max-w-sm flex-[1_0_70%] flex flex-col justify-center">
        {/* Fixed-height container so heading never shifts */}
        <div className="relative rounded-2xl border border-border/60 bg-card/50 overflow-hidden">
          {/* Top strip with period badge — always same position */}
          <div className="z-20 px-4 pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] font-medium text-accent-foreground">
                    {current.period}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Role & company — fixed-height slot */}
          <div className="px-4 h-18 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1] as const,
                  delay: 0.05,
                }}
              >
                <h3 className="font-display text-lg font-bold text-foreground leading-snug">
                  {current.role}
                </h3>
                <p className="text-primary font-medium text-sm mt-0.5">
                  {current.company}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60" />

          {/* Responsibilities — scrollable fixed area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-2"
            >
              {current.points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="flex gap-2.5 py-1.5 border-b border-border/30 last:border-0"
                >
                  <span className="text-primary font-display text-[10px] font-bold shrink-0 mt-0.5 w-4 text-right opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-foreground/80 leading-relaxed text-[11px]">
                    {point}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom: progress dots — always same position */}
          <div className="px-4 pb-3 pt-2 flex items-center justify-center">
            <ProgressDots activeExp={activeExp} setActiveExp={setActiveExp} />
          </div>
        </div>
      </div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-[10px] uppercase tracking-widest text-muted-foreground/40 mt-4 sm:mt-8 flex-[0_1_15%]"
      >
        {activeExp < experience.length - 1
          ? "Scroll to see next role"
          : "Scroll to continue"}
      </motion.p>
    </motion.div>
  );
};

/* ── Shared sub-components ── */
const ProgressDots = ({
  activeExp,
  setActiveExp,
}: {
  activeExp: number;
  setActiveExp: (i: number) => void;
}) => (
  <div className="flex items-center gap-2 pt-2 sm:pt-4">
    {experience.map((_, idx) => (
      <button
        key={idx}
        id="cardHover"
        onClick={() => setActiveExp(idx)}
        className="relative"
        aria-label={`Experience ${idx + 1}`}
      >
        <motion.div
          className="rounded-full"
          id="cardHover"
          animate={{
            width: idx === activeExp ? 24 : 8,
            height: 8,
            backgroundColor:
              idx === activeExp ? "hsl(var(--primary))" : "hsl(var(--border))",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </button>
    ))}
  </div>
);

const sections = [
  { id: "intro", label: "About & Skills", content: <IntroSection /> },
  { id: "experience", label: "Experience", content: <ExperienceSection /> },
];

const About = () => <FullPageSections sections={sections} />;

export default About;

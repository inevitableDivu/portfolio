import { motion } from "framer-motion";
import SocialIcons from "@/components/social.buttons";
import FullPageSections from "@/components/wrapper/full-page.wrapper";

const stats = [
  { value: "11+", label: "Projects Delivered" },
  { value: "4", label: "Years of Experience" },
  { value: "5+", label: "Global Clients" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const HomeContent = () => (
  <motion.div
    variants={stagger}
    initial="hidden"
    animate="visible"
    className="max-w-6xl text-center space-y-8 px-6"
  >
    <div className="space-y-4">
      <motion.div
        variants={fadeUp}
        className="text-sm tracking-widest uppercase text-muted-foreground font-medium"
      >
        Hey, I'm Divyansh Pandey
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="font-display text-3xl md:text-5xl font-bold leading-tight text-primary"
      >
        Software Engineer & System Designer
      </motion.h1>
    </div>

    <motion.p
      variants={fadeUp}
      className="text-muted-foreground leading-relaxed text-base lg:text-lg"
    >
      I’m a digital creator who turns ideas into seamless web and mobile
      experiences. With a deep love for JavaScript and a passion for interactive
      design, I bring concepts to life with code that feels as smooth as a
      favorite track. Inspired by everything from timeless classics to modern
      beats, my work blends creativity with functionality. Whether it’s building
      unique applications or diving into conversations about the future of tech,
      I’m all about crafting thoughtful, engaging digital experiences.
    </motion.p>

    <motion.p
      variants={fadeUp}
      className="text-muted-foreground italic text-sm"
    >
      Let's turn great ideas into something extraordinary—one line of code at a
      time.
    </motion.p>

    <motion.div
      variants={fadeUp}
      className="flex items-center justify-center gap-0 pt-4"
    >
      {stats.map((stat, idx) => (
        <div key={stat.label} className="flex items-center">
          {idx > 0 && <div className="h-10 w-px bg-border mx-8" />}
          <div className="text-center">
            <p className="text-3xl font-bold font-display text-foreground">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1 tracking-wide">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </motion.div>

    <motion.div variants={fadeUp} className="pt-6">
      <SocialIcons />
    </motion.div>
  </motion.div>
);

const sections = [{ id: "home", label: "Home", content: <HomeContent /> }];

const Index = () => <FullPageSections sections={sections} />;

export default Index;

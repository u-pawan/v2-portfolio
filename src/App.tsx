import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate 
} from 'framer-motion';
import { 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  Code2, 
  Cpu, 
  Zap, 
  Activity, 
  ArrowUpRight 
} from 'lucide-react';

// --- Lenis Smooth Scrolling Setup ---
const LenisSetup = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || document.querySelector('script[src*="lenis"]')) return;
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@studio-freight/lenis@1.0.39/dist/lenis.min.js';
    script.async = true;
    script.onload = () => {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    document.head.appendChild(script);
    
    return () => {
      // Cleanup for strict mode
    };
  }, []);
  return null;
};

// --- Matter.js Setup for Physics ---
interface MatterSetupProps {
  onReady: () => void;
}

const MatterSetup = ({ onReady }: MatterSetupProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.Matter) {
      onReady();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
    script.async = true;
    script.onload = onReady;
    document.head.appendChild(script);
  }, [onReady]);
  return null;
};

// --- Data based on original site ---
const toolsData = [
  { name: "React", img: "react/react-original.svg", shortName: "React" },
  { name: "Angular", img: "angularjs/angularjs-original.svg", shortName: "Angular" },
  { name: "Node.js", img: "nodejs/nodejs-original.svg", shortName: "Node.js" },
  { name: "Express", img: "express/express-original.svg", invert: true, shortName: "Express" },
  { name: ".NET", img: "dotnetcore/dotnetcore-original.svg", shortName: ".NET" },
  { name: "Python", img: "python/python-original.svg", shortName: "Python" },
  { name: "React Native", img: "react/react-original.svg", shortName: "R-Native" },
  { name: "Ionic", img: "ionic/ionic-original.svg", shortName: "Ionic" },
  { name: "MongoDB", img: "mongodb/mongodb-original.svg", shortName: "MongoDB" },
  { name: "PostgreSQL", img: "postgresql/postgresql-original.svg", shortName: "Postgres" },
  { name: "SQL Server", img: "microsoftsqlserver/microsoftsqlserver-plain.svg", invert: true, shortName: "SQL Server" },
  { name: "MySQL", img: "mysql/mysql-original.svg", shortName: "MySQL" },
  { name: "FastAPI", img: "fastapi/fastapi-original.svg", shortName: "FastAPI" },
  { name: "Git", img: "git/git-original.svg", shortName: "Git" },
  { name: "Docker", img: "docker/docker-original.svg", shortName: "Docker" },
];

interface Project {
  title: string;
  category: string;
  tags: string[];
  description: string;
}

const projects: Project[] = [
  { 
    title: "Invoicer", 
    category: "AI-Powered / Fintech", 
    tags: ["AI", "Fintech", "Productivity", "UX Design"],
    description: "An AI-powered invoice maker designed for freelance creatives. Translates natural language into structured billing, eliminating friction and ensuring faster payments with zero manual entry.", 
  },
  { 
    title: "BuildHand", 
    category: "Construction Tech / Infra SaaS",
    tags: ["ConTech", "B2B SaaS", "Operations", "Infrastructure"],
    description: "A visual-first SaaS ecosystem bridging field execution and boardroom strategy. Designed for founders demanding transparency, moving away from 'Excel-style' management.", 
  },
  { 
    title: "Prognos Labs", 
    category: "AI Consulting / Digital HQ",
    tags: ["LLMOps", "Next.js 15", "Enterprise UI", "GEO Strategy"],
    description: "Enterprise-grade platform focused on 'Digital HQ' principles: immediate trust, role-based clarity for CTOs, and technical specifications that tell search engines why Prognos is a leader in custom LLMs.", 
  },
  { 
    title: "FridayJob24", 
    category: "Hiring Platform / EdTech SaaS",
    tags: ["EdTech", "Hiring", "Maps API", "Real-time"],
    description: "Engineered an interactive map interface for local job discovery and a 'Direct-to-Founder' communication layer, filtering signal-to-noise for modern startups and student talent.", 
  },
  { 
    title: "SecureVote", 
    category: "GovTech / Security Web App",
    tags: ["GovTech", "Cryptography", "JWT", "Security"],
    description: "Developed during a high-stakes hackathon, this platform solves the 'trust gap' in digital voting through rigorous cryptographic implementation and stateless JWT authentication.", 
  },
  { 
    title: "SmartWatts", 
    category: "Sustainability / FinTech",
    tags: ["Sustainability", "Data Viz", "AI Logic", "Dashboard"],
    description: "Generates a granular summary of energy 'drainers' from simple inputs. Features high-performance data visualization and an AI-logic engine for green alternatives.", 
  },
  { 
    title: "Khetak", 
    category: "CyberSec / AI Hackathon Project",
    tags: ["CyberSecurity", "AI Safety", "Browser Extension"],
    description: "A smart digital guardian browser extension that intelligently blurs 18+ content across all social media platforms in real-time, backed by intent-aware AI models.", 
  },
  { 
    title: "Vidhya Seva", 
    category: "Healthcare / Telemedicine",
    tags: ["Healthcare", "Telemedicine", "SaaS", "UX Design"],
    description: "A comprehensive health hub designed to connect patients with doctors seamlessly. It bridges the gap between seeking medical care and managing health records with a unified platform.", 
  },
];

const services = [
  { icon: <Cpu className="w-8 h-8 text-blue-400" />, title: "Custom LLMs & Chatbots", desc: "Intelligent, context-aware AI agents trained on your specific business data." },
  { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: "Automation Workflows", desc: "Eliminate manual friction with tailored automation and custom script integrations." },
  { icon: <Activity className="w-8 h-8 text-emerald-400" />, title: "Predictive Analytics", desc: "High-performance data visualization and AI-logic engines that turn raw data into strategic insights." },
  { icon: <Code2 className="w-8 h-8 text-purple-400" />, title: "Full-Stack MVPs", desc: "End-to-end web and mobile applications engineered and shipped in 4-8 weeks." },
];

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Most high-impact web and mobile applications are delivered within 4-8 weeks. However, the timeline varies depending on the complexity and scope of the project. I prioritize rapid iteration to get your MVP to market fast."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes. Launching is just the beginning. I provide ongoing maintenance, infrastructure scaling, and continuous feature updates as your user base and product requirements grow."
  },
  {
    question: "What is your pricing model?",
    answer: "I build lean, functional MVPs starting with fixed scoping. Pricing scales based on complexity, from simple landing pages to full enterprise SaaS platforms. Let's discuss your requirements to get an accurate scope."
  },
  {
    question: "What tech stack do you specialize in?",
    answer: "I specialize in the modern JavaScript ecosystem (Next.js, Node.js, React, Tailwind) and integrate advanced AI models (Custom LLMs, OpenAI, LangChain) for fast, scalable, and highly performant applications."
  }
];

// --- Shared Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Custom Cursor ---
const Cursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 800, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 35 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ x: springX, y: springY }}
    />
  );
};

// --- Components ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-black tracking-tighter text-white hover:opacity-70 transition-opacity">PAWAN.</a>
        
        <div className="hidden md:flex items-center space-x-12 text-sm font-semibold text-zinc-400 tracking-wide">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        
        <a href="#contact" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-black bg-white rounded-full hover:scale-105 active:scale-95 transition-all">
          Start Your Project
        </a>
        
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 z-50">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 shadow-2xl md:hidden"
          >
            <div className="flex flex-col px-6 py-8 space-y-6 text-xl font-bold tracking-tight">
              <a href="#work" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">Work</a>
              <a href="#services" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">Services</a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">FAQ</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="inline-flex items-center justify-center px-6 py-4 text-black bg-white rounded-full w-full mt-4">Start Your Project</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#050505]">
      {/* Grid Pattern & Glows */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
          className="inline-flex items-center space-x-3 border border-white/10 rounded-full px-5 py-2 text-xs md:text-sm font-mono uppercase tracking-widest mb-10 bg-white/5 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-300">Design. Develop. Deploy.</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} 
          className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter mb-8 text-white leading-[0.9]"
        >
          Stop Planning.<br /> <span className="text-zinc-500">Start Launching.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
          className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-14 font-medium leading-relaxed"
        >
          I Build Apps That Go Live. Fast. I craft AI-powered websites and apps that help startups and SMEs move faster and grow smarter.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} 
        >
          <a href="#work" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 text-lg">
             <span className="absolute inset-0 w-full h-full bg-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
             <span className="relative z-10 flex items-center">
               View My Work <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-10 bg-[#0a0a0a] overflow-hidden flex whitespace-nowrap border-y border-white/5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex space-x-16 text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-800 items-center"
      >
        {[...Array(4)].map((_, i) => (
           <React.Fragment key={i}>
             <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">BUILDHAND</span>
             <span className="text-zinc-800">•</span>
             <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">PROGNOS LABS</span>
             <span className="text-zinc-800">•</span>
             <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">FRIDAYJOB24</span>
             <span className="text-zinc-800">•</span>
             <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">VIBEMATCH</span>
             <span className="text-zinc-800">•</span>
           </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <section className="py-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
            MORE THAN <br/><span className="text-zinc-600">code.</span>
          </motion.h2>
        </motion.div>
        
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-4">The Vision</motion.p>
          <motion.p variants={fadeInUp} className="text-2xl md:text-4xl font-medium text-zinc-300 leading-snug mb-10 tracking-tight">
            I'm Pawan, a Web and App Developer who ships. Building credible software with a focus on editorial quality.
          </motion.p>
          <motion.a variants={fadeInUp} href="#work" className="border-b border-white/30 pb-1 text-white hover:text-zinc-400 hover:border-zinc-400 transition-all inline-flex items-center font-semibold tracking-wide text-lg">
            Explore Case Studies <ArrowUpRight className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

interface SpotlightCardProps {
  project: Project;
  index: number;
}

const SpotlightCard = ({ project, index }: SpotlightCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/10 h-full flex flex-col p-8 md:p-10"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-16">
          <span className="text-xs font-bold bg-white/5 border border-white/10 rounded-full px-4 py-2 text-zinc-300 uppercase tracking-widest backdrop-blur-md">
            {project.category}
          </span>
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0 cursor-pointer">
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>
        <div className="mt-auto">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 font-medium">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-32 px-6 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            Selected Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-medium"
          >
            I build actual web and mobile apps your first 100 users can use today. Not just mockups.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => <SpotlightCard key={i} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
};

const ToolsSection = () => {
  const [matterReady, setMatterReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<any>(null);
  const ballsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [ballSize, setBallSize] = useState(110);

  useEffect(() => {
    if (!matterReady || !containerRef.current) return;

    const Matter = window.Matter;
    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Dynamically calculate radius based on container width to prevent overflow/explosion
    let radius = 55; // default desktop diameter: 110px
    if (width < 640) {
      radius = 32; // mobile diameter: 64px
    } else if (width < 1024) {
      radius = 45; // tablet diameter: 90px
    }
    setBallSize(radius * 2);

    // Create boundaries
    const wallOptions = { isStatic: true, friction: 0 };
    const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    
    // Position ceiling at -400, well above the drop zone (which is -250 to -50)
    const ceiling = Bodies.rectangle(width / 2, -400, width * 2, 100, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // Create balls drop zone: all between -250 and -50 (safely below ceiling)
    const bodies = toolsData.map(() => {
      return Bodies.circle(
        Math.random() * (width - radius * 2 - 20) + radius + 10, // random x inside container walls
        -Math.random() * 200 - 50, // random drop y
        radius,
        {
          restitution: 0.8, // Bouncy
          friction: 0.005,
          density: 0.04, // Feels heavy
        }
      );
    });

    Composite.add(world, bodies);

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(world, mouseConstraint);

    // Prevent scrolling the page when interacting with the balls
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    // Sync HTML Elements to Physics Bodies
    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body: any, i: number) => {
        const domElement = ballsRef.current[i];
        if (domElement) {
          domElement.style.transform = `translate(${body.position.x - radius}px, ${body.position.y - radius}px)`;
          const visualBall = domElement.querySelector('.visual-ball') as HTMLElement | null;
          if (visualBall) {
            visualBall.style.transform = `rotate(${body.angle}rad)`;
          }
        }
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });
      Matter.Body.setPosition(leftWall, { x: -50, y: newHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [matterReady]);

  // Helper classes for responsive sizes inside the 3D balls
  const getIconSizeClass = () => {
    if (ballSize < 70) return 'w-6 h-6 mb-0.5';
    if (ballSize < 100) return 'w-8 h-8 mb-1';
    return 'w-9 h-9 mb-1.5';
  };

  const getTextSizeClass = () => {
    if (ballSize < 70) return 'text-[8px]';
    if (ballSize < 100) return 'text-[9px]';
    return 'text-[10px] md:text-[11px]';
  };

  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
      <MatterSetup onReady={() => setMatterReady(true)} />
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
        >
          Tools.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-medium"
        >
          The stack I use to build robust applications. <span className="text-white">Go ahead, grab and throw them.</span>
        </motion.p>
      </div>
      
      <div 
        ref={containerRef} 
        className="w-full h-[360px] relative overflow-hidden bg-zinc-950/50 border-y border-white/5 cursor-grab active:cursor-grabbing"
      >
        {toolsData.map((tool, i) => (
          <div 
            key={i}
            ref={el => { ballsRef.current[i] = el; }}
            className="absolute top-0 left-0 pointer-events-none group z-10"
            style={{ 
              width: `${ballSize}px`,
              height: `${ballSize}px`,
              transform: 'translate(-999px, -999px)' 
            }} // Hide offscreen initially
          >
            {/* Visual 3D Ball */}
            <div 
              className="visual-ball w-full h-full rounded-full flex flex-col items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing border border-white/10 p-2.5 relative overflow-hidden select-none"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #2a2b36 0%, #15161c 50%, #050508 100%)',
                boxShadow: 'inset -8px -8px 20px rgba(0, 0, 0, 0.9), inset 8px 8px 20px rgba(255, 255, 255, 0.06), 0 12px 24px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Glossy Overlay Reflection */}
              <div className="absolute top-[8%] left-[15%] w-[45%] h-[22%] bg-white/15 rounded-full blur-[0.5px] pointer-events-none rotate-[-15deg]" />
              
              <img 
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tool.img}`} 
                alt={tool.name} 
                className={`${getIconSizeClass()} object-contain drop-shadow-md pointer-events-none ${tool.invert ? 'invert' : ''}`}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.nextSibling) {
                    (target.nextSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <span className="hidden text-white font-black text-xl pointer-events-none">{tool.name[0]}</span>
              
              <span className={`${getTextSizeClass()} font-black uppercase tracking-wider text-zinc-300 pointer-events-none select-none font-mono text-center leading-none`}>
                {tool.shortName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            Capabilities
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="p-10 rounded-[2rem] bg-[#050505] border border-white/5 hover:border-white/10 transition-colors flex flex-col items-start group"
            >
              <div className="p-4 bg-zinc-900 rounded-2xl border border-white/5 mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section className="py-40 px-6 bg-[#050505] relative overflow-hidden flex items-center justify-center border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <Code2 className="w-16 h-16 text-zinc-800 mx-auto mb-12" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.3] text-white mb-16 tracking-tight"
        >
          "Pawan takes a <span className="text-zinc-500">'work-first'</span> approach, hitting every deadline and providing invaluable market strategy alongside top-tier development."
        </motion.h2>
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           viewport={{ once: true }}
        >
          <p className="text-white font-bold text-2xl mb-2">Gopal Deshmukh</p>
          <p className="text-zinc-500 uppercase tracking-widest text-sm font-bold">CEO of Buildhand</p>
        </motion.div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="border-b border-white/10"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-10 flex justify-between items-center text-left group focus:outline-none"
      >
        <span className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-zinc-400 transition-colors">{question}</span>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 flex-shrink-0">
          <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-white' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-zinc-400 pb-10 text-xl font-medium leading-relaxed max-w-4xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-16">FAQs.</h2>
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="pt-32 pb-10 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-600/5 rounded-[100%] blur-[150px] pointer-events-none translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter mb-8 text-white leading-[1]"
        >
          Building the Next Big.<br/><span className="text-zinc-600">Startup?</span>
        </motion.h2>
        
        <p className="text-xl md:text-3xl text-zinc-400 mb-14 max-w-3xl font-medium">
          I help founders and startups create products that users actually trust.
        </p>
        
        <a 
          href="mailto:contact@pawanupadhyay.com" 
          className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center">
            Let's Collaborate <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>
        
        <div className="mt-40 pt-10 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center text-zinc-500 font-medium">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-white text-lg font-bold mb-1">Pawan Upadhyay.</p>
            <p className="text-sm">Full Stack Developer & UI/UX Designer crafting high-impact digital experiences.</p>
          </div>
          <div className="flex space-x-8 text-sm font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-white transition-colors flex items-center">Twitter</a>
            <a href="#" className="hover:text-white transition-colors flex items-center">GitHub</a>
            <a href="#" className="hover:text-white transition-colors flex items-center">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <LenisSetup />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <ToolsSection />
        <Services />
        <Testimonial />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}

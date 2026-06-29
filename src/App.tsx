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
  link?: string;
}

const projects: Project[] = [
  {
    title: "Pipeline Builder",
    category: "Visual Workflow Editor",
    tags: ["React", "FastAPI", "DAG", "Workflow"],
    description: "A visual workflow editor with reusable node abstraction and dynamic Text nodes. Integrated FastAPI backend to validate DAG structure and compute pipeline node/edge metrics.",
  },
  {
    title: "GBK Apparels",
    category: "E-Commerce / Retail",
    tags: ["Web", "E-Commerce", "UI/UX", "Retail"],
    description: "A full-featured e-commerce platform for an apparel brand — product listings, cart, and checkout flow designed for a seamless shopping experience.",
    link: "https://gbkapparels.com",
  },
  {
    title: "Trello Clone",
    category: "Productivity / Task Management",
    tags: ["React", "Drag & Drop", "Kanban", "Open Source"],
    description: "A feature-complete Trello-inspired kanban board with drag-and-drop task management, multiple boards, and real-time card editing.",
    link: "https://github.com/u-pawan/trello_v1",
  },
  {
    title: "Biometric Auth Enhancement",
    category: "Mobile Security / Enterprise App",
    tags: ["Ionic", "Angular", "Face Recognition", "Fingerprint"],
    description: "Integrated face recognition and fingerprint authentication into an enterprise mobile application, improving security, access control, and overall user experience.",
  },
  {
    title: "System Sleep/Lock Tracker",
    category: "Data Analysis / Monitoring Tool",
    tags: ["Python", "Data Analysis", "Logging", "Dashboard"],
    description: "A system activity monitoring application with structured logging and reporting, providing granular insights into sleep/lock cycles for process analysis.",
  },
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

const ContactModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-zinc-400" />
          </button>

          <h3 className="text-3xl font-black tracking-tighter text-white mb-2">Let's Connect</h3>
          <p className="text-zinc-500 mb-8 font-medium">Reach out via any channel below.</p>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:upwan592@gmail.com?subject=Project%20Inquiry&body=Hi%20Pawan%2C%20I%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project%20with%20you.%20Are%20you%20available%20for%20a%20quick%20chat%3F"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/30 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-0.5">Email</p>
                <p className="text-white font-semibold">upwan592@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+918707483603"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/30 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-0.5">Phone</p>
                <p className="text-white font-semibold">+91 8707483603</p>
              </div>
            </a>

            <a
              href="https://wa.me/918707483603"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-green-500/40 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 group-hover:border-green-500 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-0.5">WhatsApp</p>
                <p className="text-white font-semibold">+91 8707483603</p>
              </div>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-2xl font-black tracking-tighter text-white hover:opacity-70 transition-opacity">PAWAN.</a>

          <div className="hidden md:flex items-center space-x-12 text-sm font-semibold text-zinc-400 tracking-wide">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <button onClick={() => setContactOpen(true)} className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-black bg-white rounded-full hover:scale-105 active:scale-95 transition-all">
            Start Your Project
          </button>

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
                <button onClick={() => { setIsOpen(false); setContactOpen(true); }} className="inline-flex items-center justify-center px-6 py-4 text-black bg-white rounded-full w-full mt-4">Start Your Project</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
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
             <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">PIPELINE BUILDER</span>
             <span className="text-zinc-800">•</span>
             <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">GBK APPARELS</span>
             <span className="text-zinc-800">•</span>
             <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">TRELLO CLONE</span>
             <span className="text-zinc-800">•</span>
             <span className="text-zinc-400 hover:text-white transition-colors duration-500 cursor-default">BIOMETRIC AUTH</span>
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

  const handleLinkClick = (e: React.MouseEvent) => {
    if (project.link) {
      e.stopPropagation();
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

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
          <div
            onClick={handleLinkClick}
            className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0 ${project.link ? 'cursor-pointer' : 'opacity-40'}`}
          >
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
    <section id="services" className="py-32 px-6 bg-[#0d0d0d] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl leading-none tracking-tight"
          >
            <span className="font-black text-white">MY </span>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic text-zinc-400">services</span>
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Full Cycle Development
          </motion.span>
        </div>

        {/* Bento grid — top section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-[2fr_1.4fr_2fr] grid-rows-2 gap-3 mb-3"
          style={{ gridTemplateRows: 'auto auto' }}
        >
          {/* Mobile Apps — emerald dark, spans 2 rows */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
            className="md:row-span-2 bg-gradient-to-br from-emerald-950/80 to-zinc-900 border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-between min-h-[280px] md:min-h-0"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60">High Performance</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              </div>
            </div>
            <div>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-2">
                Mobile<br />Apps
              </h3>
              <p className="text-zinc-400 font-semibold text-sm mb-6">iOS & Android Solutions</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 text-emerald-400">React Native</span>
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* SaaS — zinc-800, row 1 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
            className="bg-zinc-800 border border-white/5 rounded-3xl p-7 flex flex-col items-center justify-center text-center gap-3 min-h-[130px]"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter">SaaS</h3>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Scalable Platforms</p>
            </div>
          </motion.div>

          {/* AI Agents — blue dark, spans 2 rows */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
            className="md:row-span-2 bg-gradient-to-br from-blue-950/80 to-zinc-900 border border-blue-500/20 rounded-3xl p-8 flex flex-col justify-between min-h-[280px] md:min-h-0"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/60">Intelligence Layer</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
            </div>
            <div>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-2">
                AI<br />Agents
              </h3>
              <p className="text-zinc-400 font-semibold text-sm mb-6">Automate. Optimise. Evolve.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Chatbots', 'Custom LLMs', 'Automation', 'Analytics'].map((tag) => (
                  <span key={tag} className="text-xs font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-2 text-center">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Web Apps — zinc-800, row 2 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
            className="bg-zinc-800 border border-white/5 rounded-3xl p-7 flex flex-col items-center justify-center text-center gap-3 min-h-[130px]"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter">Web Apps</h3>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Modern & Responsive</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom 2-col dark cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {/* UI/UX Design */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
            className="bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-emerald-400">UI/UX DESIGN</h3>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Award-winning interfaces</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-5 h-5 text-zinc-400" />
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
              User-centric design that drives engagement and conversion. I build experiences, not just screens.
            </p>
          </motion.div>

          {/* Product Strategy */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
            className="bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white">PRODUCT STRATEGY</h3>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">From MVP to Scale</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
              Roadmapping, feasibility analysis, and growth hacking for your digital product.
            </p>
          </motion.div>
        </motion.div>

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
          I understand your problem <span className="text-zinc-500">before</span> I write a single line. I scope precisely, build cleanly, and keep you informed at every step — no surprises, no bloat. Just <span className="text-zinc-500">purposeful work</span> that ships and scales.
        </motion.h2>
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           viewport={{ once: true }}
        >
          <p className="text-white font-bold text-2xl mb-2">Pawan Upadhyay</p>
          <p className="text-zinc-500 uppercase tracking-widest text-sm font-bold">How I work — on every project</p>
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

const ContactCTA = () => {
  return (
    <section className="pt-32 pb-20 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-600/5 rounded-[100%] blur-[150px] pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter mb-8 text-white leading-[1]"
        >
          Building the Next Big.<br /><span className="text-zinc-600">Startup?</span>
        </motion.h2>

        <p className="text-xl md:text-3xl text-zinc-400 mb-14 max-w-3xl font-medium">
          I help founders and startups create products that users actually trust.
        </p>

        <a
          href="https://wa.me/918707483603?text=Hi%20Pawan%2C%20I%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project%20with%20you.%20Are%20you%20available%20for%20a%20quick%20chat%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center">
            Let's Collaborate <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>

      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#050505] border-t border-white/10">

      {/* Top — contact label + big email */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 border-b border-white/5">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Contact Us</p>
        <motion.a
          href="mailto:upwan592@gmail.com?subject=Project%20Inquiry&body=Hi%20Pawan%2C%20I%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project%20with%20you.%20Are%20you%20available%20for%20a%20quick%20chat%3F"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-emerald-400 hover:text-emerald-300 transition-colors tracking-tight break-all"
        >
          upwan592@gmail.com
        </motion.a>
      </div>

      {/* Main grid — 4 columns */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5">

        {/* Col 1 — Bio */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-5">Designed & Developed By</p>
          <h3 className="text-xl font-black text-white mb-2 tracking-tight">Pawan Upadhyay</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5">
            Full Stack Developer & Associate Software Engineer crafting enterprise and web solutions.
          </p>
          <p className="text-xs text-zinc-600 font-semibold">Based in Hyderabad, India</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Angular', 'React', 'Python', 'Ionic', '.NET'].map(tag => (
              <span key={tag} className="text-[10px] font-bold text-zinc-500 border border-white/10 rounded-full px-3 py-1 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-5">Quick Links</p>
          <nav className="flex flex-col gap-3">
            {[['Work', '#work'], ['Services', '#services'], ['FAQ', '#faq'], ['Contact', '#contact']].map(([label, href]) => (
              <a key={label} href={href} className="text-white font-semibold text-sm hover:text-zinc-400 transition-colors w-fit">
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Col 3 — Legal */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-5">Legal</p>
          <nav className="flex flex-col gap-3">
            {['Privacy Policy', 'Terms & Conditions', 'Code of Conduct'].map(item => (
              <span key={item} className="text-zinc-500 font-medium text-sm cursor-default">{item}</span>
            ))}
          </nav>
        </div>

        {/* Col 4 — Contact details */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">General Enquiries</p>
            <p className="text-white font-bold text-sm mb-1">Pawan Upadhyay</p>
            <a href="tel:+918707483603" className="text-zinc-400 text-sm hover:text-white transition-colors block">+91 8707483603</a>
            <a href="https://wa.me/918707483603" target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-xs font-bold hover:text-emerald-300 transition-colors mt-1 block">
              WhatsApp →
            </a>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Project Enquiries</p>
            <p className="text-white font-bold text-sm mb-1">Consultancy</p>
            <a href="mailto:upwan592@gmail.com?subject=Project%20Inquiry&body=Hi%20Pawan%2C%20I%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project%20with%20you.%20Are%20you%20available%20for%20a%20quick%20chat%3F" className="text-zinc-400 text-xs hover:text-white transition-colors break-all">
              upwan592@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-600 text-xs font-medium">
          © 2026 Pawan Upadhyay. All Rights Reserved.
        </p>
        <div className="flex items-center gap-3">
          {/* LinkedIn */}
          <a href="https://linkedin.com/in/upawan" target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          {/* GitHub */}
          <a href="https://github.com/u-pawan" target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
          {/* WhatsApp */}
          <a href="https://wa.me/918707483603" target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          {/* Email */}
          <a href="mailto:upwan592@gmail.com?subject=Project%20Inquiry&body=Hi%20Pawan%2C%20I%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project%20with%20you.%20Are%20you%20available%20for%20a%20quick%20chat%3F"
            className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </a>
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

      <ContactCTA />
      <Footer />
    </div>
  );
}

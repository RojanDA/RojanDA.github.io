import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion';
import { BarChart3, Database, TrendingUp, Code, Brain, Shield, ChevronDown, Mail, Github, Linkedin, ExternalLink, Award, Briefcase, GraduationCap, MapPin, Phone, ArrowRight, Sparkles, Download, BookOpen, Cloud, Globe, FileSpreadsheet, Server } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import rojanImg from './image/rojan.jpg';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

// Scroll Progress Bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/95 backdrop-blur-md shadow-lg shadow-gold/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#hero"
          className="font-display text-2xl font-bold text-gold retro-text"
          whileHover={{ scale: 1.05 }}
          data-hover="true"
        >
          R.P.
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-sm text-parchment/80 hover:text-gold transition-colors retro-underline"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              data-hover="true"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <button
          className="md:hidden text-gold"
          onClick={() => setMenuOpen(!menuOpen)}
          data-hover="true"
        >
          <div className="space-y-1.5">
            <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="w-6 h-0.5 bg-gold" />
            <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-gold" />
            <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="w-6 h-0.5 bg-gold" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ink/98 backdrop-blur-md border-t border-gold/20"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block font-mono text-parchment/80 hover:text-gold transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero Section with scroll parallax
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink vignette">
      <div className="absolute inset-0 retro-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink-light" />
      
      {/* Floating 3D Elements with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 md:left-20 w-20 h-20 md:w-32 md:h-32 border-2 border-gold/20 rounded-lg"
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        />
        <motion.div
          className="absolute top-40 right-10 md:right-32 w-16 h-16 md:w-24 md:h-24 border-2 border-burgundy/30 rounded-full"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 md:w-16 md:h-16 bg-gold/5 border border-gold/15"
          animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 right-1/4 w-8 h-8 md:w-12 md:h-12 bg-burgundy/15 rounded-full"
          animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-4 h-4 bg-gold/20 rounded-full"
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-6 h-6 border border-copper/20 rotate-45"
          animate={{ rotate: [45, 225, 45], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="font-mono text-gold/70 text-sm md:text-base tracking-[0.3em] uppercase">
              ── Aspiring Data Analyst ──
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-parchment mb-6 retro-text leading-tight"
          >
            Rojan
            <span className="text-gold block md:inline"> Poudel</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-body text-parchment/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Passionate data enthusiast building expertise in Python, SQL, and data visualization. 
            Transforming personal projects into powerful insights and ready to launch a career in data analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-gold text-ink font-mono font-bold text-sm uppercase tracking-wider hover:bg-gold-light transition-all duration-300 vintage-border glow-gold"
              data-hover="true"
            >
              View My Projects
            </a>
            <a
              href="/Rojan_Poudel_CV.pdf"
              download="Rojan_Poudel_CV.pdf"
              className="px-8 py-3 border-2 border-gold/50 text-gold font-mono font-bold text-sm uppercase tracking-wider hover:border-gold hover:bg-gold/10 transition-all duration-300 flex items-center gap-2"
              data-hover="true"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { number: '10+', label: 'Projects' },
              { number: '8+', label: 'Skills' },
              { number: '5+', label: 'Certifications' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.2 }}
              >
                <div className="font-display text-2xl md:text-3xl font-bold text-gold">{stat.number}</div>
                <div className="font-mono text-xs text-parchment/50 uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-pulse"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-gold/40 uppercase tracking-wider">Scroll</span>
          <ChevronDown className="text-gold/50 w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}

// Marquee Ticker Section (scroll-driven)
function MarqueeSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const items = ['PYTHON', '●', 'SQL', '●', 'POWER BI', '●', 'EXCEL', '●', 'AWS', '●', 'AZURE', '●', 'PANDAS', '●', 'WEB SCRAPING', '●', 'DATA ANALYSIS', '●', 'DATA VISUALIZATION', '●', 'ETL', '●'];

  return (
    <section ref={ref} className="relative py-8 bg-ink-mid border-y border-gold/10 overflow-hidden">
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`font-mono text-sm md:text-base mx-4 md:mx-6 ${
              item === '●' ? 'text-burgundy' : 'text-gold/60'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

// About Section with scroll reveal
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 bg-ink-light paper-texture overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-gold/60 text-sm tracking-[0.3em] uppercase">Who I Am</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mt-4 retro-text">
            About Me
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual with parallax */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-3d"
          >
            <div className="relative vintage-border-double p-4 bg-ink/80">
              <div className="aspect-square bg-gradient-to-br from-burgundy/20 via-ink to-navy/20 rounded-sm overflow-hidden">
                <motion.img
                  src={rojanImg}
                  alt="Rojan Poudel"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                />
              </div>
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold/50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/50" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold/50" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold/50" />
            </div>
          </motion.div>

          {/* Text Content with parallax */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="font-body text-parchment/80 text-lg leading-relaxed">
              A passionate <span className="text-gold font-semibold">aspiring Data Analyst</span> with hands-on 
              experience through personal projects. I've built a strong foundation in Python, SQL, 
              and data visualization tools like Power BI and Excel.
            </p>
            <p className="font-body text-parchment/70 leading-relaxed">
              Through self-directed learning and real-world projects, I've developed skills in 
              web scraping, cloud platforms (AWS & Azure), and data manipulation with Pandas. 
              Every project is an opportunity to solve problems and uncover insights.
            </p>
            <p className="font-body text-parchment/70 leading-relaxed">
              I'm eager to bring my analytical mindset, technical skills, and enthusiasm 
              for data to a professional team where I can continue growing and contributing 
              meaningful insights.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: MapPin, text: 'San Francisco, CA' },
                { icon: Briefcase, text: 'Seeking Opportunities' },
                { icon: GraduationCap, text: 'B.S. Computer Science' },
                { icon: Award, text: 'Quick Learner' },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 text-parchment/60"
                >
                  <item.icon className="w-4 h-4 text-gold" />
                  <span className="font-mono text-xs">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Scroll-triggered counter component
function AnimatedCounter({ target, isInView, suffix = '' }: { target: number; isInView: boolean; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span>{count}{suffix}</span>;
}

// Skills Section with scroll-driven charts
function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const chartScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const chartOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const radarData = [
    { skill: 'Python', value: 55 },
    { skill: 'SQL', value: 58 },
    { skill: 'Power BI', value: 54 },
    { skill: 'Excel', value: 59 },
    { skill: 'AWS', value: 51 },
    { skill: 'Azure', value: 53 },
  ];

  const learningData = [
    { month: 'Jan', hours: 20, projects: 1 },
    { month: 'Feb', hours: 35, projects: 1 },
    { month: 'Mar', hours: 45, projects: 2 },
    { month: 'Apr', hours: 60, projects: 2 },
    { month: 'May', hours: 80, projects: 3 },
    { month: 'Jun', hours: 95, projects: 3 },
    { month: 'Jul', hours: 110, projects: 4 },
  ];

  const skills = [
    { name: 'Python & Pandas', level: 55, icon: Code },
    { name: 'SQL & Databases', level: 58, icon: Database },
    { name: 'Power BI', level: 54, icon: BarChart3 },
    { name: 'Excel & Data Analysis', level: 59, icon: FileSpreadsheet },
    { name: 'Web Scraping', level: 52, icon: Globe },
    { name: 'AWS Cloud', level: 51, icon: Cloud },
    { name: 'Azure Cloud', level: 53, icon: Server },
    { name: 'Data Visualization', level: 56, icon: TrendingUp },
  ];

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32 bg-ink overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-15" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-gold/60 text-sm tracking-[0.3em] uppercase">Expertise</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mt-4 retro-text">
            Skills & Tools
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Bars */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <skill.icon className="w-4 h-4 text-gold" />
                    <span className="font-mono text-sm text-parchment/80">{skill.name}</span>
                  </div>
                  <span className="font-mono text-xs text-gold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-ink-mid rounded-full overflow-hidden border border-gold/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-burgundy via-gold to-gold-light"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Radar Chart with scroll-driven scale */}
          <motion.div
            style={{ scale: chartScale, opacity: chartOpacity }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="vintage-border p-6 bg-ink/80"
          >
            <h3 className="font-display text-lg text-gold text-center mb-4">Proficiency Map</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(91, 122, 153, 0.2)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#e8e4dc', fontSize: 10, fontFamily: 'Space Mono' }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="value" stroke="#5b7a99" fill="#5b7a99" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Learning Journey Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 vintage-border p-6 bg-ink/80"
        >
          <h3 className="font-display text-lg text-gold text-center mb-6">Learning Journey</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={learningData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5b7a99" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#5b7a99" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProjectsChart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d4a5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2d4a5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#e8e4dc', fontSize: 10, fontFamily: 'Space Mono' }} axisLine={{ stroke: 'rgba(91, 122, 153, 0.3)' }} />
              <YAxis tick={{ fill: '#e8e4dc', fontSize: 10, fontFamily: 'Space Mono' }} axisLine={{ stroke: 'rgba(91, 122, 153, 0.3)' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0d12', border: '1px solid #5b7a99', borderRadius: 0, fontFamily: 'Space Mono', fontSize: 12 }}
                labelStyle={{ color: '#5b7a99' }}
              />
              <Area type="monotone" dataKey="hours" stroke="#5b7a99" fill="url(#colorHours)" strokeWidth={2} name="Learning Hours" />
              <Area type="monotone" dataKey="projects" stroke="#2d4a5e" fill="url(#colorProjectsChart)" strokeWidth={2} name="Projects" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold rounded-full" />
              <span className="font-mono text-xs text-parchment/60">Learning Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-burgundy rounded-full" />
              <span className="font-mono text-xs text-parchment/60">Projects Built</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Stats Counter Section (scroll-triggered)
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const stats = [
    { value: 10, suffix: '+', label: 'Personal Projects' },
    { value: 8, suffix: '+', label: 'Technical Skills' },
    { value: 500, suffix: '+', label: 'Learning Hours' },
    { value: 5, suffix: '+', label: 'Certifications' },
  ];

  return (
    <section ref={ref} className="relative py-20 bg-ink-mid border-y border-gold/10 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 retro-grid opacity-10" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center p-6 border border-gold/10 bg-ink/50 hover:border-gold/30 transition-all duration-500"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-gold mb-2">
                <AnimatedCounter target={stat.value} isInView={isInView} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-xs text-parchment/50 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section with 3D scroll effects
function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [50, -50]);

  const projects = [
    {
      title: 'Sales Dashboard with Power BI',
      description: 'Built an interactive dashboard analyzing 10K+ sales records with dynamic filters, KPIs, and trend analysis. Implemented data modeling and DAX calculations.',
      tags: ['Power BI', 'DAX', 'Data Modeling'],
      metric: '10K+ Records',
    },
    {
      title: 'E-Commerce Web Scraper',
      description: 'Developed a Python web scraper to collect product data from multiple e-commerce sites. Automated data cleaning and structured storage in CSV/JSON formats.',
      tags: ['Python', 'BeautifulSoup', 'Selenium'],
      metric: '5K+ Products',
    },
    {
      title: 'Customer Segmentation Analysis',
      description: 'Applied clustering algorithms to segment customers based on purchase behavior using Pandas. Created visualizations to identify key customer groups.',
      tags: ['Python', 'Pandas', 'Scikit-learn'],
      metric: '4 Segments',
    },
    {
      title: 'Weather Data Pipeline on AWS',
      description: 'Built a cloud-based data pipeline on AWS using S3, Lambda, and Athena to collect, process, and query weather data from public APIs.',
      tags: ['AWS', 'Lambda', 'S3'],
      metric: 'Automated',
    },
    {
      title: 'Financial Data Analysis in Excel',
      description: 'Created comprehensive financial analysis workbook with pivot tables, advanced formulas, and dynamic charts for budget tracking and forecasting.',
      tags: ['Excel', 'Pivot Tables', 'VLOOKUP'],
      metric: '12 Months Data',
    },
    {
      title: 'SQL Database Design Project',
      description: 'Designed and implemented a normalized database schema for a library management system. Wrote complex queries, stored procedures, and views.',
      tags: ['SQL', 'PostgreSQL', 'Database Design'],
      metric: '15+ Tables',
    },
  ];

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 bg-ink-light paper-texture overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-gold/60 text-sm tracking-[0.3em] uppercase">Portfolio</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mt-4 retro-text">
            Featured Projects
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card-3d group"
              data-hover="true"
            >
              <div className="card-3d-inner h-full bg-ink/80 vintage-border p-6 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs text-gold/50">#{String(i + 1).padStart(2, '0')}</span>
                  <span className="px-2 py-1 bg-gold/10 border border-gold/30 font-mono text-xs text-gold">
                    {project.metric}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-parchment mb-3 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>

                <p className="font-body text-sm text-parchment/60 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-burgundy/20 border border-burgundy/30 font-mono text-xs text-parchment/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gold/10 flex justify-between items-center">
                  <span className="font-mono text-xs text-parchment/40">Case Study</span>
                  <ExternalLink className="w-4 h-4 text-gold/50 group-hover:text-gold transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Education & Learning Journey Section
function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  const education = [
    {
      year: '2020 — 2024',
      role: 'Bachelor of Science in Computer Science',
      company: 'University of California',
      description: 'Focused on data structures, algorithms, database systems, and statistical analysis. Completed capstone project on data-driven decision making.',
    },
    {
      year: '2024',
      role: 'Google Data Analytics Certificate',
      company: 'Coursera / Google',
      description: 'Comprehensive program covering data cleaning, analysis, visualization, and SQL. Completed hands-on case studies with real-world datasets.',
    },
    {
      year: '2024',
      role: 'AWS Cloud Practitioner',
      company: 'Amazon Web Services',
      description: 'Certified in AWS cloud concepts, core services, security, architecture, pricing, and support for data analytics workloads.',
    },
    {
      year: '2023 — Present',
      role: 'Self-Directed Learning',
      company: 'Online Platforms',
      description: 'Continuous learning through Udemy, YouTube, and documentation. Built 10+ personal projects applying Python, SQL, Power BI, and cloud services.',
    },
  ];

  const certifications = [
    'Google Data Analytics Professional Certificate',
    'AWS Certified Cloud Practitioner',
    'Microsoft Power BI Data Analyst (PL-300)',
    'Python for Data Science — IBM',
    'SQL for Data Analysis — Udacity',
  ];

  return (
    <section id="experience" ref={ref} className="relative py-24 md:py-32 bg-ink overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-gold/60 text-sm tracking-[0.3em] uppercase">Background</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mt-4 retro-text">
            Education & Certifications
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline with scroll-driven line */}
          <div className="relative space-y-0">
            {/* Animated timeline line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gold/10">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-gold via-gold to-burgundy"
              />
            </div>

            {education.map((edu, i) => (
              <motion.div
                key={`${edu.year}-${i}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="relative pl-8 pb-8 last:pb-0 group"
              >
                <motion.div
                  className="absolute left-[-5px] top-0 w-3 h-3 bg-gold rounded-full border-2 border-ink"
                  whileInView={{ scale: [0, 1.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                />
                
                <div className="bg-ink-light/50 border border-gold/10 p-5 hover:border-gold/30 transition-all duration-300">
                  <span className="font-mono text-xs text-gold/70">{edu.year}</span>
                  <h3 className="font-display text-lg font-bold text-parchment mt-1">{edu.role}</h3>
                  <p className="font-mono text-sm text-gold/80">{edu.company}</p>
                  <p className="font-body text-sm text-parchment/60 mt-2">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="vintage-border-double p-8 bg-ink/80 h-full">
              <h3 className="font-display text-xl font-bold text-gold mb-6 flex items-center gap-3">
                <Award className="w-5 h-5" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-ink-light/50 border border-gold/10 hover:border-gold/30 transition-colors"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                    <span className="font-body text-sm text-parchment/80">{cert}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-mono text-xs text-gold/60 uppercase tracking-wider mb-4">Skill Proficiency</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={[
                    { tool: 'Python', score: 55 },
                    { tool: 'SQL', score: 58 },
                    { tool: 'Power BI', score: 54 },
                    { tool: 'Excel', score: 59 },
                    { tool: 'AWS', score: 51 },
                  ]}>
                    <XAxis dataKey="tool" tick={{ fill: '#e8e4dc', fontSize: 9, fontFamily: 'Space Mono' }} axisLine={{ stroke: 'rgba(91, 122, 153, 0.3)' }} />
                    <YAxis tick={{ fill: '#e8e4dc', fontSize: 9, fontFamily: 'Space Mono' }} axisLine={{ stroke: 'rgba(91, 122, 153, 0.3)' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0a0d12', border: '1px solid #5b7a99', borderRadius: 0, fontFamily: 'Space Mono', fontSize: 11 }} />
                    <Bar dataKey="score" fill="#5b7a99" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Parallax Quote Section
function QuoteSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={ref} className="relative py-32 bg-ink-mid overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-mid to-ink" />
      <motion.div style={{ y, opacity, scale }} className="relative max-w-4xl mx-auto px-6 text-center">
        <Sparkles className="w-8 h-8 text-gold/50 mx-auto mb-6" />
        <blockquote className="font-display text-2xl md:text-4xl text-parchment/90 italic leading-relaxed retro-text">
          "Every dataset has a story waiting to be told. I'm here to learn the language of data 
          and turn insights into impact — one project at a time."
        </blockquote>
        <div className="mt-8 font-mono text-sm text-gold/60">— Rojan Poudel</div>
      </motion.div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 bg-ink-light paper-texture overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-gold/60 text-sm tracking-[0.3em] uppercase">Connect</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mt-4 retro-text">
            Get In Touch
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <p className="font-body text-parchment/70 text-lg leading-relaxed">
              Ready to unlock the power of your data? Let's discuss how I can help 
              transform your analytics strategy and drive measurable results.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'chandrarojan21@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+977 9825396176' },
                { icon: MapPin, label: 'Location', value: 'urlabari-9, Morang, Nepal' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-ink/50 border border-gold/10 hover:border-gold/30 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <span className="font-mono text-xs text-gold/60 block">{item.label}</span>
                    <span className="font-body text-sm text-parchment/80">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="w-12 h-12 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-ink transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  data-hover="true"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Download CV Button */}
            <motion.a
              href="/Rojan_Poudel_CV.pdf"
              download="Rojan_Poudel_CV.pdf"
              className="w-full py-3 bg-burgundy/20 border-2 border-gold/30 text-gold font-mono font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-ink transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-hover="true"
            >
              <Download className="w-4 h-4" />
              Download My CV
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <form className="vintage-border p-8 bg-ink/80 space-y-5">
              <div>
                <label className="font-mono text-xs text-gold/70 uppercase tracking-wider block mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-ink-mid/80 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-parchment/30"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-gold/70 uppercase tracking-wider block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-ink-mid/80 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-parchment/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-gold/70 uppercase tracking-wider block mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-ink-mid/80 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors resize-none placeholder:text-parchment/30"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 bg-gold text-ink font-mono font-bold text-sm uppercase tracking-wider hover:bg-gold-light transition-all duration-300 glow-gold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-hover="true"
              >
                Send Message <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <footer ref={ref} className="relative bg-ink border-t border-gold/10 py-12">
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 text-center">
        <div className="font-display text-2xl text-gold mb-2 retro-text">R.C.P.</div>
        <p className="font-mono text-xs text-parchment/40 mb-4">
          © 2024 Rojan Chandra Poudel. Crafted with precision & passion.
        </p>
        <div className="section-divider mb-4" />
        <p className="font-mono text-xs text-parchment/30 italic">
          "Every line of code is a step forward. Every dataset is a new adventure."
        </p>
      </motion.div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="bg-ink min-h-screen overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <div className="grain-overlay" />
      <Navigation />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <StatsSection />
      <ProjectsSection />
      <QuoteSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

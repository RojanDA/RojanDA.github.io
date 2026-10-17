import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { BarChart3, Database, TrendingUp, Code, Brain, Shield, ChevronDown, Mail, Github, Linkedin, ExternalLink, Award, Briefcase, GraduationCap, MapPin, Phone } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

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
        scrolled ? 'bg-ink/95 backdrop-blur-md shadow-lg shadow-gold/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#hero"
          className="font-display text-2xl font-bold text-gold retro-text"
          whileHover={{ scale: 1.05 }}
          data-hover="true"
        >
          A.M.
        </motion.a>

        {/* Desktop Nav */}
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

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {/* Background elements */}
      <div className="absolute inset-0 retro-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink-light" />
      
      {/* Floating 3D Elements */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 md:left-20 w-20 h-20 md:w-32 md:h-32 border-2 border-gold/30 rounded-lg"
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        />
        <motion.div
          className="absolute top-40 right-10 md:right-32 w-16 h-16 md:w-24 md:h-24 border-2 border-burgundy/40 rounded-full"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 md:w-16 md:h-16 bg-gold/10 border border-gold/20"
          animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 right-1/4 w-8 h-8 md:w-12 md:h-12 bg-burgundy/20 rounded-full"
          animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="font-mono text-gold/70 text-sm md:text-base tracking-[0.3em] uppercase">
            ── Data Analyst & Visualization Expert ──
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-parchment mb-6 retro-text leading-tight"
        >
          Alex
          <span className="text-gold block md:inline"> Mercer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-body text-parchment/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Transforming complex datasets into compelling narratives. 
          I bridge the gap between raw data and strategic decisions with 
          precision analytics and elegant visualizations.
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
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-gold/50 text-gold font-mono font-bold text-sm uppercase tracking-wider hover:border-gold hover:bg-gold/10 transition-all duration-300"
            data-hover="true"
          >
            Get In Touch
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
            { number: '50+', label: 'Projects' },
            { number: '8+', label: 'Years Exp.' },
            { number: '30+', label: 'Clients' },
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-gold/50 w-6 h-6" />
      </motion.div>
    </section>
  );
}

// About Section
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 bg-ink-light paper-texture">
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
          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-3d"
          >
            <div className="relative vintage-border-double p-4 bg-ink/50">
              <div className="aspect-square bg-gradient-to-br from-burgundy/30 via-ink to-navy/30 rounded-sm flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-gold/50 bg-gradient-to-br from-gold/20 to-burgundy/20 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-gold">AM</span>
                  </div>
                  <div className="vintage-stamp mx-auto w-24 h-24 flex items-center justify-center mt-8">
                    <span className="font-mono text-xs text-burgundy font-bold text-center leading-tight">
                      EST.<br/>2016<br/>DATA<br/>ANALYST
                    </span>
                  </div>
                </div>
              </div>
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold/50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/50" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold/50" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold/50" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="font-body text-parchment/80 text-lg leading-relaxed">
              With over <span className="text-gold font-semibold">8 years of experience</span> in data analytics, 
              I specialize in transforming complex datasets into actionable business intelligence. 
              My approach combines statistical rigor with creative visualization.
            </p>
            <p className="font-body text-parchment/70 leading-relaxed">
              From Fortune 500 companies to innovative startups, I've helped organizations 
              unlock the power of their data. My expertise spans predictive modeling, 
              data engineering, and executive-level reporting.
            </p>
            <p className="font-body text-parchment/70 leading-relaxed">
              I believe that every dataset tells a story — my job is to find it, 
              refine it, and present it in a way that drives meaningful decisions.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: MapPin, text: 'San Francisco, CA' },
                { icon: Briefcase, text: 'Open to Work' },
                { icon: GraduationCap, text: 'M.S. Statistics' },
                { icon: Award, text: 'Top 1% Analyst' },
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

// Skills Section
function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const radarData = [
    { skill: 'Python', value: 95 },
    { skill: 'SQL', value: 92 },
    { skill: 'Tableau', value: 88 },
    { skill: 'R', value: 85 },
    { skill: 'ML/AI', value: 80 },
    { skill: 'Excel', value: 98 },
  ];

  const growthData = [
    { year: '2018', projects: 8, clients: 3 },
    { year: '2019', projects: 15, clients: 7 },
    { year: '2020', projects: 22, clients: 12 },
    { year: '2021', projects: 30, clients: 18 },
    { year: '2022', projects: 38, clients: 22 },
    { year: '2023', projects: 45, clients: 28 },
    { year: '2024', projects: 52, clients: 32 },
  ];

  const skills = [
    { name: 'Python & Pandas', level: 95, icon: Code },
    { name: 'SQL & Databases', level: 92, icon: Database },
    { name: 'Data Visualization', level: 90, icon: BarChart3 },
    { name: 'Machine Learning', level: 82, icon: Brain },
    { name: 'Statistical Analysis', level: 88, icon: TrendingUp },
    { name: 'Data Security', level: 85, icon: Shield },
  ];

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32 bg-ink">
      <div className="absolute inset-0 retro-grid opacity-20" />
      
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
                <div className="h-2 bg-ink-light rounded-full overflow-hidden border border-gold/10">
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

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="vintage-border p-6 bg-ink/80"
          >
            <h3 className="font-display text-lg text-gold text-center mb-4">Proficiency Map</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(201, 168, 76, 0.2)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#f5f0e8', fontSize: 10, fontFamily: 'Space Mono' }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="value" stroke="#c9a84c" fill="#c9a84c" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 vintage-border p-6 bg-ink/80"
        >
          <h3 className="font-display text-lg text-gold text-center mb-6">Growth Trajectory</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b1d2e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6b1d2e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" tick={{ fill: '#f5f0e8', fontSize: 10, fontFamily: 'Space Mono' }} axisLine={{ stroke: 'rgba(201, 168, 76, 0.3)' }} />
              <YAxis tick={{ fill: '#f5f0e8', fontSize: 10, fontFamily: 'Space Mono' }} axisLine={{ stroke: 'rgba(201, 168, 76, 0.3)' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1410', border: '1px solid #c9a84c', borderRadius: 0, fontFamily: 'Space Mono', fontSize: 12 }}
                labelStyle={{ color: '#c9a84c' }}
              />
              <Area type="monotone" dataKey="projects" stroke="#c9a84c" fill="url(#colorProjects)" strokeWidth={2} />
              <Area type="monotone" dataKey="clients" stroke="#6b1d2e" fill="url(#colorClients)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold rounded-full" />
              <span className="font-mono text-xs text-parchment/60">Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-burgundy rounded-full" />
              <span className="font-mono text-xs text-parchment/60">Clients</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      title: 'Revenue Forecasting Engine',
      description: 'Built a predictive ML model that improved revenue forecasting accuracy by 34% for a Fortune 500 retail company.',
      tags: ['Python', 'TensorFlow', 'Time Series'],
      color: 'from-burgundy/40 to-ink',
      metric: '+34% Accuracy',
    },
    {
      title: 'Real-Time Analytics Dashboard',
      description: 'Designed and deployed a real-time analytics platform processing 2M+ events daily with sub-second latency.',
      tags: ['Tableau', 'SQL', 'Apache Kafka'],
      color: 'from-navy/40 to-ink',
      metric: '2M+ Events/Day',
    },
    {
      title: 'Customer Churn Prediction',
      description: 'Developed a churn prediction system that reduced customer attrition by 22% through early intervention strategies.',
      tags: ['R', 'XGBoost', 'Feature Engineering'],
      color: 'from-forest/40 to-ink',
      metric: '-22% Churn',
    },
    {
      title: 'Supply Chain Optimization',
      description: 'Created an optimization model that reduced logistics costs by $2.4M annually through route and inventory optimization.',
      tags: ['Python', 'Linear Programming', 'GIS'],
      color: 'from-sepia/40 to-ink',
      metric: '$2.4M Saved',
    },
    {
      title: 'Healthcare Data Pipeline',
      description: 'Architected a HIPAA-compliant data pipeline processing patient analytics for a network of 50+ hospitals.',
      tags: ['Spark', 'AWS', 'HIPAA'],
      color: 'from-copper/40 to-ink',
      metric: '50+ Hospitals',
    },
    {
      title: 'Financial Risk Assessment',
      description: 'Built a risk assessment framework using Monte Carlo simulations for a leading investment firm.',
      tags: ['Python', 'Monte Carlo', 'Risk Models'],
      color: 'from-burgundy/30 to-navy/30',
      metric: '99.5% Confidence',
    },
  ];

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 bg-ink-light paper-texture">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
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
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card-3d group"
              data-hover="true"
            >
              <div className="card-3d-inner h-full bg-ink/80 vintage-border p-6 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500">
                {/* Metric Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs text-gold/50">#{String(i + 1).padStart(2, '0')}</span>
                  <span className="px-2 py-1 bg-gold/10 border border-gold/30 font-mono text-xs text-gold">
                    {project.metric}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-parchment mb-3 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-parchment/60 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-burgundy/20 border border-burgundy/30 font-mono text-xs text-parchment/70">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom decoration */}
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

// Experience Section
function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      year: '2022 — Present',
      role: 'Senior Data Analyst',
      company: 'TechVault Inc.',
      description: 'Leading a team of 5 analysts, driving data strategy and building enterprise analytics solutions.',
    },
    {
      year: '2019 — 2022',
      role: 'Data Analyst',
      company: 'DataStream Corp.',
      description: 'Developed predictive models and automated reporting systems for C-suite executives.',
    },
    {
      year: '2017 — 2019',
      role: 'Junior Data Analyst',
      company: 'InsightMetrics',
      description: 'Built dashboards and performed statistical analysis for marketing and sales teams.',
    },
    {
      year: '2016 — 2017',
      role: 'Data Intern',
      company: 'Quantum Analytics',
      description: 'Assisted in data cleaning, ETL processes, and basic visualization projects.',
    },
  ];

  const certifications = [
    'Google Data Analytics Professional Certificate',
    'AWS Certified Data Analytics — Specialty',
    'Tableau Desktop Specialist',
    'Microsoft Certified: Data Analyst Associate',
  ];

  return (
    <section id="experience" ref={ref} className="relative py-24 md:py-32 bg-ink">
      <div className="absolute inset-0 retro-grid opacity-15" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-gold/60 text-sm tracking-[0.3em] uppercase">Journey</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mt-4 retro-text">
            Experience
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="relative pl-8 pb-8 border-l-2 border-gold/30 last:border-l-0 last:pb-0 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-gold rounded-full border-2 border-ink group-hover:scale-150 transition-transform" />
                
                <div className="bg-ink-light/50 border border-gold/10 p-5 hover:border-gold/30 transition-all duration-300">
                  <span className="font-mono text-xs text-gold/70">{exp.year}</span>
                  <h3 className="font-display text-lg font-bold text-parchment mt-1">{exp.role}</h3>
                  <p className="font-mono text-sm text-gold/80">{exp.company}</p>
                  <p className="font-body text-sm text-parchment/60 mt-2">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
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
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-ink-light/50 border border-gold/10 hover:border-gold/30 transition-colors"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                    <span className="font-body text-sm text-parchment/80">{cert}</span>
                  </motion.div>
                ))}
              </div>

              {/* Bar chart for tool proficiency */}
              <div className="mt-8">
                <h4 className="font-mono text-xs text-gold/60 uppercase tracking-wider mb-4">Tool Proficiency</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={[
                    { tool: 'Python', score: 95 },
                    { tool: 'SQL', score: 92 },
                    { tool: 'Tableau', score: 88 },
                    { tool: 'R', score: 85 },
                    { tool: 'Spark', score: 78 },
                  ]}>
                    <XAxis dataKey="tool" tick={{ fill: '#f5f0e8', fontSize: 9, fontFamily: 'Space Mono' }} axisLine={{ stroke: 'rgba(201, 168, 76, 0.3)' }} />
                    <YAxis tick={{ fill: '#f5f0e8', fontSize: 9, fontFamily: 'Space Mono' }} axisLine={{ stroke: 'rgba(201, 168, 76, 0.3)' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1410', border: '1px solid #c9a84c', borderRadius: 0, fontFamily: 'Space Mono', fontSize: 11 }} />
                    <Bar dataKey="score" fill="#c9a84c" radius={[2, 2, 0, 0]} />
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

// Contact Section
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 bg-ink-light paper-texture">
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
          {/* Contact Info */}
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
                { icon: Mail, label: 'Email', value: 'alex@mercerdata.com' },
                { icon: Phone, label: 'Phone', value: '+1 (415) 555-0142' },
                { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
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

            {/* Social Links */}
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
          </motion.div>

          {/* Contact Form */}
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
                  className="w-full bg-ink-light/50 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-gold/70 uppercase tracking-wider block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-ink-light/50 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-gold/70 uppercase tracking-wider block mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-ink-light/50 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 bg-gold text-ink font-mono font-bold text-sm uppercase tracking-wider hover:bg-gold-light transition-all duration-300 glow-gold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-hover="true"
              >
                Send Message →
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
  return (
    <footer className="bg-ink border-t border-gold/10 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="font-display text-xl text-gold mb-2">A.M.</div>
        <p className="font-mono text-xs text-parchment/40">
          © 2024 Alex Mercer. Crafted with precision & passion.
        </p>
        <div className="section-divider mt-4 mb-4" />
        <p className="font-mono text-xs text-parchment/30">
          "In data we trust, in insights we believe."
        </p>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="bg-ink min-h-screen overflow-x-hidden">
      <CustomCursor />
      <div className="grain-overlay" />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

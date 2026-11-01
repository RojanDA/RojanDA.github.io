import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion';
import { BarChart3, Database, TrendingUp, Code, ChevronDown, Mail, Github, Briefcase, MapPin, Phone, ArrowRight, Sparkles, Download, Cloud, FileSpreadsheet, Server, X } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import { DataFlowLines, FloatingDataPoints, AnimatedBars, MorphingShape } from './components/MotionGraphics';
import rojanImg from './image/rojan.jpg';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metric: string;
  thumbnail: string;
  thumbnailAlt: string;
  overview: string;
  problem: string;
  approach: string[];
  results: { value: string; label: string }[];
  findings: string[];
  tools: string[];
  gallery: ProjectImage[];
  code?: { label: string; snippet: string };
};

const projects: Project[] = [
  {
    id: 'emissions',
    title: 'US Emissions Analytics Dashboard',
    subtitle: 'Databricks SQL · 2023 EPA data',
    description:
      'I built an interactive Databricks SQL dashboard using 2023 EPA emissions data. It covers county and state greenhouse gas emissions, calculates emissions per person, ranks the top 10 states and counties, and pulls a symbol map, scatter plot, pie chart, and bar chart into one view.',
    tags: ['Databricks SQL', 'Dashboards', 'Data Visualization', 'SQL'],
    metric: 'EPA 2023',
    thumbnail: '/emissions-dashboard.jpg',
    thumbnailAlt: 'Databricks US emissions dashboard with a symbol map, scatter, pie, and bar chart',
    overview:
      'This Databricks SQL dashboard turns county-level 2023 EPA emissions data into a single environmental view. You can compare total emissions, population, and emissions per person across states and counties.',
    problem:
      "Raw emissions totals always favor large, populous states. Without adjusting for population, it's hard to tell a big state apart from one with high emissions per person.",
    approach: [
      'Loaded the 2023 EPA county-level emissions dataset into emissions.default.emissions_data.',
      'Built four SQL datasets: location, emissions per person, total emissions by state, and top counties.',
      'Calculated emissions per person as total emissions divided by population, using null-safe division.',
      'Assembled a symbol map, emission-vs-population scatter, state share pie, and state bar chart in one dashboard.',
      'Ranked the top 10 states and counties by total emissions and by emissions per person.',
    ],
    results: [
      { value: '4', label: 'SQL datasets' },
      { value: '4', label: 'Visuals' },
      { value: 'Top 10', label: 'States & counties' },
      { value: '2023', label: 'EPA data' },
    ],
    findings: [
      'The symbol map shows where emissions concentrate geographically.',
      'The scatter makes the relationship between population and total emissions visible.',
      'The per-person measure separates high totals from high emissions intensity.',
      'The pie and bar charts rank the largest state contributors.',
    ],
    tools: ['Databricks SQL', 'Databricks Dashboards', 'SQL', 'Data Visualization', 'EPA data'],
    gallery: [
      {
        src: '/emissions-dashboard.jpg',
        alt: 'Databricks US emissions dashboard with a symbol map, scatter, pie, and bar chart',
        caption: 'US Emissions Analytics Dashboard, 2023 EPA data.',
      },
    ],
    code: {
      label: 'Emissions per person',
      snippet: `SELECT county_state_name,
       population,
       TRY_CAST(REPLACE(\`GHG emissions mtons CO2e\`, ',', '') AS DOUBLE)
         / NULLIF(population, 0) AS emissions_per_person
FROM emissions.default.emissions_data
ORDER BY emissions_per_person DESC;`,
    },
  },
  {
    id: 'idp',
    title: 'Document Intelligence Pipeline',
    subtitle: 'Databricks AI Functions · Unity Catalog',
    description:
      'I built a Databricks pipeline that reads invoices, purchase orders, and receipts with ai_parse_document, sorts each document with ai_classify, and pulls vendor, date, and total fields into Unity Catalog tables with ai_extract.',
    tags: ['Databricks', 'AI Functions', 'Unity Catalog', 'SQL'],
    metric: '3 Doc Types',
    thumbnail: '/projects/idp-pipeline.svg',
    thumbnailAlt: 'Document intelligence pipeline diagram with parse, classify, extract, and Unity Catalog stages',
    overview:
      'This document pipeline reads mixed finance documents, classifies each one, and extracts structured fields into Unity Catalog tables, all without leaving Databricks SQL.',
    problem:
      'Invoices, purchase orders, and receipts arrive as unstructured files. Finance teams need vendor, date, and total fields in tables, not PDFs that have to be re-keyed by hand.',
    approach: [
      "Read PDFs from a Unity Catalog volume with read_files('/Volumes/idp/default/idpproject').",
      'Parsed document content with ai_parse_document and flattened the extracted elements into text.',
      'Classified each document with ai_classify into Invoice, Purchase Order, Receipt, or Other.',
      'Extracted vendor, invoice number, dates, payment method, and total with ai_extract.',
      'Wrote governed output tables to idp.finance.invoices, purchase_orders, and receipts.',
    ],
    results: [
      { value: '3', label: 'Document types' },
      { value: '4', label: 'AI functions' },
      { value: '3', label: 'Unity Catalog tables' },
      { value: 'SQL', label: 'End-to-end' },
    ],
    findings: [
      'Classifying before extracting keeps each document type on its own schema.',
      'AI functions remove manual parsing while keeping the pipeline in SQL.',
      'Unity Catalog gives the output a governed home for downstream finance reporting.',
    ],
    tools: ['Databricks', 'AI Functions', 'Unity Catalog', 'SQL', 'Delta Lake'],
    gallery: [
      {
        src: '/projects/idp-pipeline.svg',
        alt: 'Document intelligence pipeline diagram with parse, classify, extract, and Unity Catalog stages',
        caption: 'Five-stage pipeline: read, parse, classify, extract, store.',
      },
    ],
    code: {
      label: 'Classify + extract',
      snippet: `CREATE OR REPLACE TABLE classify_data AS
SELECT *,
  ai_classify(doc_text, ARRAY('Invoice', 'Purchase Order', 'Receipt', 'Other')) AS doc_classification
FROM pretty_data;

CREATE OR REPLACE TABLE Invoice_data AS
SELECT *,
  ai_extract(doc_text, ARRAY('Vendor_name', 'Invoice_number', 'Invoice_date', 'Due_date', 'Payment_Method', 'Total')) AS extracted
FROM classify_data
WHERE doc_classification = 'Invoice';`,
    },
  },
  {
    id: 'hm',
    title: 'Retail Lakehouse 360: H&M Analytics',
    subtitle: 'PostgreSQL · Bronze → Silver → Gold',
    description:
      'I built a bronze, silver, and gold PostgreSQL pipeline over 31M+ H&M transaction rows. I designed the schemas, cleaned and deduplicated the raw data, documented the assumptions, and produced analytics-ready gold tables for customer and product analysis.',
    tags: ['PostgreSQL', 'SQL', 'Data Modeling', 'Data Quality'],
    metric: '31M+ Rows',
    thumbnail: '/projects/hm-pipeline.svg',
    thumbnailAlt: 'Retail Lakehouse 360 bronze, silver, and gold PostgreSQL architecture diagram',
    overview:
      'A bronze, silver, and gold PostgreSQL pipeline over 31M+ H&M transaction lines. Raw competition files are typed, validated, quarantined, and modeled into analytics-ready gold tables.',
    problem:
      'The H&M files mix transaction lines, customers, and articles at different grains. Rebuilding clean tables for every analysis is slow, and silent data-quality issues can distort every downstream metric.',
    approach: [
      'Profiled the three source files and documented grain, keys, and data-quality issues before analysis.',
      'Loaded raw files into a bronze layer, then trimmed IDs, cast dates and prices, and built silver tables.',
      'Created a quarantine table with explicit reject reasons and reconciled Bronze = Silver + rejected rows.',
      'Built gold fact and view layers: fact_sales, sales_enriched, customer_rfm, cohort_retention, category_sales, and monthly_channel_sales.',
      'Reconciled row counts and recorded sales across fact, category, and channel views.',
    ],
    results: [
      { value: '31M+', label: 'Transaction lines' },
      { value: '3', label: 'Source files' },
      { value: '5', label: 'Gold views' },
      { value: '3', label: 'Lakehouse layers' },
    ],
    findings: [
      'Transaction rows are purchase lines, not unique orders. The dataset has no order ID.',
      'Article and customer IDs must stay as text to preserve leading zeros and long identifiers.',
      'A quarantine table with reject reasons makes every excluded row auditable.',
      'Separating bronze, silver, and gold keeps cleaning rules reproducible.',
    ],
    tools: ['PostgreSQL', 'SQL', 'Data Modeling', 'Data Quality', 'Bronze/Silver/Gold'],
    gallery: [
      {
        src: '/projects/hm-pipeline.svg',
        alt: 'Retail Lakehouse 360 bronze, silver, and gold PostgreSQL architecture diagram',
        caption: 'Bronze → Silver → Gold architecture.',
      },
      {
        src: '/projects/hm-sql-silver.jpg',
        alt: 'PostgreSQL output from the silver transaction load',
        caption: 'Silver transaction load.',
      },
      {
        src: '/projects/hm-data-quality.jpg',
        alt: 'PostgreSQL data-quality check output',
        caption: 'Data-quality check.',
      },
    ],
    code: {
      label: 'Bronze → Silver',
      snippet: `CREATE TABLE silver.transactions AS
SELECT
    t_dat::date AS transaction_date,
    btrim(customer_id) AS customer_id,
    btrim(article_id) AS article_id,
    price::numeric AS recorded_price,
    sales_channel_id::integer AS sales_channel_id
FROM bronze.transactions_train;

-- Every Bronze row must land in Silver or quarantine
WITH counts AS (
    SELECT
        (SELECT COUNT(*) FROM bronze.transactions_train) AS bronze_rows,
        (SELECT COUNT(*) FROM silver.transactions) AS silver_rows,
        (SELECT COUNT(*) FROM silver.transactions_quarantine) AS rejected_rows
)
SELECT *,
       bronze_rows = silver_rows + rejected_rows AS counts_reconcile
FROM counts;`,
    },
  },
  {
    id: 'olist',
    title: 'Olist E-Commerce Analysis',
    subtitle: 'Excel · Power Query · Data Model',
    description:
      'I analyzed 99,441 orders across nine related datasets and built a 32-sheet workbook with six Data Model relationships. The work surfaced a 3% repeat-purchase rate, which points to a clear retention opportunity.',
    tags: ['Excel', 'Power Query', 'Data Model'],
    metric: '99K Orders',
    thumbnail: '/projects/olist-dashboard.png',
    thumbnailAlt: 'Olist executive dashboard with order, delivery, review, and category metrics',
    overview:
      'A descriptive analysis of 99,441 Olist marketplace orders, built in Excel with Power Query and a six-relationship Data Model.',
    problem:
      'Nine related CSVs at different grains make it easy to double-count orders, items, payments, and reviews. A careless one-to-many join can multiply every KPI.',
    approach: [
      "Profiled all nine source files and documented each table's grain and counting rule.",
      'Built Power Query cleaning layers and a six-relationship Excel Data Model.',
      'Added nine join-check queries so broken or ambiguous relationships surfaced before any KPI.',
      'Assembled a 32-sheet workbook and an executive dashboard covering orders, categories, sellers, payments, delivery, and reviews.',
      'Calculated on-time delivery and repeat-customer share over eligible delivered orders only.',
    ],
    results: [
      { value: '99,441', label: 'Orders' },
      { value: '91.9%', label: 'On-time delivery' },
      { value: '4.09/5', label: 'Average review' },
      { value: '3.0%', label: 'Repeat customers' },
    ],
    findings: [
      '88,644 of 96,470 eligible delivered orders arrived on or before the estimated date, or 91.9%.',
      'The average review score is 4.09 out of 5 across 99,224 records.',
      'Only 3.0% of delivered customers placed two or more distinct delivered orders.',
      'Grain discipline matters: payments and orders cannot share a row count without overstating both.',
    ],
    tools: ['Excel', 'Power Query', 'Data Model', 'PivotTables', 'PivotCharts'],
    gallery: [
      {
        src: '/projects/olist-dashboard.png',
        alt: 'Olist executive dashboard with order, delivery, review, and category metrics',
        caption: 'Olist executive dashboard, 2016 to 2018 recorded data.',
      },
    ],
  },
  {
    id: 'sales',
    title: 'Retail Sales Performance Dashboard',
    subtitle: 'Excel · PivotTables · Slicers',
    description:
      'An interactive dashboard covering $5.33M in revenue across 8,888 order lines. It traces $292.8K in profit losses to discounting above 40%.',
    tags: ['Excel', 'PivotTables', 'DAX'],
    metric: '$5.33M Sales',
    thumbnail: '/projects/sales-dashboard.png',
    thumbnailAlt: 'Retail sales dashboard with KPI cards, regional profit, category, and discount analysis',
    overview:
      'A four-year retail sales dashboard covering $5.33M in sales and 8,888 order lines, built to explain what drives profit and what destroys it.',
    problem:
      'Sales were growing, but profit was not keeping pace. The business needed to know which regions, categories, and discount levels were helping or hurting margin.',
    approach: [
      'Modeled 20 fields across order, customer, geography, and product dimensions.',
      'Built PivotTables and PivotCharts with category, region, segment, and year slicers.',
      'Added KPI cards, a Top-10 loss-making products table, and a written findings sheet.',
      'Tested discount bands against profit to isolate the loss driver.',
      'Compared regional and category profit contribution against sales contribution.',
    ],
    results: [
      { value: '$5.33M', label: 'Sales' },
      { value: '$836.6K', label: 'Profit' },
      { value: '15.70%', label: 'Margin' },
      { value: '$292.8K', label: 'Lost to >40% discounts' },
    ],
    findings: [
      'West earns 40.5% of profit from 32.3% of sales, at a 19.7% margin.',
      'Technology earns 75.9% of profit from 50.1% of sales, at a 23.8% margin.',
      'Central generates 23.7% of sales but only 10.4% of profit.',
      'Lines discounted above 40% lost $292.8K; Tables lose $84.1K overall but are profitable at 0% discount.',
    ],
    tools: ['Excel', 'PivotTables', 'PivotCharts', 'Slicers', 'Calculated Fields'],
    gallery: [
      {
        src: '/projects/sales-dashboard.png',
        alt: 'Retail sales dashboard with KPI cards, regional profit, category, and discount analysis',
        caption: 'Sales Performance Dashboard, 2018 to 2021.',
      },
    ],
  },
];

const featuredProject = projects[0];


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
      <DataFlowLines />
      <FloatingDataPoints />
      <AnimatedBars />
      <MorphingShape />
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
              ── Data Analyst ──
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
            I'm a data analyst with more than three years at Jaldimai Foods, where I turn order,
            customer, delivery, and partner data into everyday decisions. I build the reports,
            dashboards, and data models behind the business using SQL, Python, Excel, Power BI,
            Tableau, and Databricks.
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
              { number: '3+', label: 'Years Experience' },
              { number: '50+', label: 'Restaurant Partners' },
              { number: '31M+', label: 'Records Modeled' },
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

  const items = ['SQL', '●', 'PYTHON', '●', 'DATABRICKS', '●', 'SPARK', '●', 'UNITY CATALOG', '●', 'DELTA LAKE', '●', 'EXCEL', '●', 'POWER QUERY', '●', 'DAX', '●', 'POWER BI', '●', 'TABLEAU', '●', 'POSTGRESQL', '●', 'DATA ANALYSIS', '●', 'DASHBOARDS', '●'];

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
              I'm a <span className="text-gold font-semibold">data analyst</span> based in Urlabari,
              Morang. For the past three years I've worked at
              <span className="text-gold font-semibold"> Jaldimai Foods</span>, a food-delivery
              marketplace serving Damak and Birtamode. I've run the operation day to day and built
              the reporting systems that make it measurable.
            </p>
            <p className="font-body text-parchment/70 leading-relaxed">
              At Jaldimai I built a 12-tab Excel sales system, set the KPI definitions (orders,
              average order value, repeat customers, cancellations, delivery time, and partner
              ratings), and used order, customer, restaurant, and rider data to guide weekly
              decisions. I also work in SQL, Python, Power BI, Tableau, and Databricks so the
              analysis can be repeated and scaled.
            </p>
            <p className="font-body text-parchment/70 leading-relaxed">
              My project work includes Databricks dashboards, an AI document pipeline, a 31M+ row
              H&amp;M lakehouse, 99K Olist orders, and $5.3M in retail sales. I look for profit
              leaks, retention gaps, and delivery bottlenecks that are easy to miss, then put the
              findings in dashboards a team can actually use.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: MapPin, text: 'Urlabari, Morang, Nepal' },
                { icon: Briefcase, text: '3+ Years at Jaldimai Foods' },
                { icon: Database, text: 'Databricks · SQL · Python' },
                { icon: BarChart3, text: 'Power BI · Excel · Tableau' },
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
    { skill: 'Excel', value: 92 },
    { skill: 'SQL', value: 85 },
    { skill: 'Python', value: 78 },
    { skill: 'Databricks', value: 78 },
    { skill: 'Power BI', value: 80 },
    { skill: 'Operations', value: 90 },
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
    { name: 'SQL & PostgreSQL', level: 85, icon: Database },
    { name: 'Python & Pandas', level: 78, icon: Code },
    { name: 'Databricks · Spark · Delta Lake', level: 78, icon: Cloud },
    { name: 'Excel · Power Query · DAX', level: 92, icon: FileSpreadsheet },
    { name: 'Power BI', level: 80, icon: BarChart3 },
    { name: 'Tableau', level: 75, icon: TrendingUp },
    { name: 'Data Modeling & Data Quality', level: 82, icon: Server },
    { name: 'Operations & Vendor Management', level: 90, icon: Briefcase },
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
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 50, suffix: '+', label: 'Restaurant Partners' },
    { value: 31, suffix: 'M+', label: 'Records Modeled' },
    { value: 6, suffix: '', label: 'Analytics Projects' },
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
function ProjectsSection({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [50, -50]);

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
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card-3d group relative"
              data-hover="true"
            >
              <div className="card-3d-inner w-full h-full flex flex-col text-left bg-ink/80 vintage-border hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500">
                <div className="relative overflow-hidden border-b border-gold/10">
                  <img
                    src={project.thumbnail}
                    alt={project.thumbnailAlt}
                    loading="lazy"
                    className="w-full aspect-[16/10] object-cover object-top opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 right-3 px-2 py-1 bg-ink/85 backdrop-blur-sm border border-gold/30 font-mono text-[10px] text-gold">
                    {project.metric}
                  </span>
                  <span className="absolute top-3 left-3 px-2 py-1 bg-ink/70 border border-gold/10 font-mono text-[10px] text-parchment/60">
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gold/60 mb-2">{project.subtitle}</p>
                  <h3 className="font-display text-xl font-bold text-parchment mb-3 group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-parchment/60 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-burgundy/20 border border-burgundy/30 font-mono text-xs text-parchment/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-gold/10 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-gold/70 uppercase tracking-wider">View details</span>
                    <ArrowRight className="w-4 h-4 text-gold/60 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenProject(project)}
                aria-label={`View details for ${project.title}`}
                className="absolute inset-0 z-10 bg-transparent border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              />
            </motion.article>
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const bullets = [
    'Built and maintained a 12-tab Excel sales system (Sales Entry, Sales_Data, Order Summary, Dashboard, Reports, and branch, restaurant, menu, and price masters) that replaced scattered order logs with one auditable source of truth.',
    'Set and reported the core KPIs: orders, sales/GMV, average order value, items per order, repeat customers, cancellation rate, delivery time, on-time delivery, partner ratings, and delivery revenue.',
    'Used SQL and Python to analyze order, customer, restaurant, delivery, payment, and review data, looking for peak demand windows, high-delay zones, retention gaps, and underperforming partners. I kept metric definitions and anonymized datasets consistent so sales, platform revenue, and profit were reported separately.',
    'Produced weekly and monthly management reports and dashboards, automated recurring reporting, and ran data-quality checks for blanks, duplicates, price mismatches, and order-status exceptions.',
    'Ran daily marketplace operations across Damak and Birtamode, including order monitoring, rider allocation, restaurant partner support, delivery escalations, and end-of-day performance reviews. I also supported 50+ partners with onboarding, menu and pricing updates, and performance scorecards.',
    'Reviewed delivery pricing and rider coverage against the Rs 20/km, Rs 50 minimum, and Rs 300 maximum structure, then recommended zone and peak-hour adjustments.',
    'Turned customer feedback and late-night ordering patterns into menu, promotion, and service recommendations, and helped research demand and partner supply for the planned Itahari expansion.',
  ];

  const toolkit = [
    { label: 'Analysis', items: ['SQL', 'Python', 'Pandas', 'Excel', 'Power BI', 'Tableau'] },
    { label: 'Databricks', items: ['Databricks SQL', 'Spark', 'Unity Catalog', 'Delta Lake', 'AI Functions'] },
    { label: 'Operations', items: ['KPI reporting', 'Vendor management', 'Data quality', 'Process design'] },
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
          <span className="font-mono text-gold/60 text-sm tracking-[0.3em] uppercase">Career</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mt-4 retro-text">
            Experience
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="vintage-border bg-ink-light/70 p-6 md:p-8 h-full">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-gold/70">2023 - Present · 3 years</span>
                <span className="px-2 py-0.5 bg-gold/10 border border-gold/30 font-mono text-[10px] uppercase tracking-wider text-gold">
                  Current Role
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-parchment mt-3">Manager &amp; Data Analyst</h3>
              <p className="font-mono text-sm text-gold/80 mt-1">Jaldimai Foods, Damak &amp; Birtamode, Jhapa, Nepal</p>
              <p className="font-body text-sm text-parchment/60 mt-3">
                Dual role across marketplace operations and business intelligence for a food-delivery
                platform connecting customers, 50+ restaurant partners, and riders across two service areas.
              </p>

              <ul className="mt-5 space-y-2.5">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 bg-gold flex-shrink-0" />
                    <span className="font-body text-sm text-parchment/70 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { value: '12', label: 'Tab sales system' },
                  { value: '50+', label: 'Partners supported' },
                  { value: '2', label: 'Service areas' },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-ink/60 border border-gold/10 text-center">
                    <div className="font-display text-xl font-bold text-gold">{item.value}</div>
                    <div className="font-mono text-[10px] text-parchment/50 uppercase tracking-wider mt-1">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {['Excel · Power Query · DAX', 'SQL / PostgreSQL', 'Python · Pandas', 'Power BI', 'Tableau', 'Databricks'].map((tool) => (
                  <span key={tool} className="px-2 py-1 bg-burgundy/20 border border-burgundy/30 font-mono text-xs text-parchment/70">
                    {tool}
                  </span>
                ))}
              </div>


            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="vintage-border p-6 bg-ink/80">
              <h3 className="font-display text-lg font-bold text-gold mb-4 flex items-center gap-3">
                <Briefcase className="w-5 h-5" />
                What I Owned
              </h3>
              <div className="space-y-3 font-body text-sm text-parchment/70">
                <p><span className="text-gold/80">Reporting &amp; BI:</span> 12-tab Excel system, weekly and monthly dashboards, KPI definitions, and management reports.</p>
                <p><span className="text-gold/80">Analysis:</span> order, customer, partner, rider, payment, and review data in SQL and Python.</p>
                <p><span className="text-gold/80">Operations:</span> two service areas, rider allocation, partner support, and delivery escalations.</p>
                <p><span className="text-gold/80">Data quality:</span> duplicate, blank, price-mismatch, and order-status exception checks.</p>
                <p><span className="text-gold/80">Planning:</span> demand and partner-supply research for the planned Itahari expansion.</p>
              </div>
            </div>

            <div className="vintage-border-double p-6 bg-ink/80">
              <h3 className="font-display text-lg font-bold text-gold mb-5 flex items-center gap-3">
                <Database className="w-5 h-5" />
                Toolkit
              </h3>
              <div className="space-y-4">
                {toolkit.map((group) => (
                  <div key={group.label}>
                    <h4 className="font-mono text-[10px] text-gold/60 uppercase tracking-wider mb-2">{group.label}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="px-2 py-1 bg-ink-light/60 border border-gold/10 font-mono text-[10px] text-parchment/70">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Featured Databricks Project
function FeaturedProjectSection({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    'Modeled county-level GHG emissions, population, and geography from the 2023 EPA dataset in Databricks SQL.',
    'Built four purpose-built datasets: location, emissions per person, total emissions by state, and top counties.',
    'Combined a symbol map, emission-vs-population scatter, state share pie, and state bar chart in one dashboard.',
    'Ranked the top 10 states and counties by total emissions and by emissions per person.',
  ];

  return (
    <section id="featured" ref={ref} className="relative py-24 md:py-32 bg-ink overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-gold/60 text-sm tracking-[0.3em] uppercase">Featured Project</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment mt-4 retro-text">
            Databricks in Action
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="inline-block px-2 py-1 bg-gold/10 border border-gold/30 font-mono text-[10px] uppercase tracking-wider text-gold mb-4">
              Databricks SQL · EPA 2023
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-parchment leading-tight">
              US Emissions Analytics Dashboard
            </h3>
            <p className="font-body text-parchment/70 leading-relaxed mt-4">
              A single environmental view built on county-level EPA emissions data. Four SQL datasets
              feed a symbol map, scatter, pie, and bar chart so total emissions, population, and
              emissions per person can be compared without leaving the dashboard.
            </p>

            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-gold flex-shrink-0" />
                  <span className="font-body text-sm text-parchment/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-6">
              {['Databricks SQL', 'Symbol Map', 'Scatter', 'Pie', 'Bar Chart', 'Data Visualization'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-burgundy/20 border border-burgundy/30 font-mono text-xs text-parchment/70">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { value: '4', label: 'SQL datasets' },
                { value: '4', label: 'Visuals' },
                { value: 'Top 10', label: 'States & counties' },
              ].map((stat) => (
                <div key={stat.label} className="p-3 bg-ink-light/50 border border-gold/10 text-center">
                  <div className="font-display text-xl font-bold text-gold">{stat.value}</div>
                  <div className="font-mono text-[10px] text-parchment/50 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onOpenProject(featuredProject)}
              className="group mt-8 inline-flex items-center gap-3 px-5 py-3 bg-gold/10 border border-gold/40 font-mono text-xs uppercase tracking-wider text-gold hover:bg-gold/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              Open the full project
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="vintage-border bg-ink-light/60 p-2 md:p-3"
          >
            <img
              src="/emissions-dashboard.jpg"
              alt="Databricks US emissions dashboard showing a symbol map, emission-vs-population scatter, state share pie, and emissions bar chart"
              width={1058}
              height={674}
              className="w-full h-auto border border-gold/15"
              loading="lazy"
            />
            <figcaption className="font-mono text-[10px] text-parchment/40 text-center mt-3">
              US Emissions Analytics Dashboard · Databricks SQL · 2023 EPA data
            </figcaption>
          </motion.figure>
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
          "Good analysis doesn't stop at a chart. It finds the leak, explains the why,
          and gives the business a decision it can act on."
        </blockquote>
        <div className="mt-8 font-mono text-sm text-gold/60">Rojan Poudel</div>
      </motion.div>
    </section>
  );
}

// Contact form helpers
const CONTACT_EMAIL = 'chandrarojan21@gmail.com';
const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;
const CONTACT_RATE_KEY = 'portfolio-contact-submissions';
const CONTACT_RATE_WINDOW_MS = 60 * 60 * 1000;
const CONTACT_RATE_LIMIT = 3;
const CONTACT_MIN_FILL_MS = 3000;

type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

function cleanContactText(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function isValidContactEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function recentContactSubmissions() {
  try {
    const raw = window.localStorage.getItem(CONTACT_RATE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    const cutoff = Date.now() - CONTACT_RATE_WINDOW_MS;
    return parsed.filter((item): item is number => typeof item === 'number' && item > cutoff);
  } catch {
    return [];
  }
}

// Contact Section
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [feedback, setFeedback] = useState('');
  const formStartedAt = useRef(Date.now());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const cleanName = cleanContactText(name, 100);
    const cleanEmail = cleanContactText(email, 254).toLowerCase();
    const cleanMessage = cleanContactText(message, 2000);

    // Honeypot and time trap: real visitors leave these alone.
    if (company || Date.now() - formStartedAt.current < CONTACT_MIN_FILL_MS) {
      setStatus('error');
      setFeedback('Something went wrong. Please try again.');
      return;
    }
    if (cleanName.length < 2) {
      setStatus('error');
      setFeedback('Please enter your name.');
      return;
    }
    if (!isValidContactEmail(cleanEmail)) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }
    if (cleanMessage.length < 5) {
      setStatus('error');
      setFeedback('Please add a short message.');
      return;
    }

    const recent = recentContactSubmissions();
    if (recent.length >= CONTACT_RATE_LIMIT) {
      setStatus('error');
      setFeedback('Too many messages in a short time. Please try again later.');
      return;
    }

    setStatus('submitting');
    setFeedback('Sending your message...');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          _subject: `Portfolio message from ${cleanName}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);

      window.localStorage.setItem(CONTACT_RATE_KEY, JSON.stringify([...recent, Date.now()]));
      setName('');
      setEmail('');
      setMessage('');
      setCompany('');
      formStartedAt.current = Date.now();
      setStatus('success');
      setFeedback('Thanks. Your message has been sent.');
    } catch {
      setStatus('error');
      setFeedback(`I couldn't send that just now. Please email me at ${CONTACT_EMAIL}.`);
    }
  };

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
              I'm open to Data Analyst and BI roles where SQL, Python, Excel, Power BI,
              Tableau, and Databricks turn messy data into decisions. Let's talk about
              the problems you want solved.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'chandrarojan21@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+977 9825396176' },
                { icon: MapPin, label: 'Location', value: 'Urlabari-9, Morang, Nepal' },
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
                { icon: Github, label: 'GitHub', href: 'https://github.com/RojanDA' },
                { icon: Mail, label: 'Email', href: 'mailto:chandrarojan21@gmail.com' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={social.label}
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
            <form
              className="vintage-border p-8 bg-ink/80 space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label htmlFor="contact-name" className="font-mono text-xs text-gold/70 uppercase tracking-wider block mb-2">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full bg-ink-mid/80 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-parchment/30"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="font-mono text-xs text-gold/70 uppercase tracking-wider block mb-2">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-ink-mid/80 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-parchment/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="font-mono text-xs text-gold/70 uppercase tracking-wider block mb-2">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  minLength={5}
                  maxLength={2000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full bg-ink-mid/80 border border-gold/20 px-4 py-3 text-parchment font-body text-sm focus:border-gold focus:outline-none transition-colors resize-none placeholder:text-parchment/30"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>

              {feedback && (
                <p
                  id="contact-form-status"
                  role="status"
                  aria-live="polite"
                  className={`font-body text-xs leading-relaxed ${status === 'success' ? 'text-gold' : 'text-parchment/70'}`}
                >
                  {feedback}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 bg-gold text-ink font-mono font-bold text-sm uppercase tracking-wider hover:bg-gold-light transition-all duration-300 glow-gold flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                whileHover={status === 'submitting' ? undefined : { scale: 1.02 }}
                whileTap={status === 'submitting' ? undefined : { scale: 0.98 }}
                data-hover="true"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <p className="font-mono text-[10px] text-parchment/35 leading-relaxed">
                Your name, email, and message are sent over HTTPS and used only to reply.
              </p>
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
          © 2026 Rojan Chandra Poudel. Crafted with precision & passion.
        </p>
        <div className="section-divider mb-4" />
        <p className="font-mono text-xs text-parchment/30 italic">
          "The goal isn't more dashboards. It's fewer blind decisions."
        </p>
      </motion.div>
    </footer>
  );
}

// Project Detail Modal
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] overflow-y-auto p-3 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="fixed inset-0 bg-ink/90 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="relative mx-auto my-2 w-full max-w-5xl bg-ink-light vintage-border shadow-2xl shadow-black/60"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 p-2 bg-ink/80 border border-gold/30 text-parchment/70 hover:text-gold hover:border-gold/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/60">{project.subtitle}</span>
              <h2 id="project-modal-title" className="font-display text-3xl md:text-4xl font-bold text-parchment mt-3 pr-12">
                {project.title}
              </h2>
              <p className="font-body text-parchment/70 leading-relaxed mt-4">{project.overview}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {project.results.map((result) => (
                  <div key={result.label} className="p-3 bg-ink/60 border border-gold/10 text-center">
                    <div className="font-display text-xl font-bold text-gold">{result.value}</div>
                    <div className="font-mono text-[10px] text-parchment/50 uppercase tracking-wider mt-1">{result.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                {project.gallery.map((image) => (
                  <figure key={`${image.src}-${image.alt}`} className="vintage-border bg-ink/60 p-2">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-auto border border-gold/10"
                    />
                    {image.caption && (
                      <figcaption className="font-mono text-[10px] text-parchment/40 text-center mt-2">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="vintage-border p-5 bg-ink/60">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70 mb-3">The Problem</h3>
                  <p className="font-body text-sm text-parchment/70 leading-relaxed">{project.problem}</p>
                </div>
                <div className="vintage-border p-5 bg-ink/60">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70 mb-3">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="px-2 py-1 bg-burgundy/20 border border-burgundy/30 font-mono text-xs text-parchment/70">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70 mb-3">Approach</h3>
                <ul className="space-y-2.5">
                  {project.approach.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 bg-gold flex-shrink-0" />
                      <span className="font-body text-sm text-parchment/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70 mb-3">What the data showed</h3>
                <ul className="space-y-2.5">
                  {project.findings.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 bg-gold flex-shrink-0" />
                      <span className="font-body text-sm text-parchment/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.code && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-4 h-4 text-gold/60" />
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70">{project.code.label}</h3>
                  </div>
                  <pre className="overflow-x-auto bg-ink border border-gold/15 p-4 text-xs leading-relaxed">
                    <code className="font-mono text-parchment/70">{project.code.snippet}</code>
                  </pre>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gold/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-burgundy/20 border border-burgundy/30 font-mono text-xs text-parchment/70">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/40 font-mono text-xs uppercase tracking-wider text-gold hover:bg-gold/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                >
                  Close
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main App
export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
      <ProjectsSection onOpenProject={setActiveProject} />
      <FeaturedProjectSection onOpenProject={setActiveProject} />
      <ExperienceSection />
      <QuoteSection />
      <ContactSection />
      <Footer />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

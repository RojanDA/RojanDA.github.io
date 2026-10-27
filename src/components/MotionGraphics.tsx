import { motion } from 'framer-motion';

export function DataFlowLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5b7a99" stopOpacity="0" />
          <stop offset="50%" stopColor="#5b7a99" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5b7a99" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a2c3a" stopOpacity="0" />
          <stop offset="50%" stopColor="#4a2c3a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4a2c3a" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <motion.path
        d="M 0 200 Q 250 150, 500 200 T 1000 200"
        stroke="url(#flowGradient1)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 400 Q 200 350, 400 400 T 800 400 T 1000 400"
        stroke="url(#flowGradient2)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
      />
      <motion.path
        d="M 0 600 Q 300 650, 600 600 T 1000 600"
        stroke="url(#flowGradient1)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
      />
      <motion.path
        d="M 0 800 Q 150 750, 300 800 T 600 800 T 1000 800"
        stroke="url(#flowGradient2)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1.5 }}
      />
    </svg>
  );
}

export function FloatingDataPoints() {
  const points = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {points.map((point) => (
        <motion.div
          key={point.id}
          className="absolute w-1 h-1 bg-gold rounded-full"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            boxShadow: '0 0 6px rgba(91, 122, 153, 0.8)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: point.duration,
            repeat: Infinity,
            delay: point.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedBars() {
  const bars = Array.from({ length: 12 }, (_, i) => ({
    height: 20 + Math.random() * 60,
    delay: i * 0.1,
  }));

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-15 flex items-end justify-around px-4">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-2 bg-gradient-to-t from-gold to-gold-light"
          initial={{ height: 0 }}
          animate={{ height: `${bar.height}%` }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: bar.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function MorphingShape() {
  return (
    <motion.svg
      className="absolute top-10 right-10 w-32 h-32 pointer-events-none opacity-10"
      viewBox="0 0 100 100"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.path
        d="M50,10 L90,30 L90,70 L50,90 L10,70 L10,30 Z"
        stroke="#5b7a99"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        stroke="#4a2c3a"
        strokeWidth="1"
        fill="none"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

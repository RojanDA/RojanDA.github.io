import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const trailsRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      trailIdRef.current += 1;
      const newTrail = { x: e.clientX, y: e.clientY, id: trailIdRef.current };
      trailsRef.current = [...trailsRef.current.slice(-8), newTrail];
      setTrails([...trailsRef.current]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.dataset.hover) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="cursor-trail"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: index * 0.02 }}
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
          }}
        />
      ))}
      
      {/* Main cursor ring */}
      <motion.div
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        animate={{
          x: mousePos.x - (isHovering ? 20 : 10),
          y: mousePos.y - (isHovering ? 20 : 10),
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      {/* Cursor dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.2 }}
      />
    </>
  );
}

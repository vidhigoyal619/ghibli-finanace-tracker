
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Firefly: React.FC = () => {
  const fireflyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!fireflyRef.current) return;
    
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight * 1; // Keep in top 70% of screen
    
    gsap.set(fireflyRef.current, {
      x: randomX,
      y: randomY,
      scale: Math.random() * 0.5 + 0.5,
    });
    
    gsap.to(fireflyRef.current, {
      x: randomX + (Math.random() * 100 - 50),
      y: randomY + (Math.random() * 100 - 50),
      duration: Math.random() * 10 + 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);
  
  return <div ref={fireflyRef} className="firefly" />;
};

export default Firefly;

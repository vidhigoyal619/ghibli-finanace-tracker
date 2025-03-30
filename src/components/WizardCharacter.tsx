import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const WizardCharacter: React.FC = () => {
  const controls = useAnimationControls();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollAudioRef = useRef<HTMLAudioElement | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const animateZigZag = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(err => console.log("Audio play prevented:", err));
      }

      await controls.start({ x: 50, y: 0, opacity: 0, transition: { duration: 0.1 } });
      await controls.start({ x: window.innerWidth * 0.6, y: 20, opacity: 1, rotate: 5, transition: { duration: 0.8, ease: "easeOut" } });
      await controls.start({ x: window.innerWidth * 0.55, y: 80, rotate: -5, transition: { duration: 0.5 } });
      await controls.start({ x: window.innerWidth * 0.6, y: 40, rotate: 5, transition: { duration: 0.5 } });
      await controls.start({ x: window.innerWidth * 0.58, y: 60, rotate: 0, transition: { duration: 0.3 } });
    };

    const timer = setTimeout(() => {
      animateZigZag();
    }, 1500);

    return () => clearTimeout(timer);
  }, [controls]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (scrollAudioRef.current) {
        scrollAudioRef.current.volume = 0.2;
        scrollAudioRef.current.play().catch(err => console.log("Scroll sound prevented:", err));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/wizard-sound.mp3" preload="auto" />
      <audio ref={scrollAudioRef} src="/scroll-sound.mp3" preload="auto" />

      <motion.div 
        className="fixed z-30 w-35 h-35 md:w-44 md:h-44 select-none pointer-events-none top--10 left-40"
        animate={controls}
        initial={{ x: -100, opacity: 0 }}
        style={{ top: 100 + scrollY * 0.5 }}  // Moves with scroll
      >
        <div className="wizard-container">
          <img 
          src="/lovable-uploads/wizard3-unscreen.gif" 
          alt="Wizard character"
          className="w-full h-full object-contain wizard-image"
        />
        </div>
      </motion.div>
    </>
  );
};

export default WizardCharacter;

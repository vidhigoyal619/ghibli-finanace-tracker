import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import WizardCharacter from "@/components/WizardCharacter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access:", location.pathname);

    // Play error sound
    const errorSound = new Audio("/error-sound.mp3");
    errorSound.volume = 0.4;
    errorSound.play().catch((e) => console.log("Audio play prevented:", e));
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[url('/lovable-uploads/background.png')] bg-cover bg-center bg-fixed"
    >
      {/* Wizard moving from top-left to center */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-center"
        initial={{ x: "-100vw", y: "-100vh", opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <WizardCharacter />
      </motion.div>

      {/* Centered Content */}
      <div className="text-center text-ghibli-deepBrown">
        <motion.h1
          className="text-8xl font-bold mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-3xl font-extrabold mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The wizard couldn't find your page!
        </motion.p>

        {/* Return Home Button */}
        <motion.a
          href="/"
          className="px-6 py-3 bg-ghibli-richCoffee text-ghibli-softCream border-yellow-600 border-2 font-semibold rounded-lg shadow-md transition-all transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Return to Home
        </motion.a>
      </div>
    </div>
  );
};

export default NotFound;

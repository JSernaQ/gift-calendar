import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, Star, Gift, Heart, Key, Puzzle, Scroll } from "lucide-react";

const BirthdayGiftMystery = () => {
  const [started, setStarted] = useState(false);
  const [revealedClues, setRevealedClues] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const currentDate = new Date();
  const birthdayMonth = 12;

  const mysteryGifts = [
    { day: 1, clue: "Mis manos tejen historias, cada punto cuenta un secreto nuestro", gift: "Manualidad" },
    { day: 2, clue: "Invisible al ojo, pero presente en cada caricia, soy el recuerdo que persiste", gift: "Loción" },
    { day: 3, clue: "Guardo tus tesoros, tus sueños, tus secretos más cercanos", gift: "Billetera" },
    { day: 4, clue: "Capricho delicioso, amor entre pan y sabor", gift: "Hamburguesita" },
    { day: 5, clue: "Pétalos que hablan sin palabras, color y vida en un lenguaje silencioso", gift: "Flores" },
    { day: 6, clue: "Entre estrellas y naturaleza, un abrazo de aventura nos espera", gift: "Glamping" },
    { day: 7, clue: "Alquimista de penumbras, transmuto el vacío en geografía de claridad", gift: "Lampara" },
    { day: 8, clue: "Secreto de hilos que me envuelven, geografía móvil de mis pasos", gift: "Pantalon" },
    { day: 9, clue: "Deslumbrante velo que acaricia cada curva, susurro de seda que despierta la imaginación.", gift: "Body"},    
  ];

  const personalPhotos = [
    "/photo1.jpeg",
    "/photo2.jpeg",
    "/photo3.png",
    "/photo4.png",
  ];

  const HeartBackground = () => {
    const hearts = Array.from({ length: 150 }).map((_, index) => ({
      id: index,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 3,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, x: heart.x, y: heart.y, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1, 0.5, 0],
              y: [heart.y, heart.y - 200],
              opacity: [0, heart.opacity, heart.opacity, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute"
          >
            <Heart
              fill="pink"
              color="pink"
              className="text-pink-300"
              style={{ width: `${heart.size}px`, height: `${heart.size}px` }}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const PhotoExplosion = ({ images }) => {
    const explosionVariants = {
      hidden: { opacity: 0, scale: 0 },
      visible: (custom) => ({
        opacity: 1,
        scale: 1,
        x: custom.x,
        y: custom.y,
        rotate: custom.rotate,
        transition: {
          duration: 2.5,
          ease: "easeOut",
          delay: custom.delay,
          repeat: Infinity,
          repeatDelay: 0.5,
        },
      }),
    };

    const photoPositions = Array.from({ length: images.length }).map((_, index) => ({
      x: Math.random() * window.innerWidth - window.innerWidth / 100,
      y: Math.random() * window.innerHeight - window.innerHeight / 400,
      rotate: Math.random() * 300,
      delay: index * 0.3,
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Explosion photo ${index}`}
            className="absolute w-32 h-32 object-cover rounded-lg shadow-2xl"
            variants={explosionVariants}
            initial="hidden"
            animate="visible"
            custom={photoPositions[index]}
          />
        ))}
      </div>
    );
  };

  const handleStart = () => {
    setStarted(true);
    setShowConfetti(true);


    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };


  const handleClueReveal = (day) => {
    if (currentDate.getMonth() + 1 === birthdayMonth && currentDate.getDate() >= day) {
      setRevealedClues((prev) => ({ ...prev, [day]: !prev[day] }));
    }
  };

  return (
    <div className="relative min-h-screen bg-pink-50 p-4 sm:p-8">
      {!started ? (
        <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <HeartBackground />
          <PhotoExplosion images={personalPhotos} />

          {showConfetti && (
            <div className="fixed inset-0 flex items-center justify-center z-20">
              <h1 className="text-white">¡Felicidades!</h1>
            </div>
          )}

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="z-10 text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-md">Desafío de Amor</h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
              className="bg-white text-pink-500 px-8 py-4 rounded-full text-xl shadow-md flex items-center gap-3 justify-center mx-auto"
            >
              <Puzzle className="w-8 h-8 text-pink-400" />
              Comenzar Aventura
              <Scroll className="w-8 h-8 text-pink-500" />
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl text-center text-pink-600 mb-8 font-bold flex items-center justify-center gap-3 relative z-10"
          >
            <Key className="w-8 h-8 text-pink-400" />
            Calendario de Misterios
            <Sparkle className="w-8 h-8 text-yellow-400" />
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {mysteryGifts.map((mystery) => (
              <motion.div
                key={mystery.day}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: mystery.day * 0.2 }}
                className={`relative cursor-pointer ${currentDate.getMonth() + 1 === birthdayMonth && currentDate.getDate() >= mystery.day
                    ? "hover:scale-105"
                    : "opacity-50 cursor-not-allowed"
                  }`}
                onClick={() => handleClueReveal(mystery.day)}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-4 bg-pink-200 text-center">
                    <h2 className="text-2xl font-semibold text-pink-800">Día {mystery.day}</h2>
                  </div>

                  <AnimatePresence>
                    {revealedClues[mystery.day] ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="p-4"
                      >
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-pink-700 mb-4">Pista Revelada</h3>
                          <p className="italic text-gray-700">"{mystery.clue}"</p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        <span className="text-gray-400 text-center">
                          {currentDate.getMonth() + 1 === birthdayMonth && currentDate.getDate() >= mystery.day
                            ? "¡Descubre la pista!"
                            : "¡Espera a la fecha correspondiente!"}
                        </span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>

  );
};

export default BirthdayGiftMystery;

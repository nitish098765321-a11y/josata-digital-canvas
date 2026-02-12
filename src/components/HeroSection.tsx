import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

const slides = [
  { src: heroSlide1, alt: "Futuristic data center infrastructure" },
  { src: heroSlide2, alt: "Engineering team with holographic displays" },
  { src: heroSlide3, alt: "Cloud computing network visualization" },
  { src: heroSlide4, alt: "AI neural network visualization" },
];

const INTERVAL = 5000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 1.1 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-50%" : "50%", opacity: 0, scale: 1.05 }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-24">
      {/* Slideshow background */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            src={slides[current].src}
            alt={slides[current].alt}
            className="absolute inset-0 w-full h-full object-cover"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </AnimatePresence>

        {/* Ken Burns on the visible slide */}
        <motion.div
          key={`kb-${current}`}
          className="absolute inset-0"
          animate={{ scale: [1, 1.08], x: ["0%", "-1%"], y: ["0%", "-0.5%"] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />

        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-surface flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-surface flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Animated particles & streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 4) * 3,
              height: 4 + (i % 4) * 3,
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 13.7) % 100}%`,
              background: i % 3 === 0 ? 'hsl(var(--primary) / 0.6)' : i % 3 === 1 ? 'hsl(var(--glow-coral) / 0.5)' : 'hsl(var(--primary) / 0.3)',
            }}
            animate={{
              y: [0, -80 - i * 15, 0],
              x: [0, (i % 2 === 0 ? 40 : -40), 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{ duration: 6 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}
        {/* Diagonal light streaks */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            className="absolute h-px origin-left"
            style={{
              width: 200 + i * 60,
              top: `${20 + i * 20}%`,
              left: '-10%',
              background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)`,
              transform: `rotate(${-15 + i * 5}deg)`,
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.6, 0],
            }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 3 }}
          />
        ))}
        {/* Pulsing glow spots */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: 150 + i * 80,
              height: 150 + i * 80,
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
              background: i === 0 ? 'hsl(var(--primary) / 0.08)' : i === 1 ? 'hsl(var(--glow-coral) / 0.06)' : 'hsl(270 80% 70% / 0.05)',
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          />
        ))}
      </div>

      {/* Glowing line */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.div
          className="line-glow"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase font-display">
              IT Solutions & Digital Transformation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8 text-foreground"
          >
            Engineering{" "}
            <span className="gradient-text">Tomorrow's</span>
            <br />
            Technology
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            We architect intelligent systems and scalable digital platforms
            that drive your business into the future. From cloud-native
            solutions to AI-powered insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mt-6 mb-16"
          >
            <Link
              to="/contact"
              className="group gradient-primary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-border/60 text-foreground font-semibold text-lg backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <Play className="w-5 h-5 text-primary" />
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

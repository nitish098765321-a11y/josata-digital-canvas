import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Animated background image with Ken Burns effect */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Futuristic technology background"
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Glowing line at bottom */}
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
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="group gradient-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border/60 text-foreground font-semibold text-lg backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <Play className="w-5 h-5 text-primary" />
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-12 left-6 right-6 hidden md:flex"
        >
          <div className="container mx-auto flex items-center gap-12 text-sm">
            {[
              { value: "200+", label: "Projects Delivered" },
              { value: "50+", label: "Enterprise Clients" },
              { value: "15+", label: "Countries Served" },
              { value: "99.9%", label: "Uptime Guaranteed" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.15 }}
                className="flex items-center gap-4"
              >
                <span className="text-2xl font-display font-bold text-primary">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
                {i < 3 && <div className="h-8 w-px bg-border/50 ml-8" />}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

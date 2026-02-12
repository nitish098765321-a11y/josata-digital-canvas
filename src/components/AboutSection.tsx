import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Cpu, Cloud, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutTeamVideo from "@/assets/about-team-video.mp4";
import aboutInnovation from "@/assets/about-innovation.jpg";
import StatsChart from "./StatsChart";

const capabilities = [
  {
    icon: Cloud,
    title: "Cloud Architecture",
    desc: "Multi-cloud strategies tailored to your enterprise scale.",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    desc: "Intelligent automation that transforms data into decisions.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    desc: "Zero-trust frameworks protecting your digital assets.",
  },
  {
    icon: Lightbulb,
    title: "Digital Innovation",
    desc: "Future-forward engineering for competitive advantage.",
  },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="text-5xl md:text-6xl font-display font-bold text-primary"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}{suffix}
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="relative page-section overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase font-display">
              Who We Are
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Powering Digital
            <span className="gradient-text"> Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Josata Technologies bridges the gap between visionary strategy and
            flawless execution, delivering IT solutions that redefine what's possible.
          </p>
        </motion.div>

        {/* Two-column: Image + Text */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden glow-border">
              <video
                src={aboutTeamVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-80 object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden border-4 border-background shadow-2xl hidden md:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.img
                src={aboutInnovation}
                alt="Technology innovation"
                className="w-full h-full object-cover"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-3xl font-display font-bold text-foreground mb-6">
              A Decade of Transforming Enterprises
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded with a mission to democratize cutting-edge technology,
              Josata Technologies has grown into a trusted partner for Fortune 500
              companies and ambitious startups alike. We don't just build software —
              we engineer the future of your business.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of 500+ engineers, architects, and strategists combine deep
              technical expertise with industry insight to deliver solutions that
              matter. From reimagining legacy systems to architecting cloud-native
              platforms, we're with you at every step.
            </p>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              Discover Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Stats Chart + Stats Row side by side */}
        <div className="grid lg:grid-cols-5 gap-8 mb-24">
          <div className="lg:col-span-2">
            <StatsChart />
          </div>
          <div className="lg:col-span-3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: 200, suffix: "+", label: "Projects Delivered" },
                { value: 500, suffix: "+", label: "Team Members" },
                { value: 15, suffix: "+", label: "Global Offices" },
                { value: 98, suffix: "%", label: "Client Retention" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card text-center">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Capabilities grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-display font-bold text-foreground text-center mb-12">
            Our Core Capabilities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="group stat-card cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <cap.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">{cap.title}</h4>
                <p className="text-sm text-muted-foreground">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

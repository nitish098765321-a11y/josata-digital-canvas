import { motion } from "framer-motion";
import { Building2, Heart, Factory, ShoppingBag, Wifi, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const industries = [
  {
    id: "finance",
    icon: Building2,
    title: "Financial Services",
    description: "Digital banking, fraud detection, and regulatory compliance solutions that modernize financial operations while maintaining the highest security standards.",
  },
  {
    id: "healthcare",
    icon: Heart,
    title: "Healthcare",
    description: "HIPAA-compliant platforms, telemedicine systems, and AI-powered diagnostics that improve patient outcomes and streamline clinical workflows.",
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    description: "IoT-enabled smart factories, predictive maintenance, and supply chain optimization that drive operational efficiency at scale.",
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: "Retail & E-commerce",
    description: "Omnichannel experiences, personalized recommendations, and intelligent inventory management for the modern consumer.",
  },
  {
    id: "telecom",
    icon: Wifi,
    title: "Telecommunications",
    description: "Network optimization, 5G infrastructure, and customer experience platforms that keep you connected to what matters.",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education",
    description: "Learning management systems, EdTech platforms, and digital campuses that empower the next generation of learners.",
  },
];

export default function Industries() {
  return (
    <main className="pt-32">
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase font-display">Industries</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Deep Expertise Across <span className="gradient-text">Every Sector</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We understand the unique challenges and opportunities in your industry and deliver tailored solutions that drive measurable impact.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
              id={industry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group stat-card"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:gradient-primary transition-all duration-500">
                <industry.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">{industry.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{industry.description}</p>
              <Link
                to="/contact"
                className="text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all"
              >
                Explore Solutions →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

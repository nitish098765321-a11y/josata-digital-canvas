import { motion } from "framer-motion";
import { Cloud, Cpu, Shield, Code2, Database, Workflow, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const services = [
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Solutions",
    tagline: "Scalable. Resilient. Cloud-Native.",
    description:
      "Design, migrate, and manage multi-cloud and hybrid cloud environments. We leverage AWS, Azure, and GCP to build infrastructure that scales with your ambition.",
    features: ["Cloud Migration", "Infrastructure as Code", "Serverless Architecture", "Multi-Cloud Strategy"],
  },
  {
    id: "ai",
    icon: Cpu,
    title: "AI & Analytics",
    tagline: "Data-Driven Decisions at Scale.",
    description:
      "Harness the power of machine learning, predictive analytics, and generative AI to unlock insights hidden in your data and automate intelligent workflows.",
    features: ["Machine Learning", "Predictive Analytics", "NLP & Computer Vision", "AI Strategy Consulting"],
  },
  {
    id: "security",
    icon: Shield,
    title: "Cybersecurity",
    tagline: "Zero Trust. Total Confidence.",
    description:
      "Protect your digital assets with enterprise-grade security. From threat detection to compliance management, we build multi-layered defenses.",
    features: ["Zero Trust Architecture", "SOC as a Service", "Compliance & Governance", "Penetration Testing"],
  },
  {
    id: "engineering",
    icon: Code2,
    title: "Digital Engineering",
    tagline: "Code That Moves Business Forward.",
    description:
      "Build modern, scalable applications with microservices, API-first design, and DevOps practices that accelerate time-to-market.",
    features: ["Full-Stack Development", "Microservices", "DevOps & CI/CD", "API Development"],
  },
  {
    id: "data",
    icon: Database,
    title: "Data Engineering",
    tagline: "Transform Raw Data Into Assets.",
    description:
      "Build robust data pipelines, warehouses, and lakes that turn raw information into strategic business assets ready for analytics.",
    features: ["ETL Pipelines", "Data Warehousing", "Real-time Streaming", "Data Governance"],
  },
  {
    id: "consulting",
    icon: Workflow,
    title: "IT Consulting",
    tagline: "Strategy Meets Execution.",
    description:
      "Align technology investments with business goals. Our consultants help you navigate digital transformation with clarity and confidence.",
    features: ["Digital Strategy", "Technology Assessment", "Change Management", "Vendor Selection"],
  },
];

export default function Services() {
  return (
    <main className="pt-32">
      {/* Header */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase font-display">Our Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Technology Solutions That <span className="gradient-text">Deliver Results</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From cloud infrastructure to artificial intelligence, we provide end-to-end IT services
            designed to accelerate your digital transformation.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group stat-card flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                {service.tagline}
              </span>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground border border-border/50"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Link
                to="/contact"
                className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, TrendingUp, BookOpen, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import aboutInnovation from "@/assets/about-innovation.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const articles = [
  {
    category: "AI & Machine Learning",
    title: "The Enterprise AI Playbook: From Proof of Concept to Production",
    excerpt: "How leading companies are moving beyond experimentation to deploy AI at scale across their organizations.",
    date: "Feb 5, 2026",
    readTime: "8 min read",
    image: heroBg,
    featured: true,
  },
  {
    category: "Cloud Architecture",
    title: "Multi-Cloud Strategy: Avoiding Vendor Lock-in in 2026",
    excerpt: "A practical guide to designing cloud architectures that give you flexibility without sacrificing performance.",
    date: "Jan 28, 2026",
    readTime: "6 min read",
    image: aboutInnovation,
  },
  {
    category: "Cybersecurity",
    title: "Zero Trust in Practice: Lessons from the Field",
    excerpt: "Real-world implementation stories and the challenges enterprises face when adopting zero trust frameworks.",
    date: "Jan 20, 2026",
    readTime: "5 min read",
    image: heroBg,
  },
  {
    category: "Digital Engineering",
    title: "Microservices at Scale: When to Break the Monolith",
    excerpt: "Decision frameworks and anti-patterns to avoid when decomposing monolithic applications.",
    date: "Jan 12, 2026",
    readTime: "7 min read",
    image: aboutInnovation,
  },
];

const contentTypes = [
  { icon: BookOpen, label: "Articles", count: 48 },
  { icon: TrendingUp, label: "Case Studies", count: 24 },
  { icon: Mic, label: "Webinars", count: 12 },
];

export default function Insights() {
  return (
    <main className="pt-32">
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase font-display">Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Ideas That <span className="gradient-text">Shape the Future</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Expert perspectives on technology trends, digital strategy, and innovation.
          </p>
        </motion.div>

        {/* Content type tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mt-10"
        >
          {contentTypes.map((type) => (
            <button
              key={type.label}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-300 border border-border/50"
            >
              <type.icon className="w-4 h-4" />
              {type.label}
              <span className="text-xs text-primary font-semibold">{type.count}</span>
            </button>
          ))}
        </motion.div>
      </section>

      {/* Articles grid */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group stat-card overflow-hidden p-0 ${article.featured ? "md:col-span-2" : ""}`}
            >
              <div className={`${article.featured ? "md:flex" : ""}`}>
                <div className={`overflow-hidden ${article.featured ? "md:w-1/2" : ""}`}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${article.featured ? "h-64 md:h-full" : "h-48"}`}
                  />
                </div>
                <div className={`p-8 ${article.featured ? "md:w-1/2 flex flex-col justify-center" : ""}`}>
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h3 className={`font-display font-bold text-foreground mt-2 mb-3 ${article.featured ? "text-2xl" : "text-xl"}`}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  </div>
                  <Link
                    to="#"
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, ArrowRight, Cloud, Shield, Brain, Cpu, Building2, Heart, Factory, ShoppingCart } from "lucide-react";

const servicesDropdown = [
  {
    icon: Cloud,
    label: "Cloud Solutions",
    href: "/services#cloud",
    description: "Scalable cloud infrastructure and migration services",
  },
  {
    icon: Brain,
    label: "AI & Analytics",
    href: "/services#ai",
    description: "Machine learning models and data-driven insights",
  },
  {
    icon: Shield,
    label: "Cybersecurity",
    href: "/services#security",
    description: "End-to-end protection for your digital assets",
  },
  {
    icon: Cpu,
    label: "Digital Engineering",
    href: "/services#engineering",
    description: "Modern software development and platform engineering",
  },
];

const industriesDropdown = [
  {
    icon: Building2,
    label: "Financial Services",
    href: "/industries#finance",
    description: "Digital banking, fintech, and regulatory compliance",
  },
  {
    icon: Heart,
    label: "Healthcare",
    href: "/industries#healthcare",
    description: "Patient care platforms and health data analytics",
  },
  {
    icon: Factory,
    label: "Manufacturing",
    href: "/industries#manufacturing",
    description: "Smart factory solutions and IoT integration",
  },
  {
    icon: ShoppingCart,
    label: "Retail",
    href: "/industries#retail",
    description: "Omnichannel commerce and customer experience",
  },
];

const navItems = [
  { label: "Services", href: "/services", megaMenu: "services" },
  { label: "Industries", href: "/industries", megaMenu: "industries" },
  { label: "Insights", href: "/insights" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
    setMobileExpanded(null);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const getMegaContent = (key: string) => {
    if (key === "services") return { items: servicesDropdown, cta: { label: "View All Services", href: "/services" }, tagline: "Transform your business with cutting-edge technology" };
    if (key === "industries") return { items: industriesDropdown, cta: { label: "Explore Industries", href: "/industries" }, tagline: "Industry-specific solutions built for scale" };
    return null;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar */}
      <div className={`border-b border-border/20 transition-all duration-500 ${scrolled ? "hidden" : ""}`}>
        <div className="container mx-auto flex items-center justify-end gap-6 py-2 px-6 text-xs text-muted-foreground">
          <Link to="/contact" className="footer-link hover:text-primary transition-colors">Careers</Link>
          <Link to="/contact" className="footer-link hover:text-primary transition-colors">Partners</Link>
          <button className="footer-link hover:text-primary transition-colors flex items-center gap-1">
            <Search className="w-3 h-3" />
            Search
          </button>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`transition-all duration-500 ${
          scrolled
            ? "nav-glass border-b border-border/30 shadow-lg shadow-background/50"
            : "bg-background/40 backdrop-blur-md"
        }`}
        onMouseLeave={() => setActiveMega(null)}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-lg transition-transform duration-300 group-hover:scale-110">
              J
            </div>
            <span className="font-display text-xl font-semibold text-foreground tracking-tight">
              Josata
              <span className="text-primary"> Technologies</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.megaMenu ? setActiveMega(item.megaMenu) : setActiveMega(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-secondary/50 ${
                    activeMega === item.megaMenu
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {item.megaMenu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeMega === item.megaMenu ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:inline-flex gradient-primary px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors relative z-50"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Full-screen Mega Menu */}
        <AnimatePresence>
          {activeMega && getMegaContent(activeMega) && (
            <motion.div
              key={activeMega}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 right-0 top-full z-40 overflow-hidden border-b border-border/30"
              onMouseEnter={() => setActiveMega(activeMega)}
              onMouseLeave={() => setActiveMega(null)}
            >
              <div className="bg-background/95 backdrop-blur-2xl">
                <div className="container mx-auto px-6 py-10">
                  {/* Tagline */}
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-sm mb-8 uppercase tracking-widest font-display"
                  >
                    {getMegaContent(activeMega)!.tagline}
                  </motion.p>

                  {/* Items grid */}
                  <div className="grid grid-cols-4 gap-6">
                    {getMegaContent(activeMega)!.items.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i, duration: 0.3 }}
                        >
                          <Link
                            to={item.href}
                            className="group block p-6 rounded-xl border border-border/40 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full"
                          >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                              {item.label}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Learn more <ArrowRight className="w-3 h-3" />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Bottom CTA bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mt-8 pt-6 border-t border-border/30 flex items-center justify-between"
                  >
                    <p className="text-sm text-muted-foreground">
                      Need a custom solution?{" "}
                      <Link to="/contact" className="text-primary hover:underline">
                        Talk to our experts
                      </Link>
                    </p>
                    <Link
                      to={getMegaContent(activeMega)!.cta.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      {getMegaContent(activeMega)!.cta.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {item.megaMenu ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.megaMenu ? null : item.megaMenu!)}
                        className="flex items-center justify-between w-full px-4 py-4 text-xl font-display font-semibold text-foreground border-b border-border/30"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                            mobileExpanded === item.megaMenu ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.megaMenu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="py-2 pl-4 space-y-1">
                              {getMegaContent(item.megaMenu!)?.items.map((sub) => {
                                const Icon = sub.icon;
                                return (
                                  <Link
                                    key={sub.label}
                                    to={sub.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-secondary/50 transition-all"
                                  >
                                    <Icon className="w-5 h-5 text-primary/70" />
                                    <div>
                                      <div className="text-sm font-medium">{sub.label}</div>
                                      <div className="text-xs text-muted-foreground">{sub.description}</div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-4 text-xl font-display font-semibold text-foreground hover:text-primary transition-colors border-b border-border/30"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="block w-full text-center gradient-primary px-5 py-4 rounded-xl text-lg font-semibold text-primary-foreground"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

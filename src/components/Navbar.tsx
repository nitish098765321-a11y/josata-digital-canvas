import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const navItems = [
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Cloud Solutions", href: "/services#cloud" },
      { label: "AI & Analytics", href: "/services#ai" },
      { label: "Cybersecurity", href: "/services#security" },
      { label: "Digital Engineering", href: "/services#engineering" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    dropdown: [
      { label: "Financial Services", href: "/industries#finance" },
      { label: "Healthcare", href: "/industries#healthcare" },
      { label: "Manufacturing", href: "/industries#manufacturing" },
      { label: "Retail", href: "/industries#retail" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-glass border-b border-border/30 shadow-lg shadow-background/50" : "bg-transparent"
        }`}
      >
        {/* Top bar */}
        <div className="border-b border-border/20">
          <div className="container mx-auto flex items-center justify-end gap-6 py-2 px-6 text-xs text-muted-foreground">
            <Link to="/contact" className="footer-link">Careers</Link>
            <Link to="/contact" className="footer-link">Partners</Link>
            <button className="footer-link flex items-center gap-1">
              <Search className="w-3 h-3" />
              Search
            </button>
          </div>
        </div>

        {/* Main nav */}
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group">
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
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 rounded-lg hover:bg-secondary/50"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                  )}
                </Link>

                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-56 glass-surface rounded-xl p-2 shadow-xl shadow-background/50"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/50 rounded-lg transition-all duration-200"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
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
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-32 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={item.href}
                    className="block px-4 py-4 text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors border-b border-border/30"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
    </>
  );
}

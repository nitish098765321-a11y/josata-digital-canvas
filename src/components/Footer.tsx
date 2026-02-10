import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Globe,
} from "lucide-react";

const footerLinks = {
  services: [
    { label: "Cloud Solutions", href: "/services#cloud" },
    { label: "AI & Analytics", href: "/services#ai" },
    { label: "Cybersecurity", href: "/services#security" },
    { label: "Digital Engineering", href: "/services#engineering" },
    { label: "IT Consulting", href: "/services" },
  ],
  industries: [
    { label: "Financial Services", href: "/industries#finance" },
    { label: "Healthcare", href: "/industries#healthcare" },
    { label: "Manufacturing", href: "/industries#manufacturing" },
    { label: "Retail & E-commerce", href: "/industries#retail" },
    { label: "Telecommunications", href: "/industries" },
  ],
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Careers", href: "/contact" },
    { label: "Insights & Blog", href: "/insights" },
    { label: "Contact Us", href: "/contact" },
    { label: "Partners", href: "/contact" },
  ],
  resources: [
    { label: "Case Studies", href: "/insights" },
    { label: "Whitepapers", href: "/insights" },
    { label: "Webinars", href: "/insights" },
    { label: "Documentation", href: "/insights" },
    { label: "Support", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative border-t border-border/30">
      {/* Top glow line */}
      <div className="line-glow animate-pulse-glow" />

      {/* Newsletter strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border-b border-border/30"
      >
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">Stay Ahead of the Curve</h3>
            <p className="text-sm text-muted-foreground mt-1">Get the latest in technology insights delivered to your inbox.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button className="gradient-primary px-6 py-3 rounded-lg text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main footer */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2 md:col-span-3 lg:col-span-2"
          >
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-lg">
                J
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                Josata<span className="text-primary"> Technologies</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Engineering tomorrow's technology today. We deliver innovative IT solutions
              that drive digital transformation and sustainable growth.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:hello@josata.tech" className="flex items-center gap-2 text-sm footer-link">
                <Mail className="w-4 h-4 text-primary" />
                hello@josata.tech
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-sm footer-link">
                <Phone className="w-4 h-4 text-primary" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                San Francisco, CA
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            >
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm footer-link flex items-center gap-1 group">
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>© 2025 Josata Technologies. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="footer-link">Privacy Policy</Link>
            <Link to="/contact" className="footer-link">Terms of Service</Link>
            <Link to="/contact" className="footer-link">Cookie Settings</Link>
            <Link to="/contact" className="footer-link">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

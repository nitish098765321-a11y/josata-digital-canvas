import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const chartData = [
  { label: "Cloud", value: 85, color: "hsl(180, 85%, 55%)" },
  { label: "AI/ML", value: 72, color: "hsl(15, 90%, 58%)" },
  { label: "Security", value: 90, color: "hsl(260, 70%, 60%)" },
  { label: "DevOps", value: 68, color: "hsl(140, 70%, 50%)" },
  { label: "Data", value: 78, color: "hsl(45, 90%, 55%)" },
];

const ringData = [
  { label: "Client Satisfaction", value: 98, size: 180, color: "hsl(180, 85%, 55%)" },
  { label: "Project Success", value: 95, size: 140, color: "hsl(15, 90%, 58%)" },
  { label: "On-Time Delivery", value: 92, size: 100, color: "hsl(260, 70%, 60%)" },
];

function AnimatedBar({ item, index, isInView }: { item: typeof chartData[0]; index: number; isInView: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-16 text-right font-medium">{item.label}</span>
      <div className="flex-1 h-3 rounded-full bg-secondary/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: item.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.15, ease: "easeOut" }}
        />
      </div>
      <motion.span
        className="text-xs font-semibold text-foreground w-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8 + index * 0.15 }}
      >
        {item.value}%
      </motion.span>
    </div>
  );
}

function AnimatedRing({ item, index, isInView }: { item: typeof ringData[0]; index: number; isInView: boolean }) {
  const circumference = Math.PI * item.size;
  const strokeWidth = 8;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: item.size + 20, height: (item.size + 20) / 2 + 10 }}>
        <svg
          width={item.size + 20}
          height={(item.size + 20) / 2 + 10}
          viewBox={`0 0 ${item.size + 20} ${(item.size + 20) / 2 + 10}`}
        >
          {/* Background arc */}
          <path
            d={`M ${strokeWidth} ${(item.size + 20) / 2} A ${item.size / 2} ${item.size / 2} 0 0 1 ${item.size + 20 - strokeWidth} ${(item.size + 20) / 2}`}
            fill="none"
            stroke="hsl(220, 15%, 16%)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Animated arc */}
          <motion.path
            d={`M ${strokeWidth} ${(item.size + 20) / 2} A ${item.size / 2} ${item.size / 2} 0 0 1 ${item.size + 20 - strokeWidth} ${(item.size + 20) / 2}`}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: item.value / 100 } : { pathLength: 0 }}
            transition={{ duration: 1.5, delay: 0.3 + index * 0.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${item.color})` }}
          />
        </svg>
        <motion.span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-lg font-display font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 + index * 0.2 }}
        >
          {item.value}%
        </motion.span>
      </div>
      <span className="text-xs text-muted-foreground text-center">{item.label}</span>
    </div>
  );
}

export default function StatsChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    { value: "2.5B+", label: "Data Points Processed", sub: "Monthly" },
    { value: "99.97%", label: "System Uptime", sub: "Last 12 months" },
    { value: "340ms", label: "Avg Response Time", sub: "Across all services" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass-surface rounded-2xl p-6 glow-border"
    >
      {/* Rotating metric */}
      <div className="text-center mb-6 h-20 flex flex-col items-center justify-center">
        <motion.div
          key={activeMetric}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-3xl font-display font-bold gradient-text">{metrics[activeMetric].value}</span>
          <p className="text-sm text-foreground font-medium mt-1">{metrics[activeMetric].label}</p>
          <p className="text-xs text-muted-foreground">{metrics[activeMetric].sub}</p>
        </motion.div>
      </div>

      {/* Metric dots */}
      <div className="flex justify-center gap-2 mb-6">
        {metrics.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveMetric(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeMetric ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Bar chart */}
      <div className="space-y-3 mb-8">
        <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-display mb-3">
          Service Expertise
        </h4>
        {chartData.map((item, i) => (
          <AnimatedBar key={item.label} item={item} index={i} isInView={isInView} />
        ))}
      </div>

      {/* Ring gauges */}
      <div className="border-t border-border/30 pt-6">
        <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-display mb-4 text-center">
          Performance Metrics
        </h4>
        <div className="flex justify-around items-end">
          {ringData.map((item, i) => (
            <AnimatedRing key={item.label} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

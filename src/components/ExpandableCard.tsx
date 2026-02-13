import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, ReactNode } from "react";

interface ExpandableCardProps {
  children: ReactNode;
  expandedContent?: ReactNode;
  className?: string;
}

export default function ExpandableCard({ children, expandedContent, className = "" }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={`cursor-pointer ${className}`}
        onClick={() => setIsExpanded(true)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Expanded card */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="glass-surface glow-border rounded-2xl p-8 md:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto pointer-events-auto relative"
                initial={{ scale: 0.7, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {expandedContent || children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

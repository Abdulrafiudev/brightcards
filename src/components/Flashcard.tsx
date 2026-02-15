"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "accent";
  isFlipped?: boolean; // Controlled state
  onFlip?: () => void;
}

export function Flashcard({
  frontContent,
  backContent,
  className,
  color = "primary",
  isFlipped: controlledFlipped,
  onFlip,
}: FlashcardProps) {
  const [internalFlipped, setInternalFlipped] = useState(false);

  const isFlipped = controlledFlipped ?? internalFlipped;

  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    } else {
      setInternalFlipped(!internalFlipped);
    }
  };

  return (
    <motion.div
      className={cn(
        "perspective-1000 w-full aspect-[3/4] max-w-sm cursor-pointer group",
        className,
      )}
      onClick={handleFlip}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden w-full h-full rounded-[2rem] flex flex-col items-center justify-center p-8",
            "bg-neutral-card border border-neutral-muted/20 hover:border-neutral-muted/40 transition-colors shadow-sm",
          )}
        >
          <div className="absolute top-4 left-4 text-xs font-mono text-neutral-muted/50 tracking-widest">
            FACE_A
          </div>
          <div className="absolute top-4 right-4 text-neutral-muted/30">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
          {frontContent}

          {/* Visual Cue */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-6 text-sm text-neutral-muted/60 font-medium flex items-center gap-2"
          >
            Tap to flip 👆
          </motion.div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden w-full h-full rounded-[2rem] flex flex-col items-center justify-center p-8",
            "bg-neutral-card border border-neutral-muted/20",
          )}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute top-4 left-4 text-xs font-mono text-neutral-muted/50 tracking-widest">
            FACE_B
          </div>
          {backContent}
        </div>
      </motion.div>
    </motion.div>
  );
}

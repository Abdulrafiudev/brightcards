"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface QuizOptionProps {
  children: React.ReactNode;
  selected?: boolean;
  correct?: boolean;
  isSubmitted?: boolean;
  onClick?: () => void;
  className?: string;
}

export function QuizOption({
  children,
  selected,
  correct,
  isSubmitted,
  onClick,
  className,
}: QuizOptionProps) {
  let stateStyles =
    "bg-neutral-card border border-neutral-muted/20 hover:border-neutral-muted/50 hover:bg-neutral-card/80";

  let initialScale = 1;

  if (isSubmitted) {
    if (correct) {
      stateStyles =
        "bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]";
    } else if (selected && !correct) {
      stateStyles = "bg-red-500/10 border-red-500/50 text-red-400 opacity-80";
    } else {
      stateStyles =
        "bg-neutral-card/30 border-transparent opacity-30 blur-[1px]";
    }
  } else if (selected) {
    stateStyles =
      "bg-accent-purple/10 border-accent-purple shadow-[0_0_15px_rgba(159,122,234,0.3)] text-neutral-text";
    initialScale = 1.02;
  }

  return (
    <motion.button
      whileHover={
        !isSubmitted ? { scale: 1.03, backgroundColor: "#252525" } : {}
      }
      whileTap={!isSubmitted ? { scale: 0.98 } : {}}
      animate={{ scale: initialScale }}
      onClick={!isSubmitted ? onClick : undefined}
      className={cn(
        "w-full p-6 rounded-3xl text-lg font-medium text-neutral-text transition-all duration-300 flex items-center justify-center relative overflow-hidden",
        stateStyles,
        className,
      )}
    >
      {/* Subtle shine effect on hover? maybe later. keeping it clean for now. */}
      {children}
    </motion.button>
  );
}

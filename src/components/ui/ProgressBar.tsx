"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  color?: "primary" | "secondary" | "accent";
}

export function ProgressBar({
  current,
  total,
  className,
  color = "secondary",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div
      className={cn(
        "w-full max-w-md h-2 bg-neutral-card rounded-full overflow-hidden",
        className,
      )}
    >
      <motion.div
        className={cn("h-full rounded-full transition-colors", {
          "bg-white": color === "primary", // White progress bar
          "bg-neutral-muted": color === "secondary",
          "bg-accent-purple": color === "accent",
        })}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

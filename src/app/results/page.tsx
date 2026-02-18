"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/Button";
import { Confetti } from "@/components/Confetti";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { playSound } from "@/utils/audio";
import React from "react";

export default function ResultsPage() {
  const router = useRouter();
  const { score, totalCards, resetGame, addToHistory } = useGame(); // Fixed: Destructure addToHistory here

  const percentage = Math.round((score / totalCards) * 100);
  const isWinner = percentage >= 80;

  // Effect to save history once on mount
  React.useEffect(() => {
    if (addToHistory) {
      addToHistory(score, totalCards);
    }

    // Play result sound
    const isSuccess = Math.round((score / totalCards) * 100) >= 80;
    playSound(isSuccess ? "success" : "keep-trying");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleReplay = () => {
    resetGame();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-neutral-background flex flex-col items-center justify-center p-6 relative overflow-hidden text-neutral-text">
      {isWinner && <Confetti />}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-lg bg-neutral-card rounded-[2.5rem] border border-neutral-muted/20 p-10 text-center relative z-10 shadow-lg"
      >
        <div className="text-7xl mb-6">{isWinner ? "🏆" : "📈"}</div>

        <h2 className="text-3xl font-heading font-bold text-neutral-text mb-2">
          {isWinner ? "Outstanding!" : "Session Complete"}
        </h2>

        <p className="text-lg text-neutral-muted mb-10">
          {isWinner
            ? "You've mastered this set."
            : "Keep training to improve your score."}
        </p>

        <div className="flex justify-center mb-10">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-neutral-muted/10"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * percentage) / 100}
                className={isWinner ? "text-green-500" : "text-accent-purple"}
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * percentage) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold font-mono">{score}</span>
              <span className="text-xs text-neutral-muted uppercase tracking-wider">
                of {totalCards}
              </span>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleReplay}
          className="w-full text-lg py-6 rounded-lg bg-neutral-text text-neutral-background hover:bg-white transition-all shadow-none"
        >
          Start New Session
        </Button>
      </motion.div>
    </div>
  );
}

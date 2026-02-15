"use client";

import { Button } from "@/components/ui/Button";
import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { setPhase, resetGame } = useGame();

  const handleStart = () => {
    resetGame();
    setPhase("learning");
    router.push("/learn");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden relative bg-neutral-background text-neutral-text selection:bg-accent-purple selection:text-white">
      {/* Background Subtle Grid - keep it extremely subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-4xl w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left flex flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-mono tracking-widest uppercase border border-accent-purple/20">
              Animal Game
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-neutral-text mb-6 leading-tight tracking-tight">
            Fun Animal <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-text to-neutral-muted">
              Quiz for Kids.
            </span>
          </h1>

          <p className="text-lg text-neutral-muted font-body mb-8 max-w-md leading-relaxed">
            Ready to test your knowledge? Guess the animal, earn high scores,
            and become a wildlife expert!
          </p>

          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={handleStart}
              className="text-lg px-8 py-6 rounded-lg font-medium bg-neutral-text text-neutral-background hover:bg-white"
            >
              Start Game
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/stats")}
              className="text-lg px-8 py-6 rounded-lg font-medium border-neutral-muted/30 text-neutral-text hover:bg-neutral-card"
            >
              My Scores
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Hero Animation */}
        <div className="relative h-[400px] flex items-center justify-center perspective-1000">
          {/* Floating Cards Animation - Bouncy & Continuous */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="w-64 h-80 bg-neutral-card rounded-2xl border border-neutral-muted/20 absolute z-20 shadow-2xl flex items-center justify-center"
          >
            <div className="text-8xl">🐼</div>
            <div className="absolute bottom-6 text-sm font-mono text-neutral-muted tracking-widest">
              PANDA
            </div>
          </motion.div>

          {/* Background Cards with staggered bounce */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotateZ: -5,
              translateX: -40,
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="w-64 h-80 bg-neutral-card/50 rounded-2xl border border-neutral-muted/10 absolute z-10 blur-[1px]"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateZ: 5,
              translateX: 40,
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-64 h-80 bg-neutral-card/30 rounded-2xl border border-neutral-muted/5 absolute z-0 blur-[2px]"
          />
        </div>
      </div>
    </main>
  );
}

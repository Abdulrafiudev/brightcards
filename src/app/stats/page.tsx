"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function StatsPage() {
  const router = useRouter();
  const { history } = useGame();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-background flex flex-col items-center p-6 text-neutral-text relative overflow-hidden">
      <header className="w-full max-w-2xl flex items-center justify-between mt-8 mb-12 ">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="text-neutral-muted hover:text-white"
        >
          ← Back to Home
        </Button>
        <h1 className="text-xl font-heading font-bold text-neutral-text">
          Your Progress
        </h1>
      </header>

      <main className="w-full max-w-2xl flex flex-col gap-6">
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-neutral-card rounded-2xl border border-neutral-muted/20"
          >
            <h2 className="text-xl font-body text-neutral-text mb-2">
              No stats yet!
            </h2>
            <p className="text-neutral-muted mb-6">
              Complete a quiz to see your scores here.
            </p>
            <Button onClick={() => router.push("/")} size="md">
              Start Learning
            </Button>
          </motion.div>
        ) : (
          <>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-neutral-card p-6 rounded-3xl border border-neutral-muted/10 flex items-center justify-between hover:border-neutral-muted/30 transition-colors"
              >
                <div>
                  <div className="text-sm text-neutral-muted font-mono mb-1">
                    {formatDate(entry.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    {entry.score / entry.total >= 0.8 ? (
                      <span title="Great Job!">🌟</span>
                    ) : (
                      <span>📝</span>
                    )}
                    <span className="font-body font-medium">Animal Quiz</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-neutral-text">
                    {entry.score}
                    <span className="text-base text-neutral-muted">
                      /{entry.total}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-muted uppercase tracking-wider">
                    Score
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

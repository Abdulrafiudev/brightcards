"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { Flashcard } from "@/components/Flashcard";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { animalsData } from "@/data/content";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LearnPage() {
  const router = useRouter();
  const { currentCardIndex, nextCard, prevCard, totalCards } = useGame() as any;

  const currentCard = animalsData[currentCardIndex];
  const isLastCard = currentCardIndex === totalCards - 1;
  const isFirstCard = currentCardIndex === 0;

  const handleNext = () => {
    if (isLastCard) {
      router.push("/quiz");
    } else {
      nextCard();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-background flex flex-col items-center justify-center p-6 relative overflow-hidden text-neutral-text">
      {/* Background Decor Removed for Minimal Theme */}

      <header className="absolute top-8 w-full max-w-4xl flex justify-between items-center px-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="text-neutral-muted hover:text-neutral-text"
        >
          <span className="mr-2">←</span> Exit
        </Button>
        <div className="w-1/3 max-w-xs">
          <div className="text-xs text-right mb-2 font-mono text-neutral-muted">
            {currentCardIndex + 1} / {totalCards}
          </div>
          <ProgressBar
            current={currentCardIndex + 1}
            total={totalCards}
            color="primary"
            className="h-1 bg-neutral-card"
          />
        </div>
      </header>

      <main className="flex flex-col items-center w-full max-w-xl mt-12">
        <h2 className="text-xl font-body text-neutral-muted mb-8 text-center uppercase tracking-widest">
          Learning Session
        </h2>

        <div className="w-full relative h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center"
            >
              <Flashcard
                frontContent={
                  <div className="text-[100px] leading-none select-none opacity-90">
                    {currentCard.front}
                  </div>
                }
                backContent={
                  <div className="text-center">
                    <div className="text-5xl mb-6 opacity-80">
                      {currentCard.front}
                    </div>
                    <h3 className="text-3xl font-heading text-neutral-text mb-3">
                      {currentCard.back}
                    </h3>
                    <p className="text-lg text-neutral-muted leading-relaxed">
                      {currentCard.description}
                    </p>
                  </div>
                }
                color={currentCard.color}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-4 mt-8 w-full max-w-sm justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={prevCard}
            disabled={isFirstCard}
            className="rounded-lg w-12 h-12 border-neutral-muted/20"
          >
            <ArrowLeft size={20} />
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            className="flex-1 text-base rounded-lg h-12 bg-neutral-text text-neutral-background hover:bg-white"
          >
            {isLastCard ? (
              <span className="flex items-center justify-center">
                Take Quiz <Play size={16} className="ml-2 fill-current" />
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Next Card <ArrowRight size={16} className="ml-2" />
              </span>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}

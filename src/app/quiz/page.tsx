"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { animalsData, FlashcardData } from "@/data/content";
import { QuizOption } from "@/components/QuizOption";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

function simpleShuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function QuizPage() {
  const router = useRouter();
  const { submitAnswer } = useGame();

  // Local state for quiz flow
  const [questions, setQuestions] = useState<FlashcardData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState<FlashcardData[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Initialize questions on mount
  useEffect(() => {
    // Shuffle animals to create random question order
    const shuffled = simpleShuffle(animalsData);
    setQuestions(shuffled);
  }, []);

  // Generate options when current question changes
  useEffect(() => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];

    // Get 2 wrong answers
    const otherAnimals = animalsData.filter((a) => a.id !== currentQuestion.id);
    const wrongOptions = simpleShuffle(otherAnimals).slice(0, 2);

    // Combine and shuffle
    const allOptions = simpleShuffle([currentQuestion, ...wrongOptions]);
    setOptions(allOptions);

    // Reset state for new question
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [currentQuestionIndex, questions]);

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedOptionId === currentQuestion.id;

    setIsCorrect(correct);
    setIsSubmitted(true);
    submitAnswer(currentQuestion.id, correct);

    // Auto advance or wait for user?
    // Let's wait for user to click "Next" to read feedback.
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      router.push("/results");
    }
  };

  if (questions.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Quiz...
      </div>
    );

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-neutral-background flex flex-col items-center p-6 text-neutral-text">
      {/* Header with Progress */}
      <header className="w-full max-w-2xl flex items-center gap-6 mt-8 mb-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="text-neutral-muted hover:text-white"
        >
          Exit
        </Button>
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
          className="flex-1 h-1 bg-neutral-card"
          color="accent"
        />
        <span className="font-mono text-sm text-neutral-muted">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
      </header>

      <main className="w-full max-w-3xl flex flex-col items-center">
        {/* Question Area */}
        <div className="text-center mb-12 w-full">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-body text-neutral-muted mb-6"
          >
            Which animal is...
          </motion.h2>

          <motion.div
            key={currentQuestion.id} // Re-animate on new question
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-neutral-card px-10 py-8 rounded-2xl inline-block border border-neutral-muted/20"
          >
            <span className="text-3xl md:text-4xl font-heading font-bold text-neutral-text">
              "{currentQuestion.description}"
            </span>
          </motion.div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <QuizOption
                selected={selectedOptionId === option.id}
                correct={option.id === currentQuestion.id}
                isSubmitted={isSubmitted}
                onClick={() => handleOptionSelect(option.id)}
                className="h-48 flex flex-col gap-4"
              >
                <span className="text-6xl filter drop-shadow-lg">
                  {option.front}
                </span>
                <span className="text-xl font-medium tracking-wide">
                  {option.back}
                </span>
              </QuizOption>
            </motion.div>
          ))}
        </div>

        {/* Feedback / Controls */}
        <div className="h-24 w-full flex justify-center items-center">
          <div className="w-full max-w-xs relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="check-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <Button
                    size="lg"
                    onClick={checkAnswer}
                    disabled={!selectedOptionId}
                    className="w-full rounded-lg text-lg bg-neutral-text text-neutral-background hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Answer
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <div
                    className={`text-xl font-heading mb-4 flex items-center gap-2 ${isCorrect ? "text-green-400" : "text-red-400"}`}
                  >
                    {isCorrect ? "Correct! 🎉" : "Not quite..."}
                  </div>
                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="w-full rounded-lg text-lg border border-neutral-muted bg-neutral-text text-neutral-background hover:bg-neutral-card hover:text-neutral-text"
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "Next Question →"
                      : "See Results"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

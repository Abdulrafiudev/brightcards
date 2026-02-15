"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { animalsData, FlashcardData } from "@/data/content";

type GamePhase = "welcome" | "learning" | "quiz" | "results";

interface GameState {
  phase: GamePhase;
  currentCardIndex: number;
  score: number;
  answers: Record<string, boolean>; // questionId -> isCorrect
}

interface GameHistory {
  date: string;
  score: number;
  total: number;
}

interface GameContextType extends GameState {
  setPhase: (phase: GamePhase) => void;
  nextCard: () => void;
  prevCard: () => void;
  submitAnswer: (questionId: string, isCorrect: boolean) => void;
  resetGame: () => void;
  totalCards: number;
  history: GameHistory[];
  addToHistory: (score: number, total: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<GamePhase>("welcome");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<GameHistory[]>([]);

  // Load history from local storage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("brightcards_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const totalCards = animalsData.length;

  const nextCard = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const submitAnswer = (questionId: string, isCorrect: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: isCorrect }));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const addToHistory = (score: number, total: number) => {
    const newEntry = { date: new Date().toISOString(), score, total };
    const newHistory = [newEntry, ...history];
    setHistory(newHistory);
    localStorage.setItem("brightcards_history", JSON.stringify(newHistory));
  };

  const resetGame = () => {
    setPhase("welcome");
    setCurrentCardIndex(0);
    setScore(0);
    setAnswers({});
  };

  return (
    <GameContext.Provider
      value={{
        phase,
        currentCardIndex,
        score,
        answers,
        setPhase,
        nextCard,
        prevCard,
        submitAnswer,
        resetGame,
        totalCards,
        history,
        addToHistory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

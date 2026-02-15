"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const colors = ["#5EC6F3", "#FFD65A", "#FF8C82", "#A8E6CF", "#C8B6FF"];

export function Confetti() {
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    // Generate 50 pieces
    setPieces(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          initial={{
            top: "-10%",
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            rotate: 0,
          }}
          animate={{
            top: "110%",
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            x: (Math.random() - 0.5) * 200, // drift
          }}
          transition={{
            duration: Math.random() * 2 + 3, // 3-5s
            ease: "linear",
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

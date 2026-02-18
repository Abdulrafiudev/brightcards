export type SoundType = "correct" | "incorrect" | "success" | "keep-trying";

export const playSound = (type: SoundType) => {
  const audio = new Audio(`/sounds/${type}.mp3`);
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};

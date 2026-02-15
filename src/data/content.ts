export interface FlashcardData {
  id: string;
  front: string; // Emoji or Image URL
  back: string; // Name
  description: string;
  color: "primary" | "secondary" | "accent";
}

export const animalsData: FlashcardData[] = [
  {
    id: "1",
    front: "🦁",
    back: "Lion",
    description: "The King of the Jungle!",
    color: "primary",
  },
  {
    id: "2",
    front: "🐘",
    back: "Elephant",
    description: "I have a long trunk!",
    color: "secondary",
  },
  {
    id: "3",
    front: "🦒",
    back: "Giraffe",
    description: "I am very tall!",
    color: "accent",
  },
  {
    id: "4",
    front: "🐸",
    back: "Frog",
    description: "Ribbit! I love to jump.",
    color: "primary",
  },
  {
    id: "5",
    front: "🐧",
    back: "Penguin",
    description: "I waddle on ice!",
    color: "secondary",
  },
  {
    id: "6",
    front: "🐯",
    back: "Tiger",
    description: "I have stripes!",
    color: "accent",
  },
];

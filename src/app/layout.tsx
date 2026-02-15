import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrightCards - Fun Learning",
  description: "Interactive flashcards for children",
};

import { GameProvider } from "@/context/GameContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-neutral-background text-neutral-text font-body overflow-x-hidden`}
      >
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}

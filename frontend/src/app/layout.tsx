// frontend/src/app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emotion Reflection Tool",
  description: "Analyze how you feel in seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800 min-h-screen`}> 
        <header className="w-full py-4 shadow bg-white text-center text-xl font-semibold">
          Emotion Reflection Tool
        </header>
        <main className="p-4 flex justify-center items-start">{children}</main>
        <footer className="text-center text-sm text-gray-500 py-4 mt-12">
          &copy; {new Date().getFullYear()} Shashikant Chaudhary. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
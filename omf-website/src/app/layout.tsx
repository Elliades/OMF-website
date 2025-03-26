/**
 * Root layout for the OMF Vitrine website
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OMF - Open MagicDraw Framework",
  description: "OMF is an open-source framework designed to simplify the robust and efficient development of MagicDraw plugins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "transition-colors duration-300"
      )}>
        {children}
      </body>
    </html>
  );
}

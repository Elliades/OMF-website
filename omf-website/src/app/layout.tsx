/**
 * Root layout for the OMF Vitrine website
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OMF - Open MagicDraw Framework",
  description: "OMF is an open-source framework designed to simplify the robust and efficient development of MagicDraw plugins.",
  icons: {
    icon: [
      {
        url: "/favicon/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon/favicon.png",
        sizes: "16x16",
        type: "image/png",
      }
    ],
    apple: {
      url: "/favicon/favicon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon.png" />
      </head>
      <body className={cn(
        inter.className,
        "transition-colors duration-300"
      )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

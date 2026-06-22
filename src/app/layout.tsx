import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CITYLENS",
  description:
    "A city management platform built with Next.js, MongoDB, and Tailwind CSS. Empowering cities with data-driven insights and efficient management tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
    min-h-screen
    bg-[#030712]
    text-[#F9FAFB]
  "
      >
        {children}
      </body>
    </html>
  );
}

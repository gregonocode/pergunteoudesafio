import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verdade ou Desafio",
  description: "Um jogo para duas pessoas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
    >
      <body>{children}</body>
    </html>
  );
}

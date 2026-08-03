import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PwaRegister } from "./pwa-register";

export const metadata: Metadata = {
  title: "Verdade ou Desafio",
  description: "Um jogo para duas pessoas.",
  applicationName: "Verdade ou Desafio",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Verdade ou Desafio",
    statusBarStyle: "default",
  },
  icons: {
    apple: [
      {
        url: "/icons/icon-vd-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a57e6",
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
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}

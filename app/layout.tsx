import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Expansão AI — IA, Dados e Automação",
  description:
    "A Expansão AI cria soluções que conectam inteligência artificial, dados e processos para transformar operação em leitura estratégica, automação e tomada de decisão.",
  openGraph: {
    title: "Expansão AI — IA, Dados e Automação",
    description:
      "Soluções de IA, dados e automação para negócios que precisam decidir melhor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

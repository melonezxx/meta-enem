import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta ENEM — Conquiste sua aprovação",
  description:
    "A plataforma definitiva para quem quer passar no ENEM com excelência. Organize seus estudos, acompanhe seu progresso e conquiste sua nota com o Meta ENEM.",
  keywords: ["ENEM", "estudos", "vestibular", "preparatório", "curso online"],
  openGraph: {
    title: "Meta ENEM — Conquiste sua aprovação",
    description:
      "A plataforma definitiva para quem quer passar no ENEM com excelência.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galeria dos Santos - GOJ",
  description: "Escolha um santo e receba mensagens inspiradoras no projeto do Grupo de Oração Jovem São Francisco - GOJ, feito com Next.js, Tailwind e Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "@/styles/globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BalanceProvider } from "@/context/priceContext";

export const metadata: Metadata = {
  title: "CriptoBoot - Ganhe dinheiro extra",
  description: "CriptoBoot - Ganhe dinheiro extra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-poppinsLight center">
        <BalanceProvider>{children}</BalanceProvider>
      </body>
    </html>
  );
}

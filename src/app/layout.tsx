import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Header from "./components/header/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Laravel 11 - Client",
  description: "Client consuming Laravel 11 API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

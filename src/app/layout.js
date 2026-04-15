import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body 
        className={`${inter.variable} ${playfair.variable} font-sans bg-base text-text-navy antialiased selection:bg-primary-blue/10`}
        suppressHydrationWarning={true}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
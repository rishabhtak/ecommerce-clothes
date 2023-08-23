import Header from "@/components/Header/Index";
import Footer from "@/components/Footer/Index";
import "./globals.css";
import "react-multi-carousel/lib/styles.css";
import { Oswald, Inter } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "E-Commerce Clothes",
  description: "E-Commerce Clothes shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable}`}>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import Header from "@/components/Header/Index";
import Footer from "@/components/Footer/Index";
import "./globals.css";
import "react-multi-carousel/lib/styles.css";
import { Oswald, Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import CartContextProvider from "@/components/CartContextProvider";
import "react-toastify/dist/ReactToastify.css";

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

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" className={`${oswald.variable}`}>
      <body className={`${inter.className} antialiased`}>
          <CartContextProvider session={session}>
            <Header />
            {children}
          </CartContextProvider>
          <Footer />
      </body>
    </html>
  );
}

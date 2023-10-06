import "./globals.css";
import { Inter } from "next/font/google";
import Authprovider from "@/components/Authprovider/Authprovider";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clother-Admin",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authprovider>
          <Sidebar>{children}</Sidebar>
        </Authprovider>
      </body>
    </html>
  );
}

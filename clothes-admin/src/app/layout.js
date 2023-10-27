import "./globals.css";
import { Inter } from "next/font/google";
import Login from "@/components/AuthForm/Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Authprovider from "@/components/Authprovider";
import Sidebar from "@/components/Sidebar";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clother-Admin",
  description: "Admin Dashboard",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Login />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Authprovider>
          <Sidebar />
          <div className="ml-0 md:ml-64 p-4">{children}</div>
        </Authprovider>
      </body>
    </html>
  );
}

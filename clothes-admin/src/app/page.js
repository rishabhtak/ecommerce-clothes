import Login from "@/components/AuthForm/Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Logout from "@/components/AuthForm/Logout";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return <Login />;
  return (
    <div>
        {session.user.name}
        <Logout />
    </div>
  );
}

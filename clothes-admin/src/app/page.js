import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="overflow-y-auto h-[1280px]">
      Welcome : {session.user.name}
      <br />
      Email : {session.user.email}
    </div>
  );
}

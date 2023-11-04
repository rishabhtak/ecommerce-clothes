import { getServerSession } from "next-auth";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <LoginForm />;
};

export default page;

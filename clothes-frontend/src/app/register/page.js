import { getServerSession } from "next-auth";
import SignupForm from "./SignupForm";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <SignupForm />;
};

export default page;

import { hash } from "bcrypt";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function POST(req) {
  try {
    await mongooseConnect();
    const { name, email, password } = await req.json();
    let user = await User.findOne({ email });
    if (user) {
      return Response.json({
        message: "User already exists,Please use another email",
        status: 401,
      });
    }
    const hashedPassword = await hash(password, 10);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return Response.json({
      message: "Registeration successfull, Now you can login",
      status: 200,
    });
  } catch (error) {
    return Response.json({
      message: "Something went wrong,Please try again later",
      status: 500,
    });
  }
}

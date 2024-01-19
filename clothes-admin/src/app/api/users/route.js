import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await mongooseConnect();
    await isAdminRequest();
    let users = await User.find();
    return NextResponse.json({ users, message: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, message: "Error", status: 500 });
  }
}

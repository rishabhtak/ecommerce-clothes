import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const formData = await req.formData();
    const img = formData.get("file");
    if (!img) {
      NextResponse({ success: false, message: "no image found" });
    }

    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dmhxdpc8o/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const links = [];
    const uploadedImageData = await uploadResponse.json();
    links.push(uploadedImageData.secure_url);
    return NextResponse.json({
      links,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

export const config = {
  api: { bodyParser: false },
};

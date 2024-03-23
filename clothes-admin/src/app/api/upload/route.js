import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]/route";
import sha1 from "sha1";

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
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
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

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const link = searchParams.get("url");
    if (!link) {
      return NextResponse.json({ success: false, message: "no url found" });
    }
    const regex = /\/ecommerceclothes_folder\/([^/]+)\.webp$/;
    const publicId = link.match(regex);
    const url = "ecommerceclothes_folder/" + publicId[1];
    const timestamp = new Date().getTime();
    const string = `public_id=${url}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    const signature = sha1(string);
  
    const formData = new FormData();
    formData.append("public_id", url);
    formData.append("signature", signature);
    formData.append("api_key", process.env.CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);
  
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );
    await res.json();
    return NextResponse.json({
      message: "Success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}


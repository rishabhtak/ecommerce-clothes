import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    await mongooseConnect();
    await Product.create(body);
    return NextResponse.json({ message: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

export async function GET(req, res) {
  try {
    await mongooseConnect();
    const products = await Product.find();
    return NextResponse.json({ products, message: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

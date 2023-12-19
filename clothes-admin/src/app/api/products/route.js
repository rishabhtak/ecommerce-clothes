import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const body = await req.json();
    await mongooseConnect();
    await isAdminRequest();
    await Product.create(body);
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
      error: error,
    });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const id = body._id;
    await mongooseConnect();
    await isAdminRequest();
    if (!id) {
      return new NextResponse("Product not found", { status: 404 });
    } else {
      const {
        productName,
        category,
        subcategory,
        featured,
        archived,
        images,
        desc,
        slug,
        variants,
      } = body.data;
      const newProduct = {};
      newProduct.productName = productName;
      newProduct.category = category;
      newProduct.subcategory = subcategory;
      newProduct.featured = featured;
      newProduct.archived = archived;
      newProduct.images = images;
      newProduct.desc = desc;
      newProduct.slug = slug;
      newProduct.variants = variants;
      await Product.findByIdAndUpdate(id, { $set: newProduct }, { new: true });
      return new NextResponse("Success", { status: 200 });
    }
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
      error: error,
    });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await mongooseConnect();
    await isAdminRequest();
    if (!id) {
      return new NextResponse("Product not found", { status: 404 });
    } else {
      await Product.findByIdAndDelete(id);
      return new NextResponse("Success", { status: 200 });
    }
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
      error: error,
    });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await mongooseConnect();
    await isAdminRequest();
    let products = [];
    if (id) {
      products = await Product.findOne({ _id: id });
    } else {
      products = await Product.find();
    }
    return NextResponse.json({ products, message: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

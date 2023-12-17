import { Order } from "@/models/Order";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await mongooseConnect();
    await isAdminRequest();
    let orders = [];
    if (id) {
      orders = await Order.findOne({ _id: id });
    } else {
      orders = await Order.find().sort({ createdAt: -1 });
    }
    return NextResponse.json({ orders, message: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, orderStatus, variant_id, paymentStatus } = body;
    await mongooseConnect();
    await isAdminRequest();
    if (!id) {
      return NextResponse.json({ message: "order not found", status: 404 });
    } else {
      if (!paymentStatus) {
        await Order.updateOne(
          {
            _id: id,
            items: {
              $elemMatch: {
                "items.variant_id": variant_id,
              },
            },
          },
          {
            $set: {
              "items.$.orderStatus": orderStatus,
            },
          }
        );
        return NextResponse.json({ message: "Success", status: 200 });
      } else {
        await Order.updateOne(
          { _id: id },
          {
            $set: {
              paymentStatus: paymentStatus,
            },
          }
        );
        return NextResponse.json({ message: "Success", status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await mongooseConnect();
    await isAdminRequest();
    if (!id) {
      return NextResponse.json({ message: "order not found", status: 404 });
    } else {
      await Order.findByIdAndDelete(id);
      return NextResponse.json({ message: "Success", status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}

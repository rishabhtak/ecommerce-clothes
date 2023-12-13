import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { User } from "@/models/User";

export async function POST(req) {
  try {
    await mongooseConnect();
    const { items, finalPrice, finalQuantity, userId, selectAddress } =
      await req.json();
    let user = await User.findById(userId);
    if (user) {
      const itemsWithStatus = items.map((item) => ({
        ...item,
        status: "pending",
      }));

      const createdOrder = await Order.create({
        items: itemsWithStatus,
        finalPrice,
        finalQuantity,
        user: userId,
        selectAddress,
      });
      return Response.json({
        message: "Order created successfully",
        status: 200,
        orderId: createdOrder._id,
      });
    } else {
      return Response.json({
        message: "Unauthorized access",
        status: 500,
      });
    }
  } catch (error) {
    return Response.json({
      message: "Something went wrong,Please try again later",
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await mongooseConnect();
    let email = req.headers.get("email");
    let user = await User.findOne({ email });
    if (user) {
      let orders = await Order.find({});
      return Response.json({
        orders,
        message: "Success",
        status: 200,
      });
    } else {
      return Response.json({
        message: "Unauthorized access",
        status: 500,
      });
    }
  } catch (error) {
    return Response.json({
      message: "Something went wrong,Please try again later",
      status: 500,
    });
  }
}

import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    await mongooseConnect();
    const { items, finalPrice, finalQuantity, userId, selectAddress, email } =
      await req.json();
    let user = await User.findById(userId);
    if (user) {
      const itemsWithStatus = items.map((item) => ({
        ...item,
        orderStatus: "pending",
      }));

      const createdOrder = await Order.create({
        items: itemsWithStatus,
        finalPrice,
        finalQuantity,
        paymentStatus: "unpaid",
        user: {
          id: userId,
          email: email,
        },
        selectAddress,
      });

      const extractingItems = await items.map((item, index) => ({
        quantity: items[index].total_quantity,
        price_data: {
          currency: "inr",
          unit_amount: item.items.variant_price * 100,
          product_data: {
            name: item.items.productName.toUpperCase(),
            images: [item.items.images[0]],
            description: `Size: ${item.items.variant_size.toUpperCase()}, Color: ${item.items.variant_color.toUpperCase()}`,
            metadata: {
              orderId: createdOrder._id.toString(),
            },
          },
        },
      }));
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: extractingItems,
        mode: "payment",
        success_url: `${
          process.env.NEXTAUTH_URL
        }/orderconfirm?orderId=${createdOrder._id.toString()}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/address`,
        metadata: {
          orderId: createdOrder._id.toString(),
        },
      });
      return Response.json({
        message: "success",
        status: 200,
        orderId: createdOrder._id.toString(),
        sessionId: session.id,
      });
    } else {
      return Response.json({
        message: "Unauthorized access",
        status: 401,
      });
    }
  } catch (error) {
    console.log("error", error);
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

import { mongooseConnect } from "@/lib/mongoose";
import Stripe from "stripe";
import { headers } from "next/headers";
import { Order } from "@/models/Order";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    await mongooseConnect();
    const body = await req.text();
    const sig = headers().get("stripe-signature");
    let event;
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY
    );

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const data = event.data.object;
        const orderId = data.metadata.orderId;
        const paid = data.payment_status === "paid";
        if (orderId && paid) {
          await Order.updateOne(
            { _id: orderId },
            {
              $set: {
                paymentStatus: "paid",
                "items.$[item].orderStatus": "received",
              },
            },
            {
              arrayFilters: [{ "item.orderStatus": "pending" }],
            }
          );
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return Response.json({
      message: "success",
      status: 200,
    });
  } catch (err) {
    return Response.json({
      error: `Webhook Error: ${err.message}`,
      status: 400,
    });
  }
}

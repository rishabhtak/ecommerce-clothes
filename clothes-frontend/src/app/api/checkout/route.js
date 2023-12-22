import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    await mongooseConnect();
    const { items, userId, selectAddress, email } = await req.json();
    let user = await User.findById(userId);
    if (user) {
      let existingCustomer;
      try {
        existingCustomer = await stripe.customers.retrieve(userId);
      } catch (retrieveError) {
        // Handle the error if retrieval fails
        existingCustomer = null;
      }

      let customer;

      if (existingCustomer) {
        try {
          customer = await stripe.customers.update(userId, {
            address: {
              city: selectAddress.city,
              state: selectAddress.state,
              country: selectAddress.country,
              line1: selectAddress.address,
              postal_code: selectAddress.pincode,
            },
            email: email,
            name: selectAddress.fullname,
            phone: selectAddress.phone,
          });
        } catch (updateError) {
          return Response.json({
            message: "Something went wrong,Please try again later",
            status: 500,
          });
        }
      } else {
        try {
          customer = await stripe.customers.create({
            id: userId,
            address: {
              city: selectAddress.city,
              state: selectAddress.state,
              country: selectAddress.country,
              line1: selectAddress.address,
              postal_code: selectAddress.pincode,
            },
            email: email,
            name: selectAddress.fullname,
            phone: selectAddress.phone,
          });
        } catch (createError) {
          return Response.json({
            message: "Something went wrong,Please try again later",
            status: 500,
          });
        }
      }

      const extractingItems = await items.map((item, index) => ({
        quantity: items[index].total_quantity, //todo
        price_data: {
          currency: "inr",
          unit_amount: item.items.variant_price * 100,
          product_data: {
            name: item.items.productName.toUpperCase(),
            images: [item.items.images[0]],
            description: `Size: ${item.items.variant_size.toUpperCase()}, Color: ${item.items.variant_color.toUpperCase()}`,
            metadata: {
              product_id: item.items.product_id,
              variant_id: item.items.variant_id,
              variant_color: item.items.variant_color,
              variant_size: item.items.variant_size,
              category: item.items.category,
              subcategory: item.items.subcategory,
              slug: item.items.slug,
            },
          },
        },
      }));
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: extractingItems,
        mode: "payment",
        customer: customer.id,
        success_url: `${process.env.NEXTAUTH_URL}/orderconfirm?status=success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      });
      return Response.json({
        message: "success",
        status: 200,
        sessionId: session.id,
      });
    } else {
      return Response.json({
        message: "Unauthorized access",
        status: 401,
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

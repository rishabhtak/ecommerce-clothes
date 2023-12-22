import { mongooseConnect } from "@/lib/mongoose";
import Stripe from "stripe";
import { headers } from "next/headers";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const createOrder = (lineItems) => {
  let items = [];
  lineItems.data.forEach((lineItem) => {
    const item = {
      product_id: lineItem?.price?.product?.metadata?.product_id,
      variant_id: lineItem?.price?.product?.metadata?.variant_id,
      productName: lineItem?.price?.product?.name,
      images: lineItem?.price?.product?.images[0],
      slug: lineItem?.price?.product?.metadata?.slug,
      category: lineItem?.price?.product?.metadata?.category,
      subcategory: lineItem?.price?.product?.metadata?.subcategory,
      variant_color: lineItem?.price?.product?.metadata?.variant_color,
      variant_size: lineItem?.price?.product?.metadata?.variant_size,
      variant_price: Number(lineItem?.price?.unit_amount) / 100,
      total_price: Number(lineItem?.amount_total) / 100,
      total_quantity: Number(lineItem?.quantity),
      orderStatus: "Recieved",
    };
    items.push(item);
  });
  const finalPrice = items.reduce(
    (amount, item) => amount + item.total_price,
    0
  );
  const finalQuantity = items.reduce(
    (total, item) => total + item.total_quantity,
    0
  );
  return { items, finalPrice, finalQuantity };
};

const getAddress = (customer) => {
  return {
    customerId: customer?.id,
    email: customer?.email,
    fullname: customer?.name,
    phone: customer?.phone,
    address: customer?.address?.line1,
    city: customer?.address?.city,
    state: customer?.address?.state,
    pincode: customer?.address?.postal_code,
    country: customer?.address?.country,
  };
};

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
        const session = event.data.object;
        const expandedSession = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["line_items.data.price.product"],
          }
        );
        const order = createOrder(expandedSession.line_items);
        const customerId = data.customer;
        const customer = await stripe.customers.retrieve(customerId);
        // create new order after successfull payment
        const orderData = await Order.create({
          items: order.items,
          finalPrice: order.finalPrice,
          finalQuantity: order.finalQuantity,
          paymentStatus: "paid",
          selectAddress: getAddress(customer),
        });

        // update product quantity after new order created

        orderData.items.forEach(async (item) => {
          const variantId = item.variant_id;
          const totalQuantity = item.total_quantity;
          const productId = item.product_id;

          console.log(variantId, totalQuantity, productId);
          // Update product variant quantity based on order quantity
          const updateQuery = {
            $inc: {
              "variants.$.qty": -1 * totalQuantity,
            },
          };

          // Find the product by _id and update the variant quantity
          await Product.updateOne(
            { _id: productId, "variants._id": variantId },
            updateQuery
          );
        });
       // console.log("order" + JSON.stringify(orderData, null, 2));

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

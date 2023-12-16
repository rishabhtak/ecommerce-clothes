import React from "react";
import { getProductByUser } from "@/lib/products";
import { getServerSession } from "next-auth";
import UserOrders from "@/components/UserOrders";

const page = async () => {
  const session = await getServerSession();

  const orders = await getProductByUser({
    "user.email": session?.user?.email,
  });

  console.log(orders);

  return <UserOrders orders={orders} />;
};

export default page;

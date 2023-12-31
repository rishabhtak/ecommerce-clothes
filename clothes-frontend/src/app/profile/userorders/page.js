import React from "react";
import { getProductByUser } from "@/lib/products";
import { getServerSession } from "next-auth";
import UserOrders from "@/components/UserOrders";

const page = async () => {
  const session = await getServerSession();

  const orders = await getProductByUser({
    "selectAddress.email": session?.user?.email,
  });

  return <UserOrders orders={orders} />;
};

export default page;

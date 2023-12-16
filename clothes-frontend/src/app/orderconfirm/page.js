import React from "react";
import Wrapper from "@/components/Wrapper/Index";
import OrderConfirm from "@/components/OrderConfirm";

const page = async ({ searchParams }) => {
  return (
    <Wrapper>
      <OrderConfirm orderId={searchParams.orderId} />
    </Wrapper>
  );
};

export default page;
